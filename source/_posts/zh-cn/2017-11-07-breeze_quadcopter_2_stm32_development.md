---
title: Breeze微型四轴系列（二）：STM32嵌入式开发-开发环境搭建
date: 2017-11-07 22:10
tags:
  - Micro Quadcopter
  - STM32
  - GNU/Linux
  - Make
  - Makefile
  - ARM-GCC
  - OpenOCD
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴飞行器STM32嵌入式开发-开发环境搭建的相关内容。
feature: /images/breeze/breeze.png
toc: true
comments: true
---

## 前言

我跟很多刚开始接触STM32的同学一样，都是先通过各种渠道获得战舰的开发板（我是从机器人基地电子组那里借了一个STM32最小系统板），然后边看着《原子教你玩转STM32》，边用Keil MDK编写代码来入门STM32嵌入式开发的。在学习的过程中，我发现虽然Keil MDK集代码编辑、编译、下载、调试为一体，并且提供了非常友好的图形操作界面，但是它的代码编辑功能实在是做得很一般，而且最关键的是它不能在GNU/Linux和Mac OS上跨平台运行。因此，为了提高项目的开发效率并且践行开源的宗旨，我决定遵循[HandsFree](https://hands-free.github.io)的[OpenRE](https://github.com/HANDS-FREE/OpenRE)库（由我们西工大舞蹈机器人基地学长们联合创立的开源机器人软硬件项目）以及很多国外开源飞控项目所做的那样，使用GNU/Linux下的开源工具链来搭建Breeze微型四轴飞行器的嵌入式开发环境。

<!--more-->

## 搭建

### 开发工具

- #### Make

- #### ARM-GCC

- #### OpenOCD

  [OpenOCD](http://openocd.org)项目最早是由Dominic Rath发起，它的目标是开发出一种能够接入市场上大多数常见MCU平台的通用开源片上调试器（Open On-Chip Debuger），并提供调试、系统内在线编程和边界扫描测试等功能。具体使用的时候，OpenOCD需要依靠一种叫做**调试适配器**（点击[这里](http://openocd.org/doc-release/html/Debug-Adapter-Hardware.html#Debug-Adapter-Hardware)获得OpenOCD所支持的完成设备列表）的硬件模块来帮助其在底层提供与目标板子相一致的电信号，因此只要在配置文件中对所使用的芯片和调试适配器的具体型号进行指定，OpenOCD就可以通过驱动与连接有硬件芯片的适配器进行数据通信，从而最终实现板级代码的烧写和调试。

  通常市场上常见的调试适配器都可以支持一种或多种传输协议，比如在本项目中，我使用的 SEGGER J-Link设备就支持JTAG(Joint Test Action Group，即联合测试工作组)和SWD(Serial Wire Debug，即串口总线调试)两种通信协议。这里我推荐使用SWD模式来烧写和调试代码，主要是因为SWD只需要两根线就可以轻松完成适配器与硬件之间的连接，而且在SWD模式下，适配器烧写代码的速度较快。最后，有关项目中OpenOCD的具体配置，我会在下一篇文章中进行详细介绍。

- #### Atom

  [Atom](https://atom.io)是GitHub开发团队“为21世纪创造的可配置的编辑器”，它拥有非常精致细腻的界面，并且可配置项丰富，加上它提供了包管理功能，人们可以非常方便地安装和管理各种插件，并将Atom打造成真正适合自己的开发工具。除此之外，Atom代码编辑器还支持Windows、Mac、Linux三大桌面平台，完全免费，并且已经在GitHub上开放了全部的源代码，在经过一段长时间的迭代开发和不断改进后，Atom在性能和稳定性方面都有着显著的改善。

  这里我选用Atom作为编辑器主要是因为它完全免费，并且拥有很多功能丰富的插件，其中我最喜爱的就是Atom编辑器本身所集成的Git插件，它可以通过颜色的不同（新添加的为绿色，修改的为黄色，删除的为红色）把对代码和文本的修改显示在编辑器的界面上，而且有改动的文件其文件名和所在文件夹名都会被标记为高亮显示，编辑器底部也会显示当前代码仓库所在分支和对文件所修改的行数统计，这对于像我这样基本每天都Commit的用户来说是非常方便的。

### 配置流程

## 总结

通过以上的介绍，我想大家对开发工具链以及其整个配置流程都有了一个比较清晰的认识，接下来我会通过介绍开发仓库中Makefile的设计思想和参数配置来详细讲解在GNU/Linux下是如何像Keil MDK那样对项目工程（包含STM32官方固件库）进行组织的，以及ARM-GCC和OpenOCD这两个软件的具体使用方法。最后，我要特别感谢HandsFree OpenRE库的创建者（马学长和陈学长）和相关维护人员，让我可以非常方便地学习到GNU/Linux下STM32嵌入式开发的Makefile编写方法等知识，除此之外，我也非常感谢以上文章中所介绍过的开发工具的缔造者们，是他们让我真正体会到了什么是嵌入式开发应有的效率和乐趣。

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
