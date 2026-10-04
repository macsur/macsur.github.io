#!/usr/bin/env node
/**
* =============================================================================
* TOP 3 每日精选生成器 (generate_daily_recommend.js)
*
* 内容铁律：
* 1. 打新优先：候选池中有"新"应用（未在 recommendManifest.json 中出现过的 ID）
* 时，新应用立即上榜，首页打新！
* 2. 无新内容时：从已有内容中随机抽取 3 款上榜。
* 3. 每日构建时运行一次，生成 website/src/data/dailyRecommend.ts，
* 与TOP10 一起部署。
*
* 用法：node generate_daily_recommend.js
* =============================================================================
*/

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MANIFEST_PATH = path.join(ROOT, 'src/data/recommendManifest.json');
const OUTPUT_PATH = path.join(ROOT, 'src/data/dailyRecommend.ts');

// ---------------------------------------------------------------------------
// 候选池：新增应用追加到此数组即可。
// 新增应用只要 id 未在 manifest 中出现过，就会被识别为"新内容"优先上榜。
// ---------------------------------------------------------------------------
const pool = [
{
id: 201,
cmd: "k app 201",
badge: "AI 顶流标杆",
name: "DeepSeek-V3/R1 顶尖开源大模型",
category: "🤖 人工智能与大模型",
stars: "185k+",
highlight: "全球瞩目的划时代开源大语言模型与超强推理架构。一键完成模型权重加载、量化适配与本地高并发 API 暴露，零门槛打造企业级私有化 AI 引擎。",
reason: "实测在纯 CPU 或消费级 GPU 上均展现出超越同级参数的惊人推理表现，数学与代码生成能力直逼顶级专有模型。"
},
{
id: 3,
cmd: "k app 3",
badge: "现代化运维首选",
name: "1Panel 新一代现代化 Linux 运维面板",
category: "🖥️ 服务器运维与面板",
stars: "26k+",
highlight: "开源、轻量且深度拥抱 Docker 容器化理念的现代化运维神器。界面遵循极简几何美学，内置精选应用市场、自动化证书签发、容器生命周期监控与一键容灾备份。",
reason: "彻底摆脱传统面板对系统环境的高侵入性污染，所有服务均在独立沙箱中优雅运行，安全稳定。"
},
{
id: 205,
cmd: "k app 205",
badge: "极客必备探针",
name: "Uptime Kuma 高颜值全功能服务监控",
category: "📊 探针监控与运维告警",
stars: "62k+",
highlight: "自托管监控界的颜值天花板。支持 HTTP(s)、TCP、Ping、DNS、Docker 容器与证书到期监控，内置 90+ 渠道全能实时告警与公开状态页一键生成。",
reason: "资源占用极其克制，0 门槛开箱即用，是管理多台服务器与网站集群健康状态的终极守护者。"
},
{
id: 203,
cmd: "k app 203",
badge: "私有 AI 门户",
name: "Open WebUI 全能私有化 AI 交互平台",
category: "🤖 人工智能与大模型",
stars: "58k+",
highlight: "对标顶级商业产品的自托管 AI 工作台。完美兼容 Ollama 与各类 OpenAI 格式接口，原生集成 RAG 知识库检索增强、语音输入输出与多用户权限管理。",
reason: "交互体验丝滑细腻，能够将孤立的模型权重秒变人人可用的团队 AI 生产力资产。"
},
{
id: 204,
cmd: "k app 204",
badge: "极简 PaaS 云底座",
name: "Dokploy 轻量开源自托管 PaaS 平台",
category: "🖥️ 服务器运维与面板",
stars: "14k+",
highlight: "被誉为开源自建版 Heroku / Vercel。直接连接 GitHub 仓库自动 CI/CD 构建，原生支持数据库集群、自动 SSL 与 Docker Compose 编排发布。",
reason: "让个人开发者拥有一整套属于自己的微型云服务商体验，告别昂贵的第三方托管费用。"
},
{
id: 208,
cmd: "k app 208",
badge: "AI Agent 中枢",
name: "n8n 可视化自动化与智能体编排系统",
category: "🛠️ 远程工具与实用套件",
stars: "52k+",
highlight: "全球领先的开源工作流自动化平台。支持数百种外部应用打通，内置强大的 LangChain 智能体节点，零代码/低代码实现复杂业务流程自动化。",
reason: "把重复繁琐的人工日常自动化，甚至能作为个人数字分身 24 小时监控并处理数据。"
}
];

// ---------------------------------------------------------------------------
// 主逻辑
// ---------------------------------------------------------------------------
function main() {
// 读取 manifest（记录历史已上榜 ID）
let manifest = { seenIds: [], history: []};
if (fs.existsSync(MANIFEST_PATH)) {
try {
manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
} catch (e) {
console.warn('⚠️ manifest 解析失败，将视为首次运行');
}
}
const seenSet = new Set(manifest.seenIds || []);

// 打新：找出从未上榜过的应用
const newApps = pool.filter(a =>!seenSet.has(a.id));

const picked = [];
const today = new Date().toISOString().slice(0, 10);

if (newApps.length > 0) {
console.log(`🆕 发现 ${newApps.length} 款新内容，执行优先上榜！`);
// 新应用按 id 倒序（一般 id 越大越新）取前 3
const sorted = [...newApps].sort((a, b) => b.id - a.id);
picked.push(...sorted.slice(0, 3));
} else {
console.log('📋 无新内容，从已有内容中随机抽取');
}

// 补足 3 款：从剩余应用中随机抽取（排除已选）
const pickedIds = new Set(picked.map(a => a.id));
const restPool = pool.filter(a =>!pickedIds.has(a.id));
const shuffled = [...restPool].sort(() => 0.5 - Math.random());
while (picked.length < 3 && shuffled.length > 0) {
picked.push(shuffled.pop());
}

console.log('📌 本期上榜:', picked.map(a => `${a.id}:${a.name}`).join(' | '));

// 生成 TS 数据文件
const tsContent = `/**
* 🌟 TOP 3 每日精选数据（构建时自动生成，请勿手工修改）
* 生成时间: ${today}
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

export const DAILY_RECOMMEND_GENERATED_AT = "${today}";

export const DAILY_RECOMMEND: DailyRecommendItem[] = ${JSON.stringify(picked, null, 2)};
`;
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true});
fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
console.log(`✅ 已生成 ${OUTPUT_PATH}`);

// 更新 manifest
const newSeen = [...seenSet,...picked.map(a => a.id)];
manifest.seenIds = [...new Set(newSeen)];
manifest.history = manifest.history || [];
manifest.history.push({ date: today, ids: picked.map(a => a.id)});
// 只保留最近 90 天历史
if (manifest.history.length > 90) manifest.history = manifest.history.slice(-90);
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`✅ manifest 已更新，累计收录 ${manifest.seenIds.length} 款应用`);
}

main();
