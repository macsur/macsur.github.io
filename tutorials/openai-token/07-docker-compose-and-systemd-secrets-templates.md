# OpenAI Token 专题通道｜07：NAS/服务器落地模板（docker-compose / systemd 安全注入密钥）

> 目标：把第 05 篇的“方法论”落到可复制的配置：
> - NAS：docker-compose
> - 服务器：systemd
>
> 关键词：**环境变量注入**、**不进仓库**、**可轮换**。

---

## 0｜先立规矩（否则一定翻车）
- `.env` / `EnvironmentFile` **不进 git**
- token 永远不写进镜像、不写进脚本默认值
- 每个环境一个 token（nas/prod 分开）

---

## Part A｜docker-compose（NAS 最常用）

### A1）目录结构建议
```text
app/
  docker-compose.yml
  .env            # 真密钥（不要提交）
  .env.example    # 变量名示例（可提交）
```

### A2）.env.example（可提交）
```bash
OPENAI_API_KEY=
OPENAI_BASE_URL=
```

### A3）.env（不要提交）
```bash
OPENAI_API_KEY=your_real_token_here
OPENAI_BASE_URL=https://api.openai.com
```

### A4）docker-compose.yml 模板（推荐写法）
```yaml
services:
  myapp:
    image: your-image:latest
    restart: unless-stopped
    env_file:
      - .env
    environment:
      # 你也可以在这里覆盖/补充非敏感配置
      TZ: Asia/Shanghai
    volumes:
      - ./data:/app/data
```

> 为什么推荐 `env_file`？
> - 密钥集中在一个文件
> - 轮换时只改 `.env` 然后重启

### A5）权限建议（NAS 重点）
- `.env` 文件权限：尽量 `600`
- 不要把 `.env` 放到会同步/公开的共享目录

### A6）轮换流程（NAS 版）
1) 替换 `.env` 里的 token
2) `docker compose up -d`（重建/重启容器）
3) 验证服务正常
4) 再 revoke 旧 token

---

## Part B｜systemd（服务器最稳）

### B1）用 EnvironmentFile（推荐）
创建：`/etc/myapp/myapp.env`
```bash
OPENAI_API_KEY=your_real_token_here
OPENAI_BASE_URL=https://api.openai.com
```

权限：
```bash
sudo chmod 600 /etc/myapp/myapp.env
sudo chown root:root /etc/myapp/myapp.env
```

### B2）systemd service 模板
创建：`/etc/systemd/system/myapp.service`
```ini
[Unit]
Description=MyApp Service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=myapp
WorkingDirectory=/opt/myapp
EnvironmentFile=/etc/myapp/myapp.env
ExecStart=/opt/myapp/run.sh
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
```

启用：
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp
sudo systemctl status myapp
```

### B3）轮换流程（server 版）
1) 编辑 `/etc/myapp/myapp.env` 替换 token
2) `sudo systemctl restart myapp`
3) 验证日志无报错
4) revoke 旧 token

---

## Part C｜“千万别这样做”（反面清单）
- ❌ 把 token 写在 `run.sh` 里
- ❌ 把 token 写进 docker 镜像（Dockerfile ENV）
- ❌ 把 token 写进仓库 README/教程示例
- ❌ `printenv` / `echo $OPENAI_API_KEY` 出现在日志

---

## 小结
- NAS 用 `env_file + .env`
- 服务器用 `systemd + EnvironmentFile`
- 轮换遵循：先加新 → 切换 → 验证 → 再撤旧

