# TS 入门基础

## 1、概述
&emsp;&emsp;① 简介：TS作为JS语言的超集，在JS语言的基础上扩展了许多新的特性，并且兼容ES6/ES5等语法；

&emsp;&emsp;② 新增特性：静态类型检查、类型推导、类型断言as、类型别名、接口声明、元组、枚举、泛型、支持ES模块化规范、访问控制修饰符(`public/protected/private`)、类和抽象类abstract等；

&emsp;&emsp;③ 新增类型：`any任意类型`、`enum枚举类型`、`ruple元组类型`、`unknown未知类型`、`void无返回值`、`never`、`symbol`

&emsp;&emsp;**附：**
| 修饰符   | 类内部访问 | 子类访问 | 实例访问 | 默认行为       | 典型场景                          |
|----------|------------|----------|----------|----------------|-----------------------------------|
| public   | ✅          | ✅        | ✅        | 默认修饰符     | 公开接口、外部可直接调用的方法    |
| private  | ✅          | ❌        | ❌        | 无             | 内部实现细节、敏感数据            |
| protected| ✅          | ✅        | ❌        | 无             | 需要被子类继承/重写的成员         |

## 2、基本结构之声明
### 重点：

&emsp;&emsp;① 接口`interface`：用于描述对象的形状，接口可以继承和扩展。

&emsp;&emsp;② 类型别名：别名可以将多个类型组合进行统一处理为一个自定义类型，进行共同推导，类似于||与运算类型；允许为对象类型、联合类型、交叉类型等定义别名。

&emsp;&emsp;③ 类型断言：类型断言可以用过`as`标识符，来强制指定某一推导变量的类型。

&emsp;&emsp;④ 泛型：提供了在定义函数、接口或类时不需要预先指定具体类型，而是使用占位符，在使用时再指定类型的特性。
```js
//类型声明
const name: string = "Alice";
const age: number = 25;
//接口声明
interface Person {
  name: string;
  age: number;
}
const person = <Person>{
  name: "Tom",
  age: 26
};

//函数声明
function greet(name: string, age: number): Object {
  return {
    name: name,
    age: age
  };
}
//箭头函数声明
const arrowFun = (name: string, age: number): any => {
  return {
    name: name,
    age: age
  };
};
//类声明
class Car {
  brand: string;
  price: number;

  constructor(brand: string, price: number) {
    this.brand = brand;
    this.price = price;
  }

  getName() {
    return `This a ${this.brand} car.This car is ${this.price} $.`;
  }
}
let benzCar = new Car("Benz", 1800);
// 类型别名：可以为对象类型、联合类型、交叉类型等定义别名，别名可以将多个类型进行共同推到，类似于||与运算类型；
type ID = string | number;
const id: ID = "身份证号";
const idNo: ID = 522428123456;
import { func } from "vue-types";
//模块导入导出：将类封装到单独的ts文件中在引入使用，降低代码耦合度
import { Schools } from "./utils/tsExport";
let schoolsObj = new Schools("深圳大学", 500);

// 类型断言：当TS无法判断变量的准确类型时，就可以使用类型断言来为遍历强制指定类型,即允许一种变量的类型变为另一种类型
let value: any = '类型断言'
let strLebgth: number = (value as string).length
// 泛型：泛型可以允许在定义接口、函数、类时不指定具体的类型，而是使用占位符，让用户在使用时才传入具体的类型，从而增加代码复用性和类型安全性
function identity<T>(arg: T): T {
  return arg;
}

// 类型推断：即使不指定任何类型TS也会推断出变量的类型
let typeJudge = '类型推断';

// 类型守卫：即typeof和instanceof用于在运行时缩小类型范围
function typeProtect(value: any): value is string {
  return typeof value === 'string' // true or false
}

// 异步编程：Promise结合TS语法使用
async function fetchData(): Promise<string> {
  const response = await fetch('https://example.com')
  const data = await response.text();
  return data
}

```
## 3、基本类型的使用
### 重点类型：
&emsp;&emsp;① 元组类型：已知数量和子集类型的数组；

&emsp;&emsp;② 枚举类型：来定义一组命名常量，默认枚举值从0开始递增，可以限制类型只能传入枚举字段；使用场景包括：状态码管理、权限角色管理控制；

&emsp;&emsp;③ 联合类型：定义可以是多种类型之一，使用|符号分割；

&emsp;&emsp;④ 类型断言as：明确编译器变量的类型，常用于无法推断类型的情况,当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。若并非互为子集又要使用断言可以用any类型代替；

&emsp;&emsp;⑤ unknown类型：与any类似，但是更加严格，必须通过类型检查才能赋值给其他类型变量；

