<!-- OPENCLAW_TUTORIAL_START -->
# OpenClaw 配置规则与教程 - (macOS M2 Mini)

> [!CAUTION]
> **本机 macOS 安装的是英文版 `openclaw`，不是中文版 `openclaw-cn`。所有命令一律使用 `openclaw`！**

> [!IMPORTANT]
> **本文为公开版（已脱敏）**：所有 `API Key / Token / Password` 均已替换为 `***`。
> 
> 推荐做法：把密钥放进 **环境变量** 或 **本机私有配置文件**（不要提交到 Git）。

---

## 一、配置文件位置

```bash
~/.openclaw/openclaw.json
```

---

## 二、模型别名规则

OpenClaw 使用 **`提供商名/模型ID`** 的格式来引用模型。

### Provider ① `api136222`

| 字段 | 值 |
|------|-----|
| Base URL | `https://cli.136222.xyz/v1` |
| API 类型 | `openai-responses` |
| API Key | `***` |

**可用模型别名：**

| 别名 | 说明 |
|------|------|
| `api136222/cli-api` | CLI API 通用模型 |
| `api136222/gpt-5.2` | GPT-5.2 |
| `api136222/gpt-5` | GPT-5 |
| `api136222/gpt-5-codex` | GPT-5 Codex |
| `api136222/gpt-5-codex-mini` | GPT-5 Codex Mini |
| `api136222/gpt-5.1` | GPT-5.1 |
| `api136222/gpt-5.1-codex` | GPT-5.1 Codex |
| `api136222/gpt-5.1-codex-mini` | GPT-5.1 Codex Mini |
| `api136222/gpt-5.1-codex-max` | GPT-5.1 Codex Max |
| `api136222/gpt-5.2-codex` | GPT-5.2 Codex |

---

### Provider ② `gptgrok`

| 字段 | 值 |
|------|-----|
| Base URL | `https://openai.good.hidns.vip/v1` |
| API 类型 | `openai-completions` |
| API Key | `***` |

**可用模型别名：**

| 别名 | 说明 |
|------|------|
| `gptgrok/gpt5.4` | ⭐ **当前默认主模型** |
| `gptgrok/gpt-5.3-codex` | GPT-5.3 Codex |
| `gptgrok/gpt-5.2` | GPT-5.2 |
| `gptgrok/gpt-5.2-codex` | GPT-5.2 Codex |
| `gptgrok/grok-imagine-1.0` | Grok 图像生成 |
| `gptgrok/grok-4.20-beta` | Grok 4.20 Beta |
| `gptgrok/grok-imagine-1.0-edit` | Grok 图像编辑 |
| `gptgrok/grok-4.1-thinking` | Grok 4.1 思维链 |
| `gptgrok/grok-4.1-expert` | Grok 4.1 专家 |
| `gptgrok/grok-imagine-1.0-video` | Grok 视频生成 |
| `gptgrok/grok-4.1-mini` | Grok 4.1 Mini |

---

## 三、当前模型优先级（Failover 顺序）

```text
主模型 → gptgrok/gpt5.4
  ↓ 失败时依次尝试：
  1. gptgrok/gpt-5.3-codex
  2. gptgrok/gpt-5.2
  3. gptgrok/gpt-5.2-codex
  4. gptgrok/grok-4.20-beta
  5. gptgrok/grok-4.1-thinking
  6. gptgrok/grok-4.1-expert
  7. gptgrok/grok-4.1-mini
  8. api136222/cli-api        ← 跨 Provider 备选
  9. api136222/gpt-5.2
 10. api136222/gpt-5
 11. api136222/gpt-5-codex
 12. api136222/gpt-5-codex-mini
 13. api136222/gpt-5.1
 14. api136222/gpt-5.1-codex
 15. api136222/gpt-5.1-codex-mini
 16. api136222/gpt-5.1-codex-max
 17. api136222/gpt-5.2-codex
```

---

## 四、如何切换默认模型

编辑 `~/.openclaw/openclaw.json` 中 `agents.defaults.model.primary` 字段：

```json
"agents": {
  "defaults": {
    "model": {
      "primary": "gptgrok/gpt5.4",
      "fallbacks": ["..."]
    }
  }
}
```

> 修改后需重启 OpenClaw 才能生效。

---

## 五、Telegram Bot 配置要点

```json
"channels": {
  "telegram": {
    "enabled": true,
    "dmPolicy": "open",
    "allowFrom": ["*"],
    "botToken": "***",
    "groupPolicy": "open"
  }
}
```

```json
"messages": {
  "ackReactionScope": "all"
}
```

