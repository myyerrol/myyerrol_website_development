---
title: RoboCup比赛系列（零）：总纲
date: 2017-07-01 08:30:00
tags:
  - RoboCup
  - RoboCup@Home
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup比赛系列的总纲。
feature: images/robocup/robocup.png
toc: true
comments: true
---

## 前言

我记得自己大二刚来基地的时候，狗哥（**西工大一小学生**）就曾告诉我们这一届新队员：

> 我们参加机器人比赛重要的是经历和交流，而不是结果。最后获得的奖只能代表你参加过此次比赛，它无法全部证明你的能力。

当时听完学长的话，我心里面也是非常认同的，直到后来我参加过三次机器人比赛之后，我才算是真正地体会到学长这番话的含义：对于需要好成绩才能从学校那里拿到足够资金的基地来说，结果是重要的。但对于个人来说，我们从比赛中所获得经验教训以及与其他的队伍进行的技术交流才是最重要的，而不是所谓的加分。

<!--more-->

## 简介

我们团队参加的比赛类别为RoboCup@Home，即RoboCup服务机器人项目组。关于具体什么是[RoboCup](http://www.robocup.org)和[RoboCup@Home](http://www.robocupathome.org)，接下来我会对它们进行详细的介绍。

### RoboCup

![robocup](../../../../../images/robocup/robocup.png)

- #### 概述

  RoboCup is an international scientific initiative with the goal to advance the state of the art of intelligent robots. When established in 1997, the original mission was to field a team of robots capable of winning against the human soccer World Cup champions by 2050.

  RoboCup是一项旨在推进智能机器人技术水平的国际科学计划。在1997年成立的时候，其最初的任务是要在2050年之前组建一支能够赢得人类足球世界杯冠军的机器人队。

- #### 目标

  It is our intention to use RoboCup as a vehicle to promote robotics and AI research, by offering a publicly appealing, but formidable challenge. One of the effective ways to promote science and engineering research is to set a challenging long term goal. When the accomplishment of such a goal has significant social impact, it is called a grand challenge project. Building a robot that plays soccer will not by itself generate significant social and economic impact, but the accomplishment will certainly be considered a major achievement for the field. We call this kind of project a landmark project. RoboCup is a landmark project as well as a standard problem.

  我们打算通过提供一个公开吸引人但艰巨的挑战，来把RoboCup作为推动机器人和AI研究的工具。促进科学和工程研究的有效途径之一是制定具有挑战性的长期目标。当这样一个目标的实现具有重大的社会影响时，它就被称为是一个伟大的挑战项目。建立踢足球的机器人本身不会产生重大的社会和经济影响，但成果肯定会被认为是该领域的重大成就。我们称这种项目是一个里程碑式的项目。RoboCup既是一个里程碑式的项目，也是一个标准的问题。

- #### 梦想

  We proposed that the ultimate goal of the RoboCup Initiative to be stated as follows:

  > By the middle of the 21st century, a team of fully autonomous humanoid robot soccer players shall win a soccer game, complying with the official rules of FIFA, against the winner of the most recent World Cup.

  We propose that this goal will be one of the grand challenges shared by the robotics and AI communities for the next 50 years. This goal may sound overly ambitious given the state of the art of technology today.

  Nevertheless, we believe it is important that such a long-range goal should be set and pursued. It took only 50 years from the Wright Brothers’ first aircraft to the Apollo mission, to send a man to the moon and safely return him to the earth. It also took only 50 years, from the invention of the digital computer to Deep Blue, which beat the human world champion in chess. Building a humanoid soccer player requires an equally long period and extensive efforts of a broad range of researchers, and the goal will not be met in the near future.

  我们提出，RoboCup计划的终极目标如下：

  > 到二十一世纪中叶，一个完全自主的类人机器人足球运动员队伍在遵守国际足联的官方规则下与人类世界杯冠军队伍进行对抗，并取得最终的胜利。

  我们提议这个目标将是未来五十年机器人和AI社区所共同面临的巨大挑战之一。鉴于当今的技术水平，这个目标可能听起来过于雄心勃勃。

  不过，我们相信如此长远的目标得到确定和追求是很重要的。从莱特兄弟的第一架飞机到派人登上月球上并将其安全送回地球的阿波罗任务仅花了五十年。从数字计算机的发明到在国际象棋比赛中击败人类世界冠军的深蓝也仅花了五十年的时间。构建类人足球运动员需要相当长的时间以及大量研究人员的广泛努力，所以短期内这一目标不会实现。

- #### 里程碑

  In the case of RoboCup, the ultimate goal is to "develop a robot soccer team which beats the human world champion team." (A more modest goal is "to develop a robot soccer team which plays like human players.")

  Needless to say, the accomplishment of the ultimate goal will take decades of effort. It is not feasible, with current technologies to accomplish this goal in the near future. However, this goal can easily lead to a series of well-directed subgoals. Such an approach is common in any ambitious, or overly ambitious project. In the case of the American space program, the Mercury project and the Gemini project, which manned an orbital mission, were two precursors to the Apollo mission. The first subgoal to be accomplished in RoboCup is "to build real and software robot soccer teams which play reasonably well with modified rules." Even to accomplish this goal will undoubtedly generate technologies, which will impact a broad range of industries.

  对于RoboCup来说，其终极目标是“开发一个击败人类世界冠军队伍的机器人足球队”（一个更为谦虚的目标是“开发一个表现与人类运动员类似的机器人足球队”）。

  毫无疑问，完成这个终极目标需要几十年的努力，短期内使用当前技术实现该目标是不可行的。然而，该目标很容易催生一系列具有针对性的子目标，这种方法在任何有雄心或过于雄心勃勃的项目中都是常见的。在美国太空计划中，水星项目和配备轨道任务的双子星座项目是阿波罗任务的两个前身。在RoboCup中，第一个将要完成的子目标是“建立真实和基于软件的机器人足球队，它们能根据修改过的规则在比赛中表现得很合理”。即使实现这一目标，毫无疑问也会产生影响广泛行业的新技术。

- #### 标准问题

  One other aspect of RoboCup is a view that RoboCup is a standard problem so that various theories, algorithms, and architectures can be evaluated. Computer chess is a typical example of such a standard problem. Various search algorithms were evaluated and developed using this domain. With the accomplishment by Deep Blue team, which beat Garry Kasparov, a human grand master, using the official rules, the computer chess challenge came close to its aim. One of the major reasons for the success of computer chess as a standard problem is that the evaluation of progress was clearly defined. The progress of the research can be evaluated as the strength of the system, which was indicated by its rating. However, as computer chess approached its goal, we needed a new challenge. The challenge needed to foster a set of technologies for the next generation of industries. We think that RoboCup will fulfill such a demand.

  RoboCup的另一面可以被看做是一个标准问题，它可以评估各种理论、算法和架构。计算机象棋是这样一个标准问题的典型案例，各种搜索算法都可以使用该模式进行了评估和开发。随着深蓝团队使用官方规则打败人类象棋大师加里·卡斯帕罗夫的成就，计算机象棋挑战接近了它的目标。计算机象棋作为标准问题成功的主要原因之一是对其进度的评估是确定的。研究进展可以通过评估来表现系统的能力。然而，随着计算机象棋接近其目标，我们需要一个新的挑战，它需要为下一代产业培育出一系列新技术，我们认为RoboCup将会满足这样的需求。

### RoboCup@Home

![robocup@home](../../../../../images/robocup/robocup@home.jpg)

- #### 概述

  The RoboCup@Home league aims to develop service and assistive robot technology with high relevance for future personal domestic applications. It is the largest international annual competition for autonomous service robots and is part of the RoboCup initiative. A set of benchmark tests is used to evaluate the robots' abilities and performance in a realistic non-standardized home environment setting. Focus lies on the following domains but is not limited to: Human-Robot-Interaction and Cooperation, Navigation and Mapping in dynamic environments, Computer Vision and Object Recognition under natural light conditions, Object Manipulation, Adaptive Behaviors, Behavior Integration, Ambient Intelligence, Standardization and System Integration. It is colocated with the RoboCup symposium.

  RoboCup@Home联盟旨在开发服务和辅助机器人技术，与未来个人家庭应用高度相关。它是自主服务机器人最大的国际年度大赛，是RoboCup计划的一部分。 一套基准测试用于评估机器人在现实非标准化家庭环境中的能力和性能。研究的重点在于以下领域但不限于：人机交互与合作、动态环境中的导航和建图、自然光条件下的计算机视觉和物体识别、物体操作、自适应行为、行为集成、环境智能、标准化和系统集成。它与RoboCup研讨会共同进行。

## 总纲

以下是我原创的RoboCup比赛系列文章：

[RoboCup比赛系列（零）：总纲](https://myyerrol.github.io/zh-cn/2017/07/01/robocup_competition_0_superclass)
[RoboCup比赛系列（一）：中国服务机器人大赛](https://myyerrol.github.io/zh-cn/2017/07/03/robocup_competition_1_luoyang)
[RoboCup比赛系列（二）：RoboCup合肥国际赛前一天](https://myyerrol.github.io/zh-cn/2017/07/05/robocup_competition_2_hefei)
[RoboCup比赛系列（三）：RoboCup合肥国际赛第一天](https://myyerrol.github.io/zh-cn/2017/07/07/robocup_competition_3_hefei)
[RoboCup比赛系列（四）：RoboCup合肥国际赛第二天](https://myyerrol.github.io/zh-cn/2017/07/09/robocup_competition_4_hefei)
[RoboCup比赛系列（五）：RoboCup合肥国际赛第三天](https://myyerrol.github.io/zh-cn/2017/07/11/robocup_competition_5_hefei)
[RoboCup比赛系列（六）：RoboCup合肥国际赛第四天](https://myyerrol.github.io/zh-cn/2017/07/13/robocup_competition_6_hefei)
[RoboCup比赛系列（七）：RoboCup合肥国际赛第五天](https://myyerrol.github.io/zh-cn/2017/07/15/robocup_competition_7_hefei)
[RoboCup比赛系列（八）：RoboCup合肥国际赛第六天](https://myyerrol.github.io/zh-cn/2017/07/17/robocup_competition_8_hefei)
[RoboCup比赛系列（九）：RoboCup贵阳公开赛](https://myyerrol.github.io/zh-cn/2017/07/19/robocup_competition_9_guiyang)

## 总结

时至今日，那些过往比赛的经历依然历历在目：我们一起装箱运送机器人、在宾馆里熬夜调试代码、在比赛会场紧张地敲击着命令行。我们既有为失败而留的泪水，也有因努力付出所获得的阶段性成功，无论最终的比赛结果如何，它们已经成为我大学最美好的回忆，同时也是我人生中最不可缺少的宝贵财富。

接下来，我会以系列文章的形式记录我大学所经历过的三次RoboCup比赛，其中重点突出比赛经历，而非技术开发要点。总之，希望自己从比赛中所获得的教训和经验都能始终铭记在心中，并为之后所用。

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
