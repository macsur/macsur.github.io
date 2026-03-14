#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Multi-Source Tech News Digest (example)

What it does (MVP):
- Fetch RSS feeds (TechCrunch, 少数派, 36氪)
- Filter by include/exclude keywords
- Produce a beautiful Markdown digest
- Produce a LinkedIn draft (ZH) for tech founders

Note:
- This is an example implementation. RSS URLs can be swapped.
- For Twitter/X keywords, we intentionally do NOT scrape X here; use official API or alternate sources.
"""

from __future__ import annotations

import re
import sys
import time
import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


@dataclass
class Item:
    source: str
    title: str
    link: str
    published: str


def fetch(url: str, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) DigestBot/1.0",
        "Accept": "application/rss+xml,application/xml,text/xml,*/*",
    })
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def parse_rss(xml_bytes: bytes, source: str) -> list[Item]:
    # Support RSS 2.0 & Atom basic
    root = ET.fromstring(xml_bytes)
    items: list[Item] = []

    # RSS
    for it in root.findall("./channel/item"):
        title = (it.findtext("title") or "").strip()
        link = (it.findtext("link") or "").strip()
        pub = (it.findtext("pubDate") or it.findtext("date") or "").strip()
        if title and link:
            items.append(Item(source, title, link, pub))

    # Atom
    if not items:
        ns = {"a": "http://www.w3.org/2005/Atom"}
        for entry in root.findall("./a:entry", ns):
            title = (entry.findtext("a:title", default="", namespaces=ns) or "").strip()
            link_el = entry.find("a:link", ns)
            link = (link_el.get("href") if link_el is not None else "").strip()
            pub = (entry.findtext("a:updated", default="", namespaces=ns) or "").strip()
            if title and link:
                items.append(Item(source, title, link, pub))

    return items


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def dedupe(items: Iterable[Item]) -> list[Item]:
    seen = set()
    out = []
    for it in items:
        key = (norm(it.title).lower(), it.link)
        if key in seen:
            continue
        seen.add(key)
        out.append(it)
    return out


def filter_items(items: list[Item], include: list[str], exclude: list[str]) -> list[Item]:
    out = []
    for it in items:
        t = it.title
        if exclude and any(k in t for k in exclude):
            continue
        if include and not any(k.lower() in t.lower() for k in include):
            # include is soft; keep if empty
            pass
        out.append(it)
    return out


def md_link(title: str, url: str) -> str:
    title = title.replace("[", "").replace("]", "")
    return f"[{title}]({url})"


def build_digest(date_str: str, items: list[Item]) -> str:
    # Simple category heuristic
    def cat(title: str) -> str:
        tl = title.lower()
        if any(k in tl for k in ["apple", "iphone", "mac", "ipad", "vision", "nothing phone", "pixel"]):
            return "📱 硬件发布"
        if any(k in tl for k in ["security", "leak", "漏洞", "攻击", "黑客", "ransom", "cve"]):
            return "🔐 网络安全"
        if any(k in tl for k in ["anthropic", "openai", "chatgpt", "gemini", "llm", "ai", "claude"]):
            return "🤖 AI"
        if any(k in tl for k in ["收购", "融资", "earnings", "revenue", "ipo", "acquire", "deal", "business", "政策", "regulation"]):
            return "💰 商业动态"
        return "🧩 其它"

    buckets: dict[str, list[Item]] = {}
    for it in items:
        buckets.setdefault(cat(it.title), []).append(it)

    # Top 5 = first 5 items overall
    top5 = items[:5]

    lines = []
    lines.append(f"# 个人晨报｜{date_str}")
    lines.append("")
    lines.append("信息源：RSS（TechCrunch / 少数派 / 36氪）｜过滤：娱乐、明星")
    lines.append("")
    lines.append("## 🏆 Top 5 重点新闻")
    lines.append("")
    for i, it in enumerate(top5, 1):
        lines.append(f"{i}. {md_link(it.title, it.link)}  ·  _{it.source}_")
    lines.append("")

    for section in ["📱 硬件发布", "💰 商业动态", "🤖 AI", "🔐 网络安全", "🧩 其它"]:
        if section not in buckets:
            continue
        lines.append(f"## {section}")
        lines.append("")
        for it in buckets[section][:8]:
            lines.append(f"- {md_link(it.title, it.link)}  ·  _{it.source}_")
        lines.append("")

    lines.append("---")
    lines.append("_自动生成：仅供参考，以原文为准。_")
    lines.append("")

    return "\n".join(lines)


def build_linkedin_draft(date_str: str, top_item: Item | None) -> str:
    if not top_item:
        return "（今日无足够新闻生成 LinkedIn 草稿）"

    # Professional but grounded; for tech founders
    return (
        f"【{date_str} AI 热点】\n\n"
        f"今天刷到一条值得创业者关注的消息：{top_item.title}\n"
        f"原文：{top_item.link}\n\n"
        "我的解读（给科技创业者的三点）：\n"
        "1）产品侧：把 AI 功能做‘可验证的价值’，别堆概念。\n"
        "2）增长侧：用内容/工作流展示真实提效场景，比参数对比更打动人。\n"
        "3）团队侧：把数据与提示词/评测流程沉淀下来，才能规模化复用。\n\n"
        "你觉得这类趋势对你所在行业影响最大的是哪一块？欢迎留言交流。"
    )


def main() -> int:
    # Default RSS (can be replaced)
    feeds = [
        ("TechCrunch", "https://techcrunch.com/feed/"),
        ("少数派", "https://sspai.com/feed"),
        ("36氪", "https://www.36kr.com/feed"),
    ]

    exclude = ["娱乐", "明星"]

    date_str = datetime.now().strftime("%Y-%m-%d")

    items: list[Item] = []
    for name, url in feeds:
        try:
            xml_bytes = fetch(url)
            parsed = parse_rss(xml_bytes, name)
            items.extend(parsed)
            time.sleep(0.5)
        except Exception as e:
            # ignore failed source
            continue

    items = dedupe(items)
    items = filter_items(items, include=[], exclude=exclude)

    # Sort: keep as-is (feed order); optionally sort by published if parseable.

    digest_md = build_digest(date_str, items)
    linkedin = build_linkedin_draft(date_str, next((it for it in items if re.search(r"openai|chatgpt|anthropic|gemini|ai", it.title, re.I)), items[0] if items else None))

    repo_dir = Path(__file__).resolve().parents[1]
    out_dir = repo_dir / "tutorials" / "news-digest" / "daily"
    out_dir.mkdir(parents=True, exist_ok=True)

    out_path = out_dir / f"{date_str}.md"
    out_path.write_text(digest_md + "\n\n## 📝 LinkedIn 帖子草稿（中文）\n\n" + linkedin + "\n", encoding="utf-8")

    print(str(out_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
