---
title: 自制CPU系列（一）：软件安装与配置
date: 2020-05-05 15:30:00
tags:
  - CPU
  - ModelSim
  - Quartus II
categories: 自制CPU系列
description: 本篇文章介绍如何在Ubuntu系统上安装和配置开发CPU所用的软件。
feature: /images/features/cpu.png
toc: true
comments: true
---

## 前言

我记得自己大三在上《计算机体系结构》课程的时候，曾经独自完成过一个基于MISP指令集的多周期CPU，虽然当时它只能执行大概50多条基本指令且没法像流水线CPU那样可以并行工作，但是当看到自己编写的Verilog模块代码能够通过Modelsim仿真得到正确的波形时，那种成就感是编写普通的软件程序所无法比拟的。也许正是得益于此次经历，让我后来萌发了想要DIY一个完整CPU的想法，不过由于学业和工作上的种种原因，这个想法就被暂时搁置了。

随着近几年RISC-V开源指令集逐渐在学术和工业界得到认可，个人设计CPU已经不再是遥不可及的事情，再加上自己最近被胡振波老师的**《手把手教你设计CPU——RISC-V处理器篇》**这本书中的内容所深深吸引，于是我决定重启**自制CPU项目**。当然，因为我目前只能算是一个初学者，所以如果接下来的文章中有哪些内容写得有误，欢迎各位大佬指正！

<!--more-->

好了言归正传，作为整个《自制CPU系列》专栏的开篇，本篇文章主要介绍如何在Ubuntu系统上安装ModelSim和Quartus II这两款CPU开发利器。**注意：文章中所涉及的软件安装与配置仅在64位的Ubuntu 16.04系统上测试通过，如果你使用的Ubuntu版本大于16.04或者使用的是其他GNU/Linux发行版，则以下部分步骤可能并不适用。**

## 安装

### ModelSim

> Mentor公司的ModelSim是业界最优秀的HDL语言仿真软件，它能提供友好的仿真环境，是业界唯一的单内核支持VHDL和Verilog混合仿真的仿真器。它采用直接优化的编译技术、Tcl/Tk技术、和单一内核仿真技术，编译仿真速度快，编译的代码与平台无关，便于保护IP核，个性化的图形界面和用户接口，为用户加快调错提供强有力的手段，是FPGA/ASIC设计的首选仿真软件。

- #### 安装Java运行环境

  如果已经手动配置过Java运行环境，则请忽略下面的安装命令：

  ```bash
  $> sudo apt update
  $> sudo apt install default-jre
  $> sudo apt install default-jdk
  ```

- #### 安装32位依赖库

  ```bash
  $> sudo dpkg --add-architecture i386
  $> sudo apt install libxext6:i386 libxtst6:i386 libxi6:i386 libstdc++5:i386
  ```

- #### 安装程序文件

  将安装脚本赋予755可执行权限，然后以管理员权限运行。

  ```bash
  $> mkdir ~/Softwares
  $> cp -r ~/Downloads/modelsim_se_10.2c ~/Softwares
  $> cd ~/Softwares/modelsim_se_10.2c
  $> sudo chmod 755 install.linux
  $> sudo ./install.linux
  ```

  ![modelsim_1](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_1.png)

  点击窗口中的【Install Products】选项。

  ![modelsim_2](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_2.png)

  选择安装目录为【/opt/modelsim】，并点击【Next】按钮。

  ![modelsim_3](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_3.png)

  勾选【10.2c】目录前面的多选框以安装全部内容，并点击【Next】按钮。

  ![modelsim_4](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_4.png)

  点击【Agree】按钮。

  ![modelsim_5](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_5.png)

  点击【Install】按钮进行安装。

  ![modelsim_6](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_6.png)

  点击【Done】按钮关闭安装程序。

