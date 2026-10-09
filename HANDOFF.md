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
| `sync_upstream.js` | **自动化同步与补丁引擎**。拉取上游原版 `kejilion.sh`，并将 `apps_manager.sh` 8 分类手风琴逻辑及 ZTTZ 自用应用体系（`z`、`z app`、`z-apps`、别名防护、更新锁定）自动注入，生成融合版分发脚本。 |
| `z.sh` & `website/public/z.sh` | **ZTTZ 融合版主入口脚本**。单文件融合上游 k 与自用 z 生态，支持 `z app 数字` 管理自用配置，更新源锁定为 `zttz.eu.org/z.sh`。 |
| `x.sh` & `website/public/x.sh` | **向后兼容直达脚本**。与 `z.sh` 同源同步保持一致，保障老用户无缝过渡。 |
| `z-apps/` | **自用应用配置根目录**。存放 `1.conf` 等自定义应用规范配置，与上游 `~/apps/` 物理隔离。 |
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
3. **固定工作记录 / 交班记录格式（必须遵守）**：
   - 每次收工、交接、转交 Muse AI / Antigravity 时，记录必须统一使用以下结构，避免遗漏关键信息：
     ```markdown
     ## 工作记录（YYYY-MM-DD）

     ### 1. 变更内容
     - 做了什么；
     - 改了哪些关键文件；
     - 保留了哪些兼容入口或旧逻辑。

     ### 2. 验证结果
     - 执行过的命令，例如：`bun run build`、`bash -n ...`、`node --check ...`；
     - 验证是否通过；
     - 构建脚本是否产生无关自动生成数据，若有是否已还原。

     ### 3. 提交与推送
     - commit hash 与 commit message；
     - 推送目标必须写明：`macsur/source`；
     - 明确说明：未推 `origin`，未推 `main`。

     ### 4. 注意事项 / 下一步
     - 仍需人工操作的外部事项（Cloudflare、Pages、DNS、Actions 等）；
     - 后续接手必须避免的坑；
     - 与 Muse AI / Antigravity 协作时的上下文。
     ```
   - 如果是简短任务，也必须至少保留这四个标题；可以用“无”填充空项。

---

## 5. 📜 小安 ↔ Muse 对接规约 v1.0

> **协作角色定位**：
> - **小安 (Antigravity)**：本地主力架构与工程实施（负责深度重构、代码注入、本地多场景沙盒冒烟验证、前端与构建工程）。
> - **Muse (云端/运维助手)**：云端自动化调度、容器沙盒真实环境集成测试、GitHub Actions 部署监控与 Cloudflare 状态守护。

### 1. 🚨 核心铁律（双端共同遵守）
1. **唯一目标仓库与分支**：
   - 目标仓库：**`macsur/macsur.github.io`**。
   - 唯一有效工作分支：**`source` 分支**。
   - **严禁向 `origin` (`kejilion/sh.git`) 推送**。
   - **严禁向 `main` 分支直接推送**（`main` 为 Actions 云端打包生成的只读发布分支）。
2. **统一主域名与入口口径**：
   - 站点主域名为 **`https://zttz.eu.org`**。
   - 一键入口主推 **`https://zttz.eu.org/z.sh`**，保持 `x.sh` 同源同步向后兼容。
3. **工具链统一**：
   - 网站端统一采用 **Bun 1.3.14**（`website/bun.lock` 为唯一锁文件 SSOT）。

### 2. 职责划分与工作流接口
```
[小安 (本地实施)]
       │ 1. 编写与注入补丁 (sync_upstream.js)
       │ 2. 生成产物 (z.sh, x.sh, website/public/)
       │ 3. 本地 bash -n 与临时隔离沙盒初验
       ▼
[推送至 macsur/source 分支]
       │
       ▼
[Muse (云端/对接验证)]
       │ 1. 真实容器环境冒烟测试 (k+z 安装、z app 1、z update 链路)
       │ 2. 调度 Actions / Cloudflare 状态检查
       │ 3. 产出验证报告并推进下一步
```

