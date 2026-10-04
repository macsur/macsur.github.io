/**
* 🌟 TOP 3 每日精选数据（构建时自动生成，请勿手工修改）
* 生成时间: 2026-10-04
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

export const DAILY_RECOMMEND_GENERATED_AT = "2026-10-04";

export const DAILY_RECOMMEND: DailyRecommendItem[] = [
  {
    "id": 208,
    "cmd": "k app 208",
    "badge": "AI Agent 中枢",
    "name": "n8n 可视化自动化与智能体编排系统",
    "category": "🛠️ 远程工具与实用套件",
    "stars": "52k+",
    "highlight": "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
    "reason": "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
  },
  {
    "id": 205,
    "cmd": "k app 205",
    "badge": "极客必备探针",
    "name": "Uptime Kuma 高颜值全功能服务监控",
    "category": "📊 探针监控与运维告警",
    "stars": "62k+",
    "highlight": "自托管监控界的颜值天花板。支持 HTTP(s)、TCP、Ping、DNS、Docker 容器与证书到期监控，内置 90+ 渠道全能实时告警与公开状态页一键生成。",
    "reason": "资源占用极其克制，0 门槛开箱即用，是管理多台服务器与网站集群健康状态的终极守护者。"
  },
  {
    "id": 204,
    "cmd": "k app 204",
    "badge": "极简 PaaS 云底座",
    "name": "Dokploy 轻量开源自托管 PaaS 平台",
    "category": "🖥️ 服务器运维与面板",
    "stars": "14k+",
    "highlight": "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
    "reason": "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
  }
];
