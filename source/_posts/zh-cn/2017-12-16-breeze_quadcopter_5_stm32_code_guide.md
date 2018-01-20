---
title: Breeze微型四轴系列（五）：STM32嵌入式开发-代码编写规范
date: 2017-12-16 11:50:00
tags:
  - Micro Quadcopter
  - STM32
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴飞行器STM32嵌入式开发-代码编写规范的相关内容。
feature: /images/breeze/breeze.png
toc: true
comments: true
---

## 前言

对于一个成功的开源项目来说，我个人认为**代码规范在某种程度上要比代码本身更为重要**。至于为什么会得到这样的结论，主要归结于当初我自己还在舞蹈机器人基地的时候就曾遇到过因代码不规范所导致的一系列问题：那时我们晓萌软件组每人负责一个机器人模块的代码编写工作，由于比赛日期逐渐迫近，我们都在尽全力完成各自的任务而没太注意代码的编写规范，可是到后期要做各模块代码集成的时候我们却发现由于彼此的代码规范不统一，导致我们需要更多的时间来理解对方所编代码的含义，并且重新修改很多软件接口以实现数据的无障碍传输。

总之，以往的经历让我明白严谨的代码规范可以显著提高代码的质量、降低后期的开发和维护成本、提升团队开发的效率并减少错误的发生。因此，我们又有什么理由不去学习并制订自己团队的代码编写规范呢？

<!--more-->

{% alert success %}
本代码规范参考自《STM32嵌入式系统开发实战指南》中的【第四章 编程规范】。
{% endalert %}

## 代码规范

简要介绍基于C语言的嵌入式编程规范的排版、注释、标识符命名、变量使用、代码可测性、程序效率、质量保证、代码编译、测试、程序版本与维护等内容。

### ST固件库编程规范

- #### 缩写

  ```txt
  ---------------------
  缩写         外设单元
  ---------------------
  ADC         模数转换器
  BKP         备份寄存器
  CAN         控制器局域网模块
  DMA         直接内存存取控制器
  EXTI        外部中断事件控制器
  FLASH       闪存存储器
  GPIO        通用输入输出
  I2C         内部集成电路
  IWDG        独立看门狗
  NVIC        嵌套中断向量列表控制器
  PWR         电源/功耗控制
  RCC         复位与时钟控制器
  RTC         实时时钟
  SPI         串行外设接口
  SysTick     系统嘀嗒定时器
  TIM         通用定时器
  TIM1        高级控制定时器
  USART       通用同步异步接收发射端
  WWDG        窗口看门狗
  ```

- #### 命名规则

  - 系统、源程序文件和头文件命名都以**stm32f10x**作为开头。例如：``stm32f10x_conf.h``。

  - 常量仅被应用于一个文件的，定义于该文件中。被应用于多个文件的，在对应头文件中定义。所有常量都由英文字母大写书写。

  - 寄存器作为常量处理。他们的命名都由英文字母大写书写。在大多数情况下，他们采用的缩写规范与本用户手册一致。

  - 外设函数的命名以该外设的缩写加下划线为开头。每个单词的第一个字母都由英文字母大写书写，例如：SPI_SendData。在函数名中，只允许存在一个下划线，用以分隔外设缩写和函数名的其它部分。而用以配置外设功能的函数，其名称应总是以字符串**Config**结尾。例如：GPIO_PinRemapConfig。

    - **PPP_Init**：
    PPP_Init函数的功能是根据PPP_InitTypeDef中指定的参数初始化外设PPP。

    - **PPP_DeInit**:
    PPP_DeInit函数的功能为复位外设PPP的所有寄存器至缺省值。

    - **PPP_StructInit**:
    PPP_StructInit函数的功能是通过设置PPP_InitTypeDef结构中的各种参数来定义外设的功能。

    - **PPP_Cmd**：
    PPP_Cmd函数的功能为使能或者失能外设PPP。

    - **PPP_ITConfig**：
    PPP_ITConfig函数的功能为使能或者失能来自外设PPP某中断源。

    - **PPP_DMAConfig**：
    PPP_DMAConfig函数的功能为使能或者失能外设PPP的DMA接口。

    - **PPP_GetFlagStatus**：
    PPP_GetFlagStatus函数的功能为检查外设PPP某标志位被设置与否。

    - **PPP_ClearFlag**：
    PPP_ClearFlag函数的功能为清除外设PPP标志位。

    - **PPP_GetITStatus**：
    PPP_GetITStatus函数的功能为判断来自外设PPP的中断发生与否。

    - **PPP_ClearITPendingBit**：
    PPP_ClearITPendingBit函数的功能为清除外设PPP中断待处理标志位。

