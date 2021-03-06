---
title: Breeze微型四轴系列（六）：软件开发总结
date: 2018-02-01 20:00:00
tags:
  - Micro Quadcopter
  - STM32
  - GCS
  - Qt
categories: Breeze微型四轴系列
description: 本篇文章介绍Breeze微型四轴飞行器软件开发的相关内容。
feature: /images/features/breeze.png
toc: true
comments: true
---

## 前言

一款出色的四轴飞行器除了要有设计严谨的硬件、稳定可靠的飞控之外，还需要具有图形界面的上位机以及可扩展软件接口才行。毕竟对于那些基于四轴飞行器平台进行深入研究（比如视觉SLAM、视觉避障、室内自主悬停等）的学者来说，带有各种参数仪表盘和数据曲线显示功能的地面控制站可直观地显示出当前四轴飞行器在空中的运动姿态和相关传感器数据等信息，便于算法调试。此外，四轴飞控所集成的软件接口API也能够加快上层应用的开发速度，提高其与其他开源框架（ROS、OpenCV、PCL、TensorFlow等）的集成和交互能力。

因此，本篇文章会以Breeze微型四轴飞行器为例来简要介绍目前国内外几个比较成熟的四轴飞行器地面控制站（GCS）软件以及软件接口协议，欢迎各位前来阅读。

<!--more-->

## 内容

### 地面控制站