- #### 破解程序文件

  > 注意：将Windows下破解ModelSim时所生成的【license.txt】文件复制到GNU/Linux系统的相应目录下或先将  其重命名为【license.dat】后再作为ModelSim软件的许可证文件，经过测试都是不可以的；此外，不同版本的许可  证文件也可能⽆法通⽤，⽤这些存在问题的许可证文件运⾏vsim时，基本都会提⽰当前软件⽆显⽰图形界⾯权限。

  以上内容大意来源于简书作者**锦穗**的《Quartus/Modelsim Linux搭建笔记v0.1》这篇文章。关于锦大神提到  的在Windows下生成的ModelSim许可证文件在GNU/Linux系统下无效的问题，这个本人没有实际测试过，不过既然作  者如此坚持，为保险起见，我最终也采用了作者提出的曲线救国方法，即先在Ubuntu下安装Wine，然后再用其调用破  解工具直接生成许可证文件。Wine官方推荐的安装步骤如下：

  ```bash
  $> wget -nc https://dl.winehq.org/wine-builds/winehq.key
  $> sudo apt-key add winehq.key
  $> sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'
  $> sudo apt install --install-recommends winehq-stable
  ```

  在成功安装Wine之后，需要在第一次使用之前使用下面的命令初始化wine配置文件，并将其添加到root用户组里，以便接下来我们能够以管理员权限运行ModelSim的破解工具。

  ```bash
  $> winecfg
  $> sudo chown root:root -R ~/.wine
  ```

  > 注意：在运行下述的wine命令时，不要在电脑usb口上插外置的usb网卡，如果是笔记本电脑，最好把外设都给拔掉。

  ```bash
  $> cd /opt/modelsim/modeltech/linux_x86_64/
  $> sudo cp ~/Softwares/modelsim_se_10.2c/.../MentorKG.exe ./
  $> sudo wine MentorKG.exe -patch .
  ```

  如果终端没有报错的话，系统会弹出下图所示的文本编辑器窗口。

  ![modelsim_7](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_7.png)

  点击文本编辑器工具栏【File】下的【Save As】选项。

  ![modelsim_8](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_8.png)

  在弹出的文本保存窗口中，手动将文件名称修改为【license.dat】，并选择文件编码格式为【Unicode(UTF-8)】，最后点击【Save】按钮即可将生成的许可证文件保存到系统本地（推荐放到【~/Documents/License/modelsim】目录下）。

  最后，将破解补丁文件拷贝到ModelSim的安装目录下，并在赋予755可执行权限之后，使用管理员权限调用patch_calibre2011_linux脚本文件执行破解。

  ```bash
  $> cd /opt/modelsim
  $> sudo cp ~/Softwares/modelsim_se_10.2c/.../patch_calibre2011_linux ./
  $> sudo cp ~/Softwares/modelsim_se_10.2c/.../sfk ./
  $> sudo chmod 755 patch_calibre2011_linux sfk
  $> sudo ./patch_calibre2011_linux
  ```

  如果终端里只出现类似下面的错误，则表明破解补丁已经成功被打入到软件中。

  ```bash
  $> error: failed to read+write: sfk - skipping
  ```

  如果终端中出现多于1个错误（出现概率比较小），则很可能是因为wine或之前其他不恰当的操作导致ModelSim安装目录下的某些文件被损坏，此时只需重装ModelSim软件并再次执行上述打补丁命令即可。

- #### 设置环境变量

  使用文本编辑器打开【~/.bashrc】或【~/.zshrc】，并在文件末尾添加以下几行内容：

  ```bash
  # Modelsim
  export PATH=/opt/modelsim/modeltech/linux:$PATH
  export LM_LICENSE_FILE=$HOME/Documents/License/modelsim/license.dat
  ```

  **备注：在锦大神的教程中，ModelSim可执行程序的环境变量设置的是64位目录（即【/opt/modelsim/modeltech/linux_x86_64 】），但是我设置成这个后，终端总是提示无法读取许可证文件，使用【lmutil lmdiag】命令也显示正常，最后我修改为上述的32位目录就好了，至于原因目前还不清楚。**

- #### 修改网卡名称

  **注意：这一步是破解ModelSim的关键，因为Ubuntu系统从16.04开始网卡名称的命名出现了较大的变化（如有线网卡从【eth0】变为了【enp2s0】），所以为了让ModelSim和下面将会讲到Quartus II软件能够正确读取系统的NIC ID，需要用户手动修改网卡名称，具体步骤如下：**

  首先备份【/etc/default/grub】文件，然后以管理员权限打开它。

  ```bash
  $> sudo cp /etc/default/grub /etc/default/grub.bak
  $> sudo vim /etc/default/grub
  ```

  在文件中找到【GRUB_CMDLINE_LINUX】配置项，并将其修改为：

  ```plain
  ...
  GRUB_CMDLINE_LINUX="net.ifnames=0 biosdevname=0"
  ...
  ```

  最后执行命令更新grub引导文件，并重启系统即可完成所有的破解工作。

  ```bash
  $> sudo grub-mkconfig -o /boot/grub/grub.cfg
  $> sudo reboot
  ```

