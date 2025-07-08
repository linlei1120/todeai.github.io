# 前端知识点积累（实战）
## 第一部分
### 一、Vue3中性能提升的优化策略包括那些？
&emsp;&emsp;① 编译时自动提升静态节点`(Static Hoisting)`，可以减少虚拟DOM对比操作；

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


### 二、Vue3性能优化中关于`v-once`和`v-memo`的区别有哪些？
&emsp;&emsp;在 Vue 3 中，v-once 和 v-memo 都是用于优化渲染性能的指令，但它们的应用场景和工作原理有所不同:

#### **1. 核心区别**
| 指令      | 更新机制               | 适用场景                  | 灵活性        |
|-----------|----------------------|-------------------------|-------------|
| `v-once`  | **完全跳过所有更新**    | 绝对静态内容              | 低（一刀切）  |
| `v-memo`  | **依赖值变化才更新**    | 动态但更新频率低的部分     | 高（可控）   |

---

#### **2. 如何选择？**
- 用 `v-once` 当：内容**永远不需要更新**（如公司地址、版权信息）
- 用 `v-memo` 当：内容**可能更新但频率低**，且需避免无关数据触发的渲染（如大型表格的单元格）
```js
// 需要显式指定依赖值
<div v-memo="[valueA, valueB]">  
  <!-- 仅在 valueA 或 valueB 变化时更新，其他数据变化跳过 -->
  {{ dynamicContent }}
</div>
```
> ⚠️ **注意**：`v-memo` 需要谨慎设置依赖项，遗漏关键依赖可能导致 UI 不同步！

### 三、Vue3中Teleport组件的作用是什么？
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

### 四、Vue3与Vue2生命周期钩子函数的变化有那些？
 Vue 3 与 Vue 2 对比生命周期变化（🟢表示差异）：

| Vue 2 钩子           | Vue 3 选项式 API 钩子 | Vue 3 组合式 API 等效写法         | 变化类型               |
|----------------------|----------------------|----------------------------------|-----------------------|
| `beforeCreate`       | `beforeCreate`           | 🟢 `setup()` 内部代码代替         | 完全替代方案           |
| `created`            | `created`           | 🟢 `setup()` 内部代码代替         | 完全替代方案           |
| `beforeMount`        | `beforeMount`        | `onBeforeMount(() => {...})`     | **保持相同**           |
| `mounted`            | `mounted`            | `onMounted(() => {...})`         | **保持相同**           |
| `beforeUpdate`       | `beforeUpdate`       | `onBeforeUpdate(() => {...})`    | **保持相同**           |
| `updated`            | `updated`            | `onUpdated(() => {...})`         | **保持相同**           |
| 🟢 `beforeDestroy`   | 🟢 `beforeUnmount`   | 🟢 `onBeforeUnmount(() => {...})` | **重命名** (语义优化)  |
| 🟢 `destroyed`       | 🟢 `unmounted`       | 🟢 `onUnmounted(() => {...})`     | **重命名** (语义优化)  |


### 五、Vue3中ref和reactive的本质企区别有哪些？

### `ref` vs `reactive` 完整对比表

| 特性                | `ref`                          | `reactive`                    |
|---------------------|-------------------------------|-------------------------------|
| **数据类型**         | 任意类型（基本类型 + 对象）    | 仅对象类型（Object/Array 等） |
| **访问方式**         | 通过 `.value`                 | 直接访问属性                 |
| **响应式原理**       | 基本类型：`getter/setter`<br>对象：内部调用 `reactive`（Proxy） | `Proxy` |
| **模板解包**         | 自动解包（无需 `.value`）      | 直接使用属性                 |
| **重新赋值**         | 支持（通过 `.value` 替换）     | ❌ 不支持（会破坏响应性）     |
| **解构行为**         | 解构后仍需通过 `.value` 保持响应性 | ❌ 解构后失去响应性          |
| **TypeScript**       | 需显式泛型（如 `ref<number>()`） | 自动推断类型                |

> `reactive`解构后如何保持响应式？

&emsp;&emsp;由于`Proxy`的局限性，`reactive`的响应式依赖于`Proxy`拦截对象的属性访问，而解构后的变量变为独立的值副本则无法被Proxy追踪；
```js
const state = reactive({ count: 0 });
const { count } = state; // 解构后，count 是普通变量
count++; // ❌ 不会触发更新
```
> 解决方案：① 直接访问原对象（不推荐解构）；② 使用`toRefs`将`reactive`对象的每个属性转换为`ref`从而保持响应式;
```js
import { toRefs } from 'vue';
const state = reactive({count: 0});
const { count } = toRefs(state); // 现在count是ref

count.value++; // 继续保持响应式
```