### 3. 对接交付物与验收标准
#### 小安交付清单：
- `sync_upstream.js`：已完成官方源码智能打补丁与 Z 体系注入。
- `sync_upstream.sh`：自动生成并同步下列文件到 `website/public/`：
  - `z.sh`（主入口）
  - `x.sh`（兼容入口，内容同 `z.sh`）
  - `kejilion.sh`（融合版底座）
  - `apps_manager.sh`（手风琴模块）
- `z-apps/1.conf`：标准自用应用示例。
- **本地强校验**：`bash -n` 零语法错误。

#### Muse 验收清单（Checklist）：
- [ ] **安装测试**：在干净容器中执行 `bash <(curl -sL https://zttz.eu.org/z.sh)` 顺利完成。
- [ ] **命令双部署**：系统存在 `/usr/local/bin/k` 与 `/usr/local/bin/z`。
- [ ] **别名防劫持**：`alias k` 与 `alias z` 均被成功清除。
- [ ] **原生兼容**：执行 `k`、`k app`、`k app 1` 走上游原生逻辑。
- [ ] **自用隔离**：
  - `z app` 列出 `~/z-apps/` 应用；
  - `z app 1` 成功安装并运行示例探针；
  - `z app 999` 明确提示未找到并引导改用 `k app 999`，不发生降级误装。
- [ ] **版本标识**：输出中带有 `zttz_edition="true"` 或 `zttz_v="1.0.0"`。
- [ ] **更新防覆盖**：执行一次 `z update`，更新源为 `zttz.eu.org/z.sh`，更新后 `z` 命令完好无损。

---

## 工作记录（2026-10-07）

### 1. 变更内容
- **首页 Hero 区实装双视频轮播引擎 (v7 广告片 + 30s 宣传片)**：
  - 新增静态资源：下载并存入 `website/public/ads/linux-v2-30s-finalC.mp4`（30s 高清宣传片，约 14MB）；
  - 轮播架构实现：
    - 在 `website/src/app/page.tsx` 中引入双视频配置项（第 1 张为 v7 广告片，支持手机竖屏 / 桌面横屏自适应切换；第 2 张为 30s 宣传片）；
    - **自动播放与连播**：每张视频播完触发 `onEnded` 事件自动无缝切入下一张；
    - **小圆点指示器**：顶部面板配有交互式小圆点，支持用户随时点击手动切换视频；
    - **通用状态保持**：`muted` 静音自动播放、小喇叭音频切换按钮（作用于当前播放实例）以及标语 HTML 浮层在轮播过程中完整保留；
    - **手机端排版处理**：针对 30s 宣传片采用 `object-contain` 配合容器黑色背景 letterbox 展现，保证画幅不被裁切。
  - 经 `bun run build` 预构建校验通过，静态页面生成成功。
- **安装命令更新为官方短链 `https://zttz.eu.org/z`**：
  - 将主页快捷安装命令卡片 (`website/src/app/page.tsx`)、根目录 `README.md` 及 `website/public/README.md` 中的一键安装命令统一由 `https://zttz.eu.org/z.sh` 更新为更精炼的短链 `https://zttz.eu.org/z`（`bash <(curl -sL https://zttz.eu.org/z)`）；
  - 服务端配置 301 自动跳转至 `z.sh`，`curl -sL` 自动跟随重定向，新旧链接无缝兼容；
  - 经 `bun run build` 预构建检验通过，全站静态生成顺畅。
- **首页 Hero 广告视频无损升级为 v7 版 (绿色代码雨内嵌)**：
  - 更新静态资源：下载并替换 `website/public/ads/` 目录下的竖屏 (9x16) 与横屏 (16x9) 广告视频至带新版本名的 `ad-oneclick-girl-*-10s-v7-final.mp4`，彻底移除旧版 v5 视频文件；
  - 更新组件引用：在 `website/src/app/page.tsx` 中同步更新两个 `<source>` 标签的 `src` 路径为 v7，有效击穿 CDN/浏览器端缓存；
  - 保留原有全部交互机制：`media="(max-width: 768px)"` 响应式视口自动切换、`muted` 静音自动播放、小喇叭音频切换按钮、HTML 文字浮层及首屏文案体系完全保持不变；
  - 经 `bun run build` 预构建并验证静态页面生成无误（First Load JS 维持 ~127 kB）。
