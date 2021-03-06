---
title: RoboCup比赛系列（四）：RoboCup合肥国际赛第二天
date: 2017-08-11 12:30:00
tags:
  - RoboCup
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup合肥国际赛第二天的相关内容。
feature: /images/features/robocup_hefei.png
toc: true
comments: true
---

## 前言

RoboCup即机器人世界杯，是目前世界上级别规格最高、影响力最广的机器人赛事（当然，DARPA机器人挑战赛除外）。中国曾经在2008年的时候举办过一次RoboCup国际赛，地点是在苏州，而七年之后，RoboCup国际赛又一次降临中国，这次则是在拥有多年举办机器人赛事经验的合肥。非常幸运的是我们晓萌机器人团队能够被邀请参与本次比赛新增的BSR项目，并获得免费近距离观摩比赛的机会。

这篇文章主要讲述我们在RoboCup合肥国际赛**第二天**所发生的一些事情，内容主要以亲身经历为主，其中也会涉及技术方面，但不是重点。

<!--more-->

## 经历

由于我们晓萌队要准备接下来的BSR(Benchmark Service Robot)预赛，所以这一天我基本上都待在BSR比赛场地附近的调试区域。当然因为我们自己本身就是做RoboCup@Home项目的，所以每隔一段时间，我还是会来到旁边的RoboCup@Home场地，用自己的手机来记录现场所发生的一些事情。

### RoboCup@Home

- #### 赛程

  RoboCup@Home裁判组终于公布了赛程安排。如下图所示，各队每天要进行的比赛项目多且时间安排紧凑，比如今天就要进行三个测试科目，时间从上午9点一直持续到晚上8点左右。虽然它们不属于正式比赛项目，不计得分和名次，但是却为之后的正赛提供了技术和安全方面的保障。

  **Mapping Slots**
  每个参赛队伍的机器人都可以使用自身携带的激光传感器来建立比赛场地的地图，这为之后机器人在比赛中的自主导航提供基本保障。

  **Robot Inspection & Introduction**
  裁判组会对每个参赛的机器人进行详细的检查，以确保机器人的机械、电路等设计满足规则中的要求（比如急停开关的位置是否合适、机器人外部是否有裸露的电线等），防止因机器人在比赛中失控所导致危险情况的发生。

  **Poster Session & Reception**
  该环节是RoboCup@Home项目的传统组成部分，它规定每个参赛队伍都必须事先准备好有关自己机器人的技术海报，并在现场向裁判和各队领队进行简要的讲解，其目的主要是为了加强各队之间的技术交流，以便促进RoboCup@Home项目的不断发展。

  ![schedule](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/schedule/schedule.jpg)

- #### 机器人

  从下图可以看到，每个队伍都在积极准备明天各自的比赛项目，其中有一部分队伍的队员正在用视觉传感器对物体进行训练，以便为之后的物体识别和抓取项目做好充足的准备。

  ![robot_1](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_1.jpg)

  ![robot_2](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_2.jpg)

  ![robot_3](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_3.jpg)

  ![robot_4](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_4.jpg)

  ![robot_5](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_5.jpg)

  ![robot_6](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_6.jpg)

  ![robot_7](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_7.jpg)

  ![robot_8](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/robot/robot_8.jpg)

- #### 技术海报

  以下海报是参赛队伍对各自机器人所用技术的概述。通过观察可以看到大部分队伍都将ROS(Robot Operating System)作为机器人的核心框架，并在其基础之上进行了更深入的研究工作。

  {% alert success %}
  因为当初我是竖着用手机对海报进行拍照的，所以照片显示在博客里也就横过来了。如果你用的是手机或平板电脑浏览本文章的话，请直接将屏幕顺时针旋转90度即可，但是如果你用的是电脑的话，那就只能请你向左歪脑袋或者直接下载照片进行查看了。
  {% endalert %}

  ![poster_1](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_1.jpg)

  ![poster_2](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_2.jpg)

  ![poster_3](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_3.jpg)

  ![poster_4](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_4.jpg)

  ![poster_5](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_5.jpg)

  ![poster_6](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_6.jpg)

  ![poster_7](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_7.jpg)

  ![poster_8](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_8.jpg)

  ![poster_9](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_9.jpg)

  ![poster_10](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_10.jpg)

  ![poster_11](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_11.jpg)

  ![poster_12](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_12.jpg)

  ![poster_13](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_13.jpg)

  ![poster_14](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_14.jpg)

  ![poster_15](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_15.jpg)

  ![poster_16](https://media.myyerrol.io/images/robocup_competitions/4_hefei/robocup@home/poster/poster_16.jpg)

## 总结

伴随着RoboCup合肥国际赛第二天的结束，所有参赛队伍的调试工作都接近了尾声。在这两天的现场调试过程当中，我们虽然遇到过一些问题（比如传感器安装位置的不合适所导致机器人避障不准、建立好的地图中存在杂点等），但是经过团队的一起努力，以上问题还是得到了比较好的解决。明天RoboCup合肥国际赛就要正式开幕了，希望所有参赛的队伍都能在正式比赛中竭尽全力，发挥出自己的应有水平，在争取名次的同时也能从互相的技术交流讨论之中受益匪浅！
