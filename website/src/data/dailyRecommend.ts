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
    "id": 206,
    "cmd": "k app 206",
    "badge": "自建中继神器",
    "name": "RustDesk 开源全平台远程桌面中继",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "76k+",
    "highlight": "端到端高强度加密的完全自主可控远程桌面。支持自建中继服务器与信令网关，无视第三方商业软件限速与隐私风险，流畅低延迟操控云端主机。",
    "reason": "原生 Rust 编写，内存极小，高并发性能极其强悍，是个人与企业团队必备的远程运维底座。"
  },
  {
    "id": 205,
    "cmd": "k app 205",
    "badge": "极客必备探针",
    "name": "Uptime Kuma 高颜值全功能服务监控",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "62k+",
    "highlight": "自托管监控界的颜值天花板。支持 HTTP(s)、TCP、Ping、DNS、Docker 容器与证书到期监控，内置 90+ 渠道全能实时告警与公开状态页一键生成。",
    "reason": "资源占用极其克制，0 门槛开箱即用，是管理多台服务器与网站集群健康状态的终极守护者。"
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
