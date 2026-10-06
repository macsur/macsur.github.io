/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-06 (北京时间)
* 内容铁律：上游新应用立即打新上榜，无新内容时随机抽取轮换
*/
export interface DailyRecommendItem {
  id: number;
  cmd: string;
  badge: string;
  name: string;
  category: string;
  stars: string;
  highlight: string;
  reason: string;
}

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-06";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 208,
    "cmd": "k app 208",
    "badge": "AI Agent 中枢",
    "name": "n8n 可视化自动化与智能体编排系统",
    "category": "📝 协作办公与实用工具",
    "stars": "52k+",
    "highlight": "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
    "reason": "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
  },
  {
    "id": 204,
    "cmd": "k app 204",
    "badge": "极简 PaaS 云底座",
    "name": "Dokploy 轻量开源自托管 PaaS 平台",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "14k+",
    "highlight": "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
    "reason": "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
  },
  {
    "id": 202,
    "cmd": "k app 202",
    "badge": "极速大模型引擎",
    "name": "Ollama 极简轻量化本地大模型框架",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "115k+",
    "highlight": "让大模型如同普通命令行工具一样易用。一行指令完成大模型拉取、量化、运行与显存管理，完美支撑各类下游 AI 应用与开发环境。",
    "reason": "跨平台生态适配最成熟的开源运行时，与各类客户端无缝联动，开箱即用体验堪称行业标杆。"
  }
];
