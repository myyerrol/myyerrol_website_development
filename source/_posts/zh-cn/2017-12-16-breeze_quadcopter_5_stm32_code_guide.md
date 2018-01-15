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
  typedef signed long const sc32; /* Read Only */
  typedef signed short const sc16; /* Read Only */
  typedef signed char const sc8; /* Read Only */
  typedef volatile signed long vs32;
  typedef volatile signed short vs16;
  typedef volatile signed char vs8;
  typedef volatile signed long const vsc32; /* Read Only */
  typedef volatile signed short const vsc16; /* Read Only */
  typedef volatile signed char const vsc8; /* Read Only */
  typedef unsigned long u32;
  typedef unsigned short u16;
  typedef unsigned char u8;
  typedef unsigned long const uc32; /* Read Only */
  typedef unsigned short const uc16; /* Read Only */
  typedef unsigned char const uc8; /* Read Only */
  typedef volatile unsigned long vu32;
  typedef volatile unsigned short vu16;
  typedef volatile unsigned char vu8;
  typedef volatile unsigned long const vuc32; /* Read Only */
  typedef volatile unsigned short const vuc16; /* Read Only */
  typedef volatile unsigned char const vuc8; /* Read Only */
  ```


### 基于C语言的嵌入式编程规范

## 工程规范

## 总结

通过以上的介绍，我相信大家都对我们MicroDynamics团队制订的STM32嵌入式代码编写规范有了一个较为清楚的认识。古人曾经说过：**不以规矩，不能成方圆**，很难想象如果我们不用严格的代码规范来约束自己，我们编写出来的代码质量能有多高呢？因此，我希望每个编写嵌入式代码的同学都能够在开始之前先沉下心把代码规范仔细地学习一遍，就算你以后不再搞嵌入式，拥有编写规范代码的能力也会成为你将来最为宝贵的一份财富！

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
