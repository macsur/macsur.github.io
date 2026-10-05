/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-05 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-05";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 3,
    "cmd": "k app 3",
    "badge": "现代化运维首选",
    "name": "1Panel 新一代现代化 Linux 运维面板",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "26k+",
    "highlight": "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
    "reason": "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
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
    "id": 203,
    "cmd": "k app 203",
    "badge": "私有 AI 门户",
    "name": "Open WebUI 全能私有化 AI 交互平台",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "58k+",
    "highlight": "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
    "reason": "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
  }
];
