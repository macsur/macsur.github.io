/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-10 (北京时间)
* 内容铁律：打新优先，无新应用时基于确定性天数轮转
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-10";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 58,
    "cmd": "z app 58",
    "badge": "LLM 知识库开发平台",
    "name": "Dify大模型知识库",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "60k+",
    "highlight": "直观易用且功能完备的 LLM 应用开发平台。内置 RAG 引擎、工作流编排、模型管理与一键 API / WebApp 交付发布。",
    "reason": "快速构建企业内部问答助手、知识检索与 AI Agent 的行业事实标准平台。"
  },
  {
    "id": 60,
    "cmd": "z app 60",
    "badge": "开源堡垒机运维审计",
    "name": "JumpServer开源堡垒机",
    "category": "🖥️  服务器运维与探针监控",
    "stars": "25k+",
    "highlight": "全球首款完全开源的堡垒机与安全运维审计平台。支持 SSH、Windows RDP、Web 终端统一纳管、会话录像与权限精细化控制。",
    "reason": "多节点资产集中运维与企业合规审计的行业标杆之作。"
  },
  {
    "id": 201,
    "cmd": "z app 201",
    "badge": "AI 顶流标杆",
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "⭐ 热门开源 TOP10",
    "stars": "185k+",
    "highlight": "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
    "reason": "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
  }
];
