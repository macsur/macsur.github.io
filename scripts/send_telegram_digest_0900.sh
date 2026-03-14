#!/usr/bin/env bash
set -euo pipefail

# Send a short Telegram message pointing to today's digest page.
# Requires env: TG_BOT_TOKEN, TG_CHAT_ID

TG_BOT_TOKEN="${TG_BOT_TOKEN:-}"
TG_CHAT_ID="${TG_CHAT_ID:-}"

if [[ -z "$TG_BOT_TOKEN" || -z "$TG_CHAT_ID" ]]; then
  echo "Missing TG_BOT_TOKEN or TG_CHAT_ID" >&2
  exit 1
fi

echo "::add-mask::${TG_BOT_TOKEN}"

DATE_STR="$(date +%F)"
URL="https://x.zttz.eu.org/#/tutorials/news-digest/daily/${DATE_STR}"
MSG="☀️ 个人晨报已生成（${DATE_STR}）\n\n🔗 ${URL}\n\n（含 Top5 + 分类摘要 + LinkedIn 草稿）"

curl -sS -X POST "https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TG_CHAT_ID}" \
  --data-urlencode "text=${MSG}" \
  -d "disable_web_page_preview=true" \
  -d "parse_mode=HTML" >/dev/null