- **z-apps 自用生态上架 3 号应用 `WorkBuddy` & 2.conf 生产环境全面就绪**：
  - **macsur/z-apps 2.conf (claude-mem)**：
    - 确认已应用最新生产修复（`app_size="1"` 防护框架磁盘校验、覆盖 `check_docker_app` 状态检查以避免 Docker 检测误判、Python3 真卸载 hooks 与数据目录）。
  - **macsur/z-apps 3.conf (WorkBuddy 账号池网关)**：
    - 正式引入真实 Docker 应用配置 `3.conf`，面板容器 `docker_name="workbuddy-manager"`，端口 `docker_port="7864"`，无缝契合框架的容器状态探针与端口反代逻辑；
    - 安装流：动态安全下载 `workbuddy-deploy.sh`，经 `bash -n` 预检后交互式引导用户配置域名与安全密钥；
    - 更新流：重跑部署脚本 `--auto` 参数实现幂等就地升级；
    - 卸载流：安全停止并清理两个容器（网关与面板），提供交互式确认是否保留关键凭据数据目录 `/opt/wb2api`；
    - `bash -n 2.conf` 与 `bash -n 3.conf` 均 100% 验证通过，已直推 `macsur/z-apps` main 分支（Commit: `e2689d1`）。
- **修复 CLI 插件 check_disk_space 空变量语法错误与 2.conf 生产级完善**：
  - **框架侧修复 (sync_upstream.js)**：
    - 根因：官方框架中 `check_disk_space $app_size /home/docker` 在 CLI 插件未定义 `$app_size` 时为空，导致路径 `/home/docker` 被当做 GB 数字做乘法触发 `line 351: /home/docker: syntax error`。
    - 修复：在 `sync_upstream.js` 注入后处理补丁，全量将 `check_disk_space $app_size /home/docker` 替换为 `check_disk_space "${app_size:-1}" /home/docker`（产物中 2 处均已防护），彻底杜绝下次同步上游时被覆盖。
    - 重新生成 `kejilion.sh`、`z.sh`、`x.sh` 并同步至 `website/public/`。
  - **macsur/z-apps 2.conf 迭代**：
    - 显式声明 `app_size="1"`，清空 Docker 容器专属变量 `docker_name=""` 与 `docker_port=""`；
    - 作用域覆盖 `check_docker_app` 状态检查：只在当前应用中通过 `~/.claude/settings.json` 与 `~/.claude-mem` 判定真实安装状态，其余应用走原版无泄漏；
    - 升级 `docker_app_uninstall` 为真卸载：`pkill` 残留进程，Python 脚本安全清理 `settings.json` 中的 hooks（带自动备份），清理 `~/.claude-mem/` 数据目录。
    - 推送至 `macsur/z-apps` main 分支（Commit: `6f81b6a`）。
- **z-apps 自用生态端到端验证：上线 2 号应用 `claude-mem` (macsur/z-apps)**：
  - 在独立配置仓库 `macsur/z-apps` 新建 `2.conf` 并成功推送至其 `main` 分支。
  - `2.conf` 实现了 `claude-mem 跨会话记忆` 应用生命周期管理（安装、更新、卸载提示）：
    - 运行前环境智能检测：自动探测 Node.js 20+ 环境，缺失时自动通过 apt / yum / apk 安装；
    - 执行官方唯一标准接入流：`npx -y claude-mem install`；
    - 具备 Bash 语法完整性验证（`bash -n 2.conf` 通过，Return Code: 0）。
  - 端到端使用闭环：用户在装有 `z.sh` 的终端执行 `z app sync` 即可拉取到最新的 `2.conf`，随后 `z app` 即刻可见 2 号应用，执行 `z app 2` 自动走通安装流程。
- **P2-1 里程碑落地：实现 `z app sync` 远端 GitHub 配置库同步**：
  - 在 `sync_upstream.js` 的 `zModuleBlock` 中注入 `z_sync_apps()` 函数与对应分发路由。
  - 支持 `z app sync`、`z sync` 以及 ZTTZ 主菜单第 2 项（`2. 从 GitHub 同步自用配置 (z app sync)`）。
  - 同步逻辑安全可靠：
    - 当 `~/z-apps/.git` 不存在时，通过深度浅克隆 (`git clone --depth=1 https://github.com/macsur/z-apps.git`) 初始化并使用 `cp -n` 增量合入，完整保留本地已有改动与新增 conf；
    - 当已是 git 仓库时，使用 `git pull --rebase` 并增量补充新增远程模板，保障用户本地配置不被冲掉；
    - 带有网络异常与未安装 git 优雅回退降级（提示并使用本地缓存）；
    - `z app` 当检测到 `~/z-apps` 为空时，不再静默或报空，而是给出清晰高亮的 `z app sync` 引导提示。
  - 重新运行 `node sync_upstream.js`，同步生成 `kejilion.sh`、`z.sh`、`x.sh` 并同步至 `website/public/`。
