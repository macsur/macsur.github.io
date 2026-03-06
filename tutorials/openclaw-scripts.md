---
title: "OpenClaw 自动化脚本合集"
category: "tutorial"
tags: ["openclaw", "automation", "scripts"]
date: 2025-06-20
---

# 🤖 OpenClaw 自动化脚本合集

> 让重复工作自动化，每天节省 2 小时

<div align=center>

![OpenClaw Logo](https://via.placeholder.com/200x100/4A90E2/FFFFFF?text=OpenClaw)  
*🚀 一键搞定新闻抓取、TTS 播报、定时提醒*

</div>

---

## 📦 脚本概览

本合集包含 **5 个实用自动化脚本**，全部基于 OpenClaw 环境：

| 脚本 | 功能 | 难度 | 使用频率 |
|------|------|------|----------|
| `tech_news_digest.py` | 多源技术新闻抓取 + 摘要 | ⭐⭐ | 每日 |
| `send_reminder.py` | Telegram 自动提醒推送 | ⭐ | 每日 |
| `generate_news_audio.sh` | TTS 音频生成 + 蓝牙播放 | ⭐⭐ | 按需 |
| `deploy_agentdvr.sh` | AgentDVR 一键部署 | ⭐⭐⭐ | 一次性 |
| `check_services.sh` | 服务健康检查 | ⭐ | 每周 |

---

## 🎯 快速部署

### 1️⃣ 克隆脚本到本地

```bash
cd /Users/ttnk/.openclaw/workspace
git clone https://github.com/gitmeus/openclaw-experience-summary.git scripts/
```

### 2️⃣ 配置环境

```bash
# 确保脚本可执行
chmod +x scripts/*.sh scripts/*.py

# 创建日志目录
mkdir -p logs
```

### 3️⃣ 测试运行

```bash
# 测试新闻抓取
python3 scripts/tech_news_digest.py

# 测试提醒
python3 scripts/send_reminder.py
```

---

## 📚 详细文档

### 1. 多源技术新闻摘要 (`tech_news_digest.py`)

#### 功能说明
- 从 **8 个技术媒体**自动抓取最新文章
- 智能分类：AI、硬件、安全、商业、政策
- 生成精美 Markdown 报告
- 支持 cron 定时运行

#### 支持源列表

| 来源 | 优先级 | 状态 |
|------|--------|------|
| The Verge | 1 | ✅ |
| Ars Technica | 2 | ✅ |
| Engadget | 3 | ✅ |
| TechCrunch | 4 | ⚠️ 有时 451 |
| 9to5Mac | 5 | ⚠️ 需调整 |
| MacRumors | 6 | ✅ |
| Techmeme | 7 | ✅ |
| Wired | 8 | ⚠️ 偶发 404 |

#### 配置 cron

```bash
# 每日 05:00 生成
0 5 * * * cd /Users/ttnk/.openclaw/workspace && python3 scripts/tech_news_digest.py >> logs/cron_news_$(date +\%Y-\%m-\%d).log 2>&1

# 每日 09:00 提醒
0 9 * * * cd /Users/ttnk/.openclaw/workspace && python3 scripts/send_reminder.py >> logs/cron_reminder_$(date +\%Y-\%m-\%d).log 2>&1
```

#### 输出文件

```
workspace/
├── Tech_News_Digest_YYYY-MM-DD.md   # 每日报告
├── Tech_News_Digest_Latest.md       # 最新版本（symlink/copy）
└── logs/
    └── cron_news_*.log              # 运行日志
```

---

### 2. Telegram 提醒 (`send_reminder.py`)

#### 功能
- 读取最新的新闻摘要
- 提取预览内容
- 推送 Telegram 消息（通过 OpenClaw 自动路由）

#### 自定义消息模板

编辑脚本中的 `main()` 函数，修改 `message` 变量：

```python
message = f"""📰 **今日技术新闻摘要已生成！**

🕐 生成时间: {datetime.now().strftime('%Y-%m-%d')}
📊 文章总数: {article_count} 篇

**快速预览：**
{preview}...

📖 查看完整报告：
`Tech_News_Digest_Latest.md`

🔗 或访问仓库：
https://github.com/gitmeus/openclaw-experience-summary
"""
```

---

### 3. TTS 音频生成 (`generate_news_audio.sh`)

#### 使用场景
- 将新闻摘要转为语音
- 通过天猫精灵/蓝牙音箱播放
- 支持定时播报

#### 依赖
- macOS `say` 命令（内置）
- `afplay` 音频播放
- `blueutil` 蓝牙控制（可选）
- `ffmpeg` 格式转换（可选）

#### 运行方式

```bash
# 手动生成今日新闻音频
bash scripts/generate_news_audio.sh

# 日志查看
tail -f logs/news_audio_*.log
```

#### 集成到 cron

```bash
# 每天 07:00 生成音频
0 7 * * * bash /Users/ttnk/.openclaw/workspace/scripts/generate_news_audio.sh
```

---

### 4. AgentDVR 一键部署 (`deploy_agentdvr.sh`)

#### 目标环境
- 飞牛 NAS（Armbian x86_64）
- 已安装 Docker
- 萤石云摄像头 RTSP 地址已知

#### 用法

```bash
# 上传脚本到 NAS
scp deploy_agentdvr.sh admin@192.168.50.106:/tmp/

# SSH 到 NAS 执行
ssh admin@192.168.50.106
cd /tmp
chmod +x deploy_agentdvr.sh
./deploy_agentdvr.sh
```

#### 脚本特性
- 自动检测 Docker 环境
- 创建必要目录并设置权限
- 拉取最新镜像
- 清理旧容器
- 使用 host 网络模式运行
- 提供完整的访问信息

#### 成功后访问
```
http://192.168.50.106:8090
admin / zzaaqq11@@ZZXXCC
```

---

### 5. 服务健康检查 (`check_services.sh` - 示例)

创建自定义检查脚本：

```bash
#!/bin/bash
# check_services.sh - 检查关键服务状态

echo "=== 服务状态检查 $(date) ==="

# 检查 Docker 容器
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "AgentDVR|xiaoai-assistant"

# 检查端口监听
echo "" && echo "端口监听:" && ss -tlnp | grep -E ":8090|:4399"

# 检查磁盘空间
echo "" && echo "磁盘使用:" && df -h | grep "/vol1"

# 检查最新新闻文件
echo "" && echo "最新新闻:" && ls -lh Tech_News_Digest_Latest.md

echo "" && echo "✅ 检查完成"
```

---

## 🔧 自定义与扩展

### 添加新的新闻源

编辑 `tech_news_digest.py` 第 12 行：

```python
SOURCES = {
    "the_verge": {
        "url": "https://r.jina.ai/http://theverge.com/tech",
        "name": "The Verge",
        "priority": 1
    },
    # 添加新源
    "your_source": {
        "url": "https://r.jina.ai/http://example.com/feed",
        "name": "Example News",
        "priority": 9
    }
}
```

### 修改 TTS 语音

在 `generate_news_audio.sh` 中修改：

```bash
say -r 160 -v "Ting-Ting" -f "$TEXT_FILE" -o "$AUDIO_FILE"
#              ^^^^^^^^^ 音色选择：Ting-Ting / Sin-Jian / ...
```

可用音色列表：`say -v ?`

### 调整新闻分类关键词

编辑 `tech_news_digest.py` 的 `categorize()` 方法：

```python
keywords = {
    'ai': ['AI', '人工智能', '机器学习', 'GPT', 'Claude', 'Gemini', 'LLM'],
    'hardware': ['MacBook', 'iPhone', 'Android', '芯片', '手机', '笔记本'],
    # 添加更多...
}
```

---

## 🐛 故障排查

### ❌ `docker: command not found`

确保 Docker 已安装并加入 PATH：
```bash
which docker || echo "Docker not found"
```

飞牛 NAS 上通过 `sudo systemctl start docker` 启动。

---

### ❌ Python 脚本权限错误

```bash
chmod +x scripts/*.py
```

---

### ❌ 新闻源返回 0 篇文章

可能原因：
1. 目标网站结构变化
2. Jina AI 聚合服务暂时不可用
3. 网络限制

解决：临时注释掉该源，或调整解析逻辑。

---

### ❌ Telegram 消息未收到

检查：
1. OpenClaw 是否在线（`openclaw status`）
2. Telegram 连接是否正常
3. 消息日志：`logs/cron_reminder_*.log`

---

## 📊 监控与日志

所有脚本日志位于 `logs/` 目录：

```bash
# 查看今日新闻抓取日志
tail -f logs/cron_news_$(date +%Y-%m-%d).log

# 查看提醒日志
tail -f logs/cron_reminder_$(date +%Y-%m-%d).log

# 查看音频生成日志
tail -f logs/news_audio_$(date +%Y-%m-%d).log
```

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

**常见改进方向**：
- 增加更多新闻源（国内媒体）
- 优化分类算法（机器学习）
- 添加 RSS/Email 输出
- 集成更多 TTS 引擎（Noiz、Kokoro）

---

**最后更新**: 2025-06-20  
**维护**: MacSur Team  
**协议**: MIT
