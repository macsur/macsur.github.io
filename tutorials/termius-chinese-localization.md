# Termius Pro 汉化完整教程

**标签**: `Termius` `汉化` `macOS` `SSH客户端`

**最后更新**: 2026-03-07

---

## 📖 简介

本教程将指导您在 macOS 上将 Termius Pro 完整汉化，并激活试用功能。适用于 9.x 版本。

> **注意**：本项目仅供学习交流使用，请支持正版软件。

---

## ✅ 适用版本

| Termius 版本 | 汉化包文件名 | 状态 |
|--------------|--------------|------|
| 9.37.2 | `app-macos-localize-trial.asar` | ✅ 推荐 |
| 9.34.8 | `app-macos-localize-trial.asar` | ✅ 可用 |
| 其他版本 | 需匹配对应版本 | ⚠️ 版本必须一致 |

**如何查看您的 Termius 版本？**

```bash
mdls -name kMDItemVersion /Applications/Termius.app | awk -F' = ' '{print $2}'
```

---

## 📦 前置要求

### 1. 安装 Python 3
macOS 自带 Python 3.9+，检查：
```bash
python3 --version
```

### 2. 安装 Node.js 和 asar
```bash
# 安装 asar 工具
npm install -g @electron/asar

# 验证安装
asar --version  # 应输出版本号
```

---

## 🚀 快速安装（三分钟）

### 步骤 1：下载汉化包

访问 [Releases 页面](https://github.com/ArcSurge/Termius-Pro-zh_CN/releases)

找到与您版本对应的 `app-macos-localize-trial.asar`（推荐试用版）并下载到 `~/Downloads/`

### 步骤 2：完全退出 Termius

```bash
# 强制终止所有 Termius 进程
sudo pkill -f Termius
```

或者在菜单栏右键 Termius 图标 → **Quit**

### 步骤 3：运行安装脚本

```bash
# 克隆汉化仓库（如果还没有）
cd ~
git clone https://github.com/ArcSurge/Termius-Pro-zh_CN.git termius-zh

# 进入目录
cd termius-zh

# 给脚本执行权限
chmod +x install.sh

# 运行安装（输入管理员密码）
./install.sh
```

安装脚本会自动：
1. 备份原始 `app.asar`
2. 替换汉化文件
3. 修复 macOS 签名和 hash
4. 清理临时文件

### 步骤 4：重启 Termius

完全退出 Termius（确保无后台进程），然后重新启动。

**恭喜！您现在拥有中文界面的 Termius Pro 了！** 🎉

---

## 🔧 手动安装（备用方案）

如果自动脚本失败，可以手动操作：

```bash
# 1. 备份
sudo cp /Applications/Termius.app/Contents/Resources/app.asar /Applications/Termius.app/Contents/Resources/app.asar.backup

# 2. 替换（调整文件名）
sudo cp ~/Downloads/app-macos-localize-trial-9.34.8.asar /Applications/Termius.app/Contents/Resources/app.asar

# 3. 修复
cd ~/termius-zh/macos
sudo bash osxfix.sh

# 4. 重启 Termius
```

---

## 🛠️ osxfix.sh 修复脚本详解

macOS 应用有严格的安全验证，修改 `app.asar` 后需要重新签名并更新 Info.plist 中的 hash 值。

`osxfix.sh` 自动完成：

1. **计算 hash**：读取 asar 文件头部，计算 SHA256
2. **更新 Info.plist**：添加 `ElectronAsarIntegrity` 字典
3. **重签名**：清除原开发者标识，使用本地证书重新签名

---

## 🐛 常见问题

### Q1: `Operation not permitted` 错误

**原因**：Termius 仍在运行或 SIP 限制。

**解决**：
```bash
# 1. 完全退出 Termius
sudo pkill -9 -f Termius

# 2. 重启 Mac（如果仍有问题）
# 重启后立即运行修复脚本，不要启动其他应用
```

### Q2: 汉化后部分文字仍是英文

正常现象。汉化包主要覆盖界面元素，部分动态内容（如服务器返回的数据）保持原文。

### Q3: 更新 Termius 后汉化失效

每次 Termius 更新都会覆盖 `app.asar`，需要重新汉化。

**建议**：删除自动更新文件：
```bash
sudo rm /Applications/Termius.app/Contents/app-update.yml
```

### Q4: 想恢复原版

```bash
sudo cp /Applications/Termius.app/Contents/Resources/app.asar.backup /Applications/Termius.app/Contents/Resources/app.asar
sudo /Applications/Termius.app -- repair-permissions
```

---

## 📝 不同版本汉化包说明

| 文件名 | 功能 | 说明 |
|--------|------|------|
| `app-macos-localize.asar` | 仅汉化 | 纯净汉化，无试用激活 |
| `app-macos-localize-trial.asar` | 汉化+试用激活 | **推荐**，解锁高级功能 |
| `app-macos-localize-skip.asar` | 汉化+跳过登录 | 跳过账号验证，可能无法同步 |

**推荐使用 `-trial` 版本**，功能最全。

---

## 🔒 免责声明

- 本项目仅限**个人学习与研究**
- 不得用于商业目的或二次销售
- 使用后果自行承担
- 请支持正版软件

---

## 📚 参考资源

- [原项目仓库](https://github.com/ArcSurge/Termius-Pro-zh_CN)
- [Termius 官网](https://termius.com)
- [功能请求（官方中文）](https://ideas.termius.com/c/82-chinese-localization)

---

**最后更新**: 2026年3月7日  
**适用 Termius 版本**: 9.34.8, 9.37.2
