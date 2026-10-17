/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-18 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-18";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 201,
    "cmd": "z app 201",
    "badge": "AI 顶流标杆",
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "⭐ 热门开源 TOP10",
    "stars": "185k+",
    "highlight": "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
    "reason": "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
  },
  {
    "id": 202,
    "cmd": "z app 202",
    "badge": "极速大模型引擎",
    "name": "Ollama 本地大模型极速运行引擎",
    "category": "⭐ 热门开源 TOP10",
    "stars": "115k+",
    "highlight": "让大模型如同普通命令行工具一样易用。一行指令完成大模型拉取、量化、运行与显存管理，完美支撑各类下游 AI 应用与开发环境。",
    "reason": "跨平台生态适配最成熟的开源运行时，与各类客户端无缝联动，开箱即用体验堪称行业标杆。"
  },
  {
    "id": 203,
    "cmd": "z app 203",
    "badge": "私有 AI 门户",
    "name": "Open WebUI 全能私有化 AI 交互平台",
    "category": "⭐ 热门开源 TOP10",
    "stars": "58k+",
    "highlight": "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
    "reason": "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
  }
];
