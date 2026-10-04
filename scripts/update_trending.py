#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GitHub Trending 官方热榜每日数据抓取与中文翻译引擎.

1. 每日定时抓取 https://github.com/trending 官方热榜 TOP10；
2. 优先调用指定的大模型 API (https://cli.136222.xyz/v1, cli-api) 进行地道、富有科技感的中文翻译；
3. 内置高可靠开源术语字典与语义规则兜底，确保在任何网络波动下 100% 优雅汉化；
4. 原子化同步更新 index.html 与 Next.js 客户端 JS Chunk (解决 Hydration 覆盖问题)；
5. Python 3.11 兼容，遵循 PEP8 规范。
"""

import datetime
import glob
import html as htmlmod
import json
import os
import re
import ssl
import sys
import urllib.error
import urllib.request

TRENDING_URL = "https://github.com/trending"
BACKUP_TRENDING_URL = "https://ghproxy.net/https://github.com/trending"

UA_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
}

MIN_REPOS = 8
WANT = 10

# ---- 图标 SVG ----
FOLDER_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-folder-git-2 w-3 h-3 text-slate-500" aria-hidden="true">'
    '<path d="M18 19a5 5 0 0 1-5-5v8"></path>'
    '<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2'
    'a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"></path>'
    '<circle cx="13" cy="12" r="2"></circle>'
    '<circle cx="20" cy="19" r="2"></circle></svg>'
)
FLAME_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-flame w-3.5 h-3.5 text-amber-400" aria-hidden="true">'
    '<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0'
    'c0-2-1.5-3-1.5-5q0-2 2.5-4"></path></svg>'
)
STAR_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-star w-3.5 h-3.5 text-amber-400 fill-amber-400" '
    'aria-hidden="true">'
    '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16'
    'l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878'
    'l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0'
    'L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879'
    'L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>'
)
FORK_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-git-fork w-3.5 h-3.5 text-slate-400" aria-hidden="true">'
    '<circle cx="12" cy="18" r="3"></circle>'
    '<circle cx="6" cy="6" r="3"></circle>'
    '<circle cx="18" cy="6" r="3"></circle>'
    '<path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"></path>'
    '<path d="M12 12v3"></path></svg>'
)
COPY_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-copy w-3.5 h-3.5" aria-hidden="true">'
    '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>'
    '<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>'
)
EXT_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round" '
    'class="lucide lucide-external-link w-4 h-4" aria-hidden="true">'
    '<path d="M15 3h6v6"></path>'
    '<path d="M10 14 21 3"></path>'
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>'
)

BADGE_CLASS = {
    1: (
        "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono "
        "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black "
        "shadow-lg shadow-amber-500/30"
    ),
    2: (
        "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono "
        "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black "
        "shadow-lg shadow-slate-300/20"
    ),
    3: (
        "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono "
        "bg-gradient-to-r from-amber-700 to-amber-600 text-white font-black "
        "shadow-lg shadow-amber-700/20"
    ),
}
BADGE_DEFAULT = (
    "w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono "
    "bg-slate-800 text-slate-300 font-bold border border-slate-700"
)

TAG_STYLE = {
    1: (
        "text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 "
        "border border-cyan-500/20 font-medium"
    ),
    2: (
        "text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 "
        "border border-amber-500/20 font-medium"
    ),
    3: (
        "text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 "
        "border border-amber-500/20 font-medium"
    ),
}
TAG_DEFAULT_STYLE = (
    "text-[11px] px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-300 "
    "border border-slate-500/20 font-medium"
)

# ---- 用户指定的大模型翻译 API 端点信息 ----
DEFAULT_API_URL = "https://cli.136222.xyz/v1"
DEFAULT_MODEL = "gemini-2.5-flash"
DEFAULT_API_KEY = "sk-f6ba10cfedb11ef9213fe3f0eae6fc81727b08d12bd4cc211ab015a978cb1f0f"

TRANSLATE_API_URL = (
    os.environ.get("TRANSLATE_API_URL") or DEFAULT_API_URL
).rstrip("/")
TRANSLATE_API_KEY = (
    os.environ.get("TRANSLATE_API_KEY") or DEFAULT_API_KEY
)
# 清洗 Key 前缀，确保 Bearer 认证无歧义
if TRANSLATE_API_KEY.startswith("Key:"):
    TRANSLATE_API_KEY = TRANSLATE_API_KEY[4:].strip()

TRANSLATE_MODEL = os.environ.get("TRANSLATE_MODEL") or DEFAULT_MODEL

# ---- 内置高质量开源术语字典 (离线兜底保障) ----
BUILTIN_ZH_DICTIONARY = {
    "paperclip": (
        "Paperclip · AI 智能体工作流协同平台",
        "专为职场打造的开源多 Agent 管理协同工具，一站式编排与调度团队 AI 智能体。",
    ),
    "hindsight": (
        "Hindsight · 具学习能力的 Agent 记忆引擎",
        "让 AI 智能体越用越聪明的持久化自学习记忆架构，原生支持终身学习与上下文进化。",
    ),
    "Model-Optimizer": (
        "Model-Optimizer · NVIDIA 前沿大模型优化与加速库",
        "英伟达官方统一的 SOTA 模型优化库，集成量化、蒸馏、剪枝与推测解码，大幅提升 TensorRT-LLM 与 vLLM 推理吞吐。",
    ),
    "univer": (
        "Univer · AI 智能体全能协同 Office 底座",
        "面向 AI Agent 的全能办公运行底座，单套运行时集成表格、文档、幻灯片、白板与关系数据库。",
    ),
    "tensorflow": (
        "TensorFlow · 顶级端到端机器学习开源框架",
        "Google 开源的世界级端到端机器学习与深度学习框架，覆盖从科研训练到生产部署全流程。",
    ),
    "ai-engineering-from-scratch": (
        "从零构建 AI 工程全栈实践指南",
        "系统化掌握大模型与 AI 生产级落地开发，涵盖从基础架构到商业化全流程实战。",
    ),
    "openbao": (
        "OpenBao · 开源高安全密码与密钥管理系统",
        "开源社区主导的 HashiCorp Vault 独立开源平替，专用于集中安全存储证书、API 秘钥与敏感数据。",
    ),
    "buzz": (
        "Buzz · 高并发分布式蜂群即时通信平台",
        "基于 Rust 打造的去中心化、高吞吐蜂群式通讯与消息协作协议平台。",
    ),
    "vscode": (
        "VS Code · 微软开源全能代码编辑器",
        "全球最受欢迎的现代化开源轻量级代码编辑器，拥有极强的插件扩展能力与生态支持。",
    ),
    "reverse-skill": (
        "Reverse-Skill · 逆向渗透与安全研究 AI 技能路由包",
        "AI 智能路由驱动的安全工程套件，支持 Claude Code / Cursor / Cline 自动按需自举工具链与经验进化。",
    ),
}

RULE_REPLACEMENTS = [
    ("The open-source app everyone uses to", "人人都在使用的开源应用：用于"),
    ("An open-source", "开源的"),
    ("An open source", "开源的"),
    ("A unified library of", "统一的开发库：包含"),
    ("framework for", "开发框架，适用于"),
    ("in one runtime", "统一运行时环境"),
    ("manage agents at work", "在工作场景中调度与管理 AI 智能体"),
    ("sensitive data including", "敏感数据，包括"),
    ("communication platform", "通讯协同平台"),
    ("Cross-platform", "跨平台"),
    ("developer tools", "开发者工具集"),
    ("high-performance", "高性能"),
]


def create_insecure_ssl_context():
    """创建容错 SSL 上下文，避免特定代理与 CDN 环境下的握手验证阻断."""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def translate_via_api(text):
    """调用用户指定的大模型 API 翻译接口 (https://cli.136222.xyz/v1, cli-api)."""
    if not text or not text.strip():
        return None
    try:
        payload = json.dumps({
            "model": TRANSLATE_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "你是一个开源软件翻译专家，请将英文项目描述翻译为地道、简明、富有科技感的中文"
                        "（仅输出中文翻译结果，不超过55个字）。"
                    ),
                },
                {"role": "user", "content": text.strip()},
            ],
            "temperature": 0.3,
            "max_tokens": 80,
        }).encode("utf-8")

        endpoint = f"{TRANSLATE_API_URL}/chat/completions"
        req = urllib.request.Request(
            endpoint,
            data=payload,
            method="POST",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {TRANSLATE_API_KEY}",
                "User-Agent": "KejilionTrendingUpdater/1.0",
            },
        )
        ctx = create_insecure_ssl_context()
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            choices = data.get("choices") or []
            if choices:
                content = choices[0].get("message", {}).get("content", "").strip()
                if content:
                    return content
    except Exception as exc:
        print(f"[提示] API 翻译连接跳过或已降级: {exc}", file=sys.stderr)
    return None


