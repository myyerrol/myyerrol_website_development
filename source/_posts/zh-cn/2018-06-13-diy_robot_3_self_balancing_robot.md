---
title: 自制机器人系列（三）：小型自平衡机器人
date: 2018-06-13 21:45:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制小型自平衡机器人的相关内容。
feature: /images/feature/robot.png
toc: true
comments: true
---

## 前言

今年春节左右我拿到了[maksyuki](https://github.com/maksyuki)所设计的Breezeduino板子，Breezeduino是一个基于ATmega328P-AU芯片（32引脚QTFP封装）的AVR单片机最小系统板，由于现在Arduino非常流行，所以我们也顺理成章地给Breezeduino刷入了最新的Arduino Nano固件（至于熔丝位的配置我会在之后的软件那部分再进行介绍），使其可以通过Arduino所提供的软件封装来编写嵌入式程序。在能够正常烧写Blink程序后，我在想如何能把这个板子用起来，首先进入我脑海里的是做一个游戏机，因为游戏机的硬件原理不难而且还可以自己DIY写一些小游戏去玩，比较有意思，目前国外类似的开源项目有[MAKERbuino](https://www.makerbuino.com/)和[Gamebuino](https://gamebuino.com/)，做得已经相当不错了。不过在经过一番深思熟虑后，我还是决定回归我最喜欢的老本行——机器人，因为对于我来说做一个可以与物理世界进行交互的机器人要比其只能在游戏机的OLED 12864屏幕里能跑能跳要有意思的多。

<!--more-->

既然项目已经定下来要做机器人，那这回我要做什么类型的机器人呢？鉴于之前我已做过四轮和六足机器人，那这次我就不能做得重样，就在我考虑如何使用家里现有的元器件和模块搭建机器人的时候，我看到大神[彭稚晖](http://www.pengzhihui.xyz/about/)的一篇非常棒的博文《[Nano - 全球最迷你的自平衡机器人](http://www.pengzhihui.xyz/2015/12/09/nano/)》（其他博文的质量也非常高），它深深震撼了我，虽然TB上有很多商家在卖自平衡小车的学习套件，但能把一个自平衡机器人做得如此小型化、拟人化而且功能又足够丰富的确实很少见！于是，本着喜欢做小型机器人的爱好以及学习基本倒立摆模型的目的，我也踏上了制作小型自平衡机器人的旅程。

## 概述

小型自平衡机器人是一个

## 原理

### 硬件

- #### 电机执行层

  顾名思义，电机执行层部分包含的就是整个自平衡机器人最重要的执行器——电机。关于电机的选择，大神彭稚晖（以下简称**彭神**）在其博文中已经介绍过了：

  > 减速电机 | 尺寸自定，但最终输出转速为300rpm左右会比较合适，值得注意的是电机必须带编码器或者码盘来测速，单相或者两相的都可以。

  我买的是带有AB双向增量式磁性霍尔编码器的N20减速电机，减速比为1：30，额定转速正好在300rpm左右。在买的时候一定要注意**电机的使用电压，因为同样的减速比，不同电压型号的N20减速电机其额定转速是不一样的！**至于TB链接就不发了，直接在首页中搜索“N20减速电机 码盘”就能找到。如下图所示，两个N20减速电机被紧紧地固定在机器人底座上：

  ![self_balancing_robot_motor_1](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_motor_1.jpg)

  ![self_balancing_robot_motor_2](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_motor_2.jpg)

- #### 电机驱动层

  电机驱动层负责驱动两个N20减速电机的转速和转向。同样，彭神在硬件需求中对电机驱动模块的选择进行了简要的介绍：

  > 电机驱动 | 普通尺寸的电机推荐TB6612驱动芯片，比L298的效率高不易发热（平均电流1.2A左右，功率更大请选L298或其他驱动）；迷你电机用L9110s模块即可，便宜也很小巧。

  目前据我了解到的情况，国内外做的自平衡小车其电机驱动用的基本上全是TB6612芯片，本来我也想用该芯片的，不过不知道自己从元器件收纳箱的哪个角落找到了一个之前买的但一直没用的L298N模块，而且加上彭神在[Arduino中文社区](https://www.arduino.cn/)发表的第一代[自平衡机器人-【蛋黄物语】](https://www.arduino.cn/thread-6246-1-1.html)中用的电机驱动也是L298N，所以本着不浪费的原则，我就索性用L298N作为本平衡机器人的电机驱动。不过由于L298N模块比TB6612模块高很多，所以最后制作完成的机器人也要比传统的自平衡机器人高很多。以下是电机驱动层的高清图：

  ![self_balancing_robot_driver_1](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_driver_1.jpg)

  ![self_balancing_robot_driver_2](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_driver_2.jpg)

- #### 电源管理层

  电源管理层主要负责对锂电池电源的升降压和充放电进行管理，从而保证自平衡机器人各电路模块的电源供应。

  其中电源我用的是电压为3.7V的锂电池，具体参数为20C 1S 1200mah，电量应该足够该自平衡机器人使用，不过由于L298N和Breezeduino的供电为7V左右，所以我从TB上买了一个DC-DC升压可调稳压电源模块用于将锂电池的输入电压升到电路所需的电压，防止因供电不足导致驱动电路和Breezeduino主控不能工作在正常模式下。

  除此之外，为了能用普通的手机充电线给锂电池电源进行充电，我又花了几块钱买了一个带有保护电路的充电模块，只要简单地将锂电池的两根导线焊在模块上并把OUT端连接到前面介绍的升压模块的正负端便可以使用USB口（要保证输出电压为5V，且电流达到1A或以上的）给电池充电了，非常方便。不过要注意的一点是：**在给锂电池进行充电时需要断开模块OUT端上连接的负载！**

  最后如图所示，我在升压模块的左侧焊了两个接线端子分别用于将升压后的电源通过导线输送给L298N和Breezeduino，而在右下角我添加了一个单刀双掷拨动开关用于控制锂电池电源的输入，而绿色LED和电阻构成的电路则方便判断当前电源通断的状态，即LED亮表示锂电池已经接入电路， 电源管理层可以正常工作；而LED灭则表示锂电池没有接入电路中，此时可以使用带有Micro USB接头的手机线给锂电池进行充电。

  ![self_balancing_robot_power_1](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_power_1.jpg)

  ![self_balancing_robot_power_2](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_power_2.jpg)

  ![self_balancing_robot_power_3](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_power_3.jpg)

  ![self_balancing_robot_power_4](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_power_4.jpg)

- #### 主控处理层

  主控处理层是整个自平衡机器人的控制核心，它包含有Breezeduino微控制器和相关供电电路，主要用于接收传感器和电机编码器的数据并根据PID算法进行数学计算，最后通过控制电机的转向和转速来实现机器人自平衡的最终效果。

  首先详细介绍一下Breezeduino微控制器。如下图所示，Breezeduino板子是使用EAGLE软件进行设计的，EAGLE在国内的知名度并不是很高，用的人估计也不是很多，不过作为一款优秀的跨平台（Windows、GNU\Linux、Mac）PCB设计软件，它在国外开源硬件界还是非常流行的，比如大名鼎鼎的Arduino以及SparkFun公司大部分的硬件都是用EAGLE进行设计的，它简单易学而又足够强大，在画简单的PCB时其性能足以媲美Altium、Cadance SPB以及PADS等传统大型PCB设计软件。好了言归正传，Breezeduino的硬件原理其实很简单，就是实现了一个单片机的最小系统电路并将芯片的其他引脚通过排针的方式引出，便于功能扩展。

  ![self_balancing_robot_mcu_1](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_1.png)

  ![self_balancing_robot_mcu_2](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_2.png)

  ![self_balancing_robot_mcu_3](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_3.jpg)

  如下图所示，除了Breezeduino微控制器之外，在本层洞洞板上我还焊了两个接线端子用于为电机编码器提供标准的5V电源（来源于L298N模块的5V输出端口），而板子左上角和右上角分别焊有排母和排针，分别用于连接OLED 12864显示屏的IIC接口和L298N的6个电机控制接口（4个用于控制左右两个电机的转向，2个用于PWM调速）。

  ![self_balancing_robot_mcu_4](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_4.jpg)

  ![self_balancing_robot_mcu_5](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_5.jpg)

  ![self_balancing_robot_mcu_6](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_6.jpg)

  ![self_balancing_robot_mcu_7](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_mcu_7.jpg)

- #### 外设模块层

  外设模块层主要负责与物理环境进行交互，让机器人可以感知到外面的世界。如下图所示，该层主要包含有IMU传感器、超声波传感器、主从一体蓝牙模块、无源蜂鸣器和LED。

  我用的IMU传感器型号为MPU6500，它是6轴姿态传感器模块（3轴加速度+3轴角速度并带有IIC和SPI接口），可以测量机器人在三个坐标轴上的角速度和加速度分量。对于自平衡机器人来说，系统始终是处于一个不稳定状态的，为了能够使机器人保持动态平衡，就需要IMU传感器不断地读取机器人当前的姿态数据，然后通过主控的实时计算来控制电机，从而保持机器人整个躯体的直立平衡，有关具体的IMU姿态解算和PID控制算法我会在下面的软件部分进行详细的介绍。

  超声波模块用的是目前最流行的SR-04，它集发送和接收功能于一体，可以非常方便地通过编写代码获取外部障碍物距离该模块的距离（在极限测量距离范围之内），主要应用于自平衡机器人的避障以及跟随等功能的实现。

  蓝牙模块采用SPP（Serial Port Profile）协议将蓝牙传输转变为传统的串口通信方式，主要用于该自平衡机器人的无线串口调试以及Android手机遥控。

  蜂鸣器和LED则主要用于表现机器人的某些情感状态，毕竟让机器人发个声、亮个灯要比什么都没有更能体现机器人中“人”的本意，不是吗？

  ![self_balancing_robot_peripheral_1](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_peripheral_1.jpg)

  ![self_balancing_robot_peripheral_2](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_peripheral_2.jpg)

  ![self_balancing_robot_peripheral_3](http://media.myyerrol.io/images/project/self_balancing_robot/self_balancing_robot_peripheral_3.jpg)

### 软件

未完待续。。。

## 成果

以下是制作完成后的成果图和测试视频：

## 总结

未完待续。。。

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
