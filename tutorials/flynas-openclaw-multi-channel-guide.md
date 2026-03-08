# 飞牛 NAS 上 OpenClaw + QQ 机器人 / 飞书 / Telegram 多通道接入教程
> 适用于：飞牛 NAS（fnOS）Docker 环境下，希望让 OpenClaw 接入多个消息通道的用户

---

## 这篇教程解决什么问题

很多人把 OpenClaw 装到飞牛 NAS 上以后，第一步只是“能打开 Web 界面”，但真正好不好用，往往取决于它能不能接入常用消息通道。

这篇教程的目标就是把 OpenClaw 接成一个多通道助手，让它能通过：

- **QQ 机器人**
- **飞书**
- **Telegram**

与用户正常通信。

如果你已经完成：

- Docker 部署 OpenClaw
- 飞牛 NAS 基础网络配置
- OpenClaw 基本模型可用

那么接下来最值得做的，就是把消息通道打通。

---

## 接入后的效果

接入成功后，你可以实现：

- 在 QQ 里和 OpenClaw 对话
- 在飞书里接收提醒、回复消息
- 在 Telegram 里远程向 OpenClaw 发任务
- 把 NAS 上的 Agent 从“后台服务”变成“真正可用的助手”

一句话理解：

> **模型只是大脑，消息通道才是嘴和耳朵。**

---

## 推荐接入顺序

建议按这个顺序做：

1. **Telegram**：最容易成功，适合先验证
2. **飞书**：企业/团队场景很好用
3. **QQ 机器人**：最容易卡在审核、白名单和公网配置，建议最后做

这样做的原因很简单：

- 先用最稳的通道跑通整体链路
- 再接入国内生态通道
- 最后再处理最麻烦的 QQ 机器人审核与公网回调问题

---

## 通用前置条件

开始前请确认：

- OpenClaw 已运行在飞牛 NAS Docker 中
- 配置文件通常位于：

```bash
/vol1/1000/openclaw/openclaw.json
```

- 容器名通常为：

```bash
openclaw
```

- 已能查看容器日志：

```bash
docker logs openclaw --tail 50
```

- 如果某些通道需要公网回调（如 QQ / 飞书），你已经具备：
  - 公网 IP 或域名
  - 端口转发 / 反向代理
  - HTTPS（部分平台推荐或要求）

---

## 一、Telegram 接入（推荐先做）

Telegram 通常是三者里最省心的。

### 1.1 创建 Bot

打开 Telegram，联系 **BotFather**：

- 发送 `/newbot`
- 按提示设置 bot 名称
- 获取 **Bot Token**

你会拿到类似：

```txt
1234567890:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.2 在 OpenClaw 中写入配置

在 `openclaw.json` 中开启 Telegram 通道。不同版本结构可能略有差异，但思路一致：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "1234567890:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

如果你的配置结构是 `gateway.channels`，则写在对应层级下。

### 1.3 重启容器

```bash
docker restart openclaw
```

### 1.4 查看日志

```bash
docker logs openclaw --tail 50 | grep -i telegram
```

如果没有报错，再到 Telegram 给你的 bot 发消息测试。

### 1.5 Telegram 常见问题

#### 提示 token 无效

说明 BotFather 生成的 token 填错了，重新复制。

#### Bot 不回复

先确认：

- 是否已向 bot 发送 `/start`
- 日志里是否有 Telegram 连接成功记录
- 防火墙 / 网络是否影响出站访问

---

## 二、飞书接入

飞书适合团队消息、提醒、协作通知。

### 2.1 创建飞书应用

打开飞书开放平台，创建自建应用。

你需要拿到：

- **App ID**
- **App Secret**

例如：

```json
"feishu": {
  "appId": "cli_xxxxxxxxxxxxx",
  "appSecret": "xxxxxxxxxxxxxxxx"
}
```

### 2.2 在 OpenClaw 配置中启用飞书

常见写法：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxxxxxxxxxx",
      "appSecret": "xxxxxxxxxxxxxxxx"
    }
  }
}
```

如果你的版本使用 `gateway.channels`，则把它写进去即可。

### 2.3 回调地址配置

飞书通常需要事件订阅地址。

如果你做了公网反代，回调地址一般类似：

```txt
https://your-domain.com/feishu
```

实际路径以 OpenClaw 当前通道实现为准；如果你的版本是直接内置处理，通常在文档中会说明具体回调路径。

### 2.4 重启并看日志

```bash
docker restart openclaw
docker logs openclaw --tail 50 | grep -i feishu
```

### 2.5 飞书常见问题

#### appId / appSecret 填错

表现：

- 鉴权失败
- 无法接收事件
- 日志中报认证错误

#### 回调 URL 不通

表现：

- 飞书控制台验证失败
- 事件订阅不成功

先确保公网能访问你的回调地址。

---

## 三、QQ 机器人接入

QQ 机器人是最容易折腾的一项，因为它不只是“填 appId / secret”就完了。

### 3.1 创建 QQ 机器人应用

前往：

```txt
https://q.qq.com/
```

创建 **QQ 频道机器人**（注意，不是普通群机器人）。

你需要拿到：

- **App ID**
- **Client Secret**

