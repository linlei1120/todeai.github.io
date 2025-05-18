# Vue3.0 最佳实践

### 1、性能优化
&emsp;&emsp;① 页面优化的两个方面：

&emsp;&emsp;&emsp;页面加载性能：指页面展示出内容且达到可交互状态的速度，通常衡量指标有LCP、FCP、INP等

&emsp;&emsp;&emsp;页面更新性能：指应用响应用户交互更新的速度，如页面链接跳转、输入查询等；

&emsp;&emsp;② 页面性能分析工具：[webpagetest](https://www.webpagetest.org/) 、[pagespeed](https://pagespeed.web.dev/)

&emsp;&emsp;③ 页面性能优化方法：选择正确的框架(对渲染性能敏感可以选用SSR或SSG)、包体积压缩和[Tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)、代码分割、更新优化(v-once指令、v-memo指令)、计算属性稳定性(比较新旧值，若无变化则返回旧值)

&emsp;&emsp;④ 通用性能优化方法：大型虚拟列表([vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller))、减少不必要的深度响应式监听(使用`shallowRef方法`和`shallowReactive方法`)

### 2、安全实践：
&emsp;&emsp;① 避免使用无法信赖的模板，更不要在服务端渲染中使用无法信赖的模板；Vue自身会将模板转译成安全的符号从而避免脚本注入等问题；

&emsp;&emsp;② 最佳实践策略：[HTML5 安全手册](https://html5sec.org/)、[OWASP 的跨站脚本攻击 (XSS) 防护手册](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

### 3、跨平台使用Vue
&emsp;&emsp;① 配合[Electron]()使用创建桌面应用

&emsp;&emsp;② 配合[Tauri]()使用创建混合应用

&emsp;&emsp;③ 配合[TresJS]()使用构建WebGL应用