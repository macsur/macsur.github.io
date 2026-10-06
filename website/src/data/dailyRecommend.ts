/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-06 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-06";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 1,
    "cmd": "k app 1",
    "badge": "运维装机必备",
    "name": "宝塔面板官方版",
    "category": "🖥️  服务器运维与探针监控",
    "stars": "15k+",
    "highlight": "国内最成熟、装机量极大的 Linux 服务器可视化运维面板。支持 LNMP/LAMP 环境一键搭建、站点管理与 FTP/数据库全套工具。",
    "reason": "生态插件极其完备，新手建站与传统运维的不二选择。"
  },
  {
    "id": 209,
    "cmd": "k app 209",
    "badge": "现代化多模态助手",
    "name": "Lobe Chat 现代多模态开源大模型聊天框架",
    "category": "⭐ 热门开源 TOP10",
    "stars": "45k+",
    "highlight": "视觉与界面设计极具科技感的下一代开源 LLM/Agent 聊天框架。原生支持文生图、语音多模态及丰富插件生态。",
    "reason": "PWA 支持极佳，交互动画与卡片排版赏心悦目，开箱即拥有媲美商业级 AI 助手体验。"
  },
  {
    "id": 210,
    "cmd": "k app 210",
    "badge": "云端开发工作台",
    "name": "Code-Server 浏览器云端全功能 VS Code",
    "category": "⭐ 热门开源 TOP10",
    "stars": "68k+",
    "highlight": "在远程 Linux 服务器上运行标准 VS Code，通过浏览器随时随地编写代码，保持环境高度统一与持久在线。",
    "reason": "完美解决换机重配环境的痛点，结合云端高带宽，随时随地享受桌面级开发体验。"
  }
];
