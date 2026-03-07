# Arm 版飞牛 NAS Docker 安装 OpenClaw 调配详解

> 解决 "Unknown model"、"auth_unavailable" 等常见问题

---

## 📋 目录

- [适用场景](#适用场景)
- [前置要求](#前置要求)
- [安装 OpenClaw（Docker）](#安装-openclawdocker)
- [配置修复：模型与认证](#配置修复模型与认证)
- [完整调试流程](#完整调试流程)
- [故障排查速查](#故障排查速查)
- [安全加固建议](#安全加固建议)

---

## 适用场景

- ✅ 飞牛 NAS（ARM 架构，如 x86_64/arm64）
- ✅ Docker 环境已运行
- ✅ 需要将 OpenClaw 接入本地/云端 AI 模型
- ✅ 遇到 `Unknown model`、`auth_unavailable` 等错误

---

## 前置要求

| 项目 | 要求 |
|------|------|
| 飞牛 NAS | ARM 版，Docker 可用 |
| 宿主机 IP | `192.168.50.106`（示例） |
| OpenClaw 镜像 | `alpine/openclaw:latest` |
| 配置文件 | `openclaw.json`（挂载到宿主机路径） |
| 模型 API | 已获取有效的 API Key（如 NVIDIA Step） |

---

## 安装 OpenClaw（Docker）

### 1. 拉取镜像

```bash
docker pull alpine/openclaw:latest
```

### 2. 运行容器

```bash
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -p 18791:18791 \
  -v /vol1/1000/openclaw:/home/node/.openclaw \
  --restart unless-stopped \
  alpine/openclaw:latest
```

**参数说明：**
- `-v /vol1/1000/openclaw:/home/node/.openclaw`：配置文件挂载（宿主机路径:容器内路径）
- `-p 18789:18789`：网关端口（用于 API 和 WebChat）
- `-p 18791:18791`：浏览器控制端口

---

## 配置修复：模型与认证

### 问题现象

日志报错：
```
⚠️ Agent failed before reply: Unknown model: anthropic/Gemini 3 Flash.
⚠️ Agent failed before reply: No API key found for provider "anthropic".
```

### 原因分析

1. **主模型配置错误**：`primary` 只写了模型名，缺少 `provider/model-id` 格式
2. **未配置正确的 provider**：`models.providers` 缺少实际的 provider 块（如 `ttnk-nvidia`）
3. **缺少 `auth-profiles.json`**：OpenClaw 无法加载 API Key

---

### 修复步骤

#### 步骤 1：备份当前配置

```bash
cp /vol1/1000/openclaw/openclaw.json /vol1/1000/openclaw/openclaw.json.backup.$(date +%Y%m%d_%H%M%S)
```

#### 步骤 2：修改主模型为正确格式

编辑 `/vol1/1000/openclaw/openclaw.json`：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "ztt-api-provider/gemini-3-flash"
      }
    }
  }
}
```

**格式要求：** `<provider-key>/<model-id>`

---

#### 步骤 3：添加 provider 配置（以 NVIDIA Step 为例）

若 `models.providers` 中没有对应 provider 块，需添加。

**使用 jq（推荐）：**

```bash
jq '.models.providers["ttnk-nvidia"] = {
  "baseUrl": "https://integrate.api.nvidia.com/v1",
  "apiKey": "nvapi-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api": "openai-completions",
  "injectNumCtxForOpenAICompat": false,
  "authHeader": false,
  "models": [
    {
      "id": "stepfun-ai/step-3.5-flash",
      "name": "stepfun-ai/step-3.5-flash",
      "api": "openai-completions",
      "reasoning": false,
      "input": ["text"],
      "cost": {"input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0},
      "contextWindow": 128000,
      "maxTokens": 4096
    }
  ]
}' /vol1/1000/openclaw/openclaw.json > /tmp/openclaw.json && mv /tmp/openclaw.json /vol1/1000/openclaw/openclaw.json
```

**纯 sed（如果模型块已存在，只需修改 primary）：**

```bash
sed -i 's#"primary": "Gemini 3 Flash"#"primary": "ztt-api-provider/gemini-3-flash"#' /vol1/1000/openclaw/openclaw.json
sed -i 's#"primary": "ztt-api-provider/gemini-3-flash"#"primary": "ttnk-nvidia/stepfun-ai/step-3.5-flash"#' /vol1/1000/openclaw/openclaw.json
```

---

#### 步骤 4：配置认证（`auth-profiles.json`）

OpenClaw 需要 `agents/main/agent/auth-profiles.json` 存储 API Key。

**方案 A：从主 OpenClaw 复制（推荐）**

```bash
# 在 Mac 主 OpenClaw 执行
scp ~/.openclaw/agents/main/agent/auth-profiles.json admin@192.168.50.106:/vol1/1000/openclaw/agents/main/agent/
```

**方案 B：在 Container 内生成**

```bash
docker exec -it openclaw openclaw agents add ttnk-nvidia
# 按提示输入相同的 API Key
```

**期望文件结构：**

```
/vol1/1000/openclaw/
├── openclaw.json
└── agents/
    └── main/
        └── agent/
            └── auth-profiles.json
```

---

#### 步骤 5：重启容器

```bash
docker restart openclaw
docker logs openclaw --tail 20
```

正常日志应类似：
```
[gateway] agent model: ttnk-nvidia/stepfun-ai/step-3.5-flash
[gateway] listening on ws://0.0.0.0:18789
```
**不再出现 `auth_unavailable` 错误。**

---

## 完整调试流程

### 1. 测试网络连通性

```bash
# 容器内访问 API
docker exec openclaw curl -s -I https://api.136222.xyz/v1/models | head -5
```

### 2. 检查配置加载

```bash
docker exec openclaw cat /home/node/.openclaw/openclaw.json | jq '.agents.defaults.model.primary'
# 输出: "ttnk-nvidia/stepfun-ai/step-3.5-flash"
```

### 3. 查看最新日志

```bash
docker logs openclaw --tail 30
```

关注：
- ✅ `config hot reload applied`
- ✅ `agent model: ...`
- ❌ 无 `500 auth_unavailable`
- ❌ 无 `Unknown model`

### 4. 测试对话 API

```bash
curl -X POST http://192.168.50.106:18789/v1/chat/completions \
  -H "Authorization: Bearer <gateway-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ttnk-nvidia/stepfun-ai/step-3.5-flash",
    "messages": [{"role": "user", "content": "你好，请自我介绍"}]
  }'
```

---

## 故障排查速查

| 错误 | 原因 | 解决 |
|------|------|------|
| `Unknown model: anthropic/...` | `primary` 格式错误 | 改为 `<provider>/<model-id>` |
| `No API key found for provider "..."` | 对应 provider 未配置 API Key | 在 `models.providers` 添加 `apiKey` |
| `500 auth_unavailable: no auth available` | `auth-profiles.json` 缺失或损坏 | 从主 OpenClaw 复制或 `openclaw agents add` |
| `LLM request timed out` | 网络不通或 API 限流 | 测试 `curl https://api.136222.xyz/v1/models` |
| `Failed to discover Ollama models` | Ollama 服务未运行/端口不对 | 确认 `http://192.168.50.106:11434` 可达 |
| `config hot reload applied` 但仍有错 | 修改后未重启或文件未挂载 | 检查 `docker inspect openclaw` 的 `Mounts` |

---

## 安全加固建议

当前配置含危险标志：
```
gateway.controlUi.allowInsecureAuth=true
gateway.controlUi.dangerouslyDisableDeviceAuth=true
```

建议：

1. **运行安全审计**：
   ```bash
   docker exec openclaw openclaw security audit
   ```

2. **启用设备认证**：
   编辑 `openclaw.json`：
   ```json
   "gateway": {
     "auth": { "mode": "token" },
     "controlUi": {
       "allowInsecureAuth": false,
       "dangerouslyDisableDeviceAuth": false
     }
   }
   ```

3. **限制访问 IP**（在 Docker/Nginx 层）：
   ```bash
   docker run ... -p 127.0.0.1:18789:18789  # 仅本地访问
   ```

---

## ✅ 验证清单

- [ ] `openclaw.json` 中 `agents.defaults.model.primary` 格式正确
- [ ] `models.providers` 包含所用 provider 及其 `apiKey`
- [ ] `agents/main/agent/auth-profiles.json` 存在且包含对应 provider 的认证
- [ ] Docker 容器重启后日志无 `auth_unavailable`
- [ ] 能成功调用对话 API 并返回响应

---

## 📞 获取帮助

- **OpenClaw 官方文档**: https://docs.openclaw.ai
- **社区支持**: https://discord.com/invite/clawd
- **日志查看**: `docker logs openclaw --follow`

---

**祝您调配顺利！** 🎉
