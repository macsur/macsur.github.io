# OpenAI Token 专题通道｜02：Cloudflare 最简收信配置（只收验证码，10 分钟跑通）

> 目标：让 `@你的域名` 能稳定收到 OpenAI 的验证码邮件。
>
> 关键词：**只收不发（receive-only）**、最小配置、可验证。

---

## 你要的结果长这样
- 你有一个邮箱地址：`anyname@yourdomain.com`
- OpenAI 发验证码过来：你能收到
- 你能在 Cloudflare 侧看到路由/日志，或在你的收件端看到邮件内容

---

## 准备清单（最少 2 样）
- [ ] 你的域名 DNS 在 Cloudflare 托管
- [ ] 你有一个“最终收件箱”用来接收转发（比如 Gmail / Outlook / 企业邮）

> 说明：Cloudflare Email Routing 常见做法是 **把发到你域名的邮件转发到现有邮箱**。

---

## Step 1：确认域名在 Cloudflare（不然别往下走）
检查点：
- Cloudflare 里能看到你的域名
- DNS 是 Cloudflare 托管（Nameserver 已指向 Cloudflare）

---

## Step 2：开启 Email Routing（收信路由）
在 Cloudflare Dashboard 里找到 Email 相关入口（Email / Email Routing）。

你会做两件事：
1) 添加/验证你的“目标收件邮箱”（Destination address）
2) 配路由规则（Routing rules）

---

## Step 3：配置最小规则（Catch-all or 指定前缀）
### 方案 A：Catch-all（最省心）
把所有发到 `@yourdomain.com` 的邮件都转发到你的目标邮箱。

适合：你只想快速跑通，后续再细分。

### 方案 B：只转发某个前缀（更干净）
例如只转发：
- `openai@yourdomain.com`
- `verify@yourdomain.com`

适合：你想控制垃圾邮件风险。

---

## Step 4：验证是否成功（不要靠“感觉”）
你至少要完成一个可验证闭环：

- 在 OpenAI 注册/登录触发验证码
- 目标邮箱收到验证码邮件
- （可选）Cloudflare 面板里能看到路由命中/日志

> 若收不到：优先检查目标邮箱是否完成 Cloudflare 的验证，以及路由规则是否启用。

---

## 常见问题（避坑）
1) **为什么我能看到规则，但就是收不到？**
- 多数是目标邮箱没验证通过，或规则没启用

2) **Catch-all 会不会引来垃圾邮件？**
- 会。所以建议：先 catch-all 跑通，稳定后改成“指定前缀”。

3) **我需要自建 SMTP/IMAP 吗？**
- 不需要。你是为了收验证码，不是开邮箱服务公司。

---

## 下一篇预告（03）
我建议写：**Token 安全与轮换**
- 如何存 token 不泄露
- 如何撤销/轮换
- 如何在本地用 `.env` 管理
- 如何避免误提交到 GitHub
