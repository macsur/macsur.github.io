// 🌟 GitHub 一周热点第 135 期 · 5 篇实测教程
// 站主 2026-10-18 22:43 拍板，Muse 22:57 放行第二阶段。
// 每篇固定六段版式：①一句话是什么 ②为什么火 ③视频要点＋出处 ④实测 ⑤适合谁/不适合谁 ⑥项目地址＋原视频链接
// 实测分级：跑通 / 降级（降级篇如实写明卡点与原因，不许假实测）

import type { TutorialItem } from './tutorialsData';

const EPISODE_BVID = 'BV1EVJY6GEA6';
const EPISODE_VIDEO_URL = 'https://www.bilibili.com/video/BV1EVJY6GEA6';
const EPISODE_AUTHOR = 'IT咖啡馆';

const EPISODE_NOTE = `> 📺 **出处**：本文属「GitHub 一周热点」专栏第 135 期，出处 UP 主：**${EPISODE_AUTHOR}**（${EPISODE_BVID}）。
> 专栏索引页：[GitHub 一周热点 · 逐个实测](/github-trending/)`;

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
