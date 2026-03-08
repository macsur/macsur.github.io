# RuView 全面体验教程：WiFi 感知人体活动的黑科技项目
> 项目地址：https://github.com/ruvnet/RuView

![RuView 项目配图](https://opengraph.githubassets.com/1/ruvnet/RuView)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 项目简介

RuView 是一个非常硬核的项目：它试图利用 WiFi 信号做人体存在检测、姿态估计、呼吸与心率感知，甚至支持一定程度的穿墙感知。

它的核心思想是：

> **不依赖摄像头，而是依赖无线信号变化来理解空间中的人类活动。**

---

## 项目亮点

- 不使用摄像头，隐私友好
- 支持 CSI 信号级分析
- 支持姿态、呼吸、心率、存在检测
- 支持 ESP32 / 研究网卡等硬件路线

---

## 最快体验方式

```bash
docker pull ruvnet/wifi-densepose:latest
docker run -p 3000:3000 ruvnet/wifi-densepose:latest
```

然后浏览器访问：`http://localhost:3000`

---

## 重要提醒

如果你没有 CSI 硬件，很多高级功能只能看演示或跑验证流程，无法完整复现真实姿态重建效果。

### 完整功能通常需要
- ESP32-S3 节点网格
- 或支持 CSI 的研究型网卡

---

## 适合谁研究

- 做边缘 AI / 传感器的人
- 对 WiFi 感知、RF sensing 感兴趣的人
- 对隐私友好感知方案感兴趣的人
- 想做空间智能 / 无摄像头检测的人

---

## 总结

> **RuView 不是普通 Web 工具，而是把“无线信号感知”真正产品化、工程化的一次很大胆尝试。**
