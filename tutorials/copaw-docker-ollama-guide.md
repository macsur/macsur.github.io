# CoPaw + Docker + Ollama 部署教程
> 项目地址：https://github.com/agentscope-ai/CoPaw

![CoPaw Docker 配图](https://opengraph.githubassets.com/1/agentscope-ai/CoPaw)

---

## 项目速览卡片

<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0 22px 0;">
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目名称：</strong>CoPaw</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>项目类型：</strong>本地部署 / Ollama 联动</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>上手难度：</strong>⭐⭐</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐部署：</strong>Docker</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>适合人群：</strong>想本地化运行 CoPaw 的人</div>
  <div style="border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#ffffff;"><strong>推荐指数：</strong>8.7/10</div>
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

## 这篇讲什么

这篇专门讲 CoPaw 的本地化部署：用 Docker 跑 CoPaw，再接 Ollama 做本地模型。

---

## 推荐部署结构

```text
浏览器 / 消息通道
   ↓
CoPaw
   ↓
Ollama
```

---

## Docker 启动
```bash
docker run -p 127.0.0.1:8088:8088   --add-host=host.docker.internal:host-gateway   -v copaw-data:/app/working   agentscope/copaw:latest
```

---

## 连接 Ollama

如果 Ollama 跑在宿主机：

```txt
http://host.docker.internal:11434/v1
```

然后在 CoPaw 的模型设置中填写 Base URL 即可。

---

## 推荐模型

- qwen2.5:7b
- gemma:2b
- llama3.x 系列

---

## 排错重点

- Docker 里 `localhost` 不是宿主机
- 模型服务地址必须可从容器内访问
- 若 UI 能开但模型不工作，优先查 Base URL 与模型发现

---

## 总结

> **CoPaw 配 Ollama 的关键不是“安装”，而是容器网络是否打通。**

---

## 🔗 继续阅读

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:18px 0 8px 0;">
  <a href="copaw-topic-index.md" style="display:block;padding:14px 16px;border:1px solid #dbeafe;border-radius:14px;background:linear-gradient(180deg,#f8fbff 0%,#eef6ff 100%);text-decoration:none;color:#1e3a8a;">
    <strong>📘 返回专题页</strong><br>
    <span style="font-size:0.92em;color:#475569;">继续看同一项目的完整路线</span>
  </a>
  <a href="2026-hot-open-source-ai-projects-navigation.md" style="display:block;padding:14px 16px;border:1px solid #ddd6fe;border-radius:14px;background:linear-gradient(180deg,#fbfaff 0%,#f4f0ff 100%);text-decoration:none;color:#5b21b6;">
    <strong>🧭 返回总导航</strong><br>
    <span style="font-size:0.92em;color:#475569;">回到 5 大项目专题总入口</span>
  </a>
  <a href="copaw-channels-skills-guide.md" style="display:block;padding:14px 16px;border:1px solid #dcfce7;border-radius:14px;background:linear-gradient(180deg,#f8fff9 0%,#eefdf3 100%);text-decoration:none;color:#166534;">
    <strong>➡ 下一篇推荐</strong><br>
    <span style="font-size:0.92em;color:#475569;">CoPaw 多通道与技能系统扩展阅读</span>
  </a>
</div>

