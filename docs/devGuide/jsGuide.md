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

###  1.2 类型检测
 类型检测优先使用 typeof。对象类型检测使用 instanceof。null 或 undefined 的检测使用 == null。[建议]

- #### 示例
    ```js
    // string
    typeof variable === 'string'

    // number
    typeof variable === 'number'

    // boolean
    typeof variable === 'boolean'

    // Function
    typeof variable === 'function'

    // Object
    typeof variable === 'object'

    // RegExp
    variable instanceof RegExp

    // Array
    variable instanceof Array

    // null
    variable === null

    // null or undefined
    variable == null

    // undefined
    typeof variable === 'undefined'
    ```
### 1.3 类型转换
 转换成 `string` 时，使用 `+ ''`。[建议]

- ### 示例
    ```js
    // good
    num + '';

    // bad
    new String(num);
    num.toString();
    String(num);
    ```
    转换成 `number` 时，通常使用`+`。[建议]

    ```js
    // good
    +str;

    // bad
    Number(str);
    ```
`string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`，且使用 `parseInt` 时，必须指定进制。[建议]

- #### 示例
    ```js
    // string转化为number
    var width = '200px';

    // 参数1：被解析的值；参数2：被解析值的进制（10进制）

    // bad
    parseInt(str);

    // good
    parseInt(width, 10); // 200
    ```
转换成 boolean 时，使用 !!。[建议]

- #### 示例

    ```js
    let num = 3.14;
    let num1 = '';

    !!num; // true
    !!num1; // false
    ```
`number` 去除小数点，使用 `Math.floor / Math.round / Math.ceil`。
- #### 示例

    ```js
    // good
    var num = 3.14;
    // 向下取整
    Math.floor(num); // 3

    // 向上取整
    Math.ceil(num); // 4

    // 四舍五入取整
    Math.round(num); // 3

    // bad
    var num = 3.14;
    parseInt(num, 10); // 3
    ```

### 1.4 变量
#### 1.4.1 变量声明方式对比
| 关键字       | 作用域     | 是否提升 | 可重复声明 | 规范适用场景                         |
|--------------|------------|----------|------------|--------------------------------------|
| `var`        | 函数作用域 | ✅        | ✅          | **遗留代码**（现代项目应避免使用）    |
| `let`        | 块级作用域 | ❌        | ❌          | 需要重新赋值的变量（循环计数器等）    |
| `const`      | 块级作用域 | ❌        | ❌          | **默认选择**（常量、对象引用等）      |
| `function`   | 块级作用域 | ✅        | ✅          | 函数声明（优先使用 const + 箭头函数） |

#### 1.4.2 变量命名
| 类型               | 命名风格       | 示例                      |
|--------------------|----------------|---------------------------|
| 普通变量/参数      | camelCase/语义单词      | `userName`, `maxCount`，`price`    |
| 常量               | UPPER_SNAKE    | `API_TIMEOUT`, `COLORS`   |
| 类/构造函数        | PascalCase     | `class UserModel`         |
| Boolean 类型变量   | is/has/can 开头 | `isVisible`, `hasLicense` |

---
- **示例：**

    ```js
        firstName = "John";
        lastName = "Doe";

        price = 19.90;
        tax = 0.20;

        fullPrice = price + (price * tax);
    ```

#### 1.4.3 声明优先级原则

- **首选 `const`**  
  任何不需要重新赋值的变量都应使用 `const`，即使对于对象和数组（因为引用不变）：

    ```javascript
  const PI = 3.14159;
  const config = { apiUrl: '/endpoint' };
    ```
- **次选 `let`**  
仅当需要重新赋值时使用：
    ```typescript
  let count = 0;
  count = 1; // 允许重新赋值
    ```

- **禁用 `var`**  
  避免变量提升和函数作用域导致的逻辑问题：
    ```javascript
  // ❌ 错误示例
  for (var i = 0; i < 10; i++) { /*...*/ }
  console.log(i); // 仍然可以访问（不符合预期）
    ```
#### 1.4.4 TypeScript 增强规范
#### 优先让 TS 自动推断类型，仅在以下情况手动添加类型：
- 避免冗余类型
    ```ts
    //  冗余 bad
    const count: number = 0;

    //  自动推断 good
    const count = 0;

    //  需要明确契约的公共 API good
    interface User {
        id: number;
        name: string;
    }
    //  复杂初始化场景 good
    let items: Array<string | number> = [];
    items = ['text', 42];

    ```