# GitNexus 全面教程：把代码仓库变成知识图谱
> 项目地址：https://github.com/abhigyanpatwari/GitNexus

![GitNexus 项目配图](https://opengraph.githubassets.com/1/abhigyanpatwari/GitNexus)

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

GitNexus 是一个非常适合 AI 编程时代的项目：它把代码仓库索引成知识图谱，然后通过 Web UI、CLI、MCP 等方式，把“代码结构理解能力”喂给 AI 助手。

---

## 它解决什么问题

普通 AI 写代码经常会：

- 忽略依赖
- 看漏调用链
- 改坏架构关系
- 做出局部正确、整体错误的修改

GitNexus 的思路就是：

> **先把代码库结构图谱化，再让 AI 基于图谱做理解和分析。**

---

## 两种用法

### 1. Web UI
- 浏览器里直接探索仓库
- 适合快速演示和一次性分析

### 2. CLI + MCP（推荐）
- 本地索引仓库
- 给 Claude Code、Cursor、OpenCode 等提供结构化上下文

---

## 快速开始

```bash
npx gitnexus analyze
npx gitnexus setup
```

---

## 为什么值得关注

它本质上是在补 AI 编程最大短板：**上下文结构缺失**。

---

## 总结

> **GitNexus 很像是“给 AI 编程工具补一层代码知识图谱操作系统”。**
