---
title: RoboCup比赛系列（九）：RoboCup贵阳公开赛
date: 2017-07-19 17:30:00
tags:
  - RoboCup
  - RoboCup@Home
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup贵阳公开赛的相关内容。
feature: images/robocup/robocup@home.jpg
toc: true
comments: true
---

## 前言

随着RoboCup合肥国际赛的结束，我们晓萌队又开始紧锣密鼓地着手准备10月份的RoboCup中国赛。由于之前5月份我们在中国服务机器人大赛上发挥得不理想，再加上即将到来RoboCup中国赛是我们这一届晓萌队成员的最后一战，所以这一次我们根据比赛规则提前制定好了开发计划，每个队员也都尽全力来完成各自的任务，当然我们目标很明确：**把握机会，不留遗憾**。

2015年10月份的RobCup中国赛将会在贵阳举办，由于是一年一度的全国赛，所以国内研究服务机器人的高校队伍基本上都会参加，而最令我们感到意外的是刚刚参加完RoboCup合肥国际赛的中科大蓝鹰队也会携可佳机器人参赛，届时我们的晓萌可以和中科大的可佳同台较量，这绝对是我们向强队学习的绝佳机会。

<!--more-->

## 经历

{% alert warning %}
由于之前本人电脑中存储的照片全部丢失，因此该博客中所显示的照片数量比较有限，希望读者可以理解。
{% endalert %}

### 调试

我们吸取了之前比赛失利的教训，提高了赛前调试的次数和强度。由于9月份开学之后，我们的课业都比较繁重，所以那时我们基本上是白天学习专业课，晚上加班加点来舞蹈机器人基地调试机器人。晚上调试机器人最大的好处就是行动比较自由且不会受到外界的干扰，我们可以在楼道走廊里临时搭建好调试场地，并根据比赛内容进行专项联合调试，在联合调试过程中，各个机器人模块（这里的模块主要指的是软件方面，如机器人底盘、机械臂、语音、图像和策略）的负责人需要留在现场，以便出现问题可以大家一起讨论解决。

- #### 自主导航进门

  以下图片展示的是我们晓萌机器人在自主导航调试中有关进门环节的情况，由于门刚开始是处于关闭的状态，所以机器人需要通过激光传感器不断地检测门的开启或关闭状态来判断是否让自己进门。除此之外，门的宽度较窄，如何保证机器人在进门的时候不撞门框也是我们目前调试的一个主要方面。

  ![debug_navigation](../../../../../images/guiyang/debug/debug_navigation.jpg)

  ---

- #### 自主识别抓取物体

  自主识别和抓取物体项目是我们这一次赛前调试的重点内容。早在暑假的时候，我就已经完成了大部分机械臂控制和规划算法的编写工作，不过为了追求整个抓取项目的鲁棒性，我和其他几名队友商量之后决定简化机械臂控制部分，即只让机械臂负责Z轴高度的变化，而末端夹持器的另外两个维度空间位置的调整则交给了成熟的底盘模块。

  ![debug_pick_1](../../../../../images/guiyang/debug/debug_pick_1.jpg)

  ![debug_pick_2](../../../../../images/guiyang/debug/debug_pick_2.jpg)

  ![debug_pick_3](../../../../../images/guiyang/debug/debug_pick_3.jpg)

  ![debug_pick_4](../../../../../images/guiyang/debug/debug_pick_4.jpg)

### 比赛

![competition_robozoo](../../../../../images/guiyang/competition/competition_robozoo.jpg)

![competition_speech](../../../../../images/guiyang/competition/competition_speech.jpg)

![competition_face_1](../../../../../images/guiyang/competition/competition_face_1.jpg)

![competition_face_2](../../../../../images/guiyang/competition/competition_face_2.jpg)

![competition_navigation](../../../../../images/guiyang/competition/competition_navigation.jpg)

![competition_pick_1](../../../../../images/guiyang/competition/competition_pick_1.jpg)

![competition_pick_2](../../../../../images/guiyang/competition/competition_pick_2.jpg)

![competition_pick_3](../../../../../images/guiyang/competition/competition_pick_3.jpg)

![competition_pick_4](../../../../../images/guiyang/competition/competition_pick_4.jpg)

![competition_xmbot](../../../../../images/guiyang/competition/competition_xmbot.jpg)

### 团队

![team_cloth_and_logo](../../../../../images/guiyang/team/team_cloth_and_logo.jpg)

![team_group_photo](../../../../../images/guiyang/team/team_group_photo.jpg)

## 总结

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
