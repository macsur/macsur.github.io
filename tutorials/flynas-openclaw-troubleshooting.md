# 飞牛 NAS 上 OpenClaw 常见报错排查大全
> 适用于：飞牛 NAS（fnOS）Docker 环境下运行 OpenClaw 时的高频报错排查

---

## 这篇教程解决什么问题

OpenClaw 在飞牛 NAS 上跑起来之后，最常见的不是“不会安装”，而是：

- 装好了却不能对话
- 模型切换后报错
- QQ 机器人接不通
- Ollama 明明装了但 OpenClaw 发现不了
- 改了配置却没生效
- Docker 重启后还是旧问题

这篇就是把这些常见坑集中整理成一份排查手册。

---

## 先记住一个总原则

遇到问题时，不要一上来就改一堆配置。

推荐顺序永远是：

1. **看日志**
2. **确认配置文件路径**
3. **确认容器挂载是否正确**
4. **确认认证文件是否存在**
5. **确认模型 / 通道 / 搜索服务是否真的可访问**

一句话：

> **OpenClaw 的问题，80% 都能从“日志 + 配置路径 + 容器挂载”这三件事里找出来。**

---

## 一、最常用的排查命令

先把下面这些命令记住：

### 1. 查看容器状态

```bash
docker ps | grep openclaw
```

### 2. 查看最近日志

```bash
docker logs openclaw --tail 100
```

### 3. 查看容器挂载

```bash
docker inspect openclaw | grep -A20 'Mounts'
```

### 4. 查看容器内实际配置

```bash
docker exec openclaw cat /home/node/.openclaw/openclaw.json | head -80
```

### 5. 查看认证文件

```bash
cat /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

这几条，几乎是所有问题排查的起点。

---

## 二、常见报错 1：Unknown model

### 典型报错

```txt
Unknown model: anthropic/Gemini 3 Flash
```

或：

```txt
Unknown model: ollama/xxx
```

### 原因

通常是以下几种：

- 模型名写错
- provider 前缀写错
- 用了展示名，不是实际模型 ID
- OpenClaw 当前版本不认这个模型名

### 典型错误示例

```json
"primary": "Gemini 3 Flash"
```

这只是“显示名”，不是 OpenClaw 需要的完整模型标识。

### 正确思路

应该写成：

```json
"primary": "ztt-api-provider/gemini-3-flash"
```

或者：

```json
"primary": "api136222/gpt-5.4"
```

### 排查方法

```bash
cat /vol1/1000/openclaw/openclaw.json | grep -A10 '"model"'
```

---

## 三、常见报错 2：No API key found / auth unavailable

### 典型报错

```txt
No API key found for provider "anthropic"
```

或：

```txt
500 auth_unavailable: no auth available
```

### 原因

- provider 已配置，但认证文件缺失
- `auth-profiles.json` 不存在
- 认证文件里没有对应 provider
- 复制配置时漏了认证部分

### 排查方法

```bash
ls -l /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
cat /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

### 处理思路

- 从已有正常环境复制 `auth-profiles.json`
- 或重新生成 provider 认证
- 然后重启容器再看日志

---

## 四、常见报错 3：改了配置却没生效

### 表现

- 宿主机文件改了
- 重启后还是旧模型
- 日志里还是旧配置

### 原因

- 改错了文件路径
- Docker 挂载目录并不是你以为的那个
- 容器根本没读取你刚改的文件

### 排查方法

```bash
docker inspect openclaw | grep -A20 'Mounts'
docker exec openclaw cat /home/node/.openclaw/openclaw.json | head -80
```

### 核心判断标准

不要只看宿主机文件，**一定要看容器内实际读取到的文件**。

---

## 五、常见报错 4：OpenClaw 能启动，但无法正常对话

### 表现

- Web 界面能打开
- 发消息后没响应，或报错

### 常见原因

- 主模型不可用
- provider 认证失败
- 当前模型超时
- 默认模型配置错了

### 排查方法

```bash
docker logs openclaw --tail 100
```

重点看：

- `agent model:` 后面到底是什么
- 有没有 `timeout`
- 有没有 `auth unavailable`
- 有没有 `Unknown model`

---

## 六、常见报错 5：Ollama 明明装了，但 OpenClaw 发现不了

### 典型报错

```txt
Failed to discover Ollama models: TypeError: fetch failed
```

### 原因

- `baseUrl` 写错
- OpenClaw 容器访问不到 Ollama
- Ollama 本身没跑
- 模型没下载

### 排查顺序

#### 1）先看 Ollama 是否运行

```bash
docker ps | grep ollama
```

#### 2）测试 Ollama API

```bash
curl http://192.168.50.106:11434/api/tags
```

#### 3）从 OpenClaw 容器内部测

