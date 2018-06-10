---
title: 自制机器人系列（二）：小型六足仿生机器人
date: 2018-05-21 22:40:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制小型六足仿生机器人的相关内容。
feature: /images/robot/robot.png
toc: true
comments: true
---

## 前言

这个小型六足机器人是我在大四做的，是我大学本科生涯的最后一个个人项目。至于为什么我要做六足机器人，还要从高考完之后说起：当时刚考完的我一直想做一些有意思的事情，直到有一天我发现了一个叫[PVCBOT](http://www.diy-bot.net/?project=pvcbot)的网站，里面记录了很多如何使用PVC材料来制作简单机器人的教程，其中有一款叫做**PVC六足机器昆虫（见下图）**的机器人彻底震撼了我，当时看完教程之后我就下定决心也要做一个类似的六足机器人，于是我便从[懒猫侠](https://link.zhihu.com/?target=http%3A//hellorobot.blog.163.com/)前辈那里购买了六足机器人套件（说实话，确实花了不少钱），并打算按照提供的教程完成自己的六足机器人，但无奈当时的我所掌握的知识太少，什么单片机、串口通信、舵机PWM、电源管理、传感器、舵机控制板等都不懂，特别是机械结构方面我更是一窍不通，所以大一那会儿我还闹出了笑话：用硬纸板做六足机器人的肢体，在安装好舵机并通电测试后，眼睁睁地看着自己的“纸板六足”在舵机的震动下不断地解体。。。

<!--more-->

![pvcbot_hexapod](http://www.diy-bot.net/upload/pvcbot/project/_Original/PVCBOT-Original_600.jpg)

经过大一那次失败之后，我决定暂时停止该项目的开发，转而先去学习那些有关嵌入式开发的基础知识，等以后有能力的时候再去独立完成这个六足机器人。很幸运的是在我大学本科即将结束的时候，我已掌握了足够的知识来完成那个曾经困扰我已久的机器人项目，于是我花了几周的时间完成了这个小型六足机器人，算是了却了自己的一个心愿吧。

## 概述

小型六足仿生机器人是一个拥有十八个关节自由度的迷你多足机器人，它可以实现红外遥控、超声波避障等基本功能。机器人的硬件核心为Arduino Nano，并采用串口通信的方式与24路舵机控制板进行数据交互，从而间接完成对所有舵机旋转角度的精确控制，最终使机器人能够以各种不同的步态进行移动。当然，这个机器人项目的软件依旧开源，具体代码可以从我的GitHub[仓库](https://github.com/myyerrol/hexapod_bionic_robot)上获得。

![hexapod_bionic_robot_1](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_1.jpg)

## 过程

### 机械

![hexapod_bionic_robot_mechanics_1](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_1.jpg)

![hexapod_bionic_robot_mechanics_2](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_2.jpg)

![hexapod_bionic_robot_mechanics_3](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_3.jpg)

![hexapod_bionic_robot_mechanics_4](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_4.jpg)

![hexapod_bionic_robot_mechanics_5](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_5.jpg)

![hexapod_bionic_robot_mechanics_6](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_6.jpg)

![hexapod_bionic_robot_mechanics_7](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_7.jpg)

![hexapod_bionic_robot_mechanics_8](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_8.jpg)

![hexapod_bionic_robot_mechanics_9](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_9.jpg)

![hexapod_bionic_robot_mechanics_10](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_10.jpg)

![hexapod_bionic_robot_mechanics_11](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_11.jpg)

### 电子

![hexapod_bionic_robot_electronics_1](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_1.jpg)

![hexapod_bionic_robot_electronics_2](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_2.jpg)

![hexapod_bionic_robot_electronics_3](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_3.jpg)

![hexapod_bionic_robot_electronics_4](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_4.jpg)

![hexapod_bionic_robot_electronics_5](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_5.jpg)

![hexapod_bionic_robot_electronics_6](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_electronics_6.jpg)

## 原理

### 硬件

以下是该小型仿生六足机器人的硬件系统连接图：

### 软件

## 成果

以下是制作完成后的成果图和测试视频：

![hexapod_bionic_robot_2](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_2.jpg)

![hexapod_bionic_robot_3](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_3.jpg)

![hexapod_bionic_robot_4](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_4.jpg)

![hexapod_bionic_robot_5](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_5.jpg)

![hexapod_bionic_robot_6](http://media.myyerrol.io/images/hexapod_bionic_robot/hexapod_bionic_robot_6.jpg)

<div style="height: 0; padding-bottom: 60%; position: relative;">
  <iframe width="498" height="510" src="http://player.youku.com/embed/XMzY1MTU4OTczNg" frameborder="0" allowfullscreen="" style="position: absolute; height: 100%; width: 100%;">
  </iframe>
</div>

## 总结


{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}