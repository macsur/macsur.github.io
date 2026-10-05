# 🤝 交班记录与后续开发交接指南 (HANDOFF.md)

> **致接手助手 Muse AI**：  
> 本文档旨在你或后续 AI 助手接手本仓库时，能够零上下文损失、无缝继续推进项目。请在开始任何操作前**完整阅读本文档**，特别是其中的 **🚨 绝对铁律**。

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
   - 站点主域名：`https://x.zttz.eu.org`（GitHub Pages 源于 `main` 分支根目录）。
   - 源码主力分支：`source` 分支。
   - 云端通过 GitHub Actions（或 `repository_dispatch` 事件）在每日北京时间 03:00 (UTC 19:00) 自动根据 `source` 分支编译部署到 `main` 分支。

---

## 2. 当前任务的目标 (Objective)

将应用市场原先臃肿分散的 **11 大分类（A~K）** 重新统筹策划并精简为 **7 大核心分类矩阵（A~G 全纳版）**：
1. 原本的「🌟 [Github乐园] 热门开源TOP10」作为独立置顶专区保留，赋予快捷代号 **`A`** (`A1`~`A10`)；
2. 其余应用按业务场景合理收敛到 **`B`~`G`**：
   - `B`: 🖥️ 服务器运维与探针监控 (29 款) - 融合原 panel、monitor、远程运维等
   - `C`: 🤖 人工智能与前沿大模型 (14 款) - 原 ai
   - `D`: 🌐 网络代理与穿透组网 (15 款) - 原 network
   - `E`: 🗄️ 私有网盘与数据存储 (14 款) - 原 storage
   - `F`: 🎬 影音媒体与离线下载 (14 款) - 原 media
   - `G`: 📝 协作办公与实用工具 (32+ 款) - 融合原 office、social、通用 tools 以及自定义应用
3. 终端快捷键收敛至主键盘区 **`A` ~ `G`**，支持单手/盲操；专属代号（如 `A1` DeepSeek, `B1` 宝塔）及原纯数字编号（`1`, `57` 等）100% 保持向前兼容；
4. 保证所有脚本、文档以及同步自动化流程（`sync_upstream.js`）完全适配这一全新 7 分类体系。

---

## 3. 已经完成的工作 (Completed Work)

已完成 7 大分类的规划、实施和自动化语法及逻辑验证，具体修改涉及以下文件：

1. **`apps_manager.sh`**：
   - 更新 `CATEGORY_LIST` 为 7 项（`github:A`, `ops:B`, `ai:C`, `network:D`, `storage:E`, `media:F`, `office:G`）；
   - 更新 `expand_all_cats` 逻辑，支持全新分类折叠展开状态；
   - 更新 `BUILTIN_APPS` 中全部 128 款应用的 category 归属（无一遗漏）；
   - 更新手风琴渲染、专属代号正则匹配 `^([A-G]|J)([0-9]+)$`，新增对 `G*` 自定义应用以及兼容历史 `J*` 代号的支持；
   - 更新 `custom_app_wizard` 添加应用向导中的分类选项为 6 个可选大类。
2. **`sync_upstream.js`**：
   - 执行了上游注入测试与同步验证，将最新 7 分类手风琴模块注入到下游全量脚本中。
3. **`kejilion.sh` & `x.sh` & `website/public/*`**：
   - 同步更新了根目录下的 `kejilion.sh`、`x.sh` 以及 `website/public/apps_manager.sh`、`website/public/kejilion.sh`、`website/public/x.sh`。
4. **`website/generate_daily_recommend.js`**：
   - 同步更新了每日推荐候选池中应用的 category 标签名称（与新 7 大分类规范保持一致）。
5. **`README.md`**：
   - 将原 “11+ 应用市场”、“11 大核心分类矩阵” 全面更新为 “7 大核心分类矩阵与 128+ 精选开源服务”，更新了 A~G 分列表格和快捷键说明。
6. **全量自动化验证通过**：
   - 编写了 Node.js 校验脚本，确认全部 128 款应用无孤立分类、各分类声明数与实际应用数完全吻合；
   - 对 `apps_manager.sh`、`kejilion.sh`、`x.sh` 及 `website/public/` 相应文件执行了 `bash -n` 严格语法校验，全部无错误通过。

---

## 4. 现在做到哪一步，下一步要做什么 (Current Status & Next Steps)

- **当前状态**：
  - 代码与配置重构全部就绪，验证通过；
  - 编写本文档 `HANDOFF.md`，并将所有成果提交到本地 git，推送到远程 `macsur/source` 分支。
- **下一步交接工作 (Next Steps)**：
  1. 如果用户有针对网页前端卡片展示或其他细节的进一步要求（例如网站 UI 上关于分类的筛选展示等），按需跟进调整；
  2. 若用户要求更新部署，确认 `source` 分支推送后触发云端 GitHub Actions 自动构建，切记不要手动推 `main` 分支。

---

## 5. 当前遇到的阻塞问题 (Blockers / Known Issues)

- **无阻塞问题**：
  - 核心功能、快捷键解析、手风琴折叠展开状态机均在测试环境中验证无误；
  - 本地 git 工作区干净无未解决冲突。

---

## 6. 关键文件清单及各自作用 (Key Files Reference)

| 文件路径 | 作用与维护要点 |
| :--- | :--- |
| `apps_manager.sh` | **核心源文件**。手风琴应用市场独立脚本，包含 7 大分类定义、128 款内置应用数据库、交互菜单、代号解析与自定义应用向导。 |
| `sync_upstream.js` | **自动化同步与补丁引擎**。拉取上游原版 `kejilion.sh`，并将 `apps_manager.sh` 的手风琴逻辑及守护补丁自动注入，生成分发脚本。 |
| `kejilion.sh` | 注入后的完整脚本（与官方版保持同步并含全部增强功能）。 |
| `x.sh` | 极速安装与直达入口脚本（与 `kejilion.sh` 保持同步）。 |
| `website/public/` | 网站静态托管目录，供外部用户 `curl` 下载 `x.sh`、`kejilion.sh`、`apps_manager.sh`。 |
| `website/generate_daily_recommend.js` | 网站每日精选应用生成脚本，用于生成每日推荐 JSON 数据。 |
| `README.md` | 项目主文档，记录功能特色、7 大分类矩阵表格与 CLI 快捷指令速查。 |
| `HANDOFF.md` | 本交接文档。 |
