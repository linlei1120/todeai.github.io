# Vue3.0 入门基础

### 1、Vue的特性概述
&emsp;&emsp;① 声明式渲染：它是一种编程范式，只注重结果，由框架控制细节；而原生开发中的`命令式渲染`则更加关注过程，需要开发者控制每一步；
```js
//声明式渲染
<p v-for="item in list">{{item}}</p>
//命令时渲染
<ul id='list'>
    <li class="item"></li>
</ul>
<script>
    let list = [1,2,3]
    let itemList = null;
    let list = document.getElementById('list')
    list.forEach(item => {
        itemList += `<li class="item">${item}</li>`
    })
    list.innerHTML = itemList
</script>
```
&emsp;&emsp;② 单组件应用：每一个应用都会有一个根组件如`App.vue`，其他的所有逻辑功能组件都是它的子组件并互相嵌套，通过`createApp(根组件)`创建后再由`mount('#app')`方法进行挂载应用，`createApp()`允许一个页面中创建多个Vue实例，并分别进行挂载；
挂载应用需要在所有应用配置和资源注册完成后方可执行调用；
```vue
import { createApp } from 'vue'
import App from './App'

const app.createApp(App)
app.mount('#app')
```
关键词：应用实例、根组件、挂载应用、应用配置，多应用实例挂载

### 2、选项式API和组合式API
&emsp;&emsp;**① 选项是API：** 该方式以`组件实例`的概念为核心，也就是this；

&emsp;&emsp;&emsp; **特点包括：** 需要多个选项的对象来描述组件的逻辑，如`data()`、`methods`、`computed()`等；选项定义的属性都会暴露在当前函数的this上，并指向当前的组件实例；

&emsp;&emsp;**② 组合式API：** 直接在函数作用域内定义响应式状态变量，并将从多个函数中获得的状态组合起来处理复杂问题；组合式API作为一系列API的集合，涵盖了响应式API、生命周期钩子、依赖注入等方面的内容；

&emsp;&emsp;&emsp; **特点包括：** 采用导入API函数的方式来描述组件逻辑；功能业务内代码的聚合性越强，方便更灵活的组织和重用逻辑代码；`<script setup>`中的`setup`作为一个属性标识用来告诉Vue在编译时进行一些处理，可以更简洁的使用组合式API开发；

&emsp;&emsp;&emsp;**总结：** 更小的生产包体积、更好的类型推导、更好的逻辑复用、更简洁的代码；

&emsp;&emsp;**注意：** 组合式API并不代表函数式编程，函数式编程强调数据不可变，与组合式的响应式大为不同；
### 3、计算属性computed的变化
&emsp;&emsp;`computed`主要用于派生状态，根据依赖项动态计算并返回一个计算属性`ref`可以通过`.value`读取。他应该是一个纯函数，即只依赖于其依赖项，而不应该产生副作用即不可执行其他操作如状态修改等；而`watch`则可以执行修改状态/触发异步等操作；

&emsp;&emsp;计算属性和方法返回的区别：计算属性值会基于其响应式依赖被缓存，只有当所依赖的状态发生更新时才会重新计算；相较于方法返回，在进行大量数据计算时更加节省性能；

&emsp;&emsp;计算属性默认是只读的，但是也可以通过`getter、setter`来重新创建一个可写的计算属性；同样也可以在getter中获取上一个值；但是以上方式都不建议使用，因为每一次更新都会重新触发计算；且计算属性的值作为ref派生出来的临时`快照`，修改也是没有意义的；
```js
//可写计算属性
const firstName = ref("John");
const lastName = ref("Doe");
//可写的计算属性
const fullName = computed({
  get(previous) {
    return firstName.value + "" + lastName.value;
  },
  set(newValue) {
    //解构赋值
    [firstName.value, lastName.value] = newValue.split(" ");
  }
});
//调用方法修改ref，内容会发生变化
function ChangeName() {
    firstName.value = "林"
    lastName.value = "磊"
}
```
**注意：** 在计算属性的最佳实践中：不要改变其他状态、在 getter 中做异步请求或者更改 DOM等！
### 4、侦听器watch和watchEffect
&emsp;&emsp;**① watch：** 侦听器有三个参数分别是`监听的值`、`变化的新值`、`变化的旧值`，适合更加精准的控制监听数据源，监听的值可以是一个或者多个

&emsp;&emsp;&emsp; **特点包括：** 

&emsp;&emsp;&emsp; · 惰性执行：回调函数默认不会立即执行，而是监听的数据源发生变化是才会触发；

&emsp;&emsp;&emsp; · 支持配置深度监听`{deep:true}`，但是可以通过设置`immediate: true`强制侦听器立即执行；

&emsp;&emsp;&emsp; ·  可以设置侦听器仅仅只在源变化时触发一次，使用`once:true`属性;

&emsp;&emsp;&emsp; **适用于：** 当你需要监听特定的响应式数据，并且需要访问旧值和新值；当你需要惰性执行（即只在数据变化时执行）；当你需要深度监听对象或数组；

&emsp;&emsp;**② watchEffect：** 会自动追踪回调函数中使用的全部响应式数据，且不需要指定特定的依赖

