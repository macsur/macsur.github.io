# CoPaw 全面上手教程：阿里系 OpenClaw 替代方案实战
> 项目地址：https://github.com/agentscope-ai/CoPaw

![CoPaw 项目配图](https://opengraph.githubassets.com/1/agentscope-ai/CoPaw)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 项目简介

CoPaw 是一个面向个人 AI 助手场景的开源项目，定位非常接近 OpenClaw / 类 Agent 助手平台：

- 支持多消息通道
- 支持本地部署或云端部署
- 支持技能扩展、记忆、定时任务
- 支持本地模型与云模型混合使用

如果你喜欢 OpenClaw 的理念，但又想看看阿里系 / AgentScope 生态里有哪些替代方案，CoPaw 非常值得一看。

---

## 核心亮点

- **安装门槛低**：支持 pip、一键脚本、Docker
- **多通道**：支持钉钉、飞书、QQ、Discord、iMessage 等
- **本地可控**：配置、记忆、技能都在自己手里
- **对新手友好**：自带 Console 界面

---

## 快速开始

### 方式一：pip 安装
```bash
pip install copaw
copaw init --defaults
copaw app
```

默认打开：`http://127.0.0.1:8088/`

### 方式二：Docker 安装
```bash
docker pull agentscope/copaw:latest
docker run -p 127.0.0.1:8088:8088 -v copaw-data:/app/working agentscope/copaw:latest
```

---

## 适合谁用

- 想自建个人 AI 助手的人
- 想做多通道机器人联动的人
- 想对比 OpenClaw / CoPaw 生态的人
- 想快速搭一个可交互 Agent 控制台的人

---

## 推荐玩法

1. 先本地 Docker 跑起来
2. 再配置一个消息通道（如飞书 / Telegram）
3. 再接入 Ollama 或云模型
4. 再尝试技能与定时任务

---

## 与 OpenClaw 的区别

### CoPaw 更偏：
- 安装友好
- 官方文档清晰
- 控制台配置体验更直观

### OpenClaw 更偏：
- 工具/生态更灵活
- Workspace 与技能机制更“黑客风”
- 更适合深度定制流派

---

## 总结

如果你要一句话理解 CoPaw：

> **它像是一个更面向普通用户与多通道接入的个人 AI 助手平台，是 OpenClaw 非常值得比较的替代方案。**
