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

### 4、跨组件通信
&emsp;&emsp;在 Vue 3 中，`emit('update:modelValue', selectedValue.value) `可以触发对父组件 v-model 绑定值的更新，但本质上是通过 Vue 的 双向绑定协议 实现的间接修改。

**① 核心机制解析：** 
| 机制   | 说明 |
|----------|------------|
| v-model 本质   | 语法糖，等价于 :modelValue + @update:modelValue 的组合    |
| 单向数据流  | 子组件不能直接修改父组件的 prop，必须通过事件通知父组件更新            |
| 事件驱动更新| emit('update:modelValue') 会直接触发父组件执行 v-model 绑定的变量更新         |

```js
// 父组件 (直接绑定)
<ChildComponent v-model="parentValue" />

// 等价于
<ChildComponent 
  :modelValue="parentValue"
  @update:modelValue="newValue => parentValue = newValue"
/>

// 子组件正确做法
emit('update:modelValue', newValue) // ✅ 通过事件链触发父组件赋值

// 错误做法
props.modelValue = newValue // ❌ 直接修改 prop 会触发 Vue 警告

```