- #### 编码规则

  **变量**
  固件函数库定义了24个变量类型，它们的类型和大小是固定的。在文件`stm32f10x_type.h`中我们定义了这些变量：

  ```c
  typedef signed long s32;
  typedef signed short s16;
  typedef signed char s8;
  typedef signed long const sc32;
  typedef signed short const sc16;
  typedef signed char const sc8;
  typedef volatile signed long vs32;
  typedef volatile signed short vs16;
  typedef volatile signed char vs8;
  typedef volatile signed long const vsc32;
  typedef volatile signed short const vsc16;
  typedef volatile signed char const vsc8;
  typedef unsigned long u32;
  typedef unsigned short u16;
  typedef unsigned char u8;
  typedef unsigned long const uc32;
  typedef unsigned short const uc16;
  typedef unsigned char const uc8;
  typedef volatile unsigned long vu32;
  typedef volatile unsigned short vu16;
  typedef volatile unsigned char vu8;
  typedef volatile unsigned long const vuc32;
  typedef volatile unsigned short const vuc16;
  typedef volatile unsigned char const vuc8;
  ```

  **布尔类型**
  在文件`stm32f10x_type.h`中，布尔形变量被定义如下：

  ```c
  typedef enum
  {
      FALSE = 0,
      TRUE  = !FALSE
  } bool;
  ```

  **标志位状态类型**
  在文件`stm32f10x_type.h`中，我们定义标志位类型的2个可能值为**设置**与**重置**。

  ```c
  typedef enum
  {
      RESET = 0,
      SET   = !RESET
  } FlagStatus;
  ```

  **功能状态类型**
  在文件`stm32f10x_type.h`中，我们定义功能状态类型的2个可能值为**使能**与**失能**。

  ```c
  typedef enum
  {
      DISABLE = 0,
      ENABLE  = !DISABLE
  } FunctionalState;
```

  **错误类型**
  在文件`stm32f10x_type.h`中，我们错误状态类型类型的2个可能值为**成功**与**错误**。

  ```c
  typedef enum
  {
      ERROR   = 0,
      SUCCESS = !ERROR
  } ErrorStatus;
  ```

  **外设**
  用户可以通过指向各个外设的指针访问各外设的控制寄存器。这些指针所指向的数据结构与各个外设的控制寄存器布局一一对应。外设控制寄存器结构文件`stm32f10x_map.h`包含了所有外设控制寄存器的结构，下例为SPI寄存器结构的声明，其中RESERVEDi（i为一个整数索引值）表示被保留区域：

  ```c
  typedef struct
  {
      vu16 CR1;
      u16 RESERVED0;
      vu16 CR2;
      u16 RESERVED1;
      vu16 SR;
      u16 RESERVED2;
      vu16 DR;
      u16 RESERVED3;
      vu16 CRCPR;
      u16 RESERVED4;
      vu16 RXCRCR;
      u16 RESERVED5;
      vu16 TXCRCR;
      u16 RESERVED6;
  } SPI_TypeDef;
  ```

  文件`stm32f10x_map.h`包含了所有外设的声明，下例为SPI外设的声明：

  ```c
  #ifndef EXT
  #define EXT extern
  #endif
  ...
  #define PERIPH_BASE ((u32)0x40000000)
  #define APB1PERIPH_BASE PERIPH_BASE
  #define APB2PERIPH_BASE (PERIPH_BASE + 0x10000) ...

  // SPI2 Base Address definition.
  #define SPI2_BASE (APB1PERIPH_BASE + 0x3800) ...
  // SPI2 peripheral declaration.
  #ifndef DEBUG
  ...
  #ifdef _SPI2
  #define SPI2 ((SPI_TypeDef *) SPI2_BASE)
  #endif // _SPI2
  ...
  #else // DEBUG
  ...
  #ifdef _SPI2
  EXT SPI_TypeDef *SPI2;
  #endif // _SPI2
  ...
  #endif // DEBUG
  ```

  如果用户希望使用外设SPI，那么必须在文件`stm32f10x_conf.h`中定义_SPI标签。通过定义标签_SPIn，用户可以访问外设SPIn的寄存器。例如，用户必须在文件`stm32f10x_conf.h`中定义标签_SPI2，否则是不能访问SPI2的寄存器的。在文件`stm32f10x_conf.h`中，用户可以按照下例定义标签_SPI和_SPIn。

  ```c
  #define _SPI
  #define _SPI1
  #define _SPI2
  ```

  每个外设都有若干寄存器专门分配给标志位。我们按照相应的结构定义这些寄存器，标志位的命名，同样遵循上面的外设缩写规范，以**PPP\_FLAG\_**开始。对于不同的外设，标志位都被定义在相应的文件`stm32f10x_ppp.h`中。

  用户想要进入除错（DEBUG）模式的话，必须在文件`stm32f10x_conf.h`中定义标签DEBUG，变量DEBUG可以仿照下例进行定义：

  ```c
  #define DEBUG 1
  ```

  初始化DEBUG模式与文件`stm32f10x_lib.c`的代码如下所示：

  ```c
  #ifdef DEBUG void debug(void)
  {
  ...
  #ifdef _SPI2
      SPI2 = (SPI_TypeDef *) SPI2_BASE;
  #endif // _SPI2
  ...
  }
  #endif // DEBUG
  ```

