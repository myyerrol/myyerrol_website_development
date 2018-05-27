---
title: 自制机器人系列（一）：简单轮式机器人
date: 2018-05-15 22:20:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制简单轮式机器人的相关内容。
feature: /images/robot/robot.png
toc: true
comments: true
---

## 前言

这个简单轮式机器人是我大一下学期做的，那个时候我通过学校图书馆里的《无线电》杂志开始接触Raspberry Pi卡片式计算机和Arduino微控制器，其中Raspberry Pi给当初什么都不懂的我留下了非常深刻的印象：**一个信用卡大小的板子竟然可以跑带有图形界面的GNU/Linux操作系统**。于是在强烈探索欲的驱使下，我从网上购买了两块Element14的Raspberry Pi一代Model B（现在早已经绝版了）板子和显示屏、蓝牙键盘、无线网卡模块等相关配件，开始在Raspbian系统上自学Python和传感器的使用方法。后来为了检验一下自己的学习成果，便花费几周的时间做了这个简单的轮式机器人，虽然原理并不复杂，但是这可是我第一次尝试搭建一个包含软硬件的完整机器人系统，还是挺有挑战性的。最后，该机器人的代码可以从我的GitHub[仓库](https://github.com/myyerrol/raspberry_pi_simple_car)获得。

<!--more-->

## 原理

### 硬件

该轮式机器人的硬件核心由Arduino和Raspberry Pi组成，这里先简要介绍一下：Arduino是基于ATmega系列芯片的8位微控制器，开发团队对其硬件和软件进行了封装，大大简化用户的二次开发难度；Raspberry Pi则是基于ARM Cortex-A系列的微型计算机，它拥有强大的处理能力，可以在较短的时间内完成对大量数据的计算工作。这里我选择Arduino和Raspberry Pi首先是因为它们在国内外DIY界非常流行，有很多资料可以参考。此外，Arduino官方提供有很多库，方便读取硬件传感器的数据，非常适合作为机器人系统的下位机，而Raspberry Pi可以运行GNU/Linux操作系统，实时性虽差但是却拥有友好的用户界面，并且可以使用Python来做数据计算，作为上位机顺理成章。

当然，最初我是想只用Raspberry Pi来作为机器人的感知和控制核心，毕竟自己之前从来没有在GNU/Linux操作系统上使用高级编程语言来控制过底层硬件，不过后来经测试Raspberry Pi只能通过软件模拟出并不稳定的PWM后，我还是放弃了这个想法。。。以下是该机器人的硬件系统连接图：

![raspberry_pi_simple_car_fritzing](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_fritzing.png)

- #### Raspberry Pi

  从上图可以比较清晰地看到：硬件系统以Raspberry Pi和Arduino为核心，其中Raspberry Pi连接有L293D电机扩展板，可通过配置相应GPIO引脚的高低电平来控制四个直流减速电机旋转的方向和快慢；此外，Raspberry Pi还连接有SR04超声波模块和带有IIC接口的LCD1602显示屏，用于检测机器人与前方障碍物之间的距离并将数值显示在LCD1602上；最后，Raspberry Pi还连接有两个LED灯和一个有源蜂鸣器，两个LED灯被用作机器人左右转向的指示，而有源蜂鸣器则可以在机器人出现紧急情况时发出警报（如机器人距离前方或左右的障碍物非常近）。

- #### Arduino

  Arduino部分就比较简单了，它连接有三个LED灯，一个舵机和两个红外测距模块，其中三色LED灯用于表征机器人距离障碍物的距离（绿色表示距离在正常范围之外，黄色表示距离比较接近，红色则表示距离已经非常接近），舵机被用来控制超声波模块的探测范围，而两个红外测距模块则被安装在机器人的两侧，可以实时检测机器人距离左右障碍物的距离，从而达到避障的功能。

### 软件

该软件已经实现的功能有：蓝牙远程遥控、超声波避障、红外边缘检测等。虽然机器人已经加装有四路红外循迹模块，但是由于时间紧迫（那会儿已经临近期末考试，再不复习就该挂科了），所以红外循迹功能并未完成。

- #### Raspberry Pi



- #### Arduino



### 成果

![raspberry_pi_simple_car_1](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_1.jpg)

![raspberry_pi_simple_car_2](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_2.jpg)

![raspberry_pi_simple_car_3](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_3.jpg)

![raspberry_pi_simple_car_4](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_4.jpg)

![raspberry_pi_simple_car_5](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_5.jpg)


## 总结

虽然现在回过头来再看自己当初大一做的项目，觉得原理非常简单，但就是它让我第一次体验到了做软硬件项目的乐趣，同时也让我开始真正喜欢上了嵌入式开发，并逐渐走上了专业化的道路。每个人都应该有自己的梦想，那这个简单的轮式小车就是我梦想的起点，激励着我不断向前！

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
