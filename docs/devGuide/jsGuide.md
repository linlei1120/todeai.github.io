# JS/TS编码规范

### 一、变量类型使用

### 1、 类型
### 1.1 JS/TS 类型
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
 类型检测优先使用 `typeof`,对象类型检测使用 `instanceof`,`null` 或 `undefined` 的检测使用 `== null`。[:memo:建议]

- **示例** 
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
 转换成 `string` 时，使用 `+ ''`。[:memo:建议]

- **示例**
    ```js
    // good
    num + '';

    // bad
    new String(num);
    num.toString();
    String(num);
    ```
    转换成 `number` 时，通常使用`+`。[:memo:建议]

    ```js
    // good
    +str;

    // bad
    Number(str);
    ```
`string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`，且使用 `parseInt` 时，必须指定进制。[:memo:建议]

- **示例**
    ```js
    // string转化为number
    var width = '200px';

    // 参数1：被解析的值；参数2：被解析值的进制（10进制）

    // bad
    parseInt(str);

    // good
    parseInt(width, 10); // 200
    ```
转换成 `boolean` 时，使用 `!!`。[:memo:建议]

- **示例**

    ```js
    let num = 3.14;
    let num1 = '';

    !!num; // true
    !!num1; // false
    ```
`number` 去除小数点，使用 `Math.floor / Math.round / Math.ceil`。
- **示例**

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
### 2、 变量
#### 2.1 变量声明方式对比
| 关键字       | 作用域     | 是否提升 | 可重复声明 | 规范适用场景                         |
|--------------|------------|----------|------------|--------------------------------------|
| `var`        | 函数作用域 | ✅        | ✅          | **遗留代码**（现代项目应避免使用）    |
| `let`        | 块级作用域 | ❌        | ❌          | 需要重新赋值的变量（循环计数器等）    |
| `const`      | 块级作用域 | ❌        | ❌          | **默认选择**（常量、对象引用等）      |
| `function`   | 块级作用域 | ✅        | ✅          | 函数声明（优先使用 const + 箭头函数） |

#### 2.2 变量命名
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

#### 2.3 声明优先级原则

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
#### 2.4 TypeScript 增强规范
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


### 二、 函数定义规范

#### 2.1  优先使用箭头函数 
&emsp;&emsp;箭头函数是ES6引入的简洁函数语法，主要特点包括无自己的`this`和`arguments`绑定（继承外层上下文）、不可作为构造函数。但是箭头函数更加简洁，

&emsp;&emsp;:heavy_check_mark:**适合用于**: 需要保持`this`一致性的回调（如事件处理、定时器）、短小的数组方法（map/filter）、以及需要避免`this`绑定问题的场景；

&emsp;&emsp;:x:**不适合用于**: 需要动态`this`的对象方法、构造函数或需要函数提升的场景。
```javascript
//  Good：简洁语法 + 自动绑定外层 this
const calculate = (x, y) => x * y;

// Good: 回调场景更清晰
button.addEventListener('click', () => {
  validateForm();
});
```

&emsp;&emsp;:warning:**特殊情况使用`function`声明：**
```javascript
// 1. 需要动态上下文的函数(获取this)
document.getElementById('btn').addEventListener('click', function() {
  console.log(this); // 指向触发元素
});

// 2. 构造函数（箭头函数不能new）
function Person(name) {
  this.name = name;
}
```
| 特性                    | 普通函数 | 箭头函数 |
|-----------------------|--------|--------|
| 绑定自己的`this`         | ✓      | ✗      |
| 可作为构造函数            | ✓      | ✗      |
| 有`arguments`对象       | ✓      | ✗      |
| 有`prototype`属性      | ✓      | ✗      |
| 支持`yield`(生成器函数)   | ✓      | ✗      |
| 上下文绑定的`super`      | ✓      | ✗      |
| 语法简洁度              | ✗      | ✓      |

#### 2.2 参数默认值规范
```javascript
// Good: 推荐：ES6默认值语法
const createUser = (name, role = 'member', isActive = true) => ({...});

// Good: 默认值可以是表达式
const fetch = (url, cacheTime = 60 * 5) => {...} // 5分钟缓存

// ⚠️ 注意事项：
// - 默认参数应放在参数列表末尾
// - 避免使用 || 运算符（0/false会被覆盖）
const setVolume = (level = 50) => {...} 
```

#### 2.3 参数解构最佳实践
```javascript
// Good: 对象解构：直接获取深层属性
const renderProfile = ({ 
  user: { 
    name, 
    avatar = '/default.png'  // 嵌套默认值
  }, 
  theme = 'light' 
}) => {...}

// Good: 数组解构：交换变量/忽略元素
const rotateCoordinates = ([x, y]) => [y, -x];
const [, secondItem] = getItems();

// ⚠️ 需显式命名参数时：
const handleEvent = (payload) => {
  const { type, data } = payload;  // 明确声明参数来源
  ...
}
```
#### 2.4 匿名函数使用

&emsp;&emsp;匿名函数没有显式名称，可直接作为值传递，避免污染外部命名空间；在使用匿名函数当作参数的场合，也尽量用箭头函数代替，因为这样更简洁。但是匿名函数的缺点包括：无法复用、箭头函数形式的匿名函数会继承外围`this`。
```js
const nums = [1, 2, 3];
// bad 
nums.map(function (item) {
  return item * 2;
});

// good
nums.map((item) => {
  return item * 2;
});

// best
const doubled = nums.map(item => item * 2);

// 其他应用场景
// Promise链式调用
fetch('/api/data')
  .then(response => response.json()) // 匿名箭头函数
  .then(data => console.log(data));

// 动态函数生成
const createMultiplier = factor => num => num * factor; // 返回匿名函数
const double = createMultiplier(2);
console.log(double(5)); // 输出10
```

#### 2.5 补充最佳实践 
&emsp; ① **函数长度控制**

&emsp;&emsp; 单功能原则：函数不超过20行 :bangbang:

&emsp;&emsp; 超过3个参数时改用对象参数：:bangbang:

 ```js
    // Good：对象传参清晰明了
    const updateUser = ({ id, name, role, status }) => {...}

    // Bad： 超过3个难以阅读
    const updateUser = (id, name, role, status) => {...}
```

&emsp; ② **纯函数优先**

&emsp;&emsp;纯函数是函数式编程中的核心概念，具备两个关键特性:相同输入必定得到相同输出、不产生副作用；
   ```javascript
   // Good： 无副作用：相同输入始终返回相同输出
   const calculateTax = (income, rate) => income * rate;
   
   // Bad： 避免：修改外部状态
   let total = 0;
   const addToTotal = (num) => total += num;
   ```

&emsp; ③ **返回值一致性**
   ```javascript
   // Good： 明确返回类型
   const parseInput = (input) => {
     if (!input) return null;     // 统一返回null
     return JSON.parse(input);
   }
   ```

&emsp; ④ **异步函数标识**
   ```javascript
   // Good： 使用async/await代替回调
   const loadData = async (url) => {
     try {
       const res = await fetch(url);
       return res.json();
     } catch (e) {
       logError(e);
       return [];
     }
   }
   ```