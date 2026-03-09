# OpenClaw 阿里云服务器运维备忘录

> 适用服务器：`147.139.198.175`  
> 适用主题：OpenClaw Gateway 启停、配置检查、Nginx 反代、HTTPS 证书、常见排障

![OpenClaw 运维备忘录封面](https://opengraph.githubassets.com/1/openclaw/openclaw)

---

## 一、服务器基础信息

- **服务器 IP**：`147.139.198.175`
- **SSH 用户**：`root`
- **OpenClaw Gateway 端口**：`11251`
- **当前 UI basePath**：`566161bc`
- **当前默认模型**：`api136222/gpt-5.4`
- **当前 Gateway Token**：

```text
1e796ffa5df6a5638381f8804bf276ba
```

---

## 二、真正生效的配置文件

这台服务器上有三份配置：

```bash
/root/.openclaw/openclaw.json
/home/admin/.openclaw/openclaw.json
/home/web/openclaw.json
```

### 真正生效的是：

```bash
/root/.openclaw/openclaw.json
```

以后排障时，先确认当前进程到底读的是哪一份。

---

## 三、常用访问入口

### 本机 UI 入口

```text
http://127.0.0.1:11251/566161bc/
```

### 外网直连入口

```text
http://147.139.198.175:11251/566161bc/
```

### 反代域名入口

```text
https://bot.136222.xyz/
https://bota.136222.xyz/
https://botb.136222.xyz/
```

> 注意：`http://127.0.0.1:11251/` 返回 404 不代表挂了，UI 挂在 `/{basePath}/` 下。

---

## 四、最常用检查命令

### 1）看 Gateway 是否在跑

```bash
pgrep -af 'run-node.mjs gateway|openclaw-gateway|node scripts/run-node.mjs'
```

### 2）看 11251 是否监听

```bash
ss -ltnp | grep 11251
```

### 3）看默认模型

```bash
jq -r '.agents.defaults.model.primary' /root/.openclaw/openclaw.json
```

### 4）看 bind

```bash
jq '.gateway.bind' /root/.openclaw/openclaw.json
```

### 5）看 allowedOrigins

```bash
jq '.gateway.controlUi.allowedOrigins' /root/.openclaw/openclaw.json
```

### 6）看 basePath

```bash
jq -r '.gateway.controlUi.basePath // .gateway.basePath // empty' /root/.openclaw/openclaw.json
```

---

## 五、正确启动方式

这台机子不要直接依赖：

```bash
openclaw-gateway
```

因为非交互 shell 下可能找不到这个命令。

### 正确前台启动

```bash
cd /opt/openclaw
node scripts/run-node.mjs gateway
```

### 正确后台启动

```bash
cd /opt/openclaw
nohup node scripts/run-node.mjs gateway >/tmp/root-gateway.log 2>&1 &
```

### 停掉旧进程

```bash
pkill -f 'run-node.mjs gateway|openclaw-gateway' || true
```

---

## 六、标准重启流程

```bash
pkill -f 'run-node.mjs gateway|openclaw-gateway' || true
sleep 2
cd /opt/openclaw
nohup node scripts/run-node.mjs gateway >/tmp/root-gateway.log 2>&1 &
sleep 5
ss -ltnp | grep 11251
tail -60 /tmp/root-gateway.log
```

---

## 七、前台排错方法

如果后台起不来，不要猜，直接前台看报错：

```bash
cd /opt/openclaw
node scripts/run-node.mjs gateway
```

也可以保存一份前台日志：

```bash
cd /opt/openclaw
node scripts/run-node.mjs gateway 2>&1 | tee /tmp/gateway-foreground.log
```

---

## 八、重要坑点

### 坑 1：根路径 404 不等于挂了

```bash
curl -I http://127.0.0.1:11251
```

返回 `404` 不等于坏。真正要测的是：

```bash
curl -I http://127.0.0.1:11251/566161bc/
```

---

### 坑 2：`gateway.bind` 不要写 `0.0.0.0`

这台机器当前版本要求：

```json
"bind": "lan"
```

如果写成：

```json
"bind": "0.0.0.0"
```

就会报：

```text
gateway.bind: Invalid input
```

---

### 坑 3：不要先改错配置文件

这台机子上同时有三份配置。最稳的方法是：

1. 先看谁在监听 `11251`
2. 再看当前进程实际读取哪份配置
3. 最后再改

---

## 九、常用修复命令

### 改回默认模型 `gpt-5.4`

```bash
jq '.agents.defaults.model.primary = "api136222/gpt-5.4"' /root/.openclaw/openclaw.json > /root/.openclaw/openclaw.json.new \
  && mv /root/.openclaw/openclaw.json.new /root/.openclaw/openclaw.json
```

### 改回 `bind = lan`

```bash
jq '.gateway.bind = "lan"' /root/.openclaw/openclaw.json > /root/.openclaw/openclaw.json.new \
  && mv /root/.openclaw/openclaw.json.new /root/.openclaw/openclaw.json
```

### 修复 `allowedOrigins`

```bash
jq '.gateway.controlUi.allowedOrigins = [
  "http://bot.136222.xyz",
  "http://147.139.198.175",
  "https://bot.136222.xyz",
  "https://bota.136222.xyz",
  "https://botb.136222.xyz",
  "https://147.139.198.175"
]' /root/.openclaw/openclaw.json > /root/.openclaw/openclaw.json.new \
  && mv /root/.openclaw/openclaw.json.new /root/.openclaw/openclaw.json
```

---

## 十、Nginx / 反代 / 证书检查

### 检查本地 UI

```bash
curl -I http://127.0.0.1:11251/566161bc/
```

### 检查反代

```bash
curl -Ik https://bot.136222.xyz/
curl -Ik https://bota.136222.xyz/
curl -Ik https://botb.136222.xyz/
```

### 看证书发行方

```bash
echo | openssl s_client -connect bot.136222.xyz:443 -servername bot.136222.xyz 2>/dev/null | openssl x509 -noout -issuer -subject -dates
```

---

## 十一、当前证书状态

- `bot.136222.xyz` → Let's Encrypt
- `bota.136222.xyz` → Let's Encrypt
- `botb.136222.xyz` → Let's Encrypt

---

## 十二、建议每次改配置前先备份

### 备份 OpenClaw 配置

```bash
cp -a /root/.openclaw/openclaw.json /root/.openclaw/openclaw.json.bak.$(date +%Y%m%d-%H%M%S)
```

### 备份 Nginx 配置

```bash
cp -a /home/web/conf.d/bot-136222-xyz.conf /home/web/conf.d/bot-136222-xyz.conf.bak.$(date +%Y%m%d-%H%M%S)
```

---

## 十三、一句话判断系统是否恢复正常

只要下面三条同时正常，基本就没问题：

```bash
ss -ltnp | grep 11251
curl -I http://127.0.0.1:11251/566161bc/
curl -Ik https://bot.136222.xyz/
```

---

## 🔙 返回导航

- [返回阿里云 OpenClaw 网关排障教程](openclaw-aliyun-gateway-troubleshooting.md)
- [返回 OpenClaw / 飞牛 NAS 专题](openclaw-fly-nas-deployment.md)
- [返回总导航](../README.md)
