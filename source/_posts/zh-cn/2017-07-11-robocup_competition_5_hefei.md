---
title: RoboCup比赛系列（五）：RoboCup合肥国际赛第三天
date: 2017-07-11 13:30:00
tags:
  - RoboCup
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup合肥国际赛第三天的相关内容。
feature: images/robocup/robocup2015.png
toc: true
comments: true
---

## 前言

RoboCup即机器人世界杯，是目前世界上级别规格最高、影响力最广的机器人赛事（当然，DARPA机器人挑战赛除外）。中国曾经在2008年的时候举办过一次RoboCup国际赛，地点是在苏州，而七年之后，RoboCup国际赛又一次降临中国，这次则是在拥有多年举办机器人赛事经验的合肥。非常幸运的是我们晓萌机器人团队能够被邀请参与本次比赛新增的BSR项目，并获得免费近距离观摩比赛的机会。

这篇文章主要讲述我们在RoboCup合肥国际赛第三天所发生的一些事情，内容主要以亲身经历为主，其中也会涉及技术方面，但不是重点。

<!--more-->

## 经历

### 开幕式

在开幕式的整个过程中，除了RoboCup主席和相关领导的精彩发言之外，最吸引人的就是那个站在演讲台旁边的Alpha 2人形机器人（深圳[优必选](https://www.ubtrobot.com/cn/)公司的产品），因其搭载了[科大讯飞](http://www.iflytek.com/)最新的语音识别引擎，所以它能够实时且准确地进行同步翻译，这既方便了国内外与会者理解发言者的意图，也体现出科大讯飞在语音合成和识别领域的强大实力。

![ceremony](../../../../../images/hefei/day_3/ceremony/ceremony.jpg)

### 比赛项目

- #### RoboCup@Home

  **RoboZoo**
  根据RoboCup@Home裁判委员会所制定的赛程安排，第一个要比的是RoboZoo项目，其规则比较简单，每支参赛队伍需要尽可能地表现自己机器人的能力，来吸引观众进行投票，成绩按照投票数进行排序，队伍的得票数越多，排名越靠前。通过实际观察，我发现该项目更看重各队的创意，而不是技术水平的高低。举个例子，比如像上交的服务机器人，它在现场表演了如何使用机械臂来对水杯进行抓取。尽管从技术层面上来讲上交的水平相当厉害，但是对于不懂技术的观众来说，机械臂不断重复执行抓取与放下的单调动作肯定比不上外表装饰得Kawaii，能与观众进行互动的机器人更讨人喜欢。

  ![robocup@home_1](../../../../../images/hefei/day_3/robocup@home/robocup@home_1.jpg)

  ![robocup@home_2](../../../../../images/hefei/day_3/robocup@home/robocup@home_2.jpg)

  ![robocup@home_3](../../../../../images/hefei/day_3/robocup@home/robocup@home_3.jpg)

  ![robocup@home_4](../../../../../images/hefei/day_3/robocup@home/robocup@home_4.jpg)

  ![robocup@home_5](../../../../../images/hefei/day_3/robocup@home/robocup@home_5.jpg)

  ![robocup@home_6](../../../../../images/hefei/day_3/robocup@home/robocup@home_6.jpg)

  ![robocup@home_7](../../../../../images/hefei/day_3/robocup@home/robocup@home_7.jpg)

  ![robocup@home_8](../../../../../images/hefei/day_3/robocup@home/robocup@home_8.jpg)

  ![robocup@home_9](../../../../../images/hefei/day_3/robocup@home/robocup@home_9.jpg)

  ![robocup@home_10](../../../../../images/hefei/day_3/robocup@home/robocup@home_10.jpg)

  ![robocup@home_11](../../../../../images/hefei/day_3/robocup@home/robocup@home_11.jpg)

  ![robocup@home_12](../../../../../images/hefei/day_3/robocup@home/robocup@home_12.jpg)

  ![robocup@home_13](../../../../../images/hefei/day_3/robocup@home/robocup@home_13.jpg)

  ![robocup@home_14](../../../../../images/hefei/day_3/robocup@home/robocup@home_14.jpg)

  ![paper_1](../../../../../images/hefei/day_3/robocup@home/paper_1.jpg)

  ![paper_2](../../../../../images/hefei/day_3/robocup@home/paper_2.jpg)

  ![paper_3](../../../../../images/hefei/day_3/robocup@home/paper_3.jpg)

  ![paper_4](../../../../../images/hefei/day_3/robocup@home/paper_4.jpg)

- #### RoboCup Secure

  **场地**
  下图是RoboCup救援组的比赛场地，由于整个场地设计得非常复杂，所以在调试期间，赛事举办方曾邀请一些有经验的国外参赛队员与其一起进行搭建场地的工作。从图中可以看到，场地内部的不同障碍区域是根据颜色进行划分的，除此之外，配备有小型二氧化碳装置的几个仿真人偶也被裁判委员会分散布置到比赛场地的不同区域之中（有的被在墙壁之后的破洞里，有的被放到较高的平台上，还有的被放到图中的车辆中），为之后救援机器人寻找幸存者的比赛项目做好准备。最后，由于比赛中还有空中救援机器人的部分，所以场地四周全部拉上了白色的防撞网，防止四轴飞行器失控伤人。

  ![robocup_secure_1](../../../../../images/hefei/day_3/robocup_secure/robocup_secure_1.jpg)

  ---

  **自主建图**
  自主建图应该是RoboCup救援组的第一个比赛项目，大部分参赛队伍都选择下图中这样的小车来完成该项任务。原因也很明显，机器人需要在充满各种障碍物的狭小空间中自由移动，而且对于自主建图项目来说，机器人本身不需要承担搜索幸存者（用仿真人偶代替）的任务，即机器人不用携带机械臂等搜救设备，所以带有激光和视觉传感器的小型四驱车是最好的选择。

  ![robocup_secure_2](../../../../../images/hefei/day_3/robocup_secure/robocup_secure_2.jpg)

  ---

  ![robocup_secure_3](../../../../../images/hefei/day_3/robocup_secure/robocup_secure_3.jpg)

  ![robocup_secure_4](../../../../../images/hefei/day_3/robocup_secure/robocup_secure_4.jpg)

- #### RoboCup Soccer

  ![robocup_soccer_1](../../../../../images/hefei/day_3/robocup_soccer/robocup_soccer_1.jpg)

  ![robocup_soccer_2](../../../../../images/hefei/day_3/robocup_soccer/robocup_soccer_2.jpg)

  ![robocup_soccer_3](../../../../../images/hefei/day_3/robocup_soccer/robocup_soccer_3.jpg)

  ![robocup_soccer_4](../../../../../images/hefei/day_3/robocup_soccer/robocup_soccer_4.jpg)

- #### RoboCup Logistics

  ![robocup_logistics_1](../../../../../images/hefei/day_3/robocup_logistics/robocup_logistics_1.jpg)

  ![robocup_logistics_2](../../../../../images/hefei/day_3/robocup_logistics/robocup_logistics_2.jpg)

  ![robocup_logistics_3](../../../../../images/hefei/day_3/robocup_logistics/robocup_logistics_3.jpg)

  ![robocup_logistics_4](../../../../../images/hefei/day_3/robocup_logistics/robocup_logistics_4.jpg)

- #### BSR

  ![bsr_1](../../../../../images/hefei/day_3/bsr/bsr_1.jpg)

  ![bsr_2](../../../../../images/hefei/day_3/bsr/bsr_2.jpg)

  ![bsr_3](../../../../../images/hefei/day_3/bsr/bsr_3.jpg)

  ![bsr_4](../../../../../images/hefei/day_3/bsr/bsr_4.jpg)

  ![bsr_5](../../../../../images/hefei/day_3/bsr/bsr_5.jpg)

  ![bsr_6](../../../../../images/hefei/day_3/bsr/bsr_6.jpg)

  ![bsr_7](../../../../../images/hefei/day_3/bsr/bsr_7.jpg)

  ![bsr_8](../../../../../images/hefei/day_3/bsr/bsr_8.jpg)

## 总结

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
