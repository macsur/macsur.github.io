export interface GithubTopRepo {
  rank: number;
  name: string;
  repo: string;
  stars: string;
  forks: string;
  language: string;
  langColor: string;
  tag: string;
  desc: string;
  highlights: string[];
  githubUrl: string;
  deployCmd: string;
  appId?: number;
}

export interface Category {
  id: string;
  key: string;
  name: string;
}

export interface AppItem {
  id: number;
  name: string;
  category: string;
  isStar: boolean;
  alias: string;
  desc: string;
}

export const CATEGORIES: Category[] = [
  {
    "id": "panel",
    "key": "A",
    "name": "🖥️  服务器运维与面板"
  },
  {
    "id": "ai",
    "key": "B",
    "name": "🤖 人工智能与大模型"
  },
  {
    "id": "monitor",
    "key": "C",
    "name": "📊 探针监控与运维告警"
  },
  {
    "id": "storage",
    "key": "D",
    "name": "🗄️  私有网盘与文件存储"
  },
  {
    "id": "network",
    "key": "E",
    "name": "🌐 网络代理与穿透组网"
  },
  {
    "id": "media",
    "key": "F",
    "name": "🎬 影音媒体与下载娱乐"
  },
  {
    "id": "office",
    "key": "G",
    "name": "📝 协作办公与知识库"
  },
  {
    "id": "social",
    "key": "H",
    "name": "💬 即时通讯与社交媒体"
  },
  {
    "id": "tools",
    "key": "I",
    "name": "🛠️  远程工具与实用套件"
  },
  {
    "id": "custom",
    "key": "J",
    "name": "📦 自定义与第三方应用"
  },
  {
    "id": "github-top",
    "key": "K",
    "name": "🌟 [Github乐园] 最新最热TOP10"
  }
];

