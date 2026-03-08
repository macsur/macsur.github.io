# GitNexus + MCP + Claude Code / Cursor 使用教程
> 项目地址：https://github.com/abhigyanpatwari/GitNexus

![GitNexus MCP 配图](https://opengraph.githubassets.com/1/abhigyanpatwari/GitNexus)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>GitNexus</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>MCP / Claude Code / Cursor</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>CLI + MCP</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>深度 AI 编程用户</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐指数：</strong>9.4/10</div>
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

## 为什么 GitNexus 特别适合 MCP

因为 MCP 适合暴露“结构化工具”，而 GitNexus 正好能提供：

- 查询
- 上下文视图
- 影响分析
- 仓库列表
- Cypher 图查询

---

## 推荐流程

### 1. 在仓库根目录执行
```bash
npx gitnexus analyze
```

### 2. 配 MCP
```bash
npx gitnexus setup
```

### 3. 给编辑器接入
- Claude Code
- Cursor
- OpenCode
- Windsurf

---

## 价值点

这会让 AI 从“只会 grep 文件”进化成“能理解代码关系图谱”。

---

## 总结

> **如果你经常让 AI 改大仓库，GitNexus 的 MCP 集成非常值得试。**
