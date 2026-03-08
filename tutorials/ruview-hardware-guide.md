# RuView 硬件路线与 CSI 感知原理详解
> 项目地址：https://github.com/ruvnet/RuView

![RuView 硬件配图](https://opengraph.githubassets.com/1/ruvnet/RuView)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 为什么 RuView 不是“装上就能用”

因为它依赖的是 **CSI（Channel State Information）**，不是普通 WiFi 联网能力。

---

## 三类硬件路线

### 1. ESP32 Mesh（推荐）
- 成本相对低
- 适合实验与边缘部署
- 可实现多节点感知

### 2. 研究网卡
- 如 Intel 5300 / Atheros AR9580
- 更偏科研与实验室路线

### 3. 普通笔记本 WiFi
- 通常只能做 RSSI 粗粒度存在检测
- 无法替代真正 CSI 路线

---

## 为什么多节点更重要

单节点看不到完整空间，多节点才能形成更稳定的空间感知与多路径融合。

---

## 总结

> **RuView 的门槛不在软件，而在于你是否真的具备 CSI 级硬件条件。**