&emsp;&emsp;&emsp; **特点包括：** 没有旧值，只关注当前状态；

&emsp;&emsp;&emsp; **适用于：** 当你希望回调函数立即执行；当你不需要旧值，只关注当前状态；

**补充：**

 **· onWatcherCleanup()3.5+：**  用于避免在进行副作用的过程中监听依赖就发生了变化，该方法注册一个清理函数，当侦听器失效并准备重新运行时会被调用，且该方法必须在同步函数中执行，不能再await异步中使用：

 **· watchPostEffect()方法：** 在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM可以设置`flush: 'post'`属性或使用该方法；

 **· 同步侦听器：** 同步触发的侦听器，会在 Vue 进行任何更新之前触发，设置 `flush: 'sync'`属性；
```js
//deep属性启用深度监听，可以设置数字来控制深度监听层数
//immediate属性用于开启立即回调，关闭默认惰性特性
watch(count, (newVal, oldVal) => {
  console.log("newVal", newVal);
  console.log("oldVal", oldVal);
  console.log("count", count.value);
},{deep:true,immediate:true});

watchEffect(() => {
  console.log("countssss", count.value);
  console.log("isShow", isShow.value);
  console.log("todo", todo.value);
});
//补充
import { watch, onWatcherCleanup } from 'vue'
watch(id, (newId) => {
  const controller = new AbortController()
  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })
  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```
### 5、组件通信的方式
&emsp;&emsp;**① Props：** 定义props使用`defineProps方法`，它是一种编译时宏不需要导入即可直接使用，在父组件自定义绑定属性后，在子组件中使用`defineProps`声明属性后直接使用；

&emsp;&emsp;**② Emits使用：** 定义emits同样是使用编译时宏`defineEmits()`，定义后可携带参数触发事件`emits(eventName,params)`；
```js
// 子组件中
// props
const props = defineProps({
    msg:String,
    count:Number
})
//emits
const emits = defineEmits(["printMessage"]);
const handleEmits = () => {
  emits("printMessage", { value: "HAHAHAHAH" });
};
```
**解释：** 编译时宏（Compile-Time Macros）是指在 Vue 模板编译阶段被处理的特殊标记或指令。这些宏在编译时会被 Vue 的编译器解析并转换为实际的 JavaScript 代码，而不是在运行时处理。主要目的是减少开销，提升性能，简介语法；

### 6、插槽slot应用
&emsp;&emsp;插槽可以使父组件在引入的子组件中加入内容并由solt作为模板片段的出口传递到子组件中进行展示，当父组件没有模板片段时也可以在slot插槽中定义默认值
```js
//父组件
<Children>定义文本传递</Children>
//children组件
<slot>默认文本：Fallback content</slot>
//children+定义文本传递
```

## 7、模板语法

&emsp;&emsp;**① 模板语法特性概述**

&emsp;&emsp;&emsp;模板语法底层机制就是将模板编译成功高度优化的js代码，并结合响应式，推导出最优的方式进行DOM操作并渲染元素；

&emsp;&emsp;&emsp;**模板语法进阶-手写渲染函数：** 

&emsp;&emsp;&emsp;`h()`函数：用于创建`Vnodes`，该方法的意思是“能生成HTML的JS”

&emsp;&emsp;**② 插值文本和v-html指令** 

&emsp;&emsp;在文本插值中直接写入标签会被翻译为文本，若需要渲染标签则需要使用`v-html`指令，但是不推荐频繁使用因为`v-html`指令渲染标签容易造成`XSS`漏洞；

&emsp;&emsp;**③ Arribute属性绑定** 

&emsp;&emsp;属性通过`v-bind`指令绑定，也可简写为`:`符号；如果属性名和属性值名词相同则可以只写属性名，3.4版本以上；

&emsp;&emsp;属性绑定也可以是多个属性的js对象使用`v-bind`进行绑定；

&emsp;&emsp;**④ 指令使用**  

&emsp;&emsp;一个指令的作用就是在表达式的值变化是响应式的更新DOM；常见的指令如`v-solt`、`v-memo`等；


&emsp;&emsp;**⑤ 绑定动态参数**  

&emsp;&emsp;&emsp;动态参数主要是可以作用在`v-bind`和`v-on`，使得属性和事件都可以动态的进行绑定，但是需要注意最终的值应为一个字符串

&emsp;&emsp;**⑥ 修饰符使用**

&emsp;&emsp;修饰符表示指令需要以一些特殊的方式被绑定，常用的修饰符：`.tirm、.prevent、.stop`

## 响应式基础

### 1、声明响应式状态

&emsp;&emsp;通过`ref()`来声明响应式状态，并通过`.value`获取值，`ref`可以持有任何类型的值，也可以直接在`@click`时间监听器中直接改变一个`ref`

&emsp;&emsp;`ref`根据初始化的值推导其类型，对于更复杂的类型可以用`Ref`这个类型，或者再调用`ref()`时传入一个泛型参数

### 2、为什么使用ref?

