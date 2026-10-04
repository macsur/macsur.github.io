/**
 * 🌟 [Github乐园] GitHub Trending 官方热榜今日数据 (全自动中文汉化版)
 * 抓取时间: 2026-10-04 15:20 (UTC+8)
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

export const LAST_UPDATED_AT = "2026-10-04 15:20 (UTC+8)";

export const GITHUB_TRENDING_APPS: GithubTrendingRepo[] = [
  {
    "rank": 1,
    "name": "ponytail · 摸鱼大牛",
    "rawName": "ponytail",
    "owner": "DietrichGebert",
    "repo": "DietrichGebert/ponytail",
    "stars": "153,786",
    "forks": "8,267",
    "starsToday": "+1,281 今日新增",
    "language": "JavaScript",
    "langColor": "#f1e05a",
    "tag": "🏆 全球登顶 No.1",
    "desc": "开源项目Ponytail（摸鱼大牛）是一款颠覆传统代码生成逻辑的AI智能体效率增强工具，其核心定位是赋予AI代理资深摸鱼大牛般的极致精简思维，倡导“最好的代码就是从未被写下的代码”。在架构与运行原理上，该工具作为生态中间层深度无缝嵌入二十余主流AI代理，通过精妙的提示词工程与上下文控制逻辑，在不破坏任何安全护栏的前提下，拦截AI代理冗余的防御性编程与过度设计。它精准直击大模型过度编码、消耗海量Token、增加维护成本及拖慢执行速度的技术痛点，实现了将代码量平均缩减百分之五十四、最高达百分之九十四的惊人成效，同时降低约五分之一的API开销并提升运行速度。关键功能特色在于其严苛的克制哲学，它让AI学会“少说废话、只写一行、精准生效”，在真实多任务测试中兼顾了极简性与百分之百的安全性。对于开发者而言，Ponytail具有极高的实战应用价值，不仅能显著削减大模型调用的经济成本与时间延迟，更能倒逼产出架构更清爽、耦合度更低的高质量代码库，堪称AI辅助编程时代提升工程效能的效率神器。",
    "enDesc": "Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote.",
    "githubUrl": "https://github.com/DietrichGebert/ponytail",
    "deployCmd": "git clone https://github.com/DietrichGebert/ponytail.git"
  },
  {
    "rank": 2,
    "name": "impeccable · 无瑕设计语言",
    "rawName": "impeccable",
    "owner": "pbakaus",
    "repo": "pbakaus/impeccable",
    "stars": "75,552",
    "forks": "4,527",
    "starsToday": "+699 今日新增",
    "language": "JavaScript",
    "langColor": "#f1e05a",
    "tag": "🥈 今日榜眼 No.2",
    "desc": "impeccable是一套专为AI编程助手打造的前端无瑕设计语言与效能增强系统，旨在彻底根治大模型在生成用户界面时常犯的千篇一律、缺乏灵魂等行业通病。作为现代AI工程的重要插件，它通过开箱即用的安装流与独特的架构设计，将标准化的产品真相固化于结构化文档中，使AI在执行前端开发时能够精准理解产品内核与受众诉求。该系统内置了二十四个高度凝练的专业设计指令，涵盖从前期的结构规划、视觉提炼到后期的深层微调与全面审计，赋予人类开发者与AI进行高效且垂直的设计对话能力。同时，项目创新性地融合了六十一条无需依赖外部API的确定性检测规则及大模型批判性检查机制，结合实时浏览器迭代能力，在本地即可完成前端代码的无障碍、响应式与性能等多维度的严苛质量校验。这一全方位的架构不仅有效击穿了传统大模型在美学审美与工程落地上的技术痛点，更以工程化的精密契合重塑了AI时代的前端交互生产力范式。对于追求极致视觉表现与工程落地效率的开发者而言，它提供了一套从根本上提升AI代码美学下限与设计上限的工业级实战解决方案。",
    "enDesc": "The design language that makes your AI harness better at design.",
    "githubUrl": "https://github.com/pbakaus/impeccable",
    "deployCmd": "git clone https://github.com/pbakaus/impeccable.git"
  },
  {
    "rank": 3,
    "name": "ECC · 智控芯元",
    "rawName": "ECC",
    "owner": "affaan-m",
    "repo": "affaan-m/ECC",
    "stars": "272,421",
    "forks": "40,679",
    "starsToday": "+897 今日新增",
    "language": "JavaScript",
    "langColor": "#f1e05a",
    "tag": "🥉 今日探花 No.3",
    "desc": "作为面向大模型智能体的高性能运行框架与约束优化系统，ECC（智控芯元）通过深度赋能Claude Code、Cursor、Codex等主流开发工具，开创性地构建起一套兼具安全防御、长效记忆、跨环境技能继承与研究优先开发范式的智能化编排操作系统。针对当前AI智能体在复杂代码工程中普遍面临的上下文衰减、指令失真、盲目修改及安全漏洞等核心痛点，该项目依托严密的底层架构与模块化网关设计，将底层提示词工程与运行时控制逻辑进行了解耦与深度融合。它不仅能够通过多维本能与动态记忆机制赋予智能体类人的持续学习及自适应演进能力，还引入了严苛的安全沙箱过滤机制，确保每次自动化代码演进都遵循研发规范。从架构层面来看，ECC通过高效的协议映射与工具链抽象，打通了异构大模型与本地开发环境的壁垒，显著提升了多智能体协同执行长周期、大规模任务时的鲁棒性与准确率。对于追求极致研发效能的开发者而言，ECC不仅是一套突破工具边界的效率加速器，更是迈向全栈自主智能化软件工程的重要基础设施。",
    "enDesc": "The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.",
    "githubUrl": "https://github.com/affaan-m/ECC",
    "deployCmd": "git clone https://github.com/affaan-m/ECC.git"
  },
  {
    "rank": 4,
    "name": "effect · 效果全栈应用引擎",
    "rawName": "effect",
    "owner": "Effect-TS",
    "repo": "Effect-TS/effect",
    "stars": "16,881",
    "forks": "816",
    "starsToday": "+302 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 4 趋势",
    "desc": "Effect是一款专为TypeScript打造的现代化全栈应用引擎与功能强大的核心库，旨在帮助开发者从容构建出具备生产环境级别的健壮、可维护且绝对类型安全的大型应用程序。面对传统企业级开发在规模化演进中遭遇的类型失控、异常捕获不直观以及异步流管理混乱等底层技术痛点，该项目通过创新的函数式编程范式重塑了状态管理与执行流。其核心架构与运行原理建立在对异步操作、依赖注入、结构化并发、分布式追踪及统一结构验证的全方位抽象之上，通过精密的类型推导管道在编译期消解潜在的运行时崩溃风险。作为跨越多个主流版本的长期支持（LTS）发行版，它为复杂微服务和高并发系统提供了坚实可靠的底层保障。关键功能特色涵盖强类型的错误处理通道、内建的声明式依赖解耦机制、细粒度的调度策略以及无缝集成的统一Schema校验，从而赋予开发者前所未有的控制力与可观测性。对于追求极高代码质量、架构解耦以及长期演进维护成本可控的前沿开发团队而言，Effect不仅重构了全栈应用的编写哲学，更通过极致的类型安全性与成熟的工具链生态，释放出前所未有的工程效能，具备极高的技术引进价值与广阔的工业界实战应用前景。",
    "enDesc": "Build production-ready applications in TypeScript",
    "githubUrl": "https://github.com/Effect-TS/effect",
    "deployCmd": "git clone https://github.com/Effect-TS/effect.git"
  },
  {
    "rank": 5,
    "name": "caveman · 洞穴人编码",
    "rawName": "caveman",
    "owner": "JuliusBrussee",
    "repo": "JuliusBrussee/caveman",
    "stars": "109,626",
    "forks": "6,341",
    "starsToday": "+507 今日新增",
    "language": "Go",
    "langColor": "#00ADD8",
    "tag": "TOP 5 趋势",
    "desc": "开源项目Caveman作为一款近期备受瞩目的智能编码代理优化工具，凭借独特的“洞穴人精简对话”核心定位，在GitHub与Hacker News等社区引发热潮。该项目通过病毒式编码技能与智能网络代理双管齐下，在不牺牲AI代理核心推理能力和代码准确性的前提下，将输入与输出Token消耗大幅削减65%左右。其架构与运行原理主要依赖创新的语义压缩层，通过过滤冗余的礼貌用语、长句解释与格式噪音，迫使大模型使用高信息密度的极简语法输出，在确保代码逻辑丝毫不差的同时，显著降低云端API调用成本并提升交互响应速度。针对当前大语言模型在多轮对话中普遍存在的上下文膨胀与高昂费用的技术痛点，Caveman巧妙地将网页快照体积缩减数倍，并支持三十多种主流编码代理。该项目不仅被Adobe Research及JetBrains等头部机构引用与测试，更在实战中为开发者带来了极高的经济价值与效率倍增，堪称兼具极客趣味与工业级实用价值的生产力利器。",
    "enDesc": "🪨 why use many token when few token do trick. Viral skill + proxy for coding agents that cuts 65% of tokens by talking like a caveman.",
    "githubUrl": "https://github.com/JuliusBrussee/caveman",
    "deployCmd": "git clone https://github.com/JuliusBrussee/caveman.git"
  },
  {
    "rank": 6,
    "name": "Agent-Reach · 全网猎手",
    "rawName": "Agent-Reach",
    "owner": "Panniantong",
    "repo": "Panniantong/Agent-Reach",
    "stars": "90,049",
    "forks": "7,921",
    "starsToday": "+1,696 今日新增",
    "language": "Python",
    "langColor": "#3572A5",
    "tag": "TOP 6 趋势",
    "desc": "Agent-Reach作为一款斩获GitHub日榜冠军的现象级开源工具，其核心定位是为各类人工智能代理赋予全网多模态实时检索与阅读能力。面对传统AI应用高度依赖昂贵且受限的官方API这一技术痛点，该项目开创性地通过统一的命令行界面无缝打通了推特、红迪、优管、GitHub、哔哩哔哩及小红书等主流社交与内容平台，实现了真正的零API费用调用。在架构与运行原理上，它采用高度模块化的多源适配机制与自动化健康体检设计，能够动态抹平不同平台间异构的数据接口差异，确保复杂网络环境下的数据吞吐稳定高效。其关键功能特色在于开箱即用的多平台深度解析能力，不仅支持海量结构化文本抓取，还能智能过滤噪声、精准聚合舆情。对于广大开发者而言，它极大降低了智能体触达真实互联网的工程门槛，免去了繁琐的爬虫逆向与维护成本，有效助力研发人员快速构建具备广阔宏观视野与敏捷数据洞察力的下一代自主AI应用，具备极为广阔的落地应用前景。",
    "enDesc": "Give your AI agent eyes to see the entire internet. Read &amp; search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.",
    "githubUrl": "https://github.com/Panniantong/Agent-Reach",
    "deployCmd": "git clone https://github.com/Panniantong/Agent-Reach.git"
  },
  {
    "rank": 7,
    "name": "t3code · T3代码全能助手",
    "rawName": "t3code",
    "owner": "pingdotgg",
    "repo": "pingdotgg/t3code",
    "stars": "24,810",
    "forks": "6,458",
    "starsToday": "+252 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 7 趋势",
    "desc": "作为一款开创性的“AI智能体控制中枢”，t3code旨在彻底打破本地编程环境与多云端AI助手之间的割裂状态。其核心架构巧妙充当了统一的代理 harness 控制面，无缝对接并调度运行在你本地机器上的各类主流AI引擎与订阅服务，如Claude Code、Codex、Cursor、Grok Build、OpenCode及Google Antigravity等。该项目精准直击了现代开发者在多重AI工具切换时操作繁琐、缺乏统一协同界面的技术痛点。通过提供卓越性能的跨平台桌面客户端、原生移动端App以及响应迅捷的Web控制台，它赋予了开发者随时随地远程监控、干预和掌控本地AI编码任务的极致自由。其关键功能特色在于高度开放的插件化引擎集成、出色的多端同步响应能力以及开箱即用的后台常驻服务。对于追求极致生产力的开发者而言，它不仅是一款能大幅提升编码流流畅度的效率利器，更是一套具备极高透明度与二次开发价值的开放源代码解决方案，充分展现了下一代人机协同编程的演进方向。",
    "enDesc": "暂无详细描述，点击前往 GitHub 探索项目源码。",
    "githubUrl": "https://github.com/pingdotgg/t3code",
    "deployCmd": "git clone https://github.com/pingdotgg/t3code.git"
  },
  {
    "rank": 8,
    "name": "claude-mem · 记忆链智囊",
    "rawName": "claude-mem",
    "owner": "thedotmack",
    "repo": "thedotmack/claude-mem",
    "stars": "95,719",
    "forks": "8,465",
    "starsToday": "+79 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 8 趋势",
    "desc": "claude-mem是一款革新性的智能体上下文持续记忆中间件，旨在攻克AI开发者在切换会话时面临的“上下文遗忘”历史痛点。其核心架构与运行原理在于对编码代理的每一步操作和思考过程进行轻量级捕获，借助高级大语言模型实时提炼高密度的语义摘要，并将关键经验无缝序列化存储至本地向量索引中。在启动新任务或跨会话交互时，它能够通过精准的相关性打分，将最贴近当前工作流的历史上下文精准注入AI代理的Prompt中，避免重复交代背景与试错。它针对多智能体协作中信息壁垒高、Token窗口易饱和的技术难题，创新性地实现了通用型接口层，原生兼容Claude Code、OpenClaw、Codex、Gemini、Hermes等主流智能体引擎。关键功能涵盖自动化经验沉淀、动态语义修剪与跨工具记忆漫游。对于开发者而言，它显著提升了长周期项目的研发连贯性与代码协同质量，使AI代理越用越聪明，从根本上释放了自主化编程助手在大型复杂工程中的持久战斗力。",
    "enDesc": "Persistent Context Across Sessions for Every Agent – Captures everything your agent does during sessions, compresses it with AI, and injects relevant context back into future sessions. Works with Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode + More",
    "githubUrl": "https://github.com/thedotmack/claude-mem",
    "deployCmd": "git clone https://github.com/thedotmack/claude-mem.git"
  },
  {
    "rank": 9,
    "name": "cloudflare-os · 云flare系统",
    "rawName": "cloudflare-os",
    "owner": "cloudflare",
    "repo": "cloudflare/cloudflare-os",
    "stars": "10,642",
    "forks": "1,287",
    "starsToday": "+85 今日新增",
    "language": "TypeScript",
    "langColor": "#3178c6",
    "tag": "TOP 9 趋势",
    "desc": "Cloudflare OS是一套由Cloudflare官方开源的革命性企业级AI生产力操作系统，其核心定位并非传统的底层硬件操作系统，而是一个面向现代企业AI工作流的管理底座与安全运行沙箱。面对企业在大规模落地生成式AI时普遍遭遇的私有数据泄漏隐患、内部系统难以打通以及员工自建工具缺乏管控等关键痛点，该项目依托Cloudflare Workers与workerd边缘无服务器架构构建。其运行原理将企业专有知识库、组织架构上下文与自动化智能体深度绑定，让非技术人员也能借助自然语言在安全可控的环境下即时生成PPT、协作白板与定制化小应用。系统集成了名为Gatekeepers的精细化安全守门人框架，对智能体权限与数据流转进行全程安全防护，既释放了敏捷创新力，又兼顾了企业级防御标准。关键功能特色包括开箱即用的多智能体协同交互、即插即用的个人小工具沙盒生成以及深度的企业级上下文对齐。对于追求AI转型与效率跃升的现代企业而言，它提供了一套可全量私有化定制与自我演进的工业级参考范式。",
    "enDesc": "Agent workspace built on Cloudflare Workers for creating documents, building apps, and running agents with your company’s context and systems.",
    "githubUrl": "https://github.com/cloudflare/cloudflare-os",
    "deployCmd": "git clone https://github.com/cloudflare/cloudflare-os.git"
  },
  {
    "rank": 10,
    "name": "agent-skills · 智元工程技能库",
    "rawName": "agent-skills",
    "owner": "addyosmani",
    "repo": "addyosmani/agent-skills",
    "stars": "100,919",
    "forks": "10,602",
    "starsToday": "+252 今日新增",
    "language": "JavaScript",
    "langColor": "#f1e05a",
    "tag": "TOP 10 趋势",
    "desc": "由谷歌资深架构师Addy Osmani发起的Agent Skills（智元工程技能库），是一套专为AI编码代理打造的生产级标准化工作流与质量控制框架。该项目旨在解决当前AI辅助编程普遍存在的“随意编写、缺乏规范、忽视性能与测试”等技术痛点，将人类资深工程师在多年高标准软件工程实践中沉淀的最佳实践提炼为AI可严格遵循的标准化技能规范。在架构设计与运行机制上，它将软件交付全生命周期严谨拆分为规划、规范、构建、验证、审查与发布等六大关键阶段，并通过九大专属斜杠指令驱动智能体实现闭环执行。关键特色在于其创新的自动化交付模式，能够在一次批准后自主完成从原子化任务拆解、测试驱动开发到渐进式代码提交的全流程，同时内建网页性能分析与代码极简审计。对于现代开发团队而言，它不仅大幅削减了因AI代码不规范造成的审查与返工成本，更为人机协同时代树立了工业级交付标杆，具备极高的工程实战价值。",
    "enDesc": "Production-grade engineering skills for AI coding agents.",
    "githubUrl": "https://github.com/addyosmani/agent-skills",
    "deployCmd": "git clone https://github.com/addyosmani/agent-skills.git"
  }
];