> [!CAUTION]
> 如果 `dmPolicy` 设为 `"open"` 而不添加 `allowFrom: ["*"]`，OpenClaw 将无法启动！

---

## 六、重启 OpenClaw 步骤

```bash
# 1) 查找进程
ps aux | grep openclaw | grep -v grep

# 2) 终止旧进程
kill <PID>

# 3) 启动新进程
nohup openclaw &>/dev/null &

# 4) 确认运行
ps aux | grep openclaw | grep -v grep
```

---

## 附：密钥与配置管理（建议）

- **不要**把 `sk-...` 之类 API Key 写进公开仓库。
- 建议把密钥放在：
  - 私有 `.env`（加入 `.gitignore`）
  - 或系统环境变量（systemd `Environment=` / `EnvironmentFile=`）
  - 或私有配置文件（仅本机可读，权限 `chmod 600`）
<!-- OPENCLAW_TUTORIAL_END -->

# ⚡ OpenClaw / AI 工具未来实验室

> **x.zttz.eu.org** · 科技感 / 未来感 / 金属感风格的 AI 工具专题文档站

<div class="hero-metal">
  <div class="hero-badge">FUTURE SYSTEMS / AI TOOLING / OPEN SOURCE INTELLIGENCE</div>
  <h1>面向 2026 的开源 AI 工具专题库</h1>
  <p>
    从 <strong>OpenClaw</strong>、<strong>飞牛 NAS</strong>、<strong>多智能体</strong>、<strong>本地模型</strong> 到
    <strong>OSINT 情报系统</strong>、<strong>代码知识图谱</strong>、<strong>WiFi 感知</strong>，
    这里不是普通文档列表，而是一座持续进化的 AI 工具实验站。
  </p>
  <div class="hero-actions">
    <a href="#/tutorials/2026-hot-open-source-ai-projects-navigation" class="hero-btn hero-btn-primary">🚀 进入 2026 热门项目导航</a>
    <a href="#/tutorials/openclaw-gpt-5.4-guide" class="hero-btn hero-btn-secondary">🧠 查看 OpenClaw 实战专题</a>
  </div>
  <div class="hero-grid">
    <div class="hero-card">
      <div class="hero-card-label">教程总量</div>
      <div class="hero-card-value">44</div>
      <div class="hero-card-desc">持续更新中</div>
    </div>
    <div class="hero-card">
      <div class="hero-card-label">专题方向</div>
      <div class="hero-card-value">8+</div>
      <div class="hero-card-desc">OpenClaw / Agent / OSINT / 本地AI</div>
    </div>
    <div class="hero-card">
      <div class="hero-card-label">项目专题</div>
      <div class="hero-card-value">5</div>
      <div class="hero-card-desc">CoPaw / RuView / worldmonitor / GitNexus / deer-flow</div>
    </div>
  </div>
</div>

---

## 🛰️ 站点定位

这不是传统意义上的“软件安装文档”。

这里更偏向：

- **开源 AI 工具精选专题库**
- **OpenClaw / 飞牛 NAS / 本地模型实战基地**
- **多智能体 / OSINT / 自动化工作流实验场**

如果你想找的是：

- 真正能部署的 AI 工具
- 有落地价值的开源项目
- 本地 AI、Agent、自动化、情报分析的组合路线

那这个站就是为你准备的。

---

## 🔥 热门入口

<div class="portal-grid">
  <a class="portal-card" href="#/tutorials/2026-hot-open-source-ai-projects-navigation">
    <div class="portal-title">2026 爆款开源 AI 项目导航</div>
    <div class="portal-desc">5 大热门项目 × 15 篇核心教程 × 5 个专题封面页</div>
  </a>
  <a class="portal-card" href="#/tutorials/openclaw-fly-nas-deployment">
    <div class="portal-title">飞牛 NAS + OpenClaw 专题</div>
    <div class="portal-desc">部署、模型切换、多通道、Ollama 联动、安全加固一条龙</div>
  </a>
  <a class="portal-card" href="#/tutorials/worldmonitor-topic-index">
    <div class="portal-title">worldmonitor 全球情报系统</div>
    <div class="portal-desc">地图、新闻、风险评分、AI 简报、本地 Ollama 组合方案</div>
  </a>
  <a class="portal-card" href="#/tutorials/gitnexus-topic-index">
    <div class="portal-title">GitNexus 知识图谱编程专题</div>
    <div class="portal-desc">让 Claude Code / Cursor / MCP 更懂你的大型代码仓库</div>
  </a>
  <a class="portal-card" href="#/tutorials/openclaw-aliyun-gateway-troubleshooting">
    <div class="portal-title">阿里云 OpenClaw 网关排障专题</div>
    <div class="portal-desc">真实服务器实战：配置定位、11251、basePath、Nginx 反代、HTTPS 证书一次讲透</div>
  </a>
