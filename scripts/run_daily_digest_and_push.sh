#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

DATE_STR="$(date +%F)"
MD_PATH="tutorials/news-digest/daily/${DATE_STR}.md"

# Generate (skeleton for now)
./scripts/news_digest.py

# If file exists, generate audio
if [[ -f "$MD_PATH" ]]; then
  ./scripts/tts_news.sh "$MD_PATH" "/tmp/news_${DATE_STR}.m4a" >/dev/null
fi

# Commit & push only if there are changes
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git add "$MD_PATH" || true

git commit -m "更新：每日焦点新闻 ${DATE_STR}" || {
  echo "Nothing to commit."
  exit 0
}

git push origin main
