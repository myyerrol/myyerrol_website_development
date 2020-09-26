#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import json
from bs4 import BeautifulSoup as BS
import requests

url = "http://data.zz.baidu.com/urls?site=myyerrol.io&token=RHQkf41Ltzyi6DqC"
baidu_sitemap = os.path.join(sys.path[0], "public", "baidusitemap.xml")
google_sitemap = os.path.join(sys.path[0], "public", "sitemap.xml")
sitemap = [baidu_sitemap, google_sitemap]
assert(os.path.exists(baidu_sitemap) or os.path.exists(
    google_sitemap)), "没找到百度或谷歌的站点地图，请检查网站根目录下是否存在相应文件！"

# 从站点地图中读取网址列表
def getWebisteUrls():
    urls = []
    for _ in sitemap:
        if os.path.exists(_):
            with open(_, "r") as f:
                xml = f.read()
        soup = BS(xml, "xml")
        tags = soup.find_all("loc")
        urls += [x.string for x in tags]
        if _ == baidu_sitemap:
            tags = soup.find_all("breadCrumb", url=True)
            urls += [x["url"] for x in tags]
    return urls

# 向百度资源平台提交网址列表
def pushWebisteUrls(urls):
    urls = set(urls)
    print("Website urls num: %s" % len(urls))
    # print(urls)
    data = "\n".join(urls)
    return requests.post(url, data=data).text

if __name__ == "__main__":
    urls = getWebisteUrls()
    result = pushWebisteUrls(urls)
    print("Push urls result: ");
    print(result)