### C语言嵌入式编程规范

- #### 代码排版

  **1、程序块要采用缩进风格编写，缩进的空格数为4个。**

  **2、相对独立的程序块之间、变量说明之后必须加空行。**
  示例：以下的例子不符合规范。

  ```c
  if (!flag)
  {
      ... // Program code.
  }
  variable_a = data_buffer[index].a;
  variable_b = data_buffer[index].b;
  ```

  应如下书写

  ```c
  if (!flag)
  {
      ... // Program code.
  }

  variable_a = data_buffer[index].a;
  variable_b = data_buffer[index].b;
  ```

  **3、较长的语句（大于80字符）要分成多行书写，长表达式要在低优先级操作符处划分新行，操作符放在旧行之尾，划分出的新行要进行适当的缩进，使排版整齐，语句可读。**

  示例：

  ```c
  perm_count_msg.head.len = NO7_TO_STAT_PERM_COUNT_LEN +
      STAT_SIZE_PER_FRAM * sizeof(_UL);

  act_task_table[frame_id * STAT_TASK_CHECK_NUMBER + index].occupied =
      stat_poi[index].occupied;

  act_task_table[taskno].duration_true_or_false =
      SYS_get_sccp_statistic_state(stat_item);

  report_or_not_flag = ((taskno < MAX_ACT_TASK_NUMBER) &&
      (n7stat_stat_item_valid(stat_item)) &&
      (act_task_table[taskno].result_data != 0));
  ```

  **4、循环、判断等语句中若有较长的表达式或语句，则要进行适应的划分，长表达式要在低优先级操作符处划分新行，操作符放在旧行之尾。**

  示例：

  ```c
  if ((variable_a <= DATA_BUFFER_MAX_NUMBER) &&
      (variable_b != getFunctionValue(parameter_a)))
  {
      ... // Program code.
  }

  for (i = 0, j = 0; (i < data_buffer[index].length) &&
      (j < data_buffer[index].length); i++, j++)
  {
      ... // Program code.
  }

  for (i = 0, j = 0;
      (i < first_word_length) && (j < second_word_length);
      i++, j++)
  {
      ... // Program code.
  }
  ```

  **5、若函数或过程中的参数较长，则要进行适当的划分。**

  示例：

  ```c
  void testFunction((BYTE *)parameter_a + sizeof(parameter_c),
                    (BYTE *)parameter_b + sizeof(parameter_c),
                    data_buffer[index]);
  ```

  **6、不允许把多个短语句写在一行中，即一行只写一条语句。**

  示例：以下的例子不符合规范。

  ```c
  rect.length = 0; rect.width = 0;
  ```

  应如下书写

  ```c
  rect.length = 0;
  rect.width  = 0;
  ```

  **7、`if`、`for`、`do`、`while`、`case`、`switch`、`default`等语句自占一行，且 `if`、`for`、`do`、`while`等语句的执行语句部分无论多少都要加括号`{}`。**

  示例：以下的例子不符合规范。

  ```c
  if (a == NULL) return;
  ```

  应如下书写：

  ```c
  if (a == NULL)
  {
      return;
  }
  ```

  **8、对齐只能使用空格键，不能使用TAB键。**
  说明：以免用不同的编辑器阅读程序时，因TAB键所设置的空格数目不同而造成程序布局不整齐。

  **9、函数或过程的开始、结构的定义及循环、判断等语句中的代码都要采用缩进风格，`case`语句下的情况处理语句也要遵从语句缩进要求。**

  **10、程序块的分界符（如C/C++语言的大括号`{`和`}`）应各独占一行并且位于同一列，同时与引用它们的语句左对齐。在函数体的开始、类的定义、结构的定义、枚举的定义以及`if`、`for`、`do`、`while`、`switch`、`case`语句中的程序都要采用如上的缩进方式。**

  示例：如下例子不符合规范。

  ```c
  for (...) {
      ... // Program code.
  }

  if (...)
     {
     ... // Program code.
     }

  void testFunction(void)
     {
     ... // Program code.
     }
  ```

  应如下书写：

  ```c
  for (...)
  {
      ... // Program code.
  }

  if (...)
  {
      ... // Program code.
  }

  void testFunction(void)
  {
      ... // Program code.
  }
  ```

  **11、在两个以上的关键字、变量、常量进行对等操作时，它们之间的操作符之前、之后或者前后要加空格。进行非对等操作时，如果是关系密切的立即操作符（如`->`），后不应加空格。**

  说明：采用这种松散方式编写代码的目的是使代码更加清晰。由于留空格所产生的清晰性是相对的，所以在已经非常清晰的语句中没有必要再留空格，如果语句已足够清晰，则括号内侧（即左括号后面和右括号前面）不需要加空格，多重括号间不必加空格，因为在C/C++语言中括号已经是最清晰的标志了。

  在长语句中，如果需要加的空格非常多，那么应该保持整体清晰，而在局部不加空格。给操作符留空格时不要连续留两个以上空格。

  示例：

  (1) 逗号、分号只在后面加空格。

  ```c
  int a, b, c;
  ```

  (2) 比较操作符，赋值操作符（`=`、`+=`），算术操作符（`+`、`%`），逻辑操作符（`&&`、`&`），位域操作符（`<<`、`^`）等双目操作符的前后加空格。

  ```c
  if (a >= b && b != 0)
  {
      c = a + b;
      d = c ^ 2;
  }
  ```

  (3) `!`、`~`、`++`、`--`、`&`（地址运算符）等单目操作符前后不加空格。

  ```c
  *p = 1;
   a = !b;
   p = &a;
   i++;
  ```

  (4)`->`、`.`前后不加空格。

  ```c
  p->id = 1;
  ```

  (5) `if`、`for`、`while`、`switch`等与后面的括号间应加空格，使`if`等关键字更为突出和明显。

  ```c
  if (a >= b && c > d)
  ```

  **12、一行程序以小于80字符为宜，不要写得过长。**

- #### 代码注释

- #### 标识符命名

- #### 代码可读性

- #### 代码变量与结构

- #### 代码函数与过程

- #### 代码可测性

- #### 代码执行效率

- #### 代码质量

- #### 代码编辑与编译

- #### 代码测试与维护

- #### 代码宏定义

## 工程规范

### 建立工程

### 配置工程

## 总结

通过以上的介绍，我相信大家都对我们MicroDynamics团队制订的STM32嵌入式代码编写规范有了一个较为清楚的认识。古人曾经说过：**不以规矩，不能成方圆**，很难想象如果我们不用严格的代码规范来约束自己，我们编写出来的代码质量能有多高呢？因此，我希望每个编写嵌入式代码的同学都能够在开始之前先沉下心把代码规范仔细地学习一遍，就算你以后不再搞嵌入式，拥有编写规范代码的能力也会成为你将来最为宝贵的一份财富！

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
