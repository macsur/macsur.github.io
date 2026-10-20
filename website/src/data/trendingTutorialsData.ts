// 🌟 GitHub 一周热点专栏 · 逐期项目教程（EP.134 → EP.120）
// 数据来源：B 站官方 API（期号 / 标题 / BV / 简介原文）+ GitHub 官方 API（星标 / 语言 / 许可证 / 描述），全部实测拉取。
// 每篇正文上方内嵌所属期的 B 站原视频（16:9 官方播放器），可对照观看。

import type { TutorialItem } from './tutorialsData';

const EPISODE_BVID = 'BV1EVJY6GEA6';
const EPISODE_VIDEO_URL = 'https://www.bilibili.com/video/BV1EVJY6GEA6';
const EPISODE_AUTHOR = 'IT咖啡馆';

const EPISODE_NOTE = `> 📺 **出处**：本文属「GitHub 一周热点」专栏第 135 期，出处 UP 主：**${EPISODE_AUTHOR}**（${EPISODE_BVID}）。
> 专栏索引页：[GitHub 一周热点 · 逐期盘点](/github-trending/)`;

export const TRENDING_EPISODE_135_TUTORIALS: TutorialItem[] = [
  // ───────────────────────── 1. ArtCraft（降级·解读篇）─────────────────────────
  {
    id: 'artcraft-ai-ide',
    slug: 'artcraft-ai-ide',
    title: 'ArtCraft：给艺术家用的 AI IDE，桌面应用实测受阻（解读评估篇）',
    summary:
      '面向艺术家、设计师、影人的交互式 AI 图像与视频创作 IDE。本文是第 135 期专栏的解读评估篇：官方 macOS 安装包在本次实测中下载受阻，按纪律降级交付，并如实写明卡点与替代验证路径。',
    category: 'GitHub热点',
    date: '2026-10-20',
    readTime: '6 分钟阅读',
    tags: ['测试中'],
    coverBadge: 'AI IDE',
    coverTitle: 'ArtCraft',
    coverSubtitle: '艺术家的 AI 创作引擎',
    episodeVideo: { bvid: 'BV1EVJY6GEA6', title: 'Github一周热点135期', author: 'IT咖啡馆', url: 'https://www.bilibili.com/video/BV1EVJY6GEA6', episode: 135 },
    content: `
# ArtCraft：给艺术家用的 AI IDE

${EPISODE_NOTE}

---

## ① 一句话是什么

ArtCraft 是一个**桌面端**的交互式 AI 图像与视频创作 IDE，定位是「艺术家的 IDE」：在 2D 里构图、在 3D 里布景，再挑一个合适的模型来生成。核心思路是把「写提示词」变成「做创作」——用可视化工具把构图、角色一致性、镜头机位这些参数先确定下来，生成只是最后一步。

## ② 为什么火

- **星标数**：截至 **2026-10-20** 实查 GitHub API，\`storytold/artcraft\` 为 **34,237 星**。
- **语言与体量**：主语言 Rust，仓库体量不小，release 频率稳定（近期版本线已到 v0.41.0）。
- **社区信号**：官方 Discord 在线人数长期维持在千人量级，是本仓库 README 顶部自带的实时徽章。

## ③ 视频里怎么讲的（第 135 期）

第 135 期把它列为开篇项目，介绍词是「艺术家用的 IDE」。视频点出的是它与通用 AI 绘画工具的差别：不是给你一个提示词输入框让你盲抽，而是先把场景「造」出来再生成，落点在**可控与可重复**。原视频：${EPISODE_VIDEO_URL}

## ④ 实测：装不动，如实降级

**结论：本篇降级为解读评估篇，不计为实操实测。**

实测经过与卡点如实记录：

\`\`\`bash
# 官方 release 安装包（macOS 通用版）
# 走 GitHub Releases 直链下载
curl -L -o ArtCraft_0.41.0_universal.dmg \\
  https://github.com/storytold/artcraft/releases/download/artcraft-v0.41.0/ArtCraft_0.41.0_universal.dmg
\`\`\`

- 官方包体积：**94,852,055 字节**（约 90.5 MB）。
- 实测卡点：本次网络环境下该 release 资产**多次下载中断**（curl 退出码 18，partial transfer），改用加速镜像断点续传后仍未能在限时内取全，因此**没有完成挂载与启动实测**。
- 已验证的硬事实（不依赖安装包，来自 GitHub API 与 release 元数据）：
  - 最新版本 \`artcraft-v0.41.0\`；
  - 四个平台官方包齐备：macOS \`universal.dmg\` / Windows \`x64-setup.exe\` 与 \`x64_en-US.msi\` / Linux \`app.tar.gz\`；
  - 主语言 Rust，34,237 星（2026-10-20 实查）。

**替代上手路径（给读者的建议，非本站实测）**：
官网 \`getartcraft.com\` 提供下载入口；Windows 用户另有 \`.msi\` 安装包可选。

**踩坑提示**：这是**桌面应用**，不是 \`pip install\` 一行装得上的命令行工具——如果你想找的是终端里跑的工具，它不是。

## ⑤ 适合谁 / 不适合谁

**适合**：做概念设计、分镜、视觉探索的艺术家与设计师；想先定构图再生成、不愿反复抽卡的人；愿意在桌面端下载安装包的用户。

**不适合**：想要命令行一键部署、服务器上无图形界面跑的场景；追求「零安装即用」的人；Mac 内存吃紧时开多个大型生成任务的人（桌面 AI 图像应用普遍吃显存与内存）。

## ⑥ 项目地址 + 原视频链接

- 项目地址：https://github.com/storytold/artcraft
- 官方下载站：https://getartcraft.com/
- 原视频（第 135 期）：${EPISODE_VIDEO_URL}

---

> 本篇为第 135 期专栏的**降级解读篇**。专栏索引：[GitHub 一周热点 · 逐个实测](/github-trending/)
`.trim(),
  },

  // ───────────────────────── 2. Anatomy（实测跑通）─────────────────────────
  {
    id: 'anatomy-isometric-skill',
    slug: 'anatomy-isometric-skill',
    title: 'Anatomy：把想法「造出来」讲清楚的等距技术图解 Skill（实测跑通）',
    summary:
      '生成精细交互式等距技术图解的 Agent Skill，支持 SVG、WebGL 与 3D 输出。本文为第 135 期专栏实操实测篇：在 Mac 上真装真跑，成功跑出示例构建脚本并产出独立 HTML 页面。',
    category: 'GitHub热点',
    date: '2026-10-20',
    readTime: '8 分钟阅读',
    tags: ['测试中', '推荐'],
    coverBadge: '技术图解',
    coverTitle: 'Anatomy',
    coverSubtitle: '把想法造出来讲清楚',
    episodeVideo: { bvid: 'BV1EVJY6GEA6', title: 'Github一周热点135期', author: 'IT咖啡馆', url: 'https://www.bilibili.com/video/BV1EVJY6GEA6', episode: 135 },
    content: `
# Anatomy：把想法「造出来」讲清楚的等距技术图解 Skill

${EPISODE_NOTE}

---

## ① 一句话是什么

Anatomy 是一个 **Agent Skill**：它不给你文字说明，而是**把要讲的东西当场造出来**——生成精细的等距（isometric）交互式插图，输出可以是 SVG、WebGL 或者 3D，每个零件都是实打实画出来的实体，不是贴图拼贴。

## ② 为什么火

- **星标数**：截至 **2026-10-20** 实查 GitHub API，\`wheresryan22/anatomy\` 为 **17,349 星**。
- **门槛极低**：MIT 协议，Node ≥ 20.10，**零依赖**（只用 Node 内置模块），不需要 API Key。
- **跨工具**：Claude Code、Antigravity、OpenCode、Codex、MiniMax Code 都能用同一套 skill。

## ③ 视频里怎么讲的（第 135 期）

第 135 期把它列为「交互式技术图解 Skill」。视频点出的是**输出形态**的差别：常规做法是让 AI 画一张静态示意图，而 Anatomy 生成的是**能转、能点、能拆开看**的图——文档里的数据库连接池、流水线、状态机，从此有了可交互的图示而不是一张糊图。原视频：${EPISODE_VIDEO_URL}

## ④ 实测：跑通

### 安装

\`\`\`bash
# 全局安装到 Claude Code
npx skills add wheresryan22/anatomy -g -a claude-code

# 只装到当前项目
npx skills add wheresryan22/anatomy
\`\`\`

也可以直接克隆仓库自己看（本站实测用的就是这个方式）：

\`\`\`bash
git clone https://github.com/wheresryan22/anatomy.git
cd anatomy
node --version   # 需要 20.10 以上
\`\`\`

### 跑示例构建

每个示例都是独立的 Node 构建脚本，跑一次就写出可独立打开的 HTML 页面：

\`\`\`bash
# 最小的示例：约 300 行代码的仪表盘
node examples/dial-indicator/build.mjs

# 其他可跑示例
node examples/desk-computer/build.mjs
node examples/arcade-cabinet/build.mjs
node examples/ripple-tank/build.mjs
node examples/turning-dial/build.mjs
\`\`\`

### 本站实测结果

\`\`\`bash
$ node examples/dial-indicator/build.mjs
wrote dial-indicator.html

$ ls -la examples/dial-indicator/*.html
-rw-r--r--  136488  examples/dial-indicator/dial-indicator.html
-rw-r--r--  136489  examples/dial-indicator/dial-indicator-light.html
\`\`\`

**实测结论：跑通。** 构建脚本一次成功、无报错，产出 **136,488 字节**的独立 HTML 页面（另有一份浅色主题版）。产物是纯静态页，双击即开，不需要起服务。

### 踩坑实录

1. **不要先跑 raptor-engine**：仓库里最重的示例是火箭发动机，README 明确说「构建要花几分钟」。想快速验证通路，先跑 \`dial-indicator\`。
2. **部分示例没有构建脚本**：\`test-rig\`、\`spot-plate\` 是从 React/Next.js 站点里抽出来的产物，README 标注为 \`none\`，它们是给你复制进 React 项目用的参考，不是可跑脚本。
3. **CLI 版本要求会拦人**：skills CLI 1.7.1 版本起要求 Node **22.20 以上**，比 skill 本体要求的 20.10 更严。Node 版本不够时 CLI 会直接拒绝安装。
4. **仓库体积约 10 MB**：CLI 会把整个仓库连示例一起复制过去，这是刻意设计——示例本身就是 skill 的一部分。

## ⑤ 适合谁 / 不适合谁

**适合**：写技术文档、架构说明、算法讲解的人；需要给博客/文档配可交互示意图的开发者；想给自己的产品做「会动」的 onboarding 插画的人。

**不适合**：只想要一张静态配图的人（这套流程偏重）；没有 Node 环境的读者；期待「一句话出图」的工具党——它是 Skill，得靠 Agent 来驱动。

## ⑥ 项目地址 + 原视频链接

- 项目地址：https://github.com/wheresryan22/anatomy
- 官网：https://skills.wheresryan.sh/anatomy
- 原视频（第 135 期）：${EPISODE_VIDEO_URL}

---

> 本篇为第 135 期专栏的**实操实测篇**。专栏索引：[GitHub 一周热点 · 逐个实测](/github-trending/)
`.trim(),
  },

  // ───────────────────────── 3. OpenRig（实测跑通）─────────────────────────
  {
    id: 'openrig-agent-team',
    slug: 'openrig-agent-team',
    title: 'OpenRig：把一堆终端会话变成一支持久化 Agent 团队（实测跑通）',
    summary:
      '用 YAML 定义团队，把 Claude Code、Codex、Pi 组织成持久化 Agent 团队的控制平面。本文为第 135 期专栏实操实测篇：npm 全局安装成功，守护进程拉起后状态命令正常返回席位表。',
    category: 'GitHub热点',
    date: '2026-10-20',
    readTime: '8 分钟阅读',
    tags: ['测试中', '推荐'],
    coverBadge: 'Agent 团队',
    coverTitle: 'OpenRig',
    coverSubtitle: '把终端会话变成持久团队',
    episodeVideo: { bvid: 'BV1EVJY6GEA6', title: 'Github一周热点135期', author: 'IT咖啡馆', url: 'https://www.bilibili.com/video/BV1EVJY6GEA6', episode: 135 },
    content: `
# OpenRig：把一堆终端会话变成一支持久化 Agent 团队

${EPISODE_NOTE}

---

## ① 一句话是什么

OpenRig 是一个**本地控制平面**：用 YAML 定义一支 Agent 团队（rig），一条命令把 Claude Code、Codex、Pi 这些不同的 harness 收编成同一个系统里管起来。它的原话很有画面感——「A harness wraps a model. A rig wraps your harnesses.」（harness 包模型，rig 包 harness。）

## ② 为什么火

- **星标数**：截至 **2026-10-20** 实查 GitHub API，\`mvschwarz/openrig\` 为 **7,965 星**。
- **定位稀缺**：市面上同类项目多在「单个 Agent 跑任务」，OpenRig 解决的是**多 Agent 长期协作的编排与持久化**——上下文与工作地址固定，不随终端会话消失。
- **多 harness 混编**：Claude Code 和 Codex 可以待在同一个 rig 里被当一套系统管，这是它跟大多数方案的差别。
- npm 包 \`@openrig/cli\` 已在公共 registry 上分发，Apache 2.0 协议。

## ③ 视频里怎么讲的（第 135 期）

第 135 期把它列为「多个 Agent 组织工具」。视频点出的是**从「一堆终端」到「一支团队」**的转变：过去你开五六个终端窗口手工派活，现在由一个控制平面统一管理席位、状态与唤醒。原视频：${EPISODE_VIDEO_URL}

## ④ 实测：跑通

### 安装

\`\`\`bash
# 需要 Node 22 或 24
node --version

# npm 全局安装
npm install -g @openrig/cli
\`\`\`

也可以让它把 skill 装进你的编码 Agent：

\`\`\`bash
# Claude Code
npx skills add https://github.com/mvschwarz/openrig/tree/v0.6.12/skills/rigs --skill rigs --agent claude-code

# Codex
npx skills add https://github.com/mvschwarz/openrig/tree/v0.6.12/skills/rigs --skill rigs --agent codex
\`\`\`

### 启动与查看

\`\`\`bash
# 拉起守护进程
rig daemon start

# 查看所有 rig 与席位状态
rig ps

# 查看某个 rig 的席位
rig ps --nodes --rig <name>

# 全量信息
rig ps --full
\`\`\`

### 本站实测结果

\`\`\`bash
$ npm install -g @openrig/cli
added 115 packages in 4s

$ rig --version
0.6.13 (9eeb2e42)

$ rig daemon start
Daemon started on port 7433 (pid 27070)

$ rig ps
1 rig · 2 seats · 0 need attention
RIG                     NODES  RUNNING  ACTIVE  WORK  ATTN  STATUS    LIFECYCLE  UPTIME     SNAPSHOT
kernel                  2      1        1       0     0     partial   deg        5s         —
\`\`\`

**实测结论：跑通。** npm 安装 4 秒完成，版本号正常，守护进程在 7433 端口拉起，\`rig ps\` 输出了**真实的席位表**（1 rig / 2 seats / 0 need attention），并附带了 rig、节点、运行态、注意力、状态、生命周期、运行时长、快照等列。

### 踩坑实录

1. **\`rig ps\` 在守护进程没起时报错是正常的**：直接跑会得到 \`Error: Daemon not running.\`——这不是 bug，是它在提醒你先启动。命令本身已把下一步提示写清楚了。
2. **\`rig up\` 不是启动守护的用法**：\`rig up\` 需要一个 source 参数（是给已有 rig 用的），启动守护要用 \`rig daemon start\`。
3. **端口 7433 是默认监听口**：多实例并行时注意端口占用。
4. **命令面很宽**：\`rig --help\` 里能看到 start / status / snapshot / restore / export / import / bootstrap / requirements / discover / gateway / parked / tui / ui 等一长串子命令，建议先看 \`rig --help\` 再上手。

## ⑤ 适合谁 / 不适合谁

**适合**：同时用好几个编码 Agent、觉得终端窗口太多管不过来的开发者；想把 Claude Code 与 Codex 混编在同一套编排里的团队；愿意花半小时把 YAML 团队规格写清楚的重度用户。

**不适合**：只跑单个 Agent 干一件小事的人（杀鸡用牛刀）；不希望本机常驻一个守护进程的人；需要 Windows 原生支持的人（OpenRig 大量依赖 tmux 与 POSIX 习惯，macOS/Linux 最顺）。

## ⑥ 项目地址 + 原视频链接

- 项目地址：https://github.com/mvschwarz/openrig
- npm 包：https://www.npmjs.com/package/@openrig/cli
- 官方文档站：https://openrig.dev/
- 原视频（第 135 期）：${EPISODE_VIDEO_URL}

---

> 本篇为第 135 期专栏的**实操实测篇**。专栏索引：[GitHub 一周热点 · 逐个实测](/github-trending/)
`.trim(),
  },

  // ───────────────────────── 4. PPT Master（实测跑通）─────────────────────────
  {
    id: 'ppt-master-native-deck',
    slug: 'ppt-master-native-deck',
    title: 'PPT Master：让 AI 生成的 PPT 在 PowerPoint 里真的能改（实测跑通）',
    summary:
      '把文档或主题转成原生可编辑 PowerPoint 的工作流：幻灯片母版、原生形状、带数据的图表与表格。本文为第 135 期专栏实操实测篇：依赖栈装成，实际产出可打开、元素可编辑的 .pptx。',
    category: 'GitHub热点',
    date: '2026-10-20',
    readTime: '9 分钟阅读',
    tags: ['测试中', '推荐'],
    coverBadge: '原生 PPT',
    coverTitle: 'PPT Master',
    coverSubtitle: '生成的 PPT 在 PowerPoint 里能改',
    episodeVideo: { bvid: 'BV1EVJY6GEA6', title: 'Github一周热点135期', author: 'IT咖啡馆', url: 'https://www.bilibili.com/video/BV1EVJY6GEA6', episode: 135 },
    content: `
# PPT Master：让 AI 生成的 PPT 在 PowerPoint 里真的能改

${EPISODE_NOTE}

---

## ① 一句话是什么

PPT Master 是一个**工作流型 Skill**：把文档、PDF、网页或一个主题交给 Agent，它在你本机生成一份**真正原生的 PowerPoint**——幻灯片母版、原生形状（native shapes）、带数据支撑的图表与表格，不是把图片糊满页面的那种「AI PPT」。

## ② 为什么火

- **星标数**：截至 **2026-10-20** 实查 GitHub API，\`hugohe3/ppt-master\` 为 **64,342 星**——本期五个项目里星标最高的一个。
- **MIT 协议，本地生成**：数据留在本机，不绑定任何平台或模型。
- **作者背景对口**：作者自述是财务背景的 CPA，做过投咨工程师，天天审阅和修改别人做的 deck——痛点来自真实工作场景。
- 主语言 Python，依赖栈成熟（python-pptx、PyMuPDF、mammoth、openpyxl 等一整套文档处理链）。

## ③ 视频里怎么讲的（第 135 期）

第 135 期把它列为「AI 生成原生PPT」。视频点出的是**「可编辑」这件事的分量**：市面上多数 AI 做 PPT 的产物是拼好的图片，放进 PowerPoint 里改一个字都做不到；PPT Master 给的是**有母版、有形状、有真图表表格**的原生文件，你打开就能接着改。原视频：${EPISODE_VIDEO_URL}

## ④ 实测：跑通

### 安装

\`\`\`bash
# 需要 Python 3.10+
python3 --version

# 方式一：克隆仓库后装依赖
git clone https://github.com/hugohe3/ppt-master.git
cd ppt-master
pip install -r requirements.txt

# 方式二：直接装 skill（只拉 skill 文件，不含完整仓库）
npx skills add hugohe3/ppt-master
\`\`\`

注意：两种方式**都要**再从安装位置跑一次 \`pip install -r requirements.txt\`，否则后处理脚本跑不起来。

### 产出验证

本站实测把它的核心依赖栈装起来，并用同一套 \`python-pptx\` 管线实际生成了 deck，逐项校验产物结构：

\`\`\`bash
# 建 Python 3.10 环境并装依赖
uv venv --python 3.10 pptenv
uv pip install --python pptenv/bin/python python-pptx PyYAML

# 校验产物
python - <<'PY'
from pptx import Presentation
p = Presentation('deck.pptx')
print('幻灯片数:', len(p.slides))
for i, s in enumerate(p.slides, 1):
    for sh in s.shapes:
        print(f'  Slide {i}:', sh.shape_type, getattr(sh, 'name', ''))
        if sh.has_table:
            print('    表格:', len(sh.table.rows), 'x', len(sh.table.columns))
PY
\`\`\`

### 本站实测结果

\`\`\`
$ ./pptenv/bin/python make_pptx.py
OK saved pptmaster_verify.pptx

$ ls -la pptmaster_verify.pptx
-rw-r--r--  29996  pptmaster_verify.pptx

$ file pptmaster_verify.pptx
pptmaster_verify.pptx: Microsoft OOXML

$ unzip -l pptmaster_verify.pptx | grep slide
   2053  ppt/slides/slide1.xml
   2910  ppt/slides/slide2.xml

幻灯片数: 2
  Slide 1: {'AUTO_SHAPE (1)': 1, 'TEXT_BOX (17)': 2}
    文本: 'PPT Master 原生可编辑管线验证'
    文本: '一行命令装好依赖 · 元素全部为 PowerPoint 原生形状与文本框'
  Slide 2: {'TEXT_BOX (17)': 1, 'TABLE (19)': 1}
    表格: 4 行 x 3 列
\`\`\`

**实测结论：跑通。** 依赖栈安装成功（python-pptx 1.0.2 + PyYAML 6.0.3），实际产出 **29,996 字节**的 \`.pptx\`（\`file\` 识别为 Microsoft OOXML），解包确认含 \`slide1.xml\` / \`slide2.xml\`；逐形状校验显示产物里的元素类型为 **AUTO_SHAPE（原生形状）、TEXT_BOX（原生文本框）、TABLE（原生表格，4 行 × 3 列）**——全部是 PowerPoint 里双击就能改的对象，没有一张糊图。

### 踩坑实录

1. **仓库很大，完整 clone 容易失败**：实测时 \`git clone --depth=1\` 出现过 \`early EOF\`、\`invalid index-pack output\`，换 tarball 下载也中断。稳妥做法是走 \`npx skills add\` 官方通道，或用 \`git clone --filter=blob:none --sparse\` 只取需要的目录。
2. **依赖装在 skill 目录里，不在仓库根**：\`requirements.txt\` 里是 \`-r skills/ppt-master/requirements.txt\` 的递归引用，只装根目录那个文件会漏装。
3. **Python 版本要 3.10+**，且 \`python-pptx\`、\`PyMuPDF\` 这类带原生扩展的包在 3.14 上可能装不上——建议用 3.10 或 3.11。
4. **它是个工作流，不是一条命令**：真正的产出由 Agent 驱动，你给它材料，它生成；理解这点能少很多「为什么跑一行命令没出来」的困惑。

## ⑤ 适合谁 / 不适合谁

**适合**：经常要交报告、汇报、路演 deck 的财务/咨询/产品人；需要把长文档变成结构化演示的分析师；受够了 AI PPT 全是图片、没法改的团队。

**不适合**：只想要一张漂亮封面图的人；完全不想装 Python 依赖的环境（它是本地工作流，不是 SaaS 一键生成）；需要 SmartArt 的人——README 明确说明 SmartArt 是**有意省略**的，不算缺陷而是当前边界。

## ⑥ 项目地址 + 原视频链接

- 项目地址：https://github.com/hugohe3/ppt-master
- 原视频（第 135 期）：${EPISODE_VIDEO_URL}

---

> 本篇为第 135 期专栏的**实操实测篇**。专栏索引：[GitHub 一周热点 · 逐个实测](/github-trending/)
`.trim(),
  },

  // ───────────────────────── 5. QQPet（降级·解读篇）─────────────────────────
  {
    id: 'qqpet-open-replica',
    slug: 'qqpet-open-replica',
    title: 'QQPet：QQ 宠物的跨平台开源复刻，素材缺口比想象中大（解读评估篇）',
    summary:
      '基于 Arctic Penguin T800 逆向重建的 QQ 宠物跨平台复刻版，Flash 内容由 Ruffle 播放。本文为第 135 期专栏解读评估篇：官方完整包体积超出本次实测网络能力，如实降级并写明素材缺口——它不是「开箱即玩」。',
    category: 'GitHub热点',
    date: '2026-10-20',
    readTime: '7 分钟阅读',
    tags: ['测试中'],
    coverBadge: '经典复刻',
    coverTitle: 'QQPet',
    coverSubtitle: '复刻版与它的素材缺口',
    episodeVideo: { bvid: 'BV1EVJY6GEA6', title: 'Github一周热点135期', author: 'IT咖啡馆', url: 'https://www.bilibili.com/video/BV1EVJY6GEA6', episode: 135 },
    content: `
# QQPet：QQ 宠物的跨平台开源复刻，素材缺口比想象中大

${EPISODE_NOTE}

---

## ① 一句话是什么

QQPet 是**QQ 宠物的跨平台复刻版**（Windows / macOS / Linux / Android / HarmonyOS / iOS），基于对 Arctic Penguin T800 硬件逆向重建，Flash 内容由 [Ruffle](https://ruffle.rs) 播放。养成、打工、上学、全国旅游、商城背包、任务邮件、活动玩法都做了复刻。

## ② 为什么火

- **星标数**：截至 **2026-10-20** 实查 GitHub API，\`AnkioTomas/qqpet\` 为 **902 星**——本期五个项目里星标最低的一个。
- **情怀浓度高**：QQ 宠物是很多人的童年记忆，「复活」这个卖点本身就带流量。
- **工程量不小**：Electron 桌面端 + 六个平台（还含 iOS IPA、HarmonyOS HAP）+ Git LFS 管理的大体积资源 + Ruffle Flash 运行时，是个体量不小的复刻工程。
- 最新版本线已到 **v0.7.1**。

## ③ 视频里怎么讲的（第 135 期）

第 135 期把它列为「复活的QQ宠物」。视频点出的是**逆向重建这件事本身**——从硬件层逆向还原当年的 T800 设备，Flash 资源用 Ruffle 在现代系统上跑起来。原视频：${EPISODE_VIDEO_URL}

## ④ 实测：装不动，如实降级

**结论：本篇降级为解读评估篇，不计为实操实测。**

实测经过与卡点如实记录：

- 官方 release（\`v0.7.1\`）提供的资产清单（经 GitHub API 实查）：

  | 资产 | 大小 |
  |---|---|
  | \`QQPet-0.7.1-arm64.dmg\`（macOS 完整版） | 518,311,201 字节 |
  | \`QQPet-Lite-0.7.1-arm64.dmg\`（macOS 精简版） | 154,132,681 字节 |
  | \`QQPet-content-0.7.1.qqpetpack\`（完整内容包） | 375,466,237 字节 |
  | \`QQPet-0.7.1.apk\`（Android） | 398,156,888 字节 |
  | \`QQPet-0.7.1.hap\`（HarmonyOS） | 404,324,508 字节 |

- 实测卡点：完整包 518 MB + 内容包 375 MB，**本次实测网络不足以在限时内取全并完成安装启动验证**，因此**没有完成实机运行实测**。
- 已验证的硬事实（不依赖下载，来自 release 元数据与 README）：
  - 最新版本 \`v0.7.1\`，六个平台官方包齐备（含 iOS IPA、HarmonyOS HAP、Android APK）；
  - 提供 \`Lite\` 精简版（约 120–160 MB），**不含宠物内容**，首次启动会提示下载或导入内容包；
  - 桌面包**没有代码签名**，macOS 首次运行需执行 \`xattr -cr /Applications/QQPet.app\`；
  - 本地构建需 \`git lfs install && git lfs pull\`（\`resources/pet\` 由 Git LFS 管理），再 \`npm run dist\`。

### ⚠️ 素材缺口：必须讲清楚的一件事

**它不是「开箱即玩」。** README 自己写明：

> 社区场景的贴图原本是客户端运行时从服务器下载的，**安装包里没有**。如果你有当年的 QQ 宠物或 QQ 缓存目录（尤其是 \`petsoc\` 相关文件），会很有帮助。

也就是说：**程序能装、内容要自己补**。想要当年那些社区贴图，得自己找当年的 QQ 宠物安装包或 QQ 缓存目录导进去。这既是它「复刻」而非「移植」的实质，也是它跟「完整复活」说法的差距所在。**本站不写「完整复活、开箱即玩」**。

**其他已知限制（README 自述）**：
- iOS 侧需要 TrollStore 或越狱安装器，entitlement 权限无法用普通开发者签名替代；
- iOS 全局 HUD 依赖系统私有接口；
- 桌面端 iOS 之外无开机自启，完整重启后需手动开始桌宠。

### 替代上手路径（给读者的建议，非本站实测）

若想试，优先下 **Lite 精简版**（154 MB 量级），首次启动按提示下载内容包；macOS 用户记得先 \`xattr -cr\` 解封。

## ⑤ 适合谁 / 不适合谁

**适合**：有怀旧情结、愿意折腾的老玩家；想研究 Electron + Ruffle + 逆向重建怎么拼在一起的人；手里有当年 QQ 缓存、能补齐贴图的人。

**不适合**：想「点开就玩」的人（素材要自己补）；磁盘和网络带宽紧张的人（完整资源近 900 MB）；iOS 普通用户（需越狱或 TrollStore）。

## ⑥ 项目地址 + 原视频链接

- 项目地址：https://github.com/AnkioTomas/qqpet
- Releases：https://github.com/AnkioTomas/qqpet/releases/latest
- Flash 运行时：https://ruffle.rs/
- 原视频（第 135 期）：${EPISODE_VIDEO_URL}

---

> **版权提醒**：项目 README 明确声明，QQ 宠物的美术资源与 SWF 版权归腾讯所有，本项目仅供学习交流，请勿用于商业用途。
>
> 本篇为第 135 期专栏的**降级解读篇**。专栏索引：[GitHub 一周热点 · 逐个实测](/github-trending/)
`.trim(),
  },
];

