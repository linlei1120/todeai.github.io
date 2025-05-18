# 前端开发规范指南

## 目录
- [项目结构规范](#项目结构规范)
- [命名规范](#命名规范)
- [代码风格规范](#代码风格规范)
- [Git 工作流规范](#git-工作流规范)
- [文档规范](#文档规范)
- [性能优化规范](#性能优化规范)

## 项目结构规范

### 目录结构
```
project-root/
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源
│   │   ├── images/       # 图片资源
│   │   ├── styles/       # 样式文件
│   │   └── fonts/        # 字体文件
│   ├── components/        # 公共组件
│   ├── pages/            # 页面组件
│   ├── utils/            # 工具函数
│   ├── services/         # API 服务
│   ├── store/            # 状态管理
│   ├── hooks/            # 自定义 Hooks
│   └── types/            # TypeScript 类型定义
├── public/                # 公共资源目录
├── tests/                 # 测试文件
├── docs/                  # 项目文档
└── config/                # 配置文件
```

## 命名规范

### 文件命名
- 组件文件：使用 PascalCase，如 `UserProfile.tsx`
- 工具文件：使用 camelCase，如 `formatDate.ts`
- 样式文件：与组件同名，如 `UserProfile.scss`
- 测试文件：以 `.test` 或 `.spec` 结尾，如 `UserProfile.test.tsx`

### 变量命名
- 普通变量：使用 camelCase
```javascript
const userName = 'John';
let isLoading = false;
```

- 常量：使用大写下划线
```javascript
const MAX_COUNT = 100;
const API_BASE_URL = 'https://api.example.com';
```

- 组件命名：使用 PascalCase
```javascript
const UserProfile = () => { ... };
```

### CSS 类名
- 使用 BEM 命名规范
```css
.block__element--modifier
.user-card__avatar--large
```

## 代码风格规范

### JavaScript/TypeScript
- 使用 ESLint 和 Prettier 进行代码格式化
- 使用 TypeScript 进行类型检查
- 使用 2 空格缩进
- 使用单引号
- 语句末尾使用分号
- 使用 const 和 let，避免 var

### React 组件规范
```typescript
// 组件结构
import React from 'react';
import styles from './Component.module.scss';

interface Props {
  title: string;
  onAction: () => void;
}

export const Component: React.FC<Props> = ({ title, onAction }) => {
  // 1. hooks
  // 2. 状态声明
  // 3. 副作用
  // 4. 事件处理
  // 5. 渲染函数
  // 6. 返回 JSX
};
```

## Git 工作流规范

### 分支管理
- main：主分支，保持稳定
- develop：开发分支
- feature/*：功能分支
- hotfix/*：紧急修复分支
- release/*：发布分支

### 提交信息规范
```
<type>(<scope>): <subject>

<body>

<footer>
```

type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

## 文档规范

### 代码注释
- 使用 JSDoc 规范
```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两数之和
 */
function add(a: number, b: number): number {
  return a + b;
}
```

### README 规范
- 项目介绍
- 安装说明
- 使用说明
- 开发指南
- 部署说明
- 贡献指南

## 性能优化规范

### 代码层面
- 使用 React.memo 优化组件重渲染
- 使用 useMemo 和 useCallback 缓存计算结果和函数
- 实现虚拟列表处理大数据
- 图片懒加载
- 代码分割

### 构建优化
- 使用 Tree Shaking
- 压缩静态资源
- 使用 CDN
- 开启 Gzip 压缩
- 合理配置缓存策略

### 监控规范
- 错误监控
- 性能监控
- 用户行为监控
- 日志收集

## 安全规范

### 前端安全
- XSS 防护
- CSRF 防护
- 敏感信息加密
- 输入验证
- 安全的第三方依赖

### 数据安全
- 敏感数据加密存储
- 使用 HTTPS
- 实现请求签名
- 实现防重放攻击
