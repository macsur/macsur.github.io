# 🔧 高级功能配置指南

本目录包含 MacSur 文档站的高级功能配置说明。

---

## 📚 文档列表

| 文件 | 说明 | 难度 |
|------|------|------|
| [analytics-comments.md](analytics-comments.md) | 评论系统（Giscus）+ 访问统计（GA4）完整配置 | ⭐⭐ |
| setup-analytics-comments.sh | 自动化配置脚本（需 GitHub Token） | ⭐⭐ |

---

## 🚀 快速配置（推荐）

```bash
# 1. 进入文档目录
cd /Users/ttnk/.openclaw/workspace/macsur-docs

# 2. 运行配置脚本（需要 jq）
bash scripts/setup-analytics-comments.sh

# 3. 按照提示输入 GitHub Token 和 GA4 ID

# 4. 本地测试
docsify serve .

# 5. 查看页面底部是否有评论区
```

---

## 📖 详细步骤

### 方案 A：手动配置（精细控制）

1. **配置 Giscus 评论**：
   - 访问 https://github.com/apps/giscus 安装
   - 创建 Discussions 分类
   - 修改 `index.html` 第 X 行的配置

详见 [analytics-comments.md](analytics-comments.md)

---

2. **配置 Google Analytics**：
   - 创建 GA4 媒体资源
   - 获取 Measurement ID (G-XXXXXX)
   - 替换 `index.html` 中的 `G-XXXXXXXXXX`

---

### 方案 B：自动配置（推荐新手）

```bash
# 确保 jq 已安装
brew install jq

# 运行脚本
bash scripts/setup-analytics-comments.sh
```

脚本会自动：
- ✅ 获取 Repository ID（通过 GitHub API）
- ✅ 检查/创建 Discussions Category
- ✅ 替换 `index.html` 中的占位符
- ✅ 备份原文件

---

## ✅ 验证清单

- [ ] 本地预览 http://localhost:3000
- [ ] 页面底部出现评论区 + "Sign in with GitHub" 按钮
- [ ] 登录 GitHub 后可发表评论
- [ ] GA4 实时报告显示 1 active user
- [ ] 搜索事件在 GA4 中可见

---

## 🐛 常见问题

### ❌ Giscus 评论不显示

**原因**：
- Giscus App 未安装
- repo-id/category-id 错误
- Discussions 未启用

**解决**：
```bash
# 1. 检查配置
grep -A 5 "giscus.app" index.html

# 2. 确认 ID 格式
#   data-repo-id="R_kgDOXXXXXX"  (R_ + 字母数字)
#   data-category-id="DIC_kwXXXXXX"

# 3. 检查浏览器控制台（F12）是否有错误
```

---

### ❌ GA4 无数据

**原因**：
- Measurement ID 错误
- GTAG 脚本被广告拦截器屏蔽
- 延迟（最多 30 秒）

**解决**：
```bash
# 检查网络请求
# Chrome DevTools → Network → 过滤 "collect"
# 应看到请求返回 204

# 手动触发测试
gtag('event', 'test', {'event_category': 'debug'});
# 然后查看 GA4 DebugView (Realtime → DebugView)
```

---

## 📊 数据查看地址

| 功能 | 地址 |
|------|------|
| GA4 实时报告 | https://analytics.google.com/ → Realtime |
| GA4 事件追踪 | Reports → Engagement → Events |
| Giscus 讨论管理 | https://github.com/macsur/macsur.github.io/discussions |
| 搜索关键词 | GA4 → Reports → Engagement → Events → `site_search` |

---

## 🎯 进阶：自定义事件追踪

### 追踪视频播放

编辑 `styles/custom.js`：

```javascript
// 在视频容器添加点击监听
document.addEventListener('click', function(e) {
    var video = e.target.closest('.video-container iframe');
    if (video) {
        gtag('event', 'video_play', {
            video_title: document.title,
            video_url: video.src
        });
    }
});
```

---

### 追踪页面滚动深度

```javascript
// 每滚动 25% 触发一次
var maxScroll = 0;
window.addEventListener('scroll', function() {
    var scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    var thresholds = [25, 50, 75, 100];
    for (var t of thresholds) {
        if (scrollPercent >= t && maxScroll < t) {
            maxScroll = t;
            gtag('event', 'scroll_depth', {
                percent: t
            });
        }
    }
});
```

---

## 🔐 隐私与合规

### Cookie 通知（GDPR）

在 `index.html` 的 `<body>` 开头添加：

```html
<div id="cookie-banner" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2d3748;color:white;padding:1em 2em;border-radius:8px;z-index:9999;">
    🍪 本网站使用 Google Analytics 分析访问统计，继续浏览即表示您同意我们的隐私政策。
    <button onclick="this.parentElement.style.display='none'" style="margin-left:1em;padding:0.3em 0.8em;background:#FF6B9D;border:none;color:white;border-radius:4px;cursor:pointer;">接受</button>
</div>
```

---

## 🚀 性能优化

### 异步加载 Giscus

当前配置已 `async`，不影响首屏渲染。

### 减少 GA4 请求

```javascript
gtag('config', 'G-XXXXXXX', {
    'page_referrer': document.referrer,
    'transport_type': 'beacon',  // 使用 Beacon API（更高效）
    'session_control': 'start'   // 控制会话
});
```

---

## 📈 指标追踪清单

- [x] 页面浏览（PV/UV）
- [x] 会话时长
- [x] 搜索事件
- [x] 外链点击
- [x] 评论互动
- [ ] 视频播放（如有）
- [ ] 滚动深度（高级）

---

**需要更多高级功能？** 提交 Issue 或查看 [Docsify 插件列表](https://docsify.js.org/#/plugins) 🎯
