# 前端常用编码指南

### 1、return关键字及卫语句的使用
**优点：**

‌&emsp;&emsp;**①执行流控制 (核心区别) ：**  立即退出当前函数，避免执行后续无关代码；在复杂逻辑中可减少嵌套层级，提升代码可读性；

‌&emsp;&emsp;**②防御性编程：**  符合 "快速失败" 原则，尽早处理特殊情况；减少意外修改其他状态的风险；

‌&emsp;&emsp;**③表达式特性利用：**  赋值表达式本身会返回被赋的值；符合函数式编程特性；

‌&emsp;&emsp;**业务场景：** 前置检查非法参数、状态拦截、性能优化（减少不必要的计算）
**示范：** 
```js
// 传统嵌套写法 (需阅读完整个代码块才能理解逻辑)
function process(params) {
  if (params.type === 1) {
    // 大量业务逻辑...
  } else {
    if (params.type === 2) {
      this.$refs.inputBar.msg = params.value
    }
  }
}

if (params.type === 2) return (this.$refs.inputBar.msg = params.value);

// 带 return 更安全
function process(params) {
    if (params.type === 2) {
        return this.$refs.inputBar.msg = params.value
    }
    // 确保只在条件不满足时执行
    this.sensitiveOperation()
}

// 箭头函数中的 return 行为
const handler = () => {
    if (params.type === 2) return this.$refs.inputBar.msg = params.value
    // 等效于
    if (params.type === 2) { 
        return (this.$refs.inputBar.msg = params.value)
    }
}
```

### 2、解构赋值使用
‌&emsp;&emsp;在 ES6 中，解构赋值（Destructuring Assignment）是一种 高效提取数据的语法；

[解构赋值参考文档](https://es6.ruanyifeng.com/#docs/destructuring)

**解构赋值优势及场景**
|      特性   | 优势 | 应用场景 |
|----------|------------|----------|
| 简洁性   | 减少临时变量          | ✅API响应处理        |
| 可读性  | 	直观显示数据结构          | ✅函数参数解析        |
| 灵活性| 	支持嵌套和组合          | ✅模块导入优化        | 
| 安全性| 默认值防止错误          | ✅不确定数据源处理        | 

**示例：** 
✅API响应处理 
```js
 // API响应处理
 const res = {
  code: 200,
  data: {
    user: {
      id: 123,
      name: 'Alice',
      profile: {
        email: 'alice@example.com',
        social: ['twitter', 'github']
      }
    },
    meta: {
      timestamp: '2023-08-15T09:30:00Z'
    }
  }
}

 // 简单用法：
 let { code, data } = res;

// 复杂用法：
// 解构核心数据（带默认值和类型转换）
 let {
  code,
  data: {
    user: {
      id: userId,
      name,
      profile: {
        email = 'no-email', // 默认值
        social: [primarySocial] // 取第一个社交平台
      }
    },
    meta: {
      timestamp: responseTime
    }
  } = {} // 防止data未定义
 } = res || {} // 防止整个响应为空
 
 // 函数参数解析

 // 模块导入优化

 // 不确定数据源处理
```