- **实现 ZTTZ 融合版脚本与 Z 命令体系**：
  - `sync_upstream.js` 扩展支持 `z` 命令体系：自动清除 `alias z=` 别名劫持，自动部署 `/usr/local/bin/z` 与 `/usr/bin/z`。
  - 尾部分发器新增 `$(basename "$0")` 判断：以 `z` 调用时进入独立的自用管理工作台与 `z app [数字]` 调度逻辑。
  - 自用应用生态与上游隔离：`z app [数字]` 调度 `~/z-apps/[数字].conf`；找不到时不自动回退上游，避免编号冲突，清晰引导。
  - 更新源锁定：重定向到 `https://zttz.eu.org/z.sh`，并在更新完成后自动重建 `z` 命令及软链。
  - 版本标识注入：在脚本头部新增 `zttz_edition="true"` 与 `zttz_v="1.0.0"`。
  - 创建并内置 `z-apps/1.conf` 自用极简状态探针示例。
  - 同步脚本 `sync_upstream.sh` 更新：全量生成并同步 `z.sh`、`x.sh`、`kejilion.sh` 至根目录与 `website/public/`。
- **确立并固化规约**：在 `HANDOFF.md` 写入《小安 ↔ Muse 对接规约 v1.0》。
- **修复 2 项 Ship-blocker 与优化版本比对 (2026-10-07 回归打补丁)**：
  1. **执行权限修复**：在自存部署逻辑中，补全 `chmod +x ~/kejilion.sh` 以及 `chmod +x /usr/local/bin/k /usr/local/bin/z`，彻底根除整包直灌执行后出现的 `Permission denied`（644 权限硬伤）；
  2. **自动更新任务 (Cron) 官方源脱钩与双部署**：修改 `kejilion_update()` 选项 2 中 `SH_Update_task` 下载 URL 为 `https://zttz.eu.org/z.sh`，并在定时任务中部署 `k` 和 `z` 双命令软链，彻底杜绝次日凌晨自动更新把 `z` 洗回官方版；
  3. **版本比对优化**：更新菜单头部检测最新版本逻辑调整为比对 `zttz.eu.org/z.sh` 的 `zttz_v`，保持 ZTTZ 融合版语义纯正。
- **安装并配置持久记忆系统 `claude-mem` (v13.34.2)**：
  - 针对 Antigravity 部署 `claude-mem` 插件，关联 hooks 与 MCP 配置；
  - 启动本地 worker 守护进程（运行在 `127.0.0.1:37701`，提供 Web Viewer 与记忆索引）；
  - 配置 `~/.claude-mem/settings.json` 为 `"CLAUDE_MEM_MODE": "code--zh"`（支持中文记忆持久化与跨会话恢复）。

### 2. 验证结果
- 执行 `node sync_upstream.js` 及 `./sync_upstream.sh`，构建并全量生成分发文件。
- 执行 `bash -n kejilion.sh`、`bash -n z.sh`、`bash -n x.sh` 三件套语法检查 100% 通过。
- 权限实测：模拟无执行权限整包直灌执行，部署后 `~/kejilion.sh` 自动获得 `755` 权限，`/usr/local/bin/k` 与 `/usr/local/bin/z` 均具备可执行权限。
- 自动更新实测：检查生成的 `SH_Update_task`，确认更新源为 `https://zttz.eu.org/z.sh` 且包含 `cp k && cp z && ln k && ln z` 双部署。
- 在本地隔离临时沙盒中验证：
  - `z help` 正常输出命令用法；
  - `z app` 自动初始化并展示自用应用列表；
  - `z app 1` 顺利加载 `1.conf` 运行探针；
  - `z app 999` 明确提示未找到并引导使用 `k app 999`；
  - `k help` 验证上游 `k app` 与新增 `z app` 帮助项均正常。
