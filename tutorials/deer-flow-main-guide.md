# deer-flow 全面教程：字节跳动多智能体框架实战入门
> 项目地址：https://github.com/bytedance/deer-flow

![deer-flow 项目配图](https://opengraph.githubassets.com/1/bytedance/deer-flow)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>deer-flow</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>多智能体框架 / Super Agent</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>Docker / 本地开发</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>想搭复杂 Agent 系统的人</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐指数：</strong>9.3/10</div>
</div>

---

## 🎬 教程视频速览

> 建议先看 3~5 分钟视频快速建立整体印象，再继续阅读下方图文教程，理解会更顺。

<div style="border:1px solid #e5e7eb;border-radius:16px;padding:16px 16px 10px 16px;background:linear-gradient(180deg,#fafcff 0%,#f6f8ff 100%);box-shadow:0 8px 24px rgba(15,23,42,0.06);margin:18px 0;">
  <div style="font-size:1.05rem;font-weight:700;margin-bottom:8px;">▶ 项目演示 / 教程视频</div>
  <div style="color:#475569;font-size:0.95rem;line-height:1.8;margin-bottom:14px;">
    这段视频适合先快速了解项目定位、核心玩法和上手路径；如果你更关心部署细节、参数配置和实战建议，再继续看本文正文即可。
  </div>
  <iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius:12px;"></iframe>
</div>

> **适合人群：** 想先快速了解项目值不值得折腾的人；想边看演示边对照教程操作的人。

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
