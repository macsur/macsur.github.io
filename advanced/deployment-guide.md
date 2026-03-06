# 🚀 部署到 GitHub Pages 完整指南

> 一键将 MacSur 文档站部署到 GitHub Pages，支持自定义域名

---

## 📦 前置条件

- ✅ 已创建 `macsur.github.io` 仓库（用户名.github.io）
- ✅ 拥有仓库的 **Write 权限**
- ✅ 本地有 Git 和 Node.js 环境

---

## 🎯 两种部署方式

| 方式 | 优点 | 缺点 | 适合场景 |
|------|------|------|----------|
| **手动推送** | 简单直接，无需 CI/CD | 每次需手动操作 | 个人项目，更新少 |
| **GitHub Actions** | 自动部署，push 即更新 | 需要配置 workflow | 团队协作，频繁更新 |

---

## 方式 一：手动推送（最简单的）

### 第 1 步：首次推送

```bash
# 1. 进入文档目录
cd /Users/ttnk/.openclaw/workspace/macsur-docs

# 2. 初始化 Git（如果还没做）
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "feat: initial docsify site"

# 5. 关联远程仓库
git remote add origin git@github.com:macsur/macsur.github.io.git

# 6. 推送到 GitHub
git push -u origin main
```

---

### 第 2 步：开启 GitHub Pages

1. 访问：https://github.com/macsur/macsur.github.io/settings/pages
2. **Source** 选择：**Deploy from a branch**
3. **Branch**：`main` 根目录
4. 点击 **Save**

等待 1-2 分钟，访问 `https://macsur.github.io` 即可看到文档站。

---

## 方式 二：GitHub Actions 自动部署（推荐）

### 步骤 1：创建 Workflow 文件

在 `macsur-docs` 目录中创建：

```
.github/
└── workflows/
    └── deploy.yml
```

`deploy.yml` 内容：

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
          # 可选：自定义 commit 消息
          commit_message: 'docs: update docs by GitHub Actions'
```

---

### 步骤 2：推送并自动部署

```bash
git add .
git commit -m "feat: add GitHub Actions workflow"
git push origin main
```

推送后，Actions 会自动运行：
1. 访问 https://github.com/macsur/macsur.github.io/actions
2. 看到 `Deploy Docs` workflow 运行中
3. 完成后，Pages 自动更新

---

## 🎨 自定义配置

### 修改站点标题和描述

编辑 `index.html`：

```javascript
window.$docsify = {
    name: 'MacSur 教程',        // 侧边栏标题
    repo: 'https://github.com/macsur/macsur.github.io', // GitHub 链接
    themeColor: '#FF6B9D',      // 主题颜色
    // ...
}
```

---

### 启用搜索

`index.html` 已包含搜索插件，无需额外配置。只需确保：

```html
<script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.min.js"></script>
<script>
    search: {
        maxAge: 86400000,
        paths: 'auto',
        placeholder: '搜索教程...',
        noData: '没有找到结果!',
        depth: 2
    }
</script>
```

---

### 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件：
   ```bash
   echo "docs.macsur.io" > CNAME
   ```

2. 在 DNS 添加 CNAME 记录：
   ```
   docs.macsur.com  →  macsur.github.io
   ```

3. 在 GitHub Pages 设置中添加自定义域名（自动检测）

---

## 📂 项目结构

```
macsur-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 配置（可选）
├── index.html              # 入口文件（已配置）
├── README.md               # 首页
├── _sidebar.md             # 侧边栏导航
├── _navbar.md              # 顶部导航（可选）
├── quick-start/            # 快速入门指南
├── tutorials/              # 13 个教程
├── scenarios/              # 使用场景
├── advanced/               # 高级功能配置
│   ├── analytics-comments.md
│   ├── deployment-guide.md (本文件)
│   └── scripts/
│       └── setup-analytics-comments.sh
└── styles/                 # 自定义样式
    ├── custom.css
    └── custom.js
```

---

## 📝 更新内容的工作流

每次需要更新文档时：

```bash
# 1. 编辑对应的 .md 文件
vim tutorials/agent-reach.md

# 2. 测试本地预览（可选）
docsify serve .

# 3. 提交并推送
git add .
git commit -m "docs: update agent reach tutorial"
git push origin main

# 4. Actions 会自动部署（如果配置了）
# 或手动在 GitHub Pages 设置页面点击 "Save" 刷新
```

---

## 🐛 故障排查

### ❌ 推送后 Pages 没更新

**原因**：GitHub Pages 缓存延迟（通常 1-2 分钟）

**解决**：
1. 检查 Actions 是否通过（如果用了 CI）
2. 手动点击 Settings → Pages → Save
3. 清除浏览器缓存（Cmd+Shift+R 强制刷新）

---

### ❌ 自定义域名显示 "There isn't a GitHub Pages site here"

**检查**：
1. CNAME 文件是否在仓库根目录
2. DNS 是否生效（`dig docs.yourdomain.com`）
3. GitHub Pages 是否开启

---

### ❌ 404 页面

Docsify 默认将所有路径映射到 `index.html`。如果 GitHub Pages 返回 404：

1. 确认仓库类型：
   - **用户站点**（username.github.io）：所有路径都支持
   - **项目站点**（username/repo）：部分路径需配置 `/404.html` 重定向

2. 添加 `404.html`（项目站点需要）：
   ```html
   <!DOCTYPE html>
   <meta charset="utf-8">
   <script>
     varredirect = location.pathname.replace(/\/$/, '') + '/index.html';
     location.replace(redirect);
   </script>
   ```

---

## 🎯 优化建议

### 1. 添加 Favicon

在 `index.html` 的 `<head>` 添加：

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

将图标文件放在仓库根目录。

---

### 2. 启用 Sitemap（SEO）

使用 [docsify-sitemap](https://github.com/ crowds/ docsify-sitemap) 插件：

```html
<script src="https://cdn.jsdelivr.net/npm/docsify-sitemap/dist/docsify-sitemap.min.js"></script>
```

生成 `sitemap.xml` 供搜索引擎抓取。

---

### 3. 压缩静态资源

GitHub Pages 已启用 gzip 压缩，无需额外配置。如需更优：

- 使用 CDN 加速（如 jsDelivr）
- 图片使用 WebP 格式
- 减少第三方脚本

---

## 📊 监控指标

部署成功后，定期查看：

| 指标 | 查看方式 | 目标 |
|------|----------|------|
| 页面加载速度 | Lighthouse / PageSpeed | > 80 分 |
| 可用性 | GitHub Status | 99.9% |
| 访问量 | GA4 报告 | 持续增长 |
| 错误率 | GA4 → DebugView | < 1% |

---

## 🔄 回滚

如果新版本有问题：

```bash
# 查看提交历史
git log --oneline

# 回滚到上一版本
git reset --hard HEAD~1

# 强制推送（覆盖远程）
git push -f origin main
```

---

## 🎉 完成！

✅ 文档站已部署到 GitHub Pages  
✅ 可通过 `https://macsur.github.io` 访问  
✅ 支持搜索、评论、统计功能  
✅ 自动或手动更新机制就绪

**开始分享您的教程吧！** 🚀

---

**相关文档**：
- [快速入门](quick-start/installation.md)
- [高级功能](analytics-comments.md)
- [故障排查](faq.md)
