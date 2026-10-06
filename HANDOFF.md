# 🤝 交班记录与后续开发交接指南 (HANDOFF.md)

> **致接手助手 Muse AI / Antigravity**：
> 本文档旨在接手本仓库时能够零上下文损失、无缝推进项目。请在开始任何操作前**完整阅读本文档**，特别是其中的 **🚨 绝对铁律**。

---

## 1. 🚨 必须绝对遵守的开发与推送铁律 (最高优先级)

> ⚠️ **【重要基础设施例外记录 (2026-10-06)】**：
> GitHub 平台硬性规定：`repository_dispatch` 事件触发时，必定仅运行**默认分支 (`main`)** 下定义的 workflow。
> 因此，在前端从 npm 彻底迁移至 Bun 1.3.14 期间，对 `main` 只读铁律进行了**唯一一次性基础设施例外同步**：将新版支持 Bun 的 `.github/workflows/muse-deploy.yml` 单独同步更新至 `main` 分支，以确保 `update-website` 调度命令在云端不因寻找已废弃的 `package-lock.json` 崩溃停摆。除此基础设施 workflow 文件维护外，所有业务开发与代码提交依然严格**100% 只推 `source` 分支**。

1. **只推 `source` 分支，绝不动 `main` 分支**：
   - 用户的个人开发仓库是 **`macsur/macsur.github.io`**。
   - `macsur.github.io` 的 **`main` 分支是云端 GitHub Actions 编译产物的专属只读发布分支**！
   - 本地的所有代码提交、特性更新、维护脚本，**一律只 push 到 `source` 分支** (`git push macsur source`)。
   - 严禁向 `main` 分支直接执行 `git push`，彻底杜绝与 Actions 自动化构建产物发生冲突覆盖。
2. **绝对严禁向 `origin` (`kejilion/sh.git`) 推送**：
   - `origin` 是上游原作者的只读参考仓库，不是用户的仓库。当前本地已将 `origin push` 设为 `DISABLED_DO_NOT_PUSH_UPSTREAM`，切勿修改其配置。
3. **站点核心架构与域名**：
   - 站点主域名已于 **2026-10-07** 正式迁移为：`https://zttz.eu.org`。
   - Cloudflare Pages 项目：`macsur-github-io`，Pages 已绑定 `zttz.eu.org` 且部署验证通过。
   - 历史域名 `https://x.zttz.eu.org` 只作为旧链接兼容入口，需在 Cloudflare 配置 301 跳转到根域名：`https://zttz.eu.org/*`；`www.zttz.eu.org/*` 同样 301 到根域名；`dy.zttz.eu.org` 不动。
   - 源码主力分支：`source` 分支。
   - 云端通过 GitHub Actions（`muse-deploy.yml` 监听 `push: source` 或 `repository_dispatch: update-website`）以及每日北京时间 03:00 (UTC 19:00) 定时自动抓取热榜、打新构建并发布到 `main`。
4. **Cloudflare Pages 部署提示**：
   - Cloudflare Pages 偶发部署卡在 `queued` 状态，调用 retry 接口（`POST /pages/projects/{project}/deployments/{id}/retry`）即可救活完成上线。

---

## 2. 核心架构与演进总结

### 🌐 主域名迁移完成：`zttz.eu.org` 成为唯一主推域名 (2026-10-07)
1. **迁移结果与终验状态**：
   - 代码提交 `12cb6f7 chore(website): switch primary domain to zttz.eu.org` 已将公开代码和文档里的主域名统一从 `x.zttz.eu.org` 切换为 `zttz.eu.org`。
   - GitHub Actions / Pages 部署已成功，`https://zttz.eu.org` 打开正常。
   - 首页标题、Hero 广告、副标题、安装命令、footer、metadata、彩蛋数据、`README.md`、`website/public/README.md`、`website/public/CNAME` 均已切到新域名。
   - `https://zttz.eu.org/x.sh` 已验证可达，脚本正常。
2. **标准安装命令（新文档只推荐这一条）**：
   ```bash
   bash <(curl -sL https://zttz.eu.org/x.sh)
   ```
