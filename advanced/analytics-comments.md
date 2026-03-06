# 📊 高级功能配置：评论 + 统计

> 为文档站添加 GitHub 评论系统和 Google Analytics 访问统计

---

## 🎯 功能总览

| 功能 | 工具 | 成本 | 说明 |
|------|------|------|------|
| **评论系统** | Giscus | 免费 | 基于 GitHub Discussions，无广告 |
| **访问统计** | Google Analytics 4 | 免费 | 用户行为、来源、页面分析 |
| **实时访客** | Umami（可选） | 免费 | 轻量级自托管统计 |
| **搜索分析** | 自定义 | - | 分析搜索关键词 |

---

## 💬 评论系统：Giscus 配置

### 什么是 Giscus？

Giscus 是一个开源的评论系统，使用 **GitHub Discussions** 作为后端。优点：

- ✅ 完全免费，无用户数据收集
- ✅ 与 GitHub 生态无缝集成
- ✅ 支持 Markdown 和 emoji 反应
- ✅ 无需维护数据库
- ✅ 符合隐私保护趋势

---

### 前置要求

- 拥有 GitHub 账号
- 仓库 `macsur/macsur.github.io` 的 **Write 权限**
- 仓库已启用 **Discussions** 功能

---

### 配置步骤（5 分钟）

#### 第 1 步：安装 Giscus App

1. 访问 https://github.com/apps/giscus
2. 点击 **Install**
3. 选择仓库：`macsur/macsur.github.io`
4. 授予权限（仅需 Discussions 读写）
5. 完成安装

---

#### 第 2 步：创建 Discussions 分类

1. 进入仓库的 **Discussions** 页面
2. 点击 **New discussion**
3. 首次需要创建分类：
   - 点击 **Get started** → **Create new category**
   - 名称：`Docs` 或 `Documentation`
   - 描述：`文档评论和反馈`
   - 点击 **Create**
4. 创建成功后，记下 **Category ID**（URL 中 `category/` 后面的数字/字符串）

例如 URL：
```
https://github.com/macsur/macsur.github.io/discussions/category/1
```
Category ID = `1`

---

#### 第 3 步：获取 Repo ID

1. 访问：https://app.giscus.app/
2. 在文本框中输入您的仓库完整名：`macsur/macsur.github.io`
3. 系统会自动填充：
   - **Repository ID** (data-repo-id)
   - **Category ID** (data-category-id，如果已创建 Discussions)

或者手动获取：

```bash
# 使用 GitHub API 获取 repo_id
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/macsur/macsur.github.io
```

在返回的 JSON 中查找 `"id"` 字段。

---

#### 第 4 步：修改 `index.html`

找到 Giscus 配置部分（约 200 行）：

```html
<script src="https://giscus.app/client.js"
    data-repo="macsur/macsur.github.io"
    data-repo-id="R_kgDOXXXXXX"  <!-- 替换此处 -->
    data-category="Docs"
    data-category-id="DIC_kwDOXXXXXX"  <!-- 替换此处 -->
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-theme="preferred_color_scheme"
    data-lang="zh-CN"
    crossorigin="anonymous"
    async>
</script>
```

**替换占位符**为您的实际值：

```html
data-repo-id="R_kgDOabc123"      <!-- 您的 repo ID -->
data-category-id="DIC_kwxyz456"  <!-- 您的 category ID -->
```

---

#### 第 5 步：测试

1. 本地预览：`docsify serve .`
2. 打开任意页面，拉到最下面
3. 应该看到 **"Sign in with GitHub"** 按钮
4. 登录后可发表评论、使用 reactions（表情回应）

---

### Giscus 配置选项说明

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `data-repo` | 仓库名（owner/repo） | `macsur/macsur.github.io` |
| `data-repo-id` | 仓库数字 ID（R_ 开头） | 从 giscus.app 获取 |
| `data-category` | Discussions 分类名称 | `Docs` 或 `Documentation` |
| `data-category-id` | 分类 ID（DIC_ 开头） | 从 Discussions URL 获取 |
| `data-mapping` | 评论关联方式 | `pathname`（按页面路径） |
| `data-theme` | 主题 | `preferred_color_scheme`（跟随系统） |
| `data-lang` | 语言 | `zh-CN`（中文） |

---

### 主题定制

Giscus 支持自动跟随 Docsify 主题：

