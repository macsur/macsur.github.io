# x.zttz.eu.org / macsur.github.io 站点运维规则（Runbook）

> 目的：把这次“从仓库写作 → 前端上线 → 排障修复”的全过程固化成规则。
> 
> 适用范围：
> - 前端站点：https://x.zttz.eu.org （Docsify）
> - 内容仓库：https://github.com/macsur/macsur.github.io （main 分支）

---

## 0. 一句话架构（先统一认知）
- **后端（内容源）**：GitHub Repo 的 `main` 分支（Markdown、`_sidebar.md`、`index.html`、`styles/` 等）
- **前端（渲染器）**：Docsify 在浏览器里加载 `index.html` + Docsify JS → 拉取 Markdown 渲染
- 所以：**文章是否上线 = 是否 push 到 main + 前端资源是否能加载成功**

---

## 1. 写作/发布标准流程（SOP）
### 1.1 新增文章
1) 在 `tutorials/<topic>/` 新建 `xx-xxx.md`
2) 更新 `tutorials/<topic>/README.md`（专题目录）
3) 更新根目录 `_sidebar.md`（侧边栏入口）
4) 本地检查：
   - 文件路径大小写正确
   - 链接用相对路径（Docsify #/ 路由）
5) 提交并推送：
   - commit message 统一：`更新：xxx`

### 1.2 发布后验证（必做）
- 先验证 GitHub raw（最快确认“后端已更新”）：
  - `https://raw.githubusercontent.com/macsur/macsur.github.io/main/<path>`
- 再验证前端：
  - 打开 `https://x.zttz.eu.org/#/`
  - 在侧边栏找到入口

---

## 2. 最常见故障：前端一直 Loading…（排障规则）
> 结论：Loading 不是“文章没写”，而是“Docsify 没跑起来”。

按顺序排查：

### 2.1 先看 Console 报错（最快定位）
- 打开浏览器开发者工具 → Console
- 第一条红色错误基本就是元凶

### 2.2 两大类元凶
#### A) CDN 资源加载失败（最常见）
现象：
- Docsify 主脚本/插件脚本 404、超时、ERR_BLOCKED_BY_CLIENT、net::ERR…

处理规则：
- **不要依赖单一 CDN**。优先用更稳定的源。
- 本站已采用：`unpkg.com`（替代 jsDelivr）

#### B) 自定义 JS 报错导致 Docsify 中断
现象：
- Console 里出现 `ReferenceError` / `xxx is not defined`
- Docsify 资源其实加载成功，但渲染被自定义脚本打断

处理规则：
- `styles/custom.js` 只能使用 Docsify 官方插件注入方式：
  - `window.$docsify.plugins = (window.$docsify.plugins||[]).concat([plugin])`
- **禁止使用**不存在的 API（例如本次踩坑的 `docsify.register(...)`）

---

## 3. 缓存规则（强制刷新策略）
### 3.1 为什么会“改了但不生效”
- 浏览器会缓存 `index.html`、Docsify JS、插件 JS
- CDN 也会缓存

### 3.2 本站的“缓存破坏参数”规则（已落地）
在 `index.html` 里维护统一版本号：
- `DOCSIFY_ASSET_VER` / `?v=...`

**规则：**
- 每次遇到“前端仍旧 Loading / sidebar 不更新 / js 没刷新”，就把版本号 +1：
  - 例如：`20260314-1` → `20260314-2`
- 然后 commit + push

---

## 4. 当前站点固定配置（重要约定）
### 4.1 Docsify CDN
- 统一使用 `https://unpkg.com/docsify@4...`

### 4.2 自定义增强脚本
- `styles/custom.js` 已修复为 Docsify 插件规范

### 4.3 推送权限（避免 PAT 反复翻车）
- **使用 Deploy Key（SSH）写权限**推送，而不是依赖 PAT 的 https 缓存凭据
- Deploy key：已在仓库 Deploy keys 中启用 Read/Write

---

## 5. 安全红线（永远别做）
- ❌ 不要把任何 token/pat/api_key 发到公开页面、文档、截图、仓库
- ❌ 不要把 `.env` / `token.txt` / `account.txt` 提交到 GitHub
- ❌ 不要在 CI 日志里打印环境变量

---

## 6. 发生事故时的应急模板
### 6.1 密钥泄露
1) 立刻 Revoke
2) 查日志/账单
3) 换新并逐环境替换
4) 如果泄露进 Git 历史：用 `git filter-repo` 清理并 force push

### 6.2 前端 Loading
1) 看 Console 第一条红错
2) 若 CDN 挂：切换 CDN 或提升缓存版本号
3) 若 custom.js 报错：修 JS（遵循 Docsify 插件规范）并提升缓存版本号

---

## 7. 维护习惯（建议）
- 每次发布后：raw + 前端双验证
- 每次修改 `index.html` / `styles/custom.js`：必须改版本号（避免缓存）
- 内容更新频繁时：保持 commit message 简洁一致（`更新：...`）

