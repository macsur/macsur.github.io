# CODE MATRIX (Kejilion / ZTTZ) 全生态架构审查与优化升级总方案

- **方案编制**：小安 (Codex / Gemini-3.8-flash-high)
- **审查基准**：`website/` 前端全栈、`z.sh` / `kejilion.sh` / `x.sh` 脚本体系、`sync_upstream.js` 同步引擎、云端 CI/CD 部署链、以及 2026-10-10 通过验收的安全审计底稿 (`SECURITY-AUDIT-2026-10-10.md`)
- **执行原则**：只出方案、零代码改动、不推提交；全局统筹、跨端联动、分阶推进
- **编制日期**：2026-10-10 23:26 ~ 23:36

---

## 目录
1. [执行概要与架构现状梳理](#1-执行概要与架构现状梳理)
2. [全生态痛点与问题清单 (跨端统一分级)](#2-全生态痛点与问题清单-跨端统一分级)
3. [逐条优化升级方案 (收益、成本与风险评估)](#3-逐条优化升级方案-收益成本与风险评估)
4. [安全审计整改并入排期安排](#4-安全审计整改并入排期安排)
5. [分阶段实施路线图 (Milestones & Acceptance Criteria)](#5-分阶段实施路线图-milestones--acceptance-criteria)

---

## 1. 执行概要与架构现状梳理

### 1.1 网站架构现状 (`website/`)
- **框架与构建**：Next.js 14.2 (App Router)，静态导出模式 (`output: 'export'`)，构建与包管理器全面跑在 Bun 1.3.14 之上。
- **页面与组件组织**：
  - 核心入口 `website/src/app/page.tsx` 承担了首页、Hero、终端演示、8 大应用市场展示、GitHub 乐园、彩蛋弹窗等多重职责，单文件代码量达 1,839 行，组件化拆分尚未完成。
  - Windows/WSL 专区 `website/src/app/windows/page.tsx` (402 行) 刚刚完成手风琴化改造与三列推荐橱窗，但内部数据与渲染逻辑较为集中。
- **数据组织链**：
  - 应用清单 (`appsData.ts`，~46KB) 与推荐清单 (`dailyRecommend.ts` / `easterEggData.ts` / `recommendManifest.json`) 为静态或编译前生成。
  - 构建预处理通过 `prebuild` 阶段执行 `bun fetch_vpngate.js && bun generate_daily_recommend.js` 注入动态数据。
- **主题系统与样式**：
  - 基于 Tailwind CSS 结合 `:root` 与 `html.light` CSS 变量切换黑夜（复刻 Google AI 科技深黑）与白天（顶级纯黑高对比）模式。
  - 首屏防闪烁通过 `layout.tsx` 内联脚本读取 `localStorage` 并在渲染前向 `<html>` 注入类名。
  - 存在全局 CSS 覆盖引发局部组件（如奶油黄浅底卡片内文字）对比度失效的历史教训。
- **静态资源与字体**：
  - 引入了 `LiuJianMaoCao-Regular.ttf` (约 4.7MB) 与 `GreatVibes-Regular.ttf` (约 354KB) 作为品牌签名艺术字体，字体体积偏大，存在首屏网络加载延迟风险。
  - 包含大量动态演示媒体 (`hero-terminal-demo.gif` / `.mp4`, `toolbox-ad.gif`)，直接挂在 `website/public/` 下通过 Cloudflare Pages 承载。

### 1.2 z.sh 脚本体系现状
- **单文件巨型结构**：
  - 脚本达 34,775 行，与上游 `kejilion.sh`、分发入口 `x.sh`、以及部署产物 `public/{z,x,kejilion}.sh` 保持全量同步。
  - 涵盖系统状态检测、LDNMP 建站环境、Docker 编排、BBR 调优、安全防火墙 (Fail2ban)、OpenClaw 智能体运维及 160+ 款软件安装。
- **更新与自存机制**：
  - 具备 `zttz-safe-update` / `z update` 机制，支持先写入临时文件、校验 SHA256 与 `bash -n` 语法后原子替换，并具备版本对比与本地守护回滚能力。
- **z-apps 生态与扩展性**：
  - 实现了 `z app <编号/代号>` 调度引擎，优先检索 `~/z-apps/<app>.conf`，未命中时无缝 fallback 到官方编号直达，兼顾了自建生态与官方软件库。
  - 支持 `z app sync` 远端拉取 Git 配置库，具备基本的断网防护。
- **与上游的关系**：
  - 通过 `sync_upstream.js` 作为上游跟随与修补管线，在拉取官方最新版后，执行 12 项 AST/正则补丁（包括关闭数据上报 `send_stats()`、品牌字样替换、注入分类折叠菜单、以及平台框架约束）。
  - 上游维护属于“外挂注入式跟随”，一旦上游核心函数名或锚点大幅重构，补丁管线存在失配断裂风险。
- **跨平台支持**：
  - 具备 `z_platform_detect`：针对 macOS 输出友好警示与非 Linux 引导；针对 Windows 原生 CMD/PowerShell 拦截并强制引导 WSL。

### 1.3 生态联动现状 (统筹难点)
- **品牌与编号直达**：网站前台应用卡片与 CLI `z app <ID>` 直达完全映射，用户在网页上看到编号即可直接在终端运行。
- **双端发布不同步**：网站部署由 GitHub Actions (`muse-deploy.yml`) 监听 `source` 分支触发，静态生成导出至 `main` 分支由 Cloudflare Pages 与 GitHub Pages 接管；而 CLI 脚本分发通过 Cloudflare 读取 `zttz.eu.org/z.sh`。目前虽共用同一个 GitHub 仓库，但缺乏端到端版本冻结与灰度机制。

---

## 2. 全生态痛点与问题清单 (跨端统一分级)

本清单打破端与端的界限，将网站、CLI 脚本及联动链路中的架构缺陷统一梳理并按技术影响与用户风险进行分级：

| 编号 | 影响级别 | 领域 | 问题简述 | 架构隐患与痛点分析 |
| :--- | :---: | :---: | :--- | :--- |
| **P1-01** | **High** | 部署/安全 | 生产环境缺少标准安全响应头与 CSP (对应 [LOW-02]) | 站点部署完全静态化导出，目前 `next.config.mjs` 中未配置 HTTP Headers，Cloudflare 亦未声明 CSP、HSTS、X-Frame-Options，存在点击劫持与协议降级风险。 |
| **P1-02** | **High** | 网站/性能 | 中文字体文件过大 (4.7MB) 阻塞渲染 | `LiuJianMaoCao-Regular.ttf` 高达 4.7MB，在弱网或移动端未完成下载时会导致文字跳闪 (FOIT/FOUT)，严重拖慢首屏 LCP 指标。 |
| **P1-03** | **High** | CLI/维护 | 3.5 万行单文件脚本依赖字符串替换打补丁 | `sync_upstream.js` 依赖大量精确字符串和正则表达式对 `officialCode` 进行注入。上游原版轻微重构可能导致补丁静默失败或污染脚本。 |
| **P2-01** | **Medium** | 网站/架构 | `page.tsx` 单文件过大 (1,839 行) 严重缺乏组件解耦 | 首页聚集了导航、终端模拟、8 大分类手风琴、GitHub 乐园、节日彩蛋，状态变量混杂，任何小修改都极易引发全量重渲染或样式退化。 |
| **P2-02** | **Medium** | 网站/安全 | 首屏主题脚本使用 `dangerouslySetInnerHTML` (对应 [MED-01]) | `layout.tsx` 中防闪烁代码直接使用危险 React API 注入 script 标签，破坏 CSP 规范并埋下注入风险。 |
| **P2-03** | **Medium** | 网站/样式 | 主题系统 `html.light` 全局规则穿透与局部冲突 | 顶层 `html.light` 对全站文字强设深色，导致嵌套在浅色背景（如专区、警告框、特定强调卡片）中的特定文本丢失对比度。 |
| **P2-04** | **Medium** | CLI/联动 | `z-apps` 配置缺乏本地完整性校验与签名 | `~/z-apps/*.conf` 采用直接 `source` (`. "$conf_path"`) 模式载入执行，若远端仓库被污染或本地被非特权篡改，缺乏哈希或语法防御。 |
| **P2-05** | **Medium** | CLI/健壮性 | 更新时依赖单一主域名 `zttz.eu.org` 分发 | CLI 脚本中的更新源若遇 CDN 阻断或 DNS 污染，缺少自动化多源镜像 Fallback 列表，导致客户端断流。 |
| **P3-01** | **Low** | 网站/安全 | 外链缺少统一的 `rel="noopener noreferrer"` (对应 [LOW-01]) | 专区和推荐页多个 `target="_blank"` 散落写在各处，缺乏统一的外链封装组件。 |
| **P3-02** | **Low** | 网站/构建 | `prebuild` 外部网络数据抓取无缓存回退容灾 | `fetch_vpngate.js` 每次构建全量拉取，若上游源波动容易拖慢 CI 构建时长甚至中断构建流程。 |
| **P3-03** | **Low** | 生态/体验 | 网站与 CLI 的版本语义化 (SemVer) 未对齐 | 网站版本为 `0.1.0`，CLI 脚本版本跟随上游 `4.5.10`，用户难以在前端直观获知当前 CLI 的融合版本演进代号。 |

---

## 3. 逐条优化升级方案 (收益、成本与风险评估)

### 3.1 方案 A (对应 P1-01, 安全): 静态部署端补齐安全响应头与 CSP
- **方案描述**：
  在 Cloudflare Pages 部署目录中生成 `_headers` 文件，或在 `next.config.mjs` 中补充 `headers()` 规则：
  - 强制 `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - 强制 `X-Content-Type-Options: nosniff`
  - 强制 `X-Frame-Options: SAMEORIGIN`
  - 针对外部 CDN 资源与内联样式配置合理宽松但有效的 `Content-Security-Policy`。
- **预期收益**：彻底消除 [LOW-02] 安全隐患，防御点击劫持与 MIME 嗅探，提升站点安全评级至 A+。
- **实施成本**：极低（仅需编写 `website/public/_headers` 并在 `next.config.mjs` 配置）。
- **潜在风险**：CSP 规则若过于严苛可能拦截 `canvas-confetti` 或 Google Fonts 脚本；需经过完整构建预览测试。

### 3.2 方案 B (对应 P1-02, 性能): 中文字体字体子集化 (Font Subsetting) 与格式现代优化
- **方案描述**：
  `LiuJianMaoCao-Regular.ttf` 仅用于网站特定品牌口号与 Hero Slogan（如“用代码 · 爱上Linux”及特定字样），无需携带全量数万汉字。使用 `glyphhanger` 或 `fontmin` 工具提取全站涉及的字符，生成裁剪后的 `woff2` 格式字体：
  - 将 4.7MB 的 TTF 体积精简至 50KB 以内（压缩率 > 98%）。
  - 配置 `font-display: swap`，消除字体加载带来的网络阻塞。
- **预期收益**：网站首屏静态资源包体积骤减 4.5MB 以上，FCP 与 LCP 指标提升 40%~60%，极速省流。
- **实施成本**：低（编写一次性提取脚本，产出 `.woff2` 并更新 `globals.css`）。
- **潜在风险**：若后续在未收录字符的文本上使用了 `.brand-script` 类，中文字符将退化至系统默认手写/楷体字体；需在提取清单中预留常用备选字符。

### 3.3 方案 C (对应 P1-03, CLI): 构建脚本 AST/模块化补丁流水线
- **方案描述**：
  将 `sync_upstream.js` 中大段硬编码的正则与字符串拼接重构为基于模块划分的补丁链：
  - 将 ZTTZ 专属逻辑拆为清晰的独立模组文件（如 `scripts/patches/z_menu.sh`、`scripts/patches/z_apps.sh`、`scripts/patches/debrand.js`）。
  - 建立“补丁断言机制”：在执行替换前，显式校验锚点唯一性；若上游变动导致锚点失效，立即报警中断而非静默产出半成品。
  - 保留单文件分发的产物形态（确保用户 `curl -sL ... | bash` 体验不变），但在工程源码侧实现模块化解耦。
- **预期收益**：降低与上游长期同步的维护心智负担，彻底消除断裂风险，提高新特性注入的可靠性。
- **实施成本**：中等（重构 `sync_upstream.js`，建立补丁回归测试）。
- **潜在风险**：无破坏性风险；产物依然是单一自包含可执行 Shell。

### 3.4 方案 D (对应 P2-01, 架构): 网站组件化解耦与原子化重构
- **方案描述**：
  将 `website/src/app/page.tsx` 按业务领域自顶向下拆解：
  - `components/hero/HeroTerminal.tsx`：终端动画演示与安装一键复制
  - `components/market/AppAccordion.tsx`：8 大分类手风琴应用列表
  - `components/trending/TrendingSection.tsx`：GitHub 乐园与每日热榜深度解析
  - `components/modal/EasterEggModal.tsx`：彩蛋数据与烟花动效
  - 页面保留纯布局组织与服务端/静态数据注入。
- **预期收益**：解决代码膨胀，多人或多轮对话迭代时改动范围聚焦，提升编译速度与维护可读性。
- **实施成本**：中等（需要细致梳理 Props 传递与状态提升）。
- **潜在风险**：重构过程中需防范样式类名遗漏或父子组件 Hydration 状态不一致。

### 3.5 方案 E (对应 P2-02, 安全): 规范化主题初始化并移除 `dangerouslySetInnerHTML`
- **方案描述**：
  响应安全审计报告 [MED-01] 建议：
  - 将 `themeInitScript` 提取为 `website/public/theme-init.js` 静态文件。
  - 在 `layout.tsx` 的 `<head>` 中通过标准的 `<script src="/theme-init.js" strategy="beforeInteractive" />` 加载。
- **预期收益**：彻底消除 React 注入点风险，杜绝动态拼接隐患，代码整洁度显著提高。
- **实施成本**：极低。
- **潜在风险**：需验证外部独立脚本在静态导出模式下是否会引发极短暂的白屏/黑屏闪烁（FOUC）；必要时配合极轻量的 CSS 变量内联默认值保证零闪烁。

### 3.6 方案 F (对应 P2-03, 样式): 语义化 CSS 变量重构与局部主题作用域隔离
- **方案描述**：
  吸取今日 `html.light` 强行覆盖奶油黄底色卡片的教训：
  - 废弃针对通用标签的全局粗暴颜色覆盖（如 `html.light div` / `html.light p`），全面转向语义化 Tailwind 变量（如 `text-theme-primary`、`bg-theme-card`）。
  - 为特殊着色卡片（如推荐位橱窗、黄色警告牌）设立独立的作用域类 `.theme-preserve` 或利用 CSS 作用域局部重置 `--text-color`，使卡片不受全局昼夜反转规则的破坏。
- **预期收益**：一劳永逸解决昼夜模式下的局部文字对比度崩坏问题，避免反复微调与截图采样。
- **实施成本**：中等（重构 `globals.css` 并对相关卡片做针对性测试）。
- **潜在风险**：需在浅色和深色模式下全面回归各专区卡片。

### 3.7 方案 G (对应 P2-04 & P2-05, CLI): CLI 更新多镜像源熔断与配置安全沙箱
- **方案描述**：
  - **更新多源镜像回退**：在 `z.sh` 的 `zttz_safe_update` 中预设 CDN 备用地址池（`zttz.eu.org`、`cdn.jsdelivr.net`、`raw.githubusercontent.com`、`ghproxy.net`），按超时与校验状态自动轮询切换。
  - **应用配置防御**：在 `z app` 加载 `~/z-apps/*.conf` 之前，执行静态安全检测（禁止出现 `rm -rf /` 或不合规命令），对配置语法执行 `bash -n` 校验后再行载入。
- **预期收益**：保障极端网络条件下的脚本高可用，杜绝配置损坏导致的执行崩溃。
- **实施成本**：低。
- **潜在风险**：配置校验过严可能影响部分复杂自定义 Shell 脚本的执行灵活性。

### 3.8 方案 H (对应 P3-01, 安全): 封装统一的外链安全跳转组件 `ExternalLink`
- **方案描述**：
  对应安全审计 [LOW-01]：
  - 创建 `components/common/ExternalLink.tsx`，默认自带 `target="_blank"` 和 `rel="noopener noreferrer"`。
  - 全站替换现有的裸 `<a>` 标签跳转。
- **预期收益**：代码复用率提高，彻底防范 Tabnabbing 风险。
- **实施成本**：低。
- **潜在风险**：无。

---

## 4. 安全审计整改并入排期安排

将 2026-10-10 验收通过的 `SECURITY-AUDIT-2026-10-10.md` 发现项完整并入本优化升级总方案的实施序列：

| 审计发现项 | 等级 | 对应总方案模块 | 实施阶段 | 验收检验方式 |
| :--- | :---: | :--- | :--- | :--- |
| **[MED-01]** 首屏防闪烁脚本使用 `dangerouslySetInnerHTML` | Medium | 方案 E (规范化主题初始化) | **第一阶段 (Phase 1)** | 检查 `layout.tsx`，消除危险 API，核验首屏无 FOUC 闪烁。 |
| **[LOW-01]** 外部链接缺少 `noopener noreferrer` 防护 | Low | 方案 H (封装 ExternalLink 组件) | **第一阶段 (Phase 1)** | 自动化脚本检索全站 `target="_blank"`，确认 `rel` 属性 100% 覆盖。 |
| **[LOW-02]** 线上 HTTP 安全响应头缺失 (CSP/HSTS) | Low | 方案 A (静态部署端补齐响应头) | **第一阶段 (Phase 1)** | 线上 `curl -I https://zttz.eu.org` 实测验证 Header 齐全且合规。 |

---

## 5. 分阶段实施路线图 (Milestones & Acceptance Criteria)

### 阶段一：安全加固与体验急救 (Phase 1: Quick Wins & Security Baseline)
- **改动范围**：
  1. 实施 **方案 E**：将首屏防闪烁脚本外置，清除 `dangerouslySetInnerHTML` ([MED-01])。
  2. 实施 **方案 H**：封装 `ExternalLink` 组件，统一修补外链 `rel` 属性 ([LOW-01])。
  3. 实施 **方案 A**：配置 `_headers` 补充 CSP、HSTS、防点击劫持安全响应头 ([LOW-02])。
  4. 实施 **方案 B**：完成 `LiuJianMaoCao-Regular.ttf` 中文字体裁剪子集化，替换为轻量级 `.woff2`。
- **目标与收益**：
  - 100% 解决全部已知安全审计问题；
  - 首页网络传输量直降 4.5MB，显著优化弱网加载体验。
- **验收标准**：
  - `bun run build` 成功，构建产物大小显著下降；
  - 源码静态扫描 `dangerouslySetInnerHTML` 计数清零；
  - 外部链接安全属性覆盖率 100%；
  - 首屏视觉渲染无白屏/闪烁现象。

---

### 阶段二：样式架构解耦与 CLI 健壮性增强 (Phase 2: UI Decoupling & CLI Hardening)
- **改动范围**：
  1. 实施 **方案 F**：重构 `globals.css` 主题规则，隔离特殊卡片文字对比度，消除 `html.light` 粗暴污染。
  2. 实施 **方案 G**：在 `z.sh` 中加入更新多源轮询与 `z-apps` 配置完整性预检。
  3. 统一发布校验：在 GitHub Actions `muse-deploy.yml` 中加入对 `z.sh.sha256` 及生成产物的严格一致性断言。
- **目标与收益**：
  - 彻底终结日夜模式对比度回退的痛点，UI 表现稳健；
  - CLI 客户端更新高可用容灾能力提升。
- **验收标准**：
  - Windows/WSL 专区及推荐卡片在深色、浅色模式下，文本像素采样对比度均达到 WCAG AA 级以上；
  - 模拟断网/解析失败场景下，`z update` 能自动切换镜像源完成校验。

---

### 阶段三：全栈深度模块化与长期生态治理 (Phase 3: Deep Modularization & Ecosystem Architecture)
- **改动范围**：
  1. 实施 **方案 D**：对 `website/src/app/page.tsx` 执行组件化拆分（拆离 Hero、手风琴、热榜等模块）。
  2. 实施 **方案 C**：重构 `sync_upstream.js`，实现补丁模块化与断言守护引擎。
  3. 生态对齐：在网站前台显式展示当前融合脚本版本代号与更新日志，形成 Web 与 Terminal 的无缝共振。
- **目标与收益**：
  - 消除单文件超千行巨型代码债务，提升维护效能；
  - 降低未来上游同步的断裂风险，建立长期可持续进化的技术底座。
- **验收标准**：
  - `page.tsx` 主干代码缩减至 300 行以内，各子组件具备清晰职责；
  - `sync_upstream.js` 补丁流水线通过所有自动化断言测试，上游代码融入零异常。

---
*本方案遵照 Muse 交办要求，只做全生态架构审查与路线规划，未修改任何生产业务逻辑代码，供值班验收与后续决策排期。*
