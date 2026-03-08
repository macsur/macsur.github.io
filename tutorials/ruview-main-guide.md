# RuView 全面体验教程：WiFi 感知人体活动的黑科技项目
> 项目地址：https://github.com/ruvnet/RuView

![RuView 项目配图](https://opengraph.githubassets.com/1/ruvnet/RuView)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>RuView</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>WiFi 感知 / 边缘 AI</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>Docker + CSI 硬件</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>对 RF sensing 感兴趣的人</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐指数：</strong>9.0/10</div>
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

---

## 🔗 继续阅读

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:18px 0 8px 0;">
  <a href="ruview-topic-index.md" style="display:block;padding:14px 16px;border:1px solid #dbeafe;border-radius:14px;background:linear-gradient(180deg,#f8fbff 0%,#eef6ff 100%);text-decoration:none;color:#1e3a8a;">
    <strong>📘 返回专题页</strong><br>
    <span style="font-size:0.92em;color:#475569;">继续看同一项目的完整路线</span>
  </a>
  <a href="2026-hot-open-source-ai-projects-navigation.md" style="display:block;padding:14px 16px;border:1px solid #ddd6fe;border-radius:14px;background:linear-gradient(180deg,#fbfaff 0%,#f4f0ff 100%);text-decoration:none;color:#5b21b6;">
    <strong>🧭 返回总导航</strong><br>
    <span style="font-size:0.92em;color:#475569;">回到 5 大项目专题总入口</span>
  </a>
  <a href="ruview-hardware-guide.md" style="display:block;padding:14px 16px;border:1px solid #dcfce7;border-radius:14px;background:linear-gradient(180deg,#f8fff9 0%,#eefdf3 100%);text-decoration:none;color:#166534;">
    <strong>➡ 下一篇推荐</strong><br>
    <span style="font-size:0.92em;color:#475569;">RuView 硬件路线与 CSI 感知原理详解</span>
  </a>
</div>

