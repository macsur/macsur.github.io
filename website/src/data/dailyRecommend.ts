/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-07 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-07";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 119,
    "cmd": "k app 119",
    "badge": "多 AI 客户端通用网关",
    "name": "Agent2API 桌面AI客户端反代网关",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "300+",
    "highlight": "将多家桌面 AI 客户端与 Agent 工具的登录态统一反代包装为 OpenAI / Claude 兼容 API 端点 (127.0.0.1:3065/v1)，支持 token 自动续期与全局 429 降级队列。",
    "reason": "轻松复用多平台客户端的模型额度，一键打通任意第三方 API 客户端或 CLI 开发工具。"
  },
  {
    "id": 25,
    "cmd": "k app 25",
    "badge": "企业级私有云盘",
    "name": "Nextcloud网盘",
    "category": "🗄️  私有网盘与数据存储",
    "stars": "25k+",
    "highlight": "功能强大的开源自建云办公与数据存储协作套件。集成日程协同、文件同步共享、文档多人在线编辑与全平台客户端支持。",
    "reason": "数据自主掌控的终极私有云方案，适合对数据隐私有极高要求的个人与团队。"
  },
  {
    "id": 58,
    "cmd": "k app 58",
    "badge": "LLM 知识库开发平台",
    "name": "Dify大模型知识库",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "60k+",
    "highlight": "直观易用且功能完备的 LLM 应用开发平台。内置 RAG 引擎、工作流编排、模型管理与一键 API / WebApp 交付发布。",
    "reason": "快速构建企业内部问答助手、知识检索与 AI Agent 的行业事实标准平台。"
  }
];
