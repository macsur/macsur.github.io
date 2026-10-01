#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日抓取 GitHub Trending TOP10，更新 index.html 的 [Github乐园] 版块。
- 纯 Python 标准库，零第三方依赖
- 抓取失败 / 解析数量不足时直接报错退出，不修改文件（避免空提交覆盖线上内容）
- 在仓库根目录运行
"""
import datetime
import html as htmlmod
import re
import sys
import urllib.request

TRENDING_URL = "https://github.com/trending"
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}
MIN_REPOS = 8
WANT = 10

FOLDER_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-folder-git-2 w-3 h-3 text-slate-500\" aria-hidden=\"true\"><path d=\"M18 19a5 5 0 0 1-5-5v8\"></path><path d=\"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5\"></path><circle cx=\"13\" cy=\"12\" r=\"2\"></circle><circle cx=\"20\" cy=\"19\" r=\"2\"></circle></svg>"
FLAME_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-flame w-3.5 h-3.5 text-amber-400\" aria-hidden=\"true\"><path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\"></path></svg>"
STAR_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-star w-3.5 h-3.5 text-amber-400 fill-amber-400\" aria-hidden=\"true\"><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"></path></svg>"
FORK_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-git-fork w-3.5 h-3.5 text-slate-400\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><circle cx=\"18\" cy=\"6\" r=\"3\"></circle><path d=\"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9\"></path><path d=\"M12 12v3\"></path></svg>"
COPY_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-copy w-3.5 h-3.5\" aria-hidden=\"true\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"></rect><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"></path></svg>"
EXT_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link w-4 h-4\" aria-hidden=\"true\"><path d=\"M15 3h6v6\"></path><path d=\"M10 14 21 3\"></path><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path></svg>"

BADGE_CLASS = {
    1: "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/30",
    2: "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-lg shadow-slate-300/20",
    3: "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono bg-gradient-to-r from-amber-700 to-amber-600 text-white font-black shadow-lg shadow-amber-700/20",
}
BADGE_DEFAULT = "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono bg-slate-800 text-slate-300 font-bold border border-slate-700"


def fetch(url):
    last = None
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001 - 网络抖动直接重试
            last = e
            print(f"[warn] 抓取第{i + 1}次失败: {e}", file=sys.stderr)
    raise RuntimeError(f"抓取失败: {last}")


def parse(page):
    repos = []
    for m in re.finditer(r'<article class="Box-row".*?</article>', page, re.S):
        a = m.group(0)
        href = re.search(r'<h2[^>]*>\s*<a[^>]*href="(/[^"]+)"', a, re.S)
        if not href:
            continue
        parts = href.group(1).strip("/").split("/")
        if len(parts) < 2:
            continue
        owner, repo = parts[0], parts[1]
        desc_m = re.search(r"<p[^>]*col-9[^>]*>(.*?)</p>", a, re.S)
        desc = ""
        if desc_m:
            desc = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", desc_m.group(1))).strip()
        lang_m = re.search(r'itemprop="programmingLanguage"[^>]*>([^<]+)<', a)
        lang = lang_m.group(1).strip() if lang_m else ""
        color_m = re.search(r'repo-language-color"[^>]*style="background-color:\s*([^;"]+)', a)
        color = color_m.group(1).strip() if color_m else "#8b949e"
        stars_m = re.search(r'/stargazers"[^>]*>.*?</svg>\s*([\d,\.kKmM]+)', a, re.S)
        stars = stars_m.group(1).strip() if stars_m else "-"
        forks_m = re.search(r'/forks"[^>]*>.*?</svg>\s*([\d,\.kKmM]+)', a, re.S)
        forks = forks_m.group(1).strip() if forks_m else "-"
        today_m = re.search(r"([\d,]+)\s+stars today", a)
        today = today_m.group(1) if today_m else "0"
        repos.append({
            "owner": owner, "repo": repo, "desc": desc, "lang": lang,
            "color": color, "stars": stars, "forks": forks, "today": today,
        })
        if len(repos) >= WANT:
            break
    return repos


def prettify(repo):
    t = repo.replace("-", " ").replace("_", " ").strip()
    return (t[:1].upper() + t[1:]) if t else repo


def build_card(rank, r):
    esc = htmlmod.escape
    badge = BADGE_CLASS.get(rank, BADGE_DEFAULT)
    champ = ('<span class="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 '
             'border border-cyan-500/20 font-medium">🏆 全球登顶 No.1</span>' if rank == 1 else "")
    lang_span = ""
    if r["lang"]:
        lang_span = (f'<span class="flex items-center space-x-1.5">'
                     f'<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color:{esc(r["color"])}"></span>'
                     f'<span class="font-medium text-slate-300">{esc(r["lang"])}</span></span>')
    desc = esc(r["desc"]) if r["desc"] else '<span class="text-slate-500">暂无简介</span>'
    title = esc(prettify(r["repo"]))
    full = esc(f'{r["owner"]}/{r["repo"]}')
    return (
        f'<div class="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-amber-500/40 '
        f'hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"><div>'
        f'<div class="flex items-start justify-between gap-3 mb-3"><div class="flex items-center space-x-3">'
        f'<span class="{badge}">#{rank}</span><div>'
        f'<div class="flex items-center space-x-2">'
        f'<h3 class="font-bold text-white text-base group-hover:text-amber-300 transition-colors">{title}</h3>{champ}</div>'
        f'<span class="text-xs text-slate-400 font-mono flex items-center space-x-1 mt-0.5">{FOLDER_ICON}<span>{full}</span></span>'
        f"</div></div>"
        f'<div class="flex items-center space-x-1.5 shrink-0">'
        f'<span class="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 shadow-sm animate-pulse">'
        f'{FLAME_ICON}<span>+{esc(r["today"])} 今日新增</span></span></div></div>'
        f'<p class="text-xs text-slate-300 leading-relaxed mb-4 min-h-[36px]">{desc}</p>'
        f'<div class="flex items-center space-x-4 text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800/50">{lang_span}'
        f'<span class="flex items-center space-x-1">{STAR_ICON}<span class="font-mono text-slate-200">{esc(r["stars"])}</span></span>'
        f'<span class="flex items-center space-x-1">{FORK_ICON}<span class="font-mono text-slate-300">{esc(r["forks"])}</span></span>'
        f"</div></div>"
        f'<div class="pt-2 flex items-center justify-between gap-2">'
        f'<div class="flex items-center space-x-1 text-slate-400 font-mono text-xs overflow-hidden">'
        f'<span class="text-cyan-400 select-none">$</span>'
        f'<span class="truncate text-slate-400 text-[11px]">git clone https://github.com/{full}.git</span></div>'
        f'<div class="flex items-center space-x-2 shrink-0">'
        f'<button class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-semibold transition-all border border-amber-500/40 flex items-center space-x-1.5 shadow-sm active:scale-95">'
        f"{COPY_ICON}<span>复制代码</span></button>"
        f'<a href="https://github.com/{full}" target="_blank" rel="noreferrer" '
        f'class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700" '
        f'title="直达 GitHub 开源仓库">{EXT_ICON}</a>'
        f"</div></div></div>"
    )


def beijing_now():
    tz = datetime.timezone(datetime.timedelta(hours=8))
    return datetime.datetime.now(tz).strftime("%Y-%m-%d %H:%M") + " (UTC+8)"


def main():
    page = fetch(TRENDING_URL)
    repos = parse(page)
    print(f"解析到 {len(repos)} 个仓库")
    if len(repos) < MIN_REPOS:
        sys.exit(f"解析到的仓库数量不足({len(repos)})，放弃更新")
    cards = "".join(build_card(i + 1, r) for i, r in enumerate(repos[:WANT]))
    with open("index.html", encoding="utf-8") as f:
        html = f.read()
    if "<!--TRENDING_GRID_START-->" not in html or "<!--TRENDING_GRID_END-->" not in html:
        sys.exit("未找到更新标记位，放弃更新")
    new = re.sub(r"<!--TRENDING_GRID_START-->.*?<!--TRENDING_GRID_END-->",
                 "<!--TRENDING_GRID_START-->" + cards + "<!--TRENDING_GRID_END-->",
                 html, flags=re.S, count=1)
    ts = beijing_now()
    new = re.sub(r"<!--TRENDING_UPDATED_AT-->.*?</span>",
                 f"<!--TRENDING_UPDATED_AT-->{ts}</span>", new, count=1)
    if new == html:
        print("内容无变化，无需更新")
        return
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new)
    print(f"已更新 TOP{WANT}，时间戳: {ts}")


if __name__ == "__main__":
    main()