例如：

```json
"qqbot": {
  "enabled": true,
  "allowFrom": ["*"],
  "appId": 1903070302,
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### 3.2 在 OpenClaw 中启用 QQ 通道

示例：

```json
{
  "channels": {
    "qqbot": {
      "enabled": true,
      "allowFrom": ["*"],
      "appId": 1903070302,
      "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

### 3.3 重启后查看日志

```bash
docker restart openclaw
docker logs openclaw --tail 100 | grep -i qq
```

如果日志里出现：

```txt
Failed to get access_token
code:100002 internal err
```

通常不是 OpenClaw 配错，而是 **QQ 开放平台侧没准备好**。

### 3.4 QQ 机器人最常见的坑

#### 1）审核状态还是“开发中”

如果你的应用还没审核通过、还没上线，QQ API 可能就会直接报：

```txt
code:100002, message: internal err
```

**这不是你 NAS 的问题，而是应用还不能正式用。**

#### 2）没上线

即使审核过了，也可能还没点击正式上线。

#### 3）公网 IP / 白名单没配

QQ 通道经常要求：

- 公网 IP
- 白名单
- 事件回调 URL
- 可公网访问的端口

#### 4）机器人类型选错

如果你创建的是别的类型，不是 **QQ 频道机器人**，也会接不通。

---

## 四、推荐的配置结构思路

不同版本 OpenClaw 配置层级可能略有区别，但你可以按这个思路理解：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_TELEGRAM_BOT_TOKEN"
    },
    "feishu": {
      "enabled": true,
      "appId": "YOUR_FEISHU_APP_ID",
      "appSecret": "YOUR_FEISHU_APP_SECRET"
    },
    "qqbot": {
      "enabled": true,
      "allowFrom": ["*"],
      "appId": 1234567890,
      "clientSecret": "YOUR_QQBOT_CLIENT_SECRET"
    }
  }
}
```

如果你的配置实际是在 `gateway.channels` 下，也按相同字段写进去即可。

---

## 五、Docker 版最重要的检查点

### 5.1 配置到底有没有进容器

不要只看宿主机文件，必须检查容器里读到的配置：

```bash
docker exec openclaw cat /home/node/.openclaw/openclaw.json | grep -A30 '"channels"'
```

### 5.2 修改后有没有重启容器

```bash
docker restart openclaw
```

### 5.3 日志里到底报了什么错

```bash
docker logs openclaw --tail 100
```

消息通道问题，大多数都能从日志里直接看出来。

---

## 六、推荐调试顺序

建议这样调：

### 第 1 步：先接 Telegram

理由：

- 成功率高
- 成本低
- 回路短
- 最容易验证 OpenClaw 是否能正常接发消息

### 第 2 步：再接飞书

理由：

- 适合通知与团队协作
- 配置逻辑清晰
- 比 QQ 稳定

### 第 3 步：最后接 QQ 机器人

理由：

- 需要平台审核
- 容易卡在白名单 / 公网 / 回调 / 上线状态
- 排查成本高

---

## 七、常见问题速查

### 1. Telegram 不回复

**排查：**

- Bot token 是否正确
- 是否给 bot 发了 `/start`
- 容器日志里是否有 Telegram 错误

---

### 2. 飞书事件订阅失败

**排查：**

- 回调 URL 是否公网可访问
- appId / appSecret 是否正确
- 飞书开放平台里是否已启用事件订阅

---

### 3. QQ 机器人报 `internal err`

**优先检查：**

- 应用是否还在“开发中”
- 是否已审核通过并上线
- App ID / Client Secret 是否匹配
- 是否配置公网 IP / 白名单 / 回调 URL

---

### 4. 宿主机改了配置，容器里却没变化

**排查：**

```bash
docker inspect openclaw | grep -A20 'Mounts'
docker exec openclaw cat /home/node/.openclaw/openclaw.json | head -80
```

---

## 八、推荐实践

如果你真的要长期用，建议按下面思路组合：

- **Telegram**：主远程控制通道
- **飞书**：工作提醒 / 组织协作 / 企业通知
- **QQ**：国内生态补充接入

这样最稳。

如果你一上来就主攻 QQ，体验往往最差，因为它平台限制最多。

---

## 总结

飞牛 NAS 上 OpenClaw 做多通道接入，关键不是“把字段填进去”，而是：

1. **容器内真的读取到了配置**
2. **平台侧凭据正确**
3. **需要回调的通道具备公网可访问条件**
4. **审核 / 上线 / 白名单这些平台条件满足**

一句话总结：

> **Telegram 最适合先跑通，飞书适合协作场景，QQ 机器人最挑平台条件，建议最后接。**

---

## 下一步建议

如果你准备继续把这套系统做完整，建议继续看这些教程：

1. Arm 飞牛 Docker 安装 OpenClaw 调配详解
2. OpenClaw 配 GPT-5.4 实战教程
3. 飞牛 NAS 上 Ollama + OpenClaw 联动实战教程
4. OpenClaw + GPT-5.4 + SearXNG + Ollama 完整组合方案

把“模型 + 搜索 + 本地推理 + 消息通道”全部串起来，OpenClaw 才真正算成型。
