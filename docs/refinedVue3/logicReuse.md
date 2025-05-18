# Vue3.0 逻辑复用

## 1、组合式函数

&emsp;&emsp;定义：组合函数类似于将公共脚本封装，是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数；而Vue中两种重用代码的方式就包括了组件和组合式函数；

&emsp;&emsp;常用操作：组合函数封装使用、组合函数嵌套使用；异步状态：如基于传入的状态来创建执行操作的侦听器

&emsp;&emsp;约定实践：采用驼峰命名，且名称以`use开头`；副作用要在`onMounted`时挂载，要在"onUnmounted"时清理副作用；组合式函数适用于在`<script setup>`或`setup()`方法中使用，也可以在`onMounted()`周期函数中使用，其他地方不可使用；

&emsp;&emsp;对比Mixin：Mixin的数据来源不清晰；组合函数可以通过解构赋值添加别名避免冲突；抽取组合式函数：基于逻辑问题将组件代码拆分为更小的函数，可以使得逻辑代码可读性复用性更强，也便于查询和理解，而抽取出的组件也可以相互通信服务；

&emsp;&emsp;对比React hooks：组合式函数和React Hooks相识，但前者是基于Vue细粒度响应性系统，与React Hooks的执行模型有本质上的区别；
```js
    // 组合式函数创建
    import { ref } from "vue";
    import { useEventListener } from "./event";
    export default function useMouse() {
    const x = ref(0);
    const y = ref(0);
    useEventListener(window, "mousemove", e => {
        x.value = e.pageX;
        y.value = e.pageY;
    });
    return { x, y };
    }
    // 引入组合式函数
    import useMouse from "../login/utils/mouse";
    const { x, y } = useMouse();
    <h4>组合式函数</h4>
    <p>{{ x }} {{ y }}</p>
```
## 2、自定义指令

&emsp;&emsp;指令注册：在`<script setup>`中任何以v加上驼峰命名的方式创建的变量都可以作为自定义指令使用，然后采用v-的方式使用指令；若不在`<script setup>`中，则需要使用`directives`对象进行注册；

&emsp;&emsp;&emsp;自定义指令还可以在应用层进行定义，使用app.directive方法即main.js文件中；

```js
const vHighlight = {
  mounted: el => {
    el.classList.add("is-highlight");
  }
};
```

## 3、插件封装