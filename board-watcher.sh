#!/bin/bash
# board-watcher.sh —— 盯 MUSE-留言.md，有 Muse/站主新帖就敲醒 tmux 里的小安
# 纯轮询实现，零外部依赖（只需 tmux）。住 tmux 会话的 watcher 窗口，由重生循环保活（v1 的 launchd 方案被 macOS TCC 拦截，已作废）。
BOARD="/Users/ttnk/Desktop/Kejilion/MUSE-留言.md"
TMUX_TARGET="xiaoan:work"
STATE_DIR="$HOME/.board-watcher"
OFFSET_FILE="$STATE_DIR/offset"
LASTINJ_FILE="$STATE_DIR/last-inject"
LOG="$STATE_DIR/watcher.log"
POLL=15
COOLDOWN=120
WAKE_MSG="【哨兵提醒】留言板有 Muse 或站主的新帖。请立即读取 MUSE-留言.md 的尾部最新内容，按最新交办执行并回板回执。若你核对后发现最新帖是你自己的回执、或与你无关，请忽略本条。"

mkdir -p "$STATE_DIR"
log(){ echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

# 初始偏移 = 当前文件大小，只盯之后的新增内容
if [ ! -f "$OFFSET_FILE" ]; then
  stat -f %z "$BOARD" > "$OFFSET_FILE" 2>/dev/null || echo 0 > "$OFFSET_FILE"
fi
log "watcher started"

while true; do
  if [ -f "$BOARD" ]; then
    size=$(stat -f %z "$BOARD" 2>/dev/null || echo 0)
    last=$(cat "$OFFSET_FILE" 2>/dev/null || echo 0)
    case "$last" in ''|*[!0-9]*) last=0;; esac
    if [ "$size" -lt "$last" ]; then
      echo "$size" > "$OFFSET_FILE"; last=$size
      log "board shrank, offset reset to $size"
    fi
    if [ "$size" -gt "$last" ]; then
      seg=$(tail -c +$((last+1)) "$BOARD" 2>/dev/null)
      echo "$size" > "$OFFSET_FILE"
      if printf '%s' "$seg" | grep -Eq '—— Muse|【站主令|【Muse|## .*Muse|Muse (交办|催办|批复|验收|上线令|转站主令)'; then
        now=$(date +%s)
        lastinj=$(cat "$LASTINJ_FILE" 2>/dev/null || echo 0)
        case "$lastinj" in ''|*[!0-9]*) lastinj=0;; esac
        if [ $((now-lastinj)) -ge $COOLDOWN ]; then
          if tmux has-session -t "$TMUX_TARGET" 2>/dev/null; then
            tmux send-keys -t "$TMUX_TARGET" -l "$WAKE_MSG"
            sleep 2
            tmux send-keys -t "$TMUX_TARGET" C-m
            ok=0
            for try in 1 2 3 4; do
              sleep 3
              if tmux capture-pane -t "$TMUX_TARGET" -p 2>/dev/null | tail -n 4 | grep -qF '【哨兵提醒】'; then
                tmux send-keys -t "$TMUX_TARGET" C-m
                log "wake still in input box, retry C-m ($try)"
              else
                ok=1; break
              fi
            done
            echo "$now" > "$LASTINJ_FILE"
            if [ "$ok" = 1 ]; then log "trigger matched, wake submitted to tmux:$TMUX_TARGET"; else log "trigger matched, wake typed but submit UNCONFIRMED"; fi
          else
            log "trigger matched but tmux session '$TMUX_TARGET' not found, skipped"
          fi
        else
          log "trigger matched but in cooldown, skipped"
        fi
      else
        log "board grew, no trigger signature, ignored"
      fi
    fi
  fi
  sleep $POLL
done
