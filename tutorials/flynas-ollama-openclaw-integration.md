# 飞牛 NAS 上 Ollama + OpenClaw 联动实战教程
> 适用于：飞牛 NAS（fnOS）Docker 环境下，把 Ollama 和 OpenClaw 串起来做本地 Agent 的用户

---

## 这篇教程解决什么问题

很多人已经分别装好了：

- **Ollama**：负责本地模型推理
- **OpenClaw**：负责 Agent 调度、工具调用、消息交互

但“都装好了”不等于“能联动起来”。

真正要跑通，还得解决这些问题：

- OpenClaw 怎么接入 Ollama
- 默认模型怎么切到本地模型
- Docker 挂载和网络怎么配
- 如何验证 OpenClaw 真的在调用 Ollama
- 如何和云模型、搜索能力一起协同工作

这篇就是把这些问题一次讲明白。

---

## 联动后的效果是什么

当 Ollama 和 OpenClaw 联动成功后，你可以得到这样一套能力：

- 在 NAS 本地跑模型，不依赖外部 API
- 让 OpenClaw 调本地模型处理轻任务
- 对私密内容做本地总结，不出内网
- 配合搜索 / 浏览器 / 文件工具做 Agent 工作流
- 在需要时切回云模型，形成“本地 + 云端”混合方案

一句话：

> **Ollama 负责本地大脑，OpenClaw 负责调度与执行。**

---

## 推荐架构

```text
用户消息
   ↓
OpenClaw
   ├─ 读文件 / 查日志 / 浏览器 / 搜索
   └─ 调用模型
        ├─ Ollama（本地模型）
        └─ GPT-5.4 等云模型（可选）
```

在这个结构里：

- **OpenClaw** 是控制中心
- **Ollama** 是本地模型服务
- 浏览器、搜索、文件等工具由 OpenClaw 统一调度

---

## 前置条件

开始前请先确认：

- 飞牛 NAS 已安装 Docker
- OpenClaw 已跑在 Docker 中
- Ollama 已跑在 Docker 中
- 你知道两个容器的名字
- OpenClaw 配置文件已挂载到宿主机

常见容器名示例：

```bash
openclaw
ollama
```

---

## 第一步：确认 Ollama 正常运行

先别急着改 OpenClaw，先确认 Ollama 自己是通的。

### 1.1 查看容器

```bash
docker ps | grep ollama
```

理想输出类似：

```txt
ollama/ollama   ...   0.0.0.0:11434->11434/tcp   ollama
```

### 1.2 测试 API

```bash
curl http://192.168.50.106:11434/api/version
curl http://192.168.50.106:11434/api/tags
```

如果能返回版本和模型列表，说明 Ollama 服务是通的。

---

## 第二步：确认 Ollama 里已有模型

OpenClaw 只能调用已经在 Ollama 中存在的模型。

### 查看模型列表

```bash
docker exec ollama ollama list
```

例如可能看到：

```txt
qwen2.5:7b
qwen3.5:cloud
gemma:2b
```

### 如果还没有模型，先拉一个

例如：

```bash
docker exec ollama ollama pull qwen2.5:7b
```

或者：

```bash
docker exec ollama ollama pull gemma:2b
```

> 如果你使用 `qwen3.5:cloud`，记得那是云模型，需要先完成 Ollama 账号授权。

---

## 第三步：确认 OpenClaw 能访问 Ollama

关键不是宿主机能访问，而是 **OpenClaw 容器也能访问**。

### 3.1 查看 OpenClaw 配置中的 Ollama provider

```bash
cat /vol1/1000/openclaw/openclaw.json | grep -A20 '"ollama"'
```

理想配置应类似：

```json
"ollama": {
  "baseUrl": "http://192.168.50.106:11434",
  "api": "ollama",
  "injectNumCtxForOpenAICompat": false,
  "authHeader": false,
  "models": []
}
```

这里最关键的是：

- `baseUrl` 必须写对
- 端口通常是 `11434`
- 能被 OpenClaw 容器访问到

### 3.2 从 OpenClaw 容器里测试

```bash
docker exec openclaw wget -qO- http://192.168.50.106:11434/api/tags
```

如果能返回 JSON，说明 OpenClaw 容器到 Ollama 的网络是通的。

---

## 第四步：把 OpenClaw 主模型切到 Ollama

如果你想让 OpenClaw 默认走本地模型，就把 `primary` 改成 Ollama 模型。

