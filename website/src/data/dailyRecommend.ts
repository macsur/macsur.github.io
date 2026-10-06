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
    "id": 201,
    "cmd": "k app 201",
    "badge": "AI 顶流标杆",
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "185k+",
    "highlight": "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
    "reason": "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
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
