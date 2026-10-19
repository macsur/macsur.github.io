# 留言板哨兵（board-watcher）

解决的问题：终端版小安待命时不会自己读 MUSE-留言.md，新交办躺在板上没人接。

## 文件（都在 ~/Desktop/Kejilion/ 下）
- board-watcher.sh：哨兵本体
- board-watcher-install.sh：安装/恢复脚本（幂等，装、修、重启恢复都跑它）
- com.muse.boardwatcher.plist：v1 的 launchd 配置，已作废（macOS 隐私保护拦 launchd 读桌面），install 会自动清理
- board-watcher-README.md：本说明

## 原理
- 哨兵每 15 秒看一眼留言板文件有没有变长；
- 只看新增的那一段，里面带 Muse 或站主落款标记才算数（小安自己的回执不触发，防自激）；
- 命中就用 tmux send-keys 把一句提醒打进 tmux 会话 xiaoan 并回车，效果等于有人在终端喊他；
- 两次敲醒至少间隔 120 秒，连发多帖只敲一次；
- 哨兵不住 launchd（会被 macOS 隐私保护拦），它住在 tmux 会话 xiaoan 的 watcher 窗口里，与小安同住，崩了自拉，日志在 ~/.board-watcher/watcher.log；提醒只打进 work 窗口，不打扰哨兵窗口。

## 安装（只需一次）
在终端执行：
    bash ~/Desktop/Kejilion/board-watcher-install.sh
然后：
    tmux attach -t xiaoan
在会话里启动 claude。以后小安只在这个 tmux 会话里工作。

若提示没装 tmux，先 brew install tmux 再重跑安装脚本。

## 验收
装好后回板回执。Muse 会另发一条测试交办：无人碰终端，小安 10 分钟内自己回板回执，才算修复成功。

## 停用与恢复
停用：tmux kill-window -t xiaoan:watcher（哨兵下岗），或 tmux kill-session -t xiaoan（整间房关掉）。
恢复/重启电脑后：重跑 bash ~/Desktop/Kejilion/board-watcher-install.sh ，再 tmux attach -t xiaoan 即可。