例如：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/qwen2.5:7b"
      }
    }
  }
}
```

或者：

```json
"primary": "ollama/gemma:2b"
```

### 直接修改命令示例

```bash
sed -i 's#"primary": ".*"#"primary": "ollama/qwen2.5:7b"#' /vol1/1000/openclaw/openclaw.json
```

---

## 第五步：重启 OpenClaw 容器

```bash
docker restart openclaw
```

然后查看日志：

```bash
docker logs openclaw --tail 50
```

理想情况下应看到类似：

```txt
[gateway] agent model: ollama/qwen2.5:7b
```

如果出现 `Failed to discover Ollama models`，就说明网络、地址或模型发现环节有问题。

---

## 第六步：验证 OpenClaw 真的在调用 Ollama

这一步非常重要，不要只看配置文件。

### 方法 1：查看日志

```bash
docker logs openclaw --tail 100
```

重点看：

- 是否已加载 `ollama/...`
- 是否没有 `Unknown model`
- 是否没有 `auth unavailable`
- 是否没有 `Failed to discover Ollama models`

### 方法 2：实际提问测试

用 OpenClaw 发一个轻任务，例如：

> 请用一句话介绍飞牛 NAS

如果返回正常，并且没有再走云模型报错，说明联动大概率成功。

### 方法 3：直接调 OpenClaw API

```bash
curl -X POST http://192.168.50.106:18789/v1/chat/completions \
  -H "Authorization: Bearer 你的GatewayToken" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ollama/qwen2.5:7b",
    "messages": [{"role":"user","content":"请简单介绍飞牛 NAS"}],
    "stream": false
  }'
```

如果正常返回 JSON 响应，说明 OpenClaw 已经能调 Ollama 了。

---

## 推荐的联动方式

### 方案 A：Ollama 做默认主模型

适合：

- 想尽量本地化
- 节省云端调用成本
- 做轻任务、总结、本地文档处理

推荐模型：

- `qwen2.5:7b`
- `gemma:2b`
- `llama2:7b`

---

### 方案 B：Ollama 做本地兜底，GPT-5.4 做复杂任务

适合：

- 平时复杂任务仍交给 GPT-5.4
- 本地私密内容走 Ollama
- 出现云端认证/额度问题时，Ollama 能顶上

这是更实用的混合方案。

---

## 一套推荐组合

如果你已经有：

- OpenClaw
- Ollama
- SearXNG
- GPT-5.4

推荐思路是：

- **复杂网页操作 / 工具调用** → GPT-5.4
- **联网信息获取** → SearXNG
- **本地轻任务 / 私密文件 / 兜底** → Ollama

这样整体体验会比“全靠一个模型”稳定很多。

---

## 常见问题

### 1. OpenClaw 日志提示 `Failed to discover Ollama models`

**原因：**
- `baseUrl` 写错
- OpenClaw 容器访问不到 Ollama
- Ollama 没真正运行

**排查：**

```bash
docker exec openclaw wget -qO- http://192.168.50.106:11434/api/tags
docker ps | grep ollama
```

---

### 2. 提示 `Unknown model: ollama/...`

**原因：**
- 模型名写错
- Ollama 里并没有这个模型

**排查：**

```bash
docker exec ollama ollama list
```

确保 OpenClaw 中写的模型名和这里一致。

---

### 3. OpenClaw 重启后还是在用旧模型

**原因：**
- 改错了宿主机配置文件
- 容器挂载目录不是这个位置
- 配置没真正生效

**排查：**

```bash
docker inspect openclaw | grep -A20 'Mounts'
docker exec openclaw cat /home/node/.openclaw/openclaw.json | grep -A10 '"model"'
```

---

### 4. Ollama 能直接跑，但 OpenClaw 调不通

**原因：**
Ollama 宿主机通，不代表 OpenClaw 容器也通。

**解决：**
必须从 `openclaw` 容器内部测试到 `11434` 的访问。

---

## 推荐测试题

联动成功后，建议用这几题测试：

### 测试 1：本地轻任务

> 用一句话介绍飞牛 NAS

### 测试 2：本地文档总结

> 总结这份本地文件的重点

### 测试 3：容器日志分析

> 帮我分析 docker logs 里的报错原因

### 测试 4：混合场景

> 先读取网页，再整理重点；如果需要最新信息就补充搜索结果

如果这些都能跑通，就说明 Ollama 和 OpenClaw 已经真正联动起来了。

---

## 总结

飞牛 NAS 上把 Ollama 和 OpenClaw 串起来，最关键的不是“都装上了”，而是下面四步：

1. **Ollama 服务能跑**
2. **Ollama 里有可用模型**
3. **OpenClaw 容器能访问 Ollama**
4. **OpenClaw 主模型正确切到 `ollama/...`**

一句话总结：

> **只有当 OpenClaw 能真正从容器内部访问到 Ollama，并成功调用 `ollama/模型名`，这套联动才算真正打通。**

---

## 下一步建议

建议继续搭配这几篇一起看：

1. Arm 飞牛 Docker 安装 OpenClaw 调配详解
2. OpenClaw 配 GPT-5.4 实战教程
3. 飞牛 NAS Docker 版 OpenClaw 切换 GPT-5.4 配置示例
4. OpenClaw + GPT-5.4 + SearXNG + Ollama 完整组合方案

这几篇串起来，就是一整套比较完整的飞牛 NAS Agent 方案。
