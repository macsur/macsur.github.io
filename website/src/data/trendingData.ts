/**
 * 🌟 [Github乐园] GitHub Trending 官方热榜今日数据 (全自动中文汉化版)
 * 抓取时间: 2026-10-31 10:54 (UTC+8)
 * 数据来源: https://github.com/trending
 */

export interface GithubTrendingRepo {
  rank: number;
  name: string;
  rawName: string;
  owner: string;
  repo: string;
  stars: string;
  forks: string;
  starsToday: string;
  language: string;
  langColor: string;
  tag: string;
  desc: string;
  enDesc: string;
  githubUrl: string;
  deployCmd: string;
}

export const LAST_UPDATED_AT = "2026-10-31 10:54 (UTC+8)";

export const GITHUB_TRENDING_APPS: GithubTrendingRepo[] = [
  {
    "rank": 1,
    "name": "claude-mem · 记忆链智囊",
    "rawName": "claude-mem",
    "owner": "thedotmack",
    "repo": "thedotmack/claude-mem",
    "stars": "106,387",
    "forks": "9,365",
    "starsToday": "+1,140 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "🏆 全球登顶 No.1",
    "desc": "claude-mem 是一款专为 AI 编码智能体打造的持久化上下文记忆中间件，精准击中了当前大模型辅助开发中最棘手的「会话遗忘」痛点。在架构层面，它充当了编码代理与本地存储之间的智能中间层，通过轻量级钩子机制捕获智能体在每次会话中的全部操作轨迹与推理过程，再借助大语言模型将这些原始日志实时压缩为高密度的语义摘要，并持久化到本地向量索引中。当用户开启新会话时，系统会基于当前任务上下文进行相关性打分检索，将最匹配的历史经验自动注入提示词，彻底消除了反复交代背景与重复试错的低效循环。其核心技术亮点在于通用型接口层设计，原生兼容 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等几乎所有主流智能体引擎，实现了真正的跨工具记忆漫游。对于开发者而言，claude-mem 不仅大幅提升了长周期项目的研发连贯性与代码协同质量，更让 AI 代理具备了「越用越聪明」的自学习能力，从根本上释放了自主化编程助手在大型复杂工程中的持久战斗力，堪称 AI 辅助编程时代的记忆基础设施。",
    "enDesc": "Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More",
    "githubUrl": "https://github.com/thedotmack/claude-mem",
    "deployCmd": "git clone https://github.com/thedotmack/claude-mem.git"
  },
  {
    "rank": 2,
    "name": "OpenMausBot · 开源虚拟机智能体",
    "rawName": "OpenMausBot",
    "owner": "milind-soni",
    "repo": "milind-soni/OpenMausBot",
    "stars": "8,748",
    "forks": "1,205",
    "starsToday": "+895 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "🥈 今日榜眼 No.2",
    "desc": "OpenMausBot 是一个开源的 Grok Bot 替代方案，其核心创新在于为 AI 智能体提供了独立的虚拟机运行环境。与传统聊天机器人仅依赖文本交互不同，OpenMausBot 为每个智能体配备了完整的虚拟计算机，包含浏览器、文件系统和工具链，使 AI 能够像人类操作员一样执行复杂的多步骤任务。在架构设计上，该项目采用了沙箱隔离机制，确保智能体的所有操作都在受控环境中执行，每个动作在执行前都经过决策审核，执行后自动记录审计日志。这种「先决策后执行」的双阶段模式有效解决了 AI 自主操作中的安全隐患与不可追溯问题。项目基于 TypeScript 构建，提供了 AG-UI 兼容接口，支持接入任意符合该协议的智能体引擎，具备极强的生态扩展能力。对于开发者而言，OpenMausBot 提供了一个安全可控的 AI 自动化实验平台，特别适合需要 AI 执行文件操作、网页浏览、代码编辑等实际计算机任务的场景，是构建下一代自主 AI 助手的重要基础设施。",
    "enDesc": "Open-source Grok Bot alternative with a virtual machine that bots can use",
    "githubUrl": "https://github.com/milind-soni/OpenMausBot",
    "deployCmd": "git clone https://github.com/milind-soni/OpenMausBot.git"
  },
  {
    "rank": 3,
    "name": "impeccable · 无瑕设计语言",
    "rawName": "impeccable",
    "owner": "pbakaus",
    "repo": "pbakaus/impeccable",
    "stars": "97,174",
    "forks": "5,722",
    "starsToday": "+2,300 今日新增",
    "language": "Rust",
    "langColor": "#dea584",
    "tag": "🥉 今日探花 No.3",
    "desc": "impeccable 是一套专为 AI 编程助手打造的前端无瑕设计语言与效能增强系统，旨在彻底根治大模型在生成用户界面时常犯的千篇一律、缺乏灵魂等行业通病。作为现代 AI 工程的重要插件，它通过开箱即用的安装流与独特的架构设计，将标准化的产品真相固化于结构化文档中，使 AI 在执行前端开发时能够精准理解产品内核与受众诉求。该系统内置了二十四个高度凝练的专业设计指令，涵盖从前期的结构规划、视觉提炼到后期的深层微调与全面审计，赋予人类开发者与 AI 进行高效且垂直的设计对话能力。同时，项目创新性地融合了六十一条无需依赖外部 API 的确定性检测规则及大模型批判性检查机制，结合实时浏览器迭代能力，在本地即可完成前端代码的无障碍、响应式与性能等多维度的严苛质量校验。这一全方位的架构不仅有效击穿了传统大模型在美学审美与工程落地上的技术痛点，更以工程化的精密契合重塑了 AI 时代的前端交互生产力范式。对于追求极致视觉表现与工程落地效率的开发者而言，它提供了一套从根本上提升 AI 代码美学下限与设计上限的工业级实战解决方案。",
    "enDesc": "The design vocabulary for your coding agent. Steer with polish and bolder, review with critique and audit, catch AI slop before it ships.",
    "githubUrl": "https://github.com/pbakaus/impeccable",
    "deployCmd": "git clone https://github.com/pbakaus/impeccable.git"
  },
  {
    "rank": 4,
    "name": "OpenBot · 开源 AI 同事",
    "rawName": "OpenBot",
    "owner": "CopilotKit",
    "repo": "CopilotKit/OpenBot",
    "stars": "8,845",
    "forks": "1,110",
    "starsToday": "+706 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 4 趋势",
    "desc": "OpenBot 是 CopilotKit 团队推出的开源 AI 同事平台，其核心理念是让每个 AI 智能体都拥有独立的计算机工作环境。与传统 AI 助手仅提供对话接口不同，OpenBot 为每个智能体配备了完整的虚拟桌面，包含浏览器、文件系统和工具链，使 AI 能够像真实员工一样执行复杂的多步骤工作任务。在架构设计上，项目采用了「决策-执行-审计」三阶段工作流：每个动作在执行前都经过智能体自主决策，执行过程中实时记录操作日志，执行后自动生成审计报告。这种设计有效解决了 AI 自主操作中的安全合规与可追溯性问题。项目基于 TypeScript 构建，提供了 AG-UI 标准接口，支持接入任意符合该协议的智能体引擎，具备极强的生态扩展能力。对于企业用户而言，OpenBot 提供了一个安全可控的 AI 自动化办公平台，特别适合需要 AI 执行文档处理、数据分析、网页操作等实际办公任务的场景，是构建下一代智能办公助手的重要基础设施。",
    "enDesc": "Open-source AI coworkers that each get a computer of their own: a browser, files and tools, with every action decided before it happens and recorded after. Bring any AG-UI agent.",
    "githubUrl": "https://github.com/CopilotKit/OpenBot",
    "deployCmd": "git clone https://github.com/CopilotKit/OpenBot.git"
  },
  {
    "rank": 5,
    "name": "ziwei-doushu · 紫微斗数排盘引擎",
    "rawName": "ziwei-doushu",
    "owner": "Renhuai123",
    "repo": "Renhuai123/ziwei-doushu",
    "stars": "11,317",
    "forks": "2,250",
    "starsToday": "+1,126 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 5 趋势",
    "desc": "紫微斗数开源排盘引擎是基于倪海厦《天纪》体系构建的完整命理计算系统，为传统紫微斗数提供了现代化的开源实现。该项目包含了完整的排盘算法、四化系统、格局知识库以及古籍原文数据，将传统命理学的复杂计算逻辑封装为可编程调用的 API 接口。在架构设计上，项目采用 TypeScript 构建，将紫微斗数的十二宫位、十四主星、辅星、四化飞星等核心概念抽象为类型安全的数据结构，确保计算结果的准确性与可维护性。系统支持多种排盘格式输出，包括传统的命盘图、四化飞星图以及现代化的 JSON 数据格式，方便开发者进行二次开发与集成。对于命理学研究者而言，该项目提供了一个可验证、可扩展的开源参考实现，将传统口传心授的排盘规则转化为透明可查的代码逻辑。对于应用开发者而言，它提供了一个功能完备的紫微斗数计算引擎，可以快速集成到命理分析、运势预测等各类应用中，极大地降低了传统命理学数字化的技术门槛。",
    "enDesc": "紫微斗数开源排盘引擎 — 基于倪海厦《天纪》体系，含完整排盘算法、四化系统、格局知识库、古籍原文数据",
    "githubUrl": "https://github.com/Renhuai123/ziwei-doushu",
    "deployCmd": "git clone https://github.com/Renhuai123/ziwei-doushu.git"
  },
  {
    "rank": 6,
    "name": "skills · Expo 智能体技能集",
    "rawName": "skills",
    "owner": "expo",
    "repo": "expo/skills",
    "stars": "3,911",
    "forks": "247",
    "starsToday": "+38 今日新增",
    "language": "Shell",
    "langColor": "#89e051",
    "tag": "TOP 6 趋势",
    "desc": "expo/skills 是 Expo 官方推出的 AI 智能体技能集合，专为使用 Expo 框架进行移动应用开发的 AI 编程助手设计。该项目将 Expo 生态系统的专业知识封装为一系列可复用的技能模块，使 AI 智能体能够像资深 Expo 开发者一样处理移动应用开发中的各种复杂任务。技能集涵盖了 Expo 项目的全生命周期管理，包括项目初始化、依赖配置、原生模块集成、OTA 更新、应用商店发布等关键环节。在架构设计上，项目采用 Shell 脚本作为主要实现语言，确保了跨平台兼容性与执行效率，每个技能都是独立的可执行单元，支持按需调用与组合编排。对于使用 AI 辅助移动开发的团队而言，expo/skills 极大地降低了 AI 理解 Expo 生态的门槛，使智能体能够准确执行 Expo CLI 命令、处理原生依赖冲突、优化应用性能等专业任务。该项目代表了 AI 编程助手与特定技术栈深度整合的最佳实践，为移动开发领域的智能化提供了重要的基础设施。",
    "enDesc": "A collection of AI agent skills for working with Expo projects and Expo Application Services",
    "githubUrl": "https://github.com/expo/skills",
    "deployCmd": "git clone https://github.com/expo/skills.git"
  },
  {
    "rank": 7,
    "name": "macro · 统一团队工作台",
    "rawName": "macro",
    "owner": "macro-inc",
    "repo": "macro-inc/macro",
    "stars": "5,894",
    "forks": "539",
    "starsToday": "+57 今日新增",
    "language": "Rust",
    "langColor": "#dea584",
    "tag": "TOP 7 趋势",
    "desc": "Macro 是一个统一的工作台，将团队的邮件、聊天、文档、任务、AI 智能体、通话和客户关系管理整合在一起，通过 @ 链接将它们连接起来，并共享 AI 记忆。在架构设计上，Macro 采用了 Rust 语言构建，确保了高性能和内存安全性。它将不同的工作流模块抽象为可组合的单元，用户可以通过 @ 链接在不同的模块之间建立关联，实现信息的无缝流转。同时，Macro 还集成了 AI 智能体，为用户提供智能化的工作辅助。例如，AI 智能体可以自动回复邮件、生成文档、安排任务等。此外，Macro 还提供了共享的 AI 记忆，使团队成员可以共享知识和经验，提高协作效率。对于团队而言，Macro 提供了一个集中的工作平台，将各种工作流整合在一起，减少了信息孤岛和沟通成本，提高了工作效率。对于开发者而言，Macro 提供了一个可扩展的架构，可以方便地集成新的工作流模块和 AI 智能体，满足不断变化的需求。",
    "enDesc": "Macro is a unified workspace for teams: email, chat, docs, tasks, agents, calls, and CRM — @-linked together with shared AI memory.",
    "githubUrl": "https://github.com/macro-inc/macro",
    "deployCmd": "git clone https://github.com/macro-inc/macro.git"
  },
  {
    "rank": 8,
    "name": "skills · 实战工程师技能集",
    "rawName": "skills",
    "owner": "mattpocock",
    "repo": "mattpocock/skills",
    "stars": "307,543",
    "forks": "25,890",
    "starsToday": "+876 今日新增",
    "language": "Shell",
    "langColor": "#89e051",
    "tag": "TOP 8 趋势",
    "desc": "mattpocock/skills 是由知名 TypeScript 教育者 Matt Pocock 开源的个人 AI 智能体技能集合，直接来源于他日常使用的 .agents 目录配置。该项目代表了资深工程师在 AI 辅助编程领域的最佳实践沉淀，将多年积累的开发经验、调试技巧、重构模式和架构决策封装为可复用的技能模块。在架构设计上，项目采用 Shell 脚本作为实现语言，每个技能都是独立的可执行单元，涵盖了从代码审查、性能优化到测试策略等软件工程全生命周期的关键环节。Matt Pocock 作为 TypeScript 社区的权威人物，其技能集特别注重类型安全、代码可维护性和工程规范性，为 AI 智能体提供了高质量的工程实践指导。对于开发者而言，该项目提供了一个学习资深工程师工作方式的窗口，可以直接复用这些经过实战检验的技能模块来提升自己的 AI 辅助开发效率。同时，项目的开源性质也鼓励社区贡献更多高质量的技能模块，形成了一个持续进化的工程知识库。",
    "enDesc": "Skills for Real Engineers. Straight from my .agents directory.",
    "githubUrl": "https://github.com/mattpocock/skills",
    "deployCmd": "git clone https://github.com/mattpocock/skills.git"
  },
  {
    "rank": 9,
    "name": "t3code · T3代码全能助手",
    "rawName": "t3code",
    "owner": "pingdotgg",
    "repo": "pingdotgg/t3code",
    "stars": "32,826",
    "forks": "8,662",
    "starsToday": "+930 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 9 趋势",
    "desc": "作为一款开创性的「AI智能体控制中枢」，t3code 旨在彻底打破本地编程环境与多云端 AI 助手之间的割裂状态。其核心架构巧妙充当了统一的代理 harness 控制面，无缝对接并调度运行在你本地机器上的各类主流 AI 引擎与订阅服务，如 Claude Code、Codex、Cursor、Grok Build、OpenCode 及 Google Antigravity 等。该项目精准直击了现代开发者在多重 AI 工具切换时操作繁琐、缺乏统一协同界面的技术痛点。通过提供卓越性能的跨平台桌面客户端、原生移动端 App 以及响应迅捷的 Web 控制台，它赋予了开发者随时随地远程监控、干预和掌控本地 AI 编码任务的极致自由。其关键功能特色在于高度开放的插件化引擎集成、出色的多端同步响应能力以及开箱即用的后台常驻服务。对于追求极致生产力的开发者而言，它不仅是一款能大幅提升编码流流畅度的效率利器，更是一套具备极高透明度与二次开发价值的开放源代码解决方案，充分展现了下一代人机协同编程的演进方向。",
    "enDesc": "暂无详细描述，点击前往 GitHub 探索项目源码。",
    "githubUrl": "https://github.com/pingdotgg/t3code",
    "deployCmd": "git clone https://github.com/pingdotgg/t3code.git"
  },
  {
    "rank": 10,
    "name": "DeepTutor · 终身个性化导师",
    "rawName": "DeepTutor",
    "owner": "HKUDS",
    "repo": "HKUDS/DeepTutor",
    "stars": "51,847",
    "forks": "6,355",
    "starsToday": "+2,282 今日新增",
    "language": "Python",
    "langColor": "#3572A5",
    "tag": "TOP 10 趋势",
    "desc": "DeepTutor 是由香港大学数据科学实验室（HKUDS）开发的终身个性化 AI 导师系统，旨在为每个学习者提供持续进化、高度定制化的教育体验。该项目的核心定位是突破传统在线教育「一刀切」的局限，通过深度学习与知识图谱技术构建学习者的个性化知识模型，实现真正的因材施教。在架构设计上，DeepTutor 采用了模块化的多智能体架构，包含知识追踪、学习路径规划、内容生成、评估反馈等核心模块，每个模块都可以独立进化并协同工作。系统通过持续追踪学习者的知识掌握状态、学习风格偏好和认知负荷水平，动态调整教学策略和内容难度，确保学习过程始终处于最佳挑战区间。其关键技术亮点包括基于大语言模型的自适应内容生成、多模态学习资源推荐、以及终身学习记忆机制。对于教育工作者而言，DeepTutor 提供了一个可定制的智能教学平台；对于学习者而言，它是一位永不疲倦、持续进化的私人导师；对于研究者而言，它是探索 AI 教育应用前沿的重要实验平台。",
    "enDesc": "DeepTutor: Lifelong Personalized Tutoring. https://deeptutor.info/.",
    "githubUrl": "https://github.com/HKUDS/DeepTutor",
    "deployCmd": "git clone https://github.com/HKUDS/DeepTutor.git"
  }
];
