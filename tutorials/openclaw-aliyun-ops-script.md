# OpenClaw 阿里云服务器运维脚本使用说明

> 配套脚本：`tools/openclaw-aliyun-ops.sh`

![OpenClaw 运维脚本封面](https://opengraph.githubassets.com/1/openclaw/openclaw)

---

## 一、这个脚本能做什么

这个脚本是给阿里云服务器 `147.139.198.175` 上的 OpenClaw 环境准备的快捷运维工具，主要解决这些重复动作：

- 查看 Gateway 是否在运行
- 查看 11251 是否监听
- 打印当前 UI 入口
- 启停 / 重启 Gateway
- 查看日志
- 快速修复默认模型
- 快速修复 `gateway.bind`
- 快速修复 `allowedOrigins`
- 查看 HTTPS 证书发行方
- 做基础 doctor 检查

---

## 二、脚本路径

```text
tools/openclaw-aliyun-ops.sh
```

建议上传到服务器后放在例如：

```bash
/root/openclaw-aliyun-ops.sh
```

并加执行权限：

```bash
chmod +x /root/openclaw-aliyun-ops.sh
```

---

## 三、当前脚本默认针对的环境

- 配置文件：`/root/.openclaw/openclaw.json`
- OpenClaw 目录：`/opt/openclaw`
- 日志文件：`/tmp/root-gateway.log`
- Gateway 端口：`11251`
- 默认模型：`api136222/gpt-5.4`

---

## 四、基础用法

### 查看状态

```bash
bash tools/openclaw-aliyun-ops.sh status
```

### 启动 Gateway

```bash
bash tools/openclaw-aliyun-ops.sh start
```

### 停止 Gateway

```bash
bash tools/openclaw-aliyun-ops.sh stop
```

### 重启 Gateway

```bash
bash tools/openclaw-aliyun-ops.sh restart
```

### 查看日志

```bash
bash tools/openclaw-aliyun-ops.sh logs
```

---

## 五、快速输出常用入口

```bash
bash tools/openclaw-aliyun-ops.sh urls
```

会打印：

- 本地 UI 地址
- 公网直连 UI 地址
- 三个 HTTPS 反代域名

---

## 六、证书检查

默认检查 `bot.136222.xyz`：

```bash
bash tools/openclaw-aliyun-ops.sh cert
```

检查其他域名：

```bash
bash tools/openclaw-aliyun-ops.sh cert bota.136222.xyz
bash tools/openclaw-aliyun-ops.sh cert botb.136222.xyz
```

---

## 七、三类高频修复

### 1）修复默认模型

```bash
bash tools/openclaw-aliyun-ops.sh fix-model
```

会把默认模型改回：

```text
api136222/gpt-5.4
```

### 2）修复 `gateway.bind`

```bash
bash tools/openclaw-aliyun-ops.sh fix-bind
```

会改成：

```text
lan
```

> 注意：这台机器当前版本不能写 `0.0.0.0`，否则会报 `gateway.bind: Invalid input`。

### 3）修复 `allowedOrigins`

```bash
bash tools/openclaw-aliyun-ops.sh fix-origins
```

会写入当前已验证可用的 HTTP / HTTPS 域名列表。

---

## 八、doctor 模式

```bash
bash tools/openclaw-aliyun-ops.sh doctor
```

会检查：

- 当前用户
- 配置文件是否存在
- JSON 是否有效
- 当前进程 / 端口监听状态
- 当前模型 / bind / basePath

---

## 九、环境变量覆盖

如果以后路径变化，也可以临时覆盖：

```bash
OPENCLAW_CONFIG=/root/.openclaw/openclaw.json \
OPENCLAW_DIR=/opt/openclaw \
OPENCLAW_LOG=/tmp/root-gateway.log \
bash tools/openclaw-aliyun-ops.sh status
```

支持覆盖的变量包括：

- `OPENCLAW_CONFIG`
- `OPENCLAW_DIR`
- `OPENCLAW_LOG`
- `OPENCLAW_PORT`
- `OPENCLAW_DEFAULT_MODEL`

---

## 十、建议使用顺序

如果你只是想判断系统是否正常，最推荐：

```bash
bash tools/openclaw-aliyun-ops.sh status
bash tools/openclaw-aliyun-ops.sh cert
```

如果你怀疑配置被改乱：

```bash
bash tools/openclaw-aliyun-ops.sh fix-model
bash tools/openclaw-aliyun-ops.sh fix-bind
bash tools/openclaw-aliyun-ops.sh fix-origins
bash tools/openclaw-aliyun-ops.sh restart
```

---

## 🔙 返回导航

- [返回 OpenClaw 阿里云服务器运维备忘录](openclaw-aliyun-ops-memo.md)
- [返回阿里云 OpenClaw 网关排障教程](openclaw-aliyun-gateway-troubleshooting.md)
- [返回总导航](../README.md)
