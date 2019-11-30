---
title: 自制机器人系列（二）：小型六足仿生机器人
date: 2018-05-21 22:40:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制小型六足仿生机器人的相关内容。
feature: /images/feature/robot.png
toc: true
comments: true
---

## 前言

这个小型六足机器人是我在大四做的，是我大学本科生涯的最后一个个人项目。至于为什么我要做六足机器人，还要从高考完之后说起：当时刚考完的我一直想做一些有意思的事情，直到有一天我发现了一个叫[PVCBOT](http://www.diy-bot.net/?project=pvcbot)的网站，里面记录了很多如何使用PVC材料来制作简单机器人的教程，其中有一款叫做**PVC六足机器昆虫（见下图）**的机器人彻底震撼了我，当时看完教程之后我就下定决心也要做一个类似的六足机器人，于是我便从[懒猫侠](http://hellorobot.blog.163.com/)前辈那里购买了六足机器人套件（目前应该已经绝版了），并打算按照提供的教程完成自己的六足机器人，但无奈当时的我所掌握的知识太少，什么单片机、串口通信、舵机PWM、电源管理、传感器、舵机控制板等都不懂，特别是机械结构方面我更是一窍不通，所以大一那会儿我还闹出了笑话：用硬纸板做六足机器人的肢体，在安装好舵机并通电测试后，眼睁睁地看着自己的“纸板六足”在舵机的震动下不断地解体。。。

<!--more-->

![pvcbot_hexapod](http://www.diy-bot.net/upload/pvcbot/project/_Original/PVCBOT-Original_600.jpg)

经过大一那次失败之后，我决定暂时停止该项目的开发，转而先去学习那些有关嵌入式开发的基础知识，等以后有能力的时候再去独立完成这个六足机器人。很幸运的是在我大学本科即将结束的时候，我已掌握了足够的知识来完成那个曾经困扰我已久的机器人项目，于是我花了几周的时间完成了这个小型六足机器人，算是了却了自己的一个心愿吧。

## 概述

小型六足仿生机器人是一个拥有十八个关节自由度的迷你多足机器人，它可以实现红外遥控、超声波避障等基本功能。机器人的硬件核心为Arduino Nano，并采用串口通信的方式与24路舵机控制板进行数据交互，从而间接完成对所有舵机旋转角度的精确控制，最终使机器人能够以各种不同的步态进行移动。当然，这个机器人项目的软件依旧开源，具体代码可以从我的GitHub[仓库](https://github.com/myyerrol/hexapod_bionic_robot)上获得。

![hexapod_bionic_robot_1](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_1.jpg)

## 制作

六足机器人的整个制作过程主要分为机械和电子两部分，其中机械部分我是根据懒猫侠在其博客上发布的[第五版六足肢体装配](http://hellorobot.blog.163.com/blog/static/185444129201373023256527/)教程来完成所有拼装的，由于教程中每一步的图片都非常清楚，所以机械这部分没花费我太多的时间和精力。而电子部分则全部是我自己设计的，虽然原理难度不大，但是要根据机器人的机械结构来选择洞洞板的摆放位置并且要完成其上电子元件的布局和焊接工作确实也比较费功夫，而且有的时候如果处理的不好还要返工，不过所幸自己在焊电路前就已经规划好了，所以电路部分的制作也还算顺利。

在接下来的篇幅中，我会尽可能详细地讲解机器人制作过程中的一些具体步骤和细节，如果你对机器人的原理和最后的效果更感兴趣的话，可以跳过本小节直接阅读**原理**和**效果**章节。

### 机械

- #### 六足小腿

  如下图所示，六足的小腿部分主要由两片PVC材质的肢体通过叠加而成，而关节部分则使用的是9G金属齿舵机，只要两个自攻螺丝便可将PVC肢体牢牢固定在舵机上，从而保证六足小腿在与地面接触时可以有足够的力量来支撑整个躯体。

  ![hexapod_bionic_robot_mechanics_1](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_1.jpg)

  因为是六足机器人，所以同样结构的小腿要再做五个出来。**注意：机器人的躯体每边有三个小腿，左右两两对称，所以在组装的时候肢体和舵机安装的位置是有讲究的，要保证结构对称且不能装反**。

  ![hexapod_bionic_robot_mechanics_2](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_2.jpg)

- #### 六足大腿

  **关节**
  六足大腿的关节结构比之前介绍过的小腿关节要略微复杂一些，因为大腿的关节包含了机器人足体上下和前后两个维度的运动，所以需要两个舵机来实现。如下图所示，首先我们使用螺丝将一个舵机固定在方形的关节肢体里。

  ![hexapod_bionic_robot_mechanics_3](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_3.jpg)

  接着我们要重复以上的安装步骤再制作出六个类似的肢体结构。不过在制作的过程中也要注意机器人左右两侧各三个肢体结构要保持对称。

  ![hexapod_bionic_robot_mechanics_4](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_4.jpg)

  然后我们需要将六个舵机分别插入到之前预留好的肢体空槽里，并保证每组的两个舵机在位置上是互相垂直的，即下图中舵机圆形旋转轴的朝向要一前一上。

  ![hexapod_bionic_robot_mechanics_5](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_5.jpg)

  接下来安装六足大腿关节的固定片，即将固定片卡到下图中正面那个舵机的圆形旋转轴上。固定片，顾名思义是用来固定的，用在这里主要是防止关节处的两个舵机因足体的震动而彼此之间出现位置上的偏移。

  ![hexapod_bionic_robot_mechanics_6](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_6.jpg)

  最后分别使用两条塑料扎带对每组关节进行进一步的加固，其中一条从固定片上方穿过，起到束紧固定片的作用，而另一条则穿过关节侧面的小孔对结构进行固定。

  ![hexapod_bionic_robot_mechanics_7](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_7.jpg)

  ---

  **大腿**
  六足的大腿是由两个PVC材质的长方形连杆组成，从下图中可以很清楚地看到每个连杆的左右两侧均安装有配套的舵盘，它们的作用主要是用于连接六足的小腿关节和大腿关节。

  ![hexapod_bionic_robot_mechanics_8](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_8.jpg)

- #### 六足足体

  如下图所示，使用螺丝将之前已经制作好的六对小腿和大腿肢体对应连接在一起。虽然拧螺丝本身没什么难度，但是在哪个位置用螺丝来固定舵机还是有规定的：**即舵机在被肢体连接固定之前要让其旋转轴回归到原始的中点位置上（旋转范围为0~180°的舵机，其中点位置为90°）**，这样做的目的是让所有的舵机都能够拥有最合适的运动范围，从而防止机器人在移动时出现足体运动不对称的情况。至于如何让舵机回归中点，一种办法是使用现成的舵机调试版，只要移动旋钮便可调节舵机的位置；另一种是编写Arduino程序，让舵机在上电后自动归中。我用的是第二种方法，感觉效果还不错。

  ![hexapod_bionic_robot_mechanics_9](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_9.jpg)

  接下来，我们要把六足的足体全部安装到其顶部躯体上。同理，在安装前要确保需要连接固定的舵机已经回归到中点位置，除此之外还要提前规定好躯体的哪一侧是机器人的头部，哪一端是机器人的尾部，不要在安装的时候把足体装反了。

  ![hexapod_bionic_robot_mechanics_10](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_10.jpg)

  如图所示，我们首先可以找一个稍微有点高度的物品将机器人顶部垫高，然后使用扎带依次将每个足体的三条舵机线捆绑起来，这样不仅看上去更加美观，便于之后的整理和连线，而且也**可以有效阻止舵机线与运动中的足体发生缠绕甚至被扯断等情况的出现**，毕竟自己大学在机器人基地的时候就曾亲身经历过电机线在机械臂移动的过程中被狠狠地扯断的悲剧。。。

  ![hexapod_bionic_robot_mechanics_11](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_mechanics_11.jpg)

  最后，我们只需要把锂电池用扎带固定在底部躯体的尾部，然后将供电线和充电线分别引出，再把所有已经扎好的舵机线按照顺序塞到躯体当中，并用螺丝将顶部和底部两个躯体拧紧合二为一便大功告成了（由于这部分没有拍照，所以就用文字叙述了orz）。

### 电子

- #### 电源管理

  下图是机器人的电源管理模块。电源管理模块主要包含电源、降压电路和控制电路等，具体的原理部分请看下面**原理**中的**电源管理**章节。

  ![hexapod_bionic_robot_electronics_1](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_1.jpg)

  下图是电源管理模块的背面。为了让焊接后的电路保持整齐、美观，我尽可能采用锡接走线的方式来完成各元件的电气连接，而没办法走线的地方才使用传统的飞线进行连接。尽管锡接走线的优点很明显，但是它的缺点也比较突出：一个是浪费焊锡，另一个就是容易短路，其中短路问题对机器人的影响还是挺严重的，我记得自己之前就有一次不小心把已经上电的电源管理模块随意放在六足机器人的顶部躯体上，令我没想到的是固定躯体的螺丝的头部正好卡在电路背面电源正负极锡接走线的中间，所以结果可想而知。。。

  所以，在上电测试之前，大家要先用万能表对焊接过的电路进行短路测试，一定要确保没有多余的焊锡渣残留在电路板上，而且对于使用锡接走线方式焊接的电路板，一定不要让其背面直接与潜在具有导电功能的介质进行接触，可以适当地使用铜柱将板子架高或者用热熔胶把板子背面全都覆盖住，以防止短路问题的发生。

  ![hexapod_bionic_robot_electronics_2](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_2.jpg)

  在确保电路不存在任何可能潜在的短路问题后，可像下图所示的那样，对电路模块进行上电测试。测试主要检测电源降压是否达到预期设定的数值，开关的通断逻辑是否正确等。

  ![hexapod_bionic_robot_electronics_3](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_3.jpg)

- #### 控制单元

  下图是机器人的控制单元模块。该控制单元模块主要由Arduino Nano控制板、HMC58883L电子罗盘传感器、MPU6050惯性测量传感器（图中的底座上未插入）、HC-SR04超声波传感器和红外接收管等组成，为了方便在模块出现问题时能够对其进行更换，我在洞洞板上焊接了一些棑母底座，这样模块就可以直接插在棑母底座上，拆卸很方便。此外，有关电路原理部分的详细介绍可以阅读下面的**原理**章节。

  ![hexapod_bionic_robot_electronics_4](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_4.jpg)

  下图是控制单元模块的背面。跟上面已经介绍过的电源管理模块一样，我使用的依然是锡接走线+飞线的方式对元件进行焊接，由于电气连接比较多，所以焊完之后要对电路进行更加全面和仔细的检查。

  ![hexapod_bionic_robot_electronics_5](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_5.jpg)

  如下图所示，由于我的Arduino Nano控制板的USB转串口在之前的寻光小车实验中因短路问题被烧坏了，所以我用的是专门为Arduino最小系统板烧写Bootloader的USBtinyISP编程器来下载程序。经测试，所有模块均能正常工作，那么接下来的工作就只剩下将机器人全部组装好，然后编写和调试代码了。

  ![hexapod_bionic_robot_electronics_6](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_electronics_6.jpg)

## 原理

### 硬件

以下是该小型仿生六足机器人的硬件系统连接图：

![hexapod_bionic_robot_fritzing](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_fritzing.png)

由上图可知，六足机器人的硬件系统主要由舵机控制、电源管理、核心主控、数据感知和数据通信共五部分组成，接下来进行详细的介绍：

- #### 舵机控制

  **金属齿舵机**
  本项目六足机器人所配备的舵机具体型号为YZW Y09G，由于该舵机内部电机减速齿轮组使用金属材质打造，所以其价格上要比常见的辉盛SG90塑料齿舵机贵一些，但是性能却相当出色。该舵机标准输入电压范围为4.8v～6.0v（电压稍大于6v也没问题），扭矩范围在1.3kg/cm～1.6kg/cm之间，经测试，十八个舵机共同作用的扭矩可以基本满足支撑机器人躯体以及锂电池等相关负载的需求。当然，由于定位精度有限，所以舵机会存在控制上的死区问题，我的解决办法主要是通过软件补差的方式来消除这个机械结构上的误差，使机器人能够尽可能准确地到达预定的目标位置。

  **舵机控制板**
  舵机控制板顾名思义就是能够用于控制多个舵机的电路板，由于传统通过编写程序让单片机输出多路PWM控制信号对于大部分的机器人爱好者来说比较复杂，所以就有高手们将MCU和相关外围电路封装在一起开发了便于使用的舵机控制板。此外，舵机控制板一般都会带有一个PC端的调试软件，只要在建立串口通信的前提下拖动软件界面上的滑块，便能精确且实时地操控舵机的旋转角度，而且还能将调试好的动作组合在一起形成动作组并下载到舵机控制板的芯片中进行保存，为之后核心主控通过串口对其进行调用奠定基础。本项目六足机器人使用的是懒猫侠早期开发的一款24路舵机控制板，具体使用方法见[24路舵机控制板板使用说明](http://hellorobot.blog.163.com/blog/static/1854441292013475415881/)。

- #### 电源管理

  电源管理应该算是机器人硬件控制系统里除了核心主控之外最重要的模块了，毕竟传感器坏了机器人还能够四处移动，但是电源部分坏了的话机器人可就只是一个静止的模型了。由于本项目六足机器人采用十八个舵机作为关节执行器，所以尽管9G舵机的耗电量相对标准舵机要小很多，但是十八个舵机加起来所需要的电流大小还是相当惊人的，因此经过一段时间的考量，我最终选择了一款参数为7.4v 850mAh的锂电池组作为机器人的电源，其电能满足六足机器人的动力需求。

  除了锂电池电源之外，从上面的硬件系统连接图中还可以看到有两个降压电路，其中一个降压电路使用L2596 DC-DC模块将一路电源的电压降到标准的5V，用于给Arduino Nano主控制板供电，而另一路使用的是D25XB80大功率整流桥，它拥有标称800V的最大逆向电压和25A的额定前向电流，在锂电池组充满电的情况下（标称7.4v的锂电池组充满电的电压大概在8.4v左右），连接一片D25XB80可以使电压整体降到大概6.9v，经测试给24路舵机控制板和18个舵机供电是没有问题的。

  最后为了方便控制锂电池电源的输入和降压后电源的输出，我并联连接了三个开关，并在并联支路中分别加入了三个LED灯用作电源闭合或断开的显示。关于电源管理的其他内容，大家可以参考一下懒猫侠写的[六足机器人动力的分析  ](http://hellorobot.blog.163.com/blog/static/18544412920116255419787/)这篇博文。

- #### 核心主控

  核心主控主要负责分析传感器反馈回来的数据，然后给舵机控制板发出动作指令，间接驱动舵机运行到指定角度。在本项目中我使用的核心主控为Arduino Nano，它体型较小，且拥有非常丰富的开发教程和器件驱动库，很容易上手。

- #### 数据感知

  数据感知模块主要包括HC-04超声波测距传感器、HMC5883L电子罗盘传感器、MPU6050惯性测量传感器和红外接收管，其中超声波测距传感器用来帮助六足机器人避开其正前方的障碍物，而红外接收管则和常见的迷你红外遥控器一同构成了整个六足机器人的遥控系统，红外接收管能够接收经过38kHz载频二次调制生成的红外信号，并将解码后的数据发送给Arduino Nano主控进行相关处理。HMC58883L和MPU6050这两个传感器主要用于六足机器人的运动感知，通过采集它们的数据并进行简单的融合处理便能得到机器人在空间中的位置关系，从而为之后修正机器人在移动过程中的路径偏差提供数据上的保障。不过由于当时开发时间有限，所以这一部分暂未涉及。

- #### 数据通信

  数据通信包括红外通信、串口通信和蓝牙通信三部分。其中，红外通信在上面的**数据感知**部分已经进行过简要的介绍了，即采用NEC的编码格式将数据进行相应的编码或解码，并通过红外线的方式完成遥控指令数据的传输；串口通信则主要用在核心主控和舵机控制板之间，根据舵机控制板所规定的数据格式，主控能够发送指令来控制一个舵机或多个舵机旋转到指定的位置；最后的蓝牙通信可以使PC端上的软件与舵机控制板之间建立起无线连接，方便六足机器人动作的调试。

### 软件

- #### 核心类库

  > hexapod_bionic_robot.h

  该头文件定义了`HexapodBionicRobot`类，里面声明了机器人避障、处理红外编码信息、处理超声波距离、获取红外编码信息、获取超声波距离和移动机器人躯体等核心函数。

  ```cpp
  #ifndef HEXAPOD_BIONIC_ROBOT_H
  #define HEXAPOD_BIONIC_ROBOT_H

  #include <Arduino.h>
  #include <IRremote.h>

  #define PIN_IR      2
  #define PIN_TX      3
  #define PIN_RX      4
  #define PIN_TRIG    5
  #define PIN_ECHO    6
  #define PIN_LED     13
  #define DIR_INIT    1
  #define DIR_STOP    1
  #define DIR_FRONT   2
  #define DIR_BACK    3
  #define DIR_LEFT    4
  #define DIR_RIGHT   5
  #define MODE_REMOTE 25
  #define MODE_AUTO   26
  #define RADIX       10
  #define RUNTIME     2400
  #define TIMEOUT     30000

  class HexapodBionicRobot
  {
  public:
      HexapodBionicRobot(IRrecv *ir_receiver, decode_results *ir_results);
      void avoidFrontObstacle(void);
      void handleInfraredInformation(void);
      void handleUltrasonicDistance(void);
      void moveRobotBody(uint8_t direction, uint8_t times);
      uint32_t getInfraredInformation(void);
      float getUltrasonicDistance(void);
  private:
      int             mode_flag_;
      float           duration_;
      float           distance_;
      IRrecv         *ir_receiver_;
      decode_results *ir_results_;
  };

  #endif // HEXAPOD_BIONIC_ROBOT_H

  ```

  ---

  > hexapod_bionic_robot.cpp

  该源文件实现了`HexapodBionicRobot`类里面所有已经声明的函数，其中`getInfraredInformation()`函数调用了官方的`IRremote`库，可以实时获取红外遥控器所发送的红外编码，而`handleInfraredInformation()`函数则会将获取到的红外编码与已经定义好的进行比对，若符合则跳转入相应的代码块进行处理（机器人前后左右的移动，以及遥控模式或自动模式切换等），当然程序也会通过调用`avoidFrontObstacle()`函数来判断是否在遥控六足机器人移动的过程中，机器人前方的障碍物距离躯体较近，若距离小于事先设定的阈值，机器人便会自动后退或停止以进行避让。

  ```cpp
  #include "hexapod_bionic_robot.h"

  #define DEBUG 1

  HexapodBionicRobot::HexapodBionicRobot(IRrecv *ir_recviver,
                                         decode_results *ir_results)
      : ir_receiver_(ir_recviver),
        ir_results_(ir_results)
  {
      pinMode(PIN_LED, OUTPUT);
      pinMode(PIN_TRIG, OUTPUT);
      pinMode(PIN_ECHO, INPUT);

      mode_flag_ = MODE_REMOTE;

      duration_ = 0.0;
      distance_ = 0.0;
  }

  void HexapodBionicRobot::avoidFrontObstacle(void)
  {
      float distance = getUltrasonicDistance();
      Serial.println(distance);

      if (distance == false) {
          return ;
      }
      else if (distance <= 2.5) {
          moveRobotBody(DIR_STOP, 2);
      }
      else if (distance <= 5.0) {
          moveRobotBody(DIR_BACK, 2);
      }
  }

  void HexapodBionicRobot::handleUltrasonicDistance(void)
  {
      float distance = getUltrasonicDistance();

      if (distance == false) {
          return ;
      }
      else if (distance <= 5.0) {
          digitalWrite(PIN_LED, HIGH);
  #if DEBUG
          Serial.println("Warning! Distance is too close!!!");
  #endif
      }
      else {
          digitalWrite(PIN_LED, LOW);
      }
  #if DEBUG
      Serial.print("Distance: ");
      Serial.print(distance);
      Serial.println("cm");
  #endif
      delay(100);
  }

  void HexapodBionicRobot::handleInfraredInformation(void)
  {
      float distance = 0.0;
      uint32_t ir_results = getInfraredInformation();

      if (ir_results == false) {
          return ;
      }
      else {
  #if DEBUG
          Serial.print("Infrared code: ");
          Serial.println(ir_results, HEX);
  #endif
          if (ir_results == 0XFF629D) {
              mode_flag_ = MODE_REMOTE;
          }
          else if (ir_results == 0XFFE21D) {
              mode_flag_ = MODE_AUTO;
          }

          if (mode_flag_ == MODE_REMOTE) {
              digitalWrite(PIN_LED, LOW);
              if (ir_results == 0xFF02FD) {
                  moveRobotBody(DIR_FRONT, 2);
                  delay(RUNTIME);
              }
              else if (ir_results == 0xFF9867) {
                  moveRobotBody(DIR_BACK, 2);
                  delay(RUNTIME);
              }
              else if (ir_results == 0xFFE01F) {
                  moveRobotBody(DIR_LEFT, 2);
                  delay(RUNTIME);
              }
              else if (ir_results == 0xFF906f) {
                  moveRobotBody(DIR_RIGHT, 2);
                  delay(RUNTIME);
              }
              else if (ir_results == 0xFFA857) {
                  moveRobotBody(DIR_STOP, 2);
                  delay(RUNTIME);
              }
              avoidFrontObstacle();
          }
          else if (mode_flag_ == MODE_AUTO) {
              digitalWrite(PIN_LED, HIGH);
              while (ir_results != 0XFF629D) {
                  ir_results = getInfraredInformation();
                  moveRobotBody(DIR_FRONT, 2);
                  delay(RUNTIME);
                  avoidFrontObstacle();
              }
              mode_flag_ = MODE_REMOTE;
          }
      }
  }

  void HexapodBionicRobot::moveRobotBody(uint8_t direction, uint8_t times)
  {
      char string_direction[5];
      char string_times[5];

      itoa(direction, string_direction, RADIX);
      itoa(times, string_times, RADIX);

      Serial.print("#");
      Serial.print(string_direction);
      Serial.print("G");
      Serial.print(string_times);
      Serial.println("C");
  }

  uint32_t HexapodBionicRobot::getInfraredInformation(void)
  {
      if (ir_receiver_->decode(ir_results_)) {
          ir_receiver_->resume();
          return ir_results_->value;
      }
      else {
          return false;
      }
  }

  float HexapodBionicRobot::getUltrasonicDistance(void)
  {
      duration_ = 0.0;
      distance_ = 0.0;

      digitalWrite(PIN_TRIG, LOW);
      delayMicroseconds(10);
      digitalWrite(PIN_TRIG, HIGH);
      delayMicroseconds(10);
      digitalWrite(PIN_TRIG, LOW);

      duration_ = pulseIn(PIN_ECHO, HIGH, TIMEOUT);

      if (duration_ == 0.0) {
          return false;
      }
      else {
          distance_ = duration_ * 0.017;
          return distance_;
      }
  }

  ```

- #### 测试代码

  > hexapod_bionic_robot_test.ino

  该测试代码的原理非常简单，首先`setup()`函数会以115200的波特率初始化并打开串口，然后Arduino Nano会向串口发送`#1G2C`（1号动作组循环运行2次）让六足机器人站立起来，紧接着程序会使能红外接收管，让其可以接收遥控器发送的红外编码。等初始化结束后，主程序会跳转到`loop()`函数执行`HexapodBionicRobot`类对象的`handleInfraredInformation（）`函数完成红外遥控以及超声波避障等功能。

  ```cpp
  #include <IRremote.h>
  #include <hexapod_bionic_robot.h>

  IRrecv         g_ir_receiver(PIN_IR);
  decode_results g_ir_results;

  void setup()
  {
      Serial.begin(115200);
      Serial.println("#1G2C");
      g_ir_receiver.enableIRIn();
  }

  void loop()
  {
      HexapodBionicRobot hexapod_bionic_robot(&g_ir_receiver, &g_ir_results);
      hexapod_bionic_robot.handleInfraredInformation();
  }

  ```

## 成果

以下是制作完成后的成果图和测试视频：

![hexapod_bionic_robot_2](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_2.jpg)

![hexapod_bionic_robot_3](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_3.jpg)

![hexapod_bionic_robot_4](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_4.jpg)

![hexapod_bionic_robot_5](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_5.jpg)

![hexapod_bionic_robot_6](http://media.myyerrol.io/images/project/hexapod_bionic_robot/hexapod_bionic_robot_6.jpg)

<div style="height:0; padding-bottom:65%; position:relative;">
  <!-- <iframe width="498" height="510" src="http://player.youku.com/embed/XMzY1MTU4OTczNg" frameborder="0" allowfullscreen="" style="position:absolute; height:100%; width:100%;">
  </iframe> -->

  <iframe src="//player.bilibili.com/player.html?aid=77588129&cid=132731779&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position:absolute; height:100%; width:100%;">
  </iframe>
</div>

## 总结

回想起当初，自己就是看了[六足机器昆虫-你的下一个足式移动机器人](https://www.guokr.com/article/5075/)这篇教程才开始迷上六足机器人的，没想到大四快毕业的时候自己能有机会完成这个属于自己的小型六足仿生机器人，说实话当看到六足机器人第一次从团身状态下依靠自己的力量站立起来时，我的内心是无比激动的，尽管由于舵机的力矩偏小导致机器人的足体在支撑地面时会有轻微吱吱的抖动，但是得益于十八个关节自由度，六足机器人可以做出很多机器人都无法做出的复杂动作，我想这也许就是多足机器人的魅力所在吧！

不过话说回来，对于机器人初学者来说，制作一个六足机器人的难度相较于轮式机器人还是非常大的，而且投入的时间和资金成本也比较多。如果你的动手能力和技术水平足够强，且跟我一样认为六足机器人非常酷的话，你也可以尝试去做一台属于自己的六足机器人并为它扩展更多有意思的功能（比如我加入了MPU6050和HMC5883L模块来做机器人运动感知与矫正，可惜因时间有限没能实现）。最后我总结一下能成功自制六足机器人所需要的三个关键因素：**1、从始至终发自内心的热爱**；2、拥有机械、电子和软件方面的专业知识；3、为实现最终目标而坚持不懈的努力！

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
