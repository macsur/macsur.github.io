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
  }
];
