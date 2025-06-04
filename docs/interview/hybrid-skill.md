
# 小程序/混合APP知识点积累

## 1、小程序和H5的区别
&emsp;&emsp;简单来说，小程序是一种轻应用，运行的环境是微信（App）；H5是一种网页技术，依附的外壳是浏览器；原生 App 直接运行在操作系统的单独进程中；

&emsp;&emsp;开发一个微信小程序，由于微信团队提供了开发者工具，并且规范了开发标准，则简单得多；H5 的开发，涉及开发工具（vscode、Atom等）、前端框架（Angular、react等）、模块管理工具（Webpack 、Browserify 等）、任务管理工具（Grunt、Gulp等）；还有UI库选择、接口调用工具（ajax、Fetch Api等）、浏览器兼容性等等；原生 App 的开发涉及到 Android/iOS 多个平台、开发工具、开发语言、不同设备的适配等问题；

## 2、微信小程序/UniApp的生命周期
&emsp;&emsp;微信原生小程序生命周期：

&emsp;&emsp;&emsp;App全局：`onLaunch监听小程序初始化`、`onShow小程序启动或切前台`、`onHide小程序隐藏或切后台`、`onError监听错误函数`、`onPageNotFound页面不存在监听函数`

&emsp;&emsp;&emsp;Page页内：`onLoad监听页面加载`、`onUnLoad监听页面卸载`、`onReady监听页面初次渲染完成`、`onRouteDone监听路由动画完成`、`onPullDownRefresh监听用户下拉`、`onReachBotton监听触底事件`、`onPageScroll监听页面滚动`、`onResize监听页面尺寸变化`、`onShareAppMessage监听用户分享转发`、`onShareTimeLine监听分享朋友圈`、`onAddToFavorites监听用户收藏`

&emsp;&emsp;Uniapp的生命周期：

&emsp;&emsp;&emsp;uniApp的生命周期集成了Vue和原生小程序，但是uniapp有一些新增的生命周期`onNavigationBarButtonTap监听原生标题栏按钮点击事件`、`onBackPress监听页面返回`

## 3、小程序/uniapp的setData方法使用
&emsp;&emsp;在小程序和uniapp中直接修改this.data的数值是无法改变当前页面状态的，从而会导致状态不一致。所以，setData方法可以用于将数据从逻辑层发送到视图层(异步)，同时改变对应的this.data的数值(同步)，仅支持可以JSON化的数据，尽量避免一次设置过多的数据；
```js
  page.setData(data: Object): Prmoise<void>
  //or
  const page = await program.currentPage()
  await page.setData({
    text: 'changed data'
  })

```
## 4、小程序/uniapp分包能相互引用吗   
&emsp;&emsp;• 主包无法引用分包的私有资源；packageA 无法 require packageB JS 文件，但可以 require 主包、packageA 内的 JS 文件；

&emsp;&emsp;• 分包之间不能相互引用私有资源;

&emsp;&emsp;• 分包可以引用主包内的公共资源;

&emsp;&emsp;• 独立包可以在不下载主包的情况下，独立运行；普通分包必须依赖于主包才能运行;

&emsp;&emsp;独立分包是小程序中一种特殊类型的分包，可以独立于主包和其他分包运行。从独立分包中页面进入小程序时，不需要下载主包。当用户进入普通分包或主包内页面时，主包才会被下载。一个小程序中可以有多个独立分包。通过在app.json的subpackages字段中对应的分包配置项中定义independent字段声明对应分包为独立分包;
