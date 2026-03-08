# worldmonitor 本地部署与 Ollama 联动教程
> 项目地址：https://github.com/koala73/worldmonitor

![worldmonitor Ollama 配图](https://opengraph.githubassets.com/1/koala73/worldmonitor)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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
