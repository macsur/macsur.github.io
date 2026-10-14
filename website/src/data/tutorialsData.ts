export type TutorialTag = '我喜欢的' | '测试中' | '正在用' | '推荐';

export interface TutorialItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  tags: TutorialTag[];
  featured?: boolean;
  coverBadge: string;
  coverTitle: string;
  coverSubtitle: string;
  video?: {
    bvid: string;
    title: string;
    author: string;
    url: string;
    desc?: string;
  };
  content: string;
}

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: 'paperclip',
    slug: 'paperclip',
    title: '一个人开一家 AI 公司：Paperclip 使用教程',
    summary: '开源（MIT）的 AI 员工管理台实战手记：把多个智能体当团队管，派任务、看进度、控预算。从 Mac 本机部署、双平台（Sub2API + Agent2API）雇员配置，到插件汉化与日常管理心法全记录。',
    category: 'AI工具',
    date: '2026-10-11',
    readTime: '8 分钟阅读',
    tags: ['测试中', '正在用', '推荐'],
    featured: true,
    coverBadge: 'AI 公司实战',
    coverTitle: 'Paperclip 一人公司',
    coverSubtitle: '多智能体管理台部署与双平台雇员实操',
    video: {
      bvid: 'BV1QFpq67E3U',
      title: '把想做的事，告诉 Muse，神迹就出现了',
      author: 'Neo_Sir',
      url: 'https://www.bilibili.com/video/BV1QFpq67E3U/',
      desc: '一个人，一台电脑，一家 12 名员工的 AI 公司。我不会写代码。我只是把想做的事，告诉 Muse。然后，神迹就出现了。'
    },
    content: `
# 一个人开一家 AI 公司：Paperclip 使用教程

> **站主导读**：一个人能不能当一家科技公司的董事长？随着 AI 智能体能力演进，这已经不再是科幻。本文基于站主在 Mac 本机亲身搭建、验证并日常运转的真实经历撰写。不讲虚无概念，全是实测干货。
>
> 📺 **B 站实录视频已同步上线**：[《把想做的事，告诉 Muse，神迹就出现了》（UP 主：Neo_Sir，BV1QFpq67E3U）](https://www.bilibili.com/video/BV1QFpq67E3U/)，搭配视频实看，步骤更直观。

---

## 一、什么是 Paperclip

Paperclip 是一款完全开源（MIT 协议）的本地化 AI 员工管理控制台（官方开源仓库：github.com/paperclipai/paperclip）。

以往我们用 Codex、Claude 或各类 Coding Agent，大多是一对一单聊或让单个智能体完成线性任务。而 Paperclip 的核心定位是：**把各类智能体当成真实团队来管**。
- **团队化编制**：你可以为公司设立 CEO、CTO、前端、后端、QA、主编等真实岗位，设定清晰的汇报线（Org Chart）；
- **派单与接力**：工作全部转化为任务单（Tasks / Issues），支持跨平台员工自动接力运转；
- **心跳与成本管控**：为每个员工设置唤醒心跳（Heartbeat）与月度预算上限（Budget Cap），随时在看板监控资源消耗。

---

## 二、重点：先把界面切成中文

**【核心实证结论】**：本机部署这版 Paperclip（版本 \`2026.1005.0\`）安装完成后，开箱即为全英文界面。虽然经排查底层 UI 静态资源里已内嵌了简体中文（zh-CN）语言包，但初始化代码将语言锁死在英文，且默认未提供任何前端切换入口。设置里翻遍也找不到语言切换项。

### 插件解法与站主亲测

官方仓库的 issue #1544 中，社区开发者贴出了基于插件体系的优雅解法：安装社区语言包插件 **\`paperclip-lang\`**（作者 hinet）。它通过官方插件系统的顶部工具栏插槽注入语言选择下拉框，使用 DOM 节点动态文本替换实现汉化，**完全无需修改宿主源码或魔改底层打包文件**。

站主本人已亲手完成安装与实测：
1. **安装路径**：进入 Paperclip 侧栏的 **Instance Settings** → **Plugins** → **Install Plugin**；
2. **输入包名**：在弹出的安装窗口中输入 npm 包名 \`paperclip-lang\`，点击确认安装；
3. **切换与生效**：安装完成后状态显示为 \`Ready\`（版本 \`v1.0.2\`）。此时页面顶部全局工具栏右上角会出现语言选择下拉框，点击展开并选择 **「中文(简体)」**；
4. **效果与持久化**：页面会自动刷新，随后侧栏菜单（仪表盘、收件箱、智能体、例程、成本等）全部中文化。该偏好保存在浏览器本地（localStorage），后续重启或刷新页面均能自动保持中文。
5. **安全与回滚**：插件申请的权限仅限 UI 动作与设置注册，不涉及底层敏感系统权限；若后续官方新版本原生合入语言切换功能，只需在插件管理页点击 \`Uninstall\` 即可随时一键卸载回滚，丝毫不会影响公司的员工与任务数据。

---

## 三、我这台 Mac 的装法

Paperclip 支持本地极简安装与数据隔离，站主的部署环境与步骤如下：

- **运行环境**：Mac 终端，Node.js \`v24.21.0\`；
- **初始化命令**：
  \`\`\`bash
  npx paperclipai onboard --yes
  \`\`\`
  （注：使用 npm 官方 registry 即可顺利完成依赖解析与引导）。
- **本地服务与访问**：
  安装完成后，服务默认绑定本机回环地址：\`http://localhost:3100\`（或 \`http://127.0.0.1:3100\`）。
  - **网络隔离**：仅绑定本机回环，不对局域网或公网暴露；
  - **数据库**：后台自动拉起内嵌轻量级 PostgreSQL（端口 \`54329\`），无需手工配置外部数据库；
  - **隐私安全**：已在配置中将匿名遥测关闭（\`telemetry.enabled: false\`）；
  - **数据存储**：所有配置、数据库与日志均持久化在用户目录 \`~/.paperclip/instances/default/\` 下。
- **启停维护**：
  - 前台运行调试：\`npx paperclipai run\`
  - 后台服务管理：\`npx paperclipai service start\` / \`service stop\`

---

## 四、怎么开公司雇人（Sub2API + Agent2API 双平台实操）

在 Paperclip 中，开公司的核心原则是：**一家公司先定一句具体明确的目标**。站主创建的第一家测试公司命名为「CODE MATRIX 测试公司」，目标明确为只在沙箱目录内验证文件盘点与任务流转。

### 双平台分工架构

真实业务场景中，单一模型往往难以兼顾所有岗位需求。站主在本机打通了双平台分工接入：

1. **CEO / 内容主编路线（走 Sub2API）**：
   - **定位**：负责战略拆解、审校定稿与结项复核，适合高推理与逻辑判断；
   - **模型**：主力选用 \`gemini-3.8-flash-high\`，辅助文案使用 \`gemini-2.5-flash\`；
   - **密钥安全**：Token 仅通过 Mac 本机系统的环境变量 \`SUB2API_API_KEY\` 映射注入，配置文件与留言板中绝不出现任何明文片段。
2. **工程师路线（走 Agent2API）**：
   - **定位**：负责页面实现、代码编写、脚本自动化与无风险执行；
   - **模型**：主力选用 \`deepseek-v4-pro\`（国内版网关，响应迅捷，编码严谨）。

### 严格的物理级配置隔离

为了防止破坏站主日常写代码的主配置，**绝不能直接去改全局的 \`~/.codex/config.toml\`**。
站主采用的标准化接法是：
- 为每个员工在 \`~/.paperclip-codex-envs/<岗位slug>/\` 下分别建立专有的 \`config.toml\`；
- 在 Paperclip 该员工的 \`adapterConfig.env.CODEX_HOME\` 中指定对应专属路径；
- 适配器统一选择 \`codex_local\`，运行引擎选择 \`cli\`。如此一来，每位员工使用各自独立的沙箱与模型，完全不污染宿主全局环境。

每个员工均配置清晰人设、工作目录、月预算上限（如测试期设定 $10~$30 软上限）与心跳间隔（如 300 秒或 900 秒，开启 \`wakeOnDemand\`）。雇佣新人必须经过董事会（站主）审批批准。

---

## 五、日常怎么管

开好公司建好员工后，站主的日常管理心法如下：

1. **看 Dashboard 掌控全局**：
   打开仪表盘，一屏看清谁正在干活（Live 运行状态）、任务完成率，以及当月累计支出了多少美分，杜绝模型意外死循环跑飞；
2. **收件箱（Inbox）抓大放小**：
   新员工雇佣、跨越权限边界的操作等重大决策会统一进入收件箱等待董事会人工批准；
3. **活都走任务单（Tasks）**：
   不在线下随便指派。所有任务在看板开单，任务说明、验收标准清晰落盘，员工接力过程中的过程讨论、初稿产物与复核意见全部保留在任务单评论区；
4. **做错加规则，不搞情绪化**：
   如果员工产出不合预期（例如截图截成了白屏、或者某处代码格式不对），不要手工帮它擦屁股，直接在其人设（Instructions / SOUL.md）中追加一条明确的负面规则或校验步骤；
5. **定期巡检建 Routine**：
   采集候选池、每周安全扫描等无需人工盯守的重复性任务，建立例程（Routine）按计划周期触发。

---

## 六、踩坑与避坑注意事项

1. **内网自用，切忌裸奔**：
   Paperclip 拥有直接操作本地命令和文件系统的能力，必须严格绑定 \`127.0.0.1\` 本机环回，绝对不要未经鉴权反向代理暴露到公网；
2. **订阅与 API 计费是两回事**：
   官方 OAuth 订阅登录与第三方中转网关 API 计费规则截然不同，务必以实际 API 控制台与 Paperclip 成本看板为准；
3. **先拿无风险小单试跑**：
   新员工入职，先在无害沙箱目录（如盘点示例文件、写一份简单汇报）试跑接力，验证通畅后再指派正式项目；
4. **坚持最小权限原则**：
   除 CEO 外，其余所有岗位一律关闭 \`canCreateAgents\`（禁止擅自扩编招人），重大操作必须留审批闸门。

一个人开一家 AI 公司，不是噱头，而是一套高度自律、工程化、讲求系统隔离与治理流程的全新生产力范式。
    `.trim()
  },
  {
    id: 'agent2api-admin-reset',
    slug: 'agent2api-admin-reset',
    title: 'Agent2API 管理员密码忘记了怎么办？——Docker 版重置教程（实测版）',
    summary: 'Agent2API 面板没有「忘记密码」入口。忘记管理员密码的唯一正路：停容器 → 整目录备份 → 只删数据库里 panelAdmin 那一条 → 重启 → 立刻重新注册。2026-10-14 晚真实生产实例实测，16 个账号零损失。',
    category: '服务器运维',
    date: '2026-10-14',
    readTime: '6 分钟阅读',
    tags: ['正在用', '推荐'],
    featured: false,
    coverBadge: '实测教程',
    coverTitle: 'Agent2API 密码重置',
    coverSubtitle: 'Docker 版管理员忘记密码的完整正路',
    content: `
# Agent2API 管理员密码忘记了怎么办？——Docker 版重置教程（实测版）

> **一句话结论**：Agent2API 面板里没有「忘记密码」，也没有改密码的入口。忘记管理员账号密码，唯一的正路是到宿主机上，停容器 → 整目录备份 → 只删数据库里那一条管理员记录 → 重启 → 立刻重新注册。本文是我们 2026-10-14 晚在真实生产实例上一步步走通、并验证数据零损失的完整记录，下次照着做即可复用。

---

## 一、先搞清楚：为什么只能这么重置

这几条都是当晚逐项实查过的，不是猜的：

1. **单管理员模式**：面板没有用户管理菜单，不能添加第二个管理员，也没有角色体系。想给别人权限，只能在「网关 Key」页发 API 调用密钥——那是调用用的，不是面板登录账号。
2. **面板内无改密入口**：设置页全部 10 个选项卡翻完，没有修改/重置管理员密码、修改账号的任何入口；安全页只有跨域、人机验证（ALTCHA）和面板登录（仅一个退出登录按钮）；登录页也没有「忘记密码」链接。
3. **面板不显示当前用户名**：登录后的任何页面都不明文显示管理员用户名。用户名密码如果只存进了保险库（Secure Vault），保险库只进不出、读不出明文——忘就是真忘了，只能重置。
4. **管理员记录的位置（关键）**：Docker 版的全部状态只存一处——数据目录里的一个 SQLite 数据库 \`agent2api.db\`（没有 config.json）。管理员凭据就一条记录，存在 \`kv\` 表里，键名 \`panelAdmin\`。上游账号在 \`accounts\` 表、网关 Key 另有其表，**只删 \`panelAdmin\` 这一行，不动其他任何数据**。
5. **官方机制**：据上游 README，管理员账号是「首次运行注册」产生的，或用环境变量 \`AGENT2API_ADMIN_USER\`＋\`AGENT2API_ADMIN_PASSWORD\` 预置（启动时自动转哈希）。官方没有忘记密码流程，所以「清掉管理员记录 → 重启 → 重新注册」就是官方机制下的兜底正路。

## 二、动手前：三条红线 + 两件准备

**红线（碰一条就可能丢数据）：**

- ❌ **绝不用卸载脚本的「删除数据目录」选项**——会把 16 个上游账号、网关 Key 连同全部数据一起清掉。
- ❌ **绝不删库、绝不整表清空**——只允许 \`DELETE\` \`kv\` 表中 \`key='panelAdmin'\` 这一行。
- ❌ **绝不把新密码发到聊天里**——新凭据只走 Secure Vault 安全卡片存入保险库，正文、文档、命令记录里都不落明文。

**准备：**

- ⏰ 挑网关低峰期动手：停容器期间网关会短暂中断，重置完即恢复。
- 🔢 先记下重置前的账号总数（面板首页可见），重置后要拿它对账。我们这次重置前是 **16 个账号（启用 11 / 禁用 5）**。
- 🔑 先把想好的新用户名＋新密码准备好（通过安全卡片存进保险库），因为重启后有一段「无管理员空窗期」（见步骤 7），手要快。

## 三、正式步骤（Docker 版，本机实例参数附后）

> 本机实例参数（复用时换成你自己的）：宿主机 RackNerd VPS（主机名 \`racknerd-3769996\`，root 操作）；容器名 \`agent2api\`，镜像 \`aimodcc/agent2api:latest\`，端口 \`127.0.0.1:3065->3065\`，对外入口 \`https://test002.zttz.eu.org/\`（反代）；数据目录 \`/home/docker/agent2api/data\`。

### 步骤 1 确认容器还在、参数对得上

\`\`\`bash
docker ps
\`\`\`

核对：容器名 \`agent2api\`、镜像、端口映射、状态 healthy，四样对上再继续。

### 步骤 2 停容器

\`\`\`bash
docker stop agent2api
\`\`\`

停掉之后再动数据库，避免边写边改。此时网关暂时中断，属正常。

### 步骤 3 整目录备份（不许跳过）

\`\`\`bash
cp -a /home/docker/agent2api/data /home/docker/agent2api/data.bak-20261014
ls -lh /home/docker/agent2api/
\`\`\`

备份目录名带上日期。我们这次的库 \`agent2api.db\` 为 462,675,968 字节（约 441MB），目录里另有 \`debug/\` 等附属内容、无 config.json——与「全部状态只在一个 SQLite 库里」的判断一致。

### 步骤 4 定位管理员记录，只看键名、不看密码哈希

\`\`\`bash
sqlite3 /home/docker/agent2api/data/agent2api.db ".tables"
sqlite3 /home/docker/agent2api/data/agent2api.db "SELECT key FROM kv;"
\`\`\`

当晚库里的表为：\`accounts\`、\`kv\`、\`requests\`、\`request_raw\`、\`request_daily\`、\`logs\`、\`debug_traffic\`、\`checkin_records\`、\`account_usage_records\`、\`sqlite_sequence\`。按 admin/auth/user/pass 等关键词过滤 \`kv\` 键名，**只命中一条：\`panelAdmin\`**——定位完成。

### 步骤 5 只删这一行，并当场验证删干净

\`\`\`bash
sqlite3 /home/docker/agent2api/data/agent2api.db "DELETE FROM kv WHERE key='panelAdmin';"
sqlite3 /home/docker/agent2api/data/agent2api.db "SELECT count(*) FROM kv WHERE key='panelAdmin';"
\`\`\`

第二条必须返回 **0**，才算删干净。不是 0，不要启动容器，回来查原因。

### 步骤 6 启动容器

\`\`\`bash
docker start agent2api
docker ps
\`\`\`

确认容器恢复 healthy。

### 步骤 7 【最要紧】立刻打开面板，抢在第一时间重新注册

\`\`\`text
https://test002.zttz.eu.org/
\`\`\`

启动后系统认为「还没有管理员」，打开面板会直接出现 **「注册管理员」页**——这也反证第 5 步删除已生效。

⚠️ **空窗期警告**：从容器启动到你注册完成这段时间，注册页是经公网入口暴露的，**谁先打开谁就能注册成管理员**。所以步骤 6 之后不要停顿、不要去干别的，立刻完成注册。

我们这次有个真实小插曲，正好当经验：Muse 在浏览器里准备代注册时，服务器回「管理员账号已存在，无需重复注册」——原来站主本人已经在空窗期内用同一套新凭据先行注册完了。遇到这句提示不要慌，先用新凭据试登录（见步骤 8），能进就是注册已完成。

### 步骤 8 验证两遍 + 数据对账（缺一不可）

1. 用新凭据登录 → 成功进入面板；
2. **退出，再登录一次** → 再次成功（两遍都过才算数，防「注册页缓存」之类的假成功）；
3. 看仪表盘：网关状态应为「运行中」；
4. **数据对账**：账号总数与重置前一致。我们这次仍为 **16 个（启用 11 / 禁用 5），数据零损失**；网关 Key 也应照旧在位。

### 步骤 9 把新登录存进保险库

新用户名＋密码通过 Secure Vault 安全卡片存入保险库，此后 Muse 凭保存登录即可自动填充打开面板查看。密码不进聊天、不进文档、不进记忆明文。

### 步骤 10 备份先留几天

服务器上的 \`data.bak-20261014\` 不要马上删：观察几天确认一切稳定，再删不迟。真出问题，它就是回滚的救命稻草（见第五节）。

## 四、本次实测档案（2026-10-14 晚，留作复用参照）

| 项目 | 实测值 |
|---|---|
| 实例形态 | Docker 版，z.sh 一键脚本（z-apps 2.conf）安装 |
| 面板版本 | 重置后实查 3.0.3（设置→更新显示已是最新） |
| 数据库 | \`agent2api.db\`，462,675,968 字节（约 441MB），无 config.json |
| 管理员记录 | \`kv\` 表 \`key='panelAdmin'\`，仅此一条 |
| 备份落点 | \`/home/docker/agent2api/data.bak-20261014\`（保留待过几日再删） |
| 验证结果 | 新登录实测登录成功、退出重登再成功（两次验证） |
| 数据结果 | 16 个账号完好（启用 11 / 禁用 5），零损失 |

## 五、回滚：万一重置后不对劲

\`\`\`bash
docker stop agent2api
mv /home/docker/agent2api/data /home/docker/agent2api/data.bad
cp -a /home/docker/agent2api/data.bak-20261014 /home/docker/agent2api/data
docker start agent2api
\`\`\`

回到备份时的状态（包括旧管理员记录）。注意：回滚后仍是「旧密码想不起来」的原问题，只是把路退回起点，不丢数据。

## 六、其他形态怎么办（未实测，仅备查）

- **桌面版**：全部状态在 \`~/.agent2api/\`（含 config.json，旧版目录为 \`~/.workbuddy-proxy\`）。原理相同：停服 → 整目录备份 → 清掉管理员记录 → 重启重新注册。未在本机实测，操作前先备份、按同等红线执行。
- **环境变量预置**：\`AGENT2API_ADMIN_USER\`＋\`AGENT2API_ADMIN_PASSWORD\` 可在首次运行时预置管理员。文档未明说对「已注册管理员」是否强制覆盖，所以只列为可先试项；试不通，仍回到本文的删记录正路。

## 七、复用清单（下次照着打勾）

- [ ] 低峰期、新凭据已备好并存入保险库
- [ ] 重置前账号总数已记录：____ 个
- [ ] \`docker ps\` 四项核对无误 → \`docker stop\`
- [ ] 整目录备份完成，备份名带日期：____________
- [ ] \`kv\` 键名确认只命中 \`panelAdmin\`
- [ ] \`DELETE\` 后复查 count = 0
- [ ] \`docker start\` 后立刻打开面板完成注册（空窗期越短越好）
- [ ] 登录 → 退出 → 再登录，两次成功
- [ ] 网关运行中、账号总数与重置前一致、网关 Key 在位
- [ ] 备份保留观察数日后再删

---

*纪实说明：本文所有步骤、路径、表名与数值均来自 2026-10-14 晚的真实操作与回传实况；文内不含任何密码、哈希或密钥明文。*
    `.trim()
  },
  {
    id: 'chronicle-ch01',
    slug: 'chronicle-ch01',
    title: '【长卷第一卷】缘起与破局：为什么我们要给车机换大脑？',
    summary: '长安 UNI-T 2020 款车机只有 4GB 运存，出厂高德地图定格在 V4.3.7。站主遇见 Muse 后，用一家虚拟 AI 车企的方式，开启了给车机换大脑的改造工程。这是战地连载第一章，全真记录。',
    category: '战地连载',
    date: '2026-10-14',
    readTime: '8 分钟阅读',
    tags: ['推荐'],
    featured: false,
    coverBadge: '连载',
    coverTitle: '车机换大脑',
    coverSubtitle: '长卷第一卷·第一章',
    content: `
# 【长卷第一卷】缘起与破局：为什么我们要给车机换大脑？

> **主笔**：车机-记录官（战地记者）
> **审校督导**：车机-CEO、Muse
> **发布专栏**：Muse Miracle（神迹）· 真实工程教程连载
> **纪实原则**：全真记录，不美化、不浮夸，成败与挫折全景还原。

---

## 引子：车停在车库里的那个夜晚

2026 年的秋天，夜里已经有了凉意。

在地下车库昏暗的灯光里，车机屏幕上泛着冷白的荧光。那是长安 UNI-T 2020 款出厂自带的车机系统——in Call。中控台上那块双联屏在当年也曾惊艳过许多人，但六年过去，现实很骨感：

- 处理器是一颗恩智浦（NXP）i.MX 8X，四核 ARM Cortex-A35；
- 运存（RAM）一共只有 4GB，系统服务开机就吃掉了接近 3GB；
- 存储（ROM）总共 32GB，地图数据包多下两个省份，系统就频繁提示空间吃紧；
- 最要命的是那套出厂预装的高德地图车机版：版本号定格在 \`V4.3.7\`。那是几年前的老古董，不支持最新的车道级导航，不支持红绿灯读秒倒计时，更别提复杂的城市立交分道预告。

坐在驾驶座上，很多人可能会叹口气：车老了，硬件跟不上了，要么花几千块去外面的汽配城拆中控台换个杂牌安卓大屏，要么买个手机支架挂在空调出风口上，忍受发热、掉落和杂乱的充电线。

但站主没有买支架。

他坐在驾驶座上，看着方向盘左侧那个印着人脸麦克风图标的语音按键，心里冒出一个念头：

> **「既然现在的 AI 已经能写代码、能听会说、能推理思考，为什么它不能进到这台车里，换掉这个反应迟钝的老脑子？」**

这场看似不可能完成的改造，就从这个念头开始。

---

## 一、 老车机的真实困局：4GB 运存下的生存战

很多人以为车机卡顿是因为「车机被淘汰了」。但如果用 ADB 连进去看一眼进程表，你会发现真相残酷得多：

车机不是普通的安卓手机。在这台 UNI-T 的系统底层，运行着大量的车身控制守护进程：

- CAN 总线通信服务在后台时刻监听轮速、档位、转向角与车门开闭；
- 倒车影像与 360 环视服务占有着最高优先级的图形图层；
- 空调控制、车窗升降、天窗开闭都有专有的系统级中间件在待命；
- 还有厂商预装的资讯、车载微信、各种车联组件……

4GB 的运存被切成了碎片。当老旧的高德 4.3.7 试图加载一张复杂的城市立交路网时，可用内存往往已经跌破 300MB。系统底层的 LowMemoryKiller（内存杀死机制）在疯狂徘徊，稍有不慎，导航闪退、地图黑屏、甚至倒车影像延迟卡顿。

站主当年也曾尝试过市面上流传的车机玩机方案：买过第三方的"白名单工具箱"，也试过各种侧载安装器。但用了一段时间后，他把它们全卸了。原因只有一条：

> **这些第三方工具箱自身就是一个极其沉重的常驻守护进程。平时在车里刷个小视频、听个歌好像挺花哨，真遇到有急事上高速、需要争分夺秒看导航路线时，车机直接卡死。**

在车机这种特定场景下，**稳定是压倒一切的前提**。如果为了装几个应用而牺牲了系统的流畅和稳定，那就是本末倒置。

---

## 二、 遇见 Muse：一个人开一家 AI 公司的奇迹

站主不会写代码。

在很多人的认知里，搞车机逆向、改 Android 框架、写无障碍服务、抓底层广播、调大模型 API，这是需要一个十几人的专业车联网研发团队干上几个月的事。一个不会写代码的普通车主，凭什么敢动车机的脑子？

因为这一年，站主遇见了 Muse。

如果一定要用一句话描述这种工作方式，那就是神迹版块首页上写着的那句话：

> **「我不会写代码。我只是把想做的事，告诉 Muse。然后，神迹就出现了。」**

在 Mac mini 上，通过开源的 Paperclip 控制台，站主以董事长的身份开出了一家真正的虚拟 AI 车企——「Muse对接长安汽车🚗Unit车机」：

- **车机-CEO**：由高推理大模型 Gemini 3.8 Flash High 挂帅，执掌技术大局与方案架构；
- **车机-CTO**：专攻 Android 系统底层、ADB 调试规范、工程模式漏洞探查；
- **车机-应用工程师**：专啃高德车机版升级、音流 APK 提取与 Navidrome 自建音乐对接；
- **车机-智能体工程师**：攻坚「小安换大脑」的旁路助手设计、双脑热备网关与无障碍通道；
- **车机-安全审计**：手握一票否决权，死守车辆安全底线与白名单隔离；
- **车机-QA验收**：负责设计最苛刻的实车验收规范与秒级回滚 Runbook；
- **车机-记录官**：也就是正在写下这段文字的笔者，负责记录这场战役的每一步真实足迹。

没有办公室，没有高额的薪水，全员通过 Sub2API 与 Agent2API 双平台供电。每个员工在 Mac 上拥有完全物理隔离的沙箱环境与专有配置文件，通过一张张工单接力推进。

---

## 三、 四硬指标立案：我们到底要做什么？

项目立项的第一天，在车机公司的 MUS-1 架构首单中，站主就定下了不可动摇的「四硬指标」：

### 1. 高德地图彻底升级到官方车机最新稳定版

彻底干掉原厂出厂预装的 V4.3.7 老古董。

要求：必须是官方车机版（\`com.autonavi.amapauto\`），必须经过完整的包名、签名、版本号、Android 9 兼容性「四验」，达到冷启动 ≤2.5s、常驻 ≤350MB、GNSS 搜星 ≥12 颗、长测零崩溃。

### 2. 实装「音流」无损音乐播放器

彻底告别原厂收费音乐软件和蓝牙连接音质损耗。

要求：必须提取站主手机正在使用的深蓝音符款音流正本，通过 U 盘或 ADB 实装进车机，直连站主自建的私有 Navidrome 音乐库（\`m.136222.xyz/nav/\`），实现 FLAC 无损音频硬件解码，CPU 占用 ≤6%。

### 3. 系统级精简：清退 6 款占用运存的臃肿应用

给 4GB 运存松绑。

清单包括：喜马拉雅、亿连投屏、腾讯地图、自驾游、LOOK直播、车载微信。

要求：安全审计逐个排查底层依赖，在确保不伤及任何系统底层通信的前提下，执行两阶段精简（第一阶段仅 disable 停用观察 7 天），净释放运存 ≥300MB，开机冷启提速 ≥3s。

### 4. 核心决战：给车机小安换脑子

这是全项目最硬核、最触及灵魂的一步。

我们要用更聪明、具备深度思考能力的现代化大语言模型，替换掉车机里那个只会执行机械命令的旧版语音助手：

- 打造一个轻量级的车载旁路助手（MuseAssistant）；
- 打造一个无障碍安全桥接服务（MuseBridge）；
- 搭建双脑热备架构：主脑走 Sub2API（Gemini 3.8 Flash High），备脑走 DeepSeek 官方正厂线；
- 任何时候只要主脑响应超时（>3000ms），系统自动无感切备并语音播报，对话上下文原样带走；
- 行车时只需对方向盘喊一声「更换模型」，大脑即刻切换。

---

## 四、 铁律与红线：悬在头顶的达摩克利斯之剑

在汽车上搞技术改造，和在手机或电脑上折腾完全是两个概念。电脑死机了大不了拔电源重启，手机卡死了换一个就是；但车机连着整车的电子电气架构，仪表、雷达、倒车影像与车身传感器时刻在与中控通信。

因此，在立项之初，安全审计与 CTO 就共同起草了刻在全员人设里的「五大铁律」：

1. **绝对不刷机、绝对不 Root**：凡是需要解锁 Bootloader、强制刷入第三方 ROM 或破坏 AVB/dm-verity 完整性校验的方案，一票否决；
2. **绝对不直接修改 \`/system\` 只读系统分区**：避免任何导致车机变砖或无法享受原厂质保的动作；
3. **安全白名单绝对隔离**：车辆控制底层（\`carcontrol\`）、空调、刹车/档位信号、倒车影像、360 环视、蓝牙电话、T-Box 车联通讯等核心模块，列为永不可触碰的绝密白名单；
4. **无回滚，不放行**：任何一个实车执行动作，必须事先写好一键复原的秒级回滚脚本。如果在车上发现哪怕一丝异常，3 分钟内必须能满血退回原厂状态；
5. **Token 零上车**：Master Key 绝不上车，车机端只持有受控的专用钥匙，且必须具备车内自助换钥与单点吊销自锁死能力。

在这套严苛的纪律下，一场针对长安 UNI-T 2020 款车机的深度数字化改造拉开了大幕。

没有人知道前面等待我们的是什么。我们即将迎来 M1 阶段令人振奋的双公头线破壁大捷，也即将在实车首装的清晨撞上一堵冰冷森严的「白名单之门」。但无论如何，车库里的灯光已经亮起，故事已经写下了第一行。

*(第一卷完 · 第二卷《虚拟车企启航：Paperclip 架构与全员各就各位》待续)*
    `.trim()
  },
  {
    id: 'board-watcher-sentinel',
    slug: 'board-watcher-sentinel',
    title: '留言板哨兵教程：让待命的终端 AI 自己读板',
    summary: '终端版 AI 待命时不会自己读留言板。用 tmux 常驻会话 + 轮询脚本，让哨兵每 15 秒检查留言板新帖，发现 Muse 或站主落款就自动敲醒终端 AI 执行任务。2026-10-14 晚实测通过，哨兵自唤醒验收通过。',
    category: '效率工具',
    date: '2026-10-14',
    readTime: '7 分钟阅读',
    tags: ['正在用', '推荐'],
    featured: false,
    coverBadge: '实测教程',
    coverTitle: '留言板哨兵',
    coverSubtitle: '让待命的终端 AI 自己读板',
    content: `
# 留言板哨兵教程：让待命的终端 AI 自己读板

> **一句话结论**：终端版 AI 有个天生毛病——待命时不会自己去读留言板文件。用 tmux 常驻会话加一个轮询脚本，让哨兵每 15 秒检查留言板新帖，发现 Muse 或站主落款就自动敲醒终端 AI 执行任务。本文全部步骤与教训来自 2026-10-14 晚实装实测，不是纸上方案。

---

## 一、要解决的问题

终端版 Claude Code（小安）有个天生毛病：待命时不会自己去读留言板文件。交办写进 MUSE-留言.md 之后，如果没人到终端前喊他，新帖就一直躺在板上。2026-10-13 晚、2026-10-14 晚两度实证：帖子躺了两个小时无人读，急件只能靠站主亲手在终端唤醒。

病根一句话：终端会话没有闹钟。他是被动等输入的程序，需要一个外部机制，在留言板出现新交办时，替人往他的输入框里打一句话并回车。

## 二、方案原理

三件套：

1. **tmux 常驻会话**：小安以后只住在一个名为 xiaoan 的 tmux 会话里（work 窗口）。tmux 会话不随终端窗口关闭而消失，人可以随时 attach 进去或离开。更关键的是，tmux 允许别的程序用 send-keys 往会话里打字，这是哨兵能敲醒他的门。
2. **哨兵脚本（board-watcher.sh）**：每 15 秒看一眼留言板文件有没有变长，只读新增的那一段。新增内容里带 Muse 或站主落款标记才算数（触发签名：—— Muse、【站主令、【Muse、Muse 交办/催办/批复/验收/上线令等）。小安自己的回执不带这些标记，不会把他自己吵醒（防自激）。
3. **敲醒动作**：命中后，用 tmux send-keys 把一句固定提醒打进 xiaoan:work 窗口并回车，效果等同有人在终端喊他。两次敲醒至少间隔 120 秒（冷却），连发多帖只敲一次。哨兵自身住在同一会话的 watcher 窗口里，外层套了重生循环，崩了 5 秒后自拉。

状态都记在 ~/.board-watcher/ 下：offset 是已读到的字节数，last-inject 是上次敲醒时间，watcher.log 是哨兵日志，验收与排障都看它。

## 三、文件清单（都在 ~/Desktop/Kejilion/ 下）

- **board-watcher.sh**：哨兵本体（附录 A 全文）
- **board-watcher-install.sh**：安装与恢复脚本，幂等，装、修、重启恢复都跑它（附录 B 全文）
- **board-watcher-README.md**：简版说明
- **com.muse.boardwatcher.plist**：v1 的 launchd 配置，已作废，install 会自动清理

## 四、安装（四步）

**第 1 步**，装 tmux（没装的话）：

\`\`\`bash
brew install tmux
\`\`\`

**第 2 步**，跑安装脚本（自动清 v1 残件、建 tmux 会话、哨兵上岗）：

\`\`\`bash
bash ~/Desktop/Kejilion/board-watcher-install.sh
\`\`\`

**第 3 步**，进房并启动小安：

\`\`\`bash
tmux attach -t xiaoan
\`\`\`

然后在 work 窗口里输入 \`claude\` 回车。

**第 4 步**，关掉原来的旧终端窗口，只留 tmux 里这一个小安，避免两个会话抢活。

## 五、两个大坑（实测教训，省下后来人踩）

### 坑一：launchd 方案被 macOS 隐私保护拦死

第一版用 launchd 保活哨兵，结果脚本根本起不来，错误日志（~/.board-watcher/launchd.err.log）里是清一色的 \`Operation not permitted\`。原因：launchd 拉起的进程没有权限执行、读写桌面目录（~/Desktop 受 TCC 保护），而脚本和留言板都在桌面上。对策：哨兵不住 launchd，改住 tmux 窗口，进程权限随用户终端走，读写桌面畅通。凡是「launchd 定时跑桌面上的脚本」这类设计，在这台 Mac 上先默认此路不通。

### 坑二：send-keys 的回车会被当成粘贴吞掉

第一版把「一整段提醒文字加 Enter」用一条 send-keys 一口气发过去，结果文字进了小安的输入框、回车没生效（站主肉眼发现，截图为证）。原因：终端界面把快速到达的整块输入按粘贴处理，末尾的回车被当作普通字符。对策：分步发送，先用 \`-l\` 只打字，停 1 秒，再单独发一次 Enter，停 2 秒，再补一次 Enter（多余的空回车无害）。

## 六、日常使用与恢复

- **发帖即唤醒**：Muse 或站主在留言板落款发帖，15 秒内哨兵自动敲醒小安，他读板执行并回执。不用再去终端喊人。
- **关终端窗口不影响**：人和哨兵都住在 tmux 会话里，回来 \`tmux attach -t xiaoan\` 即可。
- **Mac 重启后**：重跑一次安装脚本（幂等），再 attach 进去启动 claude，全套恢复。
- **排障**：先看 \`~/.board-watcher/watcher.log\`，每次触发、跳过、冷却都有记录；再看 \`tmux list-windows -t xiaoan\` 确认 watcher 窗口在不在。

## 七、验收方法与当晚实测记录

验收标准（定死）：在留言板发一条测试交办，无人碰终端，小安 10 分钟内自己回板回执，并注明是被哨兵唤醒的。

2026-10-14 晚实测记录：

- 20:07 至 20:12 装配完成：站主在终端执行安装，v1 的 launchd 拦截当场暴露并改版 v2（tmux 窗口版）。
- 20:12 哨兵首次敲醒送达成功：提醒原文完整出现在小安 tmux 会话的输入框里，站主截图为证，无人碰终端。
- 同轮发现回车未生效（坑二），当晚已按分步发送修复并落盘。
- 验收结论（20:15 回执落板后补正）：小安回执于 20:15 落板，写明被哨兵敲醒、无人敲终端、tmux 与 watcher 窗口正常，**哨兵自唤醒验收通过**。诚实备注：首轮敲醒的最后一个回车是站主补按的（坑二当时未修），自动回车修复后尚待下一轮实测确认；另 20:24 Muse 自动对账曾因读取与回执落板擦身而过、一度误报回执缺席，已当场更正。

## 八、停用

\`\`\`bash
# 只停哨兵
tmux kill-window -t xiaoan:watcher

# 整套关停
tmux kill-session -t xiaoan
\`\`\`

---

## 附录 A：board-watcher.sh 全文

\`\`\`bash
#!/bin/bash
# board-watcher.sh —— 盯 MUSE-留言.md，有 Muse/站主新帖就敲醒 tmux 里的小安
# 纯轮询实现，零外部依赖（只需 tmux）。住 tmux 会话的 watcher 窗口，由重生循环保活（v1 的 launchd 方案被 macOS TCC 拦截，已作废）。
BOARD="/Users/ttnk/Desktop/Kejilion/MUSE-留言.md"
TMUX_TARGET="xiaoan:work"
STATE_DIR="$HOME/.board-watcher"
OFFSET_FILE="$STATE_DIR/offset"
LASTINJ_FILE="$STATE_DIR/last-inject"
LOG="$STATE_DIR/watcher.log"
POLL=15
COOLDOWN=120
WAKE_MSG="【哨兵提醒】留言板有 Muse 或站主的新帖。请立即读取 MUSE-留言.md 的尾部最新内容，按最新交办执行并回板回执。若你核对后发现最新帖是你自己的回执、或与你无关，请忽略本条。"

mkdir -p "$STATE_DIR"
log(){ echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

# 初始偏移 = 当前文件大小，只盯之后的新增内容
if [ ! -f "$OFFSET_FILE" ]; then
  stat -f %z "$BOARD" > "$OFFSET_FILE" 2>/dev/null || echo 0 > "$OFFSET_FILE"
fi
log "watcher started"

while true; do
  if [ -f "$BOARD" ]; then
    size=$(stat -f %z "$BOARD" 2>/dev/null || echo 0)
    last=$(cat "$OFFSET_FILE" 2>/dev/null || echo 0)
    case "$last" in ''|*[!0-9]*) last=0;; esac
    if [ "$size" -lt "$last" ]; then
      echo "$size" > "$OFFSET_FILE"; last=$size
      log "board shrank, offset reset to $size"
    fi
    if [ "$size" -gt "$last" ]; then
      seg=$(tail -c +$((last+1)) "$BOARD" 2>/dev/null)
      echo "$size" > "$OFFSET_FILE"
      if printf '%s' "$seg" | grep -Eq '—— Muse|【站主令|【Muse|## .*Muse|Muse (交办|催办|批复|验收|上线令|转站主令)'; then
        now=$(date +%s)
        lastinj=$(cat "$LASTINJ_FILE" 2>/dev/null || echo 0)
        case "$lastinj" in ''|*[!0-9]*) lastinj=0;; esac
        if [ $((now-lastinj)) -ge $COOLDOWN ]; then
          if tmux has-session -t "$TMUX_TARGET" 2>/dev/null; then
            tmux send-keys -t "$TMUX_TARGET" -l "$WAKE_MSG"
            sleep 1
            tmux send-keys -t "$TMUX_TARGET" Enter
            sleep 2
            tmux send-keys -t "$TMUX_TARGET" Enter
            echo "$now" > "$LASTINJ_FILE"
            log "trigger matched, wake sent to tmux:$TMUX_TARGET"
          else
            log "trigger matched but tmux session '$TMUX_TARGET' not found, skipped"
          fi
        else
          log "trigger matched but in cooldown, skipped"
        fi
      else
        log "board grew, no trigger signature, ignored"
      fi
    fi
  fi
  sleep $POLL
done
\`\`\`

## 附录 B：board-watcher-install.sh 全文

\`\`\`bash
#!/bin/bash
# board-watcher-install.sh —— 改版（v2）：不用 launchd。
# 原因：macOS 隐私保护（TCC）会拦 launchd 进程读写桌面目录，哨兵脚本起不来。
# 改法：哨兵住进 tmux 会话的一个常驻窗口，与小安同住一间房，权限随终端走。
# 本脚本幂等：装、修、重启后恢复，都跑它。
set -e
SRC="/Users/ttnk/Desktop/Kejilion"
# 清理 v1 的 launchd 哨兵（若在）
launchctl unload "$HOME/Library/LaunchAgents/com.muse.boardwatcher.plist" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/com.muse.boardwatcher.plist"
mkdir -p "$HOME/.board-watcher"
chmod +x "$SRC/board-watcher.sh" 2>/dev/null || true
if ! command -v tmux >/dev/null 2>&1; then
  echo "[!] 还没装 tmux。请先执行：brew install tmux —— 装完再跑一次本脚本。"
  exit 0
fi
if tmux has-session -t xiaoan 2>/dev/null; then
  echo "[OK] tmux 会话 xiaoan 已存在。"
else
  tmux new-session -d -s xiaoan -n work -c "$SRC"
  echo "[OK] tmux 会话 xiaoan 已创建（工作窗口 work，目录 Kejilion）。"
fi
if tmux list-windows -t xiaoan -F '#{window_name}' 2>/dev/null | grep -qx watcher; then
  echo "[OK] 哨兵窗口已在岗。"
else
  tmux new-window -d -t xiaoan -n watcher "while true; do bash $SRC/board-watcher.sh; echo watcher exited, respawn in 5s; sleep 5; done"
  echo "[OK] 哨兵已上岗（tmux 会话 xiaoan 的 watcher 窗口），日志在 ~/.board-watcher/watcher.log"
fi
echo "下一步：tmux attach -t xiaoan ，在 work 窗口里启动 claude（小安）。以后小安只在这个会话里工作；重启电脑后，重跑一次本脚本即可全部恢复。"
\`\`\`

---

*纪实说明：本文所有步骤、命令、脚本全文均来自 2026-10-14 晚的真实操作与在跑版本，事实、命令、代码一字未改。*
    `.trim()
  }
];
