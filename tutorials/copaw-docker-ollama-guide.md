# CoPaw + Docker + Ollama 部署教程
> 项目地址：https://github.com/agentscope-ai/CoPaw

![CoPaw Docker 配图](https://opengraph.githubassets.com/1/agentscope-ai/CoPaw)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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