### 六、Vue2中nextTick的作用及实现原理
&emsp;&emsp;**① 作用**：`nextTick`的作用是延迟执行一段代码到下一次`DOM更新周期`之后，以保证操作基于最新的DOM状态。
```js
this.message = 'updated';
this.$nextTick(() => {
  console.log(this.$el.textContent); // 确保拿到更新后的 DOM
});

```
&emsp;&emsp;**② 原理**：Vue的响应式更新是`异步批量处理`的，直接修改数据后立即回去DOM可能得到的是旧状态，`nextTick`则用于在`数据变化+DOM更新`完成后执行调用；

&emsp;&emsp;Vue2的`nextTick` 实现依赖异步任务队列机制，优先使用微任务（`Promise.then和MutationObserver）`，然后降级为宏任务`（setImmediate和setTimeout）`;

&emsp;&emsp;**③ 优先级关系**：	`Promise.then` > `MutationObserver`> `setImmediate` >` setTimeout`

&emsp;&emsp;**注意**：Vue3的`nextTick`同样基于微任务但实现更加简洁，直接使用`Promise.then`，无需降级处理。


### 七、Vue3中`watch`和`watchEffect`的区别

####  **watch特点**
- **显式声明依赖**：需要明确制定要监听的对象和以及回调函数；
- **惰性执行**：默认不会立即执行，只有依赖变化时才触发；
- **旧值与新值**：在回调函数中获取oldValue和newValue;
- **精确控制**：适用于需要明确知道哪些状态变化时触发逻辑的场景；
```js
import { watch } from 'vue';

// 监听单个 ref
const count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

// 监听 reactive 对象的某个属性
const state = reactive({ user: { name: 'Alice' } });
watch(() => state.user.name, (newName, oldName) => {
  // 深层次属性需用函数返回
});

```
####  **watchEffect特点**
- **自动收集依赖**：回调中访问的任何响应式数据都会被自动跟踪；
- **立即执行**：初始化时就会运行一次，后续依赖变化时再触发；
- **无旧值**：回调中无法直接获取变化前的值;
- **简洁性**：适合依赖关系简单的逻辑;

```js
import { watchEffect } from 'vue';

const count = ref(0);
const state = reactive({ user: { name: 'Alice' } });
watchEffect(() => {
  // 自动监听所有内部使用的响应式数据（count 和 state.user.name）
  console.log(`Count: ${count.value}, Name: ${state.user.name}`);
});

```

### 八、Vue3中`Suspense`组件的作用是什么
&emsp;&emsp;`<Suspense>`是Vue3内置组件，用于<u>*协调对异步依赖的处理*</u>，如在异步内容加载完成前显示`fallback`内容（如loading），加载完成后显示实际内容。

**① 基本用法**
```html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

**② 支持的异步场景**
- 异步组件（`defineAsyncComponent`）
- 组件`setup()`中的异步操作（返回Promise）
- 嵌套的异步组件树

**③ 核心特性**
- **自动等待**：等待所有异步依赖完成后再渲染
- **错误边界**：可配合`onErrorCaptured`处理异步错误
- **嵌套支持**：父子Suspense可独立工作

### 九、Vue3响应式系统中`effectScope`的作用是什么？
&emsp;&emsp;`effectScope`是Vue3中用于`批量管理控制响应式副作用 (即计算属性和侦听器)` 的API，可以将多个effect（如`watchEffect`、`computed`等）收集到一个作用域中，实现统一创建和销毁。

**① 核心作用**
- **批量管理**：统一收集和管理多个响应式副作用
- **内存优化**：避免组件外部effect导致的内存泄漏
- **嵌套支持**：支持父子scope的嵌套关系

**② 基本用法**
```js
import { effectScope, watchEffect, computed } from 'vue'

// 创建独立作用域
const scope = effectScope()

scope.run(() => {
  // 这些effect会被收集到scope中
  const doubled = computed(() => count.value * 2)
  watchEffect(() => console.log(doubled.value))
})

// 一次性停止所有相关副作用
scope.stop() // 清理所有effect，释放内存
```

### 十、Vue3中`v-if`和`v-for`的优先级关系是怎样的？

Vue3中：**v-if 比 v-for 的优先级更高**

Vue2中：**v-for 比 v-if 的优先级更高**

同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显，可以优先使用计算属性或 `<template>` 解耦。
```js
//❌ bad
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
//✅ good
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

### 十一、Vue2中混入mixin的合并策略有哪些？
- *数据对象data* → 递归合并，发生冲突时组件数据优先覆盖混入数据。
- *生命周期钩子* → 合并为数组，混入钩子先执行，组件钩子后执行。
- *需要对象值的选项* → 合并到同一个对象中，当这些对象中存在冲突的键时，组件的选项将优先考虑。

