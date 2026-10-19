#!/bin/bash
# auto-recover.sh —— 登录后自动恢复：哨兵 + 小安（防掉线、防停电的软件层）
# 幂等：重复运行无副作用；在岗的组件不会被重复拉起，也不会往正在工作的
# 小安窗口里乱打字。每次运行写日志：~/.board-watcher/auto-recover.log
# v2（2026-10-16 站主批准 A 案）：新增第 4 步「自动派活」——仅当本次运行
# 亲手拉起小安时，等他界面就绪后敲一句固定开工令，补上演练发现的
# 「只拉起、不派活」盲区；在忙或非本次拉起，一律不敲。
set -u
SRC="/Users/ttnk/Desktop/Kejilion"
LOG="$HOME/.board-watcher/auto-recover.log"
mkdir -p "$HOME/.board-watcher"
ts() { date '+%Y-%m-%d %H:%M:%S';}
log() { echo "[$(ts)] $*" >> "$LOG";}

log "auto-recover start"

# 1) tmux 会话与哨兵：复用 v2 安装脚本（本身幂等，缺啥补啥）
bash "$SRC/board-watcher-install.sh" >> "$LOG" 2>&1
log "board-watcher-install done"

# 2) CC Switch（小安的模型链代理）：在跑就不动，不在跑就拉起（尽力而为）
if pgrep -f "CC Switch" >/dev/null 2>&1; then
log "CC Switch already running"
else
if open -a "CC Switch" >/dev/null 2>&1; then
log "CC Switch launched"
else
log "CC Switch launch failed (app name may differ, check manually)"
fi
fi

# 3) 小安本尊：只当 work 窗口里是个空壳终端时，才发送启动命令；
# 窗口里已有程序在跑（比如 claude 本人）就绝不打字、不打扰。
sleep 2
STARTED=0
if tmux has-session -t xiaoan 2>/dev/null; then
CMD=$(tmux list-panes -t xiaoan:work -F '#{pane_current_command}' 2>/dev/null | head -n 1)
case "$CMD" in
zsh|bash|sh|-zsh|-bash)
tmux send-keys -t xiaoan:work 'claude --dangerously-skip-permissions' Enter
log "xiaoan start command sent (pane was idle shell: $CMD)"
STARTED=1
;;
*)
log "xiaoan work pane busy (current: ${CMD:-unknown}), left untouched"
;;
esac
else
log "ERROR: tmux session xiaoan missing after install step"
fi

# 4) 自动派活（v2 新增）：只给「本次亲手拉起」的小安派活。
# 先等他界面真正就绪（底栏出现 bypass permissions）才打字，免得把字
# 敲进没起完的界面里散掉；提交后回看底部输入框，没送出就补按回车
# （最多 3 次），结果一律写日志。
if [ "$STARTED" -eq 1]; then
DISPATCH='先读留言板 MUSE-留言.md 板尾的未结单，按顺序直接开工：未结单即站主已批准，不必等任何人确认；每单完工按规矩回帖回执，已推送与已上线分开写；若没有未结单，回一句待命即可。'
READY=0
for i in $(seq 1 36); do
sleep 5
PANE=$(tmux capture-pane -p -t xiaoan:work -S -40 2>/dev/null)
case "$PANE" in
*"bypass permissions"*) READY=1; break;;
esac
done
if [ "$READY" -eq 1]; then
sleep 2
tmux send-keys -t xiaoan:work -l "$DISPATCH"
sleep 1
SENT=0
for try in 1 2 3; do
tmux send-keys -t xiaoan:work C-m
sleep 4
PANE=$(tmux capture-pane -p -t xiaoan:work -S -8 2>/dev/null)
case "$PANE" in
*"esc to interrupt"*) SENT=1; break;;
esac
case "$PANE" in
*"自恢复派活"*):;;
*) SENT=1; break;;
esac
done
if [ "$SENT" -eq 1]; then
log "dispatch sent (auto work order delivered to fresh xiaoan)"
else
log "dispatch UNCONFIRMED (text may still sit in input box, check pane)"
fi
else
log "dispatch skipped (claude UI not ready within 180s)"
fi
else
log "dispatch skipped (xiaoan not started by this run)"
fi

log "auto-recover end"