export const BUILTIN_APPS: AppItem[] = [
  {
    "id": 201,
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "github-top",
    "isStar": true,
    "alias": "deepseek",
    "desc": "全球瞩目的划时代开源大语言模型与超强推理架构。"
  },
  {
    "id": 202,
    "name": "Ollama 本地大模型极速运行引擎",
    "category": "github-top",
    "isStar": true,
    "alias": "ollama",
    "desc": "一键在本地或 VPS 运行 DeepSeek、Llama3 等大模型。"
  },
  {
    "id": 203,
    "name": "Open WebUI 全能私有化 AI 交互平台",
    "category": "github-top",
    "isStar": true,
    "alias": "openwebui",
    "desc": "媲美 ChatGPT 的自托管多模型 Web 界面，原生集成知识库与语音。"
  },
  {
    "id": 204,
    "name": "Dokploy 轻量开源自托管 PaaS 运维平台",
    "category": "github-top",
    "isStar": true,
    "alias": "dokploy",
    "desc": "下一代轻量级 PaaS 应用平台，一键管理容器应用与数据库。"
  },
  {
    "id": 205,
    "name": "Uptime Kuma 高颜值自托管探针监控",
    "category": "github-top",
    "isStar": true,
    "alias": "uptimekuma",
    "desc": "高颜值探针监控，支持 90+ 告警通知与公开状态页。"
  },
  {
    "id": 206,
    "name": "RustDesk 开源全平台远程桌面中继",
    "category": "github-top",
    "isStar": true,
    "alias": "rustdesk",
    "desc": "开源远程桌面客户端与自建中继服务，端到端高强度加密安全可控。"
  },
  {
    "id": 207,
    "name": "Immich 高性能私有云相册与视频备份",
    "category": "github-top",
    "isStar": true,
    "alias": "immich",
    "desc": "自主可控的极速相册备份方案，内置隐私 AI 识别与人脸聚合。"
  },
  {
    "id": 208,
    "name": "n8n 智能自动化与 AI Agent 流程编排",
    "category": "github-top",
    "isStar": true,
    "alias": "n8n",
    "desc": "可视化拖拽自动化工作流，原生构建私有 AI Agent 智能体。"
  },
  {
    "id": 209,
    "name": "Lobe Chat 现代多模态开源大模型聊天框架",
    "category": "github-top",
    "isStar": true,
    "alias": "lobechat",
    "desc": "极致现代化设计，支持语音、视觉多模态与丰富插件市场。"
  },
  {
    "id": 210,
    "name": "Code-Server 浏览器云端全功能 VS Code",
    "category": "github-top",
    "isStar": true,
    "alias": "codeserver",
    "desc": "在远程服务器运行 VS Code，浏览器即开即写，释放服务器极致算力。"
  },
  {
    "id": 1,
    "name": "宝塔面板官方版",
    "category": "panel",
    "isStar": true,
    "alias": "bt",
    "desc": "baota|"
  },
  {
    "id": 2,
    "name": "aaPanel宝塔国际版",
    "category": "panel",
    "isStar": false,
    "alias": "aapanel",
    "desc": ""
  },
  {
    "id": 3,
    "name": "1Panel新一代管理面板",
    "category": "panel",
    "isStar": true,
    "alias": "1p",
    "desc": "1panel|"
  },
  {
    "id": 4,
    "name": "NginxProxyManager可视化面板",
    "category": "network",
    "isStar": true,
    "alias": "npm",
    "desc": "一个Nginx反向代理工具面板，不支持添加域名访问。"
  },
  {
    "id": 5,
    "name": "OpenList多存储文件列表程序",
    "category": "storage",
    "isStar": false,
    "alias": "openlist",
    "desc": "一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gi..."
  },
  {
    "id": 6,
    "name": "Ubuntu远程桌面网页版",
    "category": "tools",
    "isStar": false,
    "alias": "webtop-ubuntu",
    "desc": "webtop基于Ubuntu的容器。若IP无法访问，请添加域名访问。"
  },
  {
    "id": 7,
    "name": "哪吒探针VPS监控面板",
    "category": "monitor",
    "isStar": true,
    "alias": "nezha",
    "desc": ""
  },
  {
    "id": 8,
    "name": "QB离线BT磁力下载面板",
    "category": "media",
    "isStar": true,
    "alias": "qb",
    "desc": "QB|qbittorrent离线BT磁力下载服务"
  },
  {
    "id": 9,
    "name": "Poste.io邮件服务器程序",
    "category": "social",
    "isStar": false,
    "alias": "mail",
    "desc": ""
  },
  {
    "id": 10,
    "name": "RocketChat多人在线聊天系统",
    "category": "social",
    "isStar": false,
    "alias": "rocketchat",
    "desc": "Rocket.Chat 是一个开源的团队通讯平台，支持实时聊天、音视频通..."
  },
  {
    "id": 11,
    "name": "禅道项目管理软件",
    "category": "office",
    "isStar": false,
    "alias": "zentao",
    "desc": "禅道是通用的项目管理软件"
  },
  {
    "id": 12,
    "name": "青龙面板定时任务管理平台",
    "category": "panel",
    "isStar": true,
    "alias": "qinglong",
    "desc": "青龙面板是一个定时任务管理平台"
  },
  {
    "id": 13,
    "name": "Cloudreve网盘",
    "category": "storage",
    "isStar": true,
    "alias": "cloudreve",
    "desc": "cloudreve是一个支持多家云存储的网盘系统"
  },
  {
    "id": 14,
    "name": "简单图床图片管理程序",
    "category": "storage",
    "isStar": false,
    "alias": "easyimage",
    "desc": "简单图床是一个简单的图床程序"
  },
  {
    "id": 15,
    "name": "emby多媒体管理系统",
    "category": "media",
    "isStar": false,
    "alias": "emby",
    "desc": "emby是一个主从式架构的媒体服务器软件，可以用来整理服务器上的视频和音..."
  },
  {
    "id": 16,
    "name": "Speedtest测速面板",
    "category": "monitor",
    "isStar": false,
    "alias": "looking",
    "desc": "Speedtest测速面板是一个VPS网速测试工具，多项测试功能，还可以..."
  },
  {
    "id": 17,
    "name": "AdGuardHome去广告软件",
    "category": "network",
    "isStar": true,
    "alias": "adguardhome",
    "desc": "AdGuardHome是一款全网广告拦截与反跟踪软件，未来将不止是一个D..."
  },
  {
    "id": 18,
    "name": "onlyoffice在线办公OFFICE",
    "category": "office",
    "isStar": false,
    "alias": "onlyoffice",
    "desc": "onlyoffice是一款开源的在线office工具，太强大了！"
  },
  {
    "id": 19,
    "name": "雷池WAF防火墙面板",
    "category": "network",
    "isStar": false,
    "alias": "safeline",
    "desc": ""
  },
  {
    "id": 20,
    "name": "portainer容器管理面板",
    "category": "panel",
    "isStar": true,
    "alias": "portainer",
    "desc": "portainer是一个轻量级的docker容器管理面板"
  },
  {
    "id": 21,
    "name": "VScode网页版",
    "category": "office",
    "isStar": false,
    "alias": "vscode",
    "desc": "VScode是一款强大的在线代码编写工具"
  },
  {
    "id": 22,
    "name": "UptimeKuma监控工具",
    "category": "monitor",
    "isStar": true,
    "alias": "uptime-kuma",
    "desc": "Uptime Kuma 易于使用的自托管监控工具"
  },
  {
    "id": 23,
    "name": "Memos网页备忘录",
    "category": "office",
    "isStar": true,
    "alias": "memos",
    "desc": "Memos是一款轻量级、自托管的备忘录中心"
  },
  {
    "id": 24,
    "name": "Webtop远程桌面网页版",
    "category": "tools",
    "isStar": false,
    "alias": "webtop",
    "desc": "webtop基于Alpine的中文版容器。若IP无法访问，请添加域名访问..."
  },
  {
    "id": 25,
    "name": "Nextcloud网盘",
    "category": "storage",
    "isStar": true,
    "alias": "nextcloud",
    "desc": "Nextcloud拥有超过 400,000 个部署，是您可以下载的最受欢..."
  },
  {
    "id": 26,
    "name": "QD-Today定时任务管理框架",
    "category": "tools",
    "isStar": false,
    "alias": "qd",
    "desc": "QD-Today是一个HTTP请求定时任务自动执行框架"
  },
  {
    "id": 27,
    "name": "Dockge容器堆栈管理面板",
    "category": "panel",
    "isStar": false,
    "alias": "dockge",
    "desc": "dockge是一个可视化的docker-compose容器管理面板"
  },
  {
    "id": 28,
    "name": "LibreSpeed测速工具",
    "category": "monitor",
    "isStar": false,
    "alias": "speedtest",
    "desc": "librespeed是用Javascript实现的轻量级速度测试工具，即..."
  },
  {
    "id": 29,
    "name": "searxng聚合搜索站",
    "category": "tools",
    "isStar": false,
    "alias": "searxng",
    "desc": "searxng是一个私有且隐私的搜索引擎站点"
  },
  {
    "id": 30,
    "name": "PhotoPrism私有相册系统",
    "category": "storage",
    "isStar": false,
    "alias": "photoprism",
    "desc": "photoprism非常强大的私有相册系统"
  },
  {
    "id": 31,
    "name": "StirlingPDF工具大全",
    "category": "office",
    "isStar": false,
    "alias": "s-pdf",
    "desc": "这是一个强大的本地托管基于 Web 的 PDF 操作工具，使用 dock..."
  },
  {
    "id": 32,
    "name": "drawio免费的在线图表软件",
    "category": "office",
    "isStar": false,
    "alias": "drawio",
    "desc": "这是一个强大图表绘制软件。思维导图，拓扑图，流程图，都能画"
  },
  {
    "id": 33,
    "name": "Sun-Panel导航面板",
    "category": "social",
    "isStar": false,
    "alias": "sun-panel",
    "desc": "Sun-Panel服务器、NAS导航面板、Homepage、浏览器首页"
  },
  {
    "id": 34,
    "name": "Pingvin-Share文件分享平台",
    "category": "storage",
    "isStar": false,
    "alias": "pingvin-share",
    "desc": "Pingvin Share 是一个可自建的文件分享平台，是 WeTran..."
  },
  {
    "id": 35,
    "name": "极简朋友圈",
    "category": "social",
    "isStar": false,
    "alias": "moments",
    "desc": "极简朋友圈，高仿微信朋友圈，记录你的美好生活"
  },
  {
    "id": 36,
    "name": "LobeChatAI聊天聚合网站",
    "category": "ai",
    "isStar": true,
    "alias": "lobe-chat",
    "desc": "LobeChat聚合市面上主流的AI大模型，ChatGPT/Claude..."
  },
  {
    "id": 37,
    "name": "MyIP工具箱",
    "category": "tools",
    "isStar": true,
    "alias": "myip",
    "desc": "是一个多功能IP工具箱，可以查看自己IP信息及连通性，用网页面板呈现"
  },
  {
    "id": 38,
    "name": "小雅alist全家桶",
    "category": "storage",
    "isStar": false,
    "alias": "xiaoya",
    "desc": ""
  },
  {
    "id": 39,
    "name": "Bililive直播录制工具",
    "category": "media",
    "isStar": false,
    "alias": "bililive",
    "desc": "Bililive-go是一个支持多种直播平台的直播录制工具"
  },
  {
    "id": 40,
    "name": "webssh网页版SSH连接工具",
    "category": "tools",
    "isStar": false,
    "alias": "webssh",
    "desc": "简易在线ssh连接工具和sftp工具"
  },
  {
    "id": 41,
    "name": "耗子管理面板",
    "category": "panel",
    "isStar": false,
    "alias": "haozi",
    "desc": "acepanel|"
  },
  {
    "id": 42,
    "name": "Nexterm远程连接工具",
    "category": "tools",
    "isStar": false,
    "alias": "nexterm",
    "desc": "nexterm是一款强大的在线SSH/VNC/RDP连接工具。"
  },
  {
    "id": 43,
    "name": "RustDesk远程桌面(服务端)",
    "category": "tools",
    "isStar": true,
    "alias": "hbbs",
    "desc": "rustdesk开源的远程桌面(服务端)，类似自己的向日葵私服。"
  },
  {
    "id": 44,
    "name": "RustDesk远程桌面(中继端)",
    "category": "tools",
    "isStar": true,
    "alias": "hbbr",
    "desc": "rustdesk开源的远程桌面(中继端)，类似自己的向日葵私服。"
  },
  {
    "id": 45,
    "name": "Docker加速站",
    "category": "network",
    "isStar": false,
    "alias": "registry",
    "desc": "Docker Registry 是一个用于存储和分发 Docker 镜像..."
  },
  {
    "id": 46,
    "name": "GitHub加速站",
    "category": "network",
    "isStar": true,
    "alias": "ghproxy",
    "desc": "使用Go实现的GHProxy，用于加速部分地区Github仓库的拉取。"
  },
  {
    "id": 47,
    "name": "普罗米修斯监控",
    "category": "monitor",
    "isStar": false,
    "alias": "prometheus",
    "desc": "grafana|Prometheus+Grafana企业级监控系统"
  },
  {
    "id": 48,
    "name": "普罗米修斯(主机监控)",
    "category": "monitor",
    "isStar": false,
    "alias": "node-exporter",
    "desc": "这是一个普罗米修斯的主机数据采集组件，请部署在被监控主机上。"
  },
  {
    "id": 49,
    "name": "普罗米修斯(容器监控)",
    "category": "monitor",
    "isStar": false,
    "alias": "cadvisor",
    "desc": "这是一个普罗米修斯的容器数据采集组件，请部署在被监控主机上。"
  },
  {
    "id": 50,
    "name": "补货监控工具",
    "category": "monitor",
    "isStar": false,
    "alias": "changedetection",
    "desc": "这是一款网站变化检测、补货监控和通知的小工具"
  },
  {
    "id": 51,
    "name": "PVE开小鸡面板",
    "category": "panel",
    "isStar": false,
    "alias": "pve",
    "desc": ""
  },
  {
    "id": 52,
    "name": "DPanel容器管理面板",
    "category": "panel",
    "isStar": false,
    "alias": "dpanel",
    "desc": "Docker可视化面板系统，提供完善的docker管理功能。"
  },
  {
    "id": 53,
    "name": "llama3聊天AI大模型",
    "category": "ai",
    "isStar": false,
    "alias": "llama3",
    "desc": "OpenWebUI一款大语言模型网页框架，接入全新的llama3大语言模..."
  },
  {
    "id": 54,
    "name": "AMH主机建站管理面板",
    "category": "panel",
    "isStar": false,
    "alias": "amh",
    "desc": ""
  },
  {
    "id": 55,
    "name": "FRP内网穿透(服务端)",
    "category": "network",
    "isStar": true,
    "alias": "frps",
    "desc": ""
  },
  {
    "id": 56,
    "name": "FRP内网穿透(客户端)",
    "category": "network",
    "isStar": true,
    "alias": "frpc",
    "desc": ""
  },
  {
    "id": 57,
    "name": "Deepseek聊天AI大模型",
    "category": "ai",
    "isStar": true,
    "alias": "deepseek",
    "desc": "OpenWebUI一款大语言模型网页框架，接入全新的DeepSeek R..."
  },
  {
    "id": 58,
    "name": "Dify大模型知识库",
    "category": "ai",
    "isStar": true,
    "alias": "dify",
    "desc": "是一款开源的大语言模型(LLM) 应用开发平台。自托管训练数据用于AI生..."
  },
  {
    "id": 59,
    "name": "NewAPI大模型资产管理",
    "category": "ai",
    "isStar": true,
    "alias": "new-api",
    "desc": "新一代大模型网关与AI资产管理系统"
  },
  {
    "id": 60,
    "name": "JumpServer开源堡垒机",
    "category": "panel",
    "isStar": false,
    "alias": "jms",
    "desc": "是一个开源的特权访问管理 (PAM) 工具，该程序占用80端口不支持添加..."
  },
  {
    "id": 61,
    "name": "在线翻译服务器",
    "category": "tools",
    "isStar": false,
    "alias": "libretranslate",
    "desc": "免费开源机器翻译 API，完全自托管，它的翻译引擎由开源Argos Tr..."
  },
  {
    "id": 62,
    "name": "RAGFlow大模型知识库",
    "category": "ai",
    "isStar": false,
    "alias": "ragflow",
    "desc": "基于深度文档理解的开源 RAG（检索增强生成）引擎"
  },
  {
    "id": 63,
    "name": "OpenWebUI自托管AI平台",
    "category": "ai",
    "isStar": true,
    "alias": "open-webui",
    "desc": "OpenWebUI一款大语言模型网页框架，官方精简版本，支持各大模型AP..."
  },
  {
    "id": 64,
    "name": "it-tools工具箱",
    "category": "tools",
    "isStar": false,
    "alias": "it-tools",
    "desc": "对开发人员和 IT 工作者来说非常有用的工具"
  },
  {
    "id": 65,
    "name": "n8n自动化工作流平台",
    "category": "tools",
    "isStar": true,
    "alias": "n8n",
    "desc": "是一款功能强大的自动化工作流平台"
  },
  {
    "id": 66,
    "name": "yt-dlp视频下载工具",
    "category": "media",
    "isStar": false,
    "alias": "yt",
    "desc": ""
  },
  {
    "id": 67,
    "name": "ddns-go动态DNS管理工具",
    "category": "network",
    "isStar": true,
    "alias": "ddns",
    "desc": "自动将你的公网 IP（IPv4/IPv6）实时更新到各大 DNS 服务商..."
  },
  {
    "id": 68,
    "name": "AllinSSL证书管理平台",
    "category": "network",
    "isStar": false,
    "alias": "allinssl",
    "desc": "开源免费的 SSL 证书自动化管理平台"
  },
  {
    "id": 69,
    "name": "SFTPGo文件传输工具",
    "category": "storage",
    "isStar": false,
    "alias": "sftpgo",
    "desc": "开源免费随时随地SFTP FTP WebDAV 文件传输工具"
  },
  {
    "id": 70,
    "name": "AstrBot聊天机器人框架",
    "category": "ai",
    "isStar": false,
    "alias": "astrbot",
    "desc": "开源AI聊天机器人框架，支持微信，QQ，TG接入AI大模型"
  },
  {
    "id": 71,
    "name": "Navidrome私有音乐服务器",
    "category": "media",
    "isStar": false,
    "alias": "navidrome",
    "desc": "是一个轻量、高性能的音乐流媒体服务器"
  },
  {
    "id": 72,
    "name": "bitwarden密码管理器",
    "category": "tools",
    "isStar": true,
    "alias": "bitwarden",
    "desc": "一个你可以控制数据的密码管理器"
  },
  {
    "id": 73,
    "name": "LibreTV私有影视",
    "category": "media",
    "isStar": false,
    "alias": "libretv",
    "desc": "免费在线视频搜索与观看平台"
  },
  {
    "id": 74,
    "name": "MoonTV私有影视",
    "category": "media",
    "isStar": false,
    "alias": "moontv",
    "desc": "免费在线视频搜索与观看平台"
  },
  {
    "id": 75,
    "name": "Melody音乐精灵",
    "category": "media",
    "isStar": false,
    "alias": "melody",
    "desc": "你的音乐精灵，旨在帮助你更好地管理音乐。"
  },
  {
    "id": 76,
    "name": "在线DOS老游戏",
    "category": "media",
    "isStar": false,
    "alias": "dosgame",
    "desc": "是一个中文DOS游戏合集网站"
  },
  {
    "id": 77,
    "name": "迅雷离线下载工具",
    "category": "media",
    "isStar": false,
    "alias": "xunlei",
    "desc": "迅雷你的离线高速BT磁力下载工具"
  },
  {
    "id": 78,
    "name": "PandaWiki智能文档管理系统",
    "category": "office",
    "isStar": false,
    "alias": "PandaWiki",
    "desc": "PandaWiki是一款AI大模型驱动的开源智能文档管理系统，强烈建议不..."
  },
  {
    "id": 79,
    "name": "Beszel服务器监控",
    "category": "monitor",
    "isStar": true,
    "alias": "beszel",
    "desc": "Beszel轻量易用的服务器监控"
  },
  {
    "id": 80,
    "name": "linkwarden书签管理",
    "category": "office",
    "isStar": false,
    "alias": "linkwarden",
    "desc": "一个开源的自托管书签管理平台，支持标签、搜索和团队协作。"
  },
  {
    "id": 81,
    "name": "JitsiMeet视频会议",
    "category": "social",
    "isStar": false,
    "alias": "jitsi",
    "desc": "一个开源的安全视频会议解决方案，支持多人在线会议、屏幕共享与加密通信。"
  },
  {
    "id": 82,
    "name": "gpt-load高性能AI透明代理",
    "category": "ai",
    "isStar": false,
    "alias": "gpt-load",
    "desc": "高性能AI接口透明代理服务"
  },
  {
    "id": 83,
    "name": "komari服务器监控工具",
    "category": "monitor",
    "isStar": false,
    "alias": "komari",
    "desc": "轻量级的自托管服务器监控工具"
  },
  {
    "id": 84,
    "name": "Wallos个人财务管理工具",
    "category": "office",
    "isStar": false,
    "alias": "wallos",
    "desc": "开源个人订阅追踪器，可用于财务管理"
  },
  {
    "id": 85,
    "name": "immich图片视频管理器",
    "category": "storage",
    "isStar": true,
    "alias": "immich",
    "desc": "高性能自托管照片和视频管理解决方案。"
  },
  {
    "id": 86,
    "name": "jellyfin媒体管理系统",
    "category": "media",
    "isStar": true,
    "alias": "jellyfin",
    "desc": "是一款开源媒体服务器软件"
  },
  {
    "id": 87,
    "name": "SyncTV一起看片神器",
    "category": "media",
    "isStar": false,
    "alias": "synctv",
    "desc": "远程一起观看电影和直播的程序。它提供了同步观影、直播、聊天等功能"
  },
  {
    "id": 88,
    "name": "Owncast自托管直播平台",
    "category": "media",
    "isStar": false,
    "alias": "owncast",
    "desc": "开源、免费的自建直播平台"
  },
  {
    "id": 89,
    "name": "FileCodeBox文件快递",
    "category": "storage",
    "isStar": false,
    "alias": "file-code-box",
    "desc": "匿名口令分享文本和文件，像拿快递一样取文件"
  },
  {
    "id": 90,
    "name": "matrix去中心化聊天协议",
    "category": "social",
    "isStar": false,
    "alias": "matrix",
    "desc": "Matrix是一个去中心化的聊天协议"
  },
  {
    "id": 91,
    "name": "gitea私有代码仓库",
    "category": "tools",
    "isStar": false,
    "alias": "gitea",
    "desc": "免费新一代的代码托管平台，提供接近 GitHub 的使用体验。"
  },
  {
    "id": 92,
    "name": "FileBrowser文件管理器",
    "category": "storage",
    "isStar": true,
    "alias": "filebrowser",
    "desc": "是一个基于Web的文件管理器"
  },
  {
    "id": 93,
    "name": "Dufs极简静态文件服务器",
    "category": "storage",
    "isStar": false,
    "alias": "dufs",
    "desc": "极简静态文件服务器，支持上传下载"
  },
  {
    "id": 94,
    "name": "Gopeed高速下载工具",
    "category": "media",
    "isStar": false,
    "alias": "gopeed",
    "desc": "分布式高速下载工具，支持多种协议"
  },
  {
    "id": 95,
    "name": "paperless文档管理平台",
    "category": "office",
    "isStar": false,
    "alias": "paperless",
    "desc": "开源的电子文档管理系统，它的主要用途是把你的纸质文件数字化并管理起来。"
  },
  {
    "id": 96,
    "name": "2FAuth自托管二步验证器",
    "category": "tools",
    "isStar": false,
    "alias": "2fauth",
    "desc": "自托管的双重身份验证 (2FA) 账户管理和验证码生成工具。"
  },
  {
    "id": 97,
    "name": "WireGuard组网(服务端)",
    "category": "network",
    "isStar": false,
    "alias": "wgs",
    "desc": "现代化、高性能的虚拟专用网络工具"
  },
  {
    "id": 98,
    "name": "WireGuard组网(客户端)",
    "category": "network",
    "isStar": false,
    "alias": "wgc",
    "desc": "现代化、高性能的虚拟专用网络工具"
  },
  {
    "id": 99,
    "name": "DSM群晖虚拟机",
    "category": "tools",
    "isStar": false,
    "alias": "dsm",
    "desc": "Docker容器中的虚拟DSM"
  },
  {
    "id": 100,
    "name": "Syncthing点对点文件同步工具",
    "category": "storage",
    "isStar": false,
    "alias": "syncthing",
    "desc": "开源的点对点文件同步工具，类似于 Dropbox、Resilio Syn..."
  },
  {
    "id": 101,
    "name": "AI视频生成工具",
    "category": "ai",
    "isStar": false,
    "alias": "moneyprinterturbo",
    "desc": "MoneyPrinterTurbo是一款使用AI大模型合成高清短视频的工..."
  },
  {
    "id": 102,
    "name": "VoceChat多人在线聊天系统",
    "category": "social",
    "isStar": false,
    "alias": "vocechat",
    "desc": "是一款支持独立部署的个人云社交媒体聊天服务"
  },
  {
    "id": 103,
    "name": "Umami网站统计工具",
    "category": "monitor",
    "isStar": false,
    "alias": "umami",
    "desc": "开源、轻量、隐私友好的网站分析工具，类似于GoogleAnalytics..."
  },
  {
    "id": 104,
    "name": "Stream四层代理转发工具",
    "category": "network",
    "isStar": false,
    "alias": "nginx-stream",
    "desc": ""
  },
  {
    "id": 105,
    "name": "思源笔记",
    "category": "office",
    "isStar": false,
    "alias": "siyuan",
    "desc": "思源笔记是一款隐私优先的知识管理系统"
  },
  {
    "id": 106,
    "name": "Drawnix开源白板工具",
    "category": "office",
    "isStar": false,
    "alias": "drawnix",
    "desc": "是一款强大的开源白板工具，集成思维导图、流程图等。"
  },
  {
    "id": 107,
    "name": "PanSou网盘搜索",
    "category": "tools",
    "isStar": false,
    "alias": "pansou",
    "desc": "PanSou是一个高性能的网盘资源搜索API服务。"
  },
  {
    "id": 108,
    "name": "LangBot聊天机器人",
    "category": "ai",
    "isStar": false,
    "alias": "langbot",
    "desc": "是一个开源的大语言模型原生即时通信机器人开发平台"
  },
  {
    "id": 109,
    "name": "ZFile在线网盘",
    "category": "storage",
    "isStar": false,
    "alias": "zfile",
    "desc": "是一个适用于个人或小团队的在线网盘程序。"
  },
  {
    "id": 110,
    "name": "Karakeep书签管理",
    "category": "office",
    "isStar": false,
    "alias": "karakeep",
    "desc": "是一款可自行托管的书签应用，带有人工智能功能，专为数据囤积者而设计。"
  },
  {
    "id": 111,
    "name": "多格式文件转换工具",
    "category": "tools",
    "isStar": false,
    "alias": "convertx",
    "desc": "是一个功能强大的多格式文件转换工具（支持文档、图像、音频视频等）强烈建议..."
  },
  {
    "id": 112,
    "name": "Lucky大内网穿透工具",
    "category": "network",
    "isStar": false,
    "alias": "lucky",
    "desc": "Lucky 是一个大内网穿透及端口转发管理工具，支持 DDNS、反向代理..."
  },
  {
    "id": 113,
    "name": "Firefox浏览器",
    "category": "tools",
    "isStar": false,
    "alias": "firefox",
    "desc": "是一个运行在 Docker 中的 Firefox 浏览器，支持通过网页直..."
  },
  {
    "id": 114,
    "name": "OpenClaw机器人管理工具",
    "category": "ai",
    "isStar": true,
    "alias": "Moltbot",
    "desc": "ClawdBot|moltbot|clawdbot|openclaw|OpenClaw|"
  },
  {
    "id": 115,
    "name": "Hermes机器人管理工具",
    "category": "ai",
    "isStar": true,
    "alias": "hermes",
    "desc": ""
  },
  {
    "id": 116,
    "name": "DeepSeek Harness管理工具",
    "category": "ai",
    "isStar": true,
    "alias": "deepseek-harness",
    "desc": "DeepSeek-Harness|dsh|"
  },
  {
    "id": 117,
    "name": "99CDN自建CDN管理平台",
    "category": "network",
    "isStar": false,
    "alias": "99cdn",
    "desc": ""
  },
  {
    "id": 118,
    "name": "99DNS智能调度服务",
    "category": "network",
    "isStar": false,
    "alias": "99dns",
    "desc": ""
  }
];