- #### 启动软件程序

  在终端中输入以下命令即可正常启动ModelSim。

  ```bash
  $> vsim
  ```

  ![modelsim_9](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/modelsim/modelsim_9.png)

### Quartus II

> Quartus II 是Altera公司的综合性CPLD/FPGA开发软件，原理图、VHDL、VerilogHDL以及AHDL（Altera Hardware 支持Description Language）等多种设计输入形式，内嵌自有的综合器以及仿真器，可以完成从设计输入到硬件配置的完整PLD设计流程。Quartus II可以在Windows、Linux以及Unix上使用，除了可以使用Tcl脚本完成设计流程外，提供了完善的用户图形界面设计方式。具有运行速度快，界面统一，功能集中，易学易用等特点。

- #### 安装程序文件

  在终端中挂载Quartus的镜像安装文件，然后以管理员权限执行安装脚本。

  ```bash
  $> cd ~/Downloads
  $> sudo mkdir /media/quartus
  $> sudo mount -o loop Quartus-13.0.1.232-linux.iso /media/quartus
  $> sudo /media/quartus/setup.sh
  ```

  ![quartusii_1](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_1.png)

  点击【Next】按钮。

  ![quartusii_2](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_2.png)

  选择【I accept the agreement】选项，然后点击【Next】按钮。

  ![quartusii_3](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_3.png)

  选择安装目录为【/opt/altera/13.0sp1】，并点击【Next】按钮。

  ![quartusii_4](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_4.png)

  使用默认的选项即可，点击【Next】按钮。

  ![quartusii_5](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_5.png)

  使用默认的选项即可，点击【Next】按钮。

  ![quartusii_6](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_6.png)

  点击【Next】按钮。

  ![quartusii_7](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_7.png)

  如下图所示，安装程序会自动在桌面生成64位软件的快捷方式，至此Quartus II的主程序文件就全部安装完毕了。

  ![quartusii_8](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_8.png)

- #### 安装设备文件

  同理，在终端中挂载Quartus的镜像设备文件，然后以管理员权限执行安装脚本。

  ```bash
  $> cd ~/Downloads
  $> sudo mount -o loop Quartus-13.0.1.232-devices-1.iso /media/quartus
  $> sudo /media/quartus/components/DeviceInstall-13.0.1.232.run
  ```

  ![quartusii_9](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_9.png)

  点击【Next】按钮。

  ![quartusii_10](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_10.png)

  选择安装目录为【/opt/altera/13.0sp1】，并点击【Next】按钮。

  ![quartusii_11](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_11.png)

  选择自己开发所需的设备，然后点击【Next】按钮。

  ![quartusii_12](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_12.png)

  点击【Next】按钮。

  ![quartusii_13](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_13.png)

  点击【Finish】按钮关闭安装程序。

- #### 破解程序文件

  将压缩包内的破解补丁替换到软件安装目录下的两个同名文件夹中。

  ```bash
  $> cd ~/Softwares/Crack_QII_13.0_SP1_Linux
  $> sudo cp linux/libsys_cpt.so /opt/altera/13.0sp1/quartus/linux
  $> sudo cp linux64/libsys_cpt.so /opt/altera/13.0sp1/quartus/linux64
  ```

  使用Wine执行Windows下的破解工具（忽略开始阶段需要选择破解补丁这一步），并将生成的【license.dat】文件保存到系统本地，最后将文件中的【XXXXXXXXXXXX】用自己电脑的有线网卡号替换即可。

  ```bash
  $> cd ~/Softwares/Crack_QII_13.0_SP1_Windows
  $> sudo wine Quartus_13.0_SP1_x64破解器.exe
  ```

  双击桌面的Quartus II图标启动软件，此时软件会弹出许可证提醒窗口。

  ![quartusii_14](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_14.png)

  点击【OK】按钮。

  ![quartusii_15](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_15.png)

  选择之前修改过的【license.dat】文件，点击【Open】按钮。

  ![quartusii_16](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_16.png)

  窗口出现以上内容，则表明软件破解成功。

