---
title: Hexo教程系列（三）：主题的配置
date: 2017-06-07 10:44:37
tags:
  - Hexo
  - Blog
categories: Hexo
description: 本篇文章介绍Hexo主题的配置。
feature: images/hexo/hexo.png
toc: true
comments: true
---

## 前言

我之前在选择自己博客网站主题的时候曾浏览过[Hexo主题](https://hexo.io/themes/)网站，发现Hexo官方提供了不少各具特色的主题。后来为了进一步确定到底使用哪个主题，我又仔细地参考了知乎上有关[Hexo主题推荐](https://www.zhihu.com/question/24422335)的文章。总之，在一段长时间的纠结和考虑之后，我最终决定放弃参考别人的想法而是遵循自己内心的感觉，选择了一个叫Freemind的主题。

Freemind主题虽然不是Hexo里面排名前十或在推荐里面出现次数较多的主题，但它的那种简约而又专业的风格令我十分喜欢。接下来，我会简要地介绍Freemind主题的特点和安装步骤，并重点地讲解它的配置方法。当然了，Hexo主题的配置基本上大同小异，只要学会了其中一种主题的配置方法，其他的就可以触类旁通了。

<!--more-->

## 特点

Freemind主题是由Joe所编写的，它拥有以下几个特点：

### 双列布局

使用最传统和舒适的博客布局。

### 标签插件

基于[hexo-tag-bootstrap](https://github.com/wzpan/hexo-tag-bootstrap)编写了功能丰富的标签插件，可以最大程度地发挥Bootstrap的能力。其中包括：

- 可以插入一段带有特殊颜色标记的文本。
- 可以插入一个按钮，并为其指定超链接、文本和颜色。
- 可以插入一个标签，并为其指定文本和形式。
- 可以插入一个徽章，并为其指定文本。
- 可以插入一段文本信息，并为其指定不同的样式。

### 主题颜色

Freemind主题内置了十几种颜色，可以通过配置进行修改。

### 本地搜索

基于[hexo-generator-search](https://github.com/paichyperiondev/hexo-generator-search)实现了一个支持实时预览的本地搜索引擎。

## 安装

### 安装Freemind主题

```sh
$> cd your_blog
$> git clone https://github.com/wzpan/hexo-theme-freemind.git themes/freemind
```

### 安装[hexo-tag-bootstrap](https://github.com/wzpan/hexo-tag-bootstrap)插件

```sh
$> npm install hexo-tag-bootstrap --save
```

### 安装[hexo-generator-search](https://github.com/paichyperiondev/hexo-generator-search)插件

```sh
$> npm install hexo-generator-search --save
```

## 目录

### Hexo目录

```sh
|__ .deploy_git/
|__ .git/
|__ .gitignore
|__ _config.yaml
|__ LICENSE
|__ node_modules/
|__ package.json
|__ public/
|__ README.md
|__ scaffolds
|   |__ draft.md
|   |__ freemind.md
|   |__ page.md
|   |__ post.md
|__ setup.sh
|__ source
|   |__ _posts/
|   |__ about/
|   |__ categories/
|   |__ images/
|   |__ tags/
|__ themes
|   |__ freemind/
|   |__ landscape/
```

- **.deploy_git(不被Git管理):**
存放远程博客网站的全部内容。

- **.git(不被Git管理):**
Git的核心功能目录。

- **.gitignore:**
Git的忽略文件，用于忽略某些文件的版本管理。

- **_config.yaml:**
博客网站的配置文件，里面包含了配置过程中的大部分参数。

- **db.json(不被Git管理):**
在博客网站的中间数据库文件。

- **LICENSE:**
仓库使用的开源版本协议。

- **node_modules:**
博客网站开发所需要或依赖的Node.js模块。

- **package.json:**
记录Hexo以及各种插件版本信息的文件。

- **public(不被Git管理):**
存放生成的博客网站的全部内容。

- **README.md:**
仓库的使用介绍。

- **scaffolds:**
模板文件夹，用来创建不同风格的文章。

- **setup.sh:**
安装Hexo插件的脚本文件。

- **source:**
存放用户资源的文件夹，里面一般文章和图片等。

- **themes:**
主题文件夹，Hexo会根据主题来生成相应的静态博客网站。

### Freemind目录

```sh
|__ .gitignore
|__ _config.yaml
|__ languages/
|__ layout/
|__ LICENSE
|__ README.md
|__ source/
```

- **.gitignore:**
Git的忽略文件，用于忽略某些文件的版本管理。

- **_config.yaml:**
主题的配置文件，里面包含了配置过程中的大部分参数。

- **languages:**
主题的语言文件夹。

- **layout:**
主题的页面布局文件夹。

- **LICENSE:**
主题使用的开源版本协议。

- **README.md:**
主题的使用介绍。

- **source:**
主题的核心功能文件夹。

## 启用

```yaml
theme: freemind
```

修改Hexo根目录下`_config.yaml`文件中的theme选项为freemind来启用该主题。

## 配置

### 页面

Freemind预先已经定义了**分类**、**标签**和**关于**页面的排版和布局，但是要想让它们显示出来，就需要自己手动在博客网站的`source`目录中添加相应的页面。

例如，为了能让**分类**页面可以在鼠标点击之后显示出来，你需要在`source/categories/`目录下创建一个`index.md`文件，其中的内容如下：

```md
---
title: 分类
layout: categories
---
```

**标签**页面的内容与上面类似，具体内容如下：

```md
---
title: 标签
layout: tags
---
```

最后**关于**页面中的内容如下：

```md
---
title: 关于
layout: page
---
```

{% alert success %}
为了能使用Markdown语法来对关于页面中的内容进行编写，我将原本官方教程中需要创建的index.html文件修改为了index.md，经过测试，两者显示效果相同。
{% endalert %}

### 配置

#### Hexo配置

我的Hexo配置文件（`_config.yaml`）内容如下：

```yaml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Home | myyerrol's blog
subtitle: Home | myyerrol's blog
description: "This is my personal website, which uses the hexo system to build. Enter the following URL to access: https://myyerrol.github.io"
author: myyerrol
language: zh-cn
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com
root: /
permalink: :lang/:year/:month/:day/:title/
permalink_defaults:
  lang: zh-cn

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
new_post_name: :lang/:year-:month-:day-:title.md # File name of new posts
default_layout: freemind
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
  tab_replace: true

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
theme: freemind

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:myyerrol/myyerrol.github.io.git
  branch: master

# Disqus
disqus_shortname: myyerrol

```

#### Freemind配置

我的Freemind主题配置文件（`themes/freemind/_config.yaml`）如下：

```yaml
slogan: "Hacking means exploring the limits of what is possible, in a spirit of playful cleverness."

theme: bootstrap
inverse: true

menu:
  - title: 归档
    url: archives
    intro: "所有的文章。"
    icon: "fa fa-archive"
  - title: 分类
    url: categories
    intro: "所有的分类。"
    icon: "fa fa-folder"
  - title: 标签
    url: tags
    intro: "所有的标签。"
    icon: "fa fa-tags"
  - title: 关于
    url: about
    intro: "关于。"
    icon: "fa fa-user"

links:
  - title: "myyerrol的GitHub"
    url: http://www.github.com/myyerrol
    intro: "我的GitHub。"
    icon: "fa fa-github"
  - title: "maksyuki的GitHub"
    url: http://www.github.com/maksyuki
    intro: "maksyuki的GitHub。"
    icon: "fa fa-github"
  - title: "mawenke的GitHub"
    url: http://www.github.com/mawenke
    intro: "mawenke的GitHub。"
    icon: "fa fa-github"
  - title: "liao-zhihan的GitHub"
    url: http://www.github.com/liao-zhihan
    intro: "liao-zhihan的GitHub。"
    icon: "fa fa-github"
  - title: "西工大RoboCup@Home的GitHub"
    url: http://www.github.com/xm-project
    intro: "西工大RoboCup@Home的GitHub。"
    icon: "fa fa-github"
  - title: "西工大RoboCup@Rescue的GitHub"
    url: http://www.github.com/team-explorer-rescue-robot
    intro: "西工大RoboCup@Rescue的GitHub。"
    icon: "fa fa-github"
  - title: "西工大篮球机器人项目的GitHub"
    url: http://www.github.com/nwpu-basketball-robot
    intro: "西工大篮球机器人项目的GitHub。"
    icon: "fa fa-github"
  - title: "HeadsFree项目的GitHub"
    url: http://www.github.com/HANDS-FREE
    intro: "HeadsFree项目的GitHub。"
    icon: "fa fa-github"
  - title: "maksyuki的博客"
    url: http://www.maksyuki.com
    intro: "maksyuki的博客。"
    icon: "fa fa-globe"
  - title: "mawenke的博客"
    url: https://mawenke.github.io
    intro: "mawenke的博客。"
    icon: "fa fa-globe"
  - title: "HandsFree项目的网站"
    url: http://www.hands-free.org.cn
    intro: "HandsFree项目的网站。"
    icon: "fa fa-globe"
  - title: "HandsFree项目的维基"
    url: https://github.com/HANDS-FREE/HANDS-FREE.github.io/wiki
    intro: "HandsFree项目的维基。"
    icon: "fa fa-globe"
  - title: "myyerrol的邮箱"
    url: mailto:myyerrol@126.com
    intro: myyerrol的邮箱。
    icon: "fa fa-envelope"

widgets:
- search
- category
- tagcloud
- recent_posts
- links

rss:
fancybox: true
favicon: images/favicon/favicon.ico
duoshuo_shortname:

# Analytics
google_analytics:
  enable: false
  siteid:
baidu_tongji:
  enable: false
  siteid:

# search
# swiftype_key: ZP2ZSuHgipSZfRyU8uTR

# share widgets
bdshare: false
jiathis: false

```

- **slogan:**
显示在博客网站首页的个性签名。

- **theme:**
Freemind的颜色主题，具体可参看[Freemind颜色主题配置](http://hahack.com/hexo-theme-freemind/2016/01/30/color-themes/)。

- **inverse:**
Freemind颜色主题的反转，配合上面的theme选项一起使用。

- **menu:**
显示在博客网站首页的导航菜单。

- **links:**
显示在博客网站首页的推荐链接。

- **widgets:**
显示在博客网站首页右侧的挂件列表。

- **rss:**
显示博客网站的RSS链接。

- **fancybox:**
是否开启[fancyBox](http://fancyapps.com/fancybox/3/)功能。

- **favicon:**


- **duoshuo_shortname:**
多说ID，由于关闭，不再使用。

- **google_analytics:**
Google分析，用于分析访问量。

- **baidu_tongji:**
Baidu统计，用于统计访问量。

- **swiftype_key:**
外部搜索的密钥，用于检索博客文章。

- **bdshare:**
分享插件。

- **jiathis:**
分享插件。

## 总结

以上就是Freemind主题的基本配置方法，概括来说就是对Hexo根目录和Freemind目录下的两个_config.yaml文件进行配置。Hexo提供的主题有很多，大家可以去[Hexo主题](https://hexo.io/themes/)网站选择适合自己的主题，并根据每个主题的README.md等相关文档来对博客网站进行个性化的配置。

在下一篇文章中，我会总结关于Freemind主题优化的配置。

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
