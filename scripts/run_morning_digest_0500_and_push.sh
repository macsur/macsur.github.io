#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

DATE_STR="$(date +%F)"
OUT_MD="tutorials/news-digest/daily/${DATE_STR}.md"

./scripts/multi_source_digest.py >/dev/null

# Generate audio for 07:00 playback (optional but handy)
if [[ -f "$OUT_MD" ]]; then
  ./scripts/tts_news.sh "$OUT_MD" "/tmp/news_${DATE_STR}.m4a" >/dev/null || true
fi

# Commit & push if changes
if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git add "$OUT_MD" || true

git commit -m "更新：个人晨报 ${DATE_STR}" || {
  echo "Nothing to commit."
  exit 0
}

git push origin main
