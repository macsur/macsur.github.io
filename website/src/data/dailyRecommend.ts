/**
* 🌟 TOP 3 每日精选数据（构建时自动生成，请勿手工修改）
* 生成时间: 2026-10-05
* 生成规则：新内容优先打新，无新内容时随机抽取
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
    "id": 203,
    "cmd": "k app 203",
    "badge": "私有 AI 门户",
    "name": "Open WebUI 全能私有化 AI 交互平台",
    "category": "🤖 人工智能与大模型",
    "stars": "58k+",
    "highlight": "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
    "reason": "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
  },
  {
    "id": 201,
    "cmd": "k app 201",
    "badge": "AI 顶流标杆",
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "🤖 人工智能与大模型",
    "stars": "185k+",
    "highlight": "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
    "reason": "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
  },
  {
    "id": 3,
    "cmd": "k app 3",
    "badge": "现代化运维首选",
    "name": "1Panel 新一代现代化 Linux 运维面板",
    "category": "🖥️ 服务器运维与面板",
    "stars": "26k+",
    "highlight": "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
    "reason": "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
  }
];
