---
title: Hexo博客教程系列（一）：Hexo的安装和配置
date: 2017-03-31 18:45:38
tags:
  - Hexo
  - Blog
categories: Hexo博客教程系列
description: 本篇文章介绍Hexo的安装和基本配置。
feature: /images/feature/hexo.png
toc: true
comments: true
---

## 前言

Hexo的安装和配置内容主要由四个部分组成，它们分别是：

- **Node.js:**
因为Hexo是基于Node.js框架进行开发的，所以Node.js为Hexo提供了必需的运行基础。

- **Git:**
Git是著名的分布式版本控制软件，它可以对博客网站的仓库进行管理和远程部署。

- **GitHub Pages:**
GitHub Pages是面向用户、组织和项目开放的公共静态页面搭建托管服务，博客站点可以被免费托管在GitHub上。

- **Hexo:**
Hexo是一个简洁且强大的博客框架。

<!--more-->

## 安装

### 前提

首先需要安装以下程序：

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com)

### 安装Node.js

#### Windows系统

直接从[Node.js](https://nodejs.org)官网上下载相应（32或64位）的Node.js软件安装包，一路Next即可。

#### Ubuntu系统

安装Node.js的最佳方式是使用nvm。

```sh
$> wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```

执行完命令之后，可使用以下命令来安装最新长期支持版本的Node.js：

```sh
$> nvm install --lts
```

或安装最新稳定版本的Node.js：

```sh
$> nvm install stable
```

### 安装Git

#### Windows系统

直接从[Git](https://git-scm.com)官网上下载相应（32或64位）的软件安装包进行安装。安装时，请勾选**Add to PATH**选项。安装时强烈建议勾选**Git Bash**，**Git Bash**提供了一组Linux风格的Shell环境。在该环境下，你可以直接通过命令行的方式来安装Node.js以及之后的Hexo。因为Hexo的很多操作都涉及命令行的操作，所以**Git Bash**很重要！

#### Ubuntu系统

直接通过命令行来安装

```sh
$> sudo apt-get update
$> sudo apt-get install git-core
```

### 安装Hexo

在国内，npm下载安装包的速度会很慢（除了已翻墙的用户），推荐使用淘宝源或镜像，速度会比较快。

#### 安装Hexo-cli

**方法一：**使用淘宝源来替换官方软件源

```sh
$> npm config set registry https://registry.npm.taobao.org
```

之后跟官方教程一样安装Hexo

```sh
$> npm install -g hexo-cli
```

**方法二：**使用淘宝镜像来替换官方镜像

```sh
$> npm install -g cnpm --registry=https://registry.npm.taobao.org
```

之后就可以使用cnpm命令来安装Hexo了

```sh
$> cnpm install -g hexo-cli
```

{% alert success %}
淘宝NPM镜像是一个完整npmjs.org镜像，你可以用此代替官方版本(只读)，同步频率目前为10分钟 一次，以保证尽量与官方服务同步。
{% endalert %}

因为我本人是一个坚定的**K.I.S.S**(Keep It Simple, Stupid)支持者，崇尚Unix的设计哲学。所以我在安装Hexo时会选择方法一，因为它不需要安装额外的软件，只是修改了用户的配置，比较精简。

#### 初始化Hexo

切换目录到用户桌面

```sh
$> cd ~/Desktop
```

创建空文件夹，名字可以随便取，但最好跟你的博客有关

```sh
$> mkdir xxx_blog
$> cd xxx_blog
```

初始化博客文件夹

```sh
$> hexo init
```

{% alert success %}
Hexo-cli在这个过程中会将landscape主题包以及其所依赖的Hexo软件包都下载下来并以本地安装的方式安装到博客文件夹下的node_modules目录下。关于安装的软件包的详细信息，可以打开博客文件夹下的package.json来查看。
{% endalert %}

安装Hexo默认的依赖和插件

```sh
$> npm install
```

安装Git插件并保存为Hexo的依赖，为部署到GitHub Page做准备

```sh
$> npm install hexo-deployer-git --save
```

## 配置

### 配置Git和GitHub

已配置过**SSH Key**的可以略过本小节。

- 打开Shell软件（Windows下**Git Bash**，Ubuntu下为默认的**Terminal**），依次输入以下命令

  配置全局的用户名和E-mail地址

  ```sh
  $> git config --global user.name "your_name"
  $> git config --global user.email "your_email@xxx.com"
  ```

  根据E-mail地址生成特定的ssh密钥

  ```sh
  $> ssh-keygen -t rsa -C "your_email@xxx.com"
  ```

  **{% alert warning %}
    Windows用户注意：如果生成的.ssh文件夹默认不在C:\Users\xxx下，你可以通过向用户添加HOME环境变量为C:\Users\xxx来解决这个问题。
    {% endalert %}**

- 登录GitHub并点击**Setting**选项。

  ![github_settings](http://media.myyerrol.io/images/github/github_settings.png)

- 使用文本编辑器打开`.ssh`文件夹下的`id_rsa.pub`文件，将里面的内容添加到你的GitHub账户设置中的**SSH Key**中去。

  ![github_ssh_keys](http://media.myyerrol.io/images/github/github_ssh_keys.png)

- 再次打开Shell软件（Windows下**Git Bash**，Ubuntu下为默认的**Terminal**），输入以下命令

  ```sh
  $> ssh -T git@github.com
  ```

  如果Shell软件返回以下信息，就说明Git已经配置好了。

  ```sh
  $> Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
  ```

### 配置GitHub Pages

已配置过**GitHub Page**的可以略过本小节。

- 登录你的GitHub，点击**New repository**。

  ![github_new_repository](http://media.myyerrol.io/images/github/github_new_repository.png)

- 填写仓库的名字和相关描述。

  ![github_create_repository](http://media.myyerrol.io/images/github/github_create_repository.png)

  **{% textcolor danger %}
    在设置界面上填写Repository name时一定要注意，仓库的名字是固定的。即your_name.github.io
    {% endtextcolor %}**

- 点击**Create repository**完成。

### 配置Hexo

以下是生成的`_config.yaml`中的默认内容

```yaml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Hexo
subtitle:
description:
author: John Doe
language:
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type:

```

以下讲解每个参数的含义以及推荐的基本配置

#### 网站

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**title**      |网站标题|Hexo|自由发挥|
|**subtitle**   |网站副标题|x|自由发挥|
|**description**|网站描述|x|自由发挥|
|**author**     |作者的名字|John Doe|英文用户名|
|**language**   |网站的语言|英文|zh-cn或en|
|**timezone**   |网站时区|本电脑时区|不写|


**{% alert warning %}
  修改language参数时一定要注意：要看themes/xxx/languages文件夹下的文件名，根据具体的文件名来填写参数。特别是对于zh-cn和zh-CN这两种写法，Windows和Git默认是不进行区分的，但你在填写参数时一定要区分开来，否则Hexo只会使用默认的英文。
  {% endalert %}**

#### 网址

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**url**               |网址|http://yoursite.com|不改|
|**root**              |网址根目录|/|不改|
|**permalink**         |文章的永久链接|:year/:month/:day/:title/|:lang/:year/:month/:day/:title/|
|**permalink_defaults**|永久链接中的默认值|x|lang: zh-cn|

#### 目录

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**source_dir**  |资源文件夹（存放自己的博客文章）|`source`|不改|
|**public_dir**  |公共文件夹（存放生成的站点文件）|`public`|不改|
|**tag_dir**     |标签文件夹|`tags`|不改|
|**archive_dir** |归档文件夹|`archives`|不改|
|**category_dir**|分类文件夹|`categories`|不改|
|**code_dir**    |代码文件夹|`downloads/code`|不改|
|**i18n_dir**    |国际化文件夹|:lang|不改|
|**skip_render** |跳过指定文件的渲染|x|不写|

#### 文章

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**new_post_name**|新文章的文件名称|:title.md|:lang/:year-:month-:day-:title.md|
|**default_layout**|默认布局|post|不改|
|**titlecase**|标题转换为Title Case模式|false|不改|
|**external_link**|在新标签中打开链接|true|不改|
|**finename_case**|文件名转换为大写或小写|0|不改|
|**render_drafts**|显示草稿|false|不改|
|**post_asset_folder**|启用资源文件夹|false|不改|
|**relative_link**|把链接更改为相对于根目录的地址|false|不改|
|**future**|显示未来的文章|true|不改|
|**highlight**|代码块的设置|...|tab_replace: true|

#### 分类 & 标签

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**default_category**|默认分类|uncategorized|不改|
|**category_map**|分类别名|x|不写|
|**tag_map**|标签别名|x|不写|

#### 日期 & 时间格式

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**date_format**|日期格式|YYYY-MM-DD|不改|
|**time_format**|时间格式|HH:mm:ss|不改|

#### 分页

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**per_page**|每页显示的文章数量|10|不改|
|**pagination_dir**|分页目录|page|不改|

#### 扩展

|参数|描述|默认|推荐|
|-----|-----|-----|-----|
|**theme**|主题|landscape|[主题列表](https://hexo.io/themes/)|

#### 部署

|参数|描述|默认|
|-----|-----|-----|
|**deploy**|部署配置|x|

最后讲一下Hexo**部署**的详细配置过程

修改以下配置

```yaml
deploy:
  type:
```

为

```yaml
deploy:
  type: git
  repo: git@github.com:your_name/your_name.github.io.git
  branch: master
```

{% alert success %}
到此，Hexo的安装和基本配置就全部结束了。如果你按照教程一步一步走到这里没问题的话，那祝贺你，你已经拥有了自己的第一个博客了！当然，如果你在安装和配置Hexo的过程中出现了自己无法解决的问题，你可以在下面的留言板块中提出你的问题，我会尽我所能帮助你解决出现的问题！
{% endalert %}

## 命令

Hexo的命令极简单，安装后只需要记住以下五个常用的即可。**执行命令时，需要Shell处于当前`xxx_blog`文件夹根目录下**。

- 新建一篇文章，默认使用`_config.yaml`中**default_layout**参数指定的布局

  ```bash
  $> hexo new [layout] <title>
  ```

- 生成静态文件

  ```bash
  $> hexo generate
  ```

  或者简写为

  ```bash
  $> hexo g
  ```

- 启动本地调试服务器

  ```bash
  $> hexo server
  ```

  或者简写为

  ```bash
  $> hexo s
  ```

- 部署到远程网站，部署前请确保已经安装Git插件并已经按照上述完成了`_config.yaml`中的相关配置

  ```bash
  $> hexo deploy
  ```

  或者简写为

  ```bash
  $> hexo d
  ```

- 清除缓存文件`db.json`和已生成的静态文件夹`public`

  ```bash
  $> hexo clean
  ```

## 总结

至此，最基本的Hexo博客网站就已经搭建好了，后续就是使用Markdown语法来写文章，最后部署就行了。当然，以上只是Hexo配置和使用的最基本流程，如果你想拥有个性化的博客网站界面以及一些增强功能的话，我会在接下来的文章中详细地介绍Hexo主题的配置方法，它肯定可以让你的博客变得更加酷炫的。

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
