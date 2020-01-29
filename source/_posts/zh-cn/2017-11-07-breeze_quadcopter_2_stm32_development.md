---
title: Breeze微型四轴系列（二）：STM32嵌入式开发-开发环境搭建
date: 2017-11-07 22:10:00
tags:
  - Micro Quadcopter
  - STM32
  - GNU/Linux
  - GNU/Make
  - Makefile
  - ARM-GCC
  - OpenOCD
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴飞行器STM32嵌入式开发-开发环境搭建的相关内容。
feature: http://media.myyerrol.io/images/features/breeze.png
toc: true
comments: true
---

## 前言

我跟很多刚开始接触STM32的同学一样，都是先通过各种渠道获得战舰的开发板（我是从机器人基地电子组那里借了一个STM32最小系统板），然后边看着《原子教你玩转STM32》，边用KEIL MDK编写代码来入门STM32嵌入式开发的。在学习的过程中，我发现虽然KEIL MDK集代码编辑、编译、下载、调试为一体，并且提供了非常友好的图形操作界面，但是它的代码编辑功能实在是做得很一般，而且最关键的是它不能在GNU/Linux和Mac OS上跨平台运行。因此，为了提高项目的开发效率并且践行开源的宗旨，我决定遵循[HandsFree](https://hands-free.github.io)的[OpenRE](https://github.com/HANDS-FREE/OpenRE)库（由我们西工大舞蹈机器人基地学长们联合创立的开源机器人软硬件项目）以及很多国外开源飞控项目所做的那样，使用GNU/Linux下的开源工具链来搭建Breeze微型四轴飞行器的嵌入式开发环境。

<!--more-->

## 搭建

### 开发工具

- #### GNU/Make

  [GNU/Make](https://www.gnu.org/software/make)是一个控制从程序的源文件中生成程序的可执行文件和其他非源文件的自动化工具，它可以通过读取包含有每个非源文件以及生成依赖规则的Makefile文件来构建程序。GNU/Make拥有以下几个能力：

  - GNU/Make允许最终的用户不需要知道整个构建的具体细节就可以完成软件包的编译和安装，因为这些细节都存在于软件提供者的Makefile文件中。

  - GNU/Make能够根据哪些源文件已经更改，自动生成需要更新的文件。除此之外，它也会自动确定更新文件的正确顺序，以防止一个非源文件依赖于另一个非源文件。因此，如果开发者修改了几个源文件，然后运行make命令，GNU/Make只会更新那些直接或间接依赖于已修改的源文件的非源文件，而不会重新编译所有的程序。

  - GNU/Make不限于任何特定的语言。对于程序中的每个非源文件，Makefile都会指定Shell命令来处理它，比如使用Shell命令运行编译器或链接器来生成目标文件或可执行文件，使用TeX或Makeinfo工具来格式化文档等。

  - GNU/Make的功能不仅限于构建软件包。开发者还可以使用它来控制安装或卸载软件包，为其生成标签表或实现其他任何开发者想要做的操作。

- #### ARM-GCC

  {% alert success %}
  以下内容部分摘自VeryARM网站中的《arm交叉编译器gnueabi、none-eabi、arm-eabi、gnueabihf、gnueabi区别》文章。
  {% endalert %}

  ARM-GCC是一套交叉编译工具链家族，其命名规则统一为：**arch [-vendor] [-os] [-(gnu)eabi]**：

  - **arch**
  代表芯片的体系架构，比如ARM，MIPS等。

  - **vendor**
  代表工具链的提供商。

  - **os**
  代表目标开发板所使用的操作系统。

  - **eabi**
  代表**Embedded Application Binary Interface**，即嵌入式应用二进制接口。

  ARM-GCC家族主要成员具体如下：

  - **arm-none-eabi-gcc**
  (ARM architecture, **no** vendor, **not** target an operating system, complies with the ARM EABI)
  主要用于编译ARM架构的裸机系统（包括ARM Linux的Boot和Kernel，不适用编译Linux应用），一般适合ARM7、Cortex-M和Cortex-R内核等芯片使用，不支持那些跟操作系统关系密切的函数。除此之外，该编译器在底层使用了**newlib**这个专用于嵌入式系统的C库。

  - **arm-none-linux-gnueabi-gcc**
  (ARM architecture, **no** vendor, creates binaries that run on the Linux operating system, and uses the GNU EABI)
  arm-none-linux-gnueabi-gcc是一款基于GCC，底层使用**glibc**库，并经过Codesourcery公司优化后所推出的编译器，其浮点运算的处理能力非常优秀，主要用于编译基于ARM架构（ARM9、ARM11以及Cortex-A9）的Linux系统（包括ARM架构的U-boot、Linux内核和Linux应用等）。

  - **arm-eabi-gcc**
  主要用于编译运行在Android ARM架构上的应用程序。

  - **armcc**
  ARM公司官方推出的编译工具，功能和arm-none-eabi-gcc类似，可以编译裸机程序（U-boot和Kernel），但是不能编译Linux应用程序。armcc一般是和ARM集成开发工具一起进行发布的，比如KEIL MDK、ADS、RVDS和DS-5中都将armcc作为自己默认的编译器，是付费软件。

  根据以上的介绍，由于Breeze微型四轴飞行器采用的是基于Cortex-M3架构的STM32F1芯片，所以我们选择用**arm-none-eabi-gcc**来作为该项目交叉编译的工具链，目前该工具链的预编译二进制版本可以在[GNU ARM Embedded Toolchain](https://launchpad.net/gcc-arm-embedded)官网上查看并进行下载。

- #### OpenOCD

  [OpenOCD](http://openocd.org)项目最早是由Dominic Rath发起，它的目标是开发出一种能够接入市场上大多数常见MCU、MPU和FPGA等平台的通用开源片上调试器（Open On-Chip Debuger），并提供调试、系统内在线编程和边界扫描测试等功能。具体使用的时候，OpenOCD需要依靠一种叫做**调试适配器**（点击[这里](http://openocd.org/doc-release/html/Debug-Adapter-Hardware.html#Debug-Adapter-Hardware)获得OpenOCD所支持的完成设备列表）的硬件模块来帮助其在底层提供与目标板子相一致的电信号，因此只要在配置文件中对所使用的芯片和调试适配器的具体型号进行指定，OpenOCD就可以通过驱动与连接有硬件芯片的适配器进行数据通信，从而最终实现板级代码的烧写和调试。

  通常市场上常见的调试适配器都可以支持一种或多种传输协议，比如在本项目中，我使用的 SEGGER J-Link设备就支持JTAG(Joint Test Action Group，即联合测试工作组)和SWD(Serial Wire Debug，即串口总线调试)两种通信协议。这里我推荐使用SWD模式来烧写和调试代码，主要是因为SWD只需要两根线就可以轻松完成适配器与硬件之间的连接，而且在SWD模式下，适配器烧写代码的速度更快。最后，有关项目中OpenOCD的具体配置，我会在下一篇文章中进行详细介绍。

- #### Atom

  [Atom](https://atom.io)是GitHub开发团队“为21世纪创造的可配置的编辑器”，它拥有非常精致细腻的界面，并且可配置项丰富，加上它提供了包管理功能，人们可以非常方便地安装和管理各种插件，并将Atom打造成真正适合自己的开发工具。除此之外，Atom代码编辑器还支持Windows、Mac、GNU/Linux三大桌面平台，完全免费，并且已经在GitHub上开放了全部的源代码，在经过一段长时间的迭代开发和不断改进后，Atom在性能和稳定性方面都有着显著的改善。

  这里我选用Atom作为编辑器主要是因为它完全免费，并且拥有很多功能丰富的插件，其中我最喜爱的就是Atom编辑器本身所集成的Git插件，它可以通过颜色的不同（新添加的为绿色，修改的为黄色，删除的为红色）把对代码和文本的修改显示在编辑器的界面上，而且有改动的文件其文件名和所在文件夹名都会被标记为高亮显示，编辑器底部也会显示当前代码仓库所在分支和对文件所修改的行数统计，这对于像我这样基本每天都会Commit的用户来说是非常方便的。

### 配置流程

- #### 安装基础环境

  以下命令主要安装Git和GNU/Make这两个开发工具，其中make软件是包含在build-essential元包（meta-package）当中的（build-essential元包是GNU/Linux为方便开发者所特别制作的，里面除make软件外，还有gcc、g++以及软件库等编译代码时所需要的相关组件）。

  ```bash
  $> sudo apt-get update
  $> sudo apt-get install git build-essential
  ```

- #### 安装ARM-GCC

  **PPA源安装**
  以下命令来源于[GNU ARM Embedded Toolchain PPA](https://launchpad.net/~team-gcc-arm-embedded/+archive/ubuntu/ppa)网站，目前支持Ubuntu 12.04/14.04/16.04/16.10 32/64-bit操作系统，是官方**推荐**的安装方法，本项目使用的就是这种安装方法。

  ```bash
  $> sudo add-apt-repository ppa:team-gcc-arm-embedded/ppa
  $> sudo apt-get udpate
  $> sudo apt-get install gcc-arm-embedded
  ```

  当然，如果你之前也看过国外开源飞控中有关交叉工具链安装方法方面的资料，你就会发现下面这种PPA源安装方式也很常见：

  ```bash
  $> sudo add-apt-repository ppa:terry.guo/gcc-arm-embedded
  $> sudo apt-get update
  $> sudo apt-get install gcc-arm-none-eabi
  ```

  这里我要解释一下以上两种PPA源安装方式的区别，以下内容摘自[GNU ARM Embedded Toolchain官网的通告](https://launchpad.net/gcc-arm-embedded/+announcement/13824)：

  > For our 2015Q4 GCC 5 release we decided to move from the old PPA maintained by Terry Guo to a team maintained one. We also took advantage of that move to rename the package from **gcc-arm-none-eabi** to **gcc-arm-embedded**.

  上面的文字已经写得非常清楚了，从2015Q4 GCC 5版本开始，官方就将PPA源由原先Terry Guo个人维护改成新的基于团队管理的模式，并且将安装包的名字从gcc-arm-none-eabi改为gcc-arm-embedded。所以以上两种安装方式都没问题，只是Terry Guo的PPA源中arm-none-eabi-gcc的版本可能会偏低。

  **手动安装**
  在终端中运行以下命令来手动安装arm-none-eabi-gcc。首先通过wget命令把工具链下载到本地，然后使用tar命令对文件进行解压缩，最后将工具链的bin目录添加到系统环境变量当中，并用source命令对PATH路径进行更新就可以了。

  ```bash
  $> cd ~/Downloads
  $> wget https://launchpad.net/gcc-arm-embedded/5.0/5-2016-q3-update/+download/gcc-arm-none-eabi-5_4-2016q3-20160926-linux.tar.bz2
  $> tar -xvf gcc-arm-none-eabi-5_4-2016q3-20160926-linux.tar.bz2
  $> echo "export PATH=$PATH:$HOME/Downloads/gcc-arm-none-eabi-5_4-2016q3/bin" >> ~/.bashrc
  $> source ~/.bashrc
  ```

  最后，根据[zhengyangliu123](http://my.csdn.net/zhengyangliu123)在《[STM32高级开发(5)-gcc-arm-none-eabi](http://blog.csdn.net/zhengyangliu123/article/details/54783443)》博客中所讲到的内容，64位的Ubuntu需要安装lsb-core工具才可以正常使用工具链，使用下面的命令进行安装：

  ```bash
  $> sudo apt-get update
  $> sudo apt-get install lsb-core
  ```

- #### 安装OpenOCD

  OpenOCD工具很好安装，因为Ubuntu的官方仓库中已经包含有该软件包，所以直接使用下面的命令安装即可（不是最新版本的，如果需要最新的0.10.0版本可以从官方仓库中进行下载，并使用make进行编译和安装）：

  ```bash
  $> sudo apt-get update
  $> sudo apt-get install openocd
  ```

- #### 安装Atom

  Atom编辑器可以使用下面PPA源的方式安装，也可以直接到官网上下载对应操作系统位数的.deb包来进行安装（个人喜欢PPA源安装方式，主要是因为系统可以帮你自动解决软件依赖问题）。

  ```bash
  $> sudo add-apt-repository ppa:webupd8team/atom
  $> sudo apt-get update
  $> sudo apt-get install atom
  ```

- #### 下载并编译源码

  ```bash
  $> cd ~/Desktop
  $> git clone https://github.com/microdynamics-quadcopter/breeze_firmware_none.git
  $> cd breeze_firmware_none/make
  $> make all
  ```

  ![breeze_make_all](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_make_all.png)

- #### 烧写或调试程序

  ```bash
  $> make burn
  ```

  ![breeze_make_burn](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_make_burn.png)

  ```bash
  $> make Debug
  ```

  ![breeze_make_debug](http://media.myyerrol.io/images/quadcopters/breeze/embedded/breeze_make_debug.png)

## 总结

首先我要说的是目前国内高校的STM32嵌入式教育基本上被KEIL+IAR所垄断了，虽然这些商业化的软件把代码编辑、编译和调试等功能集成在一个带有界面的程序当中，这对于很多刚开始接触STM32开发的新手来说是非常方便的，但是其缺点也非常明显：**它们阻碍了初学者对交叉编译工具链以及整个编译过程的理解**。而且相比于开发X86或X64架构的桌面程序，我个人认为编写嵌入式程序的开发者更需要理解编译器的相关知识，因为往往硬件的ROM、RAM或FLASH空间是非常有限的，你只有通过学习才能知道如何通过设置编译器的命令参数来优化.bin或.elf生成文件的大小。除此之外，你还能通过配置链接脚本中TEXT段、DATA段、BSS段以及堆、栈的起始地址和空间容量等参数来获得定制STM32程序运行时的能力。因此，对于那些刚开始学习STM32并打算精通其开发的同学来说，我推荐一开始就放弃**Windows+KEIL MDK**的固有学习模式，而直接使用**GNU/Linux+ARM GCC+OpenOCD**搭建开发环境来进行学习。虽然大家在刚开始学的过程中会出现很多问题，也会觉得很不适应，但是我相信过一段时间之后你就会明白这套开源工具链的强大之处了。

最后通过以上的介绍，我想大家对开发工具链以及其整个配置流程都有了一个比较清晰的认识，接下来我会通过介绍项目仓库中Makefile的设计思想和参数配置来详细讲解在GNU/Linux下是如何像KEIL MDK那样对STM32工程进行组织的，以及ARM-GCC和OpenOCD这两个软件的具体使用方法。当然，这里我要特别感谢HandsFree OpenRE库的创建者（马学长和陈学长）和相关维护人员，让我可以非常方便地学习到GNU/Linux下STM32嵌入式开发的相关知识。除此之外，我也非常感谢以上文章中所介绍过的开发工具的缔造者们，是他们让我真正体会到了什么是嵌入式开发应有的效率和乐趣！

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