3. **旧链接兼容策略**：
   - `x.zttz.eu.org` 不再作为主推域名，只作为旧教程、旧截图、旧转发链接的兼容入口。
   - Cloudflare 需保留/配置 301：`x.zttz.eu.org/*` → `https://zttz.eu.org/*`，`www.zttz.eu.org/*` → `https://zttz.eu.org/*`。
   - 旧安装命令 `curl -sL` 带 `-L`，会自动跟随 301，因此历史教程不会断。
4. **本次改动涉及关键文件**：
   - `README.md`
   - `website/public/README.md`
   - `website/public/CNAME`
   - `website/src/app/layout.tsx`
   - `website/src/app/page.tsx`
   - `website/src/data/easterEggData.ts`
   - `website/fetch_vpngate.js`（重要：构建时会重写 `easterEggData.ts`，必须同步这里）
   - `render_demo.py`

### 🧾 README 与 Bun 工具链文档同步 (2026-10-07)
1. **文档标题统一**：
   - 根 `README.md` 与 `website/public/README.md` 的标题 slogan 已统一为：`一条命令，整备一台服务器`，与网站首页 Hero 主标题一致。
2. **Bun.sh 文档补齐**：
   - `README.md` 增加 Bun 1.3.14 badge 与 Bun 工具链收益说明。
   - `website/public/README.md` 已同步同款 Bun badge 与“自动化流水线与代码工程”说明。
3. **npm 锁文件清理**：
   - 提交 `3319c5e docs: document Bun toolchain benefits` 已删除 `website/package-lock.json`，`.gitignore` 已忽略 `package-lock.json` 与 `website/package-lock.json`。
   - `website/bun.lock` 是唯一锁文件来源。

### 🎨 Hero 品牌广告与中文字体修复 (2026-10-07)
1. **广告位置最终版**：
   - 品牌创意广告从“常用指令网格左上”移动到 Hero 区，信息流固定为：徽章 → 主标题 → 广告语轮播 → 品牌创意广告 → 副标题 → 终端安装卡。
   - 常用指令网格已恢复原样，`k` 回到第一位，8 张指令卡按原顺序展示。
   - 右侧 terminal demo 卡保持原位置不动。
2. **广告素材中文方框乱码修复**：
   - 远端 `source` 已合入 `823c1d1` 与 `3a1adcb`，分别重新生成 `toolbox-ad.gif` 与 `toolbox-ad-square.gif`，使用 CJK 字体修复中文 tofu 方框。
   - 后续如再改 GIF 素材，务必显式使用中文字体渲染，不能依赖默认英文字体。

### 🚀 前端工具链全面升级为 Bun 1.3.14 与首屏性能优化 (2026-10-06)
1. **全面引入 Bun 统一开发与构建工具链**：
   - 确立 **Bun 1.3.14** 作为网站前端（`website/`）及后台辅助脚本的统一运行时与包管理器。
   - **锁文件统一策略**：彻底废弃并移除 `package-lock.json`，确立 **`website/bun.lock`** 为唯一可信源（SSOT），并在 `.gitignore` 中忽略 `package-lock.json` 杜绝死灰复燃。
   - **版本固定**：在 `website/.bun-version` 中写入 `1.3.14`，保持团队与环境一致。
   - **CI/CD 注意事项 (重要)**：远端 GitHub Actions 工作流（如 `muse-deploy.yml`）需配合将 `setup-node` 调整为 `oven-sh/setup-bun@v1` (版本 `1.3.14`)，并将命令切换为 `bun install --frozen-lockfile` 与 `bun run build`，避免因缺少 `package-lock.json` 导致构建报错。
2. **性能与代码优化落地**：
   - **预构建脚本原生化**：`website/package.json` 的 `prebuild` 脚本从 `node` 切换为原生 `bun fetch_vpngate.js && bun generate_daily_recommend.js`，实现全流程由 Bun 单一引擎贯穿。
   - **首屏 JS 体积大幅瘦身 (动态按需导入)**：将原本在首屏静态打包的 `canvas-confetti` 礼花特效库改为 `fireConfetti()` 动态按需加载（Dynamic Import）。
   - **实测成效**：首屏首页体积由 **38.8 kB 骤降至 34.9 kB**（瘦身 ~10%），First Load JS 降至 **122 kB**，进一步拉升首屏秒开体验。

