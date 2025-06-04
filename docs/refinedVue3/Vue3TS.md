# Vue3.0 + TS

### 1、类型标注

&emsp;&emsp;① 组件的Props标注类型
```js
// 方式一：基于类型的声明，直接在defineProps上进行类型标注
const props = defineProps<{ foo: string; bar?: number }>();

//方式二：使用interface接口的方式
interface Props {
  foo: string;
  bar?: number;
}

const props = defineProps<Props>();

// props解构默认值

const { foo = ["测试1", "测试2"], bar = 100 } = defineProps<Props>()
```