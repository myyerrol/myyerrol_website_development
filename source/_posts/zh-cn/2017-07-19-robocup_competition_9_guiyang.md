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

  以下图片展示的是我们晓萌机器人在自主导航调试中有关进门环节的情况，由于门刚开始是处于关闭的状态，所以机器人需要通过激光传感器不断地检测门的开启或关闭状态来判断是否让自己进门。除此之外，门的宽度较窄，为了保证晓萌在进门的时候不会撞到两边的门框，我们在原有SLAM算法的基础之上进行了定制，融合了地图中的边缘信息，使得机器人能够顺利地过门。

  ![debug_navigation](../../../../../images/guiyang/debug/debug_navigation.jpg)

  ---

- #### 自主识别抓取物体

  自主识别和抓取物体项目是我们这一次赛前调试的重点内容。早在暑假的时候，我就已经完成了大部分机械臂控制和规划算法的编写工作，不过为了追求整个抓取项目的鲁棒性，我和其他几名队友商量之后还是决定简化机械臂的控制，即只让机械臂负责末端夹持器Z轴高度的变化，而对于末端夹持器其余两个维度的位置调整则交给了更加成熟的底盘模块（使用底盘的前进、后退以及旋转功能来实现）。如下几个图所示，经过大量的调试，简化版的机械臂抓取策略还是相当稳定的，基本上只要图像模块能够识别到物体，机械臂就能将其抓取并放到柜子（由于当时经费紧张，所以我们用桌子和纸箱搭了一个简易的两层“柜子”）的下面一层中，不过缺点也很明显，那就是晓萌完成一次完整的抓取流程需要花费很多时间（主要浪费在底盘多次前进、后退以及缓慢的旋转上），这个问题我们会在比赛之后赛进行改进，以提高晓萌机械臂的抓取效率。

  ![debug_pick_1](../../../../../images/guiyang/debug/debug_pick_1.jpg)

  ![debug_pick_2](../../../../../images/guiyang/debug/debug_pick_2.jpg)

  ![debug_pick_3](../../../../../images/guiyang/debug/debug_pick_3.jpg)

  ![debug_pick_4](../../../../../images/guiyang/debug/debug_pick_4.jpg)

### 比赛

- #### RoboZoo

  由于RoboZoo仅是一个展示项目，没有太多涉及技术方面的内容，而且其它几个重要的比赛项目占据了我们大部分的调试时间，所以我们算是在比赛开始前几天才想出一个比较有创意的比赛方案出来。如下图所示，晓萌机器人做静态展示，而其前面的大红机器人（我们基地的上古舞蹈机器人）则在海报上进行动态的舞蹈展示，可惜的是我们本来的设计方案是让晓萌机器人通过语音来命令大红来开始跳舞，但由于现场噪音太大，几次尝试都没有成果，所以我们索性直接通过人的语音来启动大红，不过最后结果还是不错的，我们在这个项目上拿了第一名。

  ![competition_robozoo](../../../../../images/guiyang/competition/competition_robozoo.jpg)

- #### Speech Recognition

  ![competition_speech](../../../../../images/guiyang/competition/competition_speech.jpg)

- #### Face Recognition

  ![competition_face_1](../../../../../images/guiyang/competition/competition_face_1.jpg)

  ![competition_face_2](../../../../../images/guiyang/competition/competition_face_2.jpg)

- #### Navigation

  ![competition_navigation](../../../../../images/guiyang/competition/competition_navigation.jpg)

- #### Object Recognition & Manipulation

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