```bash
docker exec openclaw wget -qO- http://192.168.50.106:11434/api/tags
```

如果宿主机通、容器里不通，说明是容器网络问题。

---

## 七、常见报错 6：QQ 机器人报 internal err

### 典型报错

```txt
Failed to get access_token
{"code":100002,"message":"internal err"}
```

### 这通常不是 OpenClaw 本体问题，而是 QQ 平台条件没满足。

最常见原因：

- 应用还在 **开发中**
- 审核未通过
- 还没正式上线
- App ID / Client Secret 不匹配
- 公网白名单 / 回调 URL 没配好

### 核心结论

如果你的 QQ 机器人还处于“开发中”，报这个错非常常见。

---

## 八、常见报错 7：容器重启后问题依旧

### 原因

很多人以为重启容器就等于配置生效，但其实：

- 配置改错位置 → 重启也没用
- 认证文件没改对 → 重启也没用
- 模型仍然写错 → 重启还是报同样的错

### 正确做法

重启之前先确认：

```bash
docker exec openclaw cat /home/node/.openclaw/openclaw.json | grep -A10 '"model"'
```

如果容器里看到的还是旧配置，那你重启 10 次也没用。

---

## 九、常见报错 8：网页工具 / 浏览器能力失效

### 表现

- 模型能聊天
- 但网页读取、浏览器控制总失败

### 原因可能是

- browser tool 没真正接好
- 浏览器控制服务不可用
- 页面本身复杂，引用不稳定
- 不是模型问题，而是工具环境问题

### 排查思路

先确认：

- 模型本身能对话
- 再看 browser 工具是否可用
- 再看页面是否正常打开

不要把所有问题都怪到模型头上。

---

## 十、常见报错 9：搜索配置了，但模型还是答旧信息

### 原因

- 搜索 provider 没真正接通
- 搜索接口不可用
- 默认搜索 provider 没指向正确服务
- 模型没有拿到搜索上下文

### 排查方法

先验证 SearXNG / 搜索服务本身：

```bash
curl "https://你的搜索域名/search?q=test&format=json"
```

如果搜索服务自己都没返回结果，那 OpenClaw 也不可能帮你联网回答。

---

## 十一、常见报错 10：模型超时

### 典型报错

```txt
LLM request timed out
```

### 原因

- 上游 API 响应慢
- 模型太重
- 网络质量不稳定
- 本地 Ollama 模型体积过大，NAS 算力不够

### 处理建议

- 先换轻一点的模型测试
- 检查上游 API 是否稳定
- 确认 NAS 内存与 CPU 是否扛得住

---

## 十二、推荐排查流程（实战版）

遇到问题时，推荐按这个顺序走：

### 第 1 步：看日志

```bash
docker logs openclaw --tail 100
```

### 第 2 步：确认配置文件路径

```bash
docker inspect openclaw | grep -A20 'Mounts'
```

### 第 3 步：看容器内配置

```bash
docker exec openclaw cat /home/node/.openclaw/openclaw.json | head -80
```

### 第 4 步：看认证文件

```bash
cat /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

### 第 5 步：验证依赖服务

例如：

- Ollama
- SearXNG
- QQ / 飞书 / Telegram 通道
- 网关端口

### 第 6 步：只改一个变量后重试

不要一口气乱改 5 个地方，不然你自己也不知道是哪一步修好的。

---

## 十三、最值得养成的习惯

### 1. 先备份再改

```bash
cp /vol1/1000/openclaw/openclaw.json /vol1/1000/openclaw/openclaw.json.bak.$(date +%Y%m%d_%H%M%S)
```

### 2. 改完后看容器内文件

### 3. 改完后重启容器

### 4. 重启后立刻看日志

### 5. 遇到问题优先查“模型名 / 认证 / 挂载 / 网络”

---

## 总结

飞牛 NAS 上 OpenClaw 的高频问题，归根结底几乎都绕不开这几类：

- **模型名写错**
- **认证缺失**
- **容器挂载不对**
- **依赖服务不可访问**
- **平台侧条件未满足**（尤其是 QQ 机器人）

一句话总结：

> **先看日志，再看容器内配置，再看认证和依赖服务，这比盲改配置有效一百倍。**

---

## 下一步建议

建议和这些教程一起配套看：

1. Arm 飞牛 Docker 安装 OpenClaw 调配详解
2. 飞牛 NAS 上 Ollama + OpenClaw 联动实战教程
3. 飞牛 NAS 上 OpenClaw + QQ 机器人 / 飞书 / Telegram 多通道接入教程
4. OpenClaw + GPT-5.4 + SearXNG + Ollama 完整组合方案

这几篇连起来，基本就能覆盖你在飞牛 NAS 上用 OpenClaw 的大部分实战场景。