```html
data-theme="preferred_color_scheme"
```

支持的值：
- `light` - 浅色
- `dark` - 深色
- `dark_dimmed` - 暗灰
- `preferred_color_scheme` - 跟随浏览器/OS 设置

---

## 📈 访问统计：Google Analytics 4

### 为什么选 GA4？

- ✅ 免费，无限制
- ✅ 功能强大（实时、用户路径、事件追踪）
- ✅ 与 Google 生态集成
- ✅ 隐私合规（可匿名 IP）

---

### 配置步骤

#### 第 1 步：创建 GA4 媒体资源

1. 访问 https://analytics.google.com/
2. 登录 Google 账号
3. 点击 **管理**（左下角齿轮图标）
4. 在 **媒体资源** 列，点击 **创建媒体资源**
5. 选择 **Google Analytics 4**
6. 填写：
   - 媒体资源名称：`MacSur Docs`
   - 时区：`Asia/Shanghai`
   - 货币：`CNY`
7. 点击 **创建**

---

#### 第 2 步：获取测量 ID

创建完成后，页面会显示 **Measurement ID**：

```
G-XXXXXXXXXX  (10 位字母数字)
```

复制此 ID。

---

#### 第 3 步：添加到 `index.html`

在 `index.html` 的 `<head>` 区域附近（已添加，只需替换 ID）：

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
        cookie_flags: 'SameSite=None;Secure',
        anonymize_ip: true  // 匿名化 IP（可选）
    });
</script>
```

将 `G-XXXXXXXXXX` 替换为您实际的 Measurement ID。

---

#### 第 4 步：验证

1. 保存并推送到 GitHub
2. 访问 `https://macsur.github.io`
3. 打开 GA4 实时报告：
   - 左侧菜单 → **Reports** → **Realtime**
   - 应该看到 **1 active user**（就是您自己）

如果看不到，等待 10-30 秒刷新。

---

### 高级事件追踪

#### 追踪搜索关键词

自动追踪 Docsify 搜索框输入：

```javascript
// 在 index.html 的 <script> 中添加（在 gtag init 之后）
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                gtag('event', 'search', {
                    search_term: this.value.trim(),
                    page_location: window.location.pathname
                });
            }
        });
    }
});
```

---

#### 追踪外部链接点击

```javascript
document.addEventListener('click', function(e) {
    var target = e.target.closest('a');
    if (target && target.href && !target.href.includes(window.location.hostname)) {
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: target.href,
            transport_type: 'beacon'
        });
    }
});
```

---

## 🔍 搜索分析（自定义）

Docsify 搜索插件本身不发送搜索统计。要分析用户搜索什么，需要：

### 方案 1：使用 Google Analytics 事件（已覆盖）

上面的搜索追踪代码会发送 `search` 事件到 GA4。

### 方案 2：自建搜索日志（高级）

在 `custom.js` 中添加：

```javascript
// 记录搜索词到本地存储（用于统计）
// 注意：隐私考虑，定期清理

docsify.plugins = docsify.plugins || [];

docsify.plugins.unshift(function (hook, vm) {
    hook.afterEach(function (html) {
        // 为搜索框添加监听
        setTimeout(function () {
            var input = document.querySelector('.search-input');
            if (input) {
                input.addEventListener('search', function () {
                    var query = this.value.trim();
                    if (query) {
                        // 发送到 Google Analytics
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'site_search', {
                                search_term: query,
                                page_path: window.location.pathname
                            });
                        }
                        // 同时记录到 localStorage（仅最近 50 条）
                        var logs = JSON.parse(localStorage.getItem('search_logs') || '[]');
                        logs.push({
                            q: query,
                            t: new Date().toISOString(),
                            p: window.location.pathname
                        });
                        if (logs.length > 50) logs.shift();
                        localStorage.setItem('search_logs', JSON.stringify(logs));
                    }
                });
            }
        }, 1000);
    });
});
```

---

## 🎨 样式美化（可选）

### 评论区样式

在 `styles/custom.css` 中添加：

```css
/* Giscus 评论区域美化 */
#giscus-container {
    max-width: 800px;
    margin: 3em auto;
    padding: 2em;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

#giscus-container h3 {
    margin-top: 0;
    color: var(--theme-color);
}

/* 适配暗色模式 */
@media (prefers-color-scheme: dark) {
    #giscus-container {
        background: #2d3748;
        border-color: #4a5568;
        color: #e2e8f0;
    }
}
```

