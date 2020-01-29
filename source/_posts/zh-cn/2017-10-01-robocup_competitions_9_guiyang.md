---
title: RoboCup比赛系列（九）：RoboCup贵阳公开赛
date: 2017-10-01 17:30:00
tags:
  - RoboCup
  - RoboCup@Home
categories: RoboCup比赛系列
description: 本篇文章介绍RoboCup贵阳公开赛的相关内容。
feature: http://media.myyerrol.io/images/features/robocup@home.jpg
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

  ![debug_navigation](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_navigation.jpg)

  ---

- #### 自主识别抓取物体

  自主识别和抓取物体项目是我们这一次赛前调试的重点内容。早在暑假的时候，我就已经完成了大部分机械臂控制和规划算法的编写工作，不过为了追求整个抓取项目的鲁棒性，我和其他几名队友商量之后还是决定简化机械臂的控制，即只让机械臂负责末端夹持器Z轴高度的变化，而对于末端夹持器其余两个维度的位置调整则交给了更加成熟的底盘模块（使用底盘的前进、后退以及旋转功能来实现）。如下几个图所示，经过大量的调试，简化版的机械臂抓取策略还是相当稳定的，基本上只要图像模块能够识别到物体，机械臂就能将其抓取并放到柜子（由于当时经费紧张，所以我们用桌子和纸箱搭了一个简易的两层“柜子”）的下面一层中，不过缺点也很明显，那就是晓萌完成一次完整的抓取流程需要花费很多时间（主要浪费在底盘多次前进、后退以及缓慢的旋转上），这个问题我们会在比赛之后赛进行改进，以提高晓萌机械臂的抓取效率。

  ![debug_object_manipulation_1](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_object_manipulation_1.jpg)

  ![debug_object_manipulation_2](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_object_manipulation_2.jpg)

  ![debug_object_manipulation_3](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_object_manipulation_3.jpg)

  ![debug_object_manipulation_4](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_object_manipulation_4.jpg)

  ![debug_object_manipulation_5](http://media.myyerrol.io/images/robocup/guiyang/debug/debug_object_manipulation_5.jpg)

### 比赛

- #### RoboZoo

  由于RoboZoo仅是一个展示项目，没有太多涉及技术方面的内容，而且其它几个重要的比赛项目占据了我们大部分的调试时间，所以我们算是在比赛开始前几天才想出一个比较有创意的比赛方案出来。如下图所示，晓萌机器人做静态展示，而其前面的大红机器人（我们基地的上古舞蹈机器人）则在海报上进行动态的舞蹈展示，可惜的是我们本来的设计方案是让晓萌机器人通过语音来命令大红来开始跳舞，但由于现场噪音太大，几次尝试都没有成果，所以我们索性直接通过人的语音来启动大红，不过最后结果还是不错的，我们在这个项目上拿了第一名。

  ![robozoo](http://media.myyerrol.io/images/robocup/guiyang/competition/robozoo/robozoo.jpg)

- #### Speech Recognition

  在语音识别这个项目上，技术裁判会根据电脑上安装有的[GPSRCmdGen](https://github.com/kyordhel/GPSRCmdGen)软件所随机生成的问题序列来询问机器人，机器人需要通过语音重复识别到的问题然后再进行回答，问题总共有15个，每答对一个就加一定的分数，最后哪个队得分高则排在前面。我们晓萌队在语音识别这个单项上依然发挥得非常出色，我记得最后的成绩是正确答对13个问题，效果拔群。

  ![speech_recognition](http://media.myyerrol.io/images/robocup/guiyang/competition/speech_recognition/speech_recognition.jpg)

- #### Face Recognition

  人脸识别项目考察机器人如何在人群中找到特定的目标人物。机器人首先需要在比赛开始之后向人群前进一段距离，到达指定的识别地点之后，机器人要通过摄像头来捕捉前排坐在椅子上和后排站立的人的脸部信息，等到机器人成功识别出目标之后，只需走向目标人物并用语音向裁判说明即可。不过由于该项难度较大，除了中科大的可佳能够轻松完成之外，没有队伍可以成功地执行完整个任务流程，当然我们晓萌队在这个项目上得分也不高，看来之后还要继续努力。

  ![face_recognition_1](http://media.myyerrol.io/images/robocup/guiyang/competition/face_recognition/face_recognition_1.jpg)

  ![face_recognition_2](http://media.myyerrol.io/images/robocup/guiyang/competition/face_recognition/face_recognition_2.jpg)

- #### Navigation

  自主导航项目要求机器人在室内能够准确到达几个目标位置点，并在整个移动过程中避开桌椅、墙壁等障碍物。那天的比赛中，我们晓萌机器人在前两轮表现不佳，机器人在裁判下令比赛开始之后并没有移动（当时我们都焦急得满头大汗），我们分析问题主要出在晓萌机器人在进门阶段时没有正常地检测到房门已被打开，所以底盘模块负责人壕神在第三轮比赛前的短暂准备时间内对代码进行了一些调整，还好最后一轮比赛我们的晓萌机器人能够正常地运行，并且完成了一部分比赛任务，总算之前的努力没有白费。

  ![navigation_1](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_1.jpg)

  ![navigation_2](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_2.jpg)

  ![navigation_3](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_3.jpg)

  ![navigation_4](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_4.jpg)

  ![navigation_5](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_5.jpg)

  ![navigation_6](http://media.myyerrol.io/images/robocup/guiyang/competition/navigation/navigation_6.jpg)

- #### Object Recognition & Manipulation

  由于物体识别和抓取项目是最后一个比赛项目，所以留给我们在现场进行调试的时间比较少，我的两个队友也在抓紧时间对裁判公布的每件物品进行拍照和训练。在本次比赛中，只有四个参赛队伍的机器人具有机械臂，它们分别是：中科大、上交大、上应技和西工大，我们在四个队伍中排在最后一个出场，在已经完赛的前三个队伍中，上应技没有实现抓取，上交大在第二轮中成功识别并抓取一个物品，而中科大则是在首轮就相当轻松地识别并抓取了两三个物品。

  最后轮到我们出场了，我们在把晓萌机器人摆放在白线（比赛开始位置）上之后，由我来启动晓萌机器人的比赛程序（因为我是机械臂模块的负责人），虽然要启动的7条命令我早已烂熟于心，但是当全场所有人的目光都投向你的时候，未免还是有些紧张。在成功启动所有程序之后，比赛正式开始，第一轮比赛我们识别错了物体，问题可能出在策略模块对所抓物体的选择上，所以在第二轮前的准备时间里，耀神和芳姐讨论之后决定将要抓取的物体名称直接固化在状态机程序中，也就是说我们提前要在两个物品中选一个去抓。最后的事实证明，我们赌赢了但是非常遗憾的是我们离晓萌机器人在正式比赛中成功自主识别和抓取物品这一里程碑事件就差了几个厘米的距离。因为底盘从白线处前进到识别位置时差了几个厘米，导致Kinect没能识别到物体，后来在比赛结束之后，我们把晓萌机器人往前移动了几个厘米，果然程序都一切正常地执行下去了……。

  ![object_manipulation_1](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_1.jpg)

  ![object_manipulation_2](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_2.jpg)

  ![object_manipulation_3](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_3.jpg)

  ![object_manipulation_4](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_4.jpg)

  ![object_manipulation_5](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_5.jpg)

  ![object_manipulation_6](http://media.myyerrol.io/images/robocup/guiyang/competition/object_manipulation/object_manipulation_6.jpg)

### 团队

我们这一届晓萌团队在之前学长开发的基础上对机器人的整体架构进行全新的变革。机械部分：忧神设计了新的机械手爪并为晓萌机器人的显示屏、麦克风和摄像头等设备提供了结实的固定支架；电子部分：东神和派大星为嵌入式系统编写了新的机械臂位置控制算法；软件部分：壕神提高了底盘模块的自主导航能力，耀神根据比赛规则编写了基于状态机跳转的新策略模块，张凡让语音识别的准确度得到进一步的提高，芳姐和刘琪则实现了基于OpenCV和PCL等图像技术的物体和人脸识别算法，朋为我们翻译了英文的比赛规则并为复杂算法提供数学支持，而我负责编写了机械臂的控制和规划算法。总之，团队的阶段性成功离不开每一位成员的辛苦努力和付出，也希望之后的晓萌团队可以发展得越来越好。

![team_cloth_and_logo](http://media.myyerrol.io/images/robocup/guiyang/team/team_cloth_and_logo.jpg)

![team_group_photo](http://media.myyerrol.io/images/robocup/guiyang/team/team_group_photo.jpg)

## 总结

我们晓萌团队在本次RoboCup贵阳公开赛上的表现相较之前5月份的那次有了很大的提升，但是从过程来看依然暴露了一些问题：比如在物体识别和抓取项目中，我们离成功就差个很小的距离，表面来看问题出现的原因是我们晓萌的底盘离柜子的距离不够，导致Kinect没能识别到物体，而深层次的原因则在于我们在调试的时候没有把所有可能出现的情况都考虑在内，即测试用例理想化，极端或边界情况都没有被进行测试。因此，我们在做一个复杂的机器人系统时，不光要会写代码，还要会用开发规范来提高代码质量，会用Git等软件来做代码版本控制，会用所有可能出现的情况来全方面测试代码，最后要会用文档来记录开发或调试过程中出现的问题、解决方法、经验总结等。个人认为，只要未来的晓萌团队能用上述软件工程的方法来对自己进行严格管理，那我们就会在追逐终极目标——参加RoboCup@Home国际赛的道路上不断前进！

当然，本篇博客的结束也意味着RoboCup比赛系列的正式完结。回想短短一年之内的3次比赛，我们既经历过在基地熬夜调试到凌晨，用椅子拼床用书做枕头的艰苦（由于比赛前住基地的人比较多，行军床不够用了，所以只好简单凑活一下），也在紧张激烈的比赛之余体验过各座城市的风土人情，不过最重要的是我们能够像《速度与激情》系列里的赛车家族一样，可以共同面对未知的困难，并在解决困难的途中各尽所长，甚至在关键时刻能有所牺牲，我想哪怕最后比赛结果不理想，但这份曲折且宝贵的经历也足以配得上最终的胜利！

在基地的时候，我每次跟别的同学或老师讲我们基地或我们家政组所正在研究的内容时，内心就会自然而然地产生一种成就感，我们正在做的是可以在不久的将来能引领人工智能发展的服务机器人领域，虽然我们的研究还处于早期阶段，但有一点可以肯定：目前西工大还没有一支由本科生组成的团队可以达到我们的高度，光这一点就让我发自内心的自豪！

最后，以《速度与激情7》中的片尾经典台词和晓萌的照片来结束这篇文章，以纪念我们大学生活中这段最为宝贵的经历：

No matter where you are, whether it's a quarter mile away or half way across the world. The most important thing in life will always be the people in this room, right here, right now. You'll always be with me. And you'll always be my brother.

![team_xmbot](http://media.myyerrol.io/images/robocup/guiyang/team/team_xmbot.jpg)

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