### 8 核心分类矩阵与【H】第三方生态标准 (A~H 全纳版)
- 将应用市场划分为 8 核心分类矩阵（A~H），官方内置 128 款与本地第三方扩展深度融合：
  - `A`: ⭐ 热门开源 TOP10 (10 款，官方顶流热榜 A1~A10)
  - `B`: 🖥️ 服务器运维与探针监控 (29 款)
  - `C`: 🤖 人工智能与前沿大模型 (14 款)
  - `D`: 🌐 网络代理与穿透组网 (15 款)
  - `E`: 🗄️ 私有网盘与数据存储 (14 款)
  - `F`: 🎬 影音媒体与离线下载 (14 款)
  - `G`: 📝 协作办公与实用工具 (32 款)
  - `H`: 📦 第三方与社区扩展应用 (41+ 款，动态扫描 `~/apps/*.conf`，支持代号直装、文件名粘贴直装与 `+` 添加向导)
- **终端 CLI (`apps_manager.sh`) 落地规范**：
  1. H 分类在手风琴条中带有专属 `[本地]` 高亮标签，与 A~G 官方预置应用形成视觉分界；
  2. 终端标题精简定格为：`🚀 Kejilion 应用市场 · 8 大分类`（彻底清理了旧的 118+ 遗留字样）；
  3. 三条安装入口并存：输入 `H+数字`（如 `H1`）安装；直接输入/粘贴应用文件名（如 `kpanel` 或 `kpanel.conf`）通过 Fallback 直达安装；历史 `J*` 代号 100% 兼容；
  4. 空状态优化：本地未配置 `.conf` 时显示 `[暂无本地配置]`，展开后显示“`暂无本地第三方应用，输入 [+] 可快速添加，或访问开发者生态获取`”。
- **网站端 (`website/`) 分工原则**：
  1. 网站负责种草展示，终端负责实际安装；
  2. H 分类卡片标注 `EXT` 与 `示例展示` 标签，顶部带有引导提示条；
  3. 卡片底部统一为 `终端指令: k app`，提供「终端安装」一键复制动作，杜绝误导。

### 视觉打磨、移动端修复与极简定音 (2026-10-05 ~ 2026-10-06)
1. **安装源标签极致精简**：
   - 首屏终端安装框三项切换标签去掉多余的“链”字，全面定格为极简短语：`🌟分类`、`官方`、`GitHub`。
2. **移动端触屏按压粘滞修复 (P2-5 & iOS/Android 优化)**：
   - 彻底移除了卡片上硬编码的深色 `hover:bg-[#121624]` 类；
   - 注入 `-webkit-tap-highlight-color: transparent` 消除系统默认触屏灰色高亮遮罩；
   - 将 hover 变化严格隔离到 `@media (hover: hover) and (pointer: fine)` 鼠标精确指针设备；
   - 在移动触屏下仅做轻微 `scale(0.985)` 缩放反馈，浅色模式强制锁定纯白背景，彻底根除手指点按后卡片变黑不恢复的顽疾。
3. **P0-1. 导航栏精简（9 → 4 核心入口）**：
   - 顶部导航栏收敛为 4 个黄金主入口：`一键安装`、`应用生态 (160+)`、`命令字典`、`GitHub乐园`，右上角保留 GitHub 图标与立即使用胶囊；
   - 次级信息（`今日更新 (含实时时间戳)`、`核心特性`、`开发者生态`）移入页脚链接区，保持信息 100% 可达的同时赋予首屏呼吸感。
4. **P0-2. Slogan 渐变收敛**：
   - Slogan「一条 curl，整个开源世界随叫随到」渐变收敛为经典的 Google AI 天蓝至科技蓝/靛紫两段冷色渐变，彻底解决跨冷暖花哨感，暗黑/白天双模式对比度极佳。
