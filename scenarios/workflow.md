# 💼 工作流优化场景

> 用自动化脚本把 Mac 变成高效生产力工具

<div align=center>

![工作流优化](https://via.placeholder.com/1200x400/4299E1/FFFFFF?text=MacSur+%E2%80%94+%E5%B7%A5%E4%BD%9C%E6%B5%81%E4%BC%98%E5%8C%96)  
*🚀 从繁琐重复中解放出来*

</div>

---

## 🎯 场景概述

本场景适合：**程序员、产品经理、内容创作者**等需要处理大量重复任务的 Mac 用户。

### 核心方案

| 需求 | 解决方案 | 对应教程 |
|------|----------|----------|
| 每日技术资讯 | 多源新闻摘要 + Telegram 推送 | [新闻摘要系统](../tutorials/news-digest.md) |
| 快速搜索 | SEARXNG 自托管搜索引擎 | [SEARXNG 教程](../tutorials/searxng.md) |
| 网络调试 | Agent Reach 全能代理 | [Agent Reach 教程](../tutorials/agent-reach.md) |
| API 测试 | CLIProxyAPI 命令行代理 | [CLIProxyAPI 教程](../tutorials/cliproxypi-api.md) |
| 自动化提醒 | OpenClaw cron 定时任务 | [脚本合集](../tutorials/openclaw-scripts.md) |

---

## 📋 典型工作日

### 🌅 早晨 (08:00 - 09:00)

| 时间 | 任务 | 自动化方案 |
|------|------|------------|
| 08:55 | 查看今日技术新闻 | ✅ **自动推送**到 Telegram |
| 09:00 | 收听新闻摘要 | ✅ **TTS 播报**通过蓝牙音箱 |

**后台运行**：
```bash
# crontab 配置
0 5 * * * python3 scripts/tech_news_digest.py
0 9 * * * python3 scripts/send_reminder.py
7 9 * * * bash scripts/generate_news_audio.sh
```

---

### 🕙 上午 (09:00 - 12:00)

**开发工作流**：

1. **快速搜索**
   - 使用本地 SEARXNG 实例（`http://localhost:8080`）
   - 无追踪、无广告、多引擎聚合

2. **网络调试**
   - 启动 Agent Reach：
   ```bash
   agent-reach up --env=prod
   ```
   - 配置浏览器代理：`127.0.0.1:8080`

3. **API 测试**
   ```bash
   # 使用 CLIProxyAPI 转发请求
   cli-proxy --endpoint https://api.openai.com/v1/chat/completions \
     --headers "Authorization: Bearer $OPENAI_API_KEY"
   ```

---

### 🕐 下午 (14:00 - 18:00)

**会议 & 协作**：

- **Telegram 流式对话**：开启推理气泡，实时看到 AI 输出进度
- **临时邮箱收件**：使用 Gmail 临时邮箱注册测试账号
- **文档管理**：在 Discourse 论坛记录会议纪要

---

## 🎛️ 一鍵启动工作环境

创建 `start-workflow.sh`：

```bash
#!/bin/bash
# 一键启动工作环境

echo "🚀 启动工作流..."

# 1. 启动 SEARXNG
docker start searxng 2>/dev/null || echo "SEARXNG 未运行"

# 2. 启动 Agent Reach
cd ~/agent-reach
agent-reach up --env=prod &

# 3. 设置系统代理
networksetup -setwebproxy Wi-Fi 127.0.0.1 8080
networksetup -setsecurewebproxy Wi-Fi 127.0.0.1 8080

# 4. 打开常用网站
open "http://localhost:8080"  # SEARXNG
open "https://github.com"
open "https://linear.app"

# 5. 显示今日新闻摘要
cat /Users/ttnk/.openclaw/workspace/Tech_News_Digest_Latest.md | grep -A 20 "## 📰"

echo "✅ 工作环境就绪！"
```

---

## 🗂️ 文件组织建议

```
~/Work/
├── Inbox/              # 临时文件，每日清理
├── Projects/           # 进行中的项目
│   ├── project-a/
│   └── project-b/
├── References/         # 参考资料
│   ├── Tutorials/     # 本教程文档（本地副本）
│   └── API-Docs/
├── Archives/           # 归档（每月整理）
└── Templates/          # 常用模板
    ├── email.txt
    └── report.md
```

**配合自动脚本**：
```bash
# 每日 08:00 清理 Inbox
0 8 * * * rm -rf ~/Work/Inbox/*

# 每周五 17:00 归档本周文件
0 17 * * 5 mv ~/Work/Projects/active/* ~/Work/Archives/$(date +%Y-%m)/
```

---

## 📈 效率对比

| 指标 | 手动方式 | MacSur 自动化 | 提升 |
|------|----------|---------------|------|
| 获取技术资讯 | 30min/天 | 5min/天 | **6x** |
| API 调试 | 15min/次 | 2min/次 | **7.5x** |
| 临时邮箱管理 | 5min/次 | 0min（自动） | **∞** |
| 网络代理切换 | 10min/次 | 1min（脚本） | **10x** |

**每日节省**: 约 **2 小时** ⏰

---

## 🎨 自定义建议

### 增加更多数据源

修改 `tech_news_digest.py`，添加国内技术媒体：

```python
"infoq_cn": {
    "url": "https://r.jina.ai/http://www.infoq.cn",
    "name": "InfoQ 中文",
    "priority": 3
},
"oschina": {
    "url": "https://r.jina.ai/http://www.oschina.net",
    "name": "开源中国",
    "priority": 4
},
```

---

### 接入 Slack/DingTalk

扩展 `send_reminder.py`：

```python
def send_dingtalk(message):
    # 使用钉钉机器人 Webhook
    import requests
    webhook = "https://oapi.dingtalk.com/robot/send?access_token=xxx"
    requests.post(webhook, json={"msgtype": "markdown", "markdown": message})

# 在 main() 中调用
send_dingtalk(message)
```

---

## 🏆 最佳实践

1. **统一入口**：所有工具集中管理，不要分散在各处
2. **配置即代码**：`.env`、`crontab`、脚本都提交到 Git
3. **日志集中**：所有输出重定向到 `~/Library/Logs/macsur/`
4. **定期审计**：每月检查一次自动化任务是否正常
5. **降级方案**：每个自动化都有 Manual 替代方式

---

## 🆘 工作流故障排查

### ❌ 新闻摘要未生成？

```bash
# 1. 检查 cron 是否运行
crontab -l

# 2. 查看日志
tail -f /Users/ttnk/.openclaw/workspace/logs/cron_news_*.log

# 3. 手动测试
python3 scripts/tech_news_digest.py
```

---

### ❌ 代理无法上网？

```bash
# 检查 Agent Reach 状态
agent-reach status

# 查看代理进程
ps aux | grep agent-reach

# 重置系统代理
networksetup -setwebproxy Wi-Fi off
networksetup -setsecurewebproxy Wi-Fi off
```

---

## 📊 进阶：集成 Home Assistant

```yaml
# configuration.yaml
automation:
  - alias: "Morning News Briefing"
    trigger:
      platform: time
      at: "09:00:00"
    action:
      - service: tts.google_say
        data:
          message: "早上好，今日技术新闻摘要已生成，请查看 Telegram"
          entity_id: media_player.living_room_speaker
```

---

## 🚀 下一步

- 阅读 [智能家居集成](smarthome.md) 场景
- 查看 [学习资料整理](#) 场景
- 浏览 [全部教程](../tutorials/) 挑选感兴趣的内容

---

**立即开始**: 安装 [SEARXNG](../tutorials/searxng.md) 或配置 [新闻摘要](../tutorials/news-digest.md)  
**预计耗时**: 1 小时配置，每天节省 2 小时 🎯
