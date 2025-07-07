# 前端知识点积累（实战）

### 一、Vue3中性能提升的优化策略包括那些？
&emsp;&emsp;① 编译期自动提升静态节点`(Static Hoisting)`，可以减少虚拟DOM对比操作；

&emsp;&emsp;② 使用`Patch Flag`优化`diff`过程，动态属性变更时跳过静态节点精准更新；

&emsp;&emsp;③ 使用`v-once`指令标记静态组件：仅渲染元素和组件一次，并跳过之后的更新；

&emsp;&emsp;④ 使用`Fragment`减少`DOM`节点：允许多个根节点存在，底层实现基于虚拟DOM的轻量级标记；

```text
#  虚拟DOM差异对比
* 传统方案 *
父dic
├─ header
├─ main
└─ footer
* Fragment方案 *
Fragment (轻量级标记)
├─ header
├─ main
└─ footer
# 性能优势：减少了一层虚拟DOM对比且避免的创建真实DOM父节点
```

除此之外性能优化方案还有：
`shallowRef`减少深层响应式开销、`provide/inject`依赖注入、虚拟DOM列表减少节点数等；


### 二、Vue3中Teleport组件的作用是什么？
&emsp;&emsp;Vue 3 的 `<Teleport>内置组件`允许将组件内容`跨DOM层级`渲染到任意位置（如 body 外层），并保持逻辑父子关系同时突破CSS层叠/布局限制，常用于模态框、通知、全局UI等需脱离当前层级的场景。

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### 三、Vue3与Vue2生命周期钩子函数的变化有那些？
 Vue 3 与 Vue 2 对比生命周期变化（🟢表示差异）：

| Vue 2 钩子           | Vue 3 选项式 API 钩子 | Vue 3 组合式 API 等效写法         | 变化类型               |
|----------------------|----------------------|----------------------------------|-----------------------|
| `beforeCreate`       | 🟢 **移除**           | 🟢 `setup()` 内部代码代替         | 完全替代方案           |
| `created`            | 🟢 **移除**           | 🟢 `setup()` 内部代码代替         | 完全替代方案           |
| `beforeMount`        | `beforeMount`        | `onBeforeMount(() => {...})`     | **保持相同**           |
| `mounted`            | `mounted`            | `onMounted(() => {...})`         | **保持相同**           |
| `beforeUpdate`       | `beforeUpdate`       | `onBeforeUpdate(() => {...})`    | **保持相同**           |
| `updated`            | `updated`            | `onUpdated(() => {...})`         | **保持相同**           |
| 🟢 `beforeDestroy`   | 🟢 `beforeUnmount`   | 🟢 `onBeforeUnmount(() => {...})` | **重命名** (语义优化)  |
| 🟢 `destroyed`       | 🟢 `unmounted`       | 🟢 `onUnmounted(() => {...})`     | **重命名** (语义优化)  |


### 四、Vue3中ref和reactive的本质企区别有哪些？

### `ref` vs `reactive` 完整对比表

| 特性                | `ref`                          | `reactive`                    |
|---------------------|-------------------------------|-------------------------------|
| **数据类型**         | 任意类型（基本类型 + 对象）    | 仅对象类型（Object/Array 等） |
| **访问方式**         | 通过 `.value`                 | 直接访问属性                 |
| **响应式原理**       | 基本类型：`getter/setter`<br>对象：内部调用 `reactive`（Proxy） | `Proxy` |
| **模板解包**         | 自动解包（无需 `.value`）      | 直接使用属性                 |
| **重新赋值**         | 支持（通过 `.value` 替换）     | ❌ 不支持（会破坏响应性）     |
| **解构行为**         | ✅ 解构后仍需通过 `.value` 保持响应性 | ❌ 解构后失去响应性          |
| **TypeScript**       | 需显式泛型（如 `ref<number>()`） | 自动推断类型                |

`reactive`解构后如何保持响应式？

&emsp;&emsp;由于`Proxy`的局限性，`reactive`的响应式依赖于`Proxy`拦截对象的属性访问，而解构后的变量变为独立的值副本则无法被Proxy追踪；
```js
const state = reactive({ count: 0 });
const { count } = state; // 解构后，count 是普通变量
count++; // ❌ 不会触发更新
```
解决方案：① 直接访问原对象（不推荐解构）；② 使用`toRefs`将`reactive`对象的每个属性转换为`ref`从而保持响应式;
```js
import { toRefs } from 'vue';
const state = reactive({count: 0});
const { count } = toRefs(state); // 现在count是ref

count.value++; // 继续保持响应式
```