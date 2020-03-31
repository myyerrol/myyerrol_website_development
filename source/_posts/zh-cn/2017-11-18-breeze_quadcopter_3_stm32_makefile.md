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
feature: /images/features/breeze.png
toc: true
comments: true
---

## 前言

在上一篇文章中，我详细介绍了STM32嵌入式开发工具的相关内容，也通过具体的操作向大家展现了STM32嵌入式开发环境的整个搭建过程，但是如果你想看懂本篇文章或者想尝试自己在GNU/Linux下编写STM32嵌入式程序，那以上的知识是远远不够的，你还需要自学**Make**和**Makefile**，理解它的语法和用法，并亲手进行实践。

本篇文章因为篇幅有限，并不对Make和Makefile进行详细介绍，请大家先自行上网查找教程资料进行学习，这里我个人强烈推荐大神[陈皓](http://blog.csdn.net/haoel)曾在CSDN上发表过的《跟我一起写Makefile》系列文章（当初我就是通过这份教程学会Makefile的），里面对Makefile的基本规则、命令、变量、条件判断、函数、运行和隐含规则等内容进行了详细的介绍，讲的非常棒，网上也有PDF版本的，可以下载到本地，方便阅读。

<!--more-->

## 内容

### 系统架构

![breeze_embedded_architecture](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_embedded_architecture.png)

如上图所示，Breeze微型四轴飞行器的嵌入式系统架构自底向上共由五个部分组成，它们分别为**硬件设备层**、**官方开发库层**、**底层驱动层**、**外设模块层**和**飞控算法层**（其中官方开发库层比较特殊，因为它为底层驱动层和外设模块层代码的编写均提供STM32底层函数实现，因此当初我在构思嵌入式架构图的时候，为简化设计，并且能更好体现官方开发库层在整个架构图中的层级关系，就将其放置在了驱动层和模块层的右侧，只表示逻辑上的调用关系，不存在层级上的高低之分）。

- #### 硬件设备层

  硬件设备层是整个嵌入式系统架构的基础，其中包括电机驱动、电源管理、传感器、无线通信以及主控制器共五个核心电路模块。关于这部分的内容我已经在[Breeze微型四轴系列（一）：硬件电路板设计](http://myyerrol.io/zh-cn/2017/10/21/breeze_quadcopter_1_hardware_design/)文章中进行了详细的讲解，这里就不再重复介绍了。

- #### 官方开发库层

  官方开发库层主要由**CMSIS**、**FWLib**和**LinkScript**这三个部分组成：

  **CMSIS**
  CMSIS是Cortex Microcontroller Software Interface Standard的简写，即ARM Cortex™微控制器软件接口标准。CMSIS是独立于供应商的Cortex-M处理器系列硬件抽象层，为芯片厂商和中间件供应商提供了简单的处理器软件接口，简化了软件复用工作，降低了Cortex-M上操作系统的移植难度，并减少了新入门的微控制器开发者的学习曲线和新产品的上市时间。以下是CMSIS 5.x标准的软件架构图：

  ![cmsis_architecture](http://media.myyerrol.io/images/quadcopters/breeze/embedded/cmsis_architecture.png)

  从上图可以看到，CMSIS 5.x软件架构主要分为以下三层：**应用代码层**、**CMSIS软件层**和**微控制器层**，其中CMSIS软件层起着承上启下的作用，一方面该层对微控制器层进行了统一的实现，屏蔽了不同厂商对Cortex-M系列微处理器核内外设寄存器的不同定义，另一方面又向上层的操作系统和应用层提供接口，简化了应用程序开发的难度，使开发人员能够在完全透明的情况下进行一些应用程序的开发。也正是如此，CMSIS层的实现也相对复杂.有关CMSIS更详细的介绍请访问[CMSIS官网](https://developer.arm.com/embedded/cmsis)。

  ---

  **FWLib**
  FWLib是STM32官方提供的固件库源码，它基于STM32F1系列芯片的内部寄存器架构并根据CMSIS命名规范封装了一套完整的底层操作函数，方便用户进行应用开发。FWLib下的inc目录下存放的是stm32f10x_xxx.h形式的头文件，src目录下存放的是stm32f10x_xxx.c形式的固件库源码文件，每一个.c文件和一个.h文件相对应，用于实现命名中由xxx所指定的功能。注意：在开发的时候，不要修改这些源码文件，直接调用其中的函数即可。

  ---

  **LinkScript**
  LinkScript即链接脚本，它的主要功能是描述如何把输入文件中的节（sections）映射到输出文件中，并控制输出文件的存储布局。当然，在大多数情况下我们都不会注意到链接脚本的存在，主要原因在于链接器在我们没有指定特定链接脚本的时候，会使用一个默认缺省的脚本。最后如果你对链接脚本的工作原理很感兴趣，并且想要获得更多有关链接脚本的介绍，请阅读下一篇LinkScript专题文章。

- #### 底层驱动层

  底层驱动层包含了常用的通信接口（IIC、SPI、USART、IO）和内部核心功能（时钟、延时、嵌套中断、定时器、EEPROM、Flash），它们全部是基于官方开发库层中的FWLib，即STM32官方固件库中的相应外设驱动代码进行编写，以便对系统外设接口或内部核心功能进行进一步的封装，在实现与硬件设备进行数据通信的同时也能满足外设模块对其调用的需要。

- #### 外设模块层

  外设模块层包含传感器模块（MPU6050、MS5611、NRF24L01）、LED显示模块、电机驱动模块、电池管理模块和CommLink通信协议栈模块等。外设模块层是对具体外设硬件进行操作的函数库，它主要通过调用底层驱动层中已封装好的函数来实现与硬件之间的双向数据通信，其中CommLink通信协议栈模块定义并实现了微型四轴飞行器与远程控制端之间，微型四轴飞行器与电脑调试端口之间的通信数据格式，提高系统整体的数据传输准确性。

- #### 飞控算法层

  飞控算法层位于整个嵌入式架构的最顶端，其实现主要是建立在硬件设备层、底层驱动层和外设模块层三者已有的基础之上。飞控算法层包含有高度融合算法、数据滤波算法、高度闭环算法、IMU融合算法以及最重要的PID控制算法等，由于整个微型四轴飞行器的核心功能都是由飞控算法所决定的，所以飞控算法层是嵌入式系统的绝对核心，也是开发的重点和难点。

### 目录结构

根据上一节所讲的嵌入式系统架构图，我设计了如下图所示的工程根目录结构，它共由八个子功能目录组成，分别为**Algorithm**（飞控算法源码）、**Documents**（工程开发文档）、**Drivers**（底层驱动源码）、**Libraries**（官方开发库）、**Modules**（外设模块源码）、**Project**（Makefile文件）、**Tools**（功能脚本）和**User**（工程核心源码）。

![breeze_dir_make](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_make.png)

- #### 目录Algorithm

  该目录下存放有Breeze微型四轴飞行器所有顶层飞控算法的源码，其中包含高度融合算法、数据滤波算法、高度闭环算法、IMU融合算法以及最重要的PID控制算法等，有关飞控算法的具体内容我会在之后的文章中进行详细的介绍。

  ![breeze_dir_algorithm](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_algorithm.png)

- #### 目录Drivers

  该目录下存放的是硬件驱动层源码，其所有的子目录也是根据系统架构图中底层驱动层里面的相应内容进行组织的。如下图所示，为便于源码管理，每个子目录命名统一为**Driver_XXX**。

  ![breeze_dir_drivers](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_drivers.png)

- #### 目录Libraries

  该目录下存放的是STM32官方开发库的相关内容，其中CMSIS子目录下包含有STM32内核源码、硬件寄存器和中断定义源码以及启动汇编源码等，FWLib子目录下包含有STM32提供的官方固件库源码，而LinkScript目录下则存有基于ARM-GCC的链接脚本文件。

  ![breeze_dir_libraries](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_libraries.png)

- #### 目录Modules

  该目录下存放的是所有外设模块层中的源码，其中每个外设模块的子目录中都包含有同名的.h和.c文件（下图中子目录文件夹显示包含有三个文件，其中第三个文件是编译生成的.o中间文件），便于源码管理和调用。

  ![breeze_dir_modules](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_modules.png)

- #### 目录Project

  该目录下主要存放有工程的Makefile文件，除此之外，根据Makefile中所定义的规则（在下面一节中会讲到），工程在被成功编译之后还会在本目录下生成.hex和.bin等可供烧写的文件。

  ![breeze_dir_project](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_project.png)

- #### 目录Tools

  该目录目前包含有命名为setup.sh的Shell脚本文件，以管理员权限运行这个脚本可以实现一键安装ARM-GCC交叉编译工具链、OpenOCD烧写工具和Minicom终端串口软件。

  ![breeze_dir_tools](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_tools.png)

- #### 目录User

  该目录主要是参考原子KEIL MDK工程模板中的USER目录进行设计的，里面存放的是工程的main.c（工程主源码文件）、stm32f10x_conf.h（工程头文件引用）、stm32f10x_it.h（中断函数定义）和stm32f10x_it.c（中断函数实现）等源码文件。

  ![breeze_dir_user](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_dir_user.png)

### Makefile详解

根据工程目录结构、ARM-GCC和OpenOCD等工具的使用手册以及HandsFree项目所提供的STM32学习资料，我编写了工程的Makefile文件。在开始详细讲解相关内容之前，还是先放上工程的Makefile文件，好让大家对其能有一个整体的印象。

{% alert warning %}
因为我在把Makefile中的内容拷过来的时候，为了能够让其中的命令以Soft Wrap（Atom等现代编辑器所提供的功能，可以自动让一行文字在某个特定列换行显示）的形式进行显示，我把原本Makefile中的TAB全部替换成空格，并且在80列的边界处进行了换行处理，所以如果你想自己编写Makefile，请复制并编辑工程目录里的Makefile，而不要直接复制下面的内容到你自己的Makefile文件中，否则运行make肯定会报错！
{% endalert %}

```makefile
PROJECT := breeze_firmware_none

DIR_DRIVERS   += ../Drivers/Driver_Clock/
DIR_DRIVERS   += ../Drivers/Driver_Delay/
DIR_DRIVERS   += ../Drivers/Driver_EEPROM/
DIR_DRIVERS   += ../Drivers/Driver_Flash/
DIR_DRIVERS   += ../Drivers/Driver_IIC/
DIR_DRIVERS   += ../Drivers/Driver_IO/
DIR_DRIVERS   += ../Drivers/Driver_NVIC/
DIR_DRIVERS   += ../Drivers/Driver_SPI/
DIR_DRIVERS   += ../Drivers/Driver_Timer/
DIR_DRIVERS   += ../Drivers/Driver_USART/

DIR_MODULES   += ../Modules/Module_Battery/
DIR_MODULES   += ../Modules/Module_CommLink/
DIR_MODULES   += ../Modules/Module_LED/
DIR_MODULES   += ../Modules/Module_Motor/
DIR_MODULES   += ../Modules/Module_MPU6050/
DIR_MODULES   += ../Modules/Module_MS5611/
DIR_MODULES   += ../Modules/Module_NRF24L01/

DIR_ALGORITHM += ../Algorithm/Algorithm_Altitude/
DIR_ALGORITHM += ../Algorithm/Algorithm_Control/
DIR_ALGORITHM += ../Algorithm/Algorithm_Filter/
DIR_ALGORITHM += ../Algorithm/Algorithm_Flight/
DIR_ALGORITHM += ../Algorithm/Algorithm_IMU/

DIR_INCLUDE   += -I../Libraries/CMSIS/ \
                 -I../Libraries/FWLib/inc/ \
                 $(addprefix -I, $(DIR_DRIVERS)) \
                 $(addprefix -I, $(DIR_MODULES)) \
                 $(addprefix -I, $(DIR_ALGORITHM)) \
                 -I../User/ \

SRC_C   += $(wildcard ../Libraries/CMSIS/*.c)
SRC_C   += $(wildcard ../Libraries/FWLib/src/*.c)
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_DRIVERS)))
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_MODULES)))
SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_ALGORITHM)))
SRC_C   += $(wildcard ../User/*.c)

SRC_ASM := ../Libraries/CMSIS/startup/gcc/startup_stm32f10x_md.s

OBJS    := $(filter %.o, $(SRC_ASM:.s=.o)) $(filter %.o, $(SRC_C:.c=.o))

LINK_SCRIPT := ../Libraries/LinkScript/stm32f10x_flash.lds

CC_PREFIX := arm-none-eabi-

CC        := $(CC_PREFIX)gcc
CXX       := $(CC_PREFIX)g++
CP        := $(CC_PREFIX)objcopy
GDB       := $(CC_PREFIX)gdb
SIZE      := $(CC_PREFIX)size
AS        := $(CC) -x assembler-with-cpp
HEX       := $(CP) -O ihex
BIN       := $(CP) -O binary -S

DDEFS += -DSTM32F10X_MD
DDEFS += -DHSE_VALUE=8000000 -DUSE_STDPERIPH_DRIVER

DEFS  := $(DDEFS) -DRUN_FROM_FLASH=1

MCU   := cortex-m3

OPT   += -Os
OPT   += -fsingle-precision-constant
OPT   += -fno-common
OPT   += -ffunction-sections
OPT   += -fdata-sections

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

- #### 编译选项

  **工程命名**
  ```makefile
  PROJECT := breeze_firmware_none
  ```

  使用变量的方式来存储工程的名字，以便为之后编译生成的程序提供统一的命名。

  ---

  **目录引用**
  ```makefile
  DIR_DRIVERS   += ../Drivers/Driver_Clock/
  DIR_DRIVERS   += ../Drivers/Driver_Delay/
  DIR_DRIVERS   += ../Drivers/Driver_EEPROM/
  DIR_DRIVERS   += ../Drivers/Driver_Flash/
  DIR_DRIVERS   += ../Drivers/Driver_IIC/
  DIR_DRIVERS   += ../Drivers/Driver_IO/
  DIR_DRIVERS   += ../Drivers/Driver_NVIC/
  DIR_DRIVERS   += ../Drivers/Driver_SPI/
  DIR_DRIVERS   += ../Drivers/Driver_Timer/
  DIR_DRIVERS   += ../Drivers/Driver_USART/

  DIR_MODULES   += ../Modules/Module_Battery/
  DIR_MODULES   += ../Modules/Module_CommLink/
  DIR_MODULES   += ../Modules/Module_LED/
  DIR_MODULES   += ../Modules/Module_Motor/
  DIR_MODULES   += ../Modules/Module_MPU6050/
  DIR_MODULES   += ../Modules/Module_MS5611/
  DIR_MODULES   += ../Modules/Module_NRF24L01/

  DIR_ALGORITHM += ../Algorithm/Algorithm_Altitude/
  DIR_ALGORITHM += ../Algorithm/Algorithm_Control/
  DIR_ALGORITHM += ../Algorithm/Algorithm_Filter/
  DIR_ALGORITHM += ../Algorithm/Algorithm_Flight/
  DIR_ALGORITHM += ../Algorithm/Algorithm_IMU/

  DIR_INCLUDE   += -I../Libraries/CMSIS/ \
                   -I../Libraries/FWLib/inc/ \
                   $(addprefix -I, $(DIR_DRIVERS)) \
                   $(addprefix -I, $(DIR_MODULES)) \
                   $(addprefix -I, $(DIR_ALGORITHM)) \
                   -I../User/ \
  ```

  **DIR_DRIVERS**、**DIR_MODULES**和**DIR_ALGORITHM**这三个变量的作用是根据工程目录结构设计，使用相对路径的方式将底层驱动层、外设模块层和飞控算法层中的子目录分别添加到其中，为之后提取目录中的源码提供搜索路径。

  而**DIR_INCLUDE**变量主要用于获取工程目录结构中的所有.h头文件，其中包括官方开发库层中CMSIS和FWLib里的头文件，以及底层驱动层、外设模块层、飞控算法层和用户主函数目录中所有相关的头文件。这里，为了让大家看得更加清楚，我在每个目录后面都添加了反斜杠来进行转义，表示所有目录路径在逻辑上依然同处一行，但可以通过多行的形式进行显示。此外，我还用了GNU/Make中的`addprefix`函数，以下引用自《跟我一起学Makefile》：

  > $(addprefix &lt;prefix&gt;, &lt;names...&gt;)

  > 名称：加前缀函数——addprefix。

  > 功能：把前缀&lt;prefix&gt;加到&lt;names&gt;中的每个单词后面。

  > 返回：返回加过前缀的文件名序列。

  > 示例：$(addprefix src/,foo bar)返回值是“src/foo src/bar”。

  因此在工程Makefile中，`$(addprefix -I, \$(DIR_DRIVERS))`函数操作会在**DIR_DRIVERS**变量前面添加`-I`标志，即将DIR_DRIVERS目录下的头文件添加到编译器的头文件搜索路径中。这样做简单灵活，且具有更好的可扩展性。

  ---

  **源文件搜索**
  ```makefile
  SRC_C   += $(wildcard ../Libraries/CMSIS/*.c)
  SRC_C   += $(wildcard ../Libraries/FWLib/src/*.c)
  SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_DRIVERS)))
  SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_MODULES)))
  SRC_C   += $(wildcard $(addsuffix *.c, $(DIR_ALGORITHM)))
  SRC_C   += $(wildcard ../User/*.c)

  SRC_ASM := ../Libraries/CMSIS/startup/gcc/startup_stm32f10x_md.s

  OBJS    := $(filter %.o, $(SRC_ASM:.s=.o)) $(filter %.o, $(SRC_C:.c=.o))
  ```

  根据操作不难看出，**SRC_C**和**SCR_ASM**这两个变量用于分别存储C源码和汇编文件，其中SRC_C里用到了`wildcard`和`addsuffix`两个函数，这里首先对`wildcard`函数进行简单讲解，以下内容引用自liangkaiming的《[Makefile中的wildcard用法](http://blog.csdn.net/liangkaiming/article/details/6267357)》中的部分内容：

  > 在Makefile规则中，通配符会被自动展开。但在变量的定义和函数引用时，通配符将失效。这种情况下如果需要通配符有效，就需要使用函数“wildcard”，它的用法是：$(wildcard PATTERN...) 。在Makefile中，它被展开为已经存在的、使用空格分开的、匹配此模式的所有文件列表。如果不存在任何符合此模式的文件，函数会忽略模式字符并返回空。

  所以，`$(wildcard ../Libraries/CMSIS/\*.c)`的含义是获取../Libraries/CMSIS/目录下的所有.c源文件，其它的类似。而`$(wildcard $(addsuffix \*.c, $(DIR_DRIVERS)))`则在`wildcard`函数的基础上又嵌套了`addsuffix`函数，它跟之前讲过的`addprefix`功能类似，主要用来添加后缀。以内容下依旧引用自《跟我一起学Makefile》：

  > $(addsuffix &lt;suffix&gt;, &lt;names...&gt;)

  > 名称：加后缀函数——addsuffix。

  > 功能：把后缀&lt;suffix&gt;加到&lt;names&gt;中的每个单词后面。

  > 返回：返回加过后缀的文件名序列。

  > 示例：$(addsuffix .c,foo bar)返回值是“foo.c bar.c”

  因此，`$(wildcard $(addsuffix *.c, $(DIR_DRIVERS)))`函数的含义是首先在DIR_DRIVERS变量的后边添加.c后缀，然后再调用`wildcard`函数获取其中的所有.c源文件。这种通过函数组合来实现指定功能的方式可以大大减少编写Makefile的工作量，提高项目的开发效率。

  **OBJS**变量用于存储所有通过.c和.s源文件生成的中间目标文件（object files），这里用到了`filter`函数和变量的**替换规则**，先介绍一下`filter`函数：

  > $(filter &lt;pattern...&gt;, &lt;text&gt;)

  > 名称：过滤函数——filter。

  > 功能：以&lt;pattern&gt;模式过滤&lt;text&gt;字符串中的单词，保留符合模式&lt;pattern&gt;的单词。可以有多个模式。

  > 返回：返回符合模式&lt;pattern&gt;的字串。

  > 示例：
  > sources := foo.c bar.c baz.s ugh.h

  > foo: $(sources)

  > cc \\$(filter %.c %.s, $(sources)) -o foo

  > \\$(filter %.c %.s, $(sources))返回的值是“foo.c bar.c baz.s”。

  综上所述，`$(filter %.o, $(SRC_ASM:.s=.o))`和`$(filter %.o, $(SRC_C:.c=.o))`函数的执行过程如下：`filter`函数首先根据`$(SRC_ASM:.s=.o)`和`$(SRC_C:.c=.o)`所定义好的替换规则，分别将**SRC_ASM**和**SRC_C**变量中的.s和.c字符串替换成.o，然后从替换之后的变量中匹配出符合.o后缀的文件，最后返回字符串结果给**OBJS**变量。

  ---

  **链接脚本**
  ```makefile
  LINK_SCRIPT := ../Libraries/LinkScript/stm32f10x_flash.lds
  ```

  **LINK_SCRIPT**变量存储的是基于ARM-GCC编译器的链接脚本。

  ---

  **编译器可执行程序**
  ```makefile
  CC_PREFIX := arm-none-eabi-

  CC        := $(CC_PREFIX)gcc
  CXX       := $(CC_PREFIX)g++
  CP        := $(CC_PREFIX)objcopy
  GDB       := $(CC_PREFIX)gdb
  SIZE      := $(CC_PREFIX)size
  AS        := $(CC) -x assembler-with-cpp
  HEX       := $(CP) -O ihex
  BIN       := $(CP) -O binary -S
  ```

  以上一系列变量用于为ARM-GCC编译器相关可执行程序赋予新的别名，方便之后编译过程的使用。

  ---

  **编译选项**
  ```makefile
  DDEFS += -DSTM32F10X_MD
  DDEFS += -DHSE_VALUE=8000000 -DUSE_STDPERIPH_DRIVER

  DEFS  := $(DDEFS) -DRUN_FROM_FLASH=1

  MCU   := cortex-m3

  OPT   += -Os
  OPT   += -fsingle-precision-constant
  OPT   += -fno-common
  OPT   += -ffunction-sections
  OPT   += -fdata-sections

  SPECS := --specs=rdimon.specs -u _printf_float
  ```

  **DDEFS**和**DEFS**变量是ARM-GCC编译器的预处理宏定义，用于将指定的功能编译到可执行程序当中去：

  - **-DSTM32F10X_MD**
  -DSTM32F10X_MD选项表示该工程使用的是STM32F1系列的中容量芯片。如果你用的是小容量或大容量的芯片，请将此处对应地修改为-DSTM32F10X_LD或-DSTM32F10X_HD等选项。

  - **-DHSE_VALUE=8000000**
  -DHSE_VALUE=8000000选项用于配置STM32的外部晶振频率，其中8000000表示芯片使用的晶振频率为8MHz。

  - **-DUSE_STDPERIPH_DRIVER**
  -DUSE_STDPERIPH_DRIVER选项表示该工程会使用STM32官方提供的固件库。如果你自己的工程里没有使用STM32官方固件库，也可以不添加该选项。

  - **-DRUN_FROM_FLASH=1**
  -DRUN_FROM_FLASH=1选项用于指定程序从硬件的FLASH中开始运行。

  **MCU**变量表示当前工程所用芯片的架构。我们用的是STM32F1系列的芯片，所以该变量的值为cortex-m3。

  **OPT**(Optimization)变量用于表示**编译优化**方面的选项：

   - **-Os**
  -Os(Optimize size)选项指定编译器以-O2级别优化来进一步减少可执行程序所占空间的大小。

  - **fsingle-precision-constant**
  fsingle-precision-constant选项指定编译器将浮点型（floating-point）常量看成单精度常量而不把它们隐式地转换成双精度常量。

  - **-fno-common**
  -fno-common选项指定编译器应该将未初始化的全局变量放置到.o目标文件（object file）的数据段中而不是生成它们作为公共块（common blocks）。虽然当出现同一个变量在两个不同的编译中被声明的情况时，编译器会在链接过程中报**重复定义**的错误，但使用-fno-common选项编译目标程序可以更好地提高程序的性能（Unix C编译器传统上通过将变量放置在公共块中，以允许在不同编译单元中对这些变量进行多个定义，这种行为主要通过-fcommon选项来进行指定。但另一方面，ISO C标准并不要求这种行为，且对于某些可执行程序来说这种行为会带来变量引用上的速度或空间开销，因此-fno-common选项便出现了）。

  - **-ffunction-sections**和**-fdata-sections**
  -ffunction-sections和-fdata-sections选项指定编译器将每一个函数或数据项放置到输出文件的相应段里去，函数或数据项的名字决定了输出文件中相应段的名字。使用该选项可以让链接器执行优化来改进指令空间中引用的局部性，但代价是牺牲了目标文件和可执行文件的空间大小和速度。

  **SPECS**变量用于指定编译器所要读取的**规格**（specs）文件，在命令行里可以指定多个规格文件，编译器会根据顺序从左到右依次进行处理。

  ---

  **编译标签**
  ```makefile
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
  ```
  ---

  - **MCU标签**
    ```makefile
    FLAGS_MCU := -mcpu=$(MCU)
    ```

    **-mcpu**选项用于指定目标处理器的名字（目前其值为cortex-m3）。GCC可通过该选项确定使用什么样的CPU指令集来生成对应的汇编代码，并确定目标处理器的性能调优。

  - **汇编标签**
    ```makefile
    FLAGS_AS  := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb
    ```
    **编译标签**中的`-c`选项指定编译器编译或汇编源文件，但并不进行链接；`-g`选项用于生成程序的调试信息，为之后的GDB调试提供基础；`-gdwarf-2`选项用于指定编译器生成DWARF-2格式的调试信息；`-mthumb`选项指定生成的代码能以**Thumb**状态运行。

  - **C编译标签**
    ```makefile
    FLAGS_C   := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb \
                 -fomit-frame-pointer -Wall -fverbose-asm $(DEFS)
    ```

    **C编译标签**除了**编译标签**中所讲过的内容，还有`-fomit-frame-pointer`、`-Wall`和`-fverbose-asm`。其中`-fomit-frame-pointer`选项减少了栈帧的切换和栈地址的保存，可提高程序性能；`-Wall`选项用于打开代码的所有可选警告；`-fverbose-asm`选项用于在生成的汇编代码中加入额外的注释信息来使汇编代码更具可读性。

  - **CXX编译标签**
    ```makefile
    FLAGS_CXX := $(SPECS) $(FLAGS_MCU) $(OPT) -c -g -gdwarf-2 -mthumb \
                 -fomit-frame-pointer -Wall -fverbose-asm -fno-exceptions \
                 -fno-rtti -fno-threadsafe-statics -fvisibility=hidden -std=c++11 \
                 $(DEFS)
    ```

    **CXX编译标签**中的`-fno-exceptions`选项用于禁用异常机制；`-fno-rtti`选项用于禁用C++运行时类型信息的生成；`-fno-threadsafe-statics`选项用于禁用局部静态变量的线程安全初始化；`fvisibility=hidden`选项用于隐藏ELF格式的符号名称；`-std=c++11`选项指定编译器使用C++ 11标准对源文件进行编译。

  - **链接标签**
    ```makefile
    FLAGS_LD  := $(SPECS) $(FLAGS_MCU) $(OPT) -lm -g -gdwarf-2 -mthumb \
                 -nostartfiles -Xlinker --gc-sections -T$(LINK_SCRIPT) \
                 -Wl,-Map=$(PROJECT).map,--cref,--no-warn-mismatch
    ```

    **链接标签**中的`-lm`选项用于链接libm.so库，即math数学函数库；`-nostartfiles`选项指定在链接的时候不使用系统标准的启动文件；`-T$(LINK_SCRIPT)`选项指定使用$(LINK_SCRIPT)变量的值作为工程的链接脚本。

    `-Xlinker`和`-Wl`两个选项都用于传递参数给链接器，区别首先在于`-Xlinker`是使用空格进行多个参数的划分，而`-Wl`则使用逗号。除此之外，如果你想传递一个包含有多个参数的选项，你就必须使用`-Xlinker`两次，第一次是为了指定选项，第二次则是为了指定参数。举个例子，对于传递`-assert definitions`命令给链接器，你必须写成`-Xlinker -assert -Xlinker defintions`而不是`-Xlinker "-assert definitions"`，因为链接器会认为这是一个参数。如果你用的是GNU的链接器，通常更简便的做法就是用`option=value`的方式，比如`-Xlinker -Map -Xlinker output.map`可以简写成`-Xlinker -Map=output.map`。而对于`Wl`来说，前面的例子可以则写成`-Wl,-Map,output.map`。

    最后介绍一下由`-Xlinker`和`-Wl`所传递的选项的功能：`-gc-sections`选项用于指定编译器不把未在可执行程序中进行调用的函数链接到可执行程序中，这样做可在一定程度上节约FLASH和内存空间；`-Map=$(PROJECT).map`选项用于将链接的映射关系打印到标准输出上；`--cref`选项是**Cross Reference**的简写，用于输出交叉引用表；`--no-warn-mismatch`选项告诉链接器当出现**不匹配**的问题时，需要对其进行忽略。

  **调试器类型**
  ```makefile
  TYPE_BURN  := openocd_swd_flash
  TYPE_DEBUG := openocd_swd_debug
  TYPE_ERASE := openocd_swd_erase
  ```

  根据名字可以知道，以上三个变量分别代表调试器烧写、调试和擦除的类型。由于目前该工程使用的调试器为J-Link，软件为OpenOCD，并且基于J-Link的SWD模式与硬件进行数据通信，所以上述三个变量的值是固定的。如果以后工程添加了新的调试器命令（比如ST-Link等），用户可以通过修改相应变量的值（必须要在下面的**调试器命令**部分中存在）来自行选择使用哪种调试器进行烧写、调试和擦除操作。

- #### 编译命令

  **伪目标定义**
  ```makefile
    .PHONY: all burn debug erase clean
  ```

  这里首先介绍一下什么是**伪目标**：伪目标并不是一个文件，而是一个标签，我们通常用它来执行某种特定的功能，比如使用`make clean`来清理编译过程中生成的中间文件，其中`clean`就是伪目标。当伪目标的取名与文件名不重复时，GNU/Make会自动将伪目标识别为标签，执行其中定义好的命令，但是如果伪目标与文件名重复，那么便会出现问题，举个简单的例子：Makefile文件中存在有如下的伪目标定义，且恰好该目录中有一个名为clean的文件：

  ```makefile
  clean:
      -rm -rf *.o
  ```

  这时若执行`make clean`命令，GNU/Make会以clean文件已存在且Makefile中的clean规则不存在依赖关系为由，不执行该操作。当然，为避免这种情况的发生，我们可以使用**.PHONY**关键字来显示地指明`clean`目标是一个伪目标，即就像下面这样：

  ```makefile
  .PHONY: clean

  clean:
      -rm -rf *.o
  ```

  只要有.PHONY声明，不管是否有clean这个文件，只要执行`make clean`命令，GNU/Make便会调用Shell中的rm命令对中间文件进行删除操作。

  伪目标一般没有依赖的文件。但是，我们也可以为伪目标指定所依赖的文件。伪目标同样可以作为**默认目标**，只要将其放在第一个。一个示例就是，如果你的Makefile需要一口气生成若干个可执行文件，但你只想简单地敲一个make完事，并且，所有的目标文件都写在一个Makefile中，那么你可以使用伪目标这个特性：

  ```makefile
  all: $(OBJS) $(PROJECT).elf $(PROJECT).hex $(PROJECT).bin
      $(SIZE) $(PROJECT).elf
  ```

  我们知道，Makefile中的第一个目标会被作为其默认目标。我们声明了一个`all`的伪目标，其依赖于其它四个目标。由于伪目标的特性是，总是被执行的，所以其依赖的那四个目标就总是不如`all`这个目标新。所以，其它四个目标的规则总是会被决议。也就达到了我们一口气生成多个目标的目的。

  当然，从上面的例子我们可以看出，目标也可以成为依赖。所以，伪目标同样也可成为依赖：

  ```makefile
  burn: $(TYPE_BURN)
  ```

  `burn`是伪目标，而$(TYPE_BURN)变量的当前值为`openocd_swd_flash`，它也是一个伪目标。我们可以很方便地使用`make burn`或`make openocd_swd_flash`将编译好的程序烧写到硬件中去。

  ---

  **编译规则**
  ```makefile
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
  ```

  编译规则里面用到了GNU/Make的**模式规则**和**自动化变量**等高级用法，以下首先对**模式规则**的用法进行介绍（内容摘自《跟我一起写Makefile》）：

  > 模式规则中，至少在规则的目标定义中要包含"%"，否则，就是一般的规则。目标中的"%"定义表示对文件名的匹配，"%"表示长度任意的非空字符串。例如："%.c"表示以".c"结尾的文件名（文件名的长度至少为3），而"s.%.c"则表示以"s."开头，".c"结尾的文件名（文件名的长度至少为5）。

  > 如果"%"定义在目标中，那么，目标中的"%"的值决定了依赖目标中的"%"的值，也就是说，目标中的模式的"%"决定了依赖目标中"%"的样子。

  举个例子，若存在以下的模式规则：

  ```makefile
  %.o : %.c
      <command>
  ```

  则它指定了怎么从所有的[.c]文件生成相应的[.o]文件的规则。如果要生成的目标是`a.o b.o`，那么`%.c`就是`a.c b.c`。当然，一旦`%`模式被确定，GNU/Make会匹配当前工程目录下所有符合要求的文件名，并执行模式规则下的命令。

  下面对**自动化变量**进行介绍（摘自《跟我一起写Makefile》）：

  > 在上述的模式规则中，目标和依赖文件都是一系例的文件，那么我们如何书写一个命令来完成从不同的依赖文件生成相应的目标？因为在每一次的对模式规则的解析时，都会是不同的目标和依赖文件。

  > 所谓自动化变量，就是这种变量会把模式中所定义的一系列的文件自动地挨个取出，直至所有的符合模式的文件都取完了。这种自动化变量只应出现在规则的命令中。

  > \\$@：
  表示规则中的目标文件集。在模式规则中，如果有多个目标，那么，"$@"就是匹配于目标中模式定义的集合。

  > \\$%：
  仅当目标是函数库文件中，表示规则中的目标成员名。例如，如果一个目标是"foo.a (bar.o)"，那么，"\\$%"就是"bar.o"，"$@"就是"foo.a"。如果目标不是函数库文件（Unix下是[.a]，Windows下是[.lib]），那么，其值为空。

  > \\$<：
  依赖目标中的第一个目标名字。如果依赖目标是以模式（即"%"）定义的，那么"$<"将是符合模式的一系列的文件集。注意，其是一个一个取出来的。

  > $?：
  所有比目标新的依赖目标的集合。以空格分隔。

  > $^：
  所有的依赖目标的集合。以空格分隔。如果在依赖目标中有多个重复的，那个这个变量会去除重复的依赖目标，只保留一份。

  > \\$+：
  这个变量很像"$^"，也是所有依赖目标的集合。只是它不去除重复的依赖目标。

  > \\$\*：
  这个变量表示目标模式中"%"及其之前的部分。如果目标是"dir/a.foo.b"，并且目标的模式是"a.%.b"，那么，"\\$\*"的值就是"dir/a.foo"。这个变量对于构造有关联的文件名是比较有较。如果目标中没有模式的定义，那么"\\$\*"也就不能被推导出，但是，如果目标文件的后缀是make所识别的，那么"\\$\*"就是除了后缀的那一部分。例如：如果目标是"foo.c"，因为".c"是make所能识别的后缀名，所以，"\\$\*"的值就是"foo"。这个特性是GNU make的，很有可能不兼容于其它版本的make，所以，你应该尽量避免使用"\\$\*"，除非是在隐含规则或是静态模式中。如果目标中的后缀是make所不能识别的，那么"\\$\*"就是空值。

  根据以上介绍的**模式规则**和**自动化变量**等高级用法，我们来具体地分析一下本项目Makefile中**编译规则**里的相关内容：

  ```makefile
  %.o: %.c
      $(CC) $(FLAGS_C) $(DIR_INCLUDE) $< -o $@
  ```

  这条规则通过使用ARM-GCC编译器，并根据之前定义好的**编译标签**和**头文件目录**，将所有[.c]文件编译成相对应的[.o]文件，其中`$<`表示[.c]文件的依次值，而`$@`则表示[.o]文件的依次值。

  同理，由于剩余的规则用法与上面讲的类似，这里就不过多进行介绍了，只依次简要地说明一下它们的功能：使用汇编器将所有[.s]文件汇编成[.o]文件；使用编译器将所有的[.o]文件链接成[.elf]格式文件；分别使用`$(HEX)`和`$(BIN)`工具将[.elf]文件转变成可供烧写的[.hex]和[.bin]文件。

  ```makefile
  %.o: %.s
      $(AS) $(FLAGS_AS) $< -o $@

  %.elf: $(OBJS)
      $(CC) $(OBJS) $(FLAGS_LD) -o $@

  %.hex: %.elf
      $(HEX) $< $@

  %.bin: %.elf
      $(BIN) $< $@
  ```

- #### 调试器命令

  **调试器定义**
  ```makefile
  burn:  $(TYPE_BURN)
  debug: $(TYPE_DEBUG)
  erase: $(TYPE_ERASE)
  ```

  确定**烧写**、**调试**和**擦除**等功能所使用的调试器命令。

  **烧写命令**
  ```makefile
  openocd_swd_flash: $(PROJECT).bin
      openocd -f interface/jlink.cfg -c "transport select swd" -f
      target/stm32f1x.cfg -c "init" -c "reset halt" -c "sleep 100" -c "wait_halt
      2" -c "flash write_image erase $(PROJECT).bin 0x08000000" -c "sleep 100" -c
      "verify_image $(PROJECT).bin 0x08000000" -c "sleep 100" -c "reset run" -c
      shutdown
  ```

  **烧写命令**的重点在于OpenOCD的命令参数，以下对其进行简要介绍：

  - **-f interface/jlink.cfg**
  指定OpenOCD使用系统`interface`目录下的`jlink.cfg`调试适配器配置文件。

  - **-c "transport select swd"**
  指定调试适配器使用SWD模式进行数据传输。

  - **-f target/stm32f1x.cfg**
  指定OpenOCD使用系统`target`目录下的`stm32f1x.cfg`芯片配置文件。

  - **-c "init"**
  该命令指定OpenOCD结束配置而进入运行阶段。

  - **-c "reset run"**
  执行硬件复位，将所有已定义的目标重置，并开始目标的运行。

  - **-c "reset halt"**
  执行硬件复位，将所有已定义的目标重置，并立即停止目标的运行。

  - **-c "sleep 100"**
  指定OpenOCD在状态恢复之前等待至少100毫秒。

  - **-c "wait_halt 2"**
  指定OpenOCD等待目标停止的时间为2毫秒。

  - **-c "flash write_image erase $(PROJECT).bin 0x08000000"**
  指定OpenOCD将通过ARM-GCC编译生成的$(PROJECT).bin镜像文件烧写到当前目标硬件的FLASH块中，其中**0x08000000**是STM32芯片默认的重定位偏移量，在烧写镜像的过程中，它会被自动添加到镜像文件每个段的基址上，用于确保程序可以从正确的地址上运行。最后，在**erase**参数被指定后，相关FLASH扇区会在编程之前被擦除掉。

  - **-c "verify_image $(PROJECT).bin 0x08000000"**
  指定OpenOCD从**0x08000000**地址处开始验证**$(PROJECT).bin**镜像文件的数据是否正确，首先尝试使用CRC校验，若失败则直接对二进制文件进行比较。

  - **-c shutdown**
  该命令会关闭OpenOCD服务器，并断开所有与之相连的客户端（如GDB，Telnet等）。

  在介绍完以上有关OpenOCD的命令参数之后，相信大家对OpenOCD的用法有了一个基本的认识，接下来总结一下本项目OpenOCD的整个烧写流程：

  ```plain
  设置调试适配器驱动为J-Link。
  设置调试适配器使用SWD模式来进行数据传输。
  设置目标芯片的类型为STM32F1系列。
  调用OpenOCD的init命令开始执行烧写操作。
  调用OpenOCD的reset halt命令重置并停止目标的运行。
  延迟100毫秒等待状态恢复。
  延迟2毫秒等待目标停止运行。
  调用OpenOCD的flash write_image命令执行擦除和烧写文件操作。
  延迟100毫秒等待状态恢复。
  调用OpenOCD的verify_image命令验证烧写到STM32中的镜像文件是否正确。
  延迟100毫秒等待状态恢复。
  调用OpenOCD的reset run命令重置并开始目标的运行。
  关闭OpenOCD服务器。
  ```
  ---

  **调试命令**
  ```makefile
  openocd_swd_debug: $(PROJECT).bin
      xterm -e openocd -f interface/jlink.cfg -c "transport select swd" -f
      target/stm32f1x.cfg -c "init" -c "halt" -c "reset halt" &
      $(GDB) --eval-command="target extended-remote localhost:3333" $(PROJECT).elf
  ```

  **调试命令**基本上和**烧写命令**类似，不同点在于当OpenOCD经过初始化并启动完服务器之后，Makefile会调用arm-none-eabi-gdb工具执行`target extended-remote localhost:3333`命令来建立GDB与OpenOCD的GDBServer之间的数据通信，并加载名为**$(PROJECT).elf**的程序到GDB中完成调试的初始化工作。而至于如何使用GDB进行调试，网上有非常多的资料，这里就不再进行介绍了。

  ---

  **擦除命令**
  ```makefile
  openocd_swd_erase:
      openocd -f interface/jlink.cfg -c "transport select swd" -f
      target/stm32f1x.cfg  -c "init" -c "reset halt" -c "sleep 100" -c "stm32f1x
      mass_erase 0" -c "sleep 100" -c shutdown
  ```

  **擦除命令**依然和上面讲过的**烧写命令**类似，不同点在于OpenOCD会使用`-c "stm32f1x mass_erase 0`命令来擦除STM32芯片的FLASH中0号扇区里的所有内容，该命令通常用于解锁受保护的FLASH。

- #### 清理命令

  ```makefile
  clean:
      -rm -rf $(OBJS)
      -rm -rf $(PROJECT).elf
      -rm -rf $(PROJECT).map
      -rm -rf $(PROJECT).hex
      -rm -rf $(PROJECT).bin
  ```

  通过调用Shell中的rm -rf命令来强制递归删除工程的所有因编译所产生的文件。

## 总结

读到这里，我相信大家对Breeze微型四轴飞行器的嵌入式架构以及工程本身的Makefile有了一个比较清楚的认识。这里，我想再强调一下项目整体架构以及目录组织结构的重要性，一个开源项目能否成功在很大程度上取决于系统架构设计的好坏，优秀的系统架构可以降低各模块之间的耦合性，提高底层代码的封装性，并向上提供较为丰富的API接口，除此之外，最重要的是它统一了接口标准，降低程序开发的复杂程度，从而提高系统整体的鲁棒性。当然，拥有设计出色的系统架构之后，我们还需要根据其来组织整个项目工程的目录结构，把不同功能的代码、Makefile以及开发文档等放到不同的目录当中去，这样有利于后期项目代码的编写和维护等工作。

在接下来的文章中，我将会为大家讲解STM32链接脚本的工作原理和相关配置，并分析其在程序链接和运行阶段的作用。由于下一篇的链接脚本部分涉及很多非常深奥的软件底层知识，所以我希望那些想深入理解STM32嵌入式程序是如何在硬件上运行的同学可以提前先看看《C专家编程》这本书中的**“第6章 运动的诗章：运行时数据结构”**，里面对程序的堆、栈和段进行了介绍，对你理解链接脚本中的相关内容有着很好的促进作用。最后，我还是希望能有更多的爱好者可以从本系列教程中受益匪浅。

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
