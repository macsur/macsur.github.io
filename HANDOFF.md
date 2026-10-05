# 🤝 交班记录与后续开发交接指南 (HANDOFF.md)

> **致接手助手 Muse AI / Antigravity**：
> 本文档旨在接手本仓库时能够零上下文损失、无缝推进项目。请在开始任何操作前**完整阅读本文档**，特别是其中的 **🚨 绝对铁律**。

---

## 1. 🚨 必须绝对遵守的开发与推送铁律 (最高优先级)

1. **只推 `source` 分支，绝不动 `main` 分支**：
   - 用户的个人开发仓库是 **`macsur/macsur.github.io`**。
   - `macsur.github.io` 的 **`main` 分支是云端 GitHub Actions 编译产物的专属只读发布分支**！
   - 本地的所有代码提交、特性更新、维护脚本，**一律只 push 到 `source` 分支** (`git push macsur source`)。
   - 严禁向 `main` 分支直接执行 `git push`，彻底杜绝与 Actions 自动化构建产物发生冲突覆盖。
2. **绝对严禁向 `origin` (`kejilion/sh.git`) 推送**：
   - `origin` 是上游原作者的只读参考仓库，不是用户的仓库。当前本地已将 `origin push` 设为 `DISABLED_DO_NOT_PUSH_UPSTREAM`，切勿修改其配置。
3. **站点核心架构与域名**：
   - 站点主域名：`https://x.zttz.eu.org`（DNS CNAME 指向 Cloudflare Pages 项目 `macsur-github-io`，其代码由 `main` 分支自动化构建注入）。
   - 源码主力分支：`source` 分支。
   - 云端通过 GitHub Actions（`muse-deploy.yml` 监听 `push: source` 或 `repository_dispatch: update-website`）以及每日北京时间 03:00 (UTC 19:00) 定时自动抓取热榜、打新构建并发布到 `main`。
4. **Cloudflare Pages 部署提示**：
   - Cloudflare Pages 偶发部署卡在 `queued` 状态，调用 retry 接口（`POST /pages/projects/{project}/deployments/{id}/retry`）即可救活完成上线。

---

## 2. 最近两次重大迭代演进总结

### 迭代 A：7 大核心分类矩阵重构 (2026-10-05 17:15)
- 将应用市场原先分散的 11 大分类（A~K）精简重构为 7 大核心分类矩阵（A~G）：
  - `A`: 🌟 [Github乐园] 热门开源TOP10 (10 款)
  - `B`: 🖥️ 服务器运维与探针监控 (29 款)
  - `C`: 🤖 人工智能与前沿大模型 (14 款)
  - `D`: 🌐 网络代理与穿透组网 (15 款)
  - `E`: 🗄️ 私有网盘与数据存储 (14 款)
  - `F`: 🎬 影音媒体与离线下载 (14 款)
  - `G`: 📝 协作办公与实用工具 (32+ 款)
- 键盘快捷键全面收敛至主键盘区 `A` ~ `G`，兼容历史代号及纯数字编号。

### 迭代 B：首页视觉、Slogan 与终端演示动画优化 (2026-10-05 20:30)
1. **Slogan 一句话定死**：
   - 主标题：`一条 curl，整个开源世界随叫随到`
   - 副标题保留：“专为开发者与极客打造的现代化命令行底座，体验前所未有的纯净与高效。”
   - 移除了原有的服务器运维与大模型双线叙事，首屏仅讲这一件事。
2. **首屏徽章精简 + 终端演示动画**：
   - 首屏徽章收敛为精简胶囊：`Linux 极客应用大厅 / 纯净命令行底座 / 128+ 开源精选`。
   - 在「常用指令快速直达」右侧集成终端演示窗口，自动播放 11.4 秒三幕循环动画（`hero-terminal-demo.mp4`，配 `.gif` 降级支持）。
   - 根目录下保留了 Python/PIL/ffmpeg 可复现重新渲染脚本 `render_demo.py`。
3. **全站平实措辞**：
   - 全面清理全站“N 大分类”描述，规范为平实措辞「7 个应用分类 · 128+ 应用」，且仅在生态大厅模块出现一次。
   - `website/src/data/appsData.ts` 类别定义与 `apps_manager.sh` 100% 保持一致。
4. **增加「今日更新」入口**：
   - 导航栏显眼位置加入「今日更新」入口，展示友好北京时间换算标签（如“今日 03:00 已更新”），点击直达推荐板块。
5. **全链路实测核验**：
   - 2026-10-05 20:29 触发 dispatch 运行成功（Commit `c2d41f47`），Cloudflare Pages 成功上线，线上时间戳与页面渲染均验收通过。

---

## 3. 关键文件清单及各自作用 (Key Files Reference)

| 文件路径 | 作用与维护要点 |
| :--- | :--- |
| `apps_manager.sh` | **核心源文件**。手风琴应用市场独立脚本，包含 7 大分类定义、128 款内置应用数据库、交互菜单、代号解析与自定义应用向导。 |
| `sync_upstream.js` | **自动化同步与补丁引擎**。拉取上游原版 `kejilion.sh`，并将 `apps_manager.sh` 的手风琴逻辑及守护补丁自动注入，生成分发脚本。 |
| `render_demo.py` | **终端演示动画生成脚本**。基于 PIL 与 ffmpeg 逐帧渲染三幕终端演示，输出到 `website/public/hero-terminal-demo.*`。 |
| `website/src/app/page.tsx` | **站点核心主页**。Next.js 客户端主页，包含 Slogan、终端演示动画、今日更新入口、手风琴应用市场及今日推荐等板块。 |
| `website/src/data/appsData.ts` | 网站 7 分类与 128 款应用前端数据定义。 |
| `website/src/data/dailyRecommend.ts` | 每日推荐 TOP3 缓存数据，由 prebuild 构建脚本自动生成。 |
| `website/public/hero-terminal-demo.mp4` / `.gif` | 首屏终端演示动效视频与降级动图。 |
| `kejilion.sh` & `x.sh` | 注入后的完整脚本与短链直达脚本。 |
| `website/public/` | 网站静态托管目录，供外部用户通过 `curl` 下载脚本及演示媒体。 |
| `README.md` | 项目主文档，记录功能特色、7 大分类矩阵表格与 CLI 快捷指令速查。 |
| `HANDOFF.md` | 本交接文档。 |

---

## 4. 后续开发建议与操作规范

1. **修改流程**：
   - 本地在 `source` 分支修改代码 → `npm run build` 或 `bash -n` 本地验证通过。
   - 提交 commit 并推送到 `macsur/source` 分支 (`git push macsur source`)。
2. **发布与上线**：
   - 向 `macsur/source` push 后会自动触发 GitHub Actions，或者由 Muse 发送 `repository_dispatch` (`event_type: update-website`)。
   - 编译完成后 Actions 会自动将静态页面部署到 `main` 分支。
   - 若 Cloudflare Pages 部署卡 queued，在 Cloudflare 控制台或通过 API 点击 Retry。
