# MacSur 站点规范与配置规则

> 记录 https://x.zttz.eu.org 和 https://macsur.github.io 的所有配置决策、技术规则和部署流程

---

## 📑 目录

1. [Hexo 博客（x.zttz.eu.org）](#hexo-博客)
2. [MacSur 文档站（macsur.github.io）](#macsur-文档站)
3. [OpenClaw 搜索集成](#openclaw-搜索集成)
4. [Termius 汉化自动化](#termius-汉化自动化)
5. [教程内容规范](#教程内容规范)
6. [字幕翻译流程](#字幕翻译流程)
7. [部署与更新流程](#部署与更新流程)
8. [常见问题排查](#常见问题排查)

---

## Hexo 博客

### 基本配置
- **仓库**: `macsuer-matery-blog`
- **主题**: Matery
- **自定义域名**: `x.zttz.eu.org` (CNAME 已配置)
- **Hosting**: GitHub Pages

### 关键设置
```yaml
# _config.yml (站点配置)
permalink: :title  # 使用标题作为 URL，避免下划线转 hex
timezone: Asia/Shanghai
language: zh-CN
```

### 评论系统
- **方案**: Giscus (GitHub Discussions)
- **配置位置**: Matery 主题 `_config.yml` 的 `giscus` 块
- **必需参数**:
  - `repo`: `macsur/macsuer-matery-blog` (或实际仓库名)
  - `repo_id`: GitHub Discussions 仓库 ID
  - `category_id`: Giscus 讨论分类 ID
  - `mapping`: `pathname` (按页面路径映射)

### 分析统计
- **方案**: Google Analytics 4
- **配置**: 在 `themes/matery/layout/_partial/google-analytics.ejs` 中插入 GA4 测量 ID

### URL 变换问题
- **问题**: Hexo 默认将 URL 中的下划线 `_` 转为十六进制转义序列
- **解决**: 设置 `permalink: :title` 并确保配置加载
- **验证**: 新建文章后检查生成的 URL

---

## MacSur 文档站

### 技术栈
- **框架**: Docsify 4.x
- **Hosting**: GitHub Pages (`macsur/macsur.github.io`)
- **自定义域名**: `x.zttz.eu.org` (通过 CNAME 指向)
- **侧边栏**: `_sidebar.md`
- **首页**: `README.md`

### 目录结构
```
macsur-docs/
├── index.html           # Docsify 入口
├── README.md            # 首页（包含教程列表）
├── _sidebar.md          # 侧边栏导航
├── tutorials/           # 教程 Markdown 文件
│   ├── xxx.md
│   └── ...
├── styles/
│   └── custom.css       # 自定义样式
└── scripts/
    └── convert-tutorials.js  # 教程转换脚本（如有）
```

### 教程列表规范

#### 1. 统计数量
- **自动计数**: `ls tutorials/*.md | wc -l` (当前 15)
- **README 标题**: `## 📊 15 个完整教程列表`
- **徽章数字**: `[文档状态](...)` 中的数量需同步更新

#### 2. 表格格式（固定比例）
| 列 | 比例 | 说明 |
|----|------|------|
| 序号 | 5% | 居中，使用主题强调色 |
| 教程名称 | 80% | 链接到 tutorials/xxx.md |
| 分类 | 10% | 居中 |
| 难度 | 5% | 居中 (⭐/⭐⭐/⭐⭐⭐) |
| 热度 | 5% | 居中 (🔥/🔥🔥/⭐⭐⭐) |

**HTML 结构**:
```html
<div align=center class="tutorial-list-table-wrapper">
| 序号 | 教程名称 | 分类 | 难度 | 热度 |
|------|----------|------|------|------|
| 1 | [教程名](tutorials/xxx.md) | 分类 | ⭐⭐ | 🔥 |
...
</div>
```

#### 3. CSS 样式
```css
.tutorial-list-table-wrapper table th:nth-child(1),
.tutorial-list-table-wrapper table td:nth-child(1) { width: 5%; ... }
.tutorial-list-table-wrapper table th:nth-child(2),
.tutorial-list-table-wrapper table td:nth-child(2) { width: 80%; ... }
.tutorial-list-table-wrapper table th:nth-child(3),
.tutorial-list-table-wrapper table td:nth-child(3) { width: 10%; ... }
.tutorial-list-table-wrapper table th:nth-child(4),
.tutorial-list-table-wrapper table td:nth-child(4) { width: 5%; ... }
.tutorial-list-table-wrapper table th:nth-child(5),
.tutorial-list-table-wrapper table td:nth-child(5) { width: 5%; ... }
```

#### 4. 移动端适配
- 在 `@media (max-width: 768px)` 中启用横向滚动
- `table-layout: auto !important;` 防止固定宽度破坏布局

### 主页 Logo 规范
- **位置**: README.md 顶部居中
- **大小**: 宽 200px (SVG viewBox 控制)
- **链接**: 必须跳转到 `https://x.zttz.eu.org`
- **样式**: 内联 SVG，使用 `<a>` 标签包裹，`target="_blank"` 可选
- **配色**: 与站点主题协调（建议使用深灰 + 品牌蓝）

---

## OpenClaw 搜索集成

### 限制
- **OpenClaw 版本**: v0.1.7
- **Schema 约束**: 不支持顶级 `search` 块
- **正确位置**: 所有自定义提供者必须嵌套在 `agents.defaults.search.providers` 下

### 配置示例（openclaw.json）
```json
{
  "agents": {
    "defaults": {
      "search": {
        "providers": {
          "ttnk-brave": {
            "type": "brave",
            "apiKey": "BSAELRkyQI1oulemacttnkl0RhS9mKuJ4PZyD6"
          },
          "ttnk-tavily": {
            "type": "tavily",
            "apiKey": "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"
          },
          "ttnk-searxng": {
            "type": "searxng-search",
            "url": "https://s.136222.xyz/search",
            "headers": {
              "Authorization": "Bearer YOUR_TOKEN"
            }
          }
        }
      }
    }
  }
}
```

### 注意事项
- 提供者键名（如 `ttnk-searxng`）可自定义但需保持唯一
- 如需移除某提供者，直接在 `providers` 中删除对应块
- 修改配置后需重启 OpenClaw: `openclaw gateway restart`

---

## Termius 汉化自动化

### 目标
自动检测 Termius Pro 版本，下载匹配的中文语言包，安装到应用内。

### 架构
1. **Telegram 频道**: `@zh_CN_Update` (发布汉化包)
2. **GitHub 仓库**: `tgstation-network/terminus-Termius` (发布页存放汉化包)
3. **安装脚本**: `termius-zh/install.sh`

### 流程
```bash
# 用户运行
./install.sh

# 脚本内部
1. 检测 Termius 版本 (Termius.app/Contents/Info.plist)
2. 从 GitHub releases 获取对应版本的中文 pack (.zip)
3. 解压并移动文件到 Termius.app/Contents/Resources/
4. 运行 osxfix.sh 修复权限和签名问题
5. 重启 Termius (自动或提示)
```

### 关键配置
- **语言包命名**: `Termius-zh-Hans-{version}.zip`
- **目标路径**: `/Applications/Termius.app/Contents/Resources/`
- **修复脚本**: `termius-zh/macos/osxfix.sh`

---

## 教程内容规范

### 视频嵌入优先级
1. **Bilibili** 优先 (国内访问快)
2. **YouTube** 次之 (国际用户)
3. 使用自定义容器 `.video-container` 包裹 `<iframe>`

### 字幕处理
- **提取**: 下载视频 subtitles (SRT/VTT)
- **翻译**: 使用 API (如 MyMemory) 或本地工具
- **显示位置**: 教程末尾折叠块内
- **语言**: **仅显示中文**，原文（英文）不保留
- **分段**: 按空行分章节，时间间隔 < 500ms 合并

### 字幕脚本
- `add-subtitles.js`: 下载 + 翻译 + 合并 + 插入教程
- `translate-subtitles.js`: 独立翻译完整 401 行文件
- **断点续传**: 每 10 行保存一次到 `translated.txt`
- **防限流**: 每次调用延迟 ≥1.1 秒

### 避免 SIGKILL
- 分块处理（每 50-100 行一批次）
- 批次间 `sleep 5`
- 监控进程资源，必要时降低并发

---

## 字幕翻译流程

### 输入
- 英语 SRT 文件（如 `video.en.srt`）
- 共 401 行，按空行分割为章节

### 步骤
1. 解析 SRT，提取文本行
2. 调用翻译 API (MyMemory `POST` 请求)
   - Rate limit: 500 字/请求，1000 字/天免费
   - 添加 `节流`: 每请求间隔 1.1s
3. 保存进度（每 10 行）
   - 文件: `translated.txt`
   - 格式: 对应原始行号
4. 合并：根据时间戳，若间隔 < 500ms 则合并段落
5. 输出 Markdown 折叠块：
   ```markdown
   <details>
   <summary>字幕译文（中文）</summary>

   译文内容...
   </details>
   ```

### 错误处理
- API 失败 → 重试 3 次后跳过并记录
- 进程被杀 → 从断点继续
- 内存溢出 → 减小批次到 50 行

---

## 部署与更新流程

### 博客 (Hexo)
```bash
cd macsuer-matery-blog
hexo clean && hexo g
hexo d  # 推送到 GitHub Pages

# 或手动复制 public/ 到gh-pages分支
git add .
git commit -m "feat: new post"
git push origin main
```

### 文档站 (Docsify)
```bash
cd macsur-docs
git add .
git commit -m "docs: update tutorial"
git push origin main

# 自动触发 GitHub Pages 构建（无需手动）
```

### OpenClaw 配置更新
```bash
# 编辑 openclaw.json（添加/修改 providers）
nano ~/.openclaw/openclaw.json

# 重启网关
openclaw gateway restart
```

### 验证
- **博客**: https://x.zttz.eu.org
- **文档**: https://macsur.github.io
- **OpenClaw 搜索**: 在聊天中测试 `!search 关键词`

---

## 常见问题排查

### Hexo URL 仍带 hex 编码
- 确认 `_config.yml` 中有 `permalink: :title`
- 清除缓存: `hexo clean` 再重新生成
- 检查是否有插件覆盖 permalink 设置

### Giscus 评论不显示
- GitHub 仓库需启用 Discussions
- 检查 `repo`、`category_id`、`mapping` 参数正确
- 浏览器控制台查看错误

### OpenClaw 搜索失败
- 检查 `openclaw.json` 结构是否符合 v0.1.7 (providers 嵌套在 agents.defaults.search 下)
- 验证 API Key 是否有效
- 重启网关: `openclaw gateway restart`

### 文档站教程列表数字不符
- 实际数量: `ls tutorials/*.md | wc -l`
- 更新位置:
  - README 标题: `## 📊 N 个完整教程列表`
  - 徽章: `[文档状态](...-N个教程-...)`
  - 分类总计中的“总计”
- 确保三处一致

### 字幕翻译 SIGKILL
- 降低批次大小到 50 行
- 增加批次间 `sleep 10`
- 使用 `nice` 降低进程优先级: `nice -n 19 node translate.js`
- 考虑使用离线翻译工具 (如 `trans`)

### Logo 不显示
- 检查 SVG 语法是否正确（闭合标签）
- 避免使用外部图片链接（GitHub Camo 有时不稳定）
- 内联 SVG 更可靠

---

## 版本记录

| 日期 | 版本 | 说明 |
|------|------|------|
| 2025-06-16 | 1.0 | 初始版本，汇总所有站点规范 |

---

**维护**: 每次重大配置变更后更新此文档！
