#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-147.139.198.175}"
REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_PORT="${REMOTE_PORT:-22}"
REMOTE_PASS="${REMOTE_PASS:-}"
REMOTE_SCRIPT_PATH="${REMOTE_SCRIPT_PATH:-/root/openclaw-aliyun-ops.sh}"
LOCAL_SCRIPT_SOURCE="${LOCAL_SCRIPT_SOURCE:-$(cd "$(dirname "$0")" && pwd)/openclaw-aliyun-ops.sh}"

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing command: $1" >&2; exit 1; }
}

ssh_base() {
  if [[ -n "$REMOTE_PASS" ]]; then
    need_cmd sshpass
    sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST"
  else
    ssh -o StrictHostKeyChecking=no -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST"
  fi
}

scp_base() {
  if [[ -n "$REMOTE_PASS" ]]; then
    need_cmd sshpass
    sshpass -p "$REMOTE_PASS" scp -o StrictHostKeyChecking=no -P "$REMOTE_PORT"
  else
    scp -o StrictHostKeyChecking=no -P "$REMOTE_PORT"
  fi
}

ensure_remote_script() {
  echo "==> sync remote ops script"
  scp_base "$LOCAL_SCRIPT_SOURCE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_SCRIPT_PATH"
  ssh_base "chmod +x '$REMOTE_SCRIPT_PATH'"
}

run_remote() {
  local cmd="$1"
  shift || true
  ssh_base "bash '$REMOTE_SCRIPT_PATH' '$cmd' $*"
}

usage() {
  cat <<'EOF'
Usage:
  remote-openclaw-aliyun.sh sync
  remote-openclaw-aliyun.sh status
  remote-openclaw-aliyun.sh start
  remote-openclaw-aliyun.sh stop
  remote-openclaw-aliyun.sh restart
  remote-openclaw-aliyun.sh logs
  remote-openclaw-aliyun.sh urls
  remote-openclaw-aliyun.sh cert [domain]
  remote-openclaw-aliyun.sh fix-model
  remote-openclaw-aliyun.sh fix-bind
  remote-openclaw-aliyun.sh fix-origins
  remote-openclaw-aliyun.sh doctor

Env:
  REMOTE_HOST=147.139.198.175
  REMOTE_USER=root
  REMOTE_PORT=22
  REMOTE_PASS=your-password   # optional; if omitted, use normal ssh auth
  REMOTE_SCRIPT_PATH=/root/openclaw-aliyun-ops.sh
  LOCAL_SCRIPT_SOURCE=./openclaw-aliyun-ops.sh
EOF
}

cmd="${1:-}"
case "$cmd" in
  sync)
    ensure_remote_script
    ;;
  status|start|stop|restart|logs|urls|fix-model|fix-bind|fix-origins|doctor)
    ensure_remote_script
    run_remote "$cmd"
    ;;
  cert)
    ensure_remote_script
    domain="${2:-bot.136222.xyz}"
    run_remote cert "$domain"
    ;;
  *)
    usage
    exit 1
    ;;
esac