---

## 🛠️ 故障排查

### ❌ Giscus 评论不显示

**检查清单**：
- ✅ Giscus App 已安装并授权
- ✅ repo-id 和 category-id 正确
- ✅ Discussions 已创建且启用
- ✅ 浏览器控制台无 JavaScript 错误（F12）

常见问题：
- Repo ID 格式应为 `R_kgDOxxxxxx`
- Category ID 格式应为 `DIC_kwDOxxxxxx`
- 首次需要 Discussions 至少一个分类

---

### ❌ GA4 无数据

**原因**：
- GTAG 脚本未加载
- Measurement ID 错误（格式：`G-XXXXXXXXXX`）
- 广告拦截器屏蔽了 Google Analytics

**排查**：
1. 查看网络请求：`collect?v=2&_p=...&tid=G-XXX` 应该返回 204
2. 实时报告最多延迟 30 秒
3. 检查浏览器控制台是否有 `gtag is not defined` 错误

---

### ❌ 搜索事件未触发

确保 `custom.js` 中的搜索监听代码在 `DOMContentLoaded` 后执行，并且搜索框存在（需要先输入一些内容初始化）。

---

## 📊 数据查看

### Google Analytics 4 报告

登录 GA4 后重点查看：

1. **Realtime**（实时）
   - 当前活跃用户
   - 热门页面
   - 用户来源

2. **Reports** → **Engagement** → **Pages and screens**
   - 页面浏览量
   - 平均停留时间
   - 跳出率

3. **Reports** → **Acquisition** → **Traffic acquisition**
   - 用户来源（直接、搜索引擎、社交媒体）
   - 渠道表现

4. **Reports** → **Monetization** → **E-commerce purchases**（如果电商）
   - 不适用本场景

---

### Giscus 讨论管理

在 GitHub 仓库：
- **Discussions** 标签页 → 查看所有评论
- **Insights** → 查看参与度统计
- 可关闭、删除不当评论

---

## 🔐 隐私与合规

### 用户隐私保护

- ✅ **匿名化 IP**：`anonymize_ip: true`
- ✅ **不收集个人数据**：Giscus 仅存储 GitHub 用户名
- ✅ **GDPR 合规**：用户可随时删除评论（GitHub 账号）
- ✅ **Cookie 提示**：可在页面添加 Cookie 通知（可选）

---

### Cookie 通知（可选）

在 `index.html` 的 `<body>` 开头添加：

```html
<div id="cookie-banner" style="
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #2d3748;
    color: white;
    padding: 1em 2em;
    border-radius: 8px;
    font-size: 0.9em;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
">
    🍪 本网站使用 Google Analytics 分析访问统计，继续浏览即表示您同意我们的隐私政策。
    <button onclick="this.parentElement.style.display='none'" style="
        margin-left: 1em;
        padding: 0.3em 0.8em;
        background: var(--theme-color);
        border: none;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    ">接受</button>
</div>
```

---

## 📈 指标目标（建议）

| 指标 | 目标（3个月） | 目标（1年） |
|------|---------------|------------|
| 月访问量 | 1,000 PV | 5,000 PV |
| 平均停留时间 | > 2 分钟 | > 3 分钟 |
| 评论互动率 | 5% 的用户评论 | 10% 的用户评论 |
| 搜索使用率 | 20% 用户使用搜索 | 30% 用户使用搜索 |

---

## 🚀 下一步

1. **配置 Giscus**（需要 5-10 分钟）
   - 安装 App → 创建 Discussions → 修改 `index.html`

2. **配置 GA4**（需要 10 分钟）
   - 创建媒体资源 → 获取 ID → 修改 `index.html`

3. **测试验证**
   - 评论功能
   - 实时统计

4. **推送上线**
   ```bash
   git add .
   git commit -m "feat: add giscus comments & GA4 analytics"
   git push origin main
   ```

5. **监控数据**（1周后查看报告）

---

**完成后，您的文档站将具备：**
- ✅ 完整的评论生态系统（基于 GitHub）
- ✅ 详细的访问统计和分析
- ✅ 搜索关键词追踪
- ✅ 用户行为洞察

需要我现在帮您生成 Giscus 的配置 ID 并修改 `index.html` 吗？🚀
