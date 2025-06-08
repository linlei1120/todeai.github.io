# JS/TS编码规范

## 1、变量类型使用

### 1.1 类型
### JS/TS 类型
| 类型       | 示例                | 规范要点                                                                 |
|------------|---------------------|--------------------------------------------------------------------------|
| `boolean`  | `true`, `false`     | 避免隐式转换，明确使用 `===` 比较                                         |
| `number`   | `42`, `3.14`, `NaN` | 注意 `NaN` 需用 `isNaN()` 检测，大数用 `BigInt(ES2020)`                           |
| `string`   | `'text'`, `` `模板` `` | 优先使用模板字符串，避免 `new String()` 对象形式                          |
| `null`     | `null`              | 主动赋空值时使用，`typeof null` 返回 `object`（历史遗留问题）             |
| `undefined`| `undefined`         | 变量未赋值时的默认值，非主动赋值时出现                                     |
| `symbol`   | `Symbol('id')`      | 用作唯一对象属性键，适用于防止属性名冲突的场景                             |
| `bigint`   | `9007199254740991n` | ES2020发布通过在整数文字末尾添加n解决大整数精度问题，不能与 `number` 混用                                   |
| `any`             | `let foo: any = 'text'`       | **尽量避免**，失去类型检查优势。可用 `unknown` 替代                        |
| `unknown`         | `let bar: unknown = fetch()`  | 类型安全版的 `any`，使用前需类型断言或收窄                                  |
| `void`            | `function log(): void {}`     | 表示无返回值，与 `undefined` 区别在于可忽略返回值                           |
| `never`           | `function fail(): never {}`   | 表示永远不应到达的路径（抛出异常/无限循环）                                 |
| 