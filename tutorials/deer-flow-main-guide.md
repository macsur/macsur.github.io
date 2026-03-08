# deer-flow 全面教程：字节跳动多智能体框架实战入门
> 项目地址：https://github.com/bytedance/deer-flow

![deer-flow 项目配图](https://opengraph.githubassets.com/1/bytedance/deer-flow)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 项目简介

deer-flow 是字节跳动开源的一个“Super Agent Harness”，核心思想不是只做一个聊天机器人，而是做一个：

- 有技能
- 有子代理
- 有沙箱
- 有长期记忆
- 能跑复杂多步骤任务

的多智能体执行平台。

---

## 核心亮点

- 支持子代理拆分任务
- 支持技能与工具扩展
- 支持沙箱执行
- 支持 MCP Server
- 支持 Telegram / Slack / 飞书等 IM 通道

---

## 快速开始

### Docker 推荐
```bash
git clone https://github.com/bytedance/deer-flow.git
cd deer-flow
make config
make docker-init
make docker-start
```

访问：`http://localhost:2026`

---

## deer-flow 与普通 Agent 的不同

普通 Agent：
- 更像单线程问答

Deer-flow：
- 更像任务编排平台
- 可以把复杂任务拆给多个 agent 并行处理

---

## 总结

> **deer-flow 更像一套“Agent 基础设施”，而不是单一聊天应用。**
