# 飞牛 NAS Docker 版 OpenClaw 切换 GPT-5.4 配置示例
> 适用于：飞牛 NAS（fnOS）中通过 Docker 部署的 OpenClaw

---

## 适用场景

如果你已经把 OpenClaw 部署在飞牛 NAS 的 Docker 中，现在想把默认主模型切换成 **GPT-5.4**，这篇就是直接可照抄的配置示例。

适合以下情况：

- OpenClaw 已运行在飞牛 NAS Docker 中
- 配置文件挂载到了宿主机目录
- 你已经有可用的 GPT-5.4 provider / key
- 想把 GPT-5.4 设为主力 Agent 模型

---

## 常见目录结构

飞牛 NAS Docker 版常见挂载路径如下：

```bash
/vol1/1000/openclaw/
├── openclaw.json
└── agents/
    └── main/
        └── agent/
            └── auth-profiles.json
```

对应容器内路径通常是：

```bash
/home/node/.openclaw
```

你可以这样确认：

```bash
docker inspect openclaw | grep -A20 'Mounts'
```

---

## 第一步：确认当前配置文件

先看当前主模型写的是什么：

```bash
cat /vol1/1000/openclaw/openclaw.json | grep -A10 '"model"'
```

如果看到类似：

```json
"primary": "ztt-api-provider/gemini-3-flash"
```

或：

```json
"primary": "ttnk-nvidia/stepfun-ai/step-3.5-flash"
```

说明当前还不是 GPT-5.4。

---

## 第二步：备份配置文件

动配置前先备份：

```bash
cp /vol1/1000/openclaw/openclaw.json /vol1/1000/openclaw/openclaw.json.bak.$(date +%Y%m%d_%H%M%S)
```

---

## 第三步：把默认主模型切到 GPT-5.4

### 方案 A：使用别名（推荐）

如果你的环境支持别名，直接写：

```json
"primary": "gpt-5.4"
```

对应命令可直接替换：

```bash
sed -i 's#"primary": ".*"#"primary": "gpt-5.4"#' /vol1/1000/openclaw/openclaw.json
```

### 方案 B：使用完整模型名

如果你想写死完整模型名：

```json
"primary": "api136222/gpt-5.4"
```

对应命令：

```bash
sed -i 's#"primary": ".*"#"primary": "api136222/gpt-5.4"#' /vol1/1000/openclaw/openclaw.json
```

> 推荐优先试别名；如果环境不认，再换完整名。

---

## 第四步：确认 provider 与认证是否可用

光改 `primary` 不够，你还需要确保 provider 本身能用。

### 4.1 检查认证文件是否存在

```bash
ls -l /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

### 4.2 查看是否已有相关认证

```bash
cat /vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

如果这里没有对应 provider 的认证信息，OpenClaw 可能会报：

- `Unknown model`
- `No API key found`
- `auth unavailable`
- `no auth available`

---

## 第五步：重启容器

修改后执行：

```bash
docker restart openclaw
```

---

## 第六步：看日志验证是否成功

```bash
docker logs openclaw --tail 50
```

理想情况下应看到类似：

```txt
[gateway] agent model: api136222/gpt-5.4
```

如果没报下面这些错误，说明基本切换成功：

- `Unknown model`
- `No API key found`
- `auth_unavailable`
- `no auth available`

---

## 一套最小可用示例

下面是一段简化后的 `openclaw.json` 关键结构示例：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "api136222/gpt-5.4"
      }
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan"
  }
}
```

如果你已经有完整配置，只需要改 `primary` 即可，不用重写整个文件。

---

## 飞牛 Docker 版常见问题

### 1. 配了 GPT-5.4 但启动后还是旧模型

**原因：**
- 改错了文件
- 容器挂载目录不是这个路径
- 没重启容器

**排查：**

```bash
docker inspect openclaw | grep -A20 'Mounts'
docker exec openclaw cat /home/node/.openclaw/openclaw.json | grep -A10 '"model"'
```

---

### 2. 提示 Unknown model

**原因：**
- 模型名写错
- 环境不认别名

**解决：**
把：

```json
"gpt-5.4"
```

改成：

```json
"api136222/gpt-5.4"
```

---

### 3. 提示 auth unavailable

**原因：**
provider 认证没配好。

**解决：**
检查：

```bash
/vol1/1000/openclaw/agents/main/agent/auth-profiles.json
```

是否存在且包含对应 provider 的认证。

---

### 4. 容器已重启，但依旧不生效

**排查命令：**

```bash
docker logs openclaw --tail 100
docker exec openclaw cat /home/node/.openclaw/openclaw.json | head -50
```

重点确认容器内实际读到的配置是不是你刚改过的那份。

---

## 推荐测试方法

切换成功后，不要只看日志，建议直接做 3 个测试：

### 测试 1：网页读取

> 读取这个网址，提炼 5 条重点

### 测试 2：日志排错

> 读取 docker logs，定位错误原因并给修复步骤

### 测试 3：配置任务

> 帮我检查 openclaw.json 是否生效

如果这些任务的工具调用更稳、过程更顺，说明 GPT-5.4 真的切换成功了。

---

## 总结

飞牛 NAS Docker 版切 GPT-5.4，真正关键就三件事：

1. 改对 `openclaw.json` 里的 `primary`
2. 确认 provider 认证可用
3. 重启后看日志验证

一句话总结：

> **只改模型名不够，模型识别、认证、挂载路径、容器重启，这四步缺一不可。**
