---
title: Hexo教程系列（四）：主题的优化
date: 2017-06-10 19:34:07
tags:
  - Hexo
  - Blog
categories: Hexo
description: 本篇文章介绍Hexo主题的优化。
feature: false
toc: true
comments: true
---

## 前言

上一篇文章中介绍了Freemind主题的基本配置方法，这篇文章主要介绍Freemind主题的优化，

<!--more-->



其中跟主题配置相关的内容有：

**启用主题**

```yaml
theme: freemind
```

修改theme中的内容为freemind来启用主题。

**文章布局**

```yaml
default_layout: freemind
```

上面修改的是文章的默认布局，可以在终端里使用如下的命令来简化：

```sh
$> hexo new "article"
```

而不需要

```sh
$> hexo new freemind "article"
```

因为Freemind主题在Hexo的基础之上，额外提供了一些新的front-matter选项，所以我创建了这个freemind布局（`scaffolds/freemind.md`）来更好地装饰整篇文章。以下是其中的具体内容：

```md
---
title: {{ title }}
date: {{ date }}
tags:
categories:
description:
feature: false
toc: true
comments: true
---

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}

```

- **title:**
文章的标题，由创建文章命令中的title自动写入，可以手动修改。

- **date:**
文章的创建日期，由创建文章命令时的系统时间自动写入，可以手动修改。

- **tags:**
文章的标签，用于在博客网站首页的标签页里进行显示，可以添加多个。

- **categories:**
文章的分类，用于在博客网站首页的分类页里进行显示。

- **description:**（新）
文章的描述，用于在文章顶部插入一段简短的摘要信息。

- **feature:**（新）
文章的特征图，用于在博客网站首页的文章列表中进行显示。

- **toc:**（新）
文章的目录，用于显示文章的目录层级。

- **comments:**
文章的评论，用于留言和交流。

**评论系统**

```yaml
# Disqus
disqus_shortname: myyerrol
```

因为多说已经关闭，所以我使用Disqus来取代其做博客的评论系统，上面需要填写的是注册Disqus时所指定的ID。具体的操作步骤如下：

**1. 注册或登录Disqus**

![disqus_login_and_signup](../../../../../images/disqus/disqus_login_and_signup.png)

打开[Disqus](https://disqus.com/)主页，可以看到，Disqus 支持 Facebook，Twitter以及 Google 登录，当然也可以用邮箱注册一个账号，如果是注册的账号，需要验证一下邮箱。

**2. 配置Disqus**

登陆后，在[Disqus](https://disqus.com/)主页选择**GET STARTED**按钮，会出现如下界面：

![disqus_get_started](../../../../../images/disqus/disqus_get_started.png)

选择**I want to install Disqus on my site**选项后，接着会出现下面的界面：

![disqus_create_site](../../../../../images/disqus/disqus_create_site.png)

- **Website Name:**
你的网站名字，可以随便起，但最好和你的网站相关。

- **Shortname:**
这个就是上面Hexo配置中的disqus_shortname，要求全网唯一，设定之后不可改变。推荐使用你的英文名来当做Shortname。

- **Category:**
这个是站点的种类，你可以根据自己的实际情况来进行选择。

在填写完上面的内容之后，点击**Create Site**，等待页面的跳转。接下来在页面的左侧点击**Configure Disqus**

![disqus_configuration](../../../../../images/disqus/disqus_configuration.png)

- **Website Name:**
自动从上面创建站点的步骤中读取，不需要手填。

- **Website URL:**
自己博客网站的地址，需要如实填写。

- **Category:**
自动从上面创建站点的步骤中读取，不需要手填。

- **Description:**
网站的描述，可以不写。

- **Language:**
Disqus显示在网站中的语言，根据自己的实际情况来选择，一般选择Chinese或English。

配置完以上内容后，点击**Complete Setup**完成Disqus的配置。

**3. 配置Hexo**

最后，在`_config.yaml`文件中将disqus_shortname填写为上面Disqus创建的Shortname就可以了。

{% alert success %}
Disqus评论系统需要翻墙才可以访问，而且在留言之前要先登录个人账户。
{% endalert %}


## 总结


{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
