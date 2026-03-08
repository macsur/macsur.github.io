# GitNexus 全面教程：把代码仓库变成知识图谱
> 项目地址：https://github.com/abhigyanpatwari/GitNexus

![GitNexus 项目配图](https://opengraph.githubassets.com/1/abhigyanpatwari/GitNexus)

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
