#!/usr/bin/env bash
set -euo pipefail

# Usage: tts_news.sh <markdown_file> [output_m4a]

MD_FILE="${1:-}"
OUT_FILE="${2:-}"

if [[ -z "${MD_FILE}" || ! -f "${MD_FILE}" ]]; then
  echo "Usage: $0 <markdown_file> [output_m4a]" >&2
  exit 1
fi

DATE_STR=$(basename "$MD_FILE" .md)
OUT_FILE=${OUT_FILE:-"/tmp/news_${DATE_STR}.m4a"}
TXT_FILE="/tmp/news_${DATE_STR}.txt"

# Strip basic markdown for TTS
python3 - <<'PY' "$MD_FILE" "$TXT_FILE"
import re,sys
md=sys.argv[1]
out=sys.argv[2]
text=open(md,'r',encoding='utf-8',errors='ignore').read()
# remove code blocks
text=re.sub(r"```[\s\S]*?```","",text)
# remove markdown links [text](url) -> text
text=re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
# remove headings markers
text=re.sub(r"^#+\s*","",text, flags=re.M)
# bullets
text=text.replace("- ", "")
# collapse spaces
text=re.sub(r"\n{3,}","\n\n",text)
open(out,'w',encoding='utf-8').write(text.strip()+"\n")
PY

# macOS say -> m4a
say -f "$TXT_FILE" -o "$OUT_FILE" --data-format=LEI16@22050

echo "$OUT_FILE"