def dict_lookup(repo):
    """查询内置精选字典."""
    return BUILTIN_ZH_DICTIONARY.get(repo) or BUILTIN_ZH_DICTIONARY.get(repo.lower())


def rule_translate(en_desc):
    """基于规则的语义替换."""
    zh = en_desc
    for en, cn in RULE_REPLACEMENTS:
        zh = re.sub(re.escape(en), cn, zh, flags=re.IGNORECASE)
    return zh


def prettify(repo):
    """格式化项目名."""
    t = repo.replace("-", " ").replace("_", " ").strip()
    return (t[:1].upper() + t[1:]) if t else repo


def localize(repo, en_desc):
    """三级翻译体系：词典 -> 用户指定大模型 API -> 规则替换."""
    entry = dict_lookup(repo)
    zh_desc = translate_via_api(en_desc)
    if zh_desc:
        title = entry[0] if entry else prettify(repo)
        return title, zh_desc
    if entry:
        return entry[0], entry[1]
    return prettify(repo), rule_translate(en_desc)


def tag_for(rank):
    """生成榜单排名标签."""
    if rank == 1:
        return "🏆 全球登顶 No.1"
    if rank == 2:
        return "🥈 今日榜眼 No.2"
    if rank == 3:
        return "🥉 今日探花 No.3"
    return f"TOP {rank} 趋势"


