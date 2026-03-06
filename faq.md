# ❓ 常见问题 FAQ

## 📚 通用问题

### ❓ MacSur 是什么？

MacSur 是一个开源的 macOS 效率工具集合，本教程文档站收录了 **13 个详细教程**，涵盖网络代理、智能助手、媒体服务、自动化脚本等领域。

---

### ❓ 教程全部免费吗？

✅ **是的！** 所有教程采用 CC BY-NC-SA 4.0 协议，完全免费，可任意传播，但禁止商业用途。

---

### ❓ 我需要什么基础？

- ⭐ 基础教程：只需会用 Mac 和浏览器
- ⭐⭐ 中级教程：需了解命令行、Docker
- ⭐⭐⭐ 高级教程：需有网络配置、NAS 经验

每个教程都会标注难度等级。

---

### ❓ 教程更新频率？

- 🆕 新教程：每月 1-2 个
- 🔄 旧教程：每季度review一次，保持最新

---

## 🔧 安装相关问题

### ❓ `docker: command not found`

**原因**：Docker Desktop 未安装或未启动

**解决**：
1. 下载安装 Docker Desktop：https://www.docker.com/products/docker-desktop/
2. 启动 Docker（菜单栏图标变白）
3. 验证：`docker --version`

---

### ❓ Python 脚本报错 `ModuleNotFoundError`

**原因**：缺少第三方依赖

**解决**：本教程脚本使用 Python 标准库，**无需额外安装**。如遇到第三方库需求，查看教程中的依赖说明。

---

### ❓ 如何修改 cron 任务？

```bash
# 1. 查看现有任务
crontab -l

# 2. 编辑（使用 vim/nano/vscode）
crontab -e

# 3. 删除任务：删除对应行后保存
```

---

### ❓ 端口被占用怎么办？

```bash
# 查看端口占用
lsof -i :8090  # 替换为您要检查的端口

# 结束占用进程
kill -9 <PID>

# 或修改教程中的端口配置
```

---

## 🐛 具体教程问题

### Agent Reach | 🔧

#### ❓ `agent-reach doctor` 显示 0/13 channels

**原因**：API Key 未配置或网络限制

**解决**：
1. 检查 `.env` 文件中的 `AGENT_REACH_*` 变量
2. 确保网络可访问对应平台（Google、Twitter 等）
3. 查看日志：`~/Library/Logs/agent-reach.log`

---

### CLIProxyAPI | 🔌

#### ❓ OAuth 回调 URL 配置错误

**确保**：
- 回调 URL 是 `https://your-domain.com/oauth/callback`
- 与代码中的 `OAUTH_REDIRECT_URI` 一致
- 已通过 DNS 解析到服务器

---

### Cloudflare WARP | 🌐

#### ❓ Zero Trust 隧道连接失败

**检查**：
1. Cloudflare 域名是否正确绑定
2. Tunnel 服务是否运行：`sudo systemctl status cloudflared`
3. 访问 https://one.dash.cloudflare.com/ 查看隧道状态

---

### 小爱音箱刷机 | 🎧

#### ❓ 没有开发者选项？

**原因**：设备被厂商锁定（部分新款型号）

**解决**：
1. 确认设备型号（必须是老款）
2. 使用 Mi Flash 工具解锁（需小米账号）
3. 刷入 TWRP Recovery 后再刷 Openxiaoai
4. **或**：购买已解锁的二手设备

详细：https://www.xiaomi.com/解锁

---

#### ❓ 刷机后卡在 Logo 界面？

**关键步骤**：
```bash
# 进入 Recovery 后必须执行
# 1. Wipe → Format Data (输入 yes)
# 2. 格式化 /system 分区（高级选项里）
# 3. 重新刷入固件
```

如果还不行，尝试旧版本固件 v1.3.0。

---

#### ❓ 蓝牙配对后无法连接？

```bash
# 彻底清除配对
blueutil --unpair "Xiaoai-Pro"
blueutil --remove "Xiaoai-Pro"

# 重置音箱蓝牙（长按蓝牙键 10 秒）
# 重新配对
blueutil --pair "Xiaoai-Pro"
blueutil --connect "Xiaoai-Pro"
```

---

### AgentDVR 监控 | 📹

#### ❓ 容器启动后立即退出？

```bash
# 查看日志
docker logs AgentDVR

# 常见原因：
# 1. 权限不足 → sudo chown -R 1000:1000 /vol1/1000/docker/AgentDVR/
# 2. 端口冲突 → 检查 8090 是否被占用
# 3. PUID 错误 → 确保用户 1000 存在
```

---

