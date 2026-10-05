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
    "id": 202,
    "cmd": "k app 202",
    "badge": "极速大模型引擎",
    "name": "Ollama 极简轻量化本地大模型框架",
    "category": "🤖 人工智能与前沿大模型",
    "stars": "115k+",
    "highlight": "让大模型如同普通命令行工具一样易用。一行指令完成大模型拉取、量化、运行与显存管理，完美支撑各类下游 AI 应用与开发环境。",
    "reason": "跨平台生态适配最成熟的开源运行时，与各类客户端无缝联动，开箱即用体验堪称行业标杆。"
  },
  {
    "id": 3,
    "cmd": "k app 3",
    "badge": "现代化运维首选",
    "name": "1Panel 新一代现代化 Linux 运维面板",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "26k+",
    "highlight": "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
    "reason": "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
  }
];