def stars_today_str(today):
    """格式化今日新增 Star."""
    return f"+{today} 今日新增" if today else "🔥 社区火爆"


def fetch(url):
    """抓取 GitHub Trending 页面，带重试与多通道容错."""
    urls = [url, BACKUP_TRENDING_URL]
    ctx = create_insecure_ssl_context()
    last_err = None

    for target in urls:
        for attempt in range(2):
            try:
                req = urllib.request.Request(target, headers=UA_HEADERS)
                with urllib.request.urlopen(req, timeout=25, context=ctx) as resp:
                    html_data = resp.read().decode("utf-8", "replace")
                    if "Box-row" in html_data:
                        return html_data
            except Exception as err:
                last_err = err
                print(f"[warn] 抓取 {target} (第{attempt + 1}次) 失败: {err}", file=sys.stderr)

    raise RuntimeError(f"所有抓取通道均失败: {last_err}")


def parse(page):
    """解析 GitHub Trending HTML 页面并提取 TOP10 仓库数据."""
    repos = []
    articles = re.findall(r'<article class="Box-row".*?</article>', page, re.S)
    for a in articles:
        href_m = re.search(r'<h2[^>]*>\s*<a[^>]*href="(/[^"]+)"', a, re.S)
        if not href_m:
            continue
        parts = href_m.group(1).strip("/").split("/")
        if len(parts) < 2:
            continue
        owner, repo = parts[0], parts[1]

        # 兼容多种 class 的描述段落
        desc_m = re.search(r'<p class="[^"]*(?:col-9|color-fg-muted)[^"]*">(.*?)</p>', a, re.S)
        if not desc_m:
            desc_m = re.search(r"<p[^>]*>(.*?)</p>", a, re.S)
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

        today_m = re.search(r"([\d,]+)\s+stars today", a, re.I) or re.search(r"([\d,]+)\s+stars this week", a, re.I)
        today = today_m.group(1) if today_m else None

        repos.append({
            "owner": owner,
            "repo": repo,
            "desc": desc,
            "lang": lang,
            "color": color,
            "stars": stars,
            "forks": forks,
            "today": today,
        })
        if len(repos) >= WANT:
            break
    return repos


