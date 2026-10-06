#!/usr/bin/env node
/**
* =============================================================================
* TOP 3 每日精选生成器 (generate_daily_recommend.js)
*
* 核心逻辑升级：
* 1. 动态读取 BUILTIN_APPS 中 isStar 且具备完整 rec 配置的应用作为候选池
* 2. 打新优先：检测到候选池中有从未上过榜的新应用 (未在 recommendManifest.json 出现过)，
*    新应用按 id 降序最多选 3 款立即上榜打新！
* 3. 补位轮换：若打新不足 3 款，基于北京时间相对 2026-01-01 的天数 dayIndex 进行轮转：
*    (dayIndex * 3) % POOL.length 为起点顺次取满 3 款，彻底根除随机性，确保同一天幂等且无 7 天内重复。
* =============================================================================
*/

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MANIFEST_PATH = path.join(ROOT, 'src/data/recommendManifest.json');
const OUTPUT_PATH = path.join(ROOT, 'src/data/dailyRecommend.ts');
const APPS_DATA_PATH = path.join(ROOT, 'src/data/appsData.ts');

function loadAppsAndCategories() {
  const content = fs.readFileSync(APPS_DATA_PATH, 'utf8');

  // 解析 CATEGORIES
  const catMatch = content.match(/export const CATEGORIES: Category\[\] = (\[[\s\S]*?\]);/);
  const categories = catMatch ? eval(catMatch[1]) : [];
  const catMap = {};
  categories.forEach(c => {
    catMap[c.id] = c.name;
  });

  // 解析 BUILTIN_APPS
  const appsMatch = content.match(/export const BUILTIN_APPS: AppItem\[\] = (\[[\s\S]*?\]);/);
  const apps = appsMatch ? eval(appsMatch[1]) : [];

  return { apps, catMap };
}

function main() {
  const { apps, catMap } = loadAppsAndCategories();

  // 1. 筛选候选池：isStar 为 true 且具备完整的 rec 配置，按数字 id 升序确定性排序
  const pool = apps
    .filter(a => a.isStar && a.rec && a.rec.highlight && a.rec.reason)
    .sort((a, b) => Number(a.id) - Number(b.id));

  console.log(`🔍 成功加载 ${pool.length} 款推荐候选应用池 (按 id 升序对齐)`);

  let manifest = { seenIds: [], history: [] };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch (e) {
      console.warn('⚠️ manifest 解析失败，将重置处理');
    }
  }

  // 统一转为 string 进行比对，避免 number/string 类型漂移
  const seenSet = new Set((manifest.seenIds || []).map(id => String(id)));

  // 北京时间日期计算
  const now = new Date();
  const bjTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const year = bjTime.getUTCFullYear();
  const month = String(bjTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(bjTime.getUTCDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  // 计算北京时间距离 2026-01-01 的天数 dayIndex
  const baseEpoch = Date.UTC(2026, 0, 1);
  const currentEpoch = Date.UTC(year, bjTime.getUTCMonth(), bjTime.getUTCDate());
  const dayIndex = Math.max(0, Math.floor((currentEpoch - baseEpoch) / (24 * 60 * 60 * 1000)));

  const picked = [];

  // 2. 打新机制：查找未在 seenSet 中的全新应用，按 id 降序最多取 3 个
  const unseenApps = pool.filter(a => !seenSet.has(String(a.id)));
  if (unseenApps.length > 0) {
    const sortedUnseen = [...unseenApps].sort((a, b) => Number(b.id) - Number(a.id));
    const newPicks = sortedUnseen.slice(0, 3);
    picked.push(...newPicks);
    console.log(`🔥 [打新铁律生效] 发现 ${unseenApps.length} 款新应用从未上榜，打新上榜 ${newPicks.length} 款！`);
  }

  // 3. 补位轮换：若打新不足 3 款，根据 (dayIndex * 3) % pool.length 确定性轮转取足 3 款
  if (picked.length < 3 && pool.length > 0) {
    const pickedIds = new Set(picked.map(a => String(a.id)));
    const startIndex = (dayIndex * 3) % pool.length;

    for (let offset = 0; offset < pool.length && picked.length < 3; offset++) {
      const idx = (startIndex + offset) % pool.length;
      const candidate = pool[idx];
      if (!pickedIds.has(String(candidate.id))) {
        picked.push(candidate);
        pickedIds.add(String(candidate.id));
      }
    }
  }

  // 4. 标准字段映射
  const formattedPicked = picked.map(app => ({
    id: Number(app.id),
    cmd: `k app ${app.id}`,
    badge: app.rec.badge,
    name: app.name,
    category: catMap[app.category] || "🖥️ 服务器运维与探针监控",
    stars: app.rec.stars,
    highlight: app.rec.highlight,
    reason: app.rec.reason
  }));

  console.log('📌 【今日推荐】本期 TOP 3 上榜清单:');
  formattedPicked.forEach((a, i) => console.log(`   [#${i + 1}] ${a.id} - ${a.name} (${a.badge}) [${a.category}]`));

  // 5. 生成 TypeScript 数据文件
  const tsContent = `/**
* 🌟 【今日推荐】顶级一键部署神作 TOP 3（由 generate_daily_recommend.js 动态生成）
* 生成时间: ${today} (北京时间)
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

export const DAILY_RECOMMEND_GENERATED_AT = "${today}";

export const DAILY_RECOMMEND: DailyRecommendItem[] = ${JSON.stringify(formattedPicked, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
  console.log(`✅ 已写入 ${OUTPUT_PATH}`);

  // 6. 更新 manifest 记录
  const newSeen = [...seenSet, ...formattedPicked.map(a => String(a.id))];
  manifest.seenIds = [...new Set(newSeen)].map(Number);
  manifest.history = manifest.history || [];
  manifest.history.push({ date: today, ids: formattedPicked.map(a => a.id) });
  if (manifest.history.length > 90) manifest.history = manifest.history.slice(-90);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✅ manifest 已更新，累计记录上榜应用: ${manifest.seenIds.length} 款`);
}

main();