</div>

---

## ☁️ 阿里云 OpenClaw 专题位

<div class="aliyun-feature-wrap">
  <a class="aliyun-feature-hero" href="#/tutorials/openclaw-aliyun-gateway-troubleshooting">
    <div class="aliyun-feature-badge">REAL SERVER / TROUBLESHOOTING / HTTPS / GATEWAY</div>
    <h3>阿里云 OpenClaw 真实救火专题</h3>
    <p>不是纸上谈兵，是在真实服务器上一路排查出来的：多份配置冲突、11251 端口、随机 basePath、Nginx 反代、Let's Encrypt 证书、GPT-5.4 默认模型恢复，全都踩了一遍，也全都写清楚了。</p>
    <span class="aliyun-feature-cta">立即进入专题 →</span>
  </a>

  <div class="aliyun-feature-grid">
    <a class="aliyun-feature-card" href="#/tutorials/openclaw-aliyun-gateway-troubleshooting">
      <span class="aliyun-card-kicker">排障实战</span>
      <strong>阿里云 OpenClaw 网关配置排障与 HTTPS 反代修复实战</strong>
      <span>从“为什么 404 / 为什么起不来 / 为什么证书不对”一路排到最终恢复。</span>
    </a>
    <a class="aliyun-feature-card" href="#/tutorials/openclaw-aliyun-ops-memo">
      <span class="aliyun-card-kicker">运维备忘录</span>
      <strong>OpenClaw 阿里云服务器运维备忘录</strong>
      <span>把生效配置、端口、basePath、token、证书检查和重启流程浓缩成一页。</span>
    </a>
    <a class="aliyun-feature-card" href="#/tutorials/remote-openclaw-aliyun-script">
      <span class="aliyun-card-kicker">一键脚本</span>
      <strong>OpenClaw 阿里云一键远程脚本使用说明</strong>
      <span>在本地 Mac 直接 SSH 到服务器执行 status / restart / doctor / cert，不用反复手敲。</span>
    </a>
  </div>
</div>

---

## 🌌 核心专题矩阵

| 专题 | 方向 | 适合谁 | 入口 |
|------|------|--------|------|
| OpenClaw / 飞牛 NAS | 本地 Agent、Docker、消息通道 | 想搭个人 AI 助手的人 | [进入专题](tutorials/openclaw-fly-nas-deployment.md) |
| 2026 热门项目精选 | 开源 AI 项目总导航 | 想快速抓住重点项目的人 | [进入专题](tutorials/2026-hot-open-source-ai-projects-navigation.md) |
| CoPaw | 个人 AI 助手替代路线 | 想比较 OpenClaw 替代方案的人 | [进入专题](tutorials/copaw-topic-index.md) |
| RuView | WiFi 感知 / 无摄像头检测 | 喜欢硬核黑科技的人 | [进入专题](tutorials/ruview-topic-index.md) |
| worldmonitor | 全球情报 / OSINT / 地图 | 做研究、情报、宏观观察的人 | [进入专题](tutorials/worldmonitor-topic-index.md) |
| GitNexus | 代码知识图谱 / MCP | 高频 AI 编程用户 | [进入专题](tutorials/gitnexus-topic-index.md) |
| deer-flow | 多智能体 / Super Agent | 想搭复杂 Agent 平台的人 | [进入专题](tutorials/deer-flow-topic-index.md) |

---

## 🧭 推荐阅读路线

### 路线 A：你想搭自己的 AI 助手
1. [Arm 飞牛 Docker 安装 OpenClaw 调配详解](tutorials/openclaw-fly-nas-deployment.md)
2. [OpenClaw 配 GPT-5.4 实战教程](tutorials/openclaw-gpt-5.4-guide.md)
3. [阿里云 OpenClaw 网关配置排障与 HTTPS 反代修复实战](tutorials/openclaw-aliyun-gateway-troubleshooting.md)
4. [OpenClaw 阿里云服务器运维备忘录](tutorials/openclaw-aliyun-ops-memo.md)
5. [OpenClaw 阿里云服务器运维脚本使用说明](tutorials/openclaw-aliyun-ops-script.md)
6. [OpenClaw 阿里云一键远程脚本使用说明](tutorials/remote-openclaw-aliyun-script.md)
7. [飞牛 NAS 上 Ollama + OpenClaw 联动实战教程](tutorials/flynas-ollama-openclaw-integration.md)
8. [飞牛 NAS 上 OpenClaw + QQ 机器人 / 飞书 / Telegram 多通道接入教程](tutorials/flynas-openclaw-multi-channel-guide.md)

