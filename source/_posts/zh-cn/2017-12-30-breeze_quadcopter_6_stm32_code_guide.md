---
title: Breeze微型四轴系列（六）：STM32嵌入式开发-代码编写规范
date: 2017-12-30 11:50:00
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

  - 外设函数的命名以该外设的缩写加下划线为开头。每个单词的第一个字母都由英文字母大写书写，例如：SPI_SendData。在函数名中，只允许存在一个下划线，用以分隔外设缩写和函数名的其他部分。而用以配置外设功能的函数，其名称应总是以字符串**Config**结尾。例如：GPIO_PinRemapConfig。

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

  示例：以下例子不符合规范。

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
  data_package.length = DATA_PACKAGE_HEAD_LENGTH + DATA_PACKAGE_TAIL_LENGTH +
      DATA_LENGTH_PER_BYTE * sizeof(data_byte_sum);

  action_task_table[frame_id * ACTION_TASK_CHECK_NUMBER + index].occupied =
      task_table[index].occupied;

  report_or_not_flag = ((task_index < ACTION_TASK_MAX_NUMBER) &&
      (judgeTaskIndexIsValid(task_index)) &&
      (action_task_table[task_index].result_data != 0));
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

  示例：以下例子不符合规范。

  ```c
  rect.length = 0; rect.width = 0;
  ```

  应如下书写

  ```c
  rect.length = 0;
  rect.width  = 0;
  ```

  **7、`if`、`for`、`do`、`while`、`case`、`switch`、`default`等语句自占一行，且 `if`、`for`、`do`、`while`等语句的执行语句部分无论多少都要加括号`{}`。**

  示例：以下例子不符合规范。

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

  示例：以下例子不符合规范。

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

  **1、一般情况下，源程序应尽量简洁明了。**
  说明：注释的原则是有助于对程序的阅读理解，注释应准确、易懂、简洁，此外为与各种编译环境的兼容，注释语言**必须**采用英文注释（为了便于大家理解，本规范中的一部分示例源码采用中文注释）。

  **2、说明性文件（如`.h`文件、`.icf`文件、`.txt`文件等）头部应进行注释，注释必须列出：版权说明、版本号、生成日期、作者、内容、功能、与其他文件的关系、修改日志等。头文件的注释中还应有函数功能简要说明。**

  示例：下面这段头文件的头注释比较标准。当然，并不局限于此格式，但上述信息建议要包含在内。

  ```c
  /****************************************************************************
  Copyright (C), 2017-2018, Team MicroDynamics <microdynamics@126.com>

  // 文件名。
  File name:

  // 作者、版本及完成日期。
  Author:    Version:    Date:

  // 用于详细说明此程序文件完成的主要功能，与其他模块或函数的接口，输出值、取值范围、
  // 含义及参数间的控制、顺序、独立或依赖等关系。
  Description:

  // 其他内容的说明。
  Others:

  // 主要函数列表，每条记录应包括函数名及功能简要说明。
  Function List:
  1. ....

  // 修改历史记录列表，每条修改记录应包括修改日期、修改者及修改内容简述。
  History:
  1. Date:
     Author:
     Modification:
  2. ...
  ****************************************************************************/
  ```

  **3、源文件头部应进行注释，列出：版权说明、版本号、生成日期、作者、模块目的/功能、主要函数及其功能、修改日志等。**

  示例：下面这段源文件的头注释比较标准，当然，并不局限于此格式，但上述信息建议要包含在内。

  ```c
  /****************************************************************************
  Copyright (C), 2017-2018, Team MicroDynamics <microdynamics@126.com>

  // 文件名。
  FileName:

  // 作者、版本及完成日期。
  Author:    Version:    Date:

  // 模块描述
  Description:

  // 版本信息
  Version:

  // 主要函数及其功能
  Function List:
  1. ...

  // 历史修改记录
  History:
  <author>    <time>    <version>    <desc>
  ...
  ****************************************************************************/
  ```

  说明：**Description**一项用于描述本文件的内容、功能、内部各部分之间的关系及本文件与其他文件关系等。**History**是修改历史记录列表，每条修改记录应包括修改日期、修改者及修改内容简述。

  以Team MicroDynamics目前使用的源码头注释为例：

  ```c
  /*****************************************************************************
  THIS PROGRAM IS FREE SOFTWARE. YOU CAN REDISTRIBUTE IT AND/OR MODIFY IT
  UNDER THE TERMS OF THE GNU GPLV3 AS PUBLISHED BY THE FREE SOFTWARE FOUNDATION.

  Copyright (C), 2017-2018, Team MicroDynamics <microdynamics@126.com>

  Filename:    stm32f10x_driver_sys.c
  Author:      maksyuki
  Version:     0.1.0.20161231_release
  Create date: 2016.8.3
  Description: Define the bitband operation
  Others:      none
  Function List:
               none
  History:
  1. <author>    <date>         <desc>
     maksyuki    2016.11.29     modify the module
  *****************************************************************************/
  ```

  **4、函数头部应进行注释，列出：函数的目的/功能、输入参数、输出参数、返回值、调用关系（函数、表）等。**

  示例：下面这段函数的注释比较标准，当然，并不局限于此格式，但上述信息建议要包含在内。

  ```c
  /****************************************************************************
  Function:       // 函数名称。
  Description:    // 函数功能、性能等的描述。
  Calls:          // 被本函数调用的函数清单。
  Called By:      // 调用本函数的函数清单。
  Table Accessed: // 被访问的表（此项仅对于牵扯到数据库操作的程序）。
  Table Updated:  // 被修改的表（此项仅对于牵扯到数据库操作的程序）。
  Input:          // 输入参数说明，包括每个参数的作。
                  // 用、取值说明及参数间关系。
  Output:         // 对输出参数的说明。
  Return:         // 函数返回值的说明。
  Others:         // 其他说明。
  ****************************************************************************/
  ```

  **5、注释应与编写代码同步，修改代码同时修改相应的注释，以保证注释与代码的一致性。**

  **6、注释的内容要清楚、明了，含义准确，避免产生歧义。**

  **7、避免在注释中使用缩写，特别是非常用缩写，命名的标识符除外。**
  说明：在使用缩写时或之前，应对缩写进行必要的说明。

  **8、注释应与其描述的代码相近，对代码的注释应放在其上方或右方（对单条语句的注释）相邻位置，不可放在下面，如放于上方则需与其上面的代码用空行隔开。**

  示例：以下例子不符合规范。

  ```c
  // Get replicate sub system index and net indicator.
  repssn_ind = ssn_data[index].repssn_index;
  repssn_ni  = ssn_data[index].ni;
  ```

  ```c
  repssn_ind = ssn_data[index].repssn_index;
  repssn_ni  = ssn_data[index].ni;
  // Get replicate sub system index and net indicator.
  ```

  应如下书写：

  ```c
  // Get replicate sub system index and net indicator.
  repssn_ind = ssn_data[index].repssn_index;
  repssn_ni  = ssn_data[index].ni;
  ```

  **9、对于所有具有物理含义的变量、常量，如果其命名不是充分自注释的，在声明时都必须加以注释，说明其物理含义。变量、常量、宏的注释应放在其上方相邻位置或右方。**

  示例：

  ```c
  // Active statistic task number.
  #define MAX_ACT_TASK_NUMBER 1000
  ```

  **10、数据结构声明（包括数组、结构、枚举等），如果其命名不是充分自注释的，必须加以注释。对数据结构的注释应放在其上方相邻位置，不可放在下面。对结构中的每个域的注释放在此域的右方。**

  示例：可按如下形式说明枚举/数据/联合结构。

  ```c
  // USART Ring Data buffer struct.
  typedef struct USART_RingBuffer
  {
      u8  *buffer;   // Data buffer pointer.
      u16  mask;     // Data mask.
      vu16 index_rd; // Data read index.
      vu16 index_wt; // Data write index.
  } USART_RingBuffer;
  ```

  **11、全局变量要有较详细的注释，包括对其功能、取值范围、哪些函数或过程存取它以及存取时注意事项等的说明。**

  示例：

  ```c
  /****************************************************************************
  // 全局变量功能。
  Variable function:

  // 全局变量可能的取值即说明。
  Avalable value:

  // 函数调用关系。
  Call relationship:
  ...
  ****************************************************************************/
  ```

  **12、注释与所描述内容进行同样的缩排。**

  示例：以下例子不符合规范，排版不整齐，阅读稍感不方便。

  ```c
  void testFunction(void)
  {
  // Code one comments.
      program code one;

          // Code two comments.
       program code two;
  }
  ```

  应改为如下布局：

  ```c
  void testFunction(void)
  {
      // Code one comments.
      program code one;

      // Code two comments.
      program code two;
  }
  ```

  **13、将注释与其上面的代码用空行隔开。**

  示例：以下例子不符合规范，代码显得过于紧凑。

  ```c
  // Code one comments.
  program code one;
  // Code two comments.
  program code two;
  ```

  应如下书写：

  ```c
  // Code one comments.
  program code one;

  // Code two comments.
  program code two;
  ```

  **14、对变量的定义和分支语句（条件分支、循环语句等）必须编写注释。**
  说明：这些语句往往是程序实现某一特定功能的关键，对于维护人员来说，良好的注释帮助更好的理解程序，有时甚至优于看设计文档。

  **15、对于`switch`语句下的`case`语句，如果因为特殊情况需要处理完一个`case`后进入下一个`case`处理，必须在该`case`语句处理完、下一个`case`语句前加上明确的注释。**
  说明：这样有助于防止无故遗漏`break`语句情况的出现。

  示例：

  ```c
  case CMD_UP:
  {
      ProcessUp();
      break;      
  }
  case CMD_DOWN:
  {
      ProcessDown();
      if (...)
      {
          ...
          break;          
      }
      else
      {
          // Now jump into case CMD_A.
          ProcessUp();
      }
  }
  case CMD_A:
  {
      ProcessA();
      break;
  }
  case CMD_B:
  {
      ProcessB();
      break;
  }
  case CMD_C:
  {
      ProcessC();
      break;
  }
  case CMD_D:
  {
      ProcessD();
      break;
  }
  ...
  ```

  **16、避免在一行代码或表达式的中间插入注释。**
  说明：除非必要，不应在代码或表达中间插入注释，否则容易使代码可理解性变差。

  **17、通过对函数或过程、变量、结构等正确的命名以及合理地组织代码的结构，使代码成为自注释的。**
  说明：清晰准确的函数、变量等的命名，可增加代码可读性，并减少不必要的注释。

  **18、在代码的功能、意图层次上进行注释，提供有用、额外的信息。**
  说明：注释的目的是解释代码的目的、功能和采用的方法，提供代码以外的信息，帮助读者理解代码，防止没必要的重复注释信息。

  示例：如下注释意义不大。

  ```c
  // if receive_flag is TRUE.
  if (receive_flag)
  ```

  应如下书写：

  ```c
  // if mtp receive a message from links.
  if (receive_flag)
  ```

  **19、在程序块的结束行右方加注释标记，以表明某程序块的结束。**
  说明：当代码段较长，特别是多重嵌套时，这样做可以使代码更清晰，更便于阅读。

  示例：参见如下例子。

  ```c
  if (...)
  {
      while (index < MAX_INDEX)
      {
          // Program code.
          ...
      } // End of while (index < MAX_INDEX).

  } // End of if (...).
  ```

  **20、注释格式尽量统一，除文件头注释外应全部使用行注释（//...）。**

  **21、注释应考虑程序易读及外观排版的因素，使用的语言必须为英文。**

