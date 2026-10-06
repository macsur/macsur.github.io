/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-06 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-06";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 204,
    "cmd": "k app 204",
    "badge": "极简 PaaS 云底座",
    "name": "Dokploy 轻量开源自托管 PaaS 平台",
    "category": "🖥️ 服务器运维与探针监控",
    "stars": "14k+",
    "highlight": "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
    "reason": "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
  },
  {
    "id": 207,
    "cmd": "k app 207",
    "badge": "隐私云相册",
    "name": "Immich 高性能私有化相册与视频管理",
    "category": "🗄️ 私有网盘与数据存储",
    "stars": "61k+",
    "highlight": "全面替代 Google Photos 与 iCloud 的超强开源相册备份。原生配备手机端自动备份、本地离线人脸识别、以图搜图与实况照片完美展示。",
    "reason": "真正把珍贵的生活回忆锁在自己的服务器里，支持多用户隔离与智能相册聚类，体验极速。"
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