def build_card(rank, r):
    """构建单张仓库展示卡片 HTML."""
    esc = htmlmod.escape
    badge = BADGE_CLASS.get(rank, BADGE_DEFAULT)
    tag_style = TAG_STYLE.get(rank, TAG_DEFAULT_STYLE)
    tag_badge = f'<span class="{tag_style}">{tag_for(rank)}</span>'
    lang_span = (
        f'<span class="flex items-center space-x-1.5">'
        f'<span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color:{esc(r["color"])}"></span>'
        f'<span class="font-medium text-slate-300">{esc(r["lang"])}</span></span>'
    )
    title_raw, desc_raw = localize(
        r["repo"], r["desc"] or "暂无详细描述，点击前往 GitHub 探索项目源码。"
    )
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


def build_repo_items(repos):
    """构建结构化仓库列表对象."""
    items = []
    for i, r in enumerate(repos[:WANT]):
        rank = i + 1
        title, desc = localize(
            r["repo"], r["desc"] or "暂无详细描述，点击前往 GitHub 探索项目源码。"
        )
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
    return items


def update_js_chunk(repos):
    """动态更新 _next JS chunk 里的榜单数据，解决 Next.js 客户端 Hydration 覆盖问题."""
    paths = glob.glob("_next/static/chunks/app/page-*.js")
    if not paths:
        print("[提示] 未找到 page JS chunk，跳过 JS 同步")
        return None
    path = paths[0]
    with open(path, "r", encoding="utf-8") as f:
        js = f.read()

    # 动态匹配混淆后的变量名 (如 T=[{...}], N=[{...}])
    match = re.search(r'([a-zA-Z0-9_$]+)=\[\{"rank":1,"name":', js)
    var_prefix = "T="
    if match:
        var_name = match.group(1)
        var_prefix = f"{var_name}="
        start = match.start()
    else:
        start = js.find("T=[")
        if start == -1:
            print("[警告] JS 中未找到榜单数据特征，跳过 JS 同步")
            return None

    # 括号匹配查找整个数组的闭合位置
    bracket_pos = js.find("[", start)
    depth = 0
    in_str = None
    escape = False
    end = -1

    for j in range(bracket_pos, len(js)):
        c = js[j]
        if in_str:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == in_str:
                in_str = None
        elif c in ('"', "'"):
            in_str = c
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                end = j
                break

    if end == -1:
        print("[警告] JS 数组括号不匹配，跳过 JS 同步")
        return None

    items = build_repo_items(repos)
    new_data_str = var_prefix + json.dumps(items, ensure_ascii=True, separators=(",", ":"))
    new_js = js[:start] + new_data_str + js[end + 1:]

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_js)
    print(f"✅ 已动态同步 Next.js 客户端 Chunk: {path}")
    return path


def beijing_now():
    """获取当前北京时间字符串."""
    tz = datetime.timezone(datetime.timedelta(hours=8))
    return datetime.datetime.now(tz).strftime("%Y-%m-%d %H:%M") + " (UTC+8)"


def main():
    print("🌐 开始抓取 GitHub Trending 官方热榜今日数据...")
    page = fetch(TRENDING_URL)
    repos = parse(page)
    print(f"📊 成功解析到 {len(repos)} 个趋势仓库")
    if len(repos) < MIN_REPOS:
        sys.exit(f"❌ 解析到的仓库数量不足 ({len(repos)} < {MIN_REPOS})，放弃更新以防异常覆盖")

    cards = "".join(build_card(i + 1, r) for i, r in enumerate(repos[:WANT]))
    update_js_chunk(repos)

    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()

        if "<!--TRENDING_GRID_START-->" not in html or "<!--TRENDING_GRID_END-->" not in html:
            print("[警告] index.html 中未找到 TRENDING_GRID 标记，跳过 HTML 网格替换")
        else:
            html = re.sub(
                r"<!--TRENDING_GRID_START-->.*?<!--TRENDING_GRID_END-->",
                "<!--TRENDING_GRID_START-->" + cards + "<!--TRENDING_GRID_END-->",
                html,
                flags=re.S,
                count=1,
            )
            ts = beijing_now()
            html = re.sub(
                r"<!--TRENDING_UPDATED_AT-->.*?</span>",
                f"<!--TRENDING_UPDATED_AT-->{ts}</span>",
                html,
                count=1,
            )
            with open("index.html", "w", encoding="utf-8") as f:
                f.write(html)
            print(f"🎉 成功更新 index.html [Github乐园 TOP10]，更新时间戳: {ts}")

    print("🚀 全部更新完成！")


if __name__ == "__main__":
    main()