- `claude-mem` 验证：
  - `npx claude-mem doctor` 检查全部基础依赖（Bun 1.3.14、uv、sqlite）正常；
  - `npx claude-mem status` 确认 worker daemon 处于运行状态（PID 活跃，端口 37701 正常监听）。

### 3. 提交与推送
- 目标：`macsur/source` 分支。
- 声明：严格遵守铁律，未推 `origin`，未推 `main`。

### 4. 注意事项 / 下一步
- 第一阶段全链路冒烟测试与上线核验已 100% 通过（Actions 构建成功，Pages 发布，`z.sh` 线上与沙盒验证完成）。
- **网站文案与安装入口统一更新 (2026-10-07)**：
  - 首页胶囊徽章：「Linux 服务器工具箱」→「Linux 百宝箱」；
  - 导航栏 Logo 文字：「Kejilion 工具箱」→「Linux 百宝箱」（保留旁边 `v4.5.10` 版本徽标）；
  - 安装命令统一：页面 `enhanced` 及公开文档 `README.md`、`website/public/README.md` 中的命令统一换为 `bash <(curl -sL https://zttz.eu.org/z.sh)`；
  - 本地经 `bun run build` 预构建校验通过，无类型或打包错误。
- 建议后续作为第二阶段网站需求：在「常用指令」网格中增添 `z app` 自用扩展生态的介绍卡片。

---

## 工作记录（2026-10-08）

### 1. 变更内容
- **修复 `sync_upstream.js` 补丁4 target 字符串，成功注入主菜单顶部 11+. 快捷入口**：
  - **根因发现**：上游 `kejilion.sh` 已从旧版（`menu_dim` + 动态 `menu_line` 分隔线格式）升级为新版（ASCII art banner + `命令行输入k可快速启动脚本` 格式），补丁4的 target 字符串始终与新上游不匹配，导致「主菜单顶部 11+ 快捷入口」**从未实际注入生效**。
  - **修复方案**：将补丁4的 target 更新为新上游格式，精准匹配 `${gl_kjlan}------------------------${gl_bai}` + `${gl_kjlan}1.   ${gl_bai}系统信息查询` 这两行，在分隔线之后、第 1 项之前插入 11+ 快捷入口行（带前后分隔线）。
  - **效果**（注入后主菜单顶部）：
    ```
    命令行输入k可快速启动脚本
    ------------------------
    11+. 应用市场 [分类折叠]    ← 新增快捷入口
    ------------------------
    1.   系统信息查询
    2.   系统更新
    ...
    ```
  - 子菜单原 `11+` 入口保留不动，双入口并存。
  - 关键文件：`sync_upstream.js`（补丁4逻辑）、`kejilion.sh`、`z.sh`、`x.sh`、`website/public/` 同步产物。

### 2. 验证结果
- 运行 `node sync_upstream.js` → `✅ 补丁4: 主菜单顶部 11+ 快捷入口注入成功`。
- 运行 `./sync_upstream.sh` 全链路同步完成，产物全量更新。
- `bash -n z.sh && bash -n kejilion.sh && bash -n x.sh` 三件套语法验证 100% 通过。
- Python 精确验证：主菜单 `11+.` 注入位置在 offset 481 处，版本行下、1.系统信息查询上，位置正确。
- **Muse 线上验收**：CI 构建成功（`main` 新提交 `bc349e2`），Cloudflare Pages retry 后部署成功，线上 `z.sh` 实测主菜单顶部 11+. 入口存在且功能正常。

### 3. 提交与推送
- **Commit**: `fab15d8` — `feat(menu): 主菜单顶部注入 11+. 应用市场 [分类折叠] 快捷入口`
- **推送目标**: `macsur/source` ✅
- **未推 `origin`，未推 `main`** ✅
- Muse 负责 CI 监控与 Cloudflare retry，小安不负责部署侧。

---

## 工作记录（2026-10-08 下半场）

### 1. 变更内容
- **模型通道切换与连通性验证**：
  - 切换至 Agent2API 自建网关：`https://test002.zttz.eu.org/v1`，模型 `gpt-6-astra`；
  - 连通性测试通过（HTTP 200，`ping` -> `pong`）。
