# 开发日志
### 1、前端常见的错误异常类型有哪些？

&emsp;&emsp;常见错误类型：

&emsp;&emsp;**① SyntaxError：** 解析时发生语法错误，该错误是在构建时发生，非运行时发生，所以无法捕获；

&emsp;&emsp;**② TypeError:** 类型错误，表示不是所期待的类型；

&emsp;&emsp;**③ ReferenceError：** 引用未声明的变量；

&emsp;&emsp;**④ RangeError：** 当一个值不在所允许的范围或集合中；

&emsp;&emsp;**⑤ ResourceError：** 指网络资源加载错误；

### 2、如何监控和捕获项目中的错误异常？

&emsp;&emsp;**①  try...catch：** try..catch作为常用的一种捕获方式，但是只能捕获`运行错误`、`同步错误等`，无法捕获`编译错误`、`异步错误`；而Async/Await是用同步的方法执行异步操作，所以可以在执行过程中使用try...catch进行异步捕获；
```js
try {
  // 尝试执行的代码
} catch (error) {
  // 捕获并处理错误
} finally {
  // 无论是否发生错误，都会执行的代码（可选）
}
//在async/await中使用try...catch
async function myFunction() {
  try {
    const result = await someAsyncOperation(); // 等待异步操作完成
    console.log(result);
  } catch (error) {
    console.error('捕获到错误:', error.message); // 处理错误
  }
}
```

&emsp;&emsp;**②  window.onerror：** window.onerror会返回6个参数，包括错误信息、出错文件、行号、列号、出错对象；但无法捕获编译错误、资源错误；更适合用于错误日志的记录；
```js
window.onerror = function(message, source, lineno, colno, error) {
  console.error('捕获到错误:');
  console.error('消息:', message);
  console.error('文件:', source);
  console.error('行号:', lineno);
  console.error('列号:', colno);
  console.error('错误对象:', error);
  return true; // 阻止默认错误提示
};
// 触发一个错误
undefinedFunction(); // 调用未定义的函数
捕获到错误:
消息: Uncaught ReferenceError: undefinedFunction is not defined
文件: http://example.com/script.js
行号: 10
列号: 5
错误对象: ReferenceError: undefinedFunction is not defined
```

&emsp;&emsp;**③  window.addEventListener('unhandledrejection')：** 无论是Promise还是Async/Await都可以使用这个方法来进行监听捕获；
```js
window.addEventListener('unhandledrejection', function(event) {
  console.error('捕获到未处理的 Promise 拒绝:');
  console.error('原因:', event.reason);
  console.error('Promise 对象:', event.promise);
});
// 未处理的 Promise 拒绝
Promise.reject(new Error('这是一个未处理的错误'));
```
&emsp;&emsp;**④  vue.config.errorHandler：** 只要是Vue中的组件报错都会被这个回调函数捕获,会返回三个参数：错误信息、组件实例、错误上下文信息；
```js
Vue.config.errorHandler = function(err, vm, info) {
  console.error('捕获到 Vue 错误:');
  console.error('错误信息:', err.message);
  console.error('组件实例:', vm);
  console.error('错误上下文:', info);
};
```

&emsp;前端异常监控第三方插件：Fundebug([查看ES6官网文档地址](https://www.fundebug.com/))、Sentry([查看ES6官网文档地址](https://sentry.io/welcome/))；