#### ❓ RTSP 连接失败？

**排查步骤**：

1. **测试 RTSP 地址**（用 VLC）：
```bash
cvlc "rtsp://admin:password@192.168.50.108:80/Streaming/Channels/101"
```

2. **确认萤石云 RTSP 已开启**：
   - 萤石云 App → 设备 → 设置 → 高级设置 → RTSP 服务 → 开启

3. **检查网络**：`ping 192.168.50.108`

---

### 多源新闻摘要 | 📰

#### ❓ 某些源返回 0 篇文章？

**原因**：
- Jina AI 聚合服务对该源不可用
- 网站结构变化
- 访问限制（Cloudflare 等）

**解决**：
1. 临时注释掉该源（编辑 `scripts/tech_news_digest.py`）
2. 或调整 URL 为备用源
3. 等待更新解析规则

---

#### ❓ 如何添加更多新闻源？

在 `SOURCES` 字典中添加：

```python
"your_source": {
    "url": "https://r.jina.ai/http://example.com/feed",
    "name": "Example News",
    "priority": 9
}
```

---

## 🎵 TTS 音频

### ❓ 音频文件太大？

生成的 AIFF 文件约 10-50 MB。解决方法：

```bash
# 使用 ffmpeg 压缩为 MP3
ffmpeg -i input.aiff -codec:a libmp3lame -qscale:a 4 output.mp3

# 或使用在线转换工具
```

---

### ❓ `say` 命令找不到？

macOS 内置，路径 `/usr/bin/say`。如果提示未找到：

```bash
which say || echo "系统异常"
# 应返回 /usr/bin/say
```

如确实缺失，重装 macOS（不太可能）。

---

## 📱 浏览器与显示

### ❓ 搜索框不显示？

确保 `index.html` 包含搜索插件：

```html
<script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.min.js"></script>
```

并配置了 `search` 选项。

---

### ❓ 侧边栏不折叠？

当前 Docsify 不支持侧边栏折叠（社区插件可实现）。建议：
- 减少一级标题数量
- 使用多级目录结构

---

## 🚀 性能优化

### ❓ 页面加载慢？

优化建议：
1. 压缩图片（使用 TinyPNG）
2. 减少视频数量（使用链接而非嵌入）
3. 启用 CDN（Pages、Cloudflare）
4. 开启 gzip 压缩（nginx 配置）

---

### ❓ 搜索索引太大？

搜索缓存文件 `search_index.json` 会随页面增多变大。定期清理：

```bash
# 清除浏览器缓存
# Docsify 会在 24 小时后自动重新生成
```

---

## 🏢 企业部署

### ❓ 如何内网部署？

1. 构建静态文件：
```bash
# Docsify 是纯前端，直接拷贝即可
cp -r macsur-docs/* /var/www/html/
```

2. 配置 nginx：
```nginx
server {
    listen 80;
    server_name docs.internal;
    root /var/www/html;
    index index.html;
}
```

3. 重启 nginx：`sudo nginx -s reload`

---

## 📊 数据与备份

### ❓ 如何备份教程？

```bash
tar -czf macsur-docs-backup-$(date +%Y%m%d).tar.gz macsur-docs/
```

建议每周备份一次。

---

### ❓ 如何统计访问量？

- **GitHub Pages**: 使用 GitHub 提供的 Insights → Traffic
- **自建**: 添加 Google Analytics
- **Docsify 插件**: `docsify-google-analytics`

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXX');
</script>
```

---

## 🤝 贡献指南

### ❓ 如何提交教程？

1. Fork 本仓库
2. 在 `tutorials/` 创建 `.md` 文件
3. 在 `_sidebar.md` 添加链接
4. 提交 PR，描述清晰

---

### ❓ 格式规范？

- 使用 Markdown 标准语法
- 中文字符编码 UTF-8
- 代码块标注语言（```python）
- 图片使用相对路径 `./assets/images/xxx.png`

---

## 🔐 安全

### ❓ 教程中涉及 API Key 怎么办？

** NEVER ** 在公开仓库提交真实 Key！

教程中使用占位符：
```yaml
api_key: "YOUR_API_KEY_HERE"
```

并在 `.gitignore` 中添加 `secrets.env`。

---

### ❓ 如何删除历史敏感信息？

```bash
# 从 Git 历史中彻底删除文件
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.env' \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

⚠️ 该操作不可逆，谨慎使用！

---

**没有找到答案？**  
👉 [提交 Issue](https://github.com/macsur/macsur.github.io/issues) 或查看 [GitHub Discussions](https://github.com/macsur/macsur.github.io/discussions)
