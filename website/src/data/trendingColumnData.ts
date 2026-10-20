// 🌟 GitHub 一周热点跟踪专栏（站主 2026-10-18 22:43 拍板）
// 跟踪 B 站 UP 主「IT咖啡馆」的《Github一周热点》系列，每期视频介绍几个热点项目，本站逐个实测出教程。
// 第 135 期为首期打样，134–130 为待补占位卡。

export interface TrendingEpisode {
  episode: number;
  title: string;
  summary: string;
  date: string;
  bvid: string;
  videoUrl: string;
  author: string;
  status: 'live' | 'planned';
  projects: TrendingProject[];
}

export interface TrendingProject {
  name: string;
  repo: string;
  repoUrl: string;
  description: string;
  stars: number;
  starsDate: string;
  slug: string;
  tutorialUrl: string;
  /** 实测结论：跑通 / 降级（降级须写明原因） */
  testResult: 'passed' | 'downgraded';
  testNote: string;
}

export const TRENDING_AUTHOR = 'IT咖啡馆';
export const TRENDING_SERIES = 'Github一周热点';

export const TRENDING_EPISODES: TrendingEpisode[] = [
  {
    episode: 135,
    title: 'Github一周热点135期：艺术家用的IDE、交互式技术图解Skill、AI 生成原生PPT、多个 Agent 组织工具和复活的QQ宠物',
    summary:
      '首期打样。本期五个项目分别覆盖：面向艺术家的创作引擎、生成交互式等距技术图解的 Agent Skill、文档转原生可编辑 PPT 的工作流、把多个 Agent 组织成持久团队的编排工具、以及 QQ 宠物的跨平台复刻版。本站对五个项目逐个实测，跑通的出实操教程，装不动的如实降级为解读评估篇。',
    date: '2026-10-18',
    bvid: 'BV1EVJY6GEA6',
    videoUrl: 'https://www.bilibili.com/video/BV1EVJY6GEA6',
    author: TRENDING_AUTHOR,
    status: 'live',
    projects: [
      {
        name: 'ArtCraft — 艺术家的 AI IDE',
        repo: 'storytold/artcraft',
        repoUrl: 'https://github.com/storytold/artcraft',
        description: '面向艺术家、设计师、影人的交互式 AI 图像与视频创作 IDE，2D 构图、3D 布景、可自选模型的创作引擎。',
        stars: 34237,
        starsDate: '2026-10-20',
        slug: 'artcraft-ai-ide',
        tutorialUrl: '/tutorials/artcraft-ai-ide/',
        testResult: 'downgraded',
        testNote: '官方 macOS 通用安装包（94.8 MB）在本次实测网络下多次下载中断，未能完成挂载实测；本篇降级为解读评估篇。',
      },
      {
        name: 'Anatomy — 生成交互式技术图解的 Skill',
        repo: 'wheresryan22/anatomy',
        repoUrl: 'https://github.com/wheresryan22/anatomy',
        description: '一个把想法「造出来」讲清楚的 Agent Skill：生成精细的等距交互式插图，支持 SVG、WebGL 与 3D 输出。',
        stars: 17349,
        starsDate: '2026-10-20',
        slug: 'anatomy-isometric-skill',
        tutorialUrl: '/tutorials/anatomy-isometric-skill/',
        testResult: 'passed',
        testNote: '本地跑通示例构建脚本，成功产出 136 KB 的独立 HTML 页面。',
      },
      {
        name: 'OpenRig — 组织多个 Agent 的工具',
        repo: 'mvschwarz/openrig',
        repoUrl: 'https://github.com/mvschwarz/openrig',
        description: '把 Claude Code、Codex、Pi 组织成持久化 Agent 团队，用 YAML 定义团队，一条命令启动。',
        stars: 7965,
        starsDate: '2026-10-20',
        slug: 'openrig-agent-team',
        tutorialUrl: '/tutorials/openrig-agent-team/',
        testResult: 'passed',
        testNote: 'npm 全局安装成功，守护进程启动后状态命令正常返回 Agent 席位表。',
      },
      {
        name: 'PPT Master — 生成原生 PPT 的工作流',
        repo: 'hugohe3/ppt-master',
        repoUrl: 'https://github.com/hugohe3/ppt-master',
        description: '把文档或主题转成真正原生可编辑的 PowerPoint：幻灯片母版、原生形状、带数据的图表与表格。',
        stars: 64342,
        starsDate: '2026-10-20',
        slug: 'ppt-master-native-deck',
        tutorialUrl: '/tutorials/ppt-master-native-deck/',
        testResult: 'passed',
        testNote: '依赖栈安装成功，实际产出可打开的 .pptx，元素为原生形状与表格，逐一可编辑。',
      },
      {
        name: 'QQPet — QQ 宠物开源复刻版',
        repo: 'AnkioTomas/qqpet',
        repoUrl: 'https://github.com/AnkioTomas/qqpet',
        description: '基于 Arctic Penguin T800 逆向重建的 QQ 宠物跨平台复刻，Flash 内容由 Ruffle 播放。',
        stars: 902,
        starsDate: '2026-10-20',
        slug: 'qqpet-open-replica',
        tutorialUrl: '/tutorials/qqpet-open-replica/',
        testResult: 'downgraded',
        testNote: '官方完整包 518 MB、内容包 375 MB，本次实测网络不足以在限时内取全；本篇降级为解读评估篇，并如实标注素材缺口。',
      },
    ],
  },
  // 134–130：站主拍板倒序补存量，未开写前为占位卡
  { episode: 134, title: '第 134 期 · 待补', summary: '第 134 期内容待补。', date: '', bvid: '', videoUrl: '', author: TRENDING_AUTHOR, status: 'planned', projects: [] },
  { episode: 133, title: '第 133 期 · 待补', summary: '第 133 期内容待补。', date: '', bvid: '', videoUrl: '', author: TRENDING_AUTHOR, status: 'planned', projects: [] },
  { episode: 132, title: '第 132 期 · 待补', summary: '第 132 期内容待补。', date: '', bvid: '', videoUrl: '', author: TRENDING_AUTHOR, status: 'planned', projects: [] },
  { episode: 131, title: '第 131 期 · 待补', summary: '第 131 期内容待补。', date: '', bvid: '', videoUrl: '', author: TRENDING_AUTHOR, status: 'planned', projects: [] },
  { episode: 130, title: '第 130 期 · 待补', summary: '第 130 期内容待补。', date: '', bvid: '', videoUrl: '', author: TRENDING_AUTHOR, status: 'planned', projects: [] },
];