- #### Breeze远程控制站

  如下图所示，Breeze远程控制站是我在Windows操作系统下使用Qt5进行编写的，代码里面主要调用了Qt官方的串口库和摄像头驱动库。它实现的功能比较简单，主要包含以下两个功能，其中第一个功能是该远程控制站软件可通过我们自定义的串口通信协议实时获取Breeze微型四轴飞行器当前的飞行姿态数据并显示在接收窗口内，另一个功能则是能够根据当前键盘上被按下的按键来发送对应的控制命令给四轴飞行器，从而完成操作者对Breeze微型四轴飞行器的远程控制。

  ![breeze_remote_control_1](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_remote_control_1.png)

  以下图片展示了Breeze远程控制站所集成的实时视频流采集功能。摄像头安装在四轴飞行器的顶部，可通过2.4GHz无线图传与PC相连完成实时图像的传输，不过由于时间的缘故，我们目前只实现了图像数据的采集，而图像检测和识别等有关机器视觉方面的高级功能暂时还未完成。最后，Breeze远程控制站的代码可以点击[这里](https://github.com/microdynamics-quadcopter/breeze_remote_control)获得。

  ![breeze_remote_control_2](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_remote_control_2.png)

- #### Breeze飞行控制站

  Breeze飞行控制站是我根据西工大布树辉老师在GitHub上开源的[Qt飞行仪表盘插件](https://github.com/bushuhui/qFlightInstruments)和西工大舞蹈机器人基地马文科学长所创立[HandsFree项目](https://github.com/HANDS-FREE)中HFLink代码的基础上进行重构开发而来。该软件外部的图形界面使用了目前Ubuntu下最流行和强大的Qt5框架，而内部则采用自定义的CommLink通信协议库实现Breeze和PC之间双向的数据传输。当然，依然受限于时间等客观因素，Breeze飞行控制站和上面介绍过的远程控制站一样目前只是一个Demo，很多功能还未实现，还需未来继续改进。

  如下图所示，Breeze飞行控制站的界面主要分为**飞行指示器**、**飞行状态**和**飞行数据**共三个区域，其中**飞行指示器**区域通过三个仪表盘分别显示Breeze微型四轴飞行器实时的飞行姿态、海拔高度和磁场方向等数据，左下角的**飞行状态**区域用于显示四轴飞行器当前的推力值、四个电机的转速值以及电池电量值等，而右下角的**飞行数据**区域则以浮点数的形式展现**飞行指示器**和**飞行状态**中的数值，使数据大小的显示更为直观。最后，Breeze飞行控制站的代码可以点击[这里](https://github.com/microdynamics-quadcopter/breeze_flight_control_station)获得。

  ![breeze_flight_control_station](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_flight_control_station.png)

  **注意：由于后期自己对Breeze飞行控制站进行了重构，所以请以下方新版软件界面为准！**

  ![breeze_fcs_1_flight_status](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_fcs_1_flight_status.png)

  ![breeze_fcs_2_serial_console](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_fcs_2_serial_console.png)

  ![breeze_fcs_3_data_plotter](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_fcs_3_data_plotter.png)

  ![breeze_fcs_7_program_settings](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_fcs_7_program_settings.png)

- #### 匿名科创地面站

  匿名地面站就是针对飞控学习者、开发者设计开发的一个专用软件，由匿名科创团队（ANO TC）独立编写，软件性能优异，界面友好。通过多年的改进，已经成为调试飞控必不可少的软件之一。软件主要功能有：

  - **用户自定义数据分析功能**：既然是面对开发者设计的上位机，飞控那些固定的数据肯定是不够用的，开发者可能需要观察各种数据的波形，进行分析，匿名地面站可以让用户自定义一帧数据的格式，并对该帧数据进行解析，获得用户设置好的各种数据，并可以分别绘制波形。

  - **高速波形绘制功能**：可以将飞控的各种参数，实时发送至上位机（地面站），并且实时绘制多达20个数据的波形，数据更新频率可达1000hz以上，这将大大方便对例如滤波算法的调试，可以实时将传感器原始数据、滤波后数据发送至上位机，绘制各自的波形，进行比较，以便对滤波算法进行调整。

  - **飞控状态显示功能**：可以通过3D模型、地平仪、各项参数通道值等方式，实时显示飞控的状态。

  - **飞控参数设置功能**：上位机提供多达18组PID数据的读取与写入功能，开发者都可以自由使用，方便进行各项参数的设置、调节，并且通信采用返回验证逻辑，保证飞控接收到的参数是准确的。

  - **数据的EXCEL写入功能**：上位机支持将多种数据，实时写入到Excel文件，方便开发者使用Matlab等软件进行数据分析。

    。。。

  ![anotc_gcs_1](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_1.png)

  ![anotc_gcs_2](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_2.png)

  ![anotc_gcs_3](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_3.png)

  ![anotc_gcs_4](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_4.png)

  ![anotc_gcs_5](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_5.png)

  ![anotc_gcs_6](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_6.png)

  ![anotc_gcs_7](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_7.png)

  ![anotc_gcs_8](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/anotc_gcs_8.png)

- #### Mission Planner

  Mission Planner是ArduPilot开源项目的全功能地面站软件，它支持固定翼飞行器、旋翼飞行器和地面车，由于软件基于C#和.Net环境进行开发，所以仅支持Windows操作系统。Mission Planner可以给全自主移动机器提供强大的配置工具和动力学控制能力。

  Mission Planner软件的主要功能有：为控制板提供固件加载；设定、配置及调整机器到最优性能；通过在地图上用鼠标点击相应位置来规划，保存及加载自动任务给控制板；下载及分析由控制板创建的任务记录；与PC飞行模拟器连接，提供完整硬件闭环的UAV模拟器；通过合适的遥控器来监控飞行器状态、记录遥控数据、分析遥控记录以及可在FPV（第一人称视角）模式下控制你的机器。

  ![mission_planner_1](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/mission_planner_1.jpg)

  ![mission_planner_2](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/mission_planner_2.jpg)

- #### Crazyfile地面站

  Crazyflie地面站是BitCraze团队专门为Crazyflie微型四轴飞行器所打造的桌面PC客户端 ，它支持Windows、GNU/Linux和Mac系统（具体安装方法请点击[这里](https://github.com/bitcraze/crazyflie-clients-python/blob/develop/README.md)查看），可实现四轴飞行器的远程控制、烧写固件、设置参数并记录数据等功能。Crazyflie地面站与四轴飞行器之间的数据通信以及用于控制四轴飞行器的CRTP协议的实现均基于[Crazyflie Lib Python](https://github.com/bitcraze/crazyflie-lib-python)项目所完成。最后，有关于更多内容请访问Crazyflie地面站的[官方Wiki](https://wiki.bitcraze.io/doc:crazyflie:client:pycfclient:index)。

  ![crazyflie_gcs_1](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/crazyflie_gcs_1.png)

  ![crazyflie_gcs_2](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/crazyflie_gcs_2.png)

### 软件接口协议

通信协议是指双方实体完成通信或服务所必须遵循的规则和约定。通过通信信道和设备互连起来的多个不同地理位置的数据通信系统，要使其能协同工作实现信息交换和资源共享，它们之间必须具有共同的语言。交流什么、怎样交流及何时交流，都必须遵循某种互相都能接受的规则。这个规则就是通信协议。

通信协议本身是不依赖硬件接口本身的，它只是一个串行化和解串行化的规则,即根据某个通信协议可以实现很多不同的通信方式。

- #### CommLink

  CommLink是Breeze微型四轴飞行器所采用的数据通信协议栈，此协议栈内有采用USART（基于 CP2102 转串口芯片）和SPI（基于NRF24L01射频模块）两套接口实现的通信协议。如下图所示，其中USART通信协议主要负责将四轴飞行器自身的实时飞行姿态数据发送给远程PC端的地面站，而SPI通信协议则负责解析远程遥控端发送的控制指令。

  ![breeze_communication_link](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/breeze_communication_link.png)

- #### MAVLink

  ![mavlink_protocal](https://media.myyerrol.io/images/breeze_quadcopter/6_software_summary/mavlink_protocal.png)

  MAVLink协议最早由苏黎世联邦理工学院计算机视觉与几何实验组的Lorenz Meier于2009年创建，并以LGPL开源协议形式进行发布。MAVLink协议是在串口通讯基础上的一种更高层的开源通讯协议，广泛应用于地面站软件与小型无人载具之间的通讯，同时也应用在载具内部子系统的通信中。MAVLink协议是以消息库的形式来定义参数传输的规则，具体协议的内容可点击[这里](http://mavlink.org/messages/common)查看。

## 总结

### 项目

- #### 完成

  本次项目开发从软硬件两方面共同完成了第一代Breeze微型四轴飞行器系统的搭建工作，初步实现了四轴飞行器的简单受控飞行。在整个系统开发的过程中主要完成了Breeze微型四轴飞行器的硬件电路设计、嵌入式程序开发以及上层软件编写和调试等工作内容。

- #### 改进

  由于四轴飞行器所涉及的技术面较广、本人水平有限以及受到研究经费、试验条件等客观因素的影响，本次项目开发对四轴飞行器飞控系统的研究还不够深入，仍存在以下问题，需要在今后的研究中不断学习和优化：

  1. 由于时间和经费的原因，目前Breeze微型四轴飞行器的硬件电路设计还不够封装化和模块化，而且一些电路设计得比较复杂，不利于后期的进一步维护和改进。

  2. 本次项目开发使用C语言来编写嵌入式代码，但由于C语言是面向过程的高级语言，它对源码的封装性远不如基于面向对象思想的C++。此外，目前Breeze微型四轴飞行器的通信协议设计得比较冗余，而且功能也比较有限。

  3. 本次项目开发对飞控算法的研究并未深入，只是研究了目前比较流行的Mahony互补滤波算法并在Breeze微型四轴飞行器上测试了其效果。

  4. 本次项目开发未涉及ROS（Robot Operating System，即机器人操作系统）方面的内容。不过由于ROS目前已经成为机器人软件开发的事实标准，将来我们也会尝试基于ROS来搭建整个四轴飞行器的上层软件架构。

### 个人

- #### 感受

  在本次项目开发的过程中，困扰我比较大的就是硬件电路的设计工作。因为我之前没有系统地学习过如何绘制PCB板，所以在开发的前期阶段，我不得不花很多时间来学习如何使用Altium Designer软件，而且由于缺乏硬件设计的相关经验，我的前几次元器件布局很不合理，这直接导致了后来在进行布线的时候，PCB板出现过孔数量的过多和乃至无法布通的情况。后来在经历了痛苦的重新布局、布线并解决了很多违反规则的问题之后，硬件电路终于被我成功地设计了出来，不过最后令人遗憾的是我没能完成对PCB板的焊接。因为本项目的硬件设计中使用了几个QFN封装形式的IC芯片，而IC芯片普遍对焊接时的温度要求比较高，而且最关键的是这些芯片的焊盘全都被放置在了黑色塑料壳体的下面而没有伸出来，这就导致了在焊接IC的过程中很容易发生短焊或虚焊的情况。虽然我尽可能地提高自己的焊接水平，但依然还是有很多块PCB板和价格不菲的IC芯片被我焊坏了，最后迫于开发进度的安排，我只能放弃焊接而使用我之前学习飞控时用到的成品四轴飞行器。尽管本次我没能完成硬件的制作，但我却收获了别人没有的宝贵经验，我相信学习总要有一个交学费的过程，希望这次经历可以让我在未来的开发过程中做得更好。

  总之，经历了本次项目开发，我对四轴飞行器的整体系统构成以及各模块之间的相互关系有了一个更加深刻的理解，同时在开发的过程中，我学到了很多专业领域的知识，也认识到了自身的不足之处。最后，我通过GitHub开源了目前的所有设计成果，希望能让更多的人能有机会亲身参与到四轴飞行器的开发过程中来，并能乐享其中。

- #### 致谢

  感谢与我一同创立了MicroDynamics团队以及Breeze微型四轴飞行器项目的队友maksyuki，这个项目的想法是他最先提出来的。感谢他前期对嵌入式开发以及飞控算法的基础性研究，让我可以有充裕的时间来设计并焊接四轴飞行器的硬件电路部分。

  感谢西北工业大学舞蹈机器人基地为我创造了一个良好的开发环境，让我可以自由地使用元器件和工具来完成四轴飞行器的焊接、安装和调试工作。感谢马文科学长在硬件电路设计和飞控算法上给我提供的帮助，同时也要感谢他所创立的HandsFree开源机器人软硬件项目为本次项目开发提供的技术支持。

  感谢Crazepony和Crazyflie这两个开源四轴飞行器项目，感谢它们无私提供的硬件电路设计和嵌入式代码对本次项目开发的帮助。

  感谢本次项目开发中所使用的一切开源软硬件工具以及它们的创造者，没有这些工具的存在，我的这个项目也就不能实现。

  再次感谢西北工业大学舞蹈机器人基地及其全体成员，感谢他们创造了一个自由且充满激情的世界，让我可以在有限的基地时光中学到很多不同领域的知识，并为我之后的研究学习打下了坚实的基础。
