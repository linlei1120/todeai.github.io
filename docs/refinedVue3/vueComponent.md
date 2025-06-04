# Vue3.0 深入组件

## 1、组件注册

&emsp;&emsp;① 全局注册：在main.js函数中可以使用.component()方法来进行全局组件注册；当存在多个全局组件时，即可使用链式调用进行注册；同样全局注册的组件也可以在任何子组件中相互使用

&emsp;&emsp;&emsp;缺点：未使用的组件无法在打包时被`tree-shaking`，即自动移除，且依赖关系不明确；长期下来可能会影响可维护性；

&emsp;&emsp;② 局部注册：局部注册则是在相应的父组件中显示导入，且只能在导入的组件中使用，依赖关系更明确；

## 2、props使用

&emsp;&emsp;① props的声明：有两种声明方式，一种是常规的数组类型声明，在`setup()`方法使用时；另一种则是使用`defineProps宏`来声明，适用于`<script setup>`标签使用时；声明的值的类型可以是字符串，但更推荐使用对象声明，显示值的类型默认值等信息；
```js
// 在TypeScript中则使用类型标注来声明props;
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

## 3、Props响应解构
&emsp;&emsp;`Vue` 的响应系统基于属性访问跟踪状态的使用情况，但是注意在`watch侦听器`中监听`props`不能直接绑定，也需要将其返回为一个`getter`值；若需要传递结构的`prop`到外部函数中并保持响应性则需要用到`useComposable()`方法；
```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
//在3.4版本下则需要声明props.foo
  console.log(foo)
})

watch(
  () => props.message,
  (newVal, oldVal) => {
    console.log("newVal", newVal);
    console.log("oldVal", oldVal);
  }
);
```

## 4、单向数据流
&emsp;&emsp;`props`始终遵循单向数据流的原则，只有在父组件中才可以更新`props`对应的依赖，从而也避免了子组件会意外修改父组件状态的情况使数据流变得混乱难以理解；

&emsp;&emsp;但在某些情况下需要在子组件中结合`props`传入的值进行修改，可以做一下处理，如：子组件修改`Props`的方式：重新定义一个局部组件，在`props`上获取初值；使用计算属性对`props`值进一步转换返回一个计算属性值；

## 5、组件间的事件
&emsp;&emsp;① 事件绑定触发：在子组件中可以通过创建函数触发父组件中的emits函数，也可以直接在标签内联中进行$emits触发；

&emsp;&emsp;② 事件参数：`emits` 选项和 `defineEmits()` 宏还支持对象语法。通过 `TypeScript` 为参数指定类型，它允许我们对触发事件的参数进行验证；

&emsp;&emsp;③ 事件校验：同`props`一样，事件校验也可以采用对象类型的方式进行，通过把事件赋值为一个函数，接受传入的内容然后进行判断并返回`boolean`值来判断校验是否成功；

## 6、组件缓存
&emsp;&emsp;两个组件间来回切换，可以使用:is属性动态绑定参数，`：is`绑定的值可以是被注册的组件名或者被导入的组件对象，当使用  `<component :is="...">`来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过`<KeepAlive>`组件强制被切换掉的组件仍然保持“存活”的状态。

## 7、defineModel()宏

&emsp;&emsp;在父组件中可以使用`v-model指令`进行双向数据绑定，而在子组件中推荐使用`defineModel()宏+v-model`，因为这种方式可以起到父子组件变量之间双向绑定的作用；
```js
// 多v-model值绑定及解构赋值
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```


## 8、透传Attribute
&emsp;&emsp;定义：透传指的是传递给一个组件却没有被`props`或`emits`声明的属性或事件，如`class类`、`style样式`等，这些就是透传属性；若父子组件的透传属性名称相同则会被合并；同样绑定在引入子组件上的`v-on事件`也会发生透传；在模板表达式中可以在直接用 `$attrs` 访问到透传属性；

&emsp;&emsp;禁止透传：在组件选项中设置`defineOptions()`的`inheritAttrs:false`就可以禁止透传继承；在JS中获取透传属性：使用引入API：useAttrs即可在js中获取透传属性

## 9、插槽

&emsp;&emsp;① 具名插槽：一种将多个插槽内容传入到各自目标插槽的出口，就是具名插槽；由`v-slot:name`声明自定义的具名插槽，也可以简写为`#name`；

&emsp;&emsp;② 条件插槽：目的是为了根据内容是否被传入了插槽来渲染内容，需要对传入状态做出判断，此时就需要用到`$slots`结合v-if使用；如：`$slots.name`

&emsp;&emsp;③ 具名作用域插槽：有时需要在父组件的插槽区域获取子组件的数据状态，即可使用作用域插槽，通过在子组件对应的`slot`上绑定属性，然后在父组件中通过具名暴露出插槽上所绑定的数据状态；相比于`Vue2`的作用域插槽更加高效简洁；

&emsp;&emsp;④ 使用插槽的优势总结：

&emsp;&emsp;&emsp;父组件中绑定在插槽事件也可以通过插槽在子组件中渲染的同时依然绑定，避免跨组件间的事件通讯；

&emsp;&emsp;&emsp;组件中制定模块的内容和样式等控制权交由父组件控制；
```js
    <h3>透传+具名插槽+作用域插槽</h3>
    <childBlock @click="bindBtn">
      <template #header="header"> 测试具名插槽Header {{ header }}</template>
      <template>测试默认具名插槽Default</template>
      <template #footer="footer"> 测试具名插槽Footer {{ footer }}</template>
    </childBlock>
```
&emsp;&emsp;⑤ 案例：高级列表组件渲染


## 10、依赖注入
&emsp;&emsp;① 概述：在多层嵌套的组件应用中，深层子组件若想获取远端父组件的数据是，通常需要props逐级递传，这会导致数据状态在传输过程中管理混乱；而依赖注入则通过provide和inject有效的解决逐级递传的问题，通过在父组件或者应用层根组件提供依赖即可在需要的子组件中注入使用；

&emsp;&emsp;② 应用层的依赖注入：

&emsp;&emsp;③ 依赖注入数据动态绑定：

&emsp;&emsp;⑤ 如何避免依赖注入冲突：

# 11、异步组件 defineSyncComponent
