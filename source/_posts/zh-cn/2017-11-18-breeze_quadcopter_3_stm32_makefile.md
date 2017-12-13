---
title: Breeze微型四轴系列（三）：STM32嵌入式开发-Makefile详解
date: 2017-11-18 08:30:00
tags:
  - Micro Quadcopter
  - STM32
  - GNU/Linux
  - GNU/Make
  - Makefile
  - ARM-GCC
  - OpenOCD
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴飞行器STM32嵌入式开发-Makefile的相关内容。
feature: /images/breeze/breeze.png
toc: true
comments: true
---

## 前言

在上一篇文章中，我详细介绍了STM32嵌入式开发工具的相关内容，也通过具体的操作向大家展现了STM32嵌入式开发环境的整个搭建过程，但是如果你想看懂本篇文章或者想尝试自己在GNU/Linux下编写STM32嵌入式程序，那以上的知识是远远不够的，你还需要自学**Make**和**Makefile**，理解它的语法和用法，并亲手进行实践。

本篇文章因为篇幅有限，并不对Make和Makefile进行详细介绍，请大家先自行上网查找教程资料进行学习，这里我个人强烈推荐大神[陈皓](http://blog.csdn.net/haoel)曾在CSDN上发表过的《跟我一起写Makefile》系列文章（当初我就是通过这份教程学会Makefile的），里面对Makefile的基本规则、命令、变量、条件判断、函数、运行和隐含规则等内容进行了详细的介绍，讲的非常棒，网上也有PDF版本的，可以下载到本地，方便阅读。

<!--more-->

## 内容

### 系统架构

![breeze_embedded_architecture](/images/breeze/embedded/breeze_embedded_architecture.png)

如上图所示，Breeze微型四轴飞行器的嵌入式系统架构自底向上共由五个部分组成，它们分别为**硬件设备层**、**官方开发库层**、**底层驱动层**、**外设模块层**和**飞控算法层**（其中官方开发库层比较特殊，因为它为底层驱动层和外设模块层代码的编写均提供STM32底层函数实现，因此当初我在构思嵌入式架构图的时候，为简化设计，并且能更好体现官方开发库层在整个架构图中的层级关系，就将其放置在了驱动层和模块层的右侧，只表示逻辑上的调用关系，不存在层级上的高低之分）。

- #### 硬件设备层

  硬件设备层是整个嵌入式系统架构的基础，其中包括电机驱动、电源管理、传感器、无线通信以及主控制器共五个核心电路模块。关于这部分的内容我已经在[Breeze微型四轴系列（一）：硬件电路板设计](http://myyerrol.io/zh-cn/2017/10/21/breeze_quadcopter_1_hardware_design/)文章中进行了详细的讲解，这里就不再重复介绍了。

- #### 官方开发库层

  官方开发库层主要由**CMSIS**、**FWLib**和**LinkScript**这三个部分组成：

  **CMSIS**
  CMSIS是Cortex Microcontroller Software Interface Standard的简写，即ARM Cortex™微控制器软件接口标准。CMSIS是独立于供应商的Cortex-M处理器系列硬件抽象层，为芯片厂商和中间件供应商提供了简单的处理器软件接口，简化了软件复用工作，降低了Cortex-M上操作系统的移植难度，并减少了新入门的微控制器开发者的学习曲线和新产品的上市时间。以下是CMSIS 5.x标准的软件架构图：

  ![cmsis_architecture](/images/breeze/embedded/cmsis_architecture.png)

  从上图可以看到，CMSIS 5.x软件架构主要分为以下三层：**应用代码层**、**CMSIS软件层**和**微控制器层**，其中CMSIS软件层起着承上启下的作用，一方面该层对微控制器层进行了统一的实现，屏蔽了不同厂商对Cortex-M系列微处理器核内外设寄存器的不同定义，另一方面又向上层的操作系统和应用层提供接口，简化了应用程序开发的难度，使开发人员能够在完全透明的情况下进行一些应用程序的开发。也正是如此，CMSIS层的实现也相对复杂.有关CMSIS更详细的介绍请访问[CMSIS官网](https://developer.arm.com/embedded/cmsis)。

  ---

  **FWLib**
  FWLib是STM32官方提供的固件库源码，它基于STM32F1系列芯片的内部寄存器架构并根据CMSIS命名规范封装了一套完整的底层操作函数，方便用户进行应用开发。FWLib下的inc目录下存放的是stm32f10x_xxx.h形式的头文件，src目录下存放的是stm32f10x_xxx.c形式的固件库源码文件，每一个.c文件和一个.h文件相对应，用于实现命名中由xxx所指定的功能。注意：在开发的时候，不要修改这些源码文件，直接调用其中的函数即可。

  ---

  **LinkScript**

- #### 底层驱动层

  底层驱动层包含了常用的通信接口（IIC、SPI、USART、IO）和内部核心功能（时钟、延时、嵌套中断、定时器、EEPROM、Flash），它们全部是基于官方开发库层中的FWLib，即STM32官方固件库中的相应外设驱动代码进行编写，以便对系统外设接口或内部核心功能进行进一步的封装，在实现与硬件设备进行数据通信的同时也能满足外设模块对其调用的需要。

- #### 外设模块层

  外设模块层包含传感器模块（MPU6050、MS5611、NRF24L01）、LED显示模块、电机驱动模块、电池管理模块和CommLink通信协议栈模块等。外设模块层是对具体外设硬件进行操作的函数库，它主要通过调用底层驱动层中已封装好的函数来实现与硬件之间的双向数据通信，其中CommLink通信协议栈模块定义并实现了微型四轴飞行器与远程控制端之间，微型四轴飞行器与电脑调试端口之间的通信数据格式，提高系统整体的数据传输准确性。

- #### 飞控算法层

  飞控算法层位于整个嵌入式架构的最顶端，其实现主要是建立在硬件设备层、底层驱动层和外设模块层三者已有的基础之上。飞控算法层包含有高度融合算法、数据滤波算法、高度闭环算法、IMU融合算法以及最重要的PID控制算法等，由于整个微型四轴飞行器的核心功能都是由飞控算法所决定的，所以飞控算法层是嵌入式系统的绝对核心，也是开发的重点和难点。

### 目录结构

根据上一节所讲的嵌入式系统架构图，我设计了如下图所示的工程根目录结构，它共由八个子功能目录组成，分别为**Algorithm**（飞控算法源码）、**Documents**（工程开发文档）、**Drivers**（底层驱动源码）、**Libraries**（官方开发库）、**Modules**（外设模块源码）、**Project**（Makefile文件）、**Tools**（功能脚本）和**User**（工程核心源码）。

![breeze_dir_make](/images/breeze/embedded/breeze_dir_make.png)

- #### 目录Algorithm

  该目录下存放有Breeze微型四轴飞行器所有顶层飞控算法的源码，其中包含高度融合算法、数据滤波算法、高度闭环算法、IMU融合算法以及最重要的PID控制算法等，有关飞控算法的具体内容我会在之后的文章中进行详细的介绍。

  ![breeze_dir_algorithm](/images/breeze/embedded/breeze_dir_algorithm.png)

- #### 目录Drivers

  该目录下存放的是硬件驱动层源码，其所有的子目录也是根据系统架构图中底层驱动层里面的相应内容进行组织的。如下图所示，为便于源码管理，每个子目录命名统一为**Driver_XXX**。

  ![breeze_dir_drivers](/images/breeze/embedded/breeze_dir_drivers.png)

- #### 目录Libraries

  该目录下存放的是STM32官方开发库的相关内容，其中CMSIS子目录下包含有STM32内核源码、硬件寄存器和中断定义源码以及启动汇编源码等，FWLib子目录下包含有STM32提供的官方固件库源码，而LinkScript目录下则存有基于ARM-GCC的链接脚本文件。

  ![breeze_dir_libraries](/images/breeze/embedded/breeze_dir_libraries.png)

- #### 目录Modules

  该目录下存放的是所有外设模块层中的源码，其中每个外设模块的子目录中都包含有同名的.h和.c文件（下图中子目录文件夹显示包含有三个文件，其中第三个文件是编译生成的.o中间文件），便于源码管理和调用。

  ![breeze_dir_modules](/images/breeze/embedded/breeze_dir_modules.png)

- #### 目录Project

  该目录下主要存放有工程的Makefile文件，除此之外，根据Makefile中所定义的规则（在下面一节中会讲到），工程在被成功编译之后还会在本目录下生成.hex和.bin等可供烧写的文件。

  ![breeze_dir_project](/images/breeze/embedded/breeze_dir_project.png)

- #### 目录Tools

  该目录目前包含有命名为setup.sh的Shell脚本文件，以管理员权限运行这个脚本可以实现一键安装ARM-GCC交叉编译工具链、OpenOCD烧写工具和Minicom终端串口软件。

  ![breeze_dir_tools](/images/breeze/embedded/breeze_dir_tools.png)

- #### 目录User

  该目录主要是参考原子KEIL MDK工程模板中的USER目录进行设计的，里面存放的是工程的main.c（工程主源码文件）、stm32f10x_conf.h（工程头文件引用）、stm32f10x_it.h（中断函数定义）和stm32f10x_it.c（中断函数实现）等源码文件。

  ![breeze_dir_user](/images/breeze/embedded/breeze_dir_user.png)

### Makefile详解

{% alert warning %}
因为我在把Makefile中的内容拷过来的时候，为了能够让其中的命令以Soft Wrap（Atom等现代编辑器所提供的功能，可以自动让一行文字在某个特定列换行显示）的形式进行显示，我把原本Makefile中的TAB全部替换成空格，并且在80列的边界处进行了换行处理，所以如果你想自己编写Makefile，请复制并编辑工程目录里的Makefile，而不要直接复制下面的内容到你自己的Makefile文件中，否则运行make肯定会报错！
{% endalert %}

```mk
PROJECT := breeze_firmware_none

MCU     := cortex-m3

DDEFS   += -DSTM32F10X_MD
DDEFS   += -DHSE_VALUE=8000000 -DUSE_STDPERIPH_DRIVER

SRC_ASM := ../Libraries/CMSIS/startup/gcc/startup_stm32f10x_md.s

DIR_DRIVERS += ../Drivers/Driver_Clock/
DIR_DRIVERS += ../Drivers/Driver_Delay/
DIR_DRIVERS += ../Drivers/Driver_EEPROM/
DIR_DRIVERS += ../Drivers/Driver_Flash/
DIR_DRIVERS += ../Drivers/Driver_IIC/
DIR_DRIVERS += ../Drivers/Driver_IO/
DIR_DRIVERS += ../Drivers/Driver_NVIC/
DIR_DRIVERS += ../Drivers/Driver_SPI/
DIR_DRIVERS += ../Drivers/Driver_Timer/
DIR_DRIVERS += ../Drivers/Driver_USART/

DIR_MODULES += ../Modules/Module_Battery/
DIR_MODULES += ../Modules/Module_CommLink/
DIR_MODULES += ../Modules/Module_LED/
DIR_MODULES += ../Modules/Module_Motor/
DIR_MODULES += ../Modules/Module_MPU6050/
DIR_MODULES += ../Modules/Module_MS5611/
DIR_MODULES += ../Modules/Module_NRF24L01/

DIR_ALGORITHM += ../Algorithm/Algorithm_Altitude/
DIR_ALGORITHM += ../Algorithm/Algorithm_Control/
DIR_ALGORITHM += ../Algorithm/Algorithm_Filter/
DIR_ALGORITHM += ../Algorithm/Algorithm_Flight/
DIR_ALGORITHM += ../Algorithm/Algorithm_IMU/

SRC_C   += $(wildcard ../Libraries/CMSIS/*.c)
SRC_C   += $(wildcard ../Libraries/FWLib/src/*.c)
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_DRIVERS)))
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_MODULES)))
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_ALGORITHM)))
SRC_C   += $(wildcard ../User/*.c)

DIR_INCLUDE  += -I../Libraries/CMSIS/ \
                -I../Libraries/FWLib/inc/ \
                $(addprefix -I, $(DIR_DRIVERS)) \
                $(addprefix -I, $(DIR_MODULES)) \
                $(addprefix -I, $(DIR_ALGORITHM)) \
                -I../User/ \

LINK_SCRIPT := ../Libraries/LinkScript/stm32f10x_flash.lds

CC_PREFIX := arm-none-eabi-

CC   := $(CC_PREFIX)gcc
CXX  := $(CC_PREFIX)g++
CP   := $(CC_PREFIX)objcopy
GDB  := $(CC_PREFIX)gdb
SIZE := $(CC_PREFIX)size
AS   := $(CC) -x assembler-with-cpp
HEX  := $(CP) -O ihex
BIN  := $(CP) -O binary -S

OPT  += -Os
OPT  += -fsingle-precision-constant
OPT  += -fno-common
OPT  += -ffunction-sections
OPT  += -fdata-sections

DEFS := $(DDEFS) -DRUN_FROM_FLASH=1

SPECS := --specs=rdimon.specs -u _printf_float

FLAGS_MCU := -mcpu=$(MCU)
FLAGS_AS  := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb
FLAGS_C   := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb \
             -fomit-frame-pointer -Wall -fverbose-asm $(DEFS)
FLAGS_CXX := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb \
             -fomit-frame-pointer -Wall -fverbose-asm -fno-exceptions \
             -fno-rtti -fno-threadsafe-statics -fvisibility=hidden -std=c++11 \
             $(DEFS)
FLAGS_LD  := $(SPECS) $(FLAGS_MCU) $(OPT) -lm -g -gdwarf-2 -mthumb \
             -nostartfiles -Xlinker --gc-sections -T$(LINK_SCRIPT) \
             -Wl,-Map=$(PROJECT).map,--cref,--no-warn-mismatch

OBJS      := $(filter %.o, $(SRC_ASM:.s=.o)) $(filter %.o, $(SRC_C:.c=.o))

TYPE_BURN  := openocd_swd_flash
TYPE_DEBUG := openocd_swd_debug
TYPE_ERASE := openocd_swd_erase

###############################################################################

.PHONY: all burn debug erase clean

all: $(OBJS) $(PROJECT).elf $(PROJECT).hex $(PROJECT).bin
    $(SIZE) $(PROJECT).elf

%.o: %.c
    $(CC) $(FLAGS_C) $(DIR_INCLUDE) $< -o $@

%.o: %.s
    $(AS) $(FLAGS_AS) $< -o $@

%.elf: $(OBJS)
    $(CC) $(OBJS) $(FLAGS_LD) -o $@

%.hex: %.elf
    $(HEX) $< $@

%.bin: %.elf
    $(BIN) $< $@

###############################################################################

burn:  $(TYPE_BURN)
debug: $(TYPE_DEBUG)
erase: $(TYPE_ERASE)

openocd_swd_flash: $(PROJECT).bin
    openocd -f interface/jlink.cfg -c "transport select swd" -f
    target/stm32f1x.cfg -c "init" -c "reset halt" -c "sleep 100" -c "wait_halt
    2" -c "flash write_image erase $(PROJECT).bin 0x08000000" -c "sleep 100" -c
    "verify_image $(PROJECT).bin 0x08000000" -c "sleep 100" -c "reset run" -c
    shutdown

openocd_swd_debug: $(PROJECT).bin
    xterm -e openocd -f interface/jlink.cfg -c "transport select swd" -f
    target/stm32f1x.cfg -c "init" -c "halt" -c "reset halt" &
    $(GDB) --eval-command="target extended-remote localhost:3333" $(PROJECT).elf

openocd_swd_erase:
    openocd -f interface/jlink.cfg -c "transport select swd" -f
    target/stm32f1x.cfg  -c "init" -c "reset halt" -c "sleep 100" -c "stm32f1x
    mass_erase 0" -c "sleep 100" -c shutdown

###############################################################################

clean:
    -rm -rf $(OBJS)
    -rm -rf $(PROJECT).elf
    -rm -rf $(PROJECT).map
    -rm -rf $(PROJECT).hex
    -rm -rf $(PROJECT).bin
```

未完待续。。。

## 总结

读到这里，我相信大家对Breeze微型四轴飞行器的嵌入式架构以及工程本身的Makefile有了一个比较清楚的认识。这里，我想再强调一下项目整体架构以及目录组织结构的重要性，一个开源项目能否成功在很大程度上取决于系统架构设计的好坏，优秀的系统架构可以降低各模块之间的耦合性，提高底层代码的封装性，并向上提供较为丰富的API接口，除此之外，最重要的是它统一了接口标准，降低程序开发的复杂程度，从而提高系统整体的鲁棒性。当然，拥有设计出色的系统架构之后，我们还需要根据其来组织整个项目工程的目录结构，把不同功能的代码、Makefile以及开发文档等放到不同的目录当中去，这样有利于后期项目代码的编写和维护等工作。

在接下来的文章中，我将会为大家讲解STM32链接脚本的工作原理和参数配置，并分析其在程序链接和运行阶段的作用。由于下一篇的链接脚本部分涉及很多非常深奥的软件底层知识，所以我希望那些想深入理解STM32嵌入式程序是如何在硬件上运行的同学可以提前先看看《C专家编程》这本书中的**“第6章 运动的诗章：运行时数据结构”**，里面对程序的堆、栈和段进行了介绍，对你理解链接脚本中的相关内容有着很好的促进作用。最后，我还是希望能有更多的爱好者可以从本系列教程中受益匪浅。

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