5. **P1-3. Emoji 与命名降噪**：
   - 全面去除方括号噪音：`[Github乐园]` 规范为干净的 `GitHub乐园`；
   - 分类 A 与其他分类体系对齐规范为 `⭐ 热门开源 TOP10`。
6. **P1-4. “放个礼花”按钮弱化（方案 A 落地）**：
   - 去掉粉红高饱和度渐变与 Emoji，收敛为极简灰色次级描边按钮 `放礼花` + 精致单色线框图标，融入专业运维底座质感。
7. **数字与文档全站自洽**：
   - 全站（导航、胶囊徽章、介绍文案、应用大厅、`README.md`、`website/public/README.md`）统一升级为 `160+ 开源精选` 与 8 核心分类矩阵，杜绝新旧版本冲突覆盖。

---

## 3. 关键文件清单及各自作用 (Key Files Reference)

| 文件路径 | 作用与维护要点 |
| :--- | :--- |
| `apps_manager.sh` | **核心源文件**。手风琴应用市场独立脚本，包含 8 核心分类定义、128 款内置应用数据库、动态 ~/apps/*.conf 扫描与 [本地] 标签、文件名 fallback 安装、代号解析与自定义应用向导。 |
| `sync_upstream.js` | **自动化同步与补丁引擎**。拉取上游原版 `kejilion.sh`，并将 `apps_manager.sh` 的 8 分类手风琴逻辑及守护补丁自动注入，生成分发脚本。 |
| `render_demo.py` | **终端演示动画生成脚本**。基于 PIL 与 ffmpeg 逐帧渲染三幕终端演示（含 8 核心分类矩阵与快捷操作），输出到 `website/public/hero-terminal-demo.*`。 |
| `website/src/app/page.tsx` | **站点核心主页**。Next.js 客户端主页，包含 Slogan、终端演示动画、精简 4 项导航、`🌟分类`/`官方`/`GitHub` 源切换、页脚拓展链接、手风琴 8 分类展示、[H] 社区扩展示例及今日推荐等板块。 |
| `website/src/app/globals.css` | 全局样式表，包含移动端触屏粘滞修复、双模式高对比度规则及 Google AI 极光背景。 |
| `website/src/data/appsData.ts` | 网站 8 分类与 160+ 款应用（内置+精选第三方扩展示例）前端数据定义。 |
| `website/src/data/dailyRecommend.ts` | 每日推荐 TOP3 缓存数据，由 prebuild 构建脚本自动生成。 |
| `website/public/hero-terminal-demo.mp4` / `.gif` | 首屏终端演示动效视频与降级动图。 |
| `kejilion.sh` & `x.sh` | 注入后的完整脚本与短链直达脚本。 |
| `website/public/` | 网站静态托管目录，供外部用户通过 `curl` 下载脚本及演示媒体，含发布到 main 的同构 `README.md`。 |
| `README.md` | 项目主文档，记录功能特色、8 核心分类矩阵表格与 CLI 快捷指令速查。 |
| `HANDOFF.md` | 本交接文档。 |

---

## 4. 后续开发建议与操作规范

1. **修改流程**：
   - 本地在 `source` 分支修改代码 → 进入 `website/` 执行 `bun run build`，或对脚本执行 `bash -n` 本地验证通过。
   - 提交 commit 并推送到 `macsur/source` 分支 (`git push macsur source`)。
   - 构建脚本会自动刷新 `website/src/data/dailyRecommend.ts` 与 `website/src/data/recommendManifest.json`；若本次任务无关每日推荐，提交前应检查并还原这些自动生成数据，避免无关改动混入。
2. **发布与上线**：
   - 向 `macsur/source` push 后会自动触发 GitHub Actions，或者由 Muse 发送 `repository_dispatch` (`event_type: update-website`)。
   - 编译完成后 Actions 会自动将静态页面部署到 `main` 分支。
   - 若 Cloudflare Pages 部署卡 queued，在 Cloudflare 控制台或通过 API 点击 Retry。
