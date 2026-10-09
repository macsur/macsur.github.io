/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-09 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-09";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 15,
    "cmd": "z app+",
    "badge": "私有影音媒体库",
    "name": "emby多媒体管理系统",
    "category": "🎬 影音媒体与离线下载",
    "stars": "19k+",
    "highlight": "全平台覆盖的家庭影院与多媒体中心。支持电影、剧集、音乐自动搜刮刮削封面，多设备硬件解码与画质自适应串流播放。",
    "reason": "打造个人专属 Netflix 的顶流选择，随时随地在手机、电视、网页畅享高清大片。"
  },
  {
    "id": 23,
    "cmd": "z app+",
    "badge": "碎片灵感看板",
    "name": "Memos网页备忘录",
    "category": "📝 协作办公与实用工具",
    "stars": "33k+",
    "highlight": "支持隐私自托管的极简卡片式灵感备忘录。支持 Markdown、轻量标签、时间轴热力图以及与各类客户端的无缝同步。",
    "reason": "类似推特/微博的轻量记录形态，是捕捉日常闪光想法与日记记录的绝佳载体。"
  },
  {
    "id": 25,
    "cmd": "z app+",
    "badge": "企业级私有云盘",
    "name": "Nextcloud网盘",
    "category": "🗄️  私有网盘与数据存储",
    "stars": "25k+",
    "highlight": "功能强大的开源自建云办公与数据存储协作套件。集成日程协同、文件同步共享、文档多人在线编辑与全平台客户端支持。",
    "reason": "数据自主掌控的终极私有云方案，适合对数据隐私有极高要求的个人与团队。"
  }
];