[参考文档](https://v2.vuejs.org/v2/guide/mixins.html)

### 十二、TS中泛型的主要作用
&emsp;&emsp;泛型是TypeScript的核心特性，主要作用是创建可复用的类型安全代码，它允许在定义函数、类或接口时使用参数类型的占位符，使用时再制定类型，从而增加代码的灵活性和复用性。

**① 核心作用**
- **类型复用**：一个函数/类/接口处理多种类型
- **类型安全**：编译时保证类型正确性，避免运行时错误
- **代码复用**：避免为不同类型重复写相似代码
- **类型推断**：让TypeScript自动推断和验证类型关系
- **应用丰富**：泛型函数、泛型接口、泛型等

**② 基本语法与应用**
```typescript
// 1. 泛型函数 - 保持输入输出类型一致
function identity<T>(arg: T): T {
  return arg;
}

const result1 = identity<string>("hello");    // 显式指定类型
const result2 = identity(42);                 // 自动推断为number类型

// 2. 泛型接口 - 创建灵活的数据结构
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "张三" },
  success: true,
  message: "获取成功"
};

// 3. 泛型类 - 类型安全的容器
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);      // ✅ 正确
// numberStack.push("a"); // ❌ 编译错误
```

**③ 高级特性**
```typescript
// 泛型约束 - 限制泛型类型的能力
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 确保T有length属性
  return arg;
}

// 多个泛型参数
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// 条件类型 - 根据条件选择类型
type IsArray<T> = T extends any[] ? true : false;
type Test1 = IsArray<string[]>;   // true
type Test2 = IsArray<number>;     // false
```


### 十三、TS中那些类型工具可将对象所有属性变为可选？
&emsp;&emsp;TS提供了多种类型工具来将对象的所有属性变为可选，主要包括内置工具类型和自定义实现方式。

**① 内置工具类型 - `Partial<T>`**
```typescript
// 原始接口
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
// 使用Partial<T>将所有属性变为可选
type PartialUser = Partial<User>;
// 等价于：
// type PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }
// 实际应用
const updateUser = (id: number, updates: Partial<User>) => {
  // 可以只传递需要更新的字段
  // updates 可以是 { name: "新名字" } 或 { email: "new@email.com" }
};
updateUser(1, { name: "张三" });           // 只更新name
updateUser(2, { email: "new@test.com" });  // 只更新email
```
**⚠️ 注意事项**
- `Partial<T>`只作用于第一层属性，嵌套对象需要使用`DeepPartial`
- 过度使用可选属性可能导致类型安全性降低
- 在实际使用时要确保必要的属性检查和默认值处理


### 十四、Webpack中loader和plugin的本质区别
#### **Loader**
- **本质**：针对单个文件的`转译器`。
- **核心功能**：将非 JS 文件（如 `.css`、`.vue`、`.png`）转换为 Webpack 能处理的模块（如 JS 字符串、Base64 编码等）。
- **执行时机**：在模块加载阶段（Module Resolution）执行，属于**文件级别的处理**。
- **特点**：
  - 链式调用（从右到左或从下到上）。
  - 输入和输出通常是文件内容（字符串/Buffer）。

**示例**：
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // 先用 css-loader 解析 CSS，再用 style-loader 注入样式
      }
    ]
  }
};
```
#### **Plugin**
- **本质**：Webpack 事件钩子的`扩展器`。
- **核心功能**：监听 Webpack 打包过程中的生命周期事件（如 `emit`、`compile`），实现打包优化、资源管理等**全局性操作**。
- **执行时机**：贯穿整个 Webpack 构建流程，可干预`编译、优化、输出`等阶段。

### 十五、关于CSRF攻击防护有哪些有效措施
**核心防护措施（3个基础方法）**
> **CSRF Token验证**：最常用的防护手段，后端生成前端验证

> **SameSite Cookie属性**：从Cookie层面限制跨站请求

> **验证HTTP Refere**：检查请求来源的合法性

**前端实现最佳实践（2个实用技巧**）
> **敏感操作二次确认**：重要操作要求用户重新认证

> **短期Token机制**：使用有时效性的Token增强安全性

### 十六、JS中Map与Object的关键区别有哪些
&emsp;&emsp;Map和Object都是JS中用于存储键值对的数据结构，但它们在设计理念和使用场景上有显著差异。

**① 核心区别对比表**
| 特性 | Map | Object |
|------|-----|--------|
| **键类型** | 任意类型（对象、函数、基本类型） | 字符串、Symbol |
| **大小获取** | `map.size` | `Object.keys(obj).length` |
| **迭代方式** | 直接可迭代（for...of） | 需要转换（Object.keys/values/entries） |
| **插入顺序** | 保持插入顺序 | ES2015+保持插入顺序 |
| **原型链** | 默认无原型（干净） | 继承Object.prototype |
| **性能** | 频繁增删操作更快 | 小数据量读取稍快 |
| **JSON序列化** | 不支持 | 直接支持 |

**💡 选择建议**
- **使用Map**：需要非字符串键、频繁增删、需要迭代、关心大小
- **使用Object**：配置对象、JSON序列化、小数据量、习惯对象语法