export const GITHUB_TOP_APPS: GithubTopRepo[] = [
  {
    rank: 1,
    name: "DeepSeek-V3 / R1",
    repo: "deepseek-ai/DeepSeek-V3",
    stars: "85.6k+",
    forks: "12.3k",
    language: "Python / C++",
    langColor: "#3572A5",
    tag: "全球顶尖开源大模型",
    desc: "全球瞩目的划时代开源大语言模型与超强推理架构，超越众多专有闭源模型，颠覆开源 AI 竞争格局。",
    highlights: ["超强代码生成与数学推理", "极速多标记预测 (MTP)", "开箱即用支持本地部署"],
    githubUrl: "https://github.com/deepseek-ai/DeepSeek-V3",
    deployCmd: "k app 57",
    appId: 57
  },
  {
    rank: 2,
    name: "Ollama",
    repo: "ollama/ollama",
    stars: "125.8k+",
    forks: "11.9k",
    language: "Go",
    langColor: "#00ADD8",
    tag: "本地大模型运行引擎",
    desc: "轻量化、极速易用的大模型本地运行平台，一键在本地或 VPS 运行 DeepSeek、Llama 3、Qwen 等主流大模型。",
    highlights: ["跨平台 GPU/CPU 硬件加速", "标准 OpenAI 兼容 REST API", "极简命令行一键下载运行"],
    githubUrl: "https://github.com/ollama/ollama",
    deployCmd: "k app 56",
    appId: 56
  },
  {
    rank: 3,
    name: "Open WebUI",
    repo: "open-webui/open-webui",
    stars: "88.5k+",
    forks: "10.6k",
    language: "Svelte / Python",
    langColor: "#ff3e00",
    tag: "全能私有化 AI 交互平台",
    desc: "体验媲美甚至超越 ChatGPT 的自托管多模型 Web 交互界面，完美适配 Ollama 与各大兼容 OpenAI 格式的 API 服务。",
    highlights: ["RAG 知识库与联网检索", "多模态语音交互与绘图生成", "多用户支持与精细权限控制"],
    githubUrl: "https://github.com/open-webui/open-webui",
    deployCmd: "k app 58",
    appId: 58
  },
  {
    rank: 4,
    name: "Dokploy",
    repo: "dokploy/dokploy",
    stars: "22.4k+",
    forks: "1.9k",
    language: "TypeScript",
    langColor: "#3178c6",
    tag: "轻量开源 PaaS 运维平台",
    desc: "下一代开源轻量级自托管 PaaS 应用平台，基于 Docker & Traefik，轻松部署与管理 Web 应用、定时任务和数据库。",
    highlights: ["自动申请与续签 SSL 证书", "原生多服务器与集群管理", "Git Webhook 自动化流水线"],
    githubUrl: "https://github.com/dokploy/dokploy",
    deployCmd: "curl -sSL https://dokploy.com/setup.sh | sh",
    appId: 120
  },
  {
    rank: 5,
    name: "Uptime Kuma",
    repo: "louislam/uptime-kuma",
    stars: "67.2k+",
    forks: "6.1k",
    language: "JavaScript / Vue",
    langColor: "#f1e05a",
    tag: "高颜值自托管探针监控",
    desc: "颜值爆表、功能全面的自托管状态监控服务，支持 HTTP(s)、TCP、Ping、DNS 等数十种监控协议与告警渠道。",
    highlights: ["实时延迟与状态优雅图表", "90+ 种通知告警渠道无缝集成", "可定制独立的对外公开状态页"],
    githubUrl: "https://github.com/louislam/uptime-kuma",
    deployCmd: "k app 18",
    appId: 18
  },
  {
    rank: 6,
    name: "RustDesk",
    repo: "rustdesk/rustdesk",
    stars: "83.1k+",
    forks: "11.5k",
    language: "Rust / Flutter",
    langColor: "#dea584",
    tag: "开源全平台远程桌面中继",
    desc: "开源全平台远程桌面客户端与自建中继服务，端到端高强度加密，TeamViewer 和 AnyDesk 的最佳开源替代方案。",
    highlights: ["自主掌控中继无需担心封禁", "全平台覆盖 (Win/Mac/Linux/移动端)", "点对点极低延迟高清传输"],
    githubUrl: "https://github.com/rustdesk/rustdesk",
    deployCmd: "k app 35",
    appId: 35
  },
  {
    rank: 7,
    name: "Immich",
    repo: "immich-app/immich",
    stars: "64.5k+",
    forks: "3.6k",
    language: "TypeScript / Dart",
    langColor: "#3178c6",
    tag: "高性能私有相册与视频云",
    desc: "自主可控、极速响应的高性能私有相册与视频备份方案，内置本地隐私 AI 人脸识别与物体搜索，替代 Google Photos。",
    highlights: ["手机端全自动后台无感备份", "本地隐私 AI 识别人脸与物体", "多用户共享相册与权限隔离"],
    githubUrl: "https://github.com/immich-app/immich",
    deployCmd: "k app 30",
    appId: 30
  },
  {
    rank: 8,
    name: "n8n",
    repo: "n8n-io/n8n",
    stars: "58.8k+",
    forks: "8.3k",
    language: "TypeScript",
    langColor: "#3178c6",
    tag: "智能自动化与 AI Agent 编排",
    desc: "极其强大的公平代码源自托管自动化工作流工具，原生整合 LangChain 与 AI Agent，轻松连接 400+ 热门服务与 API。",
    highlights: ["直观的可视化节点拖拽编排", "原生构建私有 AI Agent 自动化", "支持嵌入自定义 JS/Python 逻辑"],
    githubUrl: "https://github.com/n8n-io/n8n",
    deployCmd: "k app 88",
    appId: 88
  },
  {
    rank: 9,
    name: "Lobe Chat",
    repo: "lobehub/lobe-chat",
    stars: "60.1k+",
    forks: "12.4k",
    language: "TypeScript",
    langColor: "#3178c6",
    tag: "现代多模态开源 AI 聊天框架",
    desc: "专为现代多模态交互设计的开源大模型聊天框架，支持语音合成/识别、视觉感知交互，以及丰富的社区插件市场生态。",
    highlights: ["极致现代感拟物与毛玻璃设计", "丰富的助手与插件市场即装即用", "开箱支持自建知识库检索 (RAG)"],
    githubUrl: "https://github.com/lobehub/lobe-chat",
    deployCmd: "k app 59",
    appId: 59
  },
  {
    rank: 10,
    name: "Code-Server",
    repo: "coder/code-server",
    stars: "69.8k+",
    forks: "5.7k",
    language: "TypeScript",
    langColor: "#3178c6",
    tag: "浏览器云端全功能 VS Code",
    desc: "在任意远程服务器上运行完整的 VS Code，通过浏览器即可随时随地编写代码，享受与本地一致的高效生产力体验。",
    highlights: ["无缝运行完整 VS Code 插件生态", "支持 iPad/轻薄本跨端云端编程", "充分释放远程高配置服务器算力"],
    githubUrl: "https://github.com/coder/code-server",
    deployCmd: "k app 63",
    appId: 63
  }
];
