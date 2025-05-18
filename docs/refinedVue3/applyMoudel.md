# Vue3.0 应用模块化

### 1、单文件组件底层原理

&emsp;&emsp;① 单文件组件及对应构建工具的优势：使用熟悉的HTML、CSS、JS编写；强相关的关注点自然内聚；在使用组合式API时语法更加简单灵活；开箱即用的模块热更新 (HMR) 支持

&emsp;&emsp;② 单文件编译原理：单文件组件其实是一个特定的文件格式，需要交给`Vue`核心包`@vue/compiler-sfc`进行编译，编译后生成一个标准的`ES模块`，也因此单文件组价可以像导入文件的方式进行导入；

&emsp;&emsp;③ 为什么使用组件化开发而不是分包开发：前端开发的关注点不是完全基于文件类型分离的。前端工程化的最终目的都是为了能够更好地维护代码。

### 2、Vue工具链

&emsp;&emsp;脚手架：Vite([生产构建指南](https://cn.vitejs.dev/guide/build)、[部署指南](https://cn.vitejs.dev/guide/static-deploy))、Vue-Cli(基于WebPack)

&emsp;&emsp;设计语言：TypeScript

&emsp;&emsp;测试工具：Cypress、Vitest、Vite-Jest

&emsp;&emsp;代码规范：eslint-plugin-vue

&emsp;&emsp;格式化工具：Vue-Official、Prettier

&emsp;&emsp;路由工具：VueRouter

&emsp;&emsp;状态管理工具：Pinia

&emsp;&emsp;应用异常处理：
```js
improt { createApp } from "vue"
const app = createApp(App);
app.config.errorHandler = (err , interface, info) => {

}
```
### 3、VueRouter路由

### 4、状态管理工具
&emsp;&emsp;① 状态管理的作用：状态管理的主要作用是实现多个组件共享一个共同的状态；若不使用状态管理工具，通常会用到props逐级透传或者父子组件通过触发事件，这样当项目庞大时，会导致这些代码过于臃肿，难以维护；

&emsp;&emsp;&emsp;状态管理本身与Vue的响应式以及组合式函数很类似，但是为了保证数据状态在全局状态下不会被任意修改导致代码难以维护，所以在此基础上加入了方法，状态派生，模块等等；

&emsp;&emsp;② Vue3状态管理工具Pinia

### 5、Vue测试

&emsp;&emsp;① 测试分类：单元测试、组件测试、端到端测试

&emsp;&emsp;② 单元测试：检查给定的函数、类或者组合式函数的输入是否有对应的输出或副作用；

&emsp;&emsp;③ 组件测试：检查组件是否被正常的挂载和渲染，以及与组件之间的交互或数据状态变化是否正常；

&emsp;&emsp;④ 端到端测试（E2E）测试：检查跨越多个页面的功能，并对所构建的Vue应用进行实际的网络请求，其中就涉及到前后端之间的数据交互；

&emsp;&emsp;⑤ Vites用例指南：


### 6、服务端渲染SSR

&emsp;&emsp;① 什么是SSR：即服务端渲染，将组件在服务端直接渲染成`HTML` 字符串，作为服务端响应返回给浏览器，最后在浏览器端将静态的 `HTML`;

&emsp;&emsp;② 为什么使用SSR：更快的首屏加载、更好的SEO、统一的心智模型；

&emsp;&emsp;③ SSR常用框架：[Nuxt](https://nuxt.com/) 

