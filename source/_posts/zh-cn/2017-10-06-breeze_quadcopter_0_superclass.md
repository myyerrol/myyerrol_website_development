---
title: Breeze微型四轴系列（零）：总纲
date: 2017-10-06 22:30
tags:
  - Micro Quadcopter
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴无人机开发的相关内容。
feature: images/breeze/breeze.png
toc: true
comments: true
---

## 前言

我记得自己第一次接触四轴飞行器是在大一，有一次我在[TED](https://www.ted.com)上看了由瑞士苏黎世联邦理工大学的Raffaello D'Andrea教授所做的关于四轴飞行器的演讲，题目是**"The astounding athletic power of quadcopters"**，教授边用四轴飞行器进行演示并对其中所用到的数学理论进行讲解，对于当时什么理论都不懂的我来说，最令我惊讶的是在演示环节，那些四轴飞行器能够在高速移动的时候保证放在其顶部的细棍和酒杯不失去平衡，可以在桨叶受损的情况下依然可控，可以通过协作接住由人所抛出的小球并将其击回，可以判断人的手势来做不同的动作等。当时看完这段视频之后我的内心难以平静，脑海里萌生了自制四轴飞行器的想法，但由于后来我加入了舞蹈机器人基地并忙于组内的开发任务，所以这个想法就暂时被搁置了。

<!--more-->

一转眼到了大三下学期，我从舞蹈机器人机基地退役。一个偶然的机会，我从我弟那里得知有一个叫做[Crazyflie](https://www.bitcraze.io/)的微型四轴飞行器，这一次我算是打从心底里被震撼到了，以下是几点原因：

- **硬件：**

  首先Crazyflie微型四轴飞行器的硬件设计得非常优秀，不管是PCB机械层的轮廓设计、信号层上元器件的布局还是整个电路板的走线都非常合理，而且最重要的是Bitcraze团队将模块化的理念带入到Crazyflie产品的设计之中，这使得Crazyflie微型四轴除了基本的飞行功能之外，还可以通过堆叠不同扩展坞的方式来实现不同功能的扩展。

- **软件：**

  Crazyflie微型四轴飞行器的软件开发全部基于Linux开发环境，并使用已有开源且强大的软件工具（比如ARM-GCC，Make、PyQt等）进行开发。除此之外，Crazyflie微型四轴飞行器的软件源码还被托管在GitHub上，非常方便世界各地的爱好者、研究者对其进行二次开发。

- **文档：**

  除了以上两点有关技术层面的优势，Crazyflie微型四轴飞行器项目还有一个最令我无法抗拒的因素——丰富的文档。说实话，我从来没有看到过一家不以盈利为主要目的团队可以将自己的开源项目文档写得如此详细，但是Bitcraze团队做到了，他们这种乐于分享的精神实在是值得我们学习。

总之，这次在看过Crazyflie微型四轴项目之后，我脑海中有关自制四轴飞行器的想法又被重新唤醒了，于是我联合我弟创建了MicroDynamics团队，而Breeze微型四轴项目也就顺利地诞生了。

## 简介

## 总纲

以下是我原创的Breeze微型四轴系列文章：

[Breeze微型四轴系列（零）：总纲](https://myyerrol.github.io/zh-cn/2017/10/06/breeze_quadcopter_0_superclass)

## 总结

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}