```js
let stringS: string = '字面量类型';
let numberN: number = 123321;
let booleanB: boolean = true;
let arrayA: number[] = [1, 2, 3];
let arrayB: Array<string> = ['a', 'b', 'c'];
let arrayC: Array<object> = [
  {id:0, name:'Bob'},
  {id:1, name:'Tom'}
]
let arrayD: Array<any> = [1, 2, 'a', 'b']
let objA: object = { name:'Alex', age:25}
// 元组类型：表示已知数量和类型的数组
let tupleA: [string, number] = ["Alice", 25];
//枚举：用来定义一组命名常量，默认枚举值从0开始递增，可以限制类型只能传入枚举字段；使用场景包括：状态码管理、权限角色管理控制
enum Color {
  Red,
  Blue = 200,
  Yellow
}
let enumColor: Color = Color.Blue;
function eumFun(val: Color): object {
  return {
    'param':val
  }
}
// any任意类型
let anyA: any = '任意类型字符串';
let anyB: any = 123321;

// 空类型
let voidMsg: string = '';
function logMessage(msg: string): void {
  console.log('空类型',msg);
  voidMsg = msg;
}
logMessage('空类型void')

// 联合类型：可以是多种类型之一，使用|符号分割
let unionA: number | string | boolean;
unionA = '联合类型';

// unknown不确定的类型：与any类似，但是更加严格，必须通过类型检查才能赋值给其他类型变量
let unknownA: unknown = 'Hello'
if (typeof unknownA === 'string') {
  let msg: string = value;
}
// 类型断言：明确编译器变量的类型，常用于无法推断类型的情况
// 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。
// 完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。
// 类型断言与类型转换的区别在于，转换是运行时的支持，断言是编译时支持
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length

//字面量类型：可以让变量拥有特定的值
let direaction: "up" | "down" | "left" | "right"
direaction = 'right'


```

## 4、变量声明和事件循环
&emsp;&emsp; ① 变量作用域：全局作用域、类作用域、实例作用域、静态作用域、局部作用域；
```js
var global_num = 12; // 全局作用域
class Numbers {
  num_val = 13; //实例变量
  static sval = 10; //静态变量

  storeNum(): void {
    var local_num = 14; //局部作用域
  }
}
let valObj = new Numbers();
```

&emsp;&emsp; ② 事件循环：先声明，后循环
```js
// 事件循环
// for...in循环 : 先声明，后循环
var inJ: any;
var inI: any = "a b c";
for (inJ in inI) {
  console.log(inI[inJ]);
}
// for...of循环:允许遍历各种类型遍历，数组、字符串、Maps映射、Sets集合
let someArray = [1, 'string', false];
for (let entry of someArray) {
  console.log("for...of循环",entry);
}
```

## 5、函数的使用
&emsp;&emsp; 定义：函数是一组一起执行一个任务的语句，函数声明需要告诉编译器函数的名称、返回类型和参数。

&emsp;&emsp; ① 默认参数/可选参数/返回值声明 ：除了可选参数以外，默认参数通常都是必须传入的，可选参数使用？号标识。注意：可选参数必须放在默认参数后面，除非参数都是可选的；

```js
function buildName(firstName: string, lastName?: string, age: number = 18) {
  if (lastName)
    return firstName + "" + lastName + "年龄(默认值)" + age;
  else
    return firstName;
}
let nameResult = buildName("Li")
let nameResult01 = buildName("Li","Hua")
```

&emsp;&emsp; ② 剩余参数：当我们不确定需要传多少个参数给函数时，就可以使用剩余参数；注意：函数的最后一个命名由 `...` 为前缀
```js
function buildShengName(firstName: string, ...restOfName: string[]) {
  return firstName + "" + restOfName.join("")
}
let employeeName = buildName("Joseph", "Samuel");
function shengyuName(firstName: string, ...lastName: string[]) {
  return `${firstName}${lastName.join('')}`
}
```
&emsp;&emsp; ③ 匿名函数：在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。通常将函数赋值给一个变量，形成一个函数表达式；
```js
let noNameFun = function (name: string, age: number): string {
  return `姓名：${name} 年龄：${age}`;
};
// 调用函数时传入正确的参数
console.log(noNameFun("Anna", 12));
// 匿名函数自调用
(function () {
  let x = "Hello!!";
  console.log(x);
})();
//语法：var res = function([arguments]) { ... }
let noNameFuns = function () {
  return "noNameFun匿名函数"
}
```
&emsp;&emsp; ④ 构造函数：传参（多个参数数组+执行函数）
```js
// 语法格式：var res = function([arg1[,arg2[,...argN]]，] functionBody)
var myFunction = new Function("a", "b", "return a * b");
var x = myFunction(4, 3)
// 递归函数:在函数内部直接或间接调用函数本身,注意需要设定中断条件避免陷入死循环
function factorial(number) {
  if (number <= 0) {
    return 1
  } else {
    return (number * factorial(number - 1));
  }
}
```
&emsp;&emsp;构造函数语法：`var res = new Function ([arg1[, arg2[, ...argN]],] functionBody)` 

&emsp;&emsp; ⑤ 递归函数：指在函数内部直接或间接调用函数自身,注意需要设定中断条件避免陷入死循环
```js
function factorial(number) {
  if (number <= 0) {
    return 1
  } else {
    return (number * factorial(number - 1));
  }
}
```
&emsp;&emsp; ⑥ 箭头函数：
```js
// 语法格式：(arg) => {} / 表达式
var fooArrow = (x:number) => 10+x

```
&emsp;&emsp; ⑦ 函数重载：特点包括方法名相同，但是参数不相同（类型不同、数量不同、顺序不同），而返回值既可相同，也可不同
```js
// 而每个重载的方法都必须有一个独一无二的参数列表
// 注意：避免过度使用，优先使用联合类型和可选参数，更加简洁高效；
function disp(s1: string): void;
function disp(n1: number, s1: string): void;
function disp(x: any, y?: any) {
  return `${x}${y?y:''}`
}
// 应用场景：处理多种输入类型、API接口设计、类型守卫和联合类型、兼容旧代码
type Input = string | number[]
// 重载细化返回的类型
function reHandle(input: string): string[];
function reHandle(input: number[]): string;
function reHandle(input: Input): string[] | string {
  if (typeof input === "string") return input.split("");
  return input.join(",")
}
```