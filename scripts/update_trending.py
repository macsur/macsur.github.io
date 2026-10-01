#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日抓取 GitHub Trending TOP10，更新 index.html 的 [Github乐园] 版块。
翻译策略（三级，复刻原站 fetch_github_trending.js 的设计）：
  1. 内置中文词典：命中则直接使用精心打磨的中文标题+简介；
  2. 大模型 API 翻译：需配置环境变量 TRANSLATE_API_URL + TRANSLATE_API_KEY
     （GitHub Secrets），翻译英文简介为中文；失败自动降级；
  3. 规则替换兜底：对英文简介做轻量术语替换。
- 纯 Python 标准库，零第三方依赖
- 抓取失败 / 解析数量不足时直接报错退出，不修改文件（避免空提交覆盖线上内容）
- 在仓库根目录运行
"""
import datetime
import glob
import html as htmlmod
import json
import os
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

TAG_STYLE = {
    1: "text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium",
    2: "text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium",
    3: "text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium",
}
TAG_DEFAULT_STYLE = "text-[11px] px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-300 border border-slate-500/20 font-medium"

# ---- 翻译 API（可选；不配置则跳过，直接用词典+规则）----
TRANSLATE_API_URL = os.environ.get("TRANSLATE_API_URL", "").rstrip("/")
TRANSLATE_API_KEY = os.environ.get("TRANSLATE_API_KEY", "")
TRANSLATE_MODEL = os.environ.get("TRANSLATE_MODEL", "cli-api")

# ---- 内置中文词典：命中即用，无需翻译（移植自原站 fetch_github_trending.js）----
BUILTIN_ZH_DICTIONARY = {
    "paperclip": ("Paperclip · AI 智能体工作流协同平台",
                  "专为职场打造的开源多 Agent 管理协同工具，一站式编排与调度团队 AI 智能体。"),
    "hindsight": ("Hindsight · 具学习能力的 Agent 记忆引擎",
                  "让 AI 智能体越用越聪明的持久化自学习记忆架构，原生支持终身学习与上下文进化。"),
    "Model-Optimizer": ("Model-Optimizer · NVIDIA 前沿大模型优化与加速库",
                        "英伟达官方统一的 SOTA 模型优化库，集成量化、蒸馏、剪枝与推测解码，大幅提升 TensorRT-LLM 与 vLLM 推理吞吐。"),
    "univer": ("Univer · AI 智能体全能协同 Office 底座",
               "面向 AI Agent 的全能办公运行底座，单套运行时集成表格、文档、幻灯片、白板与关系数据库。"),
    "tensorflow": ("TensorFlow · 顶级端到端机器学习开源框架",
                  "Google 开源的世界级端到端机器学习与深度学习框架，覆盖从科研训练到生产部署全流程。"),
    "ai-engineering-from-scratch": ("从零构建 AI 工程全栈实践指南",
                                    "系统化掌握大模型与 AI 生产级落地开发，涵盖从基础架构到商业化全流程实战。"),
    "openbao": ("OpenBao · 开源高安全密码与密钥管理系统",
                "开源社区主导的 HashiCorp Vault 独立开源平替，专用于集中安全存储证书、API 秘钥与敏感数据。"),
    "buzz": ("Buzz · 高并发分布式蜂群即时通信平台",
             "基于 Rust 打造的去中心化、高吞吐蜂群式通讯与消息协作协议平台。"),
    "vscode": ("VS Code · 微软开源全能代码编辑器",
               "全球最受欢迎的现代化开源轻量级代码编辑器，拥有极强的插件扩展能力与生态支持。"),
    "reverse-skill": ("Reverse-Skill · 逆向渗透与安全研究 AI 技能路由包",
                      "AI 智能路由驱动的安全工程套件，支持 Claude Code / Cursor / Cline 自动按需自举工具链与经验进化。"),
}

# ---- 规则兜底：轻量术语替换（移植自原站）----
RULE_REPLACEMENTS = [
    ("The open-source app everyone uses to", "人人都在使用的开源应用：用于"),
    ("An open source", "开源的"),
    ("A unified library of", "统一的开发库：包含"),
    ("framework for", "开发框架，适用于"),
    ("in one runtime", "统一运行时环境"),
    ("manage agents at work", "在工作场景中调度与管理 AI 智能体"),
    ("sensitive data including", "敏感数据，包括"),
    ("communication platform", "通讯协同平台"),
]


def translate_via_api(text):
    """可选的大模型翻译；未配置或失败返回 None。"""
    if not (TRANSLATE_API_URL and TRANSLATE_API_KEY) or not text.strip():
        return None
    try:
        payload = json.dumps({
            "model": TRANSLATE_MODEL,
            "messages": [
                {"role": "system",
                 "content": "你是一个开源软件翻译专家，请将英文项目描述翻译为地道、简明、富有科技感的中文（仅输出中文，不超过50字）。"},
                {"role": "user", "content": text},
            ],
            "temperature": 0.3,
        }).encode()
        req = urllib.request.Request(
            TRANSLATE_API_URL + "/chat/completions", data=payload, method="POST",
            headers={"Content-Type": "application/json",
                     "Authorization": f"Bearer {TRANSLATE_API_KEY}"})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.load(r)
        content = (data.get("choices") or [{}])[0].get("message", {}).get("content", "").strip()
        return content or None
    except Exception as e:  # noqa: BLE001 - 翻译失败就降级，不影响主流程
        print(f"[warn] API 翻译失败，已降级: {e}", file=sys.stderr)
        return None


def dict_lookup(repo):
    return BUILTIN_ZH_DICTIONARY.get(repo) or BUILTIN_ZH_DICTIONARY.get(repo.lower())


def rule_translate(en_desc):
    zh = en_desc
    for en, cn in RULE_REPLACEMENTS:
        zh = zh.replace(en, cn)
    return zh


def localize(repo, en_desc):
    """三级翻译：词典 -> API -> 规则。返回 (中文标题, 中文简介)。"""
    entry = dict_lookup(repo)
    zh_desc = translate_via_api(en_desc)
    if zh_desc:
        return (entry[0] if entry else prettify(repo)), zh_desc
    if entry:
        return entry[0], entry[1]
    return prettify(repo), rule_translate(en_desc)


def tag_for(rank):
    if rank == 1:
        return "🏆 全球登顶 No.1"
    if rank == 2:
        return "🥈 今日榜眼 No.2"
    if rank == 3:
        return "🥉 今日探花 No.3"
    return f"TOP {rank} 趋势"


def stars_today_str(today):
    return f"+{today} 今日新增" if today else "🔥 社区火爆"


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
        lang = lang_m.group(1).strip() if lang_m else "Markdown / Shell"
        color_m = re.search(r'repo-language-color"[^>]*style="background-color:\s*([^;"]+)', a)
        color = color_m.group(1).strip() if color_m else "#8b949e"
        stars_m = re.search(r'/stargazers"[^>]*>.*?</svg>\s*([\d,\.kKmM]+)', a, re.S)
        stars = stars_m.group(1).strip() if stars_m else "-"
        forks_m = re.search(r'/forks"[^>]*>.*?</svg>\s*([\d,\.kKmM]+)', a, re.S)
        forks = forks_m.group(1).strip() if forks_m else "-"
        today_m = re.search(r"([\d,]+)\s+stars today", a)
        today = today_m.group(1) if today_m else None
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
    tag_style = TAG_STYLE.get(rank, TAG_DEFAULT_STYLE)
    tag_badge = f'<span class="{tag_style}">{tag_for(rank)}</span>'
    lang_span = (f'<span class="flex items-center space-x-1.5">'
                 f'<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color:{esc(r["color"])}"></span>'
                 f'<span class="font-medium text-slate-300">{esc(r["lang"])}</span></span>')
    title_raw, desc_raw = localize(
        r["repo"], r["desc"] or "暂无详细描述，点击前往 GitHub 探索项目源码。")
    title, desc = esc(title_raw), esc(desc_raw)
    full = esc(f'{r["owner"]}/{r["repo"]}')
    return (
        f'<div class="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-amber-500/40 '
        f'hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"><div>'
        f'<div class="flex items-start justify-between gap-3 mb-3"><div class="flex items-center space-x-3">'
        f'<span class="{badge}">#{rank}</span><div>'
        f'<div class="flex items-center space-x-2">'
        f'<h3 class="font-bold text-white text-base group-hover:text-amber-300 transition-colors">{title}</h3>{tag_badge}</div>'
        f'<span class="text-xs text-slate-400 font-mono flex items-center space-x-1 mt-0.5">{FOLDER_ICON}<span>{full}</span></span>'
        f"</div></div>"
        f'<div class="flex items-center space-x-1.5 shrink-0">'
        f'<span class="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 shadow-sm animate-pulse">'
        f'{FLAME_ICON}<span>{esc(stars_today_str(r["today"]))}</span></span></div></div>'
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


def build_js_data(repos):
    """生成 JS chunk 中 T 数组的字面量（JSON 即合法 JS）。字段顺序与原构建一致。"""
    items = []
    for i, r in enumerate(repos[:WANT]):
        rank = i + 1
        title, desc = localize(
            r["repo"], r["desc"] or "暂无详细描述，点击前往 GitHub 探索项目源码。")
        full = f'{r["owner"]}/{r["repo"]}'
        items.append({
            "rank": rank,
            "name": title,
            "rawName": r["repo"],
            "owner": r["owner"],
            "repo": full,
            "stars": r["stars"],
            "forks": r["forks"],
            "starsToday": stars_today_str(r["today"]),
            "language": r["lang"],
            "langColor": r["color"],
            "tag": tag_for(rank),
            "desc": desc,
            "enDesc": r["desc"],
            "githubUrl": f"https://github.com/{full}",
            "deployCmd": f"git clone https://github.com/{full}.git",
        })
    return "T=" + json.dumps(items, ensure_ascii=True, separators=(",", ":"))


def update_js_chunk(repos):
    """同步更新 _next JS chunk 里的榜单数据，避免 hydration 用旧数据覆盖新 HTML。"""
    paths = glob.glob("_next/static/chunks/app/page-*.js")
    if not paths:
        sys.exit("未找到 page JS chunk，放弃更新")
    path = paths[0]
    with open(path, encoding="utf-8") as f:
        js = f.read()
    start = js.find("T=[")
    if start == -1:
        sys.exit("JS 中未找到 T=[ 数据数组，放弃更新")
    # 括号匹配找数组结尾（跳过字符串内容）
    depth, in_str, escape, end = 0, None, False, -1
    for j in range(start + 2, len(js)):
        c = js[j]
        if in_str:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == in_str:
                in_str = None
        elif c in ("\"", "'"):
            in_str = c
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                end = j
                break
    if end == -1:
        sys.exit("JS 数据数组括号不匹配，放弃更新")
    new_js = js[:start] + build_js_data(repos) + js[end + 1:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_js)
    print(f"已同步 JS chunk: {path}")
    return path


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
    js_path = update_js_chunk(repos)
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
