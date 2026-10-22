/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: 2026-10-22 (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-22";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 4,
    "cmd": "z app 4",
    "badge": "反向代理神器",
    "name": "NginxProxyManager可视化面板",
    "category": "🌐 网络代理与穿透组网",
    "stars": "21k+",
    "highlight": "超高颜值的 Nginx 反向代理与 SSL 证书可视化管理平台。小白也能在 Web 界面轻松配置多域名转发、Let's Encrypt 证书自动续签与访问控制列表。",
    "reason": "免去手写复杂 nginx.conf 的繁琐与配置报错风险，域名路由管理效率翻倍。"
  },
  {
    "id": 7,
    "cmd": "z app 7",
    "badge": "轻量集群探针",
    "name": "哪吒探针VPS监控面板",
    "category": "🖥️  服务器运维与探针监控",
    "stars": "18k+",
    "highlight": "支持多服务器集中监控与大屏看板展示的轻量级探针系统。实时告警 CPU/内存/流量异动，支持多端告警通知。",
    "reason": "资源占用几乎可以忽略，多节点多 VPS 玩家人手必备的机房大屏看板。"
  },
  {
    "id": 8,
    "cmd": "z app 8",
    "badge": "离线下载利器",
    "name": "QB离线BT磁力下载面板",
    "category": "🎬 影音媒体与离线下载",
    "stars": "24k+",
    "highlight": "功能强大的跨平台 BitTorrent/PT 离线下载客户端，配备干净直观的 Web UI。支持 RSS 自动订阅抓取与多用户带宽限速规则。",
    "reason": "自建影音库与 NAS 离线挂机下载的基石级下载工具。"
  }
];
