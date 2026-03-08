# ⚡ 安装指南

## 📦 环境要求

| 组件 | 最低版本 | 推荐版本 | 说明 |
|------|----------|----------|------|
| macOS | 10.15 (Catalina) | 13+ (Ventura) | 仅 macOS |
| Python | 3.9 | 3.11+ | 脚本运行 |
| Docker | 20.10 | 24+ | 容器部署 |
| Node.js | 14 | 18+ | Docsify 本地预览 |
| Git | 2.30 | 2.40+ | 版本控制 |

---

## 🚀 快速安装（5 分钟）

### 方式 ①：克隆文档站（推荐）

```bash
# 1. 克隆教程仓库
cd ~/Documents
git clone https://github.com/macsur/macsur.github.io.git
cd macsur.github.io

# 2. 本地预览（可选）
npm i -g docsify-cli
docsify serve .

# 3. 浏览器打开
open http://localhost:3000
```

### 方式 ②：集成到现有 Hexo 博客

```bash
# 1. 下载本仓库的 tutorials/ 目录
# 2. 复制到 Hexo 的 source/_posts/
cp -r tutorials/* ~/your-hexo-blog/source/_posts/

# 3. 在 Hexo 配置中添加导航
# _config.yml
menu:
  教程: /tutorials/

# 4. 生成并部署
hexo g && hexo d
```

---

## 🔧 工具安装

### Python 脚本依赖

```bash
# 检查 Python 版本
python3 --version  # 应 >= 3.9

# 无需额外依赖，使用系统自带库
# 但建议安装 jq 用于 JSON 处理
brew install jq
```

### Docker 环境（部分教程需要）

#### Mac 安装 Docker Desktop

1. 访问 https://www.docker.com/products/docker-desktop/
2. 下载 macOS 版本
3. 双击安装，拖到 Applications
4. 启动 Docker，等待图标稳定

验证：
```bash
docker --version
docker ps  # 应无错误
```

---

### Homebrew Cask（推荐）

如果还没有 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

常用工具一键安装：

```bash
brew install --cask docker
brew install python
brew install node
brew install jq
brew install --cask ampps  # 本地服务器（可选）
```

---

## 🎯 按需安装

### 如果你只关心小爱音箱刷机

```bash
# 1. 安装 adb 工具
brew install android-platform-tools

# 2. 下载 Openxiaoai 固件
# 访问：https://github.com/OpenXiaoAI-Community/Openxiaoai/releases

# 3. 准备 USB 数据线（支持数据传输）
```

### 如果你要部署 AgentDVR

```bash
# 1. 在飞牛 NAS 上安装 Docker
# 通过飞牛 Docker 管理界面操作

# 2. 克隆部署脚本
git clone https://github.com/gitmeus/openclaw-experience-summary.git
cd openclaw-experience-summary
chmod +x flyroot_deploy_agentdvr.sh

# 3. 执行（在飞牛 NAS 上）
./flyroot_deploy_agentdvr.sh
```

### 如果你要配置新闻摘要系统

```bash
# 1. 克隆教程仓库
git clone https://github.com/gitmeus/openclaw-experience-summary.git
cd openclaw-experience-summary

# 2. 配置 cron 任务
crontab -l | { cat; echo "0 5 * * * cd $(pwd) && python3 scripts/tech_news_digest.py >> logs/cron_news_\$(date +\%Y-\%m-\%d).log 2>&1"; } | crontab -

# 3. 手动测试
python3 scripts/tech_news_digest.py
```

---

## ✅ 验证安装

运行检查脚本：

```bash
cd /Users/ttnk/.openclaw/workspace
python3 << 'EOF'
import sys
print("Python:", sys.version)
print("✅ Python 正常")
EOF

docker --version 2>/dev/null && echo "✅ Docker 正常" || echo "⚠️  Docker 未安装"
which docsify && echo "✅ Docsify 正常" || echo "⚠️  Docsify 未安装"
```

---

## 🆘 常见安装问题

### ❌ `permission denied` 运行脚本

```bash
chmod +x scripts/*.sh scripts/*.py
```

---

### ❌ Docker Desktop 启动失败

macOS 权限问题：

1. 系统设置 → 隐私与安全性 → 开发者工具
2. 勾选 Docker Desktop
3. 重启 Docker

---

### ❌ `python3: command not found`

macOS 默认 Python 是 2.7。需要安装 Python 3：

```bash
brew install python
# 或从 python.org 下载安装包
```

---

### ❌ Docsify 预览报错

```bash
# 重新安装
npm uninstall -g docsify-cli
npm install -g docsify-cli

# 清理缓存
rm -rf ~/.docsify
```

---

## 🌐 浏览器兼容性

| 浏览器 | 版本 | 支持 |
|--------|------|------|
| Safari | 14+ | ✅ 完全支持 |
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

---

## 📚 下一步

- [配置说明](configuration.md) - 个性化设置
- [第一个教程](../tutorials/agent-reach.md) - 开始学习
- [常见问题](../faq.md) - 快速排错

---

**如果安装遇到问题，请查看 [FAQ](../faq.md) 或提交 [Issue](https://github.com/macsur/macsur.github.io/issues)** 🎯
