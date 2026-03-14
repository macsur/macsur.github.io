#!/usr/bin/env bash
set -euo pipefail

# Play today's generated news audio to current system output (Bluetooth if selected in macOS)
# Usage: play_news.sh [YYYY-MM-DD]

DATE_STR=${1:-"$(date +%F)"}
AUDIO="/tmp/news_${DATE_STR}.m4a"

if [[ ! -f "$AUDIO" ]]; then
  echo "Audio not found: $AUDIO" >&2
  echo "Generate it first: ./scripts/tts_news.sh ./tutorials/news-digest/daily/${DATE_STR}.md" >&2
  exit 1
fi

echo "Playing: $AUDIO"
afplay "$AUDIO"