- #### 标识符命名

  **1、标识符的命名要清晰、明了，有明确含义，同时使用完整的单词或大家基本可以理解的缩写，避免使人产生误解。**
  说明：较短的单词可通过去掉**元音**形成缩写，而较长的单词可取单词的头几个字母形成缩写。

  示例：以下单词的缩写能够被大家基本认可。

  ```txt
  ---------------------------------------------------------------------
  单词         缩写       单词             缩写  单词           缩写
  ---------------------------------------------------------------------
  addition     add        float           flt   previous      pre或prev
  answer       ans        frequency       freq  payload type  pt
  array        arr        header          hdr   pointer       ptr
  average      avg        index           idx   return code   rc
  buffer       buf或buff  image           img   record        rcd
  capture      cap或capt  increment       inc   receive       recv
  check        chk        initalize       init  result        res
  count        cnt        iteration       itr   return        ret
  column       col        length          len   source        src
  control      ctrl       memory          mem   stack         stk
  decode       dec        middle          mid   statistic     stat
  define       def        make            mk    string        str
  delete       del        message         msg   subtraction   sub
  destination  dst或dest  multiplication  mul   table         tab
  display      disp       number          num   temporary     tmp或temp
  division     div        operand         opnd  total         tot
  encode       enc        optimization    opt   time stamp    ts
  environment  env        operator        optr  value         val
  error        err        packet          pkt
  flag         flg        positon         pos
  ```

  **2、命名中若使用特殊约定或缩写，则要有注释说明。**
  说明：应该在源文件的开始之处，对文件中所使用的缩写或约定，特别是特殊的缩写，进行必要的注释说明。

  **3、自己特有的命名风格，要自始至终保持一致，不可来回变化。**
  说明：个人的命名风格，在符合所在项目组或产品组的命名规则的前提下，才可使用（即命名规则中没有规定到的地方才可有个人命名风格）。

  **4、对于变量命名，禁止取单个字符（如i、j、k...），建议除了要有具体含义外，还能表明其变量类型、数据类型等，但i、j、k作局部循环变量是允许的。**
  说明：变量，尤其是局部变量，如果用单个字符表示，很容易敲错（如i写成j），而编译时又检查不出来，有可能为了这个小小的错误而花费大量的查错时间。

  根据变量的类型，需要在变量原有名字之前添加相应的前缀，以下是变量前缀的类型表：

  ```txt
  ---------------------
  变量前缀  解释
  ---------------------
  g        全局变量（Global）
  c        常量（Const）
  s        静态变量（Static）
  ```

  **5、命名规范必须与所使用的系统风格保持一致，并在同一项目中统一。**

  **6、除非必要，不要用数字或较奇怪的字符来定义标识符。**

  **7、在同一软件开发项目内，应在编写代码前规划好接口部分标识符（变量、结构、函数及常量）的命名方式，以防止编译、链接时产生冲突。**
  说明：对接口部分的标识符应该有更严格限制，防止冲突。如可规定接口部分的变量与常量之前加上**模块**标识等。

  **8、用正确的反义词组命名具有互斥意义的变量或相反动作的函数等。**

  示例：下面是一些在软件中常用的反义词组。

  ```txt
  ----------------------
  正义词      反义词
  ----------------------
  begin      end
  create     destroy
  insert     delete
  first      last
  get        release
  increment  decrement
  put        get
  add        delete
  lock       unlock
  open       close
  min        max
  old        new
  start      stop
  next       previous
  source     target
  show       hide
  send       receive
  source     destination
  cut        paste
  up         down
  ```

  示例：

  ```c
  int min_sum;
  int max_sum;
  ```

  **9、除了编译开关/头文件等特殊应用，应避免使用以下划线开始和结尾的宏定义。**

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
