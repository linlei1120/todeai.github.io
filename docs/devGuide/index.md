# 前端开发自定义规范指南

## 命名规范
### 1. 目录命名规范
#### 1.1 主要目录
- `pages/` - 页面目录，使用小写字母
- `components/` - 组件目录，使用小写字母
- `static/` - 静态资源目录，使用小写字母
- `utils/` - 工具函数目录，使用小写字母
- `store/` - 状态管理目录，使用小写字母
- `api/` - API接口目录，使用小写字母
- `assets/` - 资源文件目录，使用小写字母

### 1.2 小程序开发分包目录
- `pagesPackageA/` - 分包目录，使用camelCase驼峰命名，以"pages"开头

### 1.3 组件目录
- `nav-bar-custom/` - 移动端组件目录，使用语义化小写单词 + 连接字符（-）命名
- `HeaderSearch/` - PC端组件目录，使用用Pascal方式命名

## 2.文件命名
#### 2.1 组件文件：
  - 移动端同组件目录名，使用语义化小写单词 + 连接字符（-）命名，如 `nav-bar-custom.vue`
  - PC端同组件目录名，使用Pascal命名，如 `HeaderSearch.vue`

#### 2.2 工具/公共文件：
  - 首选使用语义化小写单词如`config.js`，其次选择使用 camelCase，如 `formatDate.ts`

#### 2.3 样式文件：
  - 与组件同名，如 `UserProfile.scss`

### 3. 变量命名
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


## Git 工作流规范

### 分支管理
- main：主分支，保持稳定
- develop：开发分支
- feature/*：功能分支
- hotfix/*：紧急修复分支
- release/*：发布分支

### 提交信息规范
type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动
