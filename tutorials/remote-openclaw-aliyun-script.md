# OpenClaw 阿里云一键远程脚本使用说明

> 配套脚本：`tools/remote-openclaw-aliyun.sh`

![OpenClaw 远程运维脚本封面](https://opengraph.githubassets.com/1/openclaw/openclaw)

---

## 一、这个脚本是干什么的

如果你不想每次都先 SSH 登录服务器，再手动执行运维命令，那么这个脚本就是给你准备的。

它支持你在 **本地 Mac / Linux 终端** 直接执行：

```bash
./tools/remote-openclaw-aliyun.sh status
./tools/remote-openclaw-aliyun.sh restart
./tools/remote-openclaw-aliyun.sh logs
./tools/remote-openclaw-aliyun.sh doctor
```

脚本会自动：

1. 通过 SSH 登录阿里云服务器
2. 自动同步远端运维脚本 `openclaw-aliyun-ops.sh`
3. 在服务器上执行对应命令
4. 把结果直接回显到你本地终端

---

## 二、脚本路径

```text
tools/remote-openclaw-aliyun.sh
```

它依赖同目录下的：

```text
tools/openclaw-aliyun-ops.sh
```

---

## 三、最常用命令

### 查看状态

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh status
```

### 重启 Gateway

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh restart
```

### 查看日志

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh logs
```

### 查看 URLs

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh urls
```

### 运行 doctor

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh doctor
```

### 查看证书

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh cert
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh cert bota.136222.xyz
```

---

## 四、支持的远程命令

```bash
sync
status
start
stop
restart
logs
urls
cert [domain]
fix-model
fix-bind
fix-origins
doctor
```

---

## 五、默认连接参数

脚本默认使用：

- `REMOTE_HOST=147.139.198.175`
- `REMOTE_USER=root`
- `REMOTE_PORT=22`
- `REMOTE_SCRIPT_PATH=/root/openclaw-aliyun-ops.sh`

所以最常见场景下，你只需要提供密码就能跑。

---

## 六、如果你用 SSH Key

如果你已经把公钥放进服务器，就不需要 `REMOTE_PASS`：

```bash
./tools/remote-openclaw-aliyun.sh status
```

脚本会直接使用系统 SSH。

---

## 七、如果以后服务器或账号变化

可以这样覆盖：

```bash
REMOTE_HOST=1.2.3.4 \
REMOTE_USER=admin \
REMOTE_PORT=22 \
REMOTE_PASS='你的密码' \
./tools/remote-openclaw-aliyun.sh status
```

---

## 八、推荐用法

### 只想看当前是否正常

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh status
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh cert
```

### 怀疑 Gateway 掉了

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh restart
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh logs
```

### 怀疑配置被改乱了

```bash
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh fix-model
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh fix-bind
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh fix-origins
REMOTE_PASS='你的密码' ./tools/remote-openclaw-aliyun.sh restart
```

---

## 🔙 返回导航

- [返回 OpenClaw 阿里云服务器运维脚本使用说明](openclaw-aliyun-ops-script.md)
- [返回 OpenClaw 阿里云服务器运维备忘录](openclaw-aliyun-ops-memo.md)
- [返回总导航](../README.md)
