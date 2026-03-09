# 阿里云服务器 OpenClaw 网关配置排障与 HTTPS 反代修复实战

> 适用场景：OpenClaw 部署在阿里云服务器，出现 **Gateway 起不来、模型不对、UI 路径 404、Nginx 反代混乱、HTTPS 证书异常** 等问题时。

![OpenClaw Gateway 排障封面](https://opengraph.githubassets.com/1/openclaw/openclaw)

---

## 一、最终修好的效果

这次排障后，最终恢复到以下状态：

- OpenClaw Gateway 正常监听 `11251`
- 本地 UI 可通过 `http://127.0.0.1:11251/566161bc/` 打开
- 三个反代域名全部可用：
  - `https://bot.136222.xyz/`
  - `https://bota.136222.xyz/`
  - `https://botb.136222.xyz/`
- `bot.136222.xyz` 成功补成 Let's Encrypt 真证书
- 默认模型恢复为 `api136222/gpt-5.4`
- `allowedOrigins` 已补齐 HTTPS 域名

---

## 二、这次问题的根因

这次最核心的坑，不是单一配置写错，而是 **服务器上同时存在三份 OpenClaw 配置**：

```bash
/root/.openclaw/openclaw.json
/home/admin/.openclaw/openclaw.json
/home/web/openclaw.json
```

真正生效的那份，是：

```bash
/root/.openclaw/openclaw.json
```

也就是说：

- 你以为在改 `/home/web/openclaw.json`
- 实际运行中的 Gateway 根本没读它
- 所以改了半天，服务表现还是不对

这是这次排障最关键的一步。

---

## 三、先确认谁在跑 OpenClaw

先看当前进程：

```bash
pgrep -af 'run-node.mjs gateway|openclaw-gateway|node scripts/run-node.mjs'
ss -ltnp | grep 11251
```

如果端口有监听，再看配置文件里实际内容：

```bash
jq -r '.agents.defaults.model.primary' /root/.openclaw/openclaw.json
jq -r '.gateway.bind' /root/.openclaw/openclaw.json
jq -r '.gateway.controlUi.allowedOrigins' /root/.openclaw/openclaw.json
```

---

## 四、OpenClaw UI 根路径为什么是 404？

很多人第一次看到：

```bash
curl -I http://127.0.0.1:11251
```

返回的是：

```text
HTTP/1.1 404 Not Found
```

这**不一定是坏事**。

因为 OpenClaw 的 UI 很可能挂在随机 `basePath` 下。我们这次查到的是：

```text
566161bc
```

所以正确入口是：

```text
http://127.0.0.1:11251/566161bc/
```

检查方法：

```bash
jq -r '.gateway.controlUi.basePath // .gateway.basePath // empty' /root/.openclaw/openclaw.json
curl -I http://127.0.0.1:11251/566161bc/
```

---

## 五、默认模型被切乱了怎么办？

这次需要恢复的默认模型是：

```text
api136222/gpt-5.4
```

修复命令：

```bash
jq '.agents.defaults.model.primary = "api136222/gpt-5.4"' /root/.openclaw/openclaw.json > /root/.openclaw/openclaw.json.new \
  && mv /root/.openclaw/openclaw.json.new /root/.openclaw/openclaw.json
```

验证：

```bash
jq -r '.agents.defaults.model.primary' /root/.openclaw/openclaw.json
```

---

## 六、这个版本的 `gateway.bind` 是坑点

这次最大的显式报错是：

```text
Invalid config at /root/.openclaw/openclaw.json:
- gateway.bind: Invalid input
```

原因是把：

```json
"bind": "0.0.0.0"
```

写进去了。

但这台机器上的 OpenClaw 版本要求的是：

```json
"bind": "lan"
```

修复命令：

```bash
jq '.gateway.bind = "lan"' /root/.openclaw/openclaw.json > /root/.openclaw/openclaw.json.new \
  && mv /root/.openclaw/openclaw.json.new /root/.openclaw/openclaw.json
```

验证：

```bash
jq '.gateway.bind' /root/.openclaw/openclaw.json
```

如果不是 `"lan"`，Gateway 很可能直接起不来。

---

## 七、修复 allowedOrigins，解决 HTTPS 下的控制台请求问题

如果网页已经能开，但控制台或 Chat 页请求报 origin / CORS 问题，就要补 `allowedOrigins`。

本次最终可用值：

```json
[
  "http://bot.136222.xyz",
  "http://147.139.198.175",
  "https://bot.136222.xyz",
  "https://bota.136222.xyz",
  "https://botb.136222.xyz",
  "https://147.139.198.175"
]
```

修复命令：

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

## 八、这台机器上正确的 Gateway 启动方式

这次还发现一个典型误区：

```bash
nohup openclaw-gateway > /tmp/root-gateway.log 2>&1 &
```

在非交互环境里会失败：

```text
nohup: failed to run command 'openclaw-gateway': No such file or directory
```

这说明 PATH 不一致，不能偷懒直接调命令名。

这台机器正确、稳定的启动方式是：

```bash
cd /opt/openclaw
node scripts/run-node.mjs gateway
```

后台启动可以这样：

```bash
cd /opt/openclaw
nohup node scripts/run-node.mjs gateway >/tmp/root-gateway.log 2>&1 &
```

验证是否启动成功：

```bash
ss -ltnp | grep 11251
```

---

## 九、Nginx 反代 OpenClaw 的关键点

OpenClaw 并不是直接把 UI 放在 `/`，而是在 `/{basePath}/`。

我们这次最终确认的 basePath 是：

```text
566161bc
```

所以 Nginx 反代时要把 `/` 转发到：

```text
http://127.0.0.1:11251/566161bc/
```

`bot.136222.xyz` 的关键 server 配置思路如下：

```nginx
location / {
    proxy_pass http://127.0.0.1:11251/566161bc/;
}
```

如果你直接反代到 `http://127.0.0.1:11251/`，通常会得到 404。

---

## 十、为什么 bot 域名最开始证书不正常？

这次 `bota`、`botb` 都已经是 Let's Encrypt，唯独 `bot` 一开始还是自签名。

根因是：

- 80 端口 server 把所有请求都 `301` 到 HTTPS 了
- `/.well-known/acme-challenge/` 没有被优先放行
- ACME 验证根本到不了 challenge 文件

### 正确写法
80 端口应该先放行挑战路径：

```nginx
server {
    listen 80;
    server_name bot.136222.xyz;

    location ^~ /.well-known/acme-challenge/ {
        default_type "text/plain";
        root /home/web/letsencrypt;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}
```

---

## 十一、补 Let’s Encrypt 真证书的方法

这次最终成功的做法是：

1. 先打通 ACME challenge 路径
2. 用 `acme.sh` 指向 Nginx 真正能读到的 webroot
3. 安装到当前 Nginx 使用的证书路径
4. reload Nginx

核心命令思路：

```bash
~/.acme.sh/acme.sh --issue -d bot.136222.xyz --webroot <实际可访问的 webroot> --server letsencrypt --force

~/.acme.sh/acme.sh --install-cert -d bot.136222.xyz \
  --key-file /home/web/certs/bot.136222.xyz_key.pem \
  --fullchain-file /home/web/certs/bot.136222.xyz_cert.pem \
  --reloadcmd "kill -HUP <nginx-master-pid>"
```

最后验证证书：

```bash
echo | openssl s_client -connect bot.136222.xyz:443 -servername bot.136222.xyz 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

成功后的 issuer 类似：

```text
issuer=C = US, O = Let's Encrypt, CN = E8
```

---

## 十二、这次排障后的最终可用信息

### 真实生效配置文件
```bash
/root/.openclaw/openclaw.json
```

### 默认模型
```text
api136222/gpt-5.4
```

### Gateway 端口
```text
11251
```

### UI basePath
```text
566161bc
```

### 本地 UI 入口
```text
http://127.0.0.1:11251/566161bc/
```

### 外部域名入口
```text
https://bot.136222.xyz/
https://bota.136222.xyz/
https://botb.136222.xyz/
```

### Gateway Token
```text
1e796ffa5df6a5638381f8804bf276ba
```

---

## 十三、强烈建议保留的排障命令

### 查看当前谁在监听 Gateway
```bash
ss -ltnp | grep 11251
```

### 查看谁在跑 OpenClaw
```bash
pgrep -af 'run-node.mjs gateway|openclaw-gateway|node scripts/run-node.mjs'
```

### 检查当前模型
```bash
jq -r '.agents.defaults.model.primary' /root/.openclaw/openclaw.json
```

### 检查 bind
```bash
jq '.gateway.bind' /root/.openclaw/openclaw.json
```

### 检查 allowedOrigins
```bash
jq '.gateway.controlUi.allowedOrigins' /root/.openclaw/openclaw.json
```

### 前台看真实报错
```bash
cd /opt/openclaw
node scripts/run-node.mjs gateway
```

### 看证书发行方
```bash
echo | openssl s_client -connect bot.136222.xyz:443 -servername bot.136222.xyz 2>/dev/null | openssl x509 -noout -issuer -subject -dates
```

---

## 十四、一句话总结

这次不是“OpenClaw 坏了”，而是：

- 改错了配置文件
- 误写了 `gateway.bind`
- 没意识到 UI 有 `basePath`
- Nginx 反代需要转到 `/{basePath}/`
- `bot` 域名的 ACME challenge 没放行

把这五个点修正后，整套系统就恢复了。

---

## 🔙 返回导航

- [返回 OpenClaw / 飞牛 NAS 专题](openclaw-fly-nas-deployment.md)
- [返回总导航](../README.md)
- [下一篇推荐：OpenClaw 配 GPT-5.4 实战教程](openclaw-gpt-5.4-guide.md)
