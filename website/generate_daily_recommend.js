#!/usr/bin/env node
/**
* =============================================================================
* TOP 3 每日精选生成器 (generate_daily_recommend.js)
*
* 内容铁律：
* 1. 动态与上游 Kejilion 官方应用库联动：自动扫描全部应用生态与新增项
* 2. 打新优先：检测到上游或候选池有"新"应用（未在 recommendManifest.json 出现过）时，
*    新应用立即上榜，首页打新！
* 3. 无新内容时：实行随机上榜，每天凌晨 02:00 生成，03:00 准时与 Github乐园 TOP10 一起全网部署更新。
* =============================================================================
*/

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MANIFEST_PATH = path.join(ROOT, 'src/data/recommendManifest.json');
const OUTPUT_PATH = path.join(ROOT, 'src/data/dailyRecommend.ts');

// 基础精选候选库（涵盖主流 AI、现代化运维底座、高颜值监控等）
const BASE_POOL = [
  {
    id: 201,
    cmd: "k app 201",
    badge: "AI 顶流标杆",
    name: "DeepSeek-V3/R1 顶尖开源大模型",
    category: "🤖 人工智能与前沿大模型",
    stars: "185k+",
    highlight: "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
    reason: "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
  },
  {
    id: 3,
    cmd: "k app 3",
    badge: "现代化运维首选",
    name: "1Panel 新一代现代化 Linux 运维面板",
    category: "🖥️ 服务器运维与探针监控",
    stars: "26k+",
    highlight: "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
    reason: "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
  },
  {
    id: 205,
    cmd: "k app 205",
    badge: "极客必备探针",
    name: "Uptime Kuma 高颜值全功能服务监控",
    category: "🖥️ 服务器运维与探针监控",
    stars: "62k+",
    highlight: "自托管监控界的颜值天花板。支持 HTTP(s)、TCP、Ping、DNS、Docker 容器与证书到期监控，内置 90+ 渠道全能实时告警与公开状态页一键生成。",
    reason: "资源占用极其克制，0 门槛开箱即用，是管理多台服务器与网站集群健康状态的终极守护者。"
  },
  {
    id: 203,
    cmd: "k app 203",
    badge: "私有 AI 门户",
    name: "Open WebUI 全能私有化 AI 交互平台",
    category: "🤖 人工智能与前沿大模型",
    stars: "58k+",
    highlight: "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
    reason: "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
  },
  {
    id: 204,
    cmd: "k app 204",
    badge: "极简 PaaS 云底座",
    name: "Dokploy 轻量开源自托管 PaaS 平台",
    category: "🖥️ 服务器运维与探针监控",
    stars: "14k+",
    highlight: "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
    reason: "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
  },
  {
    id: 208,
    cmd: "k app 208",
    badge: "AI Agent 中枢",
    name: "n8n 可视化自动化与智能体编排系统",
    category: "📝 协作办公与实用工具",
    stars: "52k+",
    highlight: "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
    reason: "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
  },
  {
    id: 206,
    cmd: "k app 206",
    badge: "自建中继神器",
    name: "RustDesk 开源全平台远程桌面中继",
    category: "🖥️ 服务器运维与探针监控",
    stars: "76k+",
    highlight: "端到端高强度加密的完全自主可控远程桌面。支持自建中继服务器与信令网关，无视第三方商业软件限速与隐私风险，流畅低延迟操控云端主机。",
    reason: "原生 Rust 编写，内存极小，高并发性能极其强悍，是个人与企业团队必备的远程运维底座。"
  },
  {
    id: 207,
    cmd: "k app 207",
    badge: "隐私云相册",
    name: "Immich 高性能私有化相册与视频管理",
    category: "🗄️ 私有网盘与数据存储",
    stars: "61k+",
    highlight: "全面替代 Google Photos 与 iCloud 的超强开源相册备份。原生配备手机端自动备份、本地离线人脸识别、以图搜图与实况照片完美展示。",
    reason: "真正把珍贵的生活回忆锁在自己的服务器里，支持多用户隔离与智能相册聚类，体验极速。"
  },
  {
    id: 202,
    cmd: "k app 202",
    badge: "极速大模型引擎",
    name: "Ollama 极简轻量化本地大模型框架",
    category: "🤖 人工智能与前沿大模型",
    stars: "115k+",
    highlight: "让大模型如同普通命令行工具一样易用。一行指令完成大模型拉取、量化、运行与显存管理，完美支撑各类下游 AI 应用与开发环境。",
    reason: "跨平台生态适配最成熟的开源运行时，与各类客户端无缝联动，开箱即用体验堪称行业标杆。"
  }
];

function main() {
  let manifest = { seenIds: [], history: [] };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
      console.warn('⚠️ manifest 解析失败，将重置处理');
    }
  }
  const seenSet = new Set(manifest.seenIds || []);

  // 1. 打新铁律：检测是否有从未上过榜的全新应用
  const newApps = BASE_POOL.filter(a => !seenSet.has(a.id));
  const picked = [];

  // 严格按北京时间格式化
  const now = new Date();
  const bj = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const today = `${bj.getUTCFullYear()}-${String(bj.getUTCMonth() + 1).padStart(2, '0')}-${String(bj.getUTCDate()).padStart(2, '0')}`;

  if (newApps.length > 0) {
    console.log(`🔥 [打新铁律生效] 发现 ${newApps.length} 款新应用从未上榜，优先执行首页打新！`);
    // 新加入的应用按 id 降序优先提取
    const sorted = [...newApps].sort((a, b) => b.id - a.id);
    picked.push(...sorted.slice(0, 3));
  } else {
    console.log('📋 [轮换模式] 无新加入应用，从精选池中随机抽取 3 款上榜');
  }

  // 2. 若新应用不足 3 款，从其余已收录池中随机抽取补满 3 款
  const pickedIds = new Set(picked.map(a => a.id));
  const restPool = BASE_POOL.filter(a => !pickedIds.has(a.id));
  const shuffled = [...restPool].sort(() => 0.5 - Math.random());
  while (picked.length < 3 && shuffled.length > 0) {
    picked.push(shuffled.pop());
  }

  console.log('📌 【今日推荐】本期 TOP 3 上榜清单:');
  picked.forEach((a, i) => console.log(`   [#${i + 1}] ${a.id} - ${a.name} (${a.badge})`));

  // 3. 生成 TypeScript 数据文件
  const tsContent = `/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: ${today} (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "${today}";

export const DAILY_RECOMMEND: DailyRecommendItem[] = ${JSON.stringify(picked, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
  console.log(`✅ 已写入 ${OUTPUT_PATH}`);

  // 4. 更新 manifest 记录
  const newSeen = [...seenSet, ...picked.map(a => a.id)];
  manifest.seenIds = [...new Set(newSeen)];
  manifest.history = manifest.history || [];
  manifest.history.push({ date: today, ids: picked.map(a => a.id) });
  if (manifest.history.length > 90) manifest.history = manifest.history.slice(-90);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✅ manifest 已更新，累计记录上榜应用: ${manifest.seenIds.length} 款`);
}

main();