- **任务1：删除测试应用，验证动态编号自动重排**：
  - 清理本地仓库内历史示例配置 `z-apps/1.conf`（ZTTZ 极简状态探针）；
  - 远端 `macsur/z-apps` 配置库已在 `01fed4c` 与 `9092537` 清理两款测试应用（探针与 claude-mem），并归正为真实业务应用：`1.conf` (WorkBuddy) 与 `2.conf` (Agent2API)；
  - 在隔离沙盒中实测动态重排逻辑：当删除任意应用时，`z app` 列表与 `/tmp/.z_app_disp_map` 均能 100% 自动从 1..N 连续编号，实现“随时删除，自动对齐”。
- **任务2：修复首页 Hero 视频黑屏与优化加载性能**：
  - `<video>` 标签添加 `muted`、`playsinline`、`autoplay`，保留小喇叭声音切换按钮供用户手动开启声音；
  - 全部宣传视频通过 ffmpeg 注入 `-movflags +faststart`，将 `moov atom` 元数据移至文件头部，击穿首屏加载黑屏阻塞；
  - 30 秒极客版宣传片（`linux-v2-30s-finalC.mp4`，原 14MB+）重新高质量压缩至 6.8MB（严格控制在 8MB 以内）；
  - 针对轮播视频生成第 2 秒画面专属高清封面 `poster`（包含 `16x9`、`9x16`、30s 女神版与 30s 极客版），在组件中绑定 `poster={heroVideos[heroVideoIdx].poster}`，加载前彻底告别黑屏。
- **构建与测试**：
  - 本地运行 `bun run build` 预构建生成与静态导出 100% 成功（First Load JS 维持 ~127 kB）。
- **全仓库代码审计（2026-10-08 深度审计）**：
  - 产出《代码健康报告》：`AUDIT-2026-10-08.md`；
  - 覆盖死代码、潜在 Bug、安全问题、性能瓶颈四大维度；
  - 坚持“只报告不修改”原则，输出详实诊断与修复建议代码。
- **修复高危漏洞（SEC-01 & SEC-02）**：
  - SEC-01（命令注入）：在 `sync_upstream.js` 注入补丁 8.3，将 `openclaw_multiagent_set_identity` 中的动态字符串拼装与 `eval "$cmd"` 替换为安全数组传参 `"${cmd_args[@]}"`；全链路产物通过 `bash -n` 校验；
  - SEC-02（API Key 暴露）：删除 `.github/workflows/muse-deploy.yml` 中的硬编码 fallback Key，强制仅由 GitHub Secrets 注入；后台已核实 `TRANSLATE_API_KEY` 存在。

- **工作台 3 号位插入第三方与社区扩展应用入口**：
  - 在 `sync_upstream.js` 的 `z_main_menu` 注入补丁，第 3 位插入 `3. 第三方与社区扩展应用 [${custom_cnt} 款]`；
  - 动态统计本地/上游第三方配置数量（默认兜底 48 款，实时跟随上游新应用扩展，拒绝写死）；
  - 点击直达 `linux_panel_accordion "custom"`，自动展开第三方应用折叠列表；
  - 原 3/4/5 项顺延至 4/5/6 项，全套脚本通过 `bash -n` 检验。
- **README.md 与部署源全量同步升级**：
  - 更新根目录 `README.md` 与 `website/public/README.md` 为全新版本；
  - 完整呈现 11+ 快捷入口、ZTTZ 工作台 6 大菜单体系（含 3 号位第三方扩展）、Hero 双视频无黑屏引擎、安全审计与加固，以及 `k` 与 `z` 双轨速查指令集；
  - 本地经 `bun run build` 生成验证，`website/out/README.md` 即刻反映最新版本，准备由 Actions 发布至 `main`。

- **修复 z app sync 假成功 Bug 与节假日礼花控制**：
  - 修复 `z_sync_apps` 同步机制：在执行 pull 前通过 `checkout -f HEAD` / `restore .` 恢复本地工作区被删改的 `.conf`，并增加重克隆兜底；
  - 杜绝吞错误：当 clone 或 pull 失败时显式输出错误原因并以非零状态返回；增加目录完整性断言（若无 `.conf` 决不报成功）；
  - 本地实测模拟复现（删 1.conf 后跑 sync 100% 成功拉回）；
  - 修复网站礼花规则：严格限定在法定节假日期间才放礼花（`isHolidayToday()`），平时仅展示超新星粒子冲击波与跃迁音效，移除平日的放礼花按钮。

