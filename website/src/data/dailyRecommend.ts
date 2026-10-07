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
    "id": 3,
    "cmd": "k app 3",
    "badge": "现代化运维首选",
    "name": "1Panel新一代管理面板",
    "category": "🖥️  服务器运维与探针监控",
    "stars": "26k+",
    "highlight": "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
    "reason": "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
  },
  {
    "id": 4,
    "cmd": "k app 4",
    "badge": "反向代理神器",
    "name": "NginxProxyManager可视化面板",
    "category": "🌐 网络代理与穿透组网",
    "stars": "21k+",
    "highlight": "超高颜值的 Nginx 反向代理与 SSL 证书可视化管理平台。小白也能在 Web 界面轻松配置多域名转发、Let's Encrypt 证书自动续签与访问控制列表。",
    "reason": "免去手写复杂 nginx.conf 的繁琐与配置报错风险，域名路由管理效率翻倍。"
  },
  {
    "id": 7,
    "cmd": "k app 7",
    "badge": "轻量集群探针",
    "name": "哪吒探针VPS监控面板",
    "category": "🖥️  服务器运维与探针监控",
    "stars": "18k+",
    "highlight": "支持多服务器集中监控与大屏看板展示的轻量级探针系统。实时告警 CPU/内存/流量异动，支持多端告警通知。",
    "reason": "资源占用几乎可以忽略，多节点多 VPS 玩家人手必备的机房大屏看板。"
  }
];