&emsp;&emsp;`ref`可以用来作为响应式系统追踪和触发组件的渲染，且`.value`则更方便`Vue`中`getter`方法执行追踪和`setter`方法执行触发，且`ref`可以传递给函数并保留对最新值和响应式连接的访问；

### 3、nextTick()全局API

&emsp;&emsp;因为DOM的更新不是同步的，可以使用nextTick()全局API等待DOM更新完成后执行额外的代码；
```js
//DOM更新周期-nextTick()
const num = ref(0);
async function increment() {
  num.value++;
  console.log("还没有更新", document.getElementById("numC").textContent);
  await nextTick();
  console.log("nextTick已经更新", document.getElementById("numC").textContent);
}
```
### 4、深度监听响应式和shallowRef浅层作用

&emsp;&emsp;`ref`可以是任何类型的值，同样也会使它所持有的值具有深层响应性，无论是对象还算是数组的变化都会被检测到。

&emsp;&emsp;但是同样深层响应性也会增加开销从而影响性能；所以可以通过`shallowRef`来放弃深层响应性仅实现浅层作用，`shallowRef`仅能监听到第一层`.value`，所以对于复杂类型仅能进行完整赋值操作;
```js
//浅层作用
const objShallow = shallowRef({
  arr: [1, 2, 3]
});
function mutateShallow() {
  // objShallow.value.arr.push(55); 无法赋值
  objShallow.value = { arr: [5, 6, 7, 8] };
}
```

## 类与样式动态绑定
1、通过计算属性动态绑定对象类

&emsp;&emsp;通过计算属性动态绑定对象类：多个类可以放入同一个计算属性中，经过相关操作后统一进行输出；

2、样式对象绑定

&emsp;&emsp;直接绑定样式在元素上通常不够整洁，使用样式对象进行绑定会更加高效；

3、多值绑定
&emsp;&emsp;无论是动态绑定数组还是动态绑定样式，当存在多个绑定值时，都可以采用数组形式绑定；
```html
<div :style="[baseStyles, overridingStyles]"></div>
<div :class="[activeClass, errorClass]"></div>
```

## 列表渲染
&emsp;&emsp;**特点：**

&emsp;&emsp;1、在循环嵌套中，每一个v-for的作用域都可以访问到父作用域；

&emsp;&emsp;2、可以使用别名来代替循环输出的`item`名进行解构赋值，对于数组对象的元素获取更方便;

&emsp;&emsp;3、除了`item in items`也可以使用`item of items`作分隔符号;

&emsp;&emsp;4、除了遍历数组类型以外，也可以使用`v-for`遍历对象，并用解构赋值输出`key/value/index`;

&emsp;&emsp;5、key的作用是跟踪每个节点的标识，在循环列表发生变化是便于高效重用和重新排序现有的元素

&emsp;&emsp;6、在组件上使用v-for循环时，可以通过直接在循环体上绑定props来传递数据到组件中
```js
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```
## 模板语法

&emsp;&emsp;1、底层机制

&emsp;&emsp;&emsp;模板的底层机制就是将模板编译成功高度优化的js代码，并结合响应式，推导出最优的方式进行DOM操作并渲染元素；

&emsp;&emsp;&emsp;模板语法进阶-手写渲染函数：`h()函数`：用于创建VNodes，该方法的意思是“能生成HTML的JS”

&emsp;&emsp;2、文本插值和v-html

&emsp;&emsp;&emsp;在文本插值中直接写入标签会被翻译为文本，若需要渲染标签则需要使用`v-html`指令，但是不推荐频繁使用因为`v-html`指令渲染标签容易造成XSS漏洞

&emsp;&emsp;3、attribute属性绑定

&emsp;&emsp;&emsp;属性通过`v-bind`指令绑定，也可简写为`:`符号；如果属性名和属性值名词相同则可以只写属性名，3.4版本以上；
属性绑定也可以是多个属性的`js对象`使用`v-bind`进行绑定；

&emsp;&emsp;&emsp;`ref属性`可以用于直接访问底层 `DOM` 元素，获取特点`DOM`元素或者子组件实例的直接引用；


&emsp;&emsp;4、指令

&emsp;&emsp;&emsp;一个指令的作用就是在表达式的值变化是响应式的更新DOM；

&emsp;&emsp;5、动态参数

&emsp;&emsp;&emsp;动态参数主要是可以作用在v-bind和v-on，使得属性和事件都可以动态的进行绑定，但是需要注意最终的值应为一个字符串；

&emsp;&emsp;6、修饰符

&emsp;&emsp;&emsp;修饰符表示指令需要以一些特殊的方式被绑定，常用的修饰符包括`.stop、.trim、.prevent、.number等`

&emsp;&emsp;7、模板引用

&emsp;&emsp;&emsp;访问模板引用`useTemplateRef()：`用于再组合式API中获取引用，注意只可以在组件被挂在后才可以访问模板引用，所以无法再`onMounted()`周期之前访问；而在3.5+版本前无法使用该方法，需要声明一个与`ref`同名的`ref`且类型需要相同，`ref` 数组并不保证与源数组相同的顺序；
```js
const a = 1
const b = ref(2)
// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
```