### 路线 E：你在阿里云上折腾 OpenClaw，想快速救火
1. [阿里云 OpenClaw 网关配置排障与 HTTPS 反代修复实战](tutorials/openclaw-aliyun-gateway-troubleshooting.md)
2. [OpenClaw 阿里云服务器运维备忘录](tutorials/openclaw-aliyun-ops-memo.md)
3. [OpenClaw 阿里云服务器运维脚本使用说明](tutorials/openclaw-aliyun-ops-script.md)
4. [OpenClaw 阿里云一键远程脚本使用说明](tutorials/remote-openclaw-aliyun-script.md)
5. [OpenClaw 配 GPT-5.4 实战教程](tutorials/openclaw-gpt-5.4-guide.md)

### 路线 B：你想看 2026 最值得折腾的 AI 开源项目
1. [2026 爆款开源 AI 项目精选教程导航](tutorials/2026-hot-open-source-ai-projects-navigation.md)
2. [CoPaw 专题封面页](tutorials/copaw-topic-index.md)
3. [worldmonitor 专题封面页](tutorials/worldmonitor-topic-index.md)
4. [GitNexus 专题封面页](tutorials/gitnexus-topic-index.md)
5. [deer-flow 专题封面页](tutorials/deer-flow-topic-index.md)

### 路线 C：你想搭更硬核的未来工具链
1. [RuView 专题封面页](tutorials/ruview-topic-index.md)
2. [worldmonitor 本地部署与 Ollama 联动教程](tutorials/worldmonitor-local-ollama-guide.md)
3. [GitNexus + MCP + Claude Code / Cursor 使用教程](tutorials/gitnexus-mcp-guide.md)
4. [deer-flow 技能系统与子代理机制详解](tutorials/deer-flow-skills-subagents-guide.md)

### 路线 D：你想掌握 OpenClaw 多 Agent 架构
1. [OpenClaw 多 Agent 配置入门](tutorials/OpenClaw多Agent配置入门.md)
2. [OpenClaw 高级 Agent 工作流编排](tutorials/OpenClaw高级Agent工作流编排.md)
3. [实战：用 OpenClaw 多 Agent 构建智能助手系统](tutorials/实战用OpenClaw多Agent构建智能助手系统.md)

---

## 🧪 这个站里有什么

<div class="metal-stats">
  <div class="metal-stat">
    <span class="metal-stat-number">51</span>
    <span class="metal-stat-label">篇教程</span>
  </div>
  <div class="metal-stat">
    <span class="metal-stat-number">15</span>
    <span class="metal-stat-label">项目教程</span>
  </div>
  <div class="metal-stat">
    <span class="metal-stat-number">5</span>
    <span class="metal-stat-label">专题封面页</span>
  </div>
  <div class="metal-stat">
    <span class="metal-stat-number">1</span>
    <span class="metal-stat-label">总导航页</span>
  </div>
</div>

---

## ✨ 站点特性

- **Docsify 驱动**：纯静态、轻量、易维护
- **自定义域名**：`https://x.zttz.eu.org`
- **全文搜索**：快速检索项目与教程
- **Giscus 评论**：支持 GitHub Discussions 讨论
- **GA4 统计**：观察访问与阅读行为
- **视频嵌入**：教程视频可直接观看
- **项目速览卡片**：每篇新专题都有快速判断模块
- **未来风视觉**：深空、金属、冷蓝科技感首页

---

## 🚀 从这里开始

如果你不想犹豫，直接从这四个入口选一个：

- [进入 OpenClaw / 飞牛 NAS 专题](tutorials/openclaw-fly-nas-deployment.md)
- [进入阿里云 OpenClaw 网关排障专题](tutorials/openclaw-aliyun-gateway-troubleshooting.md)
- [进入 2026 热门开源 AI 项目导航](tutorials/2026-hot-open-source-ai-projects-navigation.md)
- [进入 worldmonitor 全球情报专题](tutorials/worldmonitor-topic-index.md)

---

## 💬 反馈与讨论

如果你有想继续扩展的方向，比如：

- 更多 OpenClaw / CoPaw / deer-flow 教程
- 更多本地 AI 与 NAS 项目
- 更多 OSINT / 情报 / 自动化工具精选

都可以直接在评论区或者 GitHub Discussions 里继续提。这个站本来就是要持续长大的。
