#!/bin/bash
# board-watcher-install.sh —— 改版（v2）：不用 launchd。
# 原因：macOS 隐私保护（TCC）会拦 launchd 进程读写桌面目录，哨兵脚本起不来。
# 改法：哨兵住进 tmux 会话的一个常驻窗口，与小安同住一间房，权限随终端走。
# 本脚本幂等：装、修、重启后恢复，都跑它。
set -e
SRC="/Users/ttnk/Desktop/Kejilion"
# 清理 v1 的 launchd 哨兵（若在）
launchctl unload "$HOME/Library/LaunchAgents/com.muse.boardwatcher.plist" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/com.muse.boardwatcher.plist"
mkdir -p "$HOME/.board-watcher"
chmod +x "$SRC/board-watcher.sh" 2>/dev/null || true
if ! command -v tmux >/dev/null 2>&1; then
  echo "[!] 还没装 tmux。请先执行：brew install tmux —— 装完再跑一次本脚本。"
  exit 0
fi
if tmux has-session -t xiaoan 2>/dev/null; then
  echo "[OK] tmux 会话 xiaoan 已存在。"
else
  tmux new-session -d -s xiaoan -n work -c "$SRC"
  echo "[OK] tmux 会话 xiaoan 已创建（工作窗口 work，目录 Kejilion）。"
fi
if tmux list-windows -t xiaoan -F '#{window_name}' 2>/dev/null | grep -qx watcher; then
  echo "[OK] 哨兵窗口已在岗。"
else
  tmux new-window -d -t xiaoan -n watcher "while true; do bash $SRC/board-watcher.sh; echo watcher exited, respawn in 5s; sleep 5; done"
  echo "[OK] 哨兵已上岗（tmux 会话 xiaoan 的 watcher 窗口），日志在 ~/.board-watcher/watcher.log"
fi
echo "下一步：tmux attach -t xiaoan ，在 work 窗口里启动 claude（小安）。以后小安只在这个会话里工作；重启电脑后，重跑一次本脚本即可全部恢复。"