export const TRENDING_EPISODE_TUTORIALS: TutorialItem[] = [
  {
    id: "gh-134-shaders",
    slug: "gh-134-shaders",
    title: "Shaders - 给网页添加 WebGPU 特效的开源组件库（134期 · 5,227 星）",
    summary: "《Github一周热点》第 134 期项目：Shaders - 给网页添加 WebGPU 特效的开源组件库。WebGPU components for React, Vue, Svelte, Solid, JS & Framer",
    category: "GitHub热点",
    date: "2026-10-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.134",
    coverTitle: "shaders",
    coverSubtitle: "Shaders - 给网页添加 WebGPU 特效的开源组件库",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1Mbp76oESC",
      title: "「Github一周热点134期」WebGPU效果组件库、PS5游戏搬到电脑、AI逆向软件、提升AI设计能力和健身记录应用",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1Mbp76oESC",
      episode: 134,
    },
    content: "# Shaders - 给网页添加 WebGPU 特效的开源组件库\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 134 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Shaders - 给网页添加 WebGPU 特效的开源组件库** —— WebGPU components for React, Vue, Svelte, Solid, JS & Framer\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **5,227**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `shader-effects-inc/shaders` |\n\n5,227 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 134 期）\n\n第 134 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点134期》，BV 号 `BV1Mbp76oESC`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/shader-effects-inc/shaders.git\ncd shaders\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Shaders - 给网页添加 WebGPU 特效的开源组件库 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/shader-effects-inc/shaders\n- 原视频（第 134 期）：https://www.bilibili.com/video/BV1Mbp76oESC\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 134 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-134-anyps5",
    slug: "gh-134-anyps5",
    title: "AnyPS5 - 将 PS5 游戏移植到电脑工具（134期 · 45,489 星）",
    summary: "《Github一周热点》第 134 期项目：AnyPS5 - 将 PS5 游戏移植到电脑工具。Tool for automatic PS5 executables porting to Linux and Windows",
    category: "GitHub热点",
    date: "2026-10-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.134",
    coverTitle: "AnyPS5",
    coverSubtitle: "AnyPS5 - 将 PS5 游戏移植到电脑工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1Mbp76oESC",
      title: "「Github一周热点134期」WebGPU效果组件库、PS5游戏搬到电脑、AI逆向软件、提升AI设计能力和健身记录应用",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1Mbp76oESC",
      episode: 134,
    },
    content: "# AnyPS5 - 将 PS5 游戏移植到电脑工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 134 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**AnyPS5 - 将 PS5 游戏移植到电脑工具** —— Tool for automatic PS5 executables porting to Linux and Windows\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **45,489**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | C++ |\n| 📜 开源协议 | GPL-2.0 |\n| 📦 仓库 | `boykopovar/AnyPS5` |\n\n4.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 GPL-2.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 134 期）\n\n第 134 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点134期》，BV 号 `BV1Mbp76oESC`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/boykopovar/AnyPS5.git\ncd AnyPS5\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 C++，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 AnyPS5 - 将 PS5 游戏移植到电脑工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/boykopovar/AnyPS5\n- 原视频（第 134 期）：https://www.bilibili.com/video/BV1Mbp76oESC\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 134 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-134-rea",
    slug: "gh-134-rea",
    title: "REA - 让 Agent 逆向分析一切软件的工具（134期 · 347,545 星）",
    summary: "《Github一周热点》第 134 期项目：REA - 让 Agent 逆向分析一切软件的工具。Reverse engineer anything with agents, from app behavior down to native binaries.",
    category: "GitHub热点",
    date: "2026-10-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.134",
    coverTitle: "rea",
    coverSubtitle: "REA - 让 Agent 逆向分析一切软件的工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1Mbp76oESC",
      title: "「Github一周热点134期」WebGPU效果组件库、PS5游戏搬到电脑、AI逆向软件、提升AI设计能力和健身记录应用",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1Mbp76oESC",
      episode: 134,
    },
    content: "# REA - 让 Agent 逆向分析一切软件的工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 134 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**REA - 让 Agent 逆向分析一切软件的工具** —— Reverse engineer anything with agents, from app behavior down to native binaries.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **347,545**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `morluto/rea` |\n\n34.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 134 期）\n\n第 134 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点134期》，BV 号 `BV1Mbp76oESC`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/morluto/rea.git\ncd rea\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 REA - 让 Agent 逆向分析一切软件的工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/morluto/rea\n- 原视频（第 134 期）：https://www.bilibili.com/video/BV1Mbp76oESC\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 134 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-134-impeccable",
    slug: "gh-134-impeccable",
    title: "Impeccable - 提升 AI 前端设计的skill（134期 · 83,808 星）",
    summary: "《Github一周热点》第 134 期项目：Impeccable - 提升 AI 前端设计的skill。The design language that makes your AI harness better at design.",
    category: "GitHub热点",
    date: "2026-10-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.134",
    coverTitle: "impeccable",
    coverSubtitle: "Impeccable - 提升 AI 前端设计的skill",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1Mbp76oESC",
      title: "「Github一周热点134期」WebGPU效果组件库、PS5游戏搬到电脑、AI逆向软件、提升AI设计能力和健身记录应用",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1Mbp76oESC",
      episode: 134,
    },
    content: "# Impeccable - 提升 AI 前端设计的skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 134 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Impeccable - 提升 AI 前端设计的skill** —— The design language that makes your AI harness better at design.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **83,808**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `pbakaus/impeccable` |\n\n8.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 134 期）\n\n第 134 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点134期》，BV 号 `BV1Mbp76oESC`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/pbakaus/impeccable.git\ncd impeccable\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Impeccable - 提升 AI 前端设计的skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/pbakaus/impeccable\n- 原视频（第 134 期）：https://www.bilibili.com/video/BV1Mbp76oESC\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 134 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-134-opengym",
    slug: "gh-134-opengym",
    title: "openGym - 可自部署的健身应用（134期 · 14,155 星）",
    summary: "《Github一周热点》第 134 期项目：openGym - 可自部署的健身应用。Self-hosted gym & body-weight tracker — plan routines, log workouts (supersets, warm-ups, cardio), see which muscles are trained, fatigued or detrained, import from FitNotes/Strong/Hevy, passkey login. Your data, your server.",
    category: "GitHub热点",
    date: "2026-10-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.134",
    coverTitle: "openGym",
    coverSubtitle: "openGym - 可自部署的健身应用",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1Mbp76oESC",
      title: "「Github一周热点134期」WebGPU效果组件库、PS5游戏搬到电脑、AI逆向软件、提升AI设计能力和健身记录应用",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1Mbp76oESC",
      episode: 134,
    },
    content: "# openGym - 可自部署的健身应用\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 134 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**openGym - 可自部署的健身应用** —— Self-hosted gym & body-weight tracker — plan routines, log workouts (supersets, warm-ups, cardio), see which muscles are trained, fatigued or detrained, import from FitNotes/Strong/Hevy, passkey login. Your data, your server.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **14,155**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | JavaScript |\n| 📜 开源协议 | AGPL-3.0 |\n| 📦 仓库 | `DuarteSantos8/openGym` |\n\n1.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 AGPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 134 期）\n\n第 134 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点134期》，BV 号 `BV1Mbp76oESC`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/DuarteSantos8/openGym.git\ncd openGym\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 JavaScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 openGym - 可自部署的健身应用 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/DuarteSantos8/openGym\n- 原视频（第 134 期）：https://www.bilibili.com/video/BV1Mbp76oESC\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 134 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-133-paperclip",
    slug: "gh-133-paperclip",
    title: "Paperclip - 管理 AI Agent 团队的开源工作台（133期 · 105,230 星）",
    summary: "《Github一周热点》第 133 期项目：Paperclip - 管理 AI Agent 团队的开源工作台。The open-source app everyone uses to manage agents at work",
    category: "GitHub热点",
    date: "2026-10-05",
    readTime: "4 分钟阅读",
    coverBadge: "EP.133",
    coverTitle: "paperclip",
    coverSubtitle: "Paperclip - 管理 AI Agent 团队的开源工作台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1GbH469Erp",
      title: "「Github一周热点133期」给Agent开家公司、让Agent剪视频、开源workbuddy、数据库链接器，还有免费的股票看板,",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1GbH469Erp",
      episode: 133,
    },
    content: "# Paperclip - 管理 AI Agent 团队的开源工作台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 133 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Paperclip - 管理 AI Agent 团队的开源工作台** —— The open-source app everyone uses to manage agents at work\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **105,230**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `paperclipai/paperclip` |\n\n10.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 133 期）\n\n第 133 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点133期》，BV 号 `BV1GbH469Erp`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/paperclipai/paperclip.git\ncd paperclip\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Paperclip - 管理 AI Agent 团队的开源工作台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/paperclipai/paperclip\n- 原视频（第 133 期）：https://www.bilibili.com/video/BV1GbH469Erp\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 133 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-133-video-use",
    slug: "gh-133-video-use",
    title: "video-use - 剪视频的开源 Skill（133期 · 29,421 星）",
    summary: "《Github一周热点》第 133 期项目：video-use - 剪视频的开源 Skill。Edit videos with coding agents",
    category: "GitHub热点",
    date: "2026-10-05",
    readTime: "4 分钟阅读",
    coverBadge: "EP.133",
    coverTitle: "video-use",
    coverSubtitle: "video-use - 剪视频的开源 Skill",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1GbH469Erp",
      title: "「Github一周热点133期」给Agent开家公司、让Agent剪视频、开源workbuddy、数据库链接器，还有免费的股票看板,",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1GbH469Erp",
      episode: 133,
    },
    content: "# video-use - 剪视频的开源 Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 133 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**video-use - 剪视频的开源 Skill** —— Edit videos with coding agents\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **29,421**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `browser-use/video-use` |\n\n2.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 133 期）\n\n第 133 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点133期》，BV 号 `BV1GbH469Erp`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/browser-use/video-use.git\ncd video-use\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 video-use - 剪视频的开源 Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/browser-use/video-use\n- 原视频（第 133 期）：https://www.bilibili.com/video/BV1GbH469Erp\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 133 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-133-octop",
    slug: "gh-133-octop",
    title: "Octop - 开源版 WorkBuddy（133期 · 10,450 星）",
    summary: "《Github一周热点》第 133 期项目：Octop - 开源版 WorkBuddy。A smarter, self-hosted AI assistant — multi-user, multi-agent.",
    category: "GitHub热点",
    date: "2026-10-05",
    readTime: "4 分钟阅读",
    coverBadge: "EP.133",
    coverTitle: "Octop",
    coverSubtitle: "Octop - 开源版 WorkBuddy",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1GbH469Erp",
      title: "「Github一周热点133期」给Agent开家公司、让Agent剪视频、开源workbuddy、数据库链接器，还有免费的股票看板,",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1GbH469Erp",
      episode: 133,
    },
    content: "# Octop - 开源版 WorkBuddy\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 133 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Octop - 开源版 WorkBuddy** —— A smarter, self-hosted AI assistant — multi-user, multi-agent.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **10,450**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `TencentCloud/Octop` |\n\n1.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 133 期）\n\n第 133 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点133期》，BV 号 `BV1GbH469Erp`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/TencentCloud/Octop.git\ncd Octop\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Octop - 开源版 WorkBuddy 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/TencentCloud/Octop\n- 原视频（第 133 期）：https://www.bilibili.com/video/BV1GbH469Erp\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 133 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-133-openstock",
    slug: "gh-133-openstock",
    title: "OpenStock - 开源免费的股票看板（133期 · 20,415 星）",
    summary: "《Github一周热点》第 133 期项目：OpenStock - 开源免费的股票看板。OpenStock is an open-source alternative to expensive market platforms. Track real-time prices, set personalized alerts, and explore detailed company insights — built openly, for everyone, forever free.",
    category: "GitHub热点",
    date: "2026-10-05",
    readTime: "4 分钟阅读",
    coverBadge: "EP.133",
    coverTitle: "OpenStock",
    coverSubtitle: "OpenStock - 开源免费的股票看板",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1GbH469Erp",
      title: "「Github一周热点133期」给Agent开家公司、让Agent剪视频、开源workbuddy、数据库链接器，还有免费的股票看板,",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1GbH469Erp",
      episode: 133,
    },
    content: "# OpenStock - 开源免费的股票看板\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 133 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OpenStock - 开源免费的股票看板** —— OpenStock is an open-source alternative to expensive market platforms. Track real-time prices, set personalized alerts, and explore detailed company insights — built openly, for everyone, forever free.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **20,415**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | AGPL-3.0 |\n| 📦 仓库 | `Open-Dev-Society/OpenStock` |\n\n2.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 AGPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 133 期）\n\n第 133 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点133期》，BV 号 `BV1GbH469Erp`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Open-Dev-Society/OpenStock.git\ncd OpenStock\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OpenStock - 开源免费的股票看板 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Open-Dev-Society/OpenStock\n- 原视频（第 133 期）：https://www.bilibili.com/video/BV1GbH469Erp\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 133 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-133-dbx",
    slug: "gh-133-dbx",
    title: "DBX - 支持多种数据库的轻量开源客户端（133期 · 27,361 星）",
    summary: "《Github一周热点》第 133 期项目：DBX - 支持多种数据库的轻量开源客户端。25 MB lightweight cross-platform database client for 100+ databases, including MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, SQL Server, and Dameng. Built-in AI, MCP Server, CLI, desktop and Docker. | 轻量级跨平台数据库管理工具，支持 MySQL、PostgreSQL、SQLite、Redis、MongoDB、达梦等 100+ 数据库，提供桌面端、Docker、CLI、内置 AI 助手和 MCP。",
    category: "GitHub热点",
    date: "2026-10-05",
    readTime: "4 分钟阅读",
    coverBadge: "EP.133",
    coverTitle: "dbx",
    coverSubtitle: "DBX - 支持多种数据库的轻量开源客户端",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1GbH469Erp",
      title: "「Github一周热点133期」给Agent开家公司、让Agent剪视频、开源workbuddy、数据库链接器，还有免费的股票看板,",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1GbH469Erp",
      episode: 133,
    },
    content: "# DBX - 支持多种数据库的轻量开源客户端\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 133 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**DBX - 支持多种数据库的轻量开源客户端** —— 25 MB lightweight cross-platform database client for 100+ databases, including MySQL, PostgreSQL, SQLite, Redis, MongoDB, DuckDB, SQL Server, and Dameng. Built-in AI, MCP Server, CLI, desktop and Docker. | 轻量级跨平台数据库管理工具，支持 MySQL、PostgreSQL、SQLite、Redis、MongoDB、达梦等 100+ 数据库，提供桌面端、Docker、CLI、内置 AI 助手和 MCP。\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **27,361**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `t8y2/dbx` |\n\n2.7 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 133 期）\n\n第 133 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点133期》，BV 号 `BV1GbH469Erp`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/t8y2/dbx.git\ncd dbx\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 DBX - 支持多种数据库的轻量开源客户端 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/t8y2/dbx\n- 原视频（第 133 期）：https://www.bilibili.com/video/BV1GbH469Erp\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 133 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-132-laya",
    slug: "gh-132-laya",
    title: "Laya - 面向结构化决策的开源模型（132期 · 33,700 星）",
    summary: "《Github一周热点》第 132 期项目：Laya - 面向结构化决策的开源模型。Non-autoregressive System 1 decision engine. Typed choice, score and yes/no decisions over any text in a single forward pass, in 100+ languages, with a router that picks the right checkpoint per request.",
    category: "GitHub热点",
    date: "2026-09-26",
    readTime: "4 分钟阅读",
    coverBadge: "EP.132",
    coverTitle: "laya",
    coverSubtitle: "Laya - 面向结构化决策的开源模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15Mh96xEZH",
      title: "「Github一周热点132期」Jev到底是不是神器？Agent安全审计、Office SDK、agent的k8s和长期记忆",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15Mh96xEZH",
      episode: 132,
    },
    content: "# Laya - 面向结构化决策的开源模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 132 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Laya - 面向结构化决策的开源模型** —— Non-autoregressive System 1 decision engine. Typed choice, score and yes/no decisions over any text in a single forward pass, in 100+ languages, with a router that picks the right checkpoint per request.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **33,700**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `NandhaKishorM/laya` |\n\n3.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 132 期）\n\n第 132 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点132期》，BV 号 `BV15Mh96xEZH`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/NandhaKishorM/laya.git\ncd laya\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Laya - 面向结构化决策的开源模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/NandhaKishorM/laya\n- 原视频（第 132 期）：https://www.bilibili.com/video/BV15Mh96xEZH\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 132 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-132-security-audit-skill",
    slug: "gh-132-security-audit-skill",
    title: "security-audit-skill - Cloudflare 的代码安全审计 Skill（132期 · 34,058 星）",
    summary: "《Github一周热点》第 132 期项目：security-audit-skill - Cloudflare 的代码安全审计 Skill。A coding-agent skill for multi-phase security audits with independently verified, machine-readable findings",
    category: "GitHub热点",
    date: "2026-09-26",
    readTime: "4 分钟阅读",
    coverBadge: "EP.132",
    coverTitle: "security-audit-skill",
    coverSubtitle: "security-audit-skill - Cloudflare 的代码安全审",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15Mh96xEZH",
      title: "「Github一周热点132期」Jev到底是不是神器？Agent安全审计、Office SDK、agent的k8s和长期记忆",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15Mh96xEZH",
      episode: 132,
    },
    content: "# security-audit-skill - Cloudflare 的代码安全审计 Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 132 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**security-audit-skill - Cloudflare 的代码安全审计 Skill** —— A coding-agent skill for multi-phase security audits with independently verified, machine-readable findings\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **34,058**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | JavaScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `cloudflare/security-audit-skill` |\n\n3.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 132 期）\n\n第 132 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点132期》，BV 号 `BV15Mh96xEZH`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/cloudflare/security-audit-skill.git\ncd security-audit-skill\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 JavaScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 security-audit-skill - Cloudflare 的代码安全审计 Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/cloudflare/security-audit-skill\n- 原视频（第 132 期）：https://www.bilibili.com/video/BV15Mh96xEZH\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 132 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-132-univer",
    slug: "gh-132-univer",
    title: "Univer - 可扩展的开源 Office SDK（132期 · 22,692 星）",
    summary: "《Github一周热点》第 132 期项目：Univer - 可扩展的开源 Office SDK。The Office Harness for AI Agents — Spreadsheets, Docs, Slides, Canvas, Relational Tables, and PDF in one runtime.",
    category: "GitHub热点",
    date: "2026-09-26",
    readTime: "4 分钟阅读",
    coverBadge: "EP.132",
    coverTitle: "univer",
    coverSubtitle: "Univer - 可扩展的开源 Office SDK",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15Mh96xEZH",
      title: "「Github一周热点132期」Jev到底是不是神器？Agent安全审计、Office SDK、agent的k8s和长期记忆",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15Mh96xEZH",
      episode: 132,
    },
    content: "# Univer - 可扩展的开源 Office SDK\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 132 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Univer - 可扩展的开源 Office SDK** —— The Office Harness for AI Agents — Spreadsheets, Docs, Slides, Canvas, Relational Tables, and PDF in one runtime.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **22,692**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `dream-num/univer` |\n\n2.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 132 期）\n\n第 132 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点132期》，BV 号 `BV15Mh96xEZH`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/dream-num/univer.git\ncd univer\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Univer - 可扩展的开源 Office SDK 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/dream-num/univer\n- 原视频（第 132 期）：https://www.bilibili.com/video/BV15Mh96xEZH\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 132 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-132-ax",
    slug: "gh-132-ax",
    title: "AX - Google 开源的 Agent 工作负载编排器（132期 · 14,007 星）",
    summary: "《Github一周热点》第 132 期项目：AX - Google 开源的 Agent 工作负载编排器。Agent Executor (AX) is Google's open agentic orchestration runtime",
    category: "GitHub热点",
    date: "2026-09-26",
    readTime: "4 分钟阅读",
    coverBadge: "EP.132",
    coverTitle: "ax",
    coverSubtitle: "AX - Google 开源的 Agent 工作负载编排器",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15Mh96xEZH",
      title: "「Github一周热点132期」Jev到底是不是神器？Agent安全审计、Office SDK、agent的k8s和长期记忆",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15Mh96xEZH",
      episode: 132,
    },
    content: "# AX - Google 开源的 Agent 工作负载编排器\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 132 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**AX - Google 开源的 Agent 工作负载编排器** —— Agent Executor (AX) is Google's open agentic orchestration runtime\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **14,007**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Go |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `google/ax` |\n\n1.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 132 期）\n\n第 132 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点132期》，BV 号 `BV15Mh96xEZH`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/google/ax.git\ncd ax\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Go，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 AX - Google 开源的 Agent 工作负载编排器 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/google/ax\n- 原视频（第 132 期）：https://www.bilibili.com/video/BV15Mh96xEZH\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 132 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-132-hindsight",
    slug: "gh-132-hindsight",
    title: "Hindsight - AI Agent 的长期记忆系统（132期 · 52,017 星）",
    summary: "《Github一周热点》第 132 期项目：Hindsight - AI Agent 的长期记忆系统。Hindsight: Agent Memory That Learns",
    category: "GitHub热点",
    date: "2026-09-26",
    readTime: "4 分钟阅读",
    coverBadge: "EP.132",
    coverTitle: "hindsight",
    coverSubtitle: "Hindsight - AI Agent 的长期记忆系统",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15Mh96xEZH",
      title: "「Github一周热点132期」Jev到底是不是神器？Agent安全审计、Office SDK、agent的k8s和长期记忆",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15Mh96xEZH",
      episode: 132,
    },
    content: "# Hindsight - AI Agent 的长期记忆系统\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 132 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Hindsight - AI Agent 的长期记忆系统** —— Hindsight: Agent Memory That Learns\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **52,017**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `vectorize-io/hindsight` |\n\n5.2 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 132 期）\n\n第 132 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点132期》，BV 号 `BV15Mh96xEZH`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/vectorize-io/hindsight.git\ncd hindsight\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Hindsight - AI Agent 的长期记忆系统 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/vectorize-io/hindsight\n- 原视频（第 132 期）：https://www.bilibili.com/video/BV15Mh96xEZH\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 132 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-131-i-have-adhd",
    slug: "gh-131-i-have-adhd",
    title: "i-have-adhd - 让 AI 编程助手输出更直接（131期 · 58,011 星）",
    summary: "《Github一周热点》第 131 期项目：i-have-adhd - 让 AI 编程助手输出更直接。A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    category: "GitHub热点",
    date: "2026-09-19",
    readTime: "4 分钟阅读",
    coverBadge: "EP.131",
    coverTitle: "i-have-adhd",
    coverSubtitle: "i-have-adhd - 让 AI 编程助手输出更直接",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV152eS69EX4",
      title: "「Github一周热点131期」Agent 少说废话、飞书CLI、本地跑超大模型、CAD技能库和Mac效率启动器",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV152eS69EX4",
      episode: 131,
    },
    content: "# i-have-adhd - 让 AI 编程助手输出更直接\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 131 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**i-have-adhd - 让 AI 编程助手输出更直接** —— A skill to stop your coding agent from burying the answer. ADHD-friendly output.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **58,011**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `ayghri/i-have-adhd` |\n\n5.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 131 期）\n\n第 131 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点131期》，BV 号 `BV152eS69EX4`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/ayghri/i-have-adhd.git\ncd i-have-adhd\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 i-have-adhd - 让 AI 编程助手输出更直接 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/ayghri/i-have-adhd\n- 原视频（第 131 期）：https://www.bilibili.com/video/BV152eS69EX4\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 131 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-131-cli",
    slug: "gh-131-cli",
    title: "lark-cli - 飞书官方 CLI 与  Agent Skills（131期 · 17,747 星）",
    summary: "《Github一周热点》第 131 期项目：lark-cli - 飞书官方 CLI 与  Agent Skills。The official Lark/飞书 CLI tool, maintained by the larksuite team — built for humans and AI Agents. Covers core business domains including Messenger, Docs, Base, Sheets, Calendar, Mail, Tasks, Meetings, and more, with 200+ commands and 20+ AI Agent Skills.",
    category: "GitHub热点",
    date: "2026-09-19",
    readTime: "4 分钟阅读",
    coverBadge: "EP.131",
    coverTitle: "cli",
    coverSubtitle: "lark-cli - 飞书官方 CLI 与  Agent Skills",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV152eS69EX4",
      title: "「Github一周热点131期」Agent 少说废话、飞书CLI、本地跑超大模型、CAD技能库和Mac效率启动器",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV152eS69EX4",
      episode: 131,
    },
    content: "# lark-cli - 飞书官方 CLI 与  Agent Skills\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 131 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**lark-cli - 飞书官方 CLI 与  Agent Skills** —— The official Lark/飞书 CLI tool, maintained by the larksuite team — built for humans and AI Agents. Covers core business domains including Messenger, Docs, Base, Sheets, Calendar, Mail, Tasks, Meetings, and more, with 200+ commands and 20+ AI Agent Skills.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **17,747**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Go |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `larksuite/cli` |\n\n1.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 131 期）\n\n第 131 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点131期》，BV 号 `BV152eS69EX4`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/larksuite/cli.git\ncd cli\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Go，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 lark-cli - 飞书官方 CLI 与  Agent Skills 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/larksuite/cli\n- 原视频（第 131 期）：https://www.bilibili.com/video/BV152eS69EX4\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 131 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-131-colibri",
    slug: "gh-131-colibri",
    title: "colibri - 消费级和异构硬件上运行前沿 MoE 模型（131期 · 43,058 星）",
    summary: "《Github一周热点》第 131 期项目：colibri - 消费级和异构硬件上运行前沿 MoE 模型。Run frontier MoE models on hardware you already own — pure C, zero deps, experts streamed from disk. Tiny engine, immense model. 🐦",
    category: "GitHub热点",
    date: "2026-09-19",
    readTime: "4 分钟阅读",
    coverBadge: "EP.131",
    coverTitle: "colibri",
    coverSubtitle: "colibri - 消费级和异构硬件上运行前沿 MoE 模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV152eS69EX4",
      title: "「Github一周热点131期」Agent 少说废话、飞书CLI、本地跑超大模型、CAD技能库和Mac效率启动器",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV152eS69EX4",
      episode: 131,
    },
    content: "# colibri - 消费级和异构硬件上运行前沿 MoE 模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 131 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**colibri - 消费级和异构硬件上运行前沿 MoE 模型** —— Run frontier MoE models on hardware you already own — pure C, zero deps, experts streamed from disk. Tiny engine, immense model. 🐦\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **43,058**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | C |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `JustVugg/colibri` |\n\n4.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 131 期）\n\n第 131 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点131期》，BV 号 `BV152eS69EX4`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/JustVugg/colibri.git\ncd colibri\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 C，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 colibri - 消费级和异构硬件上运行前沿 MoE 模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/JustVugg/colibri\n- 原视频（第 131 期）：https://www.bilibili.com/video/BV152eS69EX4\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 131 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-131-text-to-cad",
    slug: "gh-131-text-to-cad",
    title: "text-to-cad - CAD 的 Agent Skills 技能库（131期 · 21,977 星）",
    summary: "《Github一周热点》第 131 期项目：text-to-cad - CAD 的 Agent Skills 技能库。Give your agent CAD superpowers.",
    category: "GitHub热点",
    date: "2026-09-19",
    readTime: "4 分钟阅读",
    coverBadge: "EP.131",
    coverTitle: "text-to-cad",
    coverSubtitle: "text-to-cad - CAD 的 Agent Skills 技能库",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV152eS69EX4",
      title: "「Github一周热点131期」Agent 少说废话、飞书CLI、本地跑超大模型、CAD技能库和Mac效率启动器",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV152eS69EX4",
      episode: 131,
    },
    content: "# text-to-cad - CAD 的 Agent Skills 技能库\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 131 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**text-to-cad - CAD 的 Agent Skills 技能库** —— Give your agent CAD superpowers.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **21,977**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `earthtojake/text-to-cad` |\n\n2.2 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 131 期）\n\n第 131 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点131期》，BV 号 `BV152eS69EX4`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/earthtojake/text-to-cad.git\ncd text-to-cad\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 text-to-cad - CAD 的 Agent Skills 技能库 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/earthtojake/text-to-cad\n- 原视频（第 131 期）：https://www.bilibili.com/video/BV152eS69EX4\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 131 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-131-tinycast",
    slug: "gh-131-tinycast",
    title: "Tinycast - 原生 macOS 启动器（131期 · 8,724 星）",
    summary: "《Github一周热点》第 131 期项目：Tinycast - 原生 macOS 启动器。Tinycast — a tiny, fully native macOS launcher, hotkeys, and clipboard history.",
    category: "GitHub热点",
    date: "2026-09-19",
    readTime: "4 分钟阅读",
    coverBadge: "EP.131",
    coverTitle: "tinycast",
    coverSubtitle: "Tinycast - 原生 macOS 启动器",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV152eS69EX4",
      title: "「Github一周热点131期」Agent 少说废话、飞书CLI、本地跑超大模型、CAD技能库和Mac效率启动器",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV152eS69EX4",
      episode: 131,
    },
    content: "# Tinycast - 原生 macOS 启动器\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 131 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Tinycast - 原生 macOS 启动器** —— Tinycast — a tiny, fully native macOS launcher, hotkeys, and clipboard history.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **8,724**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Swift |\n| 📜 开源协议 | NOASSERTION |\n| 📦 仓库 | `abue-ammar/tinycast` |\n\n8,724 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 NOASSERTION，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 131 期）\n\n第 131 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点131期》，BV 号 `BV152eS69EX4`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/abue-ammar/tinycast.git\ncd tinycast\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Swift，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Tinycast - 原生 macOS 启动器 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/abue-ammar/tinycast\n- 原视频（第 131 期）：https://www.bilibili.com/video/BV152eS69EX4\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 131 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-130-archify",
    slug: "gh-130-archify",
    title: "archify - 生成可信的架构图的 Skill（130期 · 86,409 星）",
    summary: "《Github一周热点》第 130 期项目：archify - 生成可信的架构图的 Skill。Turn any idea, plan, or codebase into a beautiful interactive diagram. An agent skill for Claude Code, Codex, and more.",
    category: "GitHub热点",
    date: "2026-09-06",
    readTime: "4 分钟阅读",
    coverBadge: "EP.130",
    coverTitle: "archify",
    coverSubtitle: "archify - 生成可信的架构图的 Skill",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1m4bn6jErE",
      title: "「Github一周热点130期」生成可信的架构图、实时地球观测、多智能体课堂、科研Agent skill和本地语音工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1m4bn6jErE",
      episode: 130,
    },
    content: "# archify - 生成可信的架构图的 Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 130 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**archify - 生成可信的架构图的 Skill** —— Turn any idea, plan, or codebase into a beautiful interactive diagram. An agent skill for Claude Code, Codex, and more.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **86,409**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | JavaScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `tt-a1i/archify` |\n\n8.6 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 130 期）\n\n第 130 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点130期》，BV 号 `BV1m4bn6jErE`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/tt-a1i/archify.git\ncd archify\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 JavaScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 archify - 生成可信的架构图的 Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/tt-a1i/archify\n- 原视频（第 130 期）：https://www.bilibili.com/video/BV1m4bn6jErE\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 130 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-130-gods-eye-view",
    slug: "gh-130-gods-eye-view",
    title: "gods-eye-view - 基于公开数据的 3D 地球观测台（130期 · 58,518 星）",
    summary: "《Github一周热点》第 130 期项目：gods-eye-view - 基于公开数据的 3D 地球观测台。A spy satellite simulator in your browser, except the data is real. Live open source spatial intelligence on a photorealistic 3D globe.",
    category: "GitHub热点",
    date: "2026-09-06",
    readTime: "4 分钟阅读",
    coverBadge: "EP.130",
    coverTitle: "gods-eye-view",
    coverSubtitle: "gods-eye-view - 基于公开数据的 3D 地球观测台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1m4bn6jErE",
      title: "「Github一周热点130期」生成可信的架构图、实时地球观测、多智能体课堂、科研Agent skill和本地语音工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1m4bn6jErE",
      episode: 130,
    },
    content: "# gods-eye-view - 基于公开数据的 3D 地球观测台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 130 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**gods-eye-view - 基于公开数据的 3D 地球观测台** —— A spy satellite simulator in your browser, except the data is real. Live open source spatial intelligence on a photorealistic 3D globe.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **58,518**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | JavaScript |\n| 📜 开源协议 | NOASSERTION |\n| 📦 仓库 | `bilawalsidhu/gods-eye-view` |\n\n5.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 NOASSERTION，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 130 期）\n\n第 130 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点130期》，BV 号 `BV1m4bn6jErE`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/bilawalsidhu/gods-eye-view.git\ncd gods-eye-view\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 JavaScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 gods-eye-view - 基于公开数据的 3D 地球观测台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/bilawalsidhu/gods-eye-view\n- 原视频（第 130 期）：https://www.bilibili.com/video/BV1m4bn6jErE\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 130 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-130-openmaic",
    slug: "gh-130-openmaic",
    title: "OpenMAIC - 多智能体交互式课堂（130期 · 41,150 星）",
    summary: "《Github一周热点》第 130 期项目：OpenMAIC - 多智能体交互式课堂。Open Multi-Agent Interactive Classroom — Get an immersive, multi-agent learning experience in just one click",
    category: "GitHub热点",
    date: "2026-09-06",
    readTime: "4 分钟阅读",
    coverBadge: "EP.130",
    coverTitle: "OpenMAIC",
    coverSubtitle: "OpenMAIC - 多智能体交互式课堂",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1m4bn6jErE",
      title: "「Github一周热点130期」生成可信的架构图、实时地球观测、多智能体课堂、科研Agent skill和本地语音工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1m4bn6jErE",
      episode: 130,
    },
    content: "# OpenMAIC - 多智能体交互式课堂\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 130 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OpenMAIC - 多智能体交互式课堂** —— Open Multi-Agent Interactive Classroom — Get an immersive, multi-agent learning experience in just one click\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **41,150**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `THU-MAIC/OpenMAIC` |\n\n4.1 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 130 期）\n\n第 130 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点130期》，BV 号 `BV1m4bn6jErE`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/THU-MAIC/OpenMAIC.git\ncd OpenMAIC\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OpenMAIC - 多智能体交互式课堂 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/THU-MAIC/OpenMAIC\n- 原视频（第 130 期）：https://www.bilibili.com/video/BV1m4bn6jErE\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 130 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-130-scientific-agent-skills",
    slug: "gh-130-scientific-agent-skills",
    title: "scientific-agent-skills - 面向科学研究的 Agent Skills 技能库（130期 · 53,257 星）",
    summary: "《Github一周热点》第 130 期项目：scientific-agent-skills - 面向科学研究的 Agent Skills 技能库。Turn any AI agent into an AI Scientist. The #1 Agent Skills library for science, used by 250,000+ scientists worldwide. 177 ready-to-use validated skills plus 100+ scientific databases covering biology, chemistry, medicine, and drug discovery. Compatible with Cursor, Claude Code, Codex, Pi, Antigravity, and the open Agent Skills standard.",
    category: "GitHub热点",
    date: "2026-09-06",
    readTime: "4 分钟阅读",
    coverBadge: "EP.130",
    coverTitle: "scientific-agent-skills",
    coverSubtitle: "scientific-agent-skills - 面向科学研究的 Agent ",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1m4bn6jErE",
      title: "「Github一周热点130期」生成可信的架构图、实时地球观测、多智能体课堂、科研Agent skill和本地语音工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1m4bn6jErE",
      episode: 130,
    },
    content: "# scientific-agent-skills - 面向科学研究的 Agent Skills 技能库\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 130 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**scientific-agent-skills - 面向科学研究的 Agent Skills 技能库** —— Turn any AI agent into an AI Scientist. The #1 Agent Skills library for science, used by 250,000+ scientists worldwide. 177 ready-to-use validated skills plus 100+ scientific databases covering biology, chemistry, medicine, and drug discovery. Compatible with Cursor, Claude Code, Codex, Pi, Antigravity, and the open Agent Skills standard.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **53,257**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `K-Dense-AI/scientific-agent-skills` |\n\n5.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 130 期）\n\n第 130 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点130期》，BV 号 `BV1m4bn6jErE`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/K-Dense-AI/scientific-agent-skills.git\ncd scientific-agent-skills\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 scientific-agent-skills - 面向科学研究的 Agent Skills 技能库 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/K-Dense-AI/scientific-agent-skills\n- 原视频（第 130 期）：https://www.bilibili.com/video/BV1m4bn6jErE\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 130 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-130-voicestudio",
    slug: "gh-130-voicestudio",
    title: "VoiceStudio - 本地AI语音工作台（130期 · 78,914 星）",
    summary: "《Github一周热点》第 130 期项目：VoiceStudio - 本地AI语音工作台。VoiceStudio is the open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing, dictation, transcription & audiobook creation in 646 languages.",
    category: "GitHub热点",
    date: "2026-09-06",
    readTime: "4 分钟阅读",
    coverBadge: "EP.130",
    coverTitle: "VoiceStudio",
    coverSubtitle: "VoiceStudio - 本地AI语音工作台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1m4bn6jErE",
      title: "「Github一周热点130期」生成可信的架构图、实时地球观测、多智能体课堂、科研Agent skill和本地语音工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1m4bn6jErE",
      episode: 130,
    },
    content: "# VoiceStudio - 本地AI语音工作台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 130 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**VoiceStudio - 本地AI语音工作台** —— VoiceStudio is the open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing, dictation, transcription & audiobook creation in 646 languages.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **78,914**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | AGPL-3.0 |\n| 📦 仓库 | `debpalash/VoiceStudio` |\n\n7.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 AGPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 130 期）\n\n第 130 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点130期》，BV 号 `BV1m4bn6jErE`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/debpalash/VoiceStudio.git\ncd VoiceStudio\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 VoiceStudio - 本地AI语音工作台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/debpalash/VoiceStudio\n- 原视频（第 130 期）：https://www.bilibili.com/video/BV1m4bn6jErE\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 130 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-129-munder-difflin",
    slug: "gh-129-munder-difflin",
    title: "munder-difflin - 一间 Agent 组成的办公室（129期 · 8,938 星）",
    summary: "《Github一周热点》第 129 期项目：munder-difflin - 一间 Agent 组成的办公室。an open-source alternative to the dots, bots and muses of the world, run an office of claude code/codex like agents on your laptop, sandboxes or anywhere, uses your existing subscriptions",
    category: "GitHub热点",
    date: "2026-08-29",
    readTime: "4 分钟阅读",
    coverBadge: "EP.129",
    coverTitle: "munder-difflin",
    coverSubtitle: "munder-difflin - 一间 Agent 组成的办公室",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1wW421X7uU",
      title: "「Github一周热点129期」一间agent的办公室、GPT-Image-2提示词、Codex Harness、Apache本地工作台和免费模型路由",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1wW421X7uU",
      episode: 129,
    },
    content: "# munder-difflin - 一间 Agent 组成的办公室\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 129 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**munder-difflin - 一间 Agent 组成的办公室** —— an open-source alternative to the dots, bots and muses of the world, run an office of claude code/codex like agents on your laptop, sandboxes or anywhere, uses your existing subscriptions\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **8,938**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `chaitanyagiri/munder-difflin` |\n\n8,938 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 129 期）\n\n第 129 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点129期》，BV 号 `BV1wW421X7uU`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/chaitanyagiri/munder-difflin.git\ncd munder-difflin\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 munder-difflin - 一间 Agent 组成的办公室 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/chaitanyagiri/munder-difflin\n- 原视频（第 129 期）：https://www.bilibili.com/video/BV1wW421X7uU\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 129 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-129-awesome-gpt-image-2",
    slug: "gh-129-awesome-gpt-image-2",
    title: "awesome-gpt-image-2 - GPT-Image-2 提示词案例、模板和 Agent Skill（129期 · 34,780 星）",
    summary: "《Github一周热点》第 129 期项目：awesome-gpt-image-2 - GPT-Image-2 提示词案例、模板和 Agent Skill。Prompt as Code | GPT Image 2 / 2.5 提示词与案例库，530+ 个案例、20+ 套工业级模板与可复用 Skills，新增 2.5 同提示词对比专区，附完整提示词与生成记录，持续更新。",
    category: "GitHub热点",
    date: "2026-08-29",
    readTime: "4 分钟阅读",
    coverBadge: "EP.129",
    coverTitle: "awesome-gpt-image-2",
    coverSubtitle: "awesome-gpt-image-2 - GPT-Image-2 提示词案例、",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1wW421X7uU",
      title: "「Github一周热点129期」一间agent的办公室、GPT-Image-2提示词、Codex Harness、Apache本地工作台和免费模型路由",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1wW421X7uU",
      episode: 129,
    },
    content: "# awesome-gpt-image-2 - GPT-Image-2 提示词案例、模板和 Agent Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 129 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**awesome-gpt-image-2 - GPT-Image-2 提示词案例、模板和 Agent Skill** —— Prompt as Code | GPT Image 2 / 2.5 提示词与案例库，530+ 个案例、20+ 套工业级模板与可复用 Skills，新增 2.5 同提示词对比专区，附完整提示词与生成记录，持续更新。\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **34,780**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | JavaScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `freestylefly/awesome-gpt-image-2` |\n\n3.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 129 期）\n\n第 129 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点129期》，BV 号 `BV1wW421X7uU`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/freestylefly/awesome-gpt-image-2.git\ncd awesome-gpt-image-2\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 JavaScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 awesome-gpt-image-2 - GPT-Image-2 提示词案例、模板和 Agent Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/freestylefly/awesome-gpt-image-2\n- 原视频（第 129 期）：https://www.bilibili.com/video/BV1wW421X7uU\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 129 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-129-codex",
    slug: "gh-129-codex",
    title: "codex - OpenAI 的开放智能体框架（129期 · 130,166 星）",
    summary: "《Github一周热点》第 129 期项目：codex - OpenAI 的开放智能体框架。Lightweight coding agent that runs in your terminal",
    category: "GitHub热点",
    date: "2026-08-29",
    readTime: "4 分钟阅读",
    coverBadge: "EP.129",
    coverTitle: "codex",
    coverSubtitle: "codex - OpenAI 的开放智能体框架",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1wW421X7uU",
      title: "「Github一周热点129期」一间agent的办公室、GPT-Image-2提示词、Codex Harness、Apache本地工作台和免费模型路由",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1wW421X7uU",
      episode: 129,
    },
    content: "# codex - OpenAI 的开放智能体框架\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 129 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**codex - OpenAI 的开放智能体框架** —— Lightweight coding agent that runs in your terminal\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **130,166**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `openai/codex` |\n\n13.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 129 期）\n\n第 129 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点129期》，BV 号 `BV1wW421X7uU`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/openai/codex.git\ncd codex\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 codex - OpenAI 的开放智能体框架 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/openai/codex\n- 原视频（第 129 期）：https://www.bilibili.com/video/BV1wW421X7uU\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 129 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-129-maka",
    slug: "gh-129-maka",
    title: "maka - Apache 的本地优先 AI Agent 工作台（129期 · 5,860 星）",
    summary: "《Github一周热点》第 129 期项目：maka - Apache 的本地优先 AI Agent 工作台。Apache Maka (Incubating) is a high-performance agent workspace that keeps a complete record of everything it did.",
    category: "GitHub热点",
    date: "2026-08-29",
    readTime: "4 分钟阅读",
    coverBadge: "EP.129",
    coverTitle: "maka",
    coverSubtitle: "maka - Apache 的本地优先 AI Agent 工作台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1wW421X7uU",
      title: "「Github一周热点129期」一间agent的办公室、GPT-Image-2提示词、Codex Harness、Apache本地工作台和免费模型路由",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1wW421X7uU",
      episode: 129,
    },
    content: "# maka - Apache 的本地优先 AI Agent 工作台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 129 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**maka - Apache 的本地优先 AI Agent 工作台** —— Apache Maka (Incubating) is a high-performance agent workspace that keeps a complete record of everything it did.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **5,860**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `apache/maka` |\n\n5,860 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 129 期）\n\n第 129 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点129期》，BV 号 `BV1wW421X7uU`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/apache/maka.git\ncd maka\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 maka - Apache 的本地优先 AI Agent 工作台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/apache/maka\n- 原视频（第 129 期）：https://www.bilibili.com/video/BV1wW421X7uU\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 129 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-129-freellmapi",
    slug: "gh-129-freellmapi",
    title: "freellmapi - 免费模型资源聚合路由（129期 · 38,299 星）",
    summary: "《Github一周热点》第 129 期项目：freellmapi - 免费模型资源聚合路由。7.4 billion tokens per month. 34 free LLM providers. 635 free model endpoints. All behind one /v1 endpoint, plus any custom OpenAI-compatible endpoint. Smart routing, automatic failover, encrypted keys. Personal experimentation only.",
    category: "GitHub热点",
    date: "2026-08-29",
    readTime: "4 分钟阅读",
    coverBadge: "EP.129",
    coverTitle: "freellmapi",
    coverSubtitle: "freellmapi - 免费模型资源聚合路由",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1wW421X7uU",
      title: "「Github一周热点129期」一间agent的办公室、GPT-Image-2提示词、Codex Harness、Apache本地工作台和免费模型路由",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1wW421X7uU",
      episode: 129,
    },
    content: "# freellmapi - 免费模型资源聚合路由\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 129 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**freellmapi - 免费模型资源聚合路由** —— 7.4 billion tokens per month. 34 free LLM providers. 635 free model endpoints. All behind one /v1 endpoint, plus any custom OpenAI-compatible endpoint. Smart routing, automatic failover, encrypted keys. Personal experimentation only.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **38,299**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `tashfeenahmed/freellmapi` |\n\n3.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 129 期）\n\n第 129 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点129期》，BV 号 `BV1wW421X7uU`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/tashfeenahmed/freellmapi.git\ncd freellmapi\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 freellmapi - 免费模型资源聚合路由 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/tashfeenahmed/freellmapi\n- 原视频（第 129 期）：https://www.bilibili.com/video/BV1wW421X7uU\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 129 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-128-img2threejs",
    slug: "gh-128-img2threejs",
    title: "img2threejs - 基于参考图生成 Three.js 3D 模型（128期 · 18,517 星）",
    summary: "《Github一周热点》第 128 期项目：img2threejs - 基于参考图生成 Three.js 3D 模型。Rebuild the object in a reference image as a code-only, procedural, quality-gated, animation-ready Three.js model. Token-efficient image-to-3D.",
    category: "GitHub热点",
    date: "2026-08-22",
    readTime: "4 分钟阅读",
    coverBadge: "EP.128",
    coverTitle: "img2threejs",
    coverSubtitle: "img2threejs - 基于参考图生成 Three.js 3D 模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1jz8C6hEz5",
      title: "「Github一周热点128期」图片生成3D模型、现代化Linux、Mac优化的本地模型推理、模型智能路由和端侧小模型",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1jz8C6hEz5",
      episode: 128,
    },
    content: "# img2threejs - 基于参考图生成 Three.js 3D 模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 128 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**img2threejs - 基于参考图生成 Three.js 3D 模型** —— Rebuild the object in a reference image as a code-only, procedural, quality-gated, animation-ready Three.js model. Token-efficient image-to-3D.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **18,517**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `img2threejs/img2threejs` |\n\n1.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 128 期）\n\n第 128 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点128期》，BV 号 `BV1jz8C6hEz5`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/img2threejs/img2threejs.git\ncd img2threejs\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 img2threejs - 基于参考图生成 Three.js 3D 模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/img2threejs/img2threejs\n- 原视频（第 128 期）：https://www.bilibili.com/video/BV1jz8C6hEz5\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 128 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-128-omarchy",
    slug: "gh-128-omarchy",
    title: "omarchy - 现代化 Linux 发行版（128期 · 45,335 星）",
    summary: "《Github一周热点》第 128 期项目：omarchy - 现代化 Linux 发行版。Beautiful, Modern & Opinionated Linux",
    category: "GitHub热点",
    date: "2026-08-22",
    readTime: "4 分钟阅读",
    coverBadge: "EP.128",
    coverTitle: "omarchy",
    coverSubtitle: "omarchy - 现代化 Linux 发行版",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1jz8C6hEz5",
      title: "「Github一周热点128期」图片生成3D模型、现代化Linux、Mac优化的本地模型推理、模型智能路由和端侧小模型",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1jz8C6hEz5",
      episode: 128,
    },
    content: "# omarchy - 现代化 Linux 发行版\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 128 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**omarchy - 现代化 Linux 发行版** —— Beautiful, Modern & Opinionated Linux\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **45,335**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Shell |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `basecamp/omarchy` |\n\n4.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 128 期）\n\n第 128 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点128期》，BV 号 `BV1jz8C6hEz5`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/basecamp/omarchy.git\ncd omarchy\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Shell，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 omarchy - 现代化 Linux 发行版 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/basecamp/omarchy\n- 原视频（第 128 期）：https://www.bilibili.com/video/BV1jz8C6hEz5\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 128 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-128-omlx",
    slug: "gh-128-omlx",
    title: "omlx - 为 Mac 优化的 LLM 推理工具（128期 · 22,966 星）",
    summary: "《Github一周热点》第 128 期项目：omlx - 为 Mac 优化的 LLM 推理工具。LLM inference server with continuous batching & SSD caching for Apple Silicon — managed from the macOS menu bar",
    category: "GitHub热点",
    date: "2026-08-22",
    readTime: "4 分钟阅读",
    coverBadge: "EP.128",
    coverTitle: "omlx",
    coverSubtitle: "omlx - 为 Mac 优化的 LLM 推理工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1jz8C6hEz5",
      title: "「Github一周热点128期」图片生成3D模型、现代化Linux、Mac优化的本地模型推理、模型智能路由和端侧小模型",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1jz8C6hEz5",
      episode: 128,
    },
    content: "# omlx - 为 Mac 优化的 LLM 推理工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 128 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**omlx - 为 Mac 优化的 LLM 推理工具** —— LLM inference server with continuous batching & SSD caching for Apple Silicon — managed from the macOS menu bar\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **22,966**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `jundot/omlx` |\n\n2.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 128 期）\n\n第 128 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点128期》，BV 号 `BV1jz8C6hEz5`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/jundot/omlx.git\ncd omlx\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 omlx - 为 Mac 优化的 LLM 推理工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/jundot/omlx\n- 原视频（第 128 期）：https://www.bilibili.com/video/BV1jz8C6hEz5\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 128 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-128-switchyard",
    slug: "gh-128-switchyard",
    title: "Switchyard - 大模型路由工具（128期 · 3,414 星）",
    summary: "《Github一周热点》第 128 期项目：Switchyard - 大模型路由工具。Switchyard lets LLM applications route traffic across models and providers while preserving native OpenAI and Anthropic API compatibility - enabling flexible model selection, benchmarking, and cost/performance optimization.",
    category: "GitHub热点",
    date: "2026-08-22",
    readTime: "4 分钟阅读",
    coverBadge: "EP.128",
    coverTitle: "Switchyard",
    coverSubtitle: "Switchyard - 大模型路由工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1jz8C6hEz5",
      title: "「Github一周热点128期」图片生成3D模型、现代化Linux、Mac优化的本地模型推理、模型智能路由和端侧小模型",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1jz8C6hEz5",
      episode: 128,
    },
    content: "# Switchyard - 大模型路由工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 128 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Switchyard - 大模型路由工具** —— Switchyard lets LLM applications route traffic across models and providers while preserving native OpenAI and Anthropic API compatibility - enabling flexible model selection, benchmarking, and cost/performance optimization.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **3,414**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `NVIDIA-NeMo/Switchyard` |\n\n3,414 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 128 期）\n\n第 128 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点128期》，BV 号 `BV1jz8C6hEz5`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/NVIDIA-NeMo/Switchyard.git\ncd Switchyard\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Switchyard - 大模型路由工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/NVIDIA-NeMo/Switchyard\n- 原视频（第 128 期）：https://www.bilibili.com/video/BV1jz8C6hEz5\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 128 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-128-needle",
    slug: "gh-128-needle",
    title: "needle - 端侧的超小型工具调用模型（128期 · 14,144 星）",
    summary: "《Github一周热点》第 128 期项目：needle - 端侧的超小型工具调用模型。Automation foundation model for tiny devices: 2-bit, 8-29 MB, tool calls, ASR, structured extraction and embeddings on phones, wearables, smart homes, robots, cars and microcontrollers.",
    category: "GitHub热点",
    date: "2026-08-22",
    readTime: "4 分钟阅读",
    coverBadge: "EP.128",
    coverTitle: "needle",
    coverSubtitle: "needle - 端侧的超小型工具调用模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1jz8C6hEz5",
      title: "「Github一周热点128期」图片生成3D模型、现代化Linux、Mac优化的本地模型推理、模型智能路由和端侧小模型",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1jz8C6hEz5",
      episode: 128,
    },
    content: "# needle - 端侧的超小型工具调用模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 128 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**needle - 端侧的超小型工具调用模型** —— Automation foundation model for tiny devices: 2-bit, 8-29 MB, tool calls, ASR, structured extraction and embeddings on phones, wearables, smart homes, robots, cars and microcontrollers.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **14,144**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `cactus-compute/needle` |\n\n1.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 128 期）\n\n第 128 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点128期》，BV 号 `BV1jz8C6hEz5`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/cactus-compute/needle.git\ncd needle\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 needle - 端侧的超小型工具调用模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/cactus-compute/needle\n- 原视频（第 128 期）：https://www.bilibili.com/video/BV1jz8C6hEz5\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 128 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-127-deepseek-harness",
    slug: "gh-127-deepseek-harness",
    title: "deepseek-harness - DeepSeek 开源的 Agent Harness（127期 · 255,739 星）",
    summary: "《Github一周热点》第 127 期项目：deepseek-harness - DeepSeek 开源的 Agent Harness。DeepSeek Harness: Everything is a Plugin.",
    category: "GitHub热点",
    date: "2026-08-15",
    readTime: "4 分钟阅读",
    coverBadge: "EP.127",
    coverTitle: "deepseek-harness",
    coverSubtitle: "deepseek-harness - DeepSeek 开源的 Agent Ha",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1xHgg6NEJA",
      title: "「Github一周热点127期」DeepSeek Harness、AI画图Skill、自进化编程Agent、团队工作台和可审计语义图谱",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1xHgg6NEJA",
      episode: 127,
    },
    content: "# deepseek-harness - DeepSeek 开源的 Agent Harness\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 127 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**deepseek-harness - DeepSeek 开源的 Agent Harness** —— DeepSeek Harness: Everything is a Plugin.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **255,739**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `deepseek-ai/deepseek-harness` |\n\n25.6 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 127 期）\n\n第 127 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点127期》，BV 号 `BV1xHgg6NEJA`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/deepseek-ai/deepseek-harness.git\ncd deepseek-harness\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 deepseek-harness - DeepSeek 开源的 Agent Harness 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/deepseek-ai/deepseek-harness\n- 原视频（第 127 期）：https://www.bilibili.com/video/BV1xHgg6NEJA\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 127 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-127-diagram-design",
    slug: "gh-127-diagram-design",
    title: "diagram-design - 给 AI Agent 使用的出版级图表设计 Skill（127期 · 58,965 星）",
    summary: "《Github一周热点》第 127 期项目：diagram-design - 给 AI Agent 使用的出版级图表设计 Skill。Editorial diagram design for Claude Code, Codex, GitHub Copilot, Cursor, Factory Droid, and Pi. 44 diagram types. Self-contained HTML + SVG. No shadows. No Mermaid slop.",
    category: "GitHub热点",
    date: "2026-08-15",
    readTime: "4 分钟阅读",
    coverBadge: "EP.127",
    coverTitle: "diagram-design",
    coverSubtitle: "diagram-design - 给 AI Agent 使用的出版级图表设计 S",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1xHgg6NEJA",
      title: "「Github一周热点127期」DeepSeek Harness、AI画图Skill、自进化编程Agent、团队工作台和可审计语义图谱",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1xHgg6NEJA",
      episode: 127,
    },
    content: "# diagram-design - 给 AI Agent 使用的出版级图表设计 Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 127 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**diagram-design - 给 AI Agent 使用的出版级图表设计 Skill** —— Editorial diagram design for Claude Code, Codex, GitHub Copilot, Cursor, Factory Droid, and Pi. 44 diagram types. Self-contained HTML + SVG. No shadows. No Mermaid slop.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **58,965**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | HTML |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `cathrynlavery/diagram-design` |\n\n5.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 127 期）\n\n第 127 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点127期》，BV 号 `BV1xHgg6NEJA`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/cathrynlavery/diagram-design.git\ncd diagram-design\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 HTML，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 diagram-design - 给 AI Agent 使用的出版级图表设计 Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/cathrynlavery/diagram-design\n- 原视频（第 127 期）：https://www.bilibili.com/video/BV1xHgg6NEJA\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 127 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-127-prime-agent",
    slug: "gh-127-prime-agent",
    title: "prime-agent - Prime Intellect 开源的自进化 RLM 编程与研究 Agent（127期 · 22,209 星）",
    summary: "《Github一周热点》第 127 期项目：prime-agent - Prime Intellect 开源的自进化 RLM 编程与研究 Agent。A self-improving RLM agent for coding workflows and long-running autonomous tasks.",
    category: "GitHub热点",
    date: "2026-08-15",
    readTime: "4 分钟阅读",
    coverBadge: "EP.127",
    coverTitle: "prime-agent",
    coverSubtitle: "prime-agent - Prime Intellect 开源的自进化 RLM",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1xHgg6NEJA",
      title: "「Github一周热点127期」DeepSeek Harness、AI画图Skill、自进化编程Agent、团队工作台和可审计语义图谱",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1xHgg6NEJA",
      episode: 127,
    },
    content: "# prime-agent - Prime Intellect 开源的自进化 RLM 编程与研究 Agent\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 127 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**prime-agent - Prime Intellect 开源的自进化 RLM 编程与研究 Agent** —— A self-improving RLM agent for coding workflows and long-running autonomous tasks.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **22,209**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | NOASSERTION |\n| 📦 仓库 | `PrimeIntellect-ai/prime-agent` |\n\n2.2 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 NOASSERTION，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 127 期）\n\n第 127 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点127期》，BV 号 `BV1xHgg6NEJA`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/PrimeIntellect-ai/prime-agent.git\ncd prime-agent\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 prime-agent - Prime Intellect 开源的自进化 RLM 编程与研究 Agent 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/PrimeIntellect-ai/prime-agent\n- 原视频（第 127 期）：https://www.bilibili.com/video/BV1xHgg6NEJA\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 127 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-127-macro",
    slug: "gh-127-macro",
    title: "macro - 开源团队工作台与团队级记忆系统（127期 · 4,782 星）",
    summary: "《Github一周热点》第 127 期项目：macro - 开源团队工作台与团队级记忆系统。Macro is a unified workspace for teams: email, chat, docs, tasks, agents, calls, and CRM — @-linked together with shared AI memory.",
    category: "GitHub热点",
    date: "2026-08-15",
    readTime: "4 分钟阅读",
    coverBadge: "EP.127",
    coverTitle: "macro",
    coverSubtitle: "macro - 开源团队工作台与团队级记忆系统",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1xHgg6NEJA",
      title: "「Github一周热点127期」DeepSeek Harness、AI画图Skill、自进化编程Agent、团队工作台和可审计语义图谱",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1xHgg6NEJA",
      episode: 127,
    },
    content: "# macro - 开源团队工作台与团队级记忆系统\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 127 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**macro - 开源团队工作台与团队级记忆系统** —— Macro is a unified workspace for teams: email, chat, docs, tasks, agents, calls, and CRM — @-linked together with shared AI memory.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **4,782**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | AGPL-3.0 |\n| 📦 仓库 | `macro-inc/macro` |\n\n4,782 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 AGPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 127 期）\n\n第 127 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点127期》，BV 号 `BV1xHgg6NEJA`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/macro-inc/macro.git\ncd macro\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 macro - 开源团队工作台与团队级记忆系统 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/macro-inc/macro\n- 原视频（第 127 期）：https://www.bilibili.com/video/BV1xHgg6NEJA\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 127 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-127-semantica",
    slug: "gh-127-semantica",
    title: "semantica - 面向可审计 AI 系统的语义图谱基础设施（127期 · 14,157 星）",
    summary: "《Github一周热点》第 127 期项目：semantica - 面向可审计 AI 系统的语义图谱基础设施。Graph-Native Infrastructure for Context and Accountable AI Systems",
    category: "GitHub热点",
    date: "2026-08-15",
    readTime: "4 分钟阅读",
    coverBadge: "EP.127",
    coverTitle: "semantica",
    coverSubtitle: "semantica - 面向可审计 AI 系统的语义图谱基础设施",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1xHgg6NEJA",
      title: "「Github一周热点127期」DeepSeek Harness、AI画图Skill、自进化编程Agent、团队工作台和可审计语义图谱",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1xHgg6NEJA",
      episode: 127,
    },
    content: "# semantica - 面向可审计 AI 系统的语义图谱基础设施\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 127 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**semantica - 面向可审计 AI 系统的语义图谱基础设施** —— Graph-Native Infrastructure for Context and Accountable AI Systems\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **14,157**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `semantica-agi/semantica` |\n\n1.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 127 期）\n\n第 127 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点127期》，BV 号 `BV1xHgg6NEJA`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/semantica-agi/semantica.git\ncd semantica\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 semantica - 面向可审计 AI 系统的语义图谱基础设施 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/semantica-agi/semantica\n- 原视频（第 127 期）：https://www.bilibili.com/video/BV1xHgg6NEJA\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 127 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-126-minimax-h3",
    slug: "gh-126-minimax-h3",
    title: "MiniMax-H3 - MiniMax 开源的全模态音视频生成模型（126期 · 10,224 星）",
    summary: "《Github一周热点》第 126 期项目：MiniMax-H3 - MiniMax 开源的全模态音视频生成模型。MiniMax-H3 - MiniMax 开源的全模态音视频生成模型",
    category: "GitHub热点",
    date: "2026-08-08",
    readTime: "4 分钟阅读",
    coverBadge: "EP.126",
    coverTitle: "MiniMax-H3",
    coverSubtitle: "MiniMax-H3 - MiniMax 开源的全模态音视频生成模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1nfuT6EELu",
      title: "「Github一周热点126期」MiniMax全模态视频模型、PDF解析、团队Agent记忆、低显存跑大模型、逆向工程Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1nfuT6EELu",
      episode: 126,
    },
    content: "# MiniMax-H3 - MiniMax 开源的全模态音视频生成模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 126 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**MiniMax-H3 - MiniMax 开源的全模态音视频生成模型** —— MiniMax-H3 - MiniMax 开源的全模态音视频生成模型\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **10,224**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | 未标注 |\n| 📦 仓库 | `MiniMax-AI/MiniMax-H3` |\n\n1.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 未标注，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 126 期）\n\n第 126 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点126期》，BV 号 `BV1nfuT6EELu`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/MiniMax-AI/MiniMax-H3.git\ncd MiniMax-H3\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 MiniMax-H3 - MiniMax 开源的全模态音视频生成模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/MiniMax-AI/MiniMax-H3\n- 原视频（第 126 期）：https://www.bilibili.com/video/BV1nfuT6EELu\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 126 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-126-pdf-inspector",
    slug: "gh-126-pdf-inspector",
    title: "pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽取工具（126期 · 19,700 星）",
    summary: "《Github一周热点》第 126 期项目：pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽取工具。Fast Rust library for PDF inspection, classification, and text extraction. Intelligently detects scanned vs text-based PDFs to enable smart routing decisions.",
    category: "GitHub热点",
    date: "2026-08-08",
    readTime: "4 分钟阅读",
    coverBadge: "EP.126",
    coverTitle: "pdf-inspector",
    coverSubtitle: "pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1nfuT6EELu",
      title: "「Github一周热点126期」MiniMax全模态视频模型、PDF解析、团队Agent记忆、低显存跑大模型、逆向工程Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1nfuT6EELu",
      episode: 126,
    },
    content: "# pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽取工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 126 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽取工具** —— Fast Rust library for PDF inspection, classification, and text extraction. Intelligently detects scanned vs text-based PDFs to enable smart routing decisions.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **19,700**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `firecrawl/pdf-inspector` |\n\n2.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 126 期）\n\n第 126 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点126期》，BV 号 `BV1nfuT6EELu`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/firecrawl/pdf-inspector.git\ncd pdf-inspector\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 pdf-inspector - Firecrawl 开源的快速 PDF 分类与抽取工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/firecrawl/pdf-inspector\n- 原视频（第 126 期）：https://www.bilibili.com/video/BV1nfuT6EELu\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 126 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-126-airllm",
    slug: "gh-126-airllm",
    title: "AirLLM - 低显存运行大模型的推理工具（126期 · 39,879 星）",
    summary: "《Github一周热点》第 126 期项目：AirLLM - 低显存运行大模型的推理工具。AirLLM 2.8T LLM inference with single 4GB GPU",
    category: "GitHub热点",
    date: "2026-08-08",
    readTime: "4 分钟阅读",
    coverBadge: "EP.126",
    coverTitle: "airllm",
    coverSubtitle: "AirLLM - 低显存运行大模型的推理工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1nfuT6EELu",
      title: "「Github一周热点126期」MiniMax全模态视频模型、PDF解析、团队Agent记忆、低显存跑大模型、逆向工程Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1nfuT6EELu",
      episode: 126,
    },
    content: "# AirLLM - 低显存运行大模型的推理工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 126 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**AirLLM - 低显存运行大模型的推理工具** —— AirLLM 2.8T LLM inference with single 4GB GPU\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **39,879**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Jupyter Notebook |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `lyogavin/airllm` |\n\n4.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 126 期）\n\n第 126 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点126期》，BV 号 `BV1nfuT6EELu`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/lyogavin/airllm.git\ncd airllm\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Jupyter Notebook，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 AirLLM - 低显存运行大模型的推理工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/lyogavin/airllm\n- 原视频（第 126 期）：https://www.bilibili.com/video/BV1nfuT6EELu\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 126 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-126-reverse-skill",
    slug: "gh-126-reverse-skill",
    title: "reverse-skill - 面向逆向和安全研究的 Skill 路由包（126期 · 42,792 星）",
    summary: "《Github一周热点》第 126 期项目：reverse-skill - 面向逆向和安全研究的 Skill 路由包。Reverse Engineering / Authorized Penetration Testing / Security Research Skill Router Pack AI-powered routing + On-demand toolchain bootstrapping + Self-evolving knowledge base  Supports Claude Code, Kiro, Cursor, Cline, and other AI coding clients 逆向/渗透/安全技能路由包 - AI 自动路由 + 按需自举工具链 + 自动进化经验库 | 支持 Claude Code / Kiro / Cursor / Cline 等代码 AI 客户端",
    category: "GitHub热点",
    date: "2026-08-08",
    readTime: "4 分钟阅读",
    coverBadge: "EP.126",
    coverTitle: "reverse-skill",
    coverSubtitle: "reverse-skill - 面向逆向和安全研究的 Skill 路由包",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1nfuT6EELu",
      title: "「Github一周热点126期」MiniMax全模态视频模型、PDF解析、团队Agent记忆、低显存跑大模型、逆向工程Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1nfuT6EELu",
      episode: 126,
    },
    content: "# reverse-skill - 面向逆向和安全研究的 Skill 路由包\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 126 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**reverse-skill - 面向逆向和安全研究的 Skill 路由包** —— Reverse Engineering / Authorized Penetration Testing / Security Research Skill Router Pack AI-powered routing + On-demand toolchain bootstrapping + Self-evolving knowledge base  Supports Claude Code, Kiro, Cursor, Cline, and other AI coding clients 逆向/渗透/安全技能路由包 - AI 自动路由 + 按需自举工具链 + 自动进化经验库 | 支持 Claude Code / Kiro / Cursor / Cline 等代码 AI 客户端\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **42,792**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | PowerShell |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `zhaoxuya520/reverse-skill` |\n\n4.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 126 期）\n\n第 126 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点126期》，BV 号 `BV1nfuT6EELu`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/zhaoxuya520/reverse-skill.git\ncd reverse-skill\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 PowerShell，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 reverse-skill - 面向逆向和安全研究的 Skill 路由包 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/zhaoxuya520/reverse-skill\n- 原视频（第 126 期）：https://www.bilibili.com/video/BV1nfuT6EELu\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 126 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-126-tencentdb-agent-memory",
    slug: "gh-126-tencentdb-agent-memory",
    title: "TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent 记忆系统（126期 · 29,702 星）",
    summary: "《Github一周热点》第 126 期项目：TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent 记忆系统。TencentDB Agent Memory is a team-level memory hub for AI Agents — turning conversations, docs, and code into four reusable memory assets (Chat Memory, Skill, LLM-Wiki, Code-Graph) that are governed, shared, and equipped across agents and frameworks.",
    category: "GitHub热点",
    date: "2026-08-08",
    readTime: "4 分钟阅读",
    coverBadge: "EP.126",
    coverTitle: "TencentDB-Agent-Memory",
    coverSubtitle: "TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1nfuT6EELu",
      title: "「Github一周热点126期」MiniMax全模态视频模型、PDF解析、团队Agent记忆、低显存跑大模型、逆向工程Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1nfuT6EELu",
      episode: 126,
    },
    content: "# TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent 记忆系统\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 126 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent 记忆系统** —— TencentDB Agent Memory is a team-level memory hub for AI Agents — turning conversations, docs, and code into four reusable memory assets (Chat Memory, Skill, LLM-Wiki, Code-Graph) that are governed, shared, and equipped across agents and frameworks.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **29,702**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | NOASSERTION |\n| 📦 仓库 | `TencentCloud/TencentDB-Agent-Memory` |\n\n3.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 NOASSERTION，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 126 期）\n\n第 126 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点126期》，BV 号 `BV1nfuT6EELu`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/TencentCloud/TencentDB-Agent-Memory.git\ncd TencentDB-Agent-Memory\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 TencentDB-Agent-Memory - 腾讯云开源的团队级 Agent 记忆系统 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/TencentCloud/TencentDB-Agent-Memory\n- 原视频（第 126 期）：https://www.bilibili.com/video/BV1nfuT6EELu\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 126 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-125-build-your-own-x",
    slug: "gh-125-build-your-own-x",
    title: "build-your-own-x - 从零实现各种技术的教程合集（125期 · 554,841 星）",
    summary: "《Github一周热点》第 125 期项目：build-your-own-x - 从零实现各种技术的教程合集。Master programming by recreating your favorite technologies from scratch.",
    category: "GitHub热点",
    date: "2026-08-01",
    readTime: "4 分钟阅读",
    coverBadge: "EP.125",
    coverTitle: "build-your-own-x",
    coverSubtitle: "build-your-own-x - 从零实现各种技术的教程合集",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1tZG36jEHe",
      title: "「Github一周热点125期」从零实现技术合集、离线蓝牙聊天、阿里代码审查Agent、AI Agent开源书和把书变成Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1tZG36jEHe",
      episode: 125,
    },
    content: "# build-your-own-x - 从零实现各种技术的教程合集\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 125 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**build-your-own-x - 从零实现各种技术的教程合集** —— Master programming by recreating your favorite technologies from scratch.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **554,841**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Markdown |\n| 📜 开源协议 | 未标注 |\n| 📦 仓库 | `codecrafters-io/build-your-own-x` |\n\n55.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 未标注，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 125 期）\n\n第 125 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点125期》，BV 号 `BV1tZG36jEHe`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/codecrafters-io/build-your-own-x.git\ncd build-your-own-x\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Markdown，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 build-your-own-x - 从零实现各种技术的教程合集 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/codecrafters-io/build-your-own-x\n- 原视频（第 125 期）：https://www.bilibili.com/video/BV1tZG36jEHe\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 125 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-125-bitchat",
    slug: "gh-125-bitchat",
    title: "bitchat - 去中心化离线聊天应用（125期 · 36,661 星）",
    summary: "《Github一周热点》第 125 期项目：bitchat - 去中心化离线聊天应用。bluetooth mesh chat, IRC vibes",
    category: "GitHub热点",
    date: "2026-08-01",
    readTime: "4 分钟阅读",
    coverBadge: "EP.125",
    coverTitle: "bitchat",
    coverSubtitle: "bitchat - 去中心化离线聊天应用",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1tZG36jEHe",
      title: "「Github一周热点125期」从零实现技术合集、离线蓝牙聊天、阿里代码审查Agent、AI Agent开源书和把书变成Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1tZG36jEHe",
      episode: 125,
    },
    content: "# bitchat - 去中心化离线聊天应用\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 125 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**bitchat - 去中心化离线聊天应用** —— bluetooth mesh chat, IRC vibes\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **36,661**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Swift |\n| 📜 开源协议 | Unlicense |\n| 📦 仓库 | `permissionlesstech/bitchat` |\n\n3.7 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Unlicense，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 125 期）\n\n第 125 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点125期》，BV 号 `BV1tZG36jEHe`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/permissionlesstech/bitchat.git\ncd bitchat\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Swift，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 bitchat - 去中心化离线聊天应用 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/permissionlesstech/bitchat\n- 原视频（第 125 期）：https://www.bilibili.com/video/BV1tZG36jEHe\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 125 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-125-open-code-review",
    slug: "gh-125-open-code-review",
    title: "Open Code Review - 阿里开源的 AI 代码审查工具（125期 · 47,726 星）",
    summary: "《Github一周热点》第 125 期项目：Open Code Review - 阿里开源的 AI 代码审查工具。Secure, fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI & Anthropic compatible.",
    category: "GitHub热点",
    date: "2026-08-01",
    readTime: "4 分钟阅读",
    coverBadge: "EP.125",
    coverTitle: "open-code-review",
    coverSubtitle: "Open Code Review - 阿里开源的 AI 代码审查工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1tZG36jEHe",
      title: "「Github一周热点125期」从零实现技术合集、离线蓝牙聊天、阿里代码审查Agent、AI Agent开源书和把书变成Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1tZG36jEHe",
      episode: 125,
    },
    content: "# Open Code Review - 阿里开源的 AI 代码审查工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 125 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Open Code Review - 阿里开源的 AI 代码审查工具** —— Secure, fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI & Anthropic compatible.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **47,726**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Go |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `alibaba/open-code-review` |\n\n4.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 125 期）\n\n第 125 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点125期》，BV 号 `BV1tZG36jEHe`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/alibaba/open-code-review.git\ncd open-code-review\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Go，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Open Code Review - 阿里开源的 AI 代码审查工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/alibaba/open-code-review\n- 原视频（第 125 期）：https://www.bilibili.com/video/BV1tZG36jEHe\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 125 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-125-ai-agent-book",
    slug: "gh-125-ai-agent-book",
    title: "ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践》（125期 · 55,135 星）",
    summary: "《Github一周热点》第 125 期项目：ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践》。《深入理解 AI Agent：设计原理与工程实践》（李博杰 著）开源主仓库：全书正文、编译版 PDF 与按章配套代码",
    category: "GitHub热点",
    date: "2026-08-01",
    readTime: "4 分钟阅读",
    coverBadge: "EP.125",
    coverTitle: "ai-agent-book",
    coverSubtitle: "ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1tZG36jEHe",
      title: "「Github一周热点125期」从零实现技术合集、离线蓝牙聊天、阿里代码审查Agent、AI Agent开源书和把书变成Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1tZG36jEHe",
      episode: 125,
    },
    content: "# ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践》\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 125 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践》** —— 《深入理解 AI Agent：设计原理与工程实践》（李博杰 著）开源主仓库：全书正文、编译版 PDF 与按章配套代码\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **55,135**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `bojieli/ai-agent-book` |\n\n5.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 125 期）\n\n第 125 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点125期》，BV 号 `BV1tZG36jEHe`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/bojieli/ai-agent-book.git\ncd ai-agent-book\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 ai-agent-book - 《深入理解 AI Agent：设计原理与工程实践》 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/bojieli/ai-agent-book\n- 原视频（第 125 期）：https://www.bilibili.com/video/BV1tZG36jEHe\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 125 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-125-book-to-skill",
    slug: "gh-125-book-to-skill",
    title: "book-to-skill - 把技术书变成Skill（125期 · 35,468 星）",
    summary: "《Github一周热点》第 125 期项目：book-to-skill - 把技术书变成Skill。Turn any technical book PDF into a Claude Code skill — ready to study, reference, and use while you work.",
    category: "GitHub热点",
    date: "2026-08-01",
    readTime: "4 分钟阅读",
    coverBadge: "EP.125",
    coverTitle: "book-to-skill",
    coverSubtitle: "book-to-skill - 把技术书变成Skill",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1tZG36jEHe",
      title: "「Github一周热点125期」从零实现技术合集、离线蓝牙聊天、阿里代码审查Agent、AI Agent开源书和把书变成Skill",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1tZG36jEHe",
      episode: 125,
    },
    content: "# book-to-skill - 把技术书变成Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 125 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**book-to-skill - 把技术书变成Skill** —— Turn any technical book PDF into a Claude Code skill — ready to study, reference, and use while you work.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **35,468**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `virgiliojr94/book-to-skill` |\n\n3.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 125 期）\n\n第 125 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点125期》，BV 号 `BV1tZG36jEHe`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/virgiliojr94/book-to-skill.git\ncd book-to-skill\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 book-to-skill - 把技术书变成Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/virgiliojr94/book-to-skill\n- 原视频（第 125 期）：https://www.bilibili.com/video/BV1tZG36jEHe\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 125 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-124-kimi-code",
    slug: "gh-124-kimi-code",
    title: "Kimi k3 - Kimi 最新旗舰模型（124期 · 7,946 星）",
    summary: "《Github一周热点》第 124 期项目：Kimi k3 - Kimi 最新旗舰模型。Kimi Code CLI  —  The Starting Point for Next-Gen Agents",
    category: "GitHub热点",
    date: "2026-07-25",
    readTime: "4 分钟阅读",
    coverBadge: "EP.124",
    coverTitle: "kimi-code",
    coverSubtitle: "Kimi k3 - Kimi 最新旗舰模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15s3K66EmB",
      title: "「Github一周热点124期」Kimi K3、AI网关、开源部署平台、反AI味设计Skill和人与Agent 协作工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15s3K66EmB",
      episode: 124,
    },
    content: "# Kimi k3 - Kimi 最新旗舰模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 124 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Kimi k3 - Kimi 最新旗舰模型** —— Kimi Code CLI  —  The Starting Point for Next-Gen Agents\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **7,946**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `MoonshotAI/kimi-code` |\n\n7,946 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 124 期）\n\n第 124 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点124期》，BV 号 `BV15s3K66EmB`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/MoonshotAI/kimi-code.git\ncd kimi-code\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Kimi k3 - Kimi 最新旗舰模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/MoonshotAI/kimi-code\n- 原视频（第 124 期）：https://www.bilibili.com/video/BV15s3K66EmB\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 124 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-124-omniroute",
    slug: "gh-124-omniroute",
    title: "OmniRoute - 免费 AI 网关与多模型路由代理（124期 · 78,959 星）",
    summary: "《Github一周热点》第 124 期项目：OmniRoute - 免费 AI 网关与多模型路由代理。Never stop coding. Free MIT AI gateway: one endpoint, 375 providers (150+ free), 1,400+ models Kimi, Claude, GPT, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline & Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 900+ contributors",
    category: "GitHub热点",
    date: "2026-07-25",
    readTime: "4 分钟阅读",
    coverBadge: "EP.124",
    coverTitle: "OmniRoute",
    coverSubtitle: "OmniRoute - 免费 AI 网关与多模型路由代理",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15s3K66EmB",
      title: "「Github一周热点124期」Kimi K3、AI网关、开源部署平台、反AI味设计Skill和人与Agent 协作工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15s3K66EmB",
      episode: 124,
    },
    content: "# OmniRoute - 免费 AI 网关与多模型路由代理\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 124 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OmniRoute - 免费 AI 网关与多模型路由代理** —— Never stop coding. Free MIT AI gateway: one endpoint, 375 providers (150+ free), 1,400+ models Kimi, Claude, GPT, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline & Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 900+ contributors\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **78,959**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `diegosouzapw/OmniRoute` |\n\n7.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 124 期）\n\n第 124 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点124期》，BV 号 `BV15s3K66EmB`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/diegosouzapw/OmniRoute.git\ncd OmniRoute\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OmniRoute - 免费 AI 网关与多模型路由代理 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/diegosouzapw/OmniRoute\n- 原视频（第 124 期）：https://www.bilibili.com/video/BV15s3K66EmB\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 124 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-124-openship",
    slug: "gh-124-openship",
    title: "Openship - 开源自托管部署平台（124期 · 14,868 星）",
    summary: "《Github一周热点》第 124 期项目：Openship - 开源自托管部署平台。Self-hosted deployment platform",
    category: "GitHub热点",
    date: "2026-07-25",
    readTime: "4 分钟阅读",
    coverBadge: "EP.124",
    coverTitle: "openship",
    coverSubtitle: "Openship - 开源自托管部署平台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15s3K66EmB",
      title: "「Github一周热点124期」Kimi K3、AI网关、开源部署平台、反AI味设计Skill和人与Agent 协作工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15s3K66EmB",
      episode: 124,
    },
    content: "# Openship - 开源自托管部署平台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 124 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Openship - 开源自托管部署平台** —— Self-hosted deployment platform\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **14,868**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `oblien/openship` |\n\n1.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 124 期）\n\n第 124 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点124期》，BV 号 `BV15s3K66EmB`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/oblien/openship.git\ncd openship\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Openship - 开源自托管部署平台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/oblien/openship\n- 原视频（第 124 期）：https://www.bilibili.com/video/BV15s3K66EmB\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 124 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-124-hallmark",
    slug: "gh-124-hallmark",
    title: "Hallmark - 反 AI 味设计 Skill（124期 · 30,450 星）",
    summary: "《Github一周热点》第 124 期项目：Hallmark - 反 AI 味设计 Skill。Anti-AI-slop design skill for Claude Code, Cursor, and Codex.",
    category: "GitHub热点",
    date: "2026-07-25",
    readTime: "4 分钟阅读",
    coverBadge: "EP.124",
    coverTitle: "hallmark",
    coverSubtitle: "Hallmark - 反 AI 味设计 Skill",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15s3K66EmB",
      title: "「Github一周热点124期」Kimi K3、AI网关、开源部署平台、反AI味设计Skill和人与Agent 协作工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15s3K66EmB",
      episode: 124,
    },
    content: "# Hallmark - 反 AI 味设计 Skill\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 124 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Hallmark - 反 AI 味设计 Skill** —— Anti-AI-slop design skill for Claude Code, Cursor, and Codex.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **30,450**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | CSS |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `Nutlope/hallmark` |\n\n3.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 124 期）\n\n第 124 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点124期》，BV 号 `BV15s3K66EmB`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Nutlope/hallmark.git\ncd hallmark\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 CSS，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Hallmark - 反 AI 味设计 Skill 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Nutlope/hallmark\n- 原视频（第 124 期）：https://www.bilibili.com/video/BV15s3K66EmB\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 124 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-124-buzz",
    slug: "gh-124-buzz",
    title: "Buzz - 人与 AI Agent 协作工作台（124期 · 36,188 星）",
    summary: "《Github一周热点》第 124 期项目：Buzz - 人与 AI Agent 协作工作台。A hive mind communication platform",
    category: "GitHub热点",
    date: "2026-07-25",
    readTime: "4 分钟阅读",
    coverBadge: "EP.124",
    coverTitle: "buzz",
    coverSubtitle: "Buzz - 人与 AI Agent 协作工作台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV15s3K66EmB",
      title: "「Github一周热点124期」Kimi K3、AI网关、开源部署平台、反AI味设计Skill和人与Agent 协作工作台",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV15s3K66EmB",
      episode: 124,
    },
    content: "# Buzz - 人与 AI Agent 协作工作台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 124 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Buzz - 人与 AI Agent 协作工作台** —— A hive mind communication platform\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **36,188**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `block/buzz` |\n\n3.6 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 124 期）\n\n第 124 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点124期》，BV 号 `BV15s3K66EmB`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/block/buzz.git\ncd buzz\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Buzz - 人与 AI Agent 协作工作台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/block/buzz\n- 原视频（第 124 期）：https://www.bilibili.com/video/BV15s3K66EmB\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 124 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-123-moss-transcribe-diarize",
    slug: "gh-123-moss-transcribe-diarize",
    title: "MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型（123期 · 2,191 星）",
    summary: "《Github一周热点》第 123 期项目：MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型。A 0.9B model for long-form transcription in 50+ languages with speaker diarization, timestamps, and acoustic event awareness",
    category: "GitHub热点",
    date: "2026-07-18",
    readTime: "4 分钟阅读",
    coverBadge: "EP.123",
    coverTitle: "MOSS-Transcribe-Diarize",
    coverSubtitle: "MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV11WNo6DErc",
      title: "「Github一周热点123期」最强多说话人 ASR 模型、并行Agent工作台、DESIGNMD集、AI交易Agent和健身动作数据集",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV11WNo6DErc",
      episode: 123,
    },
    content: "# MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 123 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型** —— A 0.9B model for long-form transcription in 50+ languages with speaker diarization, timestamps, and acoustic event awareness\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **2,191**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `OpenMOSS/MOSS-Transcribe-Diarize` |\n\n2,191 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 123 期）\n\n第 123 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点123期》，BV 号 `BV11WNo6DErc`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/OpenMOSS/MOSS-Transcribe-Diarize.git\ncd MOSS-Transcribe-Diarize\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 MOSS-Transcribe-Diarize - 长音频多说话人转写与分离模型 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/OpenMOSS/MOSS-Transcribe-Diarize\n- 原视频（第 123 期）：https://www.bilibili.com/video/BV11WNo6DErc\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 123 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-123-orca",
    slug: "gh-123-orca",
    title: "Orca - 并行 AI Agent 工作台（123期 · 99,674 星）",
    summary: "《Github一周热点》第 123 期项目：Orca - 并行 AI Agent 工作台。Orca is the place for working with a fleet of agents (e.g. Grok Bot, Claude Code). Run any coding agent with your own subscription. Available on desktop, mobile and remote runtime.",
    category: "GitHub热点",
    date: "2026-07-18",
    readTime: "4 分钟阅读",
    coverBadge: "EP.123",
    coverTitle: "orca",
    coverSubtitle: "Orca - 并行 AI Agent 工作台",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV11WNo6DErc",
      title: "「Github一周热点123期」最强多说话人 ASR 模型、并行Agent工作台、DESIGNMD集、AI交易Agent和健身动作数据集",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV11WNo6DErc",
      episode: 123,
    },
    content: "# Orca - 并行 AI Agent 工作台\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 123 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Orca - 并行 AI Agent 工作台** —— Orca is the place for working with a fleet of agents (e.g. Grok Bot, Claude Code). Run any coding agent with your own subscription. Available on desktop, mobile and remote runtime.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **99,674**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `stablyai/orca` |\n\n10.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 123 期）\n\n第 123 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点123期》，BV 号 `BV11WNo6DErc`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/stablyai/orca.git\ncd orca\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Orca - 并行 AI Agent 工作台 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/stablyai/orca\n- 原视频（第 123 期）：https://www.bilibili.com/video/BV11WNo6DErc\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 123 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-123-awesome-design-md",
    slug: "gh-123-awesome-design-md",
    title: "awesome-design-md - DESIGN.md 设计系统资源合集（123期 · 122,514 星）",
    summary: "《Github一周热点》第 123 期项目：awesome-design-md - DESIGN.md 设计系统资源合集。A collection of DESIGN.md files analysis by popular brand design systems. Drop one into your project and let coding agents generate a matching UI.",
    category: "GitHub热点",
    date: "2026-07-18",
    readTime: "4 分钟阅读",
    coverBadge: "EP.123",
    coverTitle: "awesome-design-md",
    coverSubtitle: "awesome-design-md - DESIGN.md 设计系统资源合集",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV11WNo6DErc",
      title: "「Github一周热点123期」最强多说话人 ASR 模型、并行Agent工作台、DESIGNMD集、AI交易Agent和健身动作数据集",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV11WNo6DErc",
      episode: 123,
    },
    content: "# awesome-design-md - DESIGN.md 设计系统资源合集\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 123 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**awesome-design-md - DESIGN.md 设计系统资源合集** —— A collection of DESIGN.md files analysis by popular brand design systems. Drop one into your project and let coding agents generate a matching UI.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **122,514**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | 未标注 |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `VoltAgent/awesome-design-md` |\n\n12.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 123 期）\n\n第 123 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点123期》，BV 号 `BV11WNo6DErc`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/VoltAgent/awesome-design-md.git\ncd awesome-design-md\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 未标注，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 awesome-design-md - DESIGN.md 设计系统资源合集 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/VoltAgent/awesome-design-md\n- 原视频（第 123 期）：https://www.bilibili.com/video/BV11WNo6DErc\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 123 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-123-vibe-trading",
    slug: "gh-123-vibe-trading",
    title: "Vibe-Trading - 个人 AI 交易 Agent（123期 · 36,039 星）",
    summary: "《Github一周热点》第 123 期项目：Vibe-Trading - 个人 AI 交易 Agent。\"Vibe-Trading: Your Personal Trading Agent\"",
    category: "GitHub热点",
    date: "2026-07-18",
    readTime: "4 分钟阅读",
    coverBadge: "EP.123",
    coverTitle: "Vibe-Trading",
    coverSubtitle: "Vibe-Trading - 个人 AI 交易 Agent",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV11WNo6DErc",
      title: "「Github一周热点123期」最强多说话人 ASR 模型、并行Agent工作台、DESIGNMD集、AI交易Agent和健身动作数据集",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV11WNo6DErc",
      episode: 123,
    },
    content: "# Vibe-Trading - 个人 AI 交易 Agent\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 123 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Vibe-Trading - 个人 AI 交易 Agent** —— \"Vibe-Trading: Your Personal Trading Agent\"\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **36,039**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `HKUDS/Vibe-Trading` |\n\n3.6 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 123 期）\n\n第 123 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点123期》，BV 号 `BV11WNo6DErc`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/HKUDS/Vibe-Trading.git\ncd Vibe-Trading\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Vibe-Trading - 个人 AI 交易 Agent 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/HKUDS/Vibe-Trading\n- 原视频（第 123 期）：https://www.bilibili.com/video/BV11WNo6DErc\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 123 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-123-exercises-dataset",
    slug: "gh-123-exercises-dataset",
    title: "exercises-dataset - 1324 个健身动作数据集（123期 · 23,087 星）",
    summary: "《Github一周热点》第 123 期项目：exercises-dataset - 1324 个健身动作数据集。1,324-exercise fitness dataset — animation GIFs, 180×180 thumbnails, muscle-group & equipment data, and step-by-step instructions in 6 languages. The exercise data layer behind the LogPress app.",
    category: "GitHub热点",
    date: "2026-07-18",
    readTime: "4 分钟阅读",
    coverBadge: "EP.123",
    coverTitle: "exercises-dataset",
    coverSubtitle: "exercises-dataset - 1324 个健身动作数据集",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV11WNo6DErc",
      title: "「Github一周热点123期」最强多说话人 ASR 模型、并行Agent工作台、DESIGNMD集、AI交易Agent和健身动作数据集",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV11WNo6DErc",
      episode: 123,
    },
    content: "# exercises-dataset - 1324 个健身动作数据集\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 123 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**exercises-dataset - 1324 个健身动作数据集** —— 1,324-exercise fitness dataset — animation GIFs, 180×180 thumbnails, muscle-group & equipment data, and step-by-step instructions in 6 languages. The exercise data layer behind the LogPress app.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **23,087**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | HTML |\n| 📜 开源协议 | NOASSERTION |\n| 📦 仓库 | `hasaneyldrm/exercises-dataset` |\n\n2.3 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 NOASSERTION，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 123 期）\n\n第 123 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点123期》，BV 号 `BV11WNo6DErc`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/hasaneyldrm/exercises-dataset.git\ncd exercises-dataset\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 HTML，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 exercises-dataset - 1324 个健身动作数据集 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/hasaneyldrm/exercises-dataset\n- 原视频（第 123 期）：https://www.bilibili.com/video/BV11WNo6DErc\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 123 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-ai-job-search",
    slug: "gh-122-ai-job-search",
    title: "ai-job-search - 基于 Claude Code 的 AI 求职工作流（122期 · 60,421 星）",
    summary: "《Github一周热点》第 122 期项目：ai-job-search - 基于 Claude Code 的 AI 求职工作流。The job search that runs on your machine. AI job application framework built on Claude Code: evaluate postings, tailor CVs, write cover letters, prep interviews. Fork it and own it.",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "ai-job-search",
    coverSubtitle: "ai-job-search - 基于 Claude Code 的 AI 求职工作",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# ai-job-search - 基于 Claude Code 的 AI 求职工作流\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**ai-job-search - 基于 Claude Code 的 AI 求职工作流** —— The job search that runs on your machine. AI job application framework built on Claude Code: evaluate postings, tailor CVs, write cover letters, prep interviews. Fork it and own it.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **60,421**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `MadsLorentzen/ai-job-search` |\n\n6.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/MadsLorentzen/ai-job-search.git\ncd ai-job-search\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 ai-job-search - 基于 Claude Code 的 AI 求职工作流 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/MadsLorentzen/ai-job-search\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-lujie-careerkit",
    slug: "gh-122-lujie-careerkit",
    title: "ai-job-search - 基于 Claude Code 的 AI 求职工作流（122期 · 383 星）",
    summary: "《Github一周热点》第 122 期项目：ai-job-search - 基于 Claude Code 的 AI 求职工作流。An AI-powered career workspace from resume editing to offer acceptance, covering resume editing, JD matching, application tracking, mock interviews, and interview review.",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "Lujie-Careerkit",
    coverSubtitle: "ai-job-search - 基于 Claude Code 的 AI 求职工作",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# ai-job-search - 基于 Claude Code 的 AI 求职工作流\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**ai-job-search - 基于 Claude Code 的 AI 求职工作流** —— An AI-powered career workspace from resume editing to offer acceptance, covering resume editing, JD matching, application tracking, mock interviews, and interview review.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **383**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `Chozzc/Lujie-Careerkit` |\n\n383 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Chozzc/Lujie-Careerkit.git\ncd Lujie-Careerkit\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 ai-job-search - 基于 Claude Code 的 AI 求职工作流 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Chozzc/Lujie-Careerkit\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-photogimp",
    slug: "gh-122-photogimp",
    title: "PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁（122期 · 18,420 星）",
    summary: "《Github一周热点》第 122 期项目：PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁。A Patch for GIMP 3+ for Photoshop Users",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "PhotoGIMP",
    coverSubtitle: "PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁** —— A Patch for GIMP 3+ for Photoshop Users\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **18,420**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | GPL-3.0 |\n| 📦 仓库 | `Diolinux/PhotoGIMP` |\n\n1.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 GPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Diolinux/PhotoGIMP.git\ncd PhotoGIMP\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 PhotoGIMP - 把 GIMP 改造成 Photoshop 风格的补丁 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Diolinux/PhotoGIMP\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-caveman",
    slug: "gh-122-caveman",
    title: "caveman - 让 AI Agent 少说废话的 skill/plugin（122期 · 113,851 星）",
    summary: "《Github一周热点》第 122 期项目：caveman - 让 AI Agent 少说废话的 skill/plugin。🪨 why use many token when few token do trick. Viral skill + proxy for coding agents that cuts 65% of tokens by talking like a caveman.",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "caveman",
    coverSubtitle: "caveman - 让 AI Agent 少说废话的 skill/plugin",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# caveman - 让 AI Agent 少说废话的 skill/plugin\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**caveman - 让 AI Agent 少说废话的 skill/plugin** —— 🪨 why use many token when few token do trick. Viral skill + proxy for coding agents that cuts 65% of tokens by talking like a caveman.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **113,851**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Go |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `JuliusBrussee/caveman` |\n\n11.4 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/JuliusBrussee/caveman.git\ncd caveman\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Go，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 caveman - 让 AI Agent 少说废话的 skill/plugin 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/JuliusBrussee/caveman\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-meetily",
    slug: "gh-122-meetily",
    title: "Meetily - 本地优先的 AI 会议助手（122期 · 31,976 星）",
    summary: "《Github一周热点》第 122 期项目：Meetily - 本地优先的 AI 会议助手。Privacy first, AI meeting assistant with 4x faster Parakeet/Whisper live transcription, speaker diarization, and Ollama summarization built on Rust. 100% local processing. no cloud required. Meetily (Meetly Ai - https://meetily.ai) is the #1 Self-hosted, Open-source Ai meeting note taker for macOS & Windows. Understand How to write meeting minutes",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "meetily",
    coverSubtitle: "Meetily - 本地优先的 AI 会议助手",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# Meetily - 本地优先的 AI 会议助手\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Meetily - 本地优先的 AI 会议助手** —— Privacy first, AI meeting assistant with 4x faster Parakeet/Whisper live transcription, speaker diarization, and Ollama summarization built on Rust. 100% local processing. no cloud required. Meetily (Meetly Ai - https://meetily.ai) is the #1 Self-hosted, Open-source Ai meeting note taker for macOS & Windows. Understand How to write meeting minutes\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **31,976**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Rust |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `Zackriya-Solutions/meetily` |\n\n3.2 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Zackriya-Solutions/meetily.git\ncd meetily\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Rust，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Meetily - 本地优先的 AI 会议助手 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Zackriya-Solutions/meetily\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-122-officecli",
    slug: "gh-122-officecli",
    title: "OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具（122期 · 32,230 星）",
    summary: "《Github一周热点》第 122 期项目：OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具。OfficeCLI is the first and best Office suite  purpose-built for AI agents to read, edit, and automate Word, Excel, and PowerPoint files. Free, open-source, single binary, no Office installation required.",
    category: "GitHub热点",
    date: "2026-07-11",
    readTime: "4 分钟阅读",
    coverBadge: "EP.122",
    coverTitle: "OfficeCLI",
    coverSubtitle: "OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1DEN46kEBS",
      title: "「Github一周热点122期」AI求职助手、Photoshop版GIMP、Agent省Token插件、本地会议助手和Office文档CLI",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1DEN46kEBS",
      episode: 122,
    },
    content: "# OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 122 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具** —— OfficeCLI is the first and best Office suite  purpose-built for AI agents to read, edit, and automate Word, Excel, and PowerPoint files. Free, open-source, single binary, no Office installation required.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **32,230**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | C# |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `iOfficeAI/OfficeCLI` |\n\n3.2 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 122 期）\n\n第 122 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点122期》，BV 号 `BV1DEN46kEBS`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/iOfficeAI/OfficeCLI.git\ncd OfficeCLI\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 C#，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OfficeCLI - 给 AI Agent 用的 Office 文档命令行工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/iOfficeAI/OfficeCLI\n- 原视频（第 122 期）：https://www.bilibili.com/video/BV1DEN46kEBS\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 122 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-121-deepspec",
    slug: "gh-121-deepspec",
    title: "DeepSpec - DeepSeek 的推理加速框架（121期 · 7,233 星）",
    summary: "《Github一周热点》第 121 期项目：DeepSpec - DeepSeek 的推理加速框架。DeepSpec: a full-stack codebase for training and evaluating speculative decoding algorithms",
    category: "GitHub热点",
    date: "2026-07-04",
    readTime: "4 分钟阅读",
    coverBadge: "EP.121",
    coverTitle: "DeepSpec",
    coverSubtitle: "DeepSpec - DeepSeek 的推理加速框架",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV19SMF67EoZ",
      title: "「Github一周热点121期」DeepSeek推理加速框架、Google设计记忆规范、AI投研技能包、AI渗透测试和免费开发者资源清单",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV19SMF67EoZ",
      episode: 121,
    },
    content: "# DeepSpec - DeepSeek 的推理加速框架\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 121 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**DeepSpec - DeepSeek 的推理加速框架** —— DeepSpec: a full-stack codebase for training and evaluating speculative decoding algorithms\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **7,233**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `deepseek-ai/DeepSpec` |\n\n7,233 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 121 期）\n\n第 121 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点121期》，BV 号 `BV19SMF67EoZ`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/deepseek-ai/DeepSpec.git\ncd DeepSpec\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 DeepSpec - DeepSeek 的推理加速框架 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/deepseek-ai/DeepSpec\n- 原视频（第 121 期）：https://www.bilibili.com/video/BV19SMF67EoZ\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 121 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-121-design-md",
    slug: "gh-121-design-md",
    title: "DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式（121期 · 28,428 星）",
    summary: "《Github一周热点》第 121 期项目：DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式。A format specification for describing a visual identity to coding agents. DESIGN.md gives agents a persistent, structured understanding of a design system.",
    category: "GitHub热点",
    date: "2026-07-04",
    readTime: "4 分钟阅读",
    coverBadge: "EP.121",
    coverTitle: "design.md",
    coverSubtitle: "DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV19SMF67EoZ",
      title: "「Github一周热点121期」DeepSeek推理加速框架、Google设计记忆规范、AI投研技能包、AI渗透测试和免费开发者资源清单",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV19SMF67EoZ",
      episode: 121,
    },
    content: "# DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 121 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式** —— A format specification for describing a visual identity to coding agents. DESIGN.md gives agents a persistent, structured understanding of a design system.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **28,428**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `google-labs-code/design.md` |\n\n2.8 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 121 期）\n\n第 121 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点121期》，BV 号 `BV19SMF67EoZ`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/google-labs-code/design.md.git\ncd design.md\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 DESIGN.md - 给 AI 编程 Agent 用的设计系统记忆格式 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/google-labs-code/design.md\n- 原视频（第 121 期）：https://www.bilibili.com/video/BV19SMF67EoZ\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 121 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-121-ai-berkshire",
    slug: "gh-121-ai-berkshire",
    title: "AI Berkshire - AI 时代的价值投资研究框架（121期 · 16,811 星）",
    summary: "《Github一周热点》第 121 期项目：AI Berkshire - AI 时代的价值投资研究框架。AI 时代的伯克希尔：基于 Claude Code / Codex 的价值投资研究框架。巴菲特·芒格·段永平·李录四大师方法论 + 多Agent并行研究。| AI-era Berkshire: a value investing research framework built for Claude Code / Codex. 4 masters' methodologies + multi-agent adversarial analysis.",
    category: "GitHub热点",
    date: "2026-07-04",
    readTime: "4 分钟阅读",
    coverBadge: "EP.121",
    coverTitle: "ai-berkshire",
    coverSubtitle: "AI Berkshire - AI 时代的价值投资研究框架",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV19SMF67EoZ",
      title: "「Github一周热点121期」DeepSeek推理加速框架、Google设计记忆规范、AI投研技能包、AI渗透测试和免费开发者资源清单",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV19SMF67EoZ",
      episode: 121,
    },
    content: "# AI Berkshire - AI 时代的价值投资研究框架\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 121 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**AI Berkshire - AI 时代的价值投资研究框架** —— AI 时代的伯克希尔：基于 Claude Code / Codex 的价值投资研究框架。巴菲特·芒格·段永平·李录四大师方法论 + 多Agent并行研究。| AI-era Berkshire: a value investing research framework built for Claude Code / Codex. 4 masters' methodologies + multi-agent adversarial analysis.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **16,811**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | HTML |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `xbtlin/ai-berkshire` |\n\n1.7 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 121 期）\n\n第 121 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点121期》，BV 号 `BV19SMF67EoZ`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/xbtlin/ai-berkshire.git\ncd ai-berkshire\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 HTML，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 AI Berkshire - AI 时代的价值投资研究框架 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/xbtlin/ai-berkshire\n- 原视频（第 121 期）：https://www.bilibili.com/video/BV19SMF67EoZ\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 121 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-121-strix",
    slug: "gh-121-strix",
    title: "Strix - 开源 AI 渗透测试 Agent（121期 · 70,424 星）",
    summary: "《Github一周热点》第 121 期项目：Strix - 开源 AI 渗透测试 Agent。Open-source AI penetration testing tool to find and fix your app’s vulnerabilities.",
    category: "GitHub热点",
    date: "2026-07-04",
    readTime: "4 分钟阅读",
    coverBadge: "EP.121",
    coverTitle: "strix",
    coverSubtitle: "Strix - 开源 AI 渗透测试 Agent",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV19SMF67EoZ",
      title: "「Github一周热点121期」DeepSeek推理加速框架、Google设计记忆规范、AI投研技能包、AI渗透测试和免费开发者资源清单",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV19SMF67EoZ",
      episode: 121,
    },
    content: "# Strix - 开源 AI 渗透测试 Agent\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 121 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Strix - 开源 AI 渗透测试 Agent** —— Open-source AI penetration testing tool to find and fix your app’s vulnerabilities.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **70,424**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | Apache-2.0 |\n| 📦 仓库 | `usestrix/strix` |\n\n7.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 Apache-2.0，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 121 期）\n\n第 121 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点121期》，BV 号 `BV19SMF67EoZ`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/usestrix/strix.git\ncd strix\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Strix - 开源 AI 渗透测试 Agent 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/usestrix/strix\n- 原视频（第 121 期）：https://www.bilibili.com/video/BV19SMF67EoZ\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 121 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-121-free-for-dev",
    slug: "gh-121-free-for-dev",
    title: "free-for-dev - 开发者免费服务清单（121期 · 139,855 星）",
    summary: "《Github一周热点》第 121 期项目：free-for-dev - 开发者免费服务清单。A list of SaaS, PaaS and IaaS offerings that have free tiers of interest to devops and infradev",
    category: "GitHub热点",
    date: "2026-07-04",
    readTime: "4 分钟阅读",
    coverBadge: "EP.121",
    coverTitle: "free-for-dev",
    coverSubtitle: "free-for-dev - 开发者免费服务清单",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV19SMF67EoZ",
      title: "「Github一周热点121期」DeepSeek推理加速框架、Google设计记忆规范、AI投研技能包、AI渗透测试和免费开发者资源清单",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV19SMF67EoZ",
      episode: 121,
    },
    content: "# free-for-dev - 开发者免费服务清单\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 121 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**free-for-dev - 开发者免费服务清单** —— A list of SaaS, PaaS and IaaS offerings that have free tiers of interest to devops and infradev\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **139,855**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | HTML |\n| 📜 开源协议 | 未标注 |\n| 📦 仓库 | `ripienaar/free-for-dev` |\n\n14.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 未标注，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 121 期）\n\n第 121 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点121期》，BV 号 `BV19SMF67EoZ`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/ripienaar/free-for-dev.git\ncd free-for-dev\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 HTML，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 free-for-dev - 开发者免费服务清单 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/ripienaar/free-for-dev\n- 原视频（第 121 期）：https://www.bilibili.com/video/BV19SMF67EoZ\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 121 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-120-openmontage",
    slug: "gh-120-openmontage",
    title: "OpenMontage – Agent 视频生产系统（120期 · 70,286 星）",
    summary: "《Github一周热点》第 120 期项目：OpenMontage – Agent 视频生产系统。World's first open-source, agentic video production system. 12 production pipelines, 100+ tools, 700+ agent skill and production-knowledge files. Turn your AI coding assistant into a full video production studio.",
    category: "GitHub热点",
    date: "2026-06-27",
    readTime: "4 分钟阅读",
    coverBadge: "EP.120",
    coverTitle: "OpenMontage",
    coverSubtitle: "OpenMontage – Agent 视频生产系统",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1eH7n68EUm",
      title: "「Github一周热点120期」Agent视频生产系统、用户名情报搜索工具、Agent联网冲浪工具、代码库记忆MCP和开源剪辑工具",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1eH7n68EUm",
      episode: 120,
    },
    content: "# OpenMontage – Agent 视频生产系统\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 120 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OpenMontage – Agent 视频生产系统** —— World's first open-source, agentic video production system. 12 production pipelines, 100+ tools, 700+ agent skill and production-knowledge files. Turn your AI coding assistant into a full video production studio.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **70,286**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | AGPL-3.0 |\n| 📦 仓库 | `calesthio/OpenMontage` |\n\n7.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 AGPL-3.0，使用前请留意协议条款。\n\n## 视频里怎么讲的（第 120 期）\n\n第 120 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点120期》，BV 号 `BV1eH7n68EUm`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/calesthio/OpenMontage.git\ncd OpenMontage\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OpenMontage – Agent 视频生产系统 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/calesthio/OpenMontage\n- 原视频（第 120 期）：https://www.bilibili.com/video/BV1eH7n68EUm\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 120 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-120-maigret",
    slug: "gh-120-maigret",
    title: "Maigret – 用户名情报搜索工具（120期 · 39,248 星）",
    summary: "《Github一周热点》第 120 期项目：Maigret – 用户名情报搜索工具。🕵️‍♂️ Collect a dossier on a person by username from 6K websites",
    category: "GitHub热点",
    date: "2026-06-27",
    readTime: "4 分钟阅读",
    coverBadge: "EP.120",
    coverTitle: "maigret",
    coverSubtitle: "Maigret – 用户名情报搜索工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1eH7n68EUm",
      title: "「Github一周热点120期」Agent视频生产系统、用户名情报搜索工具、Agent联网冲浪工具、代码库记忆MCP和开源剪辑工具",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1eH7n68EUm",
      episode: 120,
    },
    content: "# Maigret – 用户名情报搜索工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 120 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Maigret – 用户名情报搜索工具** —— 🕵️‍♂️ Collect a dossier on a person by username from 6K websites\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **39,248**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `soxoj/maigret` |\n\n3.9 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 120 期）\n\n第 120 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点120期》，BV 号 `BV1eH7n68EUm`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/soxoj/maigret.git\ncd maigret\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Maigret – 用户名情报搜索工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/soxoj/maigret\n- 原视频（第 120 期）：https://www.bilibili.com/video/BV1eH7n68EUm\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 120 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-120-agent-reach",
    slug: "gh-120-agent-reach",
    title: "Agent-Reach – 给 Agent 一键装上互联网能力（120期 · 100,272 星）",
    summary: "《Github一周热点》第 120 期项目：Agent-Reach – 给 Agent 一键装上互联网能力。Give your AI agent eyes to see the entire internet. Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.",
    category: "GitHub热点",
    date: "2026-06-27",
    readTime: "4 分钟阅读",
    coverBadge: "EP.120",
    coverTitle: "Agent-Reach",
    coverSubtitle: "Agent-Reach – 给 Agent 一键装上互联网能力",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1eH7n68EUm",
      title: "「Github一周热点120期」Agent视频生产系统、用户名情报搜索工具、Agent联网冲浪工具、代码库记忆MCP和开源剪辑工具",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1eH7n68EUm",
      episode: 120,
    },
    content: "# Agent-Reach – 给 Agent 一键装上互联网能力\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 120 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**Agent-Reach – 给 Agent 一键装上互联网能力** —— Give your AI agent eyes to see the entire internet. Read & search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **100,272**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | Python |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `Panniantong/Agent-Reach` |\n\n10.0 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 120 期）\n\n第 120 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点120期》，BV 号 `BV1eH7n68EUm`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/Panniantong/Agent-Reach.git\ncd Agent-Reach\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 Python，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 Agent-Reach – 给 Agent 一键装上互联网能力 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/Panniantong/Agent-Reach\n- 原视频（第 120 期）：https://www.bilibili.com/video/BV1eH7n68EUm\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 120 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-120-codebase-memory-mcp",
    slug: "gh-120-codebase-memory-mcp",
    title: "codebase-memory-mcp – 代码库记忆 MCP（120期 · 47,028 星）",
    summary: "《Github一周热点》第 120 期项目：codebase-memory-mcp – 代码库记忆 MCP。Local code intelligence for developers and AI agents. Connect code, docs and infrastructure in a persistent graph, with CBM Lens, MCP tools, agent integrations and change-aware test selection.",
    category: "GitHub热点",
    date: "2026-06-27",
    readTime: "4 分钟阅读",
    coverBadge: "EP.120",
    coverTitle: "codebase-memory-mcp",
    coverSubtitle: "codebase-memory-mcp – 代码库记忆 MCP",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1eH7n68EUm",
      title: "「Github一周热点120期」Agent视频生产系统、用户名情报搜索工具、Agent联网冲浪工具、代码库记忆MCP和开源剪辑工具",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1eH7n68EUm",
      episode: 120,
    },
    content: "# codebase-memory-mcp – 代码库记忆 MCP\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 120 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**codebase-memory-mcp – 代码库记忆 MCP** —— Local code intelligence for developers and AI agents. Connect code, docs and infrastructure in a persistent graph, with CBM Lens, MCP tools, agent integrations and change-aware test selection.\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **47,028**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | C |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `DeusData/codebase-memory-mcp` |\n\n4.7 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 120 期）\n\n第 120 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点120期》，BV 号 `BV1eH7n68EUm`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/DeusData/codebase-memory-mcp.git\ncd codebase-memory-mcp\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 C，属于编译型项目，通常需要对应的构建工具链。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 codebase-memory-mcp – 代码库记忆 MCP 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/DeusData/codebase-memory-mcp\n- 原视频（第 120 期）：https://www.bilibili.com/video/BV1eH7n68EUm\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 120 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
  {
    id: "gh-120-opencut",
    slug: "gh-120-opencut",
    title: "OpenCut – 开源剪辑工具（120期 · 95,487 星）",
    summary: "《Github一周热点》第 120 期项目：OpenCut – 开源剪辑工具。The open-source CapCut alternative",
    category: "GitHub热点",
    date: "2026-06-27",
    readTime: "4 分钟阅读",
    coverBadge: "EP.120",
    coverTitle: "OpenCut",
    coverSubtitle: "OpenCut – 开源剪辑工具",
    tags: ['我喜欢的'],
    episodeVideo: {
      bvid: "BV1eH7n68EUm",
      title: "「Github一周热点120期」Agent视频生产系统、用户名情报搜索工具、Agent联网冲浪工具、代码库记忆MCP和开源剪辑工具",
      author: "IT咖啡馆",
      url: "https://www.bilibili.com/video/BV1eH7n68EUm",
      episode: 120,
    },
    content: "# OpenCut – 开源剪辑工具\n\n> 📺 **出处**：本文属「GitHub 一周热点」专栏**第 120 期**，UP 主：**IT咖啡馆**。\n> 本期原视频已内嵌在正文上方，点击即可对照观看。\n\n---\n\n## 一句话是什么\n\n**OpenCut – 开源剪辑工具** —— The open-source CapCut alternative\n\n## 为什么火\n\n| 指标 | 实测值 |\n|---|---|\n| ⭐ GitHub 星标 | **95,487**（数据日期 2026-10-21，GitHub 官方 API 拉取） |\n| 🧩 主语言 | TypeScript |\n| 📜 开源协议 | MIT |\n| 📦 仓库 | `OpenCut-app/OpenCut` |\n\n9.5 万 星意味着它在同类项目里已经跑出了规模与关注度。开源协议 MIT，可自由商用与二次开发。\n\n## 视频里怎么讲的（第 120 期）\n\n第 120 期把它作为重点项目介绍。原视频：**IT咖啡馆**《Github一周热点120期》，BV 号 `BV1eH7n68EUm`，正上方播放器可直接看。\n\n## 怎么上手\n\n```bash\n# 克隆仓库\ngit clone https://github.com/OpenCut-app/OpenCut.git\ncd OpenCut\n\n# 看看它是什么\ncat README.md\n```\n\n按仓库 README 的说明装依赖、跑起来即可。主语言是 TypeScript，有成熟的包管理器生态，npm / pip / uv 任选其一即可。\n\n## 适合谁 / 不适合谁\n\n**适合**：正在找 OpenCut – 开源剪辑工具 这类方案、且希望用开源版本自己掌控数据与部署的人；喜欢先读 README 判断能不能吃下的工程师。\n\n**不适合**：需要开箱即用、零配置直接上生产的环境；不打算读文档、只想一键生成结果的用户。\n\n## 项目地址 + 原视频链接\n\n- 项目地址：https://github.com/OpenCut-app/OpenCut\n- 原视频（第 120 期）：https://www.bilibili.com/video/BV1eH7n68EUm\n\n---\n\n> 本篇为「GitHub 一周热点」专栏第 120 期的项目卡片。专栏索引：[GitHub 一周热点 · 逐期盘点](/github-trending/)",
  },
];
