#!/usr/bin/env bash
set -euo pipefail

CONFIG="${OPENCLAW_CONFIG:-/root/.openclaw/openclaw.json}"
OPENCLAW_DIR="${OPENCLAW_DIR:-/opt/openclaw}"
LOG_FILE="${OPENCLAW_LOG:-/tmp/root-gateway.log}"
PORT="${OPENCLAW_PORT:-11251}"
DEFAULT_MODEL="${OPENCLAW_DEFAULT_MODEL:-api136222/gpt-5.4}"

ORIGINS_JSON='[
  "http://bot.136222.xyz",
  "http://147.139.198.175",
  "https://bot.136222.xyz",
  "https://bota.136222.xyz",
  "https://botb.136222.xyz",
  "https://147.139.198.175"
]'

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing command: $1" >&2; exit 1; }
}

backup_config() {
  cp -a "$CONFIG" "$CONFIG.bak.$(date +%Y%m%d-%H%M%S)"
}

get_basepath() {
  jq -r '.gateway.controlUi.basePath // .gateway.basePath // empty' "$CONFIG"
}

status_cmd() {
  echo "=== process ==="
  pgrep -af 'run-node.mjs gateway|openclaw-gateway|node scripts/run-node.mjs' || true
  echo
  echo "=== listen ==="
  ss -ltnp | grep "$PORT" || true
  echo
  echo "=== config ==="
  jq -r '.gateway.bind, .agents.defaults.model.primary' "$CONFIG" | awk 'NR==1{print "bind=" $0} NR==2{print "model=" $0}'
  printf 'basePath=%s\n' "$(get_basepath)"
  echo
  echo "=== urls ==="
  urls_cmd
}

start_cmd() {
  cd "$OPENCLAW_DIR"
  nohup node scripts/run-node.mjs gateway >"$LOG_FILE" 2>&1 &
  sleep 5
  status_cmd
  echo
  echo "=== log tail ==="
  tail -60 "$LOG_FILE" || true
}

stop_cmd() {
  pkill -f 'run-node.mjs gateway|openclaw-gateway' || true
  sleep 2
  echo "stopped"
}

restart_cmd() {
  stop_cmd
  start_cmd
}

logs_cmd() {
  tail -100 "$LOG_FILE"
}

urls_cmd() {
  local base
  base="$(get_basepath)"
  printf 'local-ui=http://127.0.0.1:%s/%s/\n' "$PORT" "$base"
  printf 'public-ui=http://147.139.198.175:%s/%s/\n' "$PORT" "$base"
  echo 'proxy-ui=https://bot.136222.xyz/'
  echo 'proxy-ui=https://bota.136222.xyz/'
  echo 'proxy-ui=https://botb.136222.xyz/'
}

cert_cmd() {
  local domain="${2:-bot.136222.xyz}"
  echo | openssl s_client -connect "$domain:443" -servername "$domain" 2>/dev/null | openssl x509 -noout -issuer -subject -dates
}

fix_model_cmd() {
  need_cmd jq
  backup_config
  jq --arg m "$DEFAULT_MODEL" '.agents.defaults.model.primary = $m' "$CONFIG" > "$CONFIG.new"
  mv "$CONFIG.new" "$CONFIG"
  jq -r '.agents.defaults.model.primary' "$CONFIG"
}

fix_bind_cmd() {
  need_cmd jq
  backup_config
  jq '.gateway.bind = "lan"' "$CONFIG" > "$CONFIG.new"
  mv "$CONFIG.new" "$CONFIG"
  jq -r '.gateway.bind' "$CONFIG"
}

fix_origins_cmd() {
  need_cmd jq
  backup_config
  jq --argjson arr "$ORIGINS_JSON" '.gateway.controlUi.allowedOrigins = $arr' "$CONFIG" > "$CONFIG.new"
  mv "$CONFIG.new" "$CONFIG"
  jq '.gateway.controlUi.allowedOrigins' "$CONFIG"
}

doctor_cmd() {
  echo '=== root check ==='
  id
  echo
  echo '=== config file ==='
  ls -l "$CONFIG"
  echo
  echo '=== json valid ==='
  jq empty "$CONFIG" && echo ok
  echo
  echo '=== gateway foreground hint ==='
  echo "cd $OPENCLAW_DIR && node scripts/run-node.mjs gateway"
  echo
  status_cmd
}

usage() {
  cat <<'EOF'
Usage: openclaw-aliyun-ops.sh <command> [arg]

Commands:
  status         Show process/listen/config/urls
  start          Start gateway in background
  stop           Stop gateway
  restart        Restart gateway
  logs           Tail gateway log
  urls           Print known UI URLs
  cert [domain]  Show TLS cert issuer/subject/dates
  fix-model      Set default model to api136222/gpt-5.4
  fix-bind       Set gateway.bind to lan
  fix-origins    Set known allowedOrigins list
  doctor         Quick diagnostics
EOF
}

cmd="${1:-}"
case "$cmd" in
  status) status_cmd ;;
  start) start_cmd ;;
  stop) stop_cmd ;;
  restart) restart_cmd ;;
  logs) logs_cmd ;;
  urls) urls_cmd ;;
  cert) cert_cmd "$@" ;;
  fix-model) fix_model_cmd ;;
  fix-bind) fix_bind_cmd ;;
  fix-origins) fix_origins_cmd ;;
  doctor) doctor_cmd ;;
  *) usage; exit 1 ;;
esac
