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
  appId?: number | string;
}

export interface Category {
  id: string;
  key: string;
  name: string;
}

export interface AppItem {
  id: number | string;
  name: string;
  category: string;
  isStar: boolean;
  alias: string;
  desc: string;
  rec?: {
    badge: string;
    stars: string;
    highlight: string;
    reason: string;
  };
}

export const CATEGORIES: Category[] = [
  {
    "id": "github",
    "key": "A",
    "name": "⭐ 热门开源 TOP10"
  },
  {
    "id": "ops",
    "key": "B",
    "name": "🖥️  服务器运维与探针监控"
  },
  {
    "id": "ai",
    "key": "C",
    "name": "🤖 人工智能与前沿大模型"
  },
  {
    "id": "network",
    "key": "D",
    "name": "🌐 网络代理与穿透组网"
  },
  {
    "id": "storage",
    "key": "E",
    "name": "🗄️  私有网盘与数据存储"
  },
  {
    "id": "media",
    "key": "F",
    "name": "🎬 影音媒体与离线下载"
  },
  {
    "id": "office",
    "key": "G",
    "name": "📝 协作办公与实用工具"
  },
  {
    "id": "custom",
    "key": "H",
    "name": "📦 第三方与社区扩展应用"
  }
];

export const BUILTIN_APPS: AppItem[] = [
  {
    "id": "201",
    "name": "DeepSeek-V3/R1 顶尖开源大模型",
    "category": "github",
    "isStar": true,
    "alias": "deepseek",
    "desc": "全球瞩目的划时代开源大语言模型与超强推理架构。",
    "rec": {
      "badge": "AI 顶流标杆",
      "stars": "185k+",
      "highlight": "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
      "reason": "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
    }
  },
  {
    "id": "202",
    "name": "Ollama 本地大模型极速运行引擎",
    "category": "github",
    "isStar": true,
    "alias": "ollama",
    "desc": "一键在本地或 VPS 运行 DeepSeek、Llama3 等大模型。",
    "rec": {
      "badge": "极速大模型引擎",
      "stars": "115k+",
      "highlight": "让大模型如同普通命令行工具一样易用。一行指令完成大模型拉取、量化、运行与显存管理，完美支撑各类下游 AI 应用与开发环境。",
      "reason": "跨平台生态适配最成熟的开源运行时，与各类客户端无缝联动，开箱即用体验堪称行业标杆。"
    }
  },
  {
    "id": "203",
    "name": "Open WebUI 全能私有化 AI 交互平台",
    "category": "github",
    "isStar": true,
    "alias": "open-webui",
    "desc": "媲美 ChatGPT 的自托管多模型 Web 界面。",
    "rec": {
      "badge": "私有 AI 门户",
      "stars": "58k+",
      "highlight": "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
      "reason": "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
    }
  },
  {
    "id": "204",
    "name": "Dokploy 轻量开源自托管 PaaS 运维平台",
    "category": "github",
    "isStar": true,
    "alias": "dokploy",
    "desc": "下一代轻量级 PaaS 应用平台，一键管理容器应用与数据库。",
    "rec": {
      "badge": "极简 PaaS 云底座",
      "stars": "14k+",
      "highlight": "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
      "reason": "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
    }
  },
  {
    "id": "205",
    "name": "Uptime Kuma 高颜值自托管探针监控",
    "category": "github",
    "isStar": true,
    "alias": "uptime-kuma",
    "desc": "高颜值探针监控，支持 90+ 告警通知与公开状态页。",
    "rec": {
      "badge": "极客必备探针",
      "stars": "62k+",
      "highlight": "自托管监控界的颜值天花板。支持 HTTP(s)、TCP、Ping、DNS、Docker 容器与证书到期监控，内置 90+ 渠道全能实时告警与公开状态页一键生成。",
      "reason": "资源占用极其克制，0 门槛开箱即用，是管理多台服务器与网站集群健康状态的终极守护者。"
    }
  },
  {
    "id": "206",
    "name": "RustDesk 开源全平台远程桌面中继",
    "category": "github",
    "isStar": true,
    "alias": "rustdesk",
    "desc": "开源远程桌面客户端与自建中继服务，端到端高强度加密安全可控。",
    "rec": {
      "badge": "自建中继神器",
      "stars": "76k+",
      "highlight": "端到端高强度加密的完全自主可控远程桌面。支持自建中继服务器与信令网关，无视第三方商业软件限速与隐私风险，流畅低延迟操控云端主机。",
      "reason": "原生 Rust 编写，内存极小，高并发性能极其强悍，是个人与企业团队必备的远程运维底座。"
    }
  },
  {
    "id": "207",
    "name": "Immich 高性能私有云相册与视频备份",
    "category": "github",
    "isStar": true,
    "alias": "immich",
    "desc": "自主可控的极速相册备份方案，内置隐私 AI 识别与人脸聚合。",
    "rec": {
      "badge": "隐私云相册",
      "stars": "61k+",
      "highlight": "全面替代 Google Photos 与 iCloud 的超强开源相册备份。原生配备手机端自动备份、本地离线人脸识别、以图搜图与实况照片完美展示。",
      "reason": "真正把珍贵的生活回忆锁在自己的服务器里，支持多用户隔离与智能相册聚类，体验极速。"
    }
  },
  {
    "id": "208",
    "name": "n8n 智能自动化与 AI Agent 流程编排",
    "category": "github",
    "isStar": true,
    "alias": "n8n",
    "desc": "可视化拖拽自动化工作流，原生构建私有 AI Agent 智能体。",
    "rec": {
      "badge": "AI Agent 中枢",
      "stars": "52k+",
      "highlight": "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
      "reason": "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
    }
  },
  {
    "id": "209",
    "name": "Lobe Chat 现代多模态开源大模型聊天框架",
    "category": "github",
    "isStar": true,
    "alias": "lobe-chat",
    "desc": "极致现代化设计，支持语音、视觉多模态与丰富插件市场。",
    "rec": {
      "badge": "现代化多模态助手",
      "stars": "45k+",
      "highlight": "视觉与界面设计极具科技感的下一代开源 LLM/Agent 聊天框架。原生支持文生图、语音多模态及丰富插件生态。",
      "reason": "PWA 支持极佳，交互动画与卡片排版赏心悦目，开箱即拥有媲美商业级 AI 助手体验。"
    }
  },
  {
    "id": "210",
    "name": "Code-Server 浏览器云端全功能 VS Code",
    "category": "github",
    "isStar": true,
    "alias": "code-server",
    "desc": "在远程服务器运行 VS Code，浏览器即开即写。",
    "rec": {
      "badge": "云端开发工作台",
      "stars": "68k+",
      "highlight": "在远程 Linux 服务器上运行标准 VS Code，通过浏览器随时随地编写代码，保持环境高度统一与持久在线。",
      "reason": "完美解决换机重配环境的痛点，结合云端高带宽，随时随地享受桌面级开发体验。"
    }
  },
  {
    "id": "1",
    "name": "宝塔面板官方版",
    "category": "ops",
    "isStar": true,
    "alias": "bt",
    "desc": "baota",
    "rec": {
      "badge": "运维装机必备",
      "stars": "15k+",
      "highlight": "国内最成熟、装机量极大的 Linux 服务器可视化运维面板。支持 LNMP/LAMP 环境一键搭建、站点管理与 FTP/数据库全套工具。",
      "reason": "生态插件极其完备，新手建站与传统运维的不二选择。"
    }
  },
  {
    "id": "2",
    "name": "aaPanel宝塔国际版",
    "category": "ops",
    "isStar": false,
    "alias": "aapanel",
    "desc": ""
  },
  {
    "id": "3",
    "name": "1Panel新一代管理面板",
    "category": "ops",
    "isStar": true,
    "alias": "1p",
    "desc": "1panel",
    "rec": {
      "badge": "现代化运维首选",
      "stars": "26k+",
      "highlight": "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
      "reason": "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
    }
  },
  {
    "id": "4",
    "name": "NginxProxyManager可视化面板",
    "category": "network",
    "isStar": true,
    "alias": "npm",
    "desc": "一个Nginx反向代理工具面板，不支持添加域名访问。",
    "rec": {
      "badge": "反向代理神器",
      "stars": "21k+",
      "highlight": "超高颜值的 Nginx 反向代理与 SSL 证书可视化管理平台。小白也能在 Web 界面轻松配置多域名转发、Let's Encrypt 证书自动续签与访问控制列表。",
      "reason": "免去手写复杂 nginx.conf 的繁琐与配置报错风险，域名路由管理效率翻倍。"
    }
  },
  {
    "id": "5",
    "name": "OpenList多存储文件列表程序",
    "category": "storage",
    "isStar": false,
    "alias": "openlist",
    "desc": "一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gi..."
  },
  {
    "id": "6",
    "name": "Ubuntu远程桌面网页版",
    "category": "ops",
    "isStar": false,
    "alias": "webtop-ubuntu",
    "desc": "webtop基于Ubuntu的容器。若IP无法访问，请添加域名访问。"
  },
  {
    "id": "7",
    "name": "哪吒探针VPS监控面板",
    "category": "ops",
    "isStar": true,
    "alias": "nezha",
    "desc": "",
    "rec": {
      "badge": "轻量集群探针",
      "stars": "18k+",
      "highlight": "支持多服务器集中监控与大屏看板展示的轻量级探针系统。实时告警 CPU/内存/流量异动，支持多端告警通知。",
      "reason": "资源占用几乎可以忽略，多节点多 VPS 玩家人手必备的机房大屏看板。"
    }
  },
  {
    "id": "8",
    "name": "QB离线BT磁力下载面板",
    "category": "media",
    "isStar": true,
    "alias": "qb",
    "desc": "QB",
    "rec": {
      "badge": "离线下载利器",
      "stars": "24k+",
      "highlight": "功能强大的跨平台 BitTorrent/PT 离线下载客户端，配备干净直观的 Web UI。支持 RSS 自动订阅抓取与多用户带宽限速规则。",
      "reason": "自建影音库与 NAS 离线挂机下载的基石级下载工具。"
    }
  },
  {
    "id": "9",
    "name": "Poste.io邮件服务器程序",
    "category": "office",
    "isStar": false,
    "alias": "mail",
    "desc": ""
  },
  {
    "id": "10",
    "name": "RocketChat多人在线聊天系统",
    "category": "office",
    "isStar": false,
    "alias": "rocketchat",
    "desc": "Rocket.Chat 是一个开源的团队通讯平台，支持实时聊天、音视频通..."
  },
  {
    "id": "11",
    "name": "禅道项目管理软件",
    "category": "office",
    "isStar": false,
    "alias": "zentao",
    "desc": "禅道是通用的项目管理软件"
  },
  {
    "id": "12",
    "name": "青龙面板定时任务管理平台",
    "category": "ops",
    "isStar": false,
    "alias": "qinglong",
    "desc": "青龙面板是一个定时任务管理平台"
  },
  {
    "id": "13",
    "name": "Cloudreve网盘",
    "category": "storage",
    "isStar": true,
    "alias": "cloudreve",
    "desc": "cloudreve是一个支持多家云存储的网盘系统",
    "rec": {
      "badge": "多存储私有网盘",
      "stars": "28k+",
      "highlight": "支持本地存储与各类主流对象存储（七牛/又拍/OSS/COS/OneDrive）统一挂载的现代网盘。支持离线下载、WebDAV 与在线音视频预览。",
      "reason": "单文件部署、极简轻盈，拥有绝佳的桌面端与移动端响应式体验。"
    }
  },
  {
    "id": "14",
    "name": "简单图床图片管理程序",
    "category": "storage",
    "isStar": true,
    "alias": "easyimage",
    "desc": "简单图床是一个简单的图床程序",
    "rec": {
      "badge": "极简公共图床",
      "stars": "6k+",
      "highlight": "轻量好用的自托管图床管理程序。支持多图上传、图片鉴黄、文件外链管理与一键 Markdown/HTML 链接生成。",
      "reason": "无需复杂数据库依赖即可迅速跑起，非常适合个人博客与文档配图托管。"
    }
  },
  {
    "id": "15",
    "name": "emby多媒体管理系统",
    "category": "media",
    "isStar": true,
    "alias": "emby",
    "desc": "emby是一个主从式架构的媒体服务器软件，可以用来整理服务器上的视频和音...",
    "rec": {
      "badge": "私有影音媒体库",
      "stars": "19k+",
      "highlight": "全平台覆盖的家庭影院与多媒体中心。支持电影、剧集、音乐自动搜刮刮削封面，多设备硬件解码与画质自适应串流播放。",
      "reason": "打造个人专属 Netflix 的顶流选择，随时随地在手机、电视、网页畅享高清大片。"
    }
  },
  {
    "id": "16",
    "name": "Speedtest测速面板",
    "category": "ops",
    "isStar": false,
    "alias": "looking",
    "desc": "Speedtest测速面板是一个VPS网速测试工具，多项测试功能，还可以..."
  },
  {
    "id": "17",
    "name": "AdGuardHome去广告软件",
    "category": "network",
    "isStar": false,
    "alias": "adguardhome",
    "desc": "AdGuardHome是一款全网广告拦截与反跟踪软件，未来将不止是一个D..."
  },
  {
    "id": "18",
    "name": "onlyoffice在线办公OFFICE",
    "category": "office",
    "isStar": false,
    "alias": "onlyoffice",
    "desc": "onlyoffice是一款开源的在线office工具，太强大了！"
  },
  {
    "id": "19",
    "name": "雷池WAF防火墙面板",
    "category": "network",
    "isStar": false,
    "alias": "safeline",
    "desc": ""
  },
  {
    "id": "20",
    "name": "portainer容器管理面板",
    "category": "ops",
    "isStar": false,
    "alias": "portainer",
    "desc": "portainer是一个轻量级的docker容器管理面板"
  },
  {
    "id": "21",
    "name": "VScode网页版",
    "category": "office",
    "isStar": false,
    "alias": "vscode",
    "desc": "VScode是一款强大的在线代码编写工具"
  },
  {
    "id": "22",
    "name": "UptimeKuma监控工具",
    "category": "ops",
    "isStar": false,
    "alias": "uptime-kuma",
    "desc": "Uptime Kuma 易于使用的自托管监控工具"
  },
  {
    "id": "23",
    "name": "Memos网页备忘录",
    "category": "office",
    "isStar": true,
    "alias": "memos",
    "desc": "Memos是一款轻量级、自托管的备忘录中心",
    "rec": {
      "badge": "碎片灵感看板",
      "stars": "33k+",
      "highlight": "支持隐私自托管的极简卡片式灵感备忘录。支持 Markdown、轻量标签、时间轴热力图以及与各类客户端的无缝同步。",
      "reason": "类似推特/微博的轻量记录形态，是捕捉日常闪光想法与日记记录的绝佳载体。"
    }
  },
  {
    "id": "24",
    "name": "Webtop远程桌面网页版",
    "category": "ops",
    "isStar": false,
    "alias": "webtop",
    "desc": "webtop基于Alpine的中文版容器。若IP无法访问，请添加域名访问..."
  },
  {
    "id": "25",
    "name": "Nextcloud网盘",
    "category": "storage",
    "isStar": true,
    "alias": "nextcloud",
    "desc": "Nextcloud拥有超过 400,000 个部署，是您可以下载的最受欢...",
    "rec": {
      "badge": "企业级私有云盘",
      "stars": "25k+",
      "highlight": "功能强大的开源自建云办公与数据存储协作套件。集成日程协同、文件同步共享、文档多人在线编辑与全平台客户端支持。",
      "reason": "数据自主掌控的终极私有云方案，适合对数据隐私有极高要求的个人与团队。"
    }
  },
  {
    "id": "26",
    "name": "QD-Today定时任务管理框架",
    "category": "office",
    "isStar": false,
    "alias": "qd",
    "desc": "QD-Today是一个HTTP请求定时任务自动执行框架"
  },
  {
    "id": "27",
    "name": "Dockge容器堆栈管理面板",
    "category": "ops",
    "isStar": false,
    "alias": "dockge",
    "desc": "dockge是一个可视化的docker-compose容器管理面板"
  },
  {
    "id": "28",
    "name": "LibreSpeed测速工具",
    "category": "ops",
    "isStar": false,
    "alias": "speedtest",
    "desc": "librespeed是用Javascript实现的轻量级速度测试工具，即..."
  },
  {
    "id": "29",
    "name": "searxng聚合搜索站",
    "category": "office",
    "isStar": false,
    "alias": "searxng",
    "desc": "searxng是一个私有且隐私的搜索引擎站点"
  },
  {
    "id": "30",
    "name": "PhotoPrism私有相册系统",
    "category": "storage",
    "isStar": false,
    "alias": "photoprism",
    "desc": "photoprism非常强大的私有相册系统"
  },
  {
    "id": "31",
    "name": "StirlingPDF工具大全",
    "category": "office",
    "isStar": false,
    "alias": "s-pdf",
    "desc": "这是一个强大的本地托管基于 Web 的 PDF 操作工具，使用 dock..."
  },
  {
    "id": "32",
    "name": "drawio免费的在线图表软件",
    "category": "office",
    "isStar": false,
    "alias": "drawio",
    "desc": "这是一个强大图表绘制软件。思维导图，拓扑图，流程图，都能画"
  },
  {
    "id": "33",
    "name": "Sun-Panel导航面板",
    "category": "office",
    "isStar": false,
    "alias": "sun-panel",
    "desc": "Sun-Panel服务器、NAS导航面板、Homepage、浏览器首页"
  },
  {
    "id": "34",
    "name": "Pingvin-Share文件分享平台",
    "category": "storage",
    "isStar": false,
    "alias": "pingvin-share",
    "desc": "Pingvin Share 是一个可自建的文件分享平台，是 WeTran..."
  },
  {
    "id": "35",
    "name": "极简朋友圈",
    "category": "office",
    "isStar": false,
    "alias": "moments",
    "desc": "极简朋友圈，高仿微信朋友圈，记录你的美好生活"
  },
  {
    "id": "36",
    "name": "LobeChatAI聊天聚合网站",
    "category": "ai",
    "isStar": false,
    "alias": "lobe-chat",
    "desc": "LobeChat聚合市面上主流的AI大模型，ChatGPT/Claude..."
  },
  {
    "id": "37",
    "name": "MyIP工具箱",
    "category": "office",
    "isStar": false,
    "alias": "myip",
    "desc": "是一个多功能IP工具箱，可以查看自己IP信息及连通性，用网页面板呈现"
  },
  {
    "id": "38",
    "name": "小雅alist全家桶",
    "category": "storage",
    "isStar": false,
    "alias": "xiaoya",
    "desc": ""
  },
  {
    "id": "39",
    "name": "Bililive直播录制工具",
    "category": "media",
    "isStar": false,
    "alias": "bililive",
    "desc": "Bililive-go是一个支持多种直播平台的直播录制工具"
  },
  {
    "id": "40",
    "name": "webssh网页版SSH连接工具",
    "category": "ops",
    "isStar": false,
    "alias": "webssh",
    "desc": "简易在线ssh连接工具和sftp工具"
  },
  {
    "id": "41",
    "name": "耗子管理面板",
    "category": "ops",
    "isStar": false,
    "alias": "haozi",
    "desc": "acepanel"
  },
  {
    "id": "42",
    "name": "Nexterm远程连接工具",
    "category": "ops",
    "isStar": false,
    "alias": "nexterm",
    "desc": "nexterm是一款强大的在线SSH/VNC/RDP连接工具。"
  },
  {
    "id": "43",
    "name": "RustDesk远程桌面(服务端)",
    "category": "ops",
    "isStar": false,
    "alias": "hbbs",
    "desc": "rustdesk开源的远程桌面(服务端)，类似自己的向日葵私服。"
  },
  {
    "id": "44",
    "name": "RustDesk远程桌面(中继端)",
    "category": "ops",
    "isStar": false,
    "alias": "hbbr",
    "desc": "rustdesk开源的远程桌面(中继端)，类似自己的向日葵私服。"
  },
  {
    "id": "45",
    "name": "Docker加速站",
    "category": "network",
    "isStar": false,
    "alias": "registry",
    "desc": "Docker Registry 是一个用于存储和分发 Docker 镜像..."
  },
  {
    "id": "46",
    "name": "GitHub加速站",
    "category": "network",
    "isStar": false,
    "alias": "ghproxy",
    "desc": "使用Go实现的GHProxy，用于加速部分地区Github仓库的拉取。"
  },
  {
    "id": "47",
    "name": "普罗米修斯监控",
    "category": "ops",
    "isStar": false,
    "alias": "prometheus",
    "desc": "grafana"
  },
  {
    "id": "48",
    "name": "普罗米修斯(主机监控)",
    "category": "ops",
    "isStar": false,
    "alias": "node-exporter",
    "desc": "这是一个普罗米修斯的主机数据采集组件，请部署在被监控主机上。"
  },
  {
    "id": "49",
    "name": "普罗米修斯(容器监控)",
    "category": "ops",
    "isStar": false,
    "alias": "cadvisor",
    "desc": "这是一个普罗米修斯的容器数据采集组件，请部署在被监控主机上。"
  },
  {
    "id": "50",
    "name": "补货监控工具",
    "category": "ops",
    "isStar": false,
    "alias": "changedetection",
    "desc": "这是一款网站变化检测、补货监控和通知的小工具"
  },
  {
    "id": "51",
    "name": "PVE开小鸡面板",
    "category": "ops",
    "isStar": false,
    "alias": "pve",
    "desc": ""
  },
  {
    "id": "52",
    "name": "DPanel容器管理面板",
    "category": "ops",
    "isStar": false,
    "alias": "dpanel",
    "desc": "Docker可视化面板系统，提供完善的docker管理功能。"
  },
  {
    "id": "53",
    "name": "llama3聊天AI大模型",
    "category": "ai",
    "isStar": false,
    "alias": "llama3",
    "desc": "OpenWebUI一款大语言模型网页框架，接入全新的llama3大语言模..."
  },
  {
    "id": "54",
    "name": "AMH主机建站管理面板",
    "category": "ops",
    "isStar": false,
    "alias": "amh",
    "desc": ""
  },
  {
    "id": "55",
    "name": "FRP内网穿透(服务端)",
    "category": "network",
    "isStar": false,
    "alias": "frps",
    "desc": ""
  },
  {
    "id": "56",
    "name": "FRP内网穿透(客户端)",
    "category": "network",
    "isStar": false,
    "alias": "frpc",
    "desc": ""
  },
  {
    "id": "57",
    "name": "Deepseek聊天AI大模型",
    "category": "ai",
    "isStar": false,
    "alias": "deepseek",
    "desc": "OpenWebUI一款大语言模型网页框架，接入全新的DeepSeek R..."
  },
  {
    "id": "58",
    "name": "Dify大模型知识库",
    "category": "ai",
    "isStar": true,
    "alias": "dify",
    "desc": "是一款开源的大语言模型(LLM) 应用开发平台。自托管训练数据用于AI生...",
    "rec": {
      "badge": "LLM 知识库开发平台",
      "stars": "60k+",
      "highlight": "直观易用且功能完备的 LLM 应用开发平台。内置 RAG 引擎、工作流编排、模型管理与一键 API / WebApp 交付发布。",
      "reason": "快速构建企业内部问答助手、知识检索与 AI Agent 的行业事实标准平台。"
    }
  },
  {
    "id": "59",
    "name": "NewAPI大模型资产管理",
    "category": "ai",
    "isStar": false,
    "alias": "new-api",
    "desc": "新一代大模型网关与AI资产管理系统"
  },
  {
    "id": "60",
    "name": "JumpServer开源堡垒机",
    "category": "ops",
    "isStar": true,
    "alias": "jms",
    "desc": "是一个开源的特权访问管理 (PAM) 工具，该程序占用80端口不支持添加...",
    "rec": {
      "badge": "开源堡垒机运维审计",
      "stars": "25k+",
      "highlight": "全球首款完全开源的堡垒机与安全运维审计平台。支持 SSH、Windows RDP、Web 终端统一纳管、会话录像与权限精细化控制。",
      "reason": "多节点资产集中运维与企业合规审计的行业标杆之作。"
    }
  },
  {
    "id": "61",
    "name": "在线翻译服务器",
    "category": "office",
    "isStar": false,
    "alias": "libretranslate",
    "desc": "免费开源机器翻译 API，完全自托管，它的翻译引擎由开源Argos Tr..."
  },
  {
    "id": "62",
    "name": "RAGFlow大模型知识库",
    "category": "ai",
    "isStar": false,
    "alias": "ragflow",
    "desc": "基于深度文档理解的开源 RAG（检索增强生成）引擎"
  },
  {
    "id": "63",
    "name": "OpenWebUI自托管AI平台",
    "category": "ai",
    "isStar": false,
    "alias": "open-webui",
    "desc": "OpenWebUI一款大语言模型网页框架，官方精简版本，支持各大模型AP..."
  },
  {
    "id": "64",
    "name": "it-tools工具箱",
    "category": "office",
    "isStar": false,
    "alias": "it-tools",
    "desc": "对开发人员和 IT 工作者来说非常有用的工具"
  },
  {
    "id": "65",
    "name": "n8n自动化工作流平台",
    "category": "office",
    "isStar": false,
    "alias": "n8n",
    "desc": "是一款功能强大的自动化工作流平台"
  },
  {
    "id": "66",
    "name": "yt-dlp视频下载工具",
    "category": "media",
    "isStar": false,
    "alias": "yt",
    "desc": ""
  },
  {
    "id": "67",
    "name": "ddns-go动态DNS管理工具",
    "category": "network",
    "isStar": false,
    "alias": "ddns",
    "desc": "自动将你的公网 IP（IPv4/IPv6）实时更新到各大 DNS 服务商..."
  },
  {
    "id": "68",
    "name": "AllinSSL证书管理平台",
    "category": "network",
    "isStar": false,
    "alias": "allinssl",
    "desc": "开源免费的 SSL 证书自动化管理平台"
  },
  {
    "id": "69",
    "name": "SFTPGo文件传输工具",
    "category": "storage",
    "isStar": false,
    "alias": "sftpgo",
    "desc": "开源免费随时随地SFTP FTP WebDAV 文件传输工具"
  },
  {
    "id": "70",
    "name": "AstrBot聊天机器人框架",
    "category": "ai",
    "isStar": false,
    "alias": "astrbot",
    "desc": "开源AI聊天机器人框架，支持微信，QQ，TG接入AI大模型"
  },
  {
    "id": "71",
    "name": "Navidrome私有音乐服务器",
    "category": "media",
    "isStar": false,
    "alias": "navidrome",
    "desc": "是一个轻量、高性能的音乐流媒体服务器"
  },
  {
    "id": "72",
    "name": "bitwarden密码管理器",
    "category": "office",
    "isStar": false,
    "alias": "bitwarden",
    "desc": "一个你可以控制数据的密码管理器"
  },
  {
    "id": "73",
    "name": "LibreTV私有影视",
    "category": "media",
    "isStar": false,
    "alias": "libretv",
    "desc": "免费在线视频搜索与观看平台"
  },
  {
    "id": "74",
    "name": "MoonTV私有影视",
    "category": "media",
    "isStar": false,
    "alias": "moontv",
    "desc": "免费在线视频搜索与观看平台"
  },
  {
    "id": "75",
    "name": "Melody音乐精灵",
    "category": "media",
    "isStar": false,
    "alias": "melody",
    "desc": "你的音乐精灵，旨在帮助你更好地管理音乐。"
  },
  {
    "id": "76",
    "name": "在线DOS老游戏",
    "category": "media",
    "isStar": false,
    "alias": "dosgame",
    "desc": "是一个中文DOS游戏合集网站"
  },
  {
    "id": "77",
    "name": "迅雷离线下载工具",
    "category": "media",
    "isStar": false,
    "alias": "xunlei",
    "desc": "迅雷你的离线高速BT磁力下载工具"
  },
  {
    "id": "78",
    "name": "PandaWiki智能文档管理系统",
    "category": "office",
    "isStar": false,
    "alias": "PandaWiki",
    "desc": "PandaWiki是一款AI大模型驱动的开源智能文档管理系统，强烈建议不..."
  },
  {
    "id": "79",
    "name": "Beszel服务器监控",
    "category": "ops",
    "isStar": false,
    "alias": "beszel",
    "desc": "Beszel轻量易用的服务器监控"
  },
  {
    "id": "80",
    "name": "linkwarden书签管理",
    "category": "office",
    "isStar": false,
    "alias": "linkwarden",
    "desc": "一个开源的自托管书签管理平台，支持标签、搜索和团队协作。"
  },
  {
    "id": "81",
    "name": "JitsiMeet视频会议",
    "category": "office",
    "isStar": false,
    "alias": "jitsi",
    "desc": "一个开源的安全视频会议解决方案，支持多人在线会议、屏幕共享与加密通信。"
  },
  {
    "id": "82",
    "name": "gpt-load高性能AI透明代理",
    "category": "ai",
    "isStar": false,
    "alias": "gpt-load",
    "desc": "高性能AI接口透明代理服务"
  },
  {
    "id": "83",
    "name": "komari服务器监控工具",
    "category": "ops",
    "isStar": false,
    "alias": "komari",
    "desc": "轻量级的自托管服务器监控工具"
  },
  {
    "id": "84",
    "name": "Wallos个人财务管理工具",
    "category": "office",
    "isStar": false,
    "alias": "wallos",
    "desc": "开源个人订阅追踪器，可用于财务管理"
  },
  {
    "id": "85",
    "name": "immich图片视频管理器",
    "category": "storage",
    "isStar": false,
    "alias": "immich",
    "desc": "高性能自托管照片和视频管理解决方案。"
  },
  {
    "id": "86",
    "name": "jellyfin媒体管理系统",
    "category": "media",
    "isStar": false,
    "alias": "jellyfin",
    "desc": "是一款开源媒体服务器软件"
  },
  {
    "id": "87",
    "name": "SyncTV一起看片神器",
    "category": "media",
    "isStar": false,
    "alias": "synctv",
    "desc": "远程一起观看电影和直播的程序。它提供了同步观影、直播、聊天等功能"
  },
  {
    "id": "88",
    "name": "Owncast自托管直播平台",
    "category": "media",
    "isStar": false,
    "alias": "owncast",
    "desc": "开源、免费的自建直播平台"
  },
  {
    "id": "89",
    "name": "FileCodeBox文件快递",
    "category": "storage",
    "isStar": false,
    "alias": "file-code-box",
    "desc": "匿名口令分享文本和文件，像拿快递一样取文件"
  },
  {
    "id": "90",
    "name": "matrix去中心化聊天协议",
    "category": "office",
    "isStar": false,
    "alias": "matrix",
    "desc": "Matrix是一个去中心化的聊天协议"
  },
  {
    "id": "91",
    "name": "gitea私有代码仓库",
    "category": "office",
    "isStar": false,
    "alias": "gitea",
    "desc": "免费新一代的代码托管平台，提供接近 GitHub 的使用体验。"
  },
  {
    "id": "92",
    "name": "FileBrowser文件管理器",
    "category": "storage",
    "isStar": false,
    "alias": "filebrowser",
    "desc": "是一个基于Web的文件管理器"
  },
  {
    "id": "93",
    "name": "Dufs极简静态文件服务器",
    "category": "storage",
    "isStar": false,
    "alias": "dufs",
    "desc": "极简静态文件服务器，支持上传下载"
  },
  {
    "id": "94",
    "name": "Gopeed高速下载工具",
    "category": "media",
    "isStar": false,
    "alias": "gopeed",
    "desc": "分布式高速下载工具，支持多种协议"
  },
  {
    "id": "95",
    "name": "paperless文档管理平台",
    "category": "office",
    "isStar": false,
    "alias": "paperless",
    "desc": "开源的电子文档管理系统，它的主要用途是把你的纸质文件数字化并管理起来。"
  },
  {
    "id": "96",
    "name": "2FAuth自托管二步验证器",
    "category": "office",
    "isStar": false,
    "alias": "2fauth",
    "desc": "自托管的双重身份验证 (2FA) 账户管理和验证码生成工具。"
  },
  {
    "id": "97",
    "name": "WireGuard组网(服务端)",
    "category": "network",
    "isStar": false,
    "alias": "wgs",
    "desc": "现代化、高性能的虚拟专用网络工具"
  },
  {
    "id": "98",
    "name": "WireGuard组网(客户端)",
    "category": "network",
    "isStar": false,
    "alias": "wgc",
    "desc": "现代化、高性能的虚拟专用网络工具"
  },
  {
    "id": "99",
    "name": "DSM群晖虚拟机",
    "category": "ops",
    "isStar": false,
    "alias": "dsm",
    "desc": "Docker容器中的虚拟DSM"
  },
  {
    "id": "100",
    "name": "Syncthing点对点文件同步工具",
    "category": "storage",
    "isStar": false,
    "alias": "syncthing",
    "desc": "开源的点对点文件同步工具，类似于 Dropbox、Resilio Syn..."
  },
  {
    "id": "101",
    "name": "AI视频生成工具",
    "category": "ai",
    "isStar": false,
    "alias": "moneyprinterturbo",
    "desc": "MoneyPrinterTurbo是一款使用AI大模型合成高清短视频的工..."
  },
  {
    "id": "102",
    "name": "VoceChat多人在线聊天系统",
    "category": "office",
    "isStar": false,
    "alias": "vocechat",
    "desc": "是一款支持独立部署的个人云社交媒体聊天服务"
  },
  {
    "id": "103",
    "name": "Umami网站统计工具",
    "category": "ops",
    "isStar": false,
    "alias": "umami",
    "desc": "开源、轻量、隐私友好的网站分析工具，类似于GoogleAnalytics..."
  },
  {
    "id": "104",
    "name": "Stream四层代理转发工具",
    "category": "network",
    "isStar": false,
    "alias": "nginx-stream",
    "desc": ""
  },
  {
    "id": "105",
    "name": "思源笔记",
    "category": "office",
    "isStar": false,
    "alias": "siyuan",
    "desc": "思源笔记是一款隐私优先的知识管理系统"
  },
  {
    "id": "106",
    "name": "Drawnix开源白板工具",
    "category": "office",
    "isStar": false,
    "alias": "drawnix",
    "desc": "是一款强大的开源白板工具，集成思维导图、流程图等。"
  },
  {
    "id": "107",
    "name": "PanSou网盘搜索",
    "category": "office",
    "isStar": false,
    "alias": "pansou",
    "desc": "PanSou是一个高性能的网盘资源搜索API服务。"
  },
  {
    "id": "108",
    "name": "LangBot聊天机器人",
    "category": "ai",
    "isStar": false,
    "alias": "langbot",
    "desc": "是一个开源的大语言模型原生即时通信机器人开发平台"
  },
  {
    "id": "109",
    "name": "ZFile在线网盘",
    "category": "storage",
    "isStar": false,
    "alias": "zfile",
    "desc": "是一个适用于个人或小团队的在线网盘程序。"
  },
  {
    "id": "110",
    "name": "Karakeep书签管理",
    "category": "office",
    "isStar": false,
    "alias": "karakeep",
    "desc": "是一款可自行托管的书签应用，带有人工智能功能，专为数据囤积者而设计。"
  },
  {
    "id": "111",
    "name": "多格式文件转换工具",
    "category": "office",
    "isStar": false,
    "alias": "convertx",
    "desc": "是一个功能强大的多格式文件转换工具（支持文档、图像、音频视频等）强烈建议..."
  },
  {
    "id": "112",
    "name": "Lucky大内网穿透工具",
    "category": "network",
    "isStar": false,
    "alias": "lucky",
    "desc": "Lucky 是一个大内网穿透及端口转发管理工具，支持 DDNS、反向代理..."
  },
  {
    "id": "113",
    "name": "Firefox浏览器",
    "category": "office",
    "isStar": false,
    "alias": "firefox",
    "desc": "是一个运行在 Docker 中的 Firefox 浏览器，支持通过网页直..."
  },
  {
    "id": "114",
    "name": "OpenClaw机器人管理工具",
    "category": "ai",
    "isStar": false,
    "alias": "Moltbot",
    "desc": "ClawdBot"
  },
  {
    "id": "115",
    "name": "Hermes机器人管理工具",
    "category": "ai",
    "isStar": false,
    "alias": "hermes",
    "desc": ""
  },
  {
    "id": "116",
    "name": "DeepSeek Harness管理工具",
    "category": "ai",
    "isStar": false,
    "alias": "deepseek-harness",
    "desc": "DeepSeek-Harness"
  },
  {
    "id": "117",
    "name": "99CDN自建CDN管理平台",
    "category": "network",
    "isStar": false,
    "alias": "99cdn",
    "desc": ""
  },
  {
    "id": "118",
    "name": "99DNS智能调度服务",
    "category": "network",
    "isStar": false,
    "alias": "99dns",
    "desc": ""
  },
  {
    "id": "119",
    "name": "Agent2API 桌面AI客户端反代网关",
    "category": "ai",
    "isStar": true,
    "alias": "agent2api",
    "desc": "把 WorkBuddy/小浣熊/Trae/Qoder/Cline 等桌面 AI 客户端登录态包装为标准 OpenAI 兼容 API 网关",
    "rec": {
      "badge": "多 AI 客户端通用网关",
      "stars": "300+",
      "highlight": "将多家桌面 AI 客户端与 Agent 工具的登录态统一反代包装为 OpenAI / Claude 兼容 API 端点 (127.0.0.1:3065/v1)，支持 token 自动续期与全局 429 降级队列。",
      "reason": "轻松复用多平台客户端的模型额度，一键打通任意第三方 API 客户端或 CLI 开发工具。"
    }
  },
  {
    "id": "AIClient-2-API",
    "name": "AIClient-2-API",
    "category": "custom",
    "isStar": false,
    "alias": "AIClient-2-API",
    "desc": "AI客户端转API代理，将Gemini/Kiro/Qwen Code等客户端大模型转为OpenAI兼容接口"
  },
  {
    "id": "CLIProxyAPI",
    "name": "CLIProxyAPI",
    "category": "custom",
    "isStar": true,
    "alias": "CLIProxyAPI",
    "desc": "将 Gemini、Claude、Codex、Qwen 等免费模型包装成 OpenAI 兼容 API 服务"
  },
  {
    "id": "airadio",
    "name": "AIradio",
    "category": "custom",
    "isStar": false,
    "alias": "airadio",
    "desc": "AI 驱动的在线电台，可制作节目、生成配音并管理音乐播放。"
  },
  {
    "id": "aistudio-to-api",
    "name": "AIStudioToAPI",
    "category": "custom",
    "isStar": false,
    "alias": "aistudio-to-api",
    "desc": "将 Google AI Studio Build 封装为 OpenAI、Gemini、Anthropic 兼容 API"
  },
  {
    "id": "antigravity",
    "name": "Antigravity Manager",
    "category": "custom",
    "isStar": true,
    "alias": "antigravity",
    "desc": "专业级 AI 账号管理与协议代理系统"
  },
  {
    "id": "arena-brawl",
    "name": "大乱斗 Arena Brawl",
    "category": "custom",
    "isStar": false,
    "alias": "arena-brawl",
    "desc": "实时多人在线网页大乱斗游戏，支持排行榜与聊天"
  },
  {
    "id": "bomb-party",
    "name": "炸弹派对 Bomb Party",
    "category": "custom",
    "isStar": false,
    "alias": "bomb-party",
    "desc": "Q版多人在线炸弹人对战游戏，实时联机，排行榜持久化"
  },
  {
    "id": "clouddrive2",
    "name": "clouddrive2",
    "category": "custom",
    "isStar": false,
    "alias": "clouddrive2",
    "desc": "一个全方位的云存储管理平台，旨在无缝集成多个云存储服务"
  },
  {
    "id": "copaw",
    "name": "CoPaw AI Assistant",
    "category": "custom",
    "isStar": true,
    "alias": "copaw",
    "desc": "阿里开源的个人AI助手，支持钉钉/飞书/QQ/Discord多渠道，内置技能系统与长期记忆。"
  },
  {
    "id": "discourse",
    "name": "Discourse",
    "category": "custom",
    "isStar": false,
    "alias": "discourse",
    "desc": "开源社区论坛与知识讨论平台"
  },
  {
    "id": "dnsmgr",
    "name": "彩虹聚合DNS管理系统",
    "category": "custom",
    "isStar": false,
    "alias": "dnsmgr",
    "desc": "彩虹聚合DNS一站式管理阿里云、腾讯云、Cloudflare等解析，支持容灾自动切换"
  },
  {
    "id": "dstatus",
    "name": "DStatus",
    "category": "custom",
    "isStar": false,
    "alias": "dstatus",
    "desc": "现代化服务器状态监控面板，支持实时监控与多服务器管理"
  },
  {
    "id": "easyimg",
    "name": "EasyImg",
    "category": "custom",
    "isStar": false,
    "alias": "easyimg",
    "desc": "一站式图床服务. 支持公共上传，支持部署AI鉴黄检测，权限控制、数据统计、实时推送等功能"
  },
  {
    "id": "easytier",
    "name": "EasyTier",
    "category": "custom",
    "isStar": false,
    "alias": "easytier",
    "desc": "简单、安全、去中心化的异地组网方案，支持 NAT 穿透、Web 管理与 WireGuard"
  },
  {
    "id": "excalidraw",
    "name": "Excalidraw",
    "category": "custom",
    "isStar": false,
    "alias": "excalidraw",
    "desc": "虚拟手绘风格白板，支持绘制流程图、图表，数据存储在本地浏览器中"
  },
  {
    "id": "fast-note-sync-service",
    "name": "Fast Note Sync Service",
    "category": "custom",
    "isStar": false,
    "alias": "fast-note-sync-service",
    "desc": "高性能、低延迟的笔记同步、在线管理平台，支持MCP协议和多设备实时同步。"
  },
  {
    "id": "gemini-business2api",
    "name": "Gemini Business2API",
    "category": "custom",
    "isStar": false,
    "alias": "gemini-business2api",
    "desc": "Gemini Business 转 OpenAI 兼容 API（含管理面板/多账号负载）"
  },
  {
    "id": "global-radio",
    "name": "全球电台 (GlobalRadio)",
    "category": "custom",
    "isStar": false,
    "alias": "global-radio",
    "desc": "一个在线电台应用，支持全球电台收听、搜索、收藏、定时、多语言。"
  },
  {
    "id": "gmssh",
    "name": "GMSSH",
    "category": "custom",
    "isStar": false,
    "alias": "gmssh",
    "desc": "桌面级AI运维系统，高性能·零侵入·AI智驱的SSH远程工具"
  },
  {
    "id": "grok2api",
    "name": "Grok2API",
    "category": "custom",
    "isStar": true,
    "alias": "grok2api",
    "desc": "多账号 Grok API 网关，支持 OpenAI/Anthropic 兼容接口与管理控制台"
  },
  {
    "id": "headscale",
    "name": "Headscale",
    "category": "custom",
    "isStar": false,
    "alias": "headscale",
    "desc": "自托管 Tailscale 控制服务器 + Web管理面板，基于 WireGuard 的 Mesh VPN 组网"
  },
  {
    "id": "hubproxy",
    "name": "HubProxy",
    "category": "custom",
    "isStar": false,
    "alias": "hubproxy",
    "desc": "Docker和GitHub加速服务器"
  },
  {
    "id": "ice-climber-arena",
    "name": "敲冰块大逃脱 Ice Climber Arena",
    "category": "custom",
    "isStar": false,
    "alias": "ice-climber-arena",
    "desc": "多人在线敲冰块爬塔逃杀游戏，实时联机，排行榜持久化"
  },
  {
    "id": "iyuuplus",
    "name": "IYUUPlus",
    "category": "custom",
    "isStar": false,
    "alias": "iyuuplus",
    "desc": "全自动PT辅种与管理工具，支持多客户端互通"
  },
  {
    "id": "kpanel",
    "name": "KPanel",
    "category": "custom",
    "isStar": true,
    "alias": "kpanel",
    "desc": "完全贴合本工具箱业务的现代化 Linux Web 管理面板"
  },
  {
    "id": "lsky-pro",
    "name": "Lsky Pro",
    "category": "custom",
    "isStar": false,
    "alias": "lsky-pro",
    "desc": "高性能、功能丰富的自托管图床系统(Postgres + Redis版)"
  },
  {
    "id": "mlflow",
    "name": "MLflow",
    "category": "custom",
    "isStar": false,
    "alias": "mlflow",
    "desc": "开源AI/ML开发平台，支持实验追踪、模型管理、LLM可观测性与评估"
  },
  {
    "id": "molilotto",
    "name": "魔力彩票助手（Lottery Prediction Assistant）",
    "category": "custom",
    "isStar": false,
    "alias": "molilotto",
    "desc": "自动抓取开奖信息+ 自定义AI大模型分析对比+后台管理。"
  },
  {
    "id": "monitor",
    "name": "Monitor Probe",
    "category": "custom",
    "isStar": false,
    "alias": "monitor",
    "desc": "极简探针 Rust 编写的轻量级服务器探针，支持实时监控、流量统计与掉线通知"
  },
  {
    "id": "mytube",
    "name": "MyTube",
    "category": "custom",
    "isStar": false,
    "alias": "mytube",
    "desc": "私人视频收藏与管理工具(支持 YouTube BiliBli 下载)"
  },
  {
    "id": "neon-arena-fps",
    "name": "霓虹竞技场 NEON ARENA",
    "category": "custom",
    "isStar": false,
    "alias": "neon-arena-fps",
    "desc": "3D第一人称多人在线射击游戏，霓虹风格竞技场"
  },
  {
    "id": "next-terminal",
    "name": "Next Terminal",
    "category": "custom",
    "isStar": false,
    "alias": "next-terminal",
    "desc": "Web 运维审计堡垒机，支持 SSH、RDP、VNC 等协议"
  },
  {
    "id": "nodeget",
    "name": "NodeGet",
    "category": "custom",
    "isStar": false,
    "alias": "nodeget",
    "desc": "NodeGet 服务器节点监控、API 扩展与自动化运维平台"
  },
  {
    "id": "npc",
    "name": "NPC",
    "category": "custom",
    "isStar": false,
    "alias": "npc",
    "desc": "NPS内网穿透客户端，连接服务端后支持TCP/UDP/HTTP/HTTPS/SOCKS5等隧道穿透"
  },
  {
    "id": "nps",
    "name": "NPS",
    "category": "custom",
    "isStar": false,
    "alias": "nps",
    "desc": "轻量级内网穿透服务端，支持TCP/UDP/HTTP/HTTPS等多种隧道，自带Web管理面板"
  },
  {
    "id": "octopus",
    "name": "Octopus",
    "category": "custom",
    "isStar": false,
    "alias": "octopus",
    "desc": "为个人打造的简单美观优雅的LLMAPI聚合与负载均衡服务"
  },
  {
    "id": "pika",
    "name": "Pika Monitor",
    "category": "custom",
    "isStar": false,
    "alias": "pika",
    "desc": "基于 Go 的实时探针监控系统，支持性能监控、服务监控与安全审计。"
  },
  {
    "id": "sub2api",
    "name": "Sub2API",
    "category": "custom",
    "isStar": false,
    "alias": "sub2api",
    "desc": "AI API 网关平台 - 订阅配额分发管理（Claude/Gemini/OpenAI/Grok 等）"
  },
  {
    "id": "workbuddy2api",
    "name": "WorkBuddy2API + Manager",
    "category": "custom",
    "isStar": false,
    "alias": "workbuddy2api",
    "desc": "第三方 CodeBuddy 账号池 API 网关与管理面板（仅本机监听）"
  },
  {
    "id": "wxchat",
    "name": "WxChat",
    "category": "custom",
    "isStar": false,
    "alias": "wxchat",
    "desc": "MoviePilot微信转发代理Docker"
  },
  {
    "id": "zeroclaw",
    "name": "ZeroClaw",
    "category": "custom",
    "isStar": false,
    "alias": "zeroclaw",
    "desc": "快速、小型且完全自主的 AI 助手基础设施，可在低成本硬件上部署，并支持可替换组件。"
  }
];
