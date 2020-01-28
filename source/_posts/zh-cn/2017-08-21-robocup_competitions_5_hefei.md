---
title: RoboCup比赛系列（五）：RoboCup合肥国际赛第三天
date: 2017-08-21 13:30:00
tags:
  - RoboCup
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup合肥国际赛第三天的相关内容。
feature: /images/feature/robocup_hefei.png
toc: true
comments: true
---

## 前言

RoboCup即机器人世界杯，是目前世界上级别规格最高、影响力最广的机器人赛事（当然，DARPA机器人挑战赛除外）。中国曾经在2008年的时候举办过一次RoboCup国际赛，地点是在苏州，而七年之后，RoboCup国际赛又一次降临中国，这次则是在拥有多年举办机器人赛事经验的合肥。非常幸运的是我们晓萌机器人团队能够被邀请参与本次比赛新增的BSR项目，并获得免费近距离观摩比赛的机会。

这篇文章主要讲述我们在RoboCup合肥国际赛**第三天**所发生的一些事情，内容主要以亲身经历为主，其中也会涉及技术方面，但不是重点。

<!--more-->

## 经历

### 开幕式

在开幕式的整个过程中，除了RoboCup主席和相关领导的精彩发言之外，最吸引人的就是那个站在演讲台旁边的Alpha 2人形机器人（深圳[优必选](https://www.ubtrobot.com/cn/)公司的产品），因其搭载了[科大讯飞](http://www.iflytek.com/)最新的语音识别引擎，所以它能够实时且准确地进行同步翻译，这既方便了国内外与会者理解发言者的意图，也体现出科大讯飞在语音合成和识别领域的强大实力。

![ceremony](http://media.myyerrol.io/images/robocup/hefei/day_3/ceremony/ceremony.jpg)

### 比赛项目

- #### RoboCup@Home

  **RoboZoo**
  根据RoboCup@Home裁判委员会所制定的赛程安排，第一个要比的是RoboZoo项目，其规则比较简单，每支参赛队伍需要尽可能地表现自己机器人的能力，来吸引观众进行投票，成绩按照投票数进行排序，队伍的得票数越多，排名越靠前。通过实际观察，我发现该项目更看重各队的创意，而不是技术水平的高低。举个例子，比如像上交的服务机器人，它在现场表演了如何使用机械臂来对水杯进行抓取。尽管从技术层面上来讲上交的水平相当厉害，但是对于不懂技术的观众来说，机械臂不断重复执行抓取与放下的单调动作肯定比不上外表装饰得Kawaii，能与观众进行互动的机器人更讨人喜欢。

  ![robocup@home_1](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_1.jpg)

  ![robocup@home_2](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_2.jpg)

  ![robocup@home_3](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_3.jpg)

  ![robocup@home_4](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_4.jpg)

  ![robocup@home_5](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_5.jpg)

  ![robocup@home_6](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_6.jpg)

  ![robocup@home_7](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_7.jpg)

  ![robocup@home_8](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_8.jpg)

  ![robocup@home_9](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_9.jpg)

  ![robocup@home_10](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_10.jpg)

  ---

  **Navigation**
  以下是服务机器人在室内进行自主导航时的一些画面，因为自主导航是RoboCup@Home项目的基本能力，所以绝大部分参赛队伍都能够达到该项测试的基本要求，只是在如何让机器人避开突如其来的障碍物（突然被裁判扔到机器人行进路线上的杂志）这种技术细节方面上，强队与弱队之间的确存在一些差距。

  ![robocup@home_11](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_11.jpg)

  ![robocup@home_12](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_12.jpg)

  ![robocup@home_13](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_13.jpg)

  ---

  **Person Recognition**
  以下是中科大的可佳机器人在进行人脸识别测试，从图中可以看到识别的精度还是相当不错的，基本上摄像头里出现的人物都被识别并用方框标了出来。说实话能够在现场环境如此恶劣的情况下，还能够较为精准地识别出多个目标人物，可见可佳的图像识别算法有多鲁棒。

  ![robocup@home_14](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_14.jpg)

  ---

  **Object Recognition & Manipulation**
  从以下的图片中可以看到，只有前四个参赛队伍的机器人能够成功地至少抓取一个物体，其它的机器人基本上在开始位置没有移动，我估计问题是出在了物体识别上。在四个已完成抓取任务的机器人中，中科大的可佳表现得最为出色，它在有限的比赛时间内总共连续成功地完成了两次自主抓取（本来是三次，很可惜可佳的机器爪在放置第三个物体的时候不小心把它碰到了地面上），毫无悬念地获得了该项测试的第一名。

  ![robocup@home_15](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_15.jpg)

  ![robocup@home_16](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_16.jpg)

  ![robocup@home_17](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_17.jpg)

  ![robocup@home_18](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_18.jpg)

  ![robocup@home_19](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_19.jpg)

  ![robocup@home_20](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_20.jpg)

  ![robocup@home_21](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_21.jpg)

  ![robocup@home_22](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/robocup@home_22.jpg)

  ---

  **Paper**
  以下是贴在比赛场地外围墙壁上的一些文件，主要是向各参赛队伍公示比赛场地中一些物品的摆放位置，机器人所要识别的物体种类和大小等参数信息，以及各队比赛的顺序安排，便于各队提前做好比赛准备。

  ![paper_1](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/paper_1.jpg)

  ![paper_2](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/paper_2.jpg)

  ![paper_3](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/paper_3.jpg)

  ![paper_4](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup@home/paper_4.jpg)

- #### RoboCup Secure

  **场地**
  下图是RoboCup救援组的比赛场地，由于整个场地设计得非常复杂，所以在调试期间，赛事举办方曾邀请一些有经验的国外参赛队员与其一起进行搭建场地的工作。从图中可以看到，场地内部的不同障碍区域是根据颜色进行划分的，除此之外，配备有小型二氧化碳装置的几个仿真人偶也被裁判委员会分散布置到比赛场地的不同区域之中（有的被在墙壁之后的破洞里，有的被放到较高的平台上，还有的被放到图中的车辆中），为之后救援机器人寻找幸存者的比赛项目做好准备。最后，由于比赛中还有空中救援机器人的部分，所以场地四周全部拉上了白色的防撞网，防止四轴飞行器失控伤人。

  ![robocup_secure_1](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_secure/robocup_secure_1.jpg)

  ---

  **自主建图**
  自主建图应该是RoboCup救援组的第一个比赛项目，大部分参赛队伍都选择下图中这样的小车来完成该项任务。原因也很明显，机器人需要在充满各种障碍物的狭小空间中自由移动，而且对于自主建图项目来说，机器人本身不需要承担搜索幸存者（用仿真人偶代替）的任务，即机器人不用携带机械臂等搜救设备，所以带有激光和视觉传感器的小型四驱车是最好的选择。

  ![robocup_secure_2](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_secure/robocup_secure_2.jpg)

  ---

  以下两个图片展示的是救援机器人的远程控制站，铝制箱中上面的两个电脑负责可视化机器人实时建图的整个过程，左下角的电脑负责对相关代码进行调试，而右下角的那台电脑则主要负责远程控制机器人的移动以及监视其自身的各种传感器的实时状态（不得不承认，老外真是有钱，连远程控制站也能做得如此专业，说实话这场面跟欧美大片里的某些桥段没什么两样）。

  ![robocup_secure_3](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_secure/robocup_secure_3.jpg)

  ![robocup_secure_4](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_secure/robocup_secure_4.jpg)

- #### RoboCup Soccer

  **仿真组**
  以下是RoboCup仿真2D和3D组的比赛画面，从图中可以看到仿真组的软件平台和裁判系统都是统一的，它们由RoboCup官方提供，而不同的地方在于各个参赛队伍需要根据比赛规则编写各自的程序算法来控制己方的机器人完成带球、传球、射门以及防守等操作。当然，除了基本的控制之外，整场比赛的策略也是非常重要的，因为足球毕竟不是单独个体的运动，它需要团队之间的协作配合。总之，个人感觉在多智能体协同算法方面，仿真组还是相当厉害的。

  ![robocup_soccer_1](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_soccer/robocup_soccer_1.jpg)

  ![robocup_soccer_2](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_soccer/robocup_soccer_2.jpg)

  ---

  **实物组**
  RoboCup足球实物组在仿真组软件算法的基础之上，加入了物理实体机器人之间的对抗，这使得足球比赛看起来更加真实，当然这也对各个队伍的技术水平提出了更高的要求（以下是小型组和标准组的比赛）。

  ![robocup_soccer_3](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_soccer/robocup_soccer_3.jpg)

  ![robocup_soccer_4](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_soccer/robocup_soccer_4.jpg)

- #### RoboCup Logistics

  **概述**
  RoboCup物流组是国际机器人竞赛RoboCup的一个组成部分，它专注于工厂物流应用。RoboCup物流组的目标是通过使用自主机器人来解决工业生产过程中物质和信息的灵活交换问题，并提供标准、成熟的软硬件平台来促进物流方面的科学研究力度。

  **规则**
  机器人需要先从存储箱中获取原材料，接着以动态的顺序在机器之间进行运输，然后在这些机器中处理生产，最后将它们运送到目标位置。一个参赛队伍由三台机器人组成，每个机器人都基于标准化的[Festo Robotino](http://www.festo-didactic.com/de-de/service/robotino)开发平台，并且在其基础之上可以扩展一些传感器和计算设备。

  **改革**
  RoboCup物流组从2015合肥国际赛开始进行改革，引入了全新的挑战——机器人不再像前几届那样需要在地板上移动冰球，而是根据[Festo](http://www.festo.com/)提供的模块化生产系统（MPS）来操作工作站。如下图所示，MPS是用于处理圆筒的小型生产机器，而圆筒代表工件，它由彩色的底座，零个或最多三个彩色的圆环组成。在实际的比赛中，产品顺序是随机确定并且动态发布的，因此由机器人车队所驱动的生产过程中的规划和调度是关键因素，同时各个参赛队伍也会面临一些典型的技术难题，比如具有碰撞检测的导航、自我定位、物体检测以及（受限的）操作等。

  ![robocup_logistics_1](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_logistics/robocup_logistics_1.jpg)

  ![robocup_logistics_2](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_logistics/robocup_logistics_2.jpg)

  ![robocup_logistics_3](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_logistics/robocup_logistics_3.jpg)

  ![robocup_logistics_4](http://media.myyerrol.io/images/robocup/hefei/day_3/robocup_logistics/robocup_logistics_4.jpg)

- #### BSR

  随着RoboCup的正式开幕，我们的BSR项目也开始了第一天的比赛。如下图所示，比赛科目主要是测试在无载荷和有载荷这两种情况下，机器人走直线和旋转的误差，误差越小，负重载荷越大，分数越高。虽然我们的底盘看起来比较Low（由于经费紧张，我们直接拆掉晓萌机器人的底盘拿来用的），不过预赛的成绩我记得好像还不错，也算是有了一些心理安慰吧。

  ![bsr_1](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_1.jpg)

  ![bsr_2](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_2.jpg)

  ![bsr_3](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_3.jpg)

  ![bsr_4](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_4.jpg)

  ![bsr_5](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_5.jpg)

  ![bsr_6](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_6.jpg)

  ![bsr_7](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_7.jpg)

  ![bsr_8](http://media.myyerrol.io/images/robocup/hefei/day_3/bsr/bsr_8.jpg)

## 总结

RoboCup合肥国际赛正式开幕了，每个项目组的比赛都进行得非常激烈，而我们自己作为参赛的队伍之一，也算是真正意义上体会到了赛前准备以及等待结果的那种紧张之情。总之，比赛虽然会有胜负之分，但是我们从失利和其它队伍中所学到的宝贵知识和经验则显得更为重要，希望每个参赛队伍都能在接下来的赛程当中有所收获，并享受其中！

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
