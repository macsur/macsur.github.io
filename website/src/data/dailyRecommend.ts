/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-08 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-08";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 8,
    "cmd": "k app 8",
    "badge": "离线下载利器",
    "name": "QB离线BT磁力下载面板",
    "category": "🎬 影音媒体与离线下载",
    "stars": "24k+",
    "highlight": "功能强大的跨平台 BitTorrent/PT 离线下载客户端，配备干净直观的 Web UI。支持 RSS 自动订阅抓取与多用户带宽限速规则。",
    "reason": "自建影音库与 NAS 离线挂机下载的基石级下载工具。"
  },
  {
    "id": 13,
    "cmd": "k app 13",
    "badge": "多存储私有网盘",
    "name": "Cloudreve网盘",
    "category": "🗄️  私有网盘与数据存储",
    "stars": "28k+",
    "highlight": "支持本地存储与各类主流对象存储（七牛/又拍/OSS/COS/OneDrive）统一挂载的现代网盘。支持离线下载、WebDAV 与在线音视频预览。",
    "reason": "单文件部署、极简轻盈，拥有绝佳的桌面端与移动端响应式体验。"
  },
  {
    "id": 14,
    "cmd": "k app 14",
    "badge": "极简公共图床",
    "name": "简单图床图片管理程序",
    "category": "🗄️  私有网盘与数据存储",
    "stars": "6k+",
    "highlight": "轻量好用的自托管图床管理程序。支持多图上传、图片鉴黄、文件外链管理与一键 Markdown/HTML 链接生成。",
    "reason": "无需复杂数据库依赖即可迅速跑起，非常适合个人博客与文档配图托管。"
  }
];