- **挂载 Hero 首页全新动态广告 GIF**：
  - 下载并存入 `website/public/ads/linux-baibaoxiang-linebyline-v2.gif`（900x600 高清动态逐行广告）；
  - 在 `website/src/app/page.tsx` 中将第一张轮播卡片指定为该广告素材（`isGif: true`，引用路径 `/ads/linux-baibaoxiang-linebyline-v2.gif`）；
  - 自动轮播逻辑增强：GIF 呈现 10 秒后平滑自动无缝切入后续视频，保留手动小圆点随时切换；
  - 本地经 `bun run build` 预构建静态打包 100% 通过（零报错、零警告）。

### 2. 推送目标
- 严格遵循铁律：仅推 `macsur/source` 分支，未推 `origin`，未推 `main`。

---

## 📋 Muse 交办任务（2026-10-09，用户拍板）

**任务：网站标题更换**

- 新标题（用户钦定，逐字为准）：**用代码 · 爱上Linux**
  - 中间为间隔号「·」，点号两侧各留一个空格；「Linux」紧跟「爱上」、不加空格。
- 改动范围：
  1. 首页 Hero 主标题（现为「一条命令，整备一台服务器」）改为新标题；
  2. 浏览器标题 `<title>` 及 metadata（重点查 `website/src/app/layout.tsx`）同步改为新标题；
  3. 根 `README.md` 与 `website/public/README.md` 的标题按仓库惯例与首页标题保持一致，同步更换。
- 品牌 slogan 同步更换（用户 2026-10-09 21:07 补充拍板）：品牌 slogan 与标题统一为同一句「用代码 · 爱上Linux」。全站及两个 README 中，凡出现旧主标题「一条命令，整备一台服务器」与旧 slogan「一键脚本，爱上 Linux」的位置，一并替换为新句。脚本产物（z.sh / x.sh / kejilion.sh）中若有相同字样，先在回执中列明位置与数量，不要擅自改动，等用户确认。其余文案、安装命令不动。
- 执行要求：本地 `bun run build` 通过后只推 `macsur/source`；提交前还原构建自动生成的无关数据文件（dailyRecommend 等）。
- 回执要求：完成后按本文件「工作记录」四段格式补记一段，并在 `MUSE-留言.md` 里回一句告知 Muse。
- 验收（Muse 负责，小安不用管）：CI 成功 → main 更新 → Cloudflare 部署（卡 idle 由 Muse retry）→ 线上首页标题与 `<title>` 实测核验。

## 工作记录（2026-10-09）

### 1. 变更内容
- 将网站品牌标题与 slogan 统一为「用代码 · 爱上Linux」。
- 更新首页 Hero 主标题、Hero 宣传片浮层文案、宣传片 aria-label、声音按钮提示文案。
- 确认根 `README.md` 与 `website/public/README.md` 标题已为「用代码 · 爱上Linux」。
- 确认 `website/src/app/layout.tsx` 的 `<title>` / metadata description 已为「用代码 · 爱上Linux」。
- 脚本产物扫描：`z.sh`、`website/public/z.sh`、`x.sh`、`website/public/x.sh`、`kejilion.sh` 中未命中「一条命令，整备一台服务器」「一键脚本，爱上 Linux」「一键脚本 · 爱上 Linux」，未改动脚本产物。

### 2. 验证结果
- 执行 `bun run build`，构建通过。
- 构建刷新了 `website/src/data/easterEggData.ts` 与 `website/src/data/recommendManifest.json`，均为本次任务无关的自动生成数据，已还原，未混入提交。

### 3. 提交与推送
- 提交与推送将在本次工作收尾时执行。
- 推送目标：仅推 `macsur/source`。
- 未推 `origin`，未推 `main`。

### 4. 注意事项 / 下一步
- 部署验收归 Muse：CI 成功 → main 更新 → Cloudflare 部署与线上核验。
- 脚本产物未改，等待用户后续确认是否需要同步新标题。
