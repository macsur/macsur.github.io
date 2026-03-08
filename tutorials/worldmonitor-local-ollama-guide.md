# worldmonitor 本地部署与 Ollama 联动教程
> 项目地址：https://github.com/koala73/worldmonitor

![worldmonitor Ollama 配图](https://opengraph.githubassets.com/1/koala73/worldmonitor)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>worldmonitor</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>本地部署 / Ollama</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>Vercel Dev / Ollama</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>想本地跑全球情报面板的人</div>
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

## 推荐玩法

worldmonitor 最有意思的一点，是它支持本地 LLM 路线。

推荐组合：
- worldmonitor 前端/服务
- Ollama 本地模型
- 局域网部署或个人工作站部署

---

## 关键环境变量

例如：

```env
OLLAMA_API_URL=http://192.168.50.106:11434
OLLAMA_MODEL=qwen3.5:cloud
```

也可以换成本地模型如：
- qwen2.5:7b
- gemma:2b

---

## 启动建议

完整模式：
```bash
vercel dev
```

如果只是 `npm run dev`，通常更像跑一个静态前端预览，不等于全功能环境。

---

## 总结

> **worldmonitor 最强的不是界面，而是“实时情报 + 本地 AI”这条路线真的跑得通。**
