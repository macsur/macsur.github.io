#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate a daily focus news digest (links + short snippets) and write to repo.

Sources: Brave Search API via OpenClaw agent is not available here; this script is a lightweight placeholder.
In OpenClaw runtime, the agent will generate content and write markdown directly.

This script currently:
- creates a markdown skeleton for today
"""

from __future__ import annotations

from datetime import datetime
from pathlib import Path


def main() -> int:
    today = datetime.now().strftime("%Y-%m-%d")
    out_dir = Path(__file__).resolve().parents[1] / "tutorials" / "news-digest" / "daily"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{today}.md"

    if out_path.exists():
        # don't overwrite
        return 0

    out_path.write_text(
        (
            f"# 每日焦点新闻简报｜{today}\n\n"
            "_自动生成：国内综合 / 国际 / 科技 / AI_\n\n"
            "## 今日要点（待生成）\n\n"
            "- （占位）\n\n"
            "## 国内综合\n\n"
            "- （占位）\n\n"
            "## 国际\n\n"
            "- （占位）\n\n"
            "## 科技\n\n"
            "- （占位）\n\n"
            "## AI\n\n"
            "- （占位）\n\n"
            "---\n\n"
            "> 注：如需更高质量摘要，请在 OpenClaw 中使用 web_search + web_fetch 生成。\n"
        ),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
