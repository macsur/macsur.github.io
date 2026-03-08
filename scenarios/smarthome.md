# 🏠 智能家居集成场景

> 用 OpenClaw 串联小爱音箱、Home Assistant、AgentDVR，打造全屋 AI 中枢

<div align=center>

![智能家居](https://via.placeholder.com/1200x400/48BB78/FFFFFF?text=MacSur+%E2%80%94+%E6%99%BA%E6%83%85%E5%AE%B6%E5%B1%85%E6%95%99%E7%A8%8B)  
*🏠 语音控制 + 自动化 + 监控，一体化方案*

</div>

---

## 🎯 场景目标

将以下组件整合为统一智能家居系统：

| 组件 | 角色 | 教程链接 |
|------|------|----------|
| 🤖 **小智 AI** | 语音交互层 | [小爱音箱刷机](../tutorials/xiaoai-speaker-flash.md) |
| 📺 **AgentDVR** | 监控层 | [监控部署](../tutorials/agentdvr.md) |
| 🏡 **Home Assistant** | 控制层 | （外部集成） |
| 📡 **OpenClaw** | 自动化层 | [脚本合集](../tutorials/openclaw-scripts.md) |

---

## 📐 架构图

```
┌─────────────────────────────────────────────────────┐
│                    用户交互层                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐       │
│  │ 小智 AI  │  │ Telegram │  │  Mobile App │       │
│  │ (语音)  │  │ (文本)  │  │ (可视化)    │       │
│  └────┬────┘  └────┬────┘  └──────┬──────┘       │
│       │             │             │                │
├───────┼─────────────┼─────────────┼────────────────┤
│       │   OpenClaw 自动化层   │                │
│  ┌────▼──────┐  ┌────▼──────┐  ┌────▼──────┐   │
│  │ cron 定时 │  │ TTS 播报  │  │ 通知推送  │   │
│  └────┬──────┘  └────┬──────┘  └────┬──────┘   │
│       │             │             │                │
├───────┼─────────────┼─────────────┼────────────────┤
│       │     控制层 (Home Assistant)     │                │
│  ┌────▼──────────────────────────────────▼──────┐   │
│  │  Home Assistant 智能家居中枢                  │   │
│  │  - 设备状态                                  │   │
│  │  - 自动化规则                                │   │
│  │  - 场景切换                                  │   │
│  └──────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│                   执行层                            │
│  ┌────────────┐  ┌──────────┐  ┌─────────────┐   │
│  │   AgentDVR  │  │ 小米智能 │  │  其他设备   │   │
│  │   (监控)   │  │ 家居设备  │  │             │   │
│  └────────────┘  └──────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🛒 购物清单（如有缺失设备）

| 设备 | 用途 | 预算 | 优先级 |
|------|------|------|--------|
| 小爱音箱 Pro | 语音交互 + 蓝牙播放 | ¥299 | 🥇 必需 |
| 萤石云摄像头 | 安防监控 | ¥199起 | 🥇 必需 |
| 飞牛 NAS | 本地服务器 | ¥999 | 🥈 推荐 |
| 小米智能插座 | 远程控制电器 | ¥39 | 🥉 可选 |
| 温湿度传感器 | 自动化触发 | ¥29 | 🥉 可选 |

---

## 🔧 配置步骤

### 第 1 步：部署基础服务

#### 1.1 安装 Home Assistant

最简单方式（Supervised 安装）：

```bash
# 在飞牛 NAS Docker 中运行
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -v /vol1/1000/docker/homeassistant:/config \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

访问：`http://192.168.50.106:8123`

首次启动需等待 20 分钟初始化。

---

#### 1.2 部署 AgentDVR 监控

```bash
# 使用之前提供的脚本
./flyroot_deploy_agentdvr.sh
```

访问：`http://192.168.50.106:8090`

添加萤石云摄像头（RTSP 地址已提供）。

---

#### 1.3 刷机小爱音箱

详细步骤见 [小爱音箱刷机教程](../tutorials/xiaoai-speaker-flash.md)。

关键命令：
```bash
# 进入 Recovery
adb reboot recovery

# 刷入 Openxiaoai
adb push root_patched.squashfs /sdcard/
# 在 Recovery 中安装
```

完成后，音箱具备：
- ✅ 小智 AI 语音助手（GPT/Claude）
- ✅ 蓝牙播放功能
- ✅ 原有小爱同学保留

---

### 第 2 步：连接 Home Assistant

#### 2.1 添加小智 AI 集成

在 Home Assistant：

1. **Settings** → **Devices & Services** → **Add Integration**
2. 搜索 **Xiaoai** 或 **OpenXiaoai**
3. 输入：
   - **IP Address**: 音箱局域网 IP（如 `192.168.50.200`）
   - **Port**: `4399`（小智服务器端口）
   - **Token**: 小智控制台生成的 token

> 如果官方没有集成，可使用 **MQTT** 或 **HTTP 传感器** 手动添加

---

#### 2.2 添加 AgentDVR 摄像头

安装 **ONVIF** 或 **Generic Camera** 集成：

```yaml
# configuration.yaml
camera:
  - platform: onvif
    host: 192.168.50.106
    port: 80
    username: admin
    password: zzaaqq11@@ZZXXCC
    name: "萤石云客厅"
```

或使用 **MJPEG** 流：
```yaml
camera:
  - platform: mjpeg
    mjpeg_url: "http://192.168.50.106:8090/agentdvr/player.html?camera=1"
    name: "AgentDVR Camera 1"
```

---

### 第 3 步：OpenClaw 自动化

#### 3.1 创建 cron 任务

```bash
# 每日 09:00 生成新闻并通过小智播报
0 9 * * * cd /Users/ttnk/.openclaw/workspace && \
  python3 scripts/tech_news_digest.py && \
  say -v "Ting-Ting" -f Tech_News_Digest_Latest.md | \
  bluealsa_aplay "XX:XX:XX:XX:XX:XX"  # 小智音箱蓝牙 MAC

# 每小时检查摄像头状态
0 * * * * curl -s "http://192.168.50.106:8090/agentdvr/api/status" | \
  jq '.cameras[].status' >> /tmp/camera_status.log
```

---

#### 3.2 示例：离家模式

创建 `away-mode.sh`：

```bash
#!/bin/bash
# 离家模式：关闭灯光、启动监控、激活警报

# 1. 通知 Home Assistant
curl -X POST http://192.168.50.106:8123/api/services/automation/trigger \
  -H "Authorization: Bearer $HA_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id":"automation.away_mode"}'

# 2. 启动 AgentDVR 移动侦测录像
curl -X POST "http://192.168.50.106:8090/agentdvr/api/camera/1/motion/enable"

# 3. 发送 Telegram 通知
echo "🏠 离家模式已激活，监控已启动" | \
  openclaw message send --to me

echo "✅ 离家模式完成"
```

执行：`bash away-mode.sh`

---

### 第 4 步：语音控制集成

#### 4.1 小智 AI 调用 Home Assistant

在小智控制台设置 **Webhook**：

```
触发词："打开客厅灯"
动作：HTTP POST
URL: http://192.168.50.106:8123/api/services/light/turn_on
Headers:
  Authorization: Bearer $HA_TOKEN
  Content-Type: application/json
Body:
  {"entity_id":"light.living_room"}
```

---

#### 4.2 场景联动

| 语音指令 | 触发的动作 |
|----------|-----------|
| "我出门了" | 离家模式（所有灯关、监控启） |
| "我回来了" | 回家模式（开灯、关监控） |
| "打开影院模式" | 关灯+开投影+降窗帘 |
| "晚安" | 关所有设备+睡眠监控 |

---

## 📊 监控与通知

### 实时画面查看

```bash
# 使用 ffmpeg 抓取摄像头快照
ffmpeg -i "rtsp://admin:zzaaqq11@@ZZXXCC@192.168.50.108:80/Streaming/Channels/101" \
  -vframes 1 -q:v 2 /tmp/camera_snapshot.jpg

# 通过 Telegram 发送（需要 bot 权限）
openclaw message send --media /tmp/camera_snapshot.jpg \
  --caption "📹 运动检测触发 $(date)"
```

---

### 异常警报

在 Home Assistant 创建自动化：

```yaml
automation:
  - alias: "Camera Motion Alert"
    trigger:
      platform: state
      entity_id: binary_sensor.camera_motion
      to: "on"
    action:
      - service: tts.google_say
        data:
          message: "检测到运动，请查看摄像头"
          entity_id: media_player.xiaoai_speaker
      - service: notify.telegram
        data:
          message: "🚨 摄像头检测到运动！"
          data:
            photo:
              - path: /tmp/camera_snapshot.jpg
```

---

## 🎨 界面定制

### Home Assistant 仪表盘

创建 `smarthome-dashboard.yaml`：

```yaml
title: 智能家居
views:
  - title: 概览
    entities:
      - entity: light.living_room
        name: 客厅灯
      - entity: camera.living_room
        name: 客厅摄像头
      - entity: sensor.temperature
        name: 室内温度

  - title: 监控
    entities:
      - entity: camera.living_room
        type: picture-glance
        camera_view: live
```

---

## 🔐 安全建议

| 风险 | 缓解措施 |
|------|----------|
| **摄像头被入侵** | 使用强密码、关闭公网访问、启用 HTTPS |
| **API Key 泄露** | 存储在 `secrets.yaml`，不提交 Git |
| **网络攻击** | 防火墙限制 IP，仅允许内网访问 |
| **数据隐私** | 录像本地存储，不上传云端 |

---

## 🛠️ 故障排查

### ❌ 小智 AI 无法控制 Home Assistant

1. 确认 HA 可访问：`curl http://192.168.50.106:8123/api/states`
2. 检查 Token 是否有效
3. 查看 Home Assistant 日志：`docker logs homeassistant`

---

### ❌ AgentDVR 摄像头无图像

1. 用 VLC 测试 RTSP 地址
2. 检查摄像头是否在线：`ping 192.168.50.108`
3. 查看 AgentDVR 日志：`docker logs AgentDVR`

---

### ❌ 自动化不触发

```bash
# 检查 cron 任务
crontab -l

# 查看脚本日志
tail -f /Users/ttnk/.openclaw/workspace/logs/cron_*.log

# 手动测试脚本
python3 scripts/tech_news_digest.py
```

---

## 📈 进阶玩法

### 人脸识别告警

结合 Frigate NVR：

```yaml
# Frigate 配置
detect:
  enabled: true
  objects:
    - person

# 检测到人时触发
automation:
  - alias: "Stranger Alert"
    trigger:
      platform: state
      entity_id: binary_sensor.front_door_person
      to: "on"
    action:
      - service: tts.google_say
        data:
          message: "检测到陌生人，请查看门口"
```

---

### 语音日志记录

让 OpenClaw 将交互记录存储到 Home Assistant：

```bash
# 记录每次 AI 对话
echo "$(date): User said '$QUERY', AI replied '$RESPONSE'" >> \
  /config/voice_logs.txt
```

---

## 🗺️ 扩展路线图

| 阶段 | 目标 | 预计时间 |
|------|------|----------|
| **Phase 1** | 基础服务部署完成 | 1-2 小时 |
| **Phase 2** | 语音控制打通 | 3-4 小时 |
| **Phase 3** | 自动化规则完善 | 1-2 天 |
| **Phase 4** | 监控 + 告警 | 2-3 小时 |
| **Phase 5** | 高级功能（人脸识别、预测） | 1 周 |

---

**完成后效果**：

✅ 一句话控制全屋设备  
✅ 摄像头移动侦测自动通知  
✅ 每日新闻语音播报  
✅ 离家自动布防，回家自动撤防  
✅ 所有状态集中管理

---

**继续阅读**:
- [工作流优化](workflow.md) - 提升办公效率
- [学习资料整理](#) - 知识管理系统
- [全部教程](../tutorials/) - 按兴趣选择

🎯 **就从 [小爱音箱刷机](../tutorials/xiaoai-speaker-flash.md) 开始吧！**
