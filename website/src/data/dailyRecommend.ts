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
    "id": 207,
    "cmd": "k app 207",
    "badge": "隐私云相册",
    "name": "Immich 高性能私有化相册与视频管理",
    "category": "🗄️ 私有网盘与文件存储",
    "stars": "61k+",
    "highlight": "全面替代 Google Photos 与 iCloud 的超强开源相册备份。原生配备手机端自动备份、本地离线人脸识别、以图搜图与实况照片完美展示。",
    "reason": "真正把珍贵的生活回忆锁在自己的服务器里，支持多用户隔离与智能相册聚类，体验极速。"
  },
  {
    "id": 206,
    "cmd": "k app 206",
    "badge": "自建中继神器",
    "name": "RustDesk 开源全平台远程桌面中继",
    "category": "🛠️ 远程工具与实用套件",
    "stars": "76k+",
    "highlight": "端到端高强度加密的完全自主可控远程桌面。支持自建中继服务器与信令网关，无视第三方商业软件限速与隐私风险，流畅低延迟操控云端主机。",
    "reason": "原生 Rust 编写，内存极小，高并发性能极其强悍，是个人与企业团队必备的远程运维底座。"
  },
  {
    "id": 208,
    "cmd": "k app 208",
    "badge": "AI Agent 中枢",
    "name": "n8n 可视化自动化与智能体编排系统",
    "category": "🛠️ 远程工具与实用套件",
    "stars": "52k+",
    "highlight": "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
    "reason": "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
  }
];
