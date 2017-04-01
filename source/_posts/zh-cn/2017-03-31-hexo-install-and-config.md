---
title: Hexo教程系列（二）：安装和配置
date: 2017-03-31 18:45:38
tags:
  - Hexo
  - Blog
categories: Hexo
description: 本篇主要介绍Hexo如何安装和配置。
feature:
toc: true
comments: true
---

## 安装

### 前提

首先需要安装以下程序：

- [Node.js](https://nodejs.org)
- [Git](https://git-scm.com)

### 安装Node.js

- #### Windows系统

  直接从[Node.js](https://nodejs.org)官网上下载相应（32或64位）的Node.js软件安装包，一路Next即可。

- #### Ubuntu系统
  
  安装Node.js的最佳方式是使用nvm。

  ```bash
  $> wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
  ```

  安装完之后，使用以下命令来安装Node.js

  ```bash
  $> nvm install stable
  ```

### 安装Git

- #### Windows系统

  直接从[Git](https://git-scm.com)官网上下载相应（32或64位）的软件安装包进行安装。安装时，请勾选**Add to PATH**选项。安装时强烈建议勾选**Git Bash**，**Git Bash**提供了一组Linux风格的Shell环境。在该环境下，你可以直接通过命令行的方式来安装Node.js以及之后的Hexo。因为Hexo的很多操作都涉及命令行的操作，所以**Git Bash**很重要！


- #### Ubuntu系统

  直接通过命令行来安装

  ```bash
  $> sudo apt-get update
  $> sudo apt-get install git-core
  ```

### 安装Hexo

因为在国内，npm下载安装包的速度会很慢（除了已翻墙的用户），推荐将官方软件源修改为淘宝源，速度会比较快。

```bash
npm config set registry https://registry.npm.taobao.org
```

## 配置

### 配置Git和GitHub

已配置过**SSH Key**的可以略过本小节。

- 打开Shell软件（Windows下**Git Bash**，Ubuntu下为默认的**Terminal**），依次输入以下命令

  配置全局的用户名和E-mail地址

  ```bash
  $> git config --global user.name "your_name"
  $> git config --global user.email "your_email@xxx.com"
  ```

  根据E-mail地址生成特定的ssh密钥

  ```bash
  $> ssh-keygen -t rsa -c "your_email@xxx.com"
  ```

  **Windows用户注意：如果生成的`.ssh`文件夹默认不在`C:\Users\xxx`下，你可以通过向用户添加HOME环境变量为`C:\Users\xxx`来解决这个问题。**

- 使用文本编辑器打开`.ssh`文件夹下的`id_rsa.pub`文件，将里面的内容添加到你的GitHub账户设置中的**SSH Key**中去。

- 再次打开Shell软件（Windows下**Git Bash**，Ubuntu下为默认的**Terminal**），输入以下命令

  ```bash
  $> ssh -T git@github.com
  ```

  如果Shell软件返回以下信息，就说明Git已经配置好了。

  ```bash
  $> Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
  ```

### 配置GitHub Page

已配置过**GitHub Page**的可以略过本小节。

- 登录你的GitHub，点击**New repository**。

- 填写仓库的名字和相关描述。

  **{% textcolor danger %}
    在设置界面上填写Repository name时一定要注意，仓库的名字是固定的。即your_name.github.io
    {% endtextcolor %}**

- 点击**Create repository**完成。
