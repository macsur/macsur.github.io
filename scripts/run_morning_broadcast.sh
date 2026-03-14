#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

DATE_STR="$(date +%F)"
MD_PATH="tutorials/news-digest/daily/${DATE_STR}.md"
AUDIO="/tmp/news_${DATE_STR}.m4a"

# Ensure audio exists
if [[ ! -f "$AUDIO" ]]; then
  if [[ -f "$MD_PATH" ]]; then
    ./scripts/tts_news.sh "$MD_PATH" "$AUDIO" >/dev/null
  else
    echo "Digest markdown not found: $MD_PATH" >&2
    exit 1
  fi
fi

./scripts/play_news.sh "$DATE_STR"
