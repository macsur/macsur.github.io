# 🔧 配置说明

## 🎨 主题定制

Docsify 默认使用 Vue 主题，您可以在 `index.html` 中修改：

```html
<script>
window.$docsify = {
    name: 'MacSur 教程',          // 侧边栏标题
    repo: 'https://github.com/macsur/macsur.github.io', // GitHub 仓库链接
    loadSidebar: true,            // 加载侧边栏
    subMaxLevel: 2,               // 侧边栏显示最大标题级别
    themeColor: '#FF6B9D',        // 主题颜色（粉红色）
    // ... 更多配置
}
</script>
```

### 可配置项

| 参数 | 说明 | 默认 |
|------|------|------|
| `name` | 侧边栏顶部标题 | 文件名 |
| `repo` | GitHub 仓库链接（Edit 按钮） | null |
| `loadSidebar` | 是否加载 `_sidebar.md` | false |
| `loadNavbar` | 是否加载 `_navbar.md` | false |
| `homepage` | 首页标题（Edit 按钮会链接到这里） | README.md |
| `themeColor` | 主题颜色（影响链接、按钮等） | #42b983 |
| `themeMode` | 主题模式：`light`/`dark`/`auto` | auto |
| `auto2top` | 切换页面时是否回到顶部 | true |
| `search` | 搜索功能配置 | null |

---

## 📂 目录结构

```
macsur-docs/
├── index.html              # 入口文件
├── README.md               # 首页
├── _sidebar.md             # 侧边栏导航
├── _navbar.md              # 顶部导航（可选）
├── quick-start/
│   ├── installation.md     # 安装指南
│   └── configuration.md    # 配置说明（本文件）
├── tutorials/
│   ├── agent-reach.md
│   ├── cliproxypi-api.md
│   ├── ...
│   └── openclaw-scripts.md
├── scenarios/
│   ├── workflow.md
│   ├── smarthome.md
│   └── study.md
├── styles/
│   ├── custom.css          # 自定义样式
│   └── custom.js           # 自定义脚本
└── assets/
    ├── images/
    └── videos/
```

---

## 🎨 自定义样式

编辑 `styles/custom.css`：

### 修改主题颜色

```css
:root {
    --theme-color: #FF6B9D;  /* 改为您喜欢的颜色 */
}
```

推荐配色：
- 🌸 粉色系：`#FF6B9D`
- 🌊 蓝色系：`#4299E1`
- 🌿 绿色系：`#48BB78`
- 🟣 紫色系：`#9F7AEA`

### 调整内容宽度

```css
.page {
    max-width: 1000px;  /* 默认 900px，可调大 */
    margin: 0 auto;
}
```

### 修改代码块样式

```css
.markdown-section pre {
    background: #1a202c;  /* 深色背景 */
    border-radius: 8px;
    padding: 1.5em;
}
```

---

## 🔌 插件配置

本模板已集成以下 Docsify 插件（在 `index.html` 中）：

### 1. Search（搜索）

```javascript
search: {
    maxAge: 86400000,  // 缓存时间（24小时）
    paths: 'auto',     // 自动扫描所有页面
    placeholder: '搜索教程...',
    noData: '没有找到结果!',
    depth: 2           // 搜索深度（h1-h2）
}
```

---

### 2. CopyCode（复制代码）

```javascript
copyCode: {
    buttonText: '复制代码',
    errorText: '错误',
    successText: '已复制'
}
```

---

### 3. Pagination（分页导航）

```javascript
pagination: {
    previousText: '上一章',
    nextText: '下一章',
    crossChapter: true,      // 跨章节导航
    crossChapterText: true   // 显示章节名
}
```

---

## 🏷️ Front Matter 详解

每个 Markdown 文件顶部可添加 YAML 格式的元数据：

```markdown
---
title: "教程标题"
category: "tutorial"
tags: ["tag1", "tag2"]
date: 2025-06-20
sidebar_position: 1
---

# 正式内容开始...
```

| 字段 | 说明 | 必需 |
|------|------|------|
| `title` | 页面标题（侧边栏显示） | ✅ |
| `category` | 分类（tutorial/quick-start/scenarios/faq） | 建议 |
| `tags` | 标签数组 | 建议 |
| `date` | 发布日期（YYYY-MM-DD） | 建议 |
| `sidebar_position` | 侧边栏排序位置（数字） | 可选 |

---

## 🎯 侧边栏排序

编辑 `_sidebar.md`：

```markdown
## 📚 完整教程

### 🔧 系统工具

- [🛠️ Agent Reach](tutorials/agent-reach.md) \[badge:new]
  <!-- 方括号内的 badge 会显示徽章 -->

- [教程2](tutorials/tutorial2.md)
```

排序：按出现的顺序

---

## 🔄 部署到 GitHub Pages

### 1️⃣ 推送代码

```bash
cd macsur-docs
git init
git add .
git commit -m "Initial commit - Docsify docs"
git branch -M main
git remote add origin git@github.com:macsur/macsur.github.io.git
git push -u origin main
```

### 2️⃣ 开启 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 **GitHub Actions**
3. 或直接使用 `gh-pages` 分支

### 3️⃣ 自动部署（推荐 GitHub Actions）

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 📱 移动端优化

Docsify 默认响应式，但您可能需要：

### 调整侧边栏

```css
/* 移动端隐藏侧边栏 */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        position: relative;
    }
}
```

---

## 🐛 调试技巧

### 1. 查看网络请求

Chrome DevTools → Network，检查 Markdown 文件是否加载

### 2. 禁用缓存

开发时在 URL 后加 `?v=timestamp` 强制刷新

### 3. 查看控制台日志

F12 → Console，查看 Docsify 错误信息

---

## 📊 SEO 优化

### 添加 meta 标签

在 `index.html` 的 `<head>` 中添加：

```html
<meta name="description" content="MacSur 教程文档 - 专为 Mac 用户打造的效率工具集合">
<meta name="keywords" content="Mac,效率工具,教程,OpenClaw,智能家居">
<meta property="og:title" content="MacSur 教程文档">
<meta property="og:description" content="一站式 macOS 效率工具教程">
<meta property="og:image" content="https://macsur.github.io/logo.png">
```

---

## 🔐 权限设置

如果需要限制编辑权限：

1. 仓库 Settings → Collaborators
2. 添加合作者并设置权限（Read/Write/Maintain）
3. 保护 main 分支，要求 PR 审核

---

## 📞 需要帮助？

- [Docsify 官方文档](https://docsify.js.org/)
- [GitHub Pages 指南](https://pages.github.com/)
- [提交 Issue](https://github.com/macsur/macsur.github.io/issues)

---

**下一步**: 开始阅读 [第一个教程](tutorials/agent-reach.md) 🚀
