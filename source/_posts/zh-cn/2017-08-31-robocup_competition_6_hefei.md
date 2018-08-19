---
title: RoboCup比赛系列（六）：RoboCup合肥国际赛第四天
date: 2017-08-31 14:30:00
tags:
  - RoboCup
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup合肥国际赛第四天的相关内容。
feature: /images/feature/robocup2015.png
toc: true
comments: true
---

## 前言

RoboCup即机器人世界杯，是目前世界上级别规格最高、影响力最广的机器人赛事（当然，DARPA机器人挑战赛除外）。中国曾经在2008年的时候举办过一次RoboCup国际赛，地点是在苏州，而七年之后，RoboCup国际赛又一次降临中国，这次则是在拥有多年举办机器人赛事经验的合肥。非常幸运的是我们晓萌机器人团队能够被邀请参与本次比赛新增的BSR项目，并获得免费近距离观摩比赛的机会。

这篇文章主要讲述我们在RoboCup合肥国际赛**第四天**所发生的一些事情，内容主要以亲身经历为主，其中也会涉及技术方面，但不是重点。

<!--more-->

## 经历

### Workshop

作为BSR项目的参赛队伍，我们有幸参加了在会议室举办的专题研讨会。从下面的会议日程上可以看到很多在国内外从事机器人研究的专家、学者会来到研讨会现场，与大家一起分享他们的最新成果，当然，我们在Team Spotlight环节也会登上演讲台去介绍我们自己现有所使用的一些成熟技术（演讲内容要全英文）。总之，我们在研讨会中收获很多。

![workshop](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop.jpg)

- #### Team Xmbot

  以下是我们晓萌队的技术展示部分，演讲者是我们的前任队长狗哥，即**西工大一小学生**（佩服狗哥登台演讲的勇气和英语口语能力！）。PPT中首先介绍了项目发展情况和团队人员组成，接着按照从底到高的架构顺序，依次介绍了晓萌机器人的硬件和所使用的传感器、嵌入式控制系统以及基于ROS的导航软件框架等。

  ![workshop_xmbot_1](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_xmbot_1.jpg)

  ![workshop_xmbot_2](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_xmbot_2.jpg)

  ![workshop_xmbot_3](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_xmbot_3.jpg)

  ![workshop_xmbot_4](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_xmbot_4.jpg)

  ![workshop_xmbot_5](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_xmbot_5.jpg)

- #### Team Kejia

  以下是可佳低成本移动平台团队的演讲内容，其中主要涉及了硬件设计、软件架构以及建图、定位和导航所使用的算法介绍。

  ![workshop_kejia_1](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_1.jpg)

  ![workshop_kejia_2](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_2.jpg)

  ![workshop_kejia_3](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_3.jpg)

  ![workshop_kejia_4](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_4.jpg)

  ![workshop_kejia_5](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_5.jpg)

  ![workshop_kejia_6](http://media.myyerrol.io/images/robocup/hefei/day_4/workshop/workshop_kejia_6.jpg)

### RoboCup@Home

RoboCup@Home项目组进行到第二天的争夺，尽管赛事紧凑、挑战性高、各支参赛队伍的水平有高有低，但就像下图所展示的那样，这些因素都妨碍不了RoboCup@Home这个大家庭各成员之间建立起牢固的友谊。在赛场上我们要为捍卫自己队伍的荣誉而战，而在场下我们则是愿意互相分享开发经验、共同为梦想而努力的好朋友，我想这就是RoboCup@Home以及RoboCup本身在赛事之外所教会给我的东西。

![robocup@home](http://media.myyerrol.io/images/robocup/hefei/day_4/robocup@home/robocup@home.jpg)

### BSR

BSR项目预赛的第一阶段（测试机器人移动的精准程度）已经比完，接下的第二阶段比赛也会在明天拉开战幕。明天的比赛主要考查机器人的自主导航能力，即让机器人自主地从比赛场地的起始位置移动到目标位置，而且在移动的途中机器人不能碰到围墙和障碍物。为了完成比赛任务，如下图所示，我们使用了Robopeak RPLIDAR激光传感器和Kinect深度摄像机，并基于ROS平台进行二次开发。最后总体测试效果还不错，只是需要对算法中的某些参数进行进一步的调整。

![bsr_1](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_1.jpg)

![bsr_2](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_2.jpg)

![bsr_3](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_3.jpg)

![bsr_4](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_4.jpg)

![bsr_5](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_5.jpg)

![bsr_6](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_6.jpg)

![bsr_7](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_7.jpg)

![bsr_8](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_8.jpg)

![bsr_9](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_9.jpg)

![bsr_10](http://media.myyerrol.io/images/robocup/hefei/day_4/bsr/bsr_10.jpg)

## 总结

RoboCup第二个正式比赛日结束。在一天的时间中，我们既听了来自卡内基梅隆大学、东京大学、上海交通大学、中国科学技术大学等国内外顶尖研究机构专家学者的报告会，也观看了几场精彩机器人比赛。总之，这一天过得很充实，收获也很多，希望接下来我们团队可以在最后的比赛中取得好成绩！

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
