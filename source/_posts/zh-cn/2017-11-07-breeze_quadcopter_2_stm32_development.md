---
title: Breeze微型四轴系列（二）：STM32嵌入式开发-开发环境搭建
date: 2017-11-07 22:10
tags:
  - Micro Quadcopter
  - STM32
  - GNU/Linux
  - Make
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

### 操作系统

### 开发工具

- #### Make

- #### ARM-GCC

- #### OpenOCD

- #### Atom

### 配置流程

## 总结

通过以上的介绍，我想大家对开发工具链以及其整个配置流程都有了一个比较清晰的认识，接下来我会通过介绍开发仓库中Makefile的设计思想和参数配置来详细讲解在GNU/Linux下是如何像Keil MDK那样对项目工程（包含STM32官方固件库）进行组织的，以及ARM-GCC和OpenOCD这两个软件的具体使用方法。最后，我要特别感谢HandsFree OpenRE库的创建者（马学长和陈学长）和相关维护人员，让我可以非常方便地学习到GNU/Linux下STM32嵌入式开发的Makefile编写方法等知识，除此之外，我也非常感谢以上文章中所介绍过的开发工具的缔造者们，是他们让我真正体会到了什么是嵌入式开发应有的效率和乐趣。

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
