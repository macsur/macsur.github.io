# deer-flow 技能系统与子代理机制详解
> 项目地址：https://github.com/bytedance/deer-flow

![deer-flow 子代理配图](https://opengraph.githubassets.com/1/bytedance/deer-flow)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>deer-flow</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>技能系统 / 子代理机制</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>框架机制</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>对 Agent 编排感兴趣的人</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐指数：</strong>9.2/10</div>
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

## deer-flow 最强的地方

不是 UI，也不是单个模型，而是：

- **Skills**：按需加载能力
- **Sub-agents**：复杂任务自动拆解
- **Context Engineering**：控制上下文膨胀

---

## 为什么子代理重要

复杂任务很少能一轮完成。

例如：
- 调研一个主题
- 生成报告
- 做网页
- 生成幻灯片

这些天然适合拆成多个 agent 并行处理。

---

## 技能系统的价值

技能让能力模块化：
- research
- report-generation
- slide-creation
- image-generation

你也可以加自己的技能。

---

## 总结

> **deer-flow 的真正竞争力，是把“复杂任务拆解执行”做成了基础设施。**

---

## 🔗 继续阅读

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:18px 0 8px 0;">
  <a href="deer-flow-topic-index.md" style="display:block;padding:14px 16px;border:1px solid #dbeafe;border-radius:14px;background:linear-gradient(180deg,#f8fbff 0%,#eef6ff 100%);text-decoration:none;color:#1e3a8a;">
    <strong>📘 返回专题页</strong><br>
    <span style="font-size:0.92em;color:#475569;">继续看同一项目的完整路线</span>
  </a>
  <a href="2026-hot-open-source-ai-projects-navigation.md" style="display:block;padding:14px 16px;border:1px solid #ddd6fe;border-radius:14px;background:linear-gradient(180deg,#fbfaff 0%,#f4f0ff 100%);text-decoration:none;color:#5b21b6;">
    <strong>🧭 返回总导航</strong><br>
    <span style="font-size:0.92em;color:#475569;">回到 5 大项目专题总入口</span>
  </a>
  <a href="deer-flow-channels-sandbox-guide.md" style="display:block;padding:14px 16px;border:1px solid #dcfce7;border-radius:14px;background:linear-gradient(180deg,#f8fff9 0%,#eefdf3 100%);text-decoration:none;color:#166534;">
    <strong>➡ 下一篇推荐</strong><br>
    <span style="font-size:0.92em;color:#475569;">deer-flow 消息通道、沙箱执行与部署扩展阅读</span>
  </a>
</div>

