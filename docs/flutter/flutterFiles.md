# Flutter 学习笔记

Flutter 是 Google 开源的应用开发框架，仅通过一套代码库，就能构建精美的、原生平台编译的多平台应用，支持移动、网页、桌面和嵌入式设备。。[查看HTML文档](https://www.w3school.com.cn/html/index.asp)
## 项目目录
**常规项目目录**：
```md
-.dart_tool
-.idea
-android
-- .gradle
-- app
-- gradle
-build
-- app
-- last_build_run.json
-ios
-- Flutter
-- Runner
-- Runner.xcodeproj
-- Runner.xcworkspace
-- RunnerTests
-lib
-- main.dart
-test
-- widget_test.dart
-analysis_option.yaml
-myapp.iml
-pubspec.lock
-.pubspec.yaml

```

### 2、HTML5的拖拽如何实现，有哪些API？
被拖放元素API：

- dragstart: 事件主体为被拖拽元素，在开始拖放元素时触发

- dragend: 事件主体是被拖放元素，整个拖拽操作结束时触发

- drag: 事件主体是被拖放元素，正在拖放元素时触发

目标元素API

- dragenter: 事件主体是目标元素，被拖放元素进入时触发

- dragover: 事件主体是目标元素，被拖放元素在目标元素内移
动时触发

- dragleave: 事件主体是目标元素，被拖放元素移出时触发

- drop: 事件主体是目标元素，整个拖放操作完全结束时触发
```html
<div id="draggable" draggable="true">Drag me!</div>
<div id="dropzone">Drop here!</div>
```
```js{6,11}
// 获取拖拽的元素和放置的区域
var dragItem = document.getElementById('draggable');
var dropZone = document.getElementById('dropzone');
 
// 添加拖拽事件监听
dragItem.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
});
 
// 添加放置事件监听
dropZone.addEventListener('dragover', function(event) {
  event.preventDefault(); // 阻止默认行为
  event.dataTransfer.dropEffect = 'move'; // 设置可拖动的视觉效果
});
```


### 3、HTML5新增的标签有那些？
H5新增的标签包括：

`<section>`定义文档中的节、`<header>`定义 section 或 document 的页眉、`<footer>`定义 section 或 document 的页脚、

`<article>`定义外部的内容、`<aside>`定义 article 以外的内容、

`<audio>`定义声音如音乐或其他音频流、`<canvas>`定义画布，比如矢量图表和其他图像、`<video>`定义视频如电影片段或其他视频流、`<source>`为媒介元素（比如 `<video> `和` <audio>`）定义媒介资源、

`<time>`定义日期或时间，或者两者、`<progress>`显示 JavaScript 中耗费时间的函数的进程;

# CSS3面试题集

CSS3 是CSS（层叠样式表）技术的最新标准。主要包括盒子模型、列表模块、超链接方式、语言模块、背景和边框、文字特效、多栏布局、过渡动画、2D/3D转换等模块。[查看CSS文档](https://www.w3school.com.cn/css/index.asp)

### 1、px/em/rem的区别？

- px：绝对单位长度，相对于显示器屏幕分辨率来定义，大小固定，不随浏览器的缩放而改变；
- em：相对单位长度，相对于当前元素的父元素字体大小定义；
- rem：CSS3引入的一种相对单位长度，它相对于HTML根元素的字体大小，优点是可以通过直接修改根元素字体大小来控制长度比例；初始：`1em = 1rem = 16px`

### 2、什么是回流和重绘？
**（1）定义及区别**：  
&emsp;&emsp;① 回流指的是浏览器重新计算元素属性，然后绘制经修改后的元素的过程，并重新渲染页面，元素的几何属性发生改变（比如修改元素的宽、高或隐藏元素等）‌；  
&emsp;&emsp;② 重绘指的是浏览器根据元素的样式信息重新绘制页面，‌但没有改变元素的几何属性（比如修改了颜色或背景色）。  
**（2）如何避免**：  
&emsp;&emsp;① 尽量使用class属性来批量修改样式；  
&emsp;&emsp;② 使用CSS3动画或`transition`、`transform`和`animation`来实现动画效果，因为这些属性通常会在GPU层面处理，而不会引起回流，性能更好；  
&emsp;&emsp;③ 避免频繁读取布局信息，如获取`offsetTop`、`offsetLeft`等信息；  
**注意：** 重绘不一定导致回流，回流一定会导致重绘，回流的性能开销更大

## 3、CSS常用的伪元素有哪些，如何使用
&emsp;&emsp;常用的伪元素有：  
&emsp;&emsp;`::before`（在元素之前插入内容并修改样式）、`::after`（在元素之后插入内容并修改样式）、`::first-letter`（设置第一个字符的样式）、`::first-line`（设置第一行的样式）、`::placeholder`（设置输入字段的占位符）

## 4、CSS选择器的优先级
!important > 内联样式1000 > Id选择器100 > 属性选择器10 > 伪类选择器10 > Class选择器10 > 伪元素选择器1 > 元素选择器1

## 5、标准盒模型和怪异盒模型的区别
**标准盒模型**：width = content + margin 

**怪异盒模型**：width = content + border + padding + margin  

## 6、Flex弹性布局常用属性有哪些
**flex-direction:** 弹性容器中子元素排列方式,其包含的值有：row、row-reverse、column、column-reverse

**flex-warp:** 设置弹性盒子的子元素的换行

**flex-flow:** 上面这两种属性的简写形式

**align-item:** 设置弹性盒子元素在侧轴上的对齐方式

**align-content:** 设置行对齐

**justify-content:** 设置弹性盒子元素在主轴上的对齐方式

**flex-basis:**   设置子元素在主轴上的初始大小，其值有：auto、%、px

**flex-grow:** 设置flex的增长系数，与flex-basis类似，以比例设置

## 7、对于BFC的理解
&emsp;&emsp;BFC（块级格式化上下文）可以理解为CSS元素的一个属性，它属于普通流元素，可以创建一个隔离的/独立的渲染容器。并且可以用于处理外边距重叠现象，可用于清除浮动、阻止元素被浮动元素覆盖等问题；

&emsp;&emsp;触发BFC的方式有：html根元素、浮动元素、`绝对定位元素`、`overflow属性元素等`；

## 8、import和require的区别，加载模块的区别
&emsp;&emsp;‌require和import的主要区别在于它们所属的`模块化规范不同`，`加载时机不同`，以及`动态绑定和缓存方式的不同`。

&emsp;&emsp;**(1) 所属规范不同：** import是ES6（ECMAScript 2015）引入的关键字，属于ES模块化语法规范，主要用于浏览器端；require是CommonJS规范的一部分，主要用于Node.js环境，无法直接用于浏览器端；

&emsp;&emsp;**(2) 加载时机不同：** import是`静态引入`，必须在文件的顶部使用，提高了加载效率，但也限制了其使用位置，编译时加载；require是`动态引入`，可以在代码的任何位置使用，运行时加载，更加灵活但可能影响性能‌。

&emsp;&emsp;**(3) 动态绑定和缓存方式不同：** import提供静态分析，支持宏和类型检验，但无法实现动态绑定；require提供动态绑定，适合服务器或浏览器环境，多次要求相同的模块时，只会执行一次，因为缓存机制的存在‌。

## 9、CSS加载是阻塞的吗
&emsp;&emsp;CSS加载不会阻塞DOM的解析，但是会阻塞DOM的渲染，因为解析过程两者是独立并行的，而渲染过程这是两者合并进行的；所以要避免CSS加载时间过长，因此就需要对CSS进行包括合并css文件或压缩、减少请求数等性能优化操作；

&emsp;&emsp;CSS加载会堵塞JS运行，因为浏览器中的渲染进程是多线程的，分为GUI渲染线程、JS引擎线程、事件触发线程、定时器线程、异步http请求线程等等，由于JS可以操作DOM和CSS样式，因此为了避免出现冲突，CSS加载会阻塞JS的执行；

# 小程序开发
## 1、小程序和H5的区别
&emsp;&emsp;简单来说，小程序是一种轻应用，运行的环境是微信（App）；H5 是一种技术，依附的外壳是浏览器；原生 App 直接运行在操作系统的单独进程中；
&emsp;&emsp;开发一个微信小程序，由于微信团队提供了开发者工具，并且规范了开发标准，则简单得多；H5 的开发，涉及开发工具（vscode、Atom等）、前端框架（Angular、react等）、模块管理工具（Webpack 、Browserify 等）、任务管理工具（Grunt、Gulp等），还有 UI 库选择、接口调用工具（ajax、Fetch Api等）、浏览器兼容性等等；原生 App 的开发涉及到 Android/iOS 多个平台、开发工具、开发语言、不同设备的适配等问题；

## 2、小程序/Uniapp的生命周期
&emsp;&emsp;微信原生小程序生命周期：

&emsp;&emsp;&emsp;App全局：onLaunch监听小程序初始化、onShow小程序启动或切前台、onHide小程序隐藏或切后台、onError监听错误函数、onPageNotFound页面不存在监听函数

&emsp;&emsp;&emsp;Page页内：onLoad监听页面加载、onUnLoad监听页面卸载、onReady监听页面初次渲染完成、onRouteDone监听路由动画完成、onPullDownRefresh监听用户下拉、onReachBotton监听触底事件、onPageScroll监听页面滚动、onResize监听页面尺寸变化、onShareAppMessage监听用户分享转发、onShareTimeLine监听分享朋友圈、onAddToFavorites监听用户收藏

&emsp;&emsp;Uniapp的生命周期：

&emsp;&emsp;&emsp;uniapp的生命周期集成了Vue和原生小程序，但是uniapp有一些新增的生命周期onNavigationBarButtonTap监听原生标题栏按钮点击事件、onBackPress监听页面返回

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

&emsp;&emsp;• 分包之间不能相互引用私有资源

&emsp;&emsp;• 分包可以引用主包内的公共资源

&emsp;&emsp;• 独立包可以在不下载主包的情况下，独立运行；普通分包必须依赖于主包才能运行

&emsp;&emsp;独立分包是小程序中一种特殊类型的分包，可以独立于主包和其他分包运行。从独立分包中页面进入小程序时，不需要下载主包。当用户进入普通分包或主包内页面时，主包才会被下载。一个小程序中可以有多个独立分包。通过在app.json的subpackages字段中对应的分包配置项中定义independent字段声明对应分包为独立分包。

## 5、