- #### 设置环境变量

  使用文本编辑器打开【~/.bashrc】或【~/.zshrc】，并在文件末尾添加以下几行内容：

  ```bash
  # Quartus II
  export PATH=/opt/altera/13.0sp1/quartus/bin:$PATH
  export LM_LICENSE_FILE=$HOME/Documents/License/quartus/license.dat:$LM_LICENSE_FILE
  ```

- #### 启动软件程序

  启动32位Quartus II。

  ```bash
  $> quartus
  ```

  启动64位Quartus II。

  ```bash
  $> quartus --64bit
  ```

  ![quartusii_17](https://media.myyerrol.io/images/diy_cpu/1_software_install_config/quartusii/quartusii_17.png)

  **备注：一般情况下，双击快捷方式图标就能正常启动Quartus II，可是我每次这样启动时，软件总是提示我要重新选择许可证文件，而使用上述从终端启动的方法就没有问题，至于原因目前还不清楚。**

### 配置

- #### USB Blaster

  首先将UBS Blaster下载器插到电脑上，然后在终端中输入【lsusb】，此时终端中返回的内容应该包含以下类似信息：

  ```plain
  Bus 001 Device 051: ID 09fb:6001 Altera Blaster
  ```

  然后切换到设备目录下并创建一个规则文件。

  ```bash
  $> cd /etc/udev/rules.d
  $> sudo vim 80-usbblaster.rules
  ```

  在上述新建的规则文件中写入以下内容：

  ```plain
  ATTRS{idVendor}=="09fb", ATTRS{idProduct}=="6001", MODE="666"
  ```

  最后重新插线并在终端中输入以下内容：

  ```bash
  # 下面命令中的【001】和【051】分别对应于上述返回信息中的【Bus 001 Device 051】
  $> ls -l /dev/bus/usb/001/051
  ```

  如果系统返回的目录权限为【crw-rw-rw-】，则表明USB Blaster设置成功。

## 参考

- [Quartus/Modelsim Linux搭建笔记v0.1](https://www.jianshu.com/p/ad131936a6c4)
- [64位ubuntu15.04安装quartus ii 15.0 - FPGA/CPLD - 电子工程世界-论坛](http://bbs.eeworld.com.cn/thread-475336-1-1.html)
- [ubuntu14.04 64bit 安装 && 破解quartus13.0 记录](https://blog.csdn.net/xforce_zuoxiang/article/details/24530329)
- [ubuntu 14.04 安装 Quartus II 13.1 过程](https://www.cnblogs.com/tracyone/p/3604090.html)
- [ubuntu16.04修改网卡名称enp2s0为eth0_运维_wenwenxiong的专栏-CSDN博客](https://blog.csdn.net/wenwenxiong/article/details/52937539)

## 总结

其实在我动手开始安装和配置ModelSim和Quartus II软件之前，就曾在网上搜索过一些类似的教程，不过其中大部分讲的都是如何在Windows下实现软件的完美安装，而有关GNU/Linux的则寥寥无几，就算是有，其教程内容也都比较老旧，如果不经过修改是无法使用的，所以为了满足嵌入式方向的研究者或爱好者们能够在GNU/Linux系统下顺利地安装和使用ModelSim和Quartus II这两款软件，我把自己安装和配置软件的方法总结下来，希望大家喜欢。

最后借着这个《自制CPU系列》开篇的机会，我决定给自己的**自制CPU项目**设定几个需要达成的目标，一方面是想以此来鞭策自己，确保这个项目不会烂尾（毕竟像设计CPU这种涉及底层且难度较大的任务，没有Push可能坚持不下来），另一方面也算是实现自己的人生价值吧。目标具体如下：**首先通过学习RISC-V的指令架构和编译语法，独自完成一个简单的RISC-V软核IP；其次是将学习和开发过程中所遇到的问题和经验都总结下来以供其他人参考使用；最后是想设计一套完全由中国人主导的开源RISC指令集，并努力让它能够像其前辈RISC-V一样得到全世界学术界和工业界的认可！**
