#!/usr/bin/env node
/**
 * =============================================================================
 * 自动抓取 VPNGate 节点并更新彩蛋数据 (fetch_vpngate.js)
 *
 * 规则：
 * 1. 抓取 https://www.vpngate.net/api/iphone/ (VPNGate 官方实时节点列表)
 * 2. 优先 [United States] (US) 节点，其余按当前会话数 (sessions) 升序取最少
 * 3. 严格提取 3 个节点
 * 4. 与 6 个固定友情链接融合生成彩蛋数据，写入 website/src/data/easterEggData.ts
 *
 * 重要：本文件在 CI 构建期（prebuild）会被执行并覆写 src/data/easterEggData.ts。
 * 任何展示口径的改动必须同时改这里，否则会被构建期重新刷回。
 *
 * 本文件的解析/选取/组装逻辑拆成纯函数导出，便于回归测试；
 * 展示文案（协议标签、sessions 措辞）由 buildEasterEggFile 控制。
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_PATH = path.resolve(__dirname, 'src/data/easterEggData.ts');

const VPN_PICK_COUNT = 3;
const IPV4_PATTERN = /^\d+\.\d+\.\d+\.\d+$/;

/**
 * 校验是否为合法的 IPv4 点分十进制地址。
 * 旧实现只用 /\d+\.\d+\.\d+\.\d+$ 匹配，会把 999.1.1.1 这类越界地址
 * 当成合法节点发布到彩蛋里；这里补上每段 0-255 的范围校验。
 */
function isValidIpv4(ip) {
  if (typeof ip !== 'string' || !IPV4_PATTERN.test(ip)) return false;
  return ip.split('.').every(part => {
    if (part.length > 3) return false;
    const value = Number(part);
    return Number.isInteger(value) && value >= 0 && value <= 255;
  });
}

const FIXED_LINKS = [
  { id: 1, text: 'z.sh', url: 'https://zttz.eu.org/z.sh', isReal: false, label: 'Z 命令入口 · z.sh', delay: '0.04s', floatDelay: '0s', color: 'from-cyan-500/20 to-blue-600/10', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
  { id: 2, text: 'apple.com', url: 'https://apple.com', isReal: false, label: '苹果官网 · apple.com', delay: '0.10s', floatDelay: '1.2s', color: 'from-violet-500/20 to-indigo-600/10', border: 'border-violet-500/40', glow: 'shadow-violet-500/20' },
  { id: 3, text: 'sina.com.cn', url: 'https://sina.com.cn', isReal: false, label: '新浪网 · sina.com.cn', delay: '0.16s', floatDelay: '0.6s', color: 'from-indigo-500/20 to-purple-600/10', border: 'border-indigo-500/40', glow: 'shadow-indigo-500/20' },
  { id: 4, text: 'zttz.eu.org', url: 'https://zttz.eu.org', isReal: false, label: 'Linux生态 · zttz.eu.org', delay: '0.22s', floatDelay: '1.8s', color: 'from-sky-500/20 to-cyan-600/10', border: 'border-sky-500/40', glow: 'shadow-sky-500/20' },
  { id: 5, text: 'bbs.pcbeta.com', url: 'https://bbs.pcbeta.com', isReal: false, label: '远景论坛 · bbs.pcbeta.com', delay: '0.28s', floatDelay: '0.9s', color: 'from-teal-500/20 to-emerald-600/10', border: 'border-teal-500/40', glow: 'shadow-teal-500/20' },
  { id: 6, text: 'feishu.cn', url: 'https://feishu.cn', isReal: false, label: '飞书 · feishu.cn', delay: '0.34s', floatDelay: '2.1s', color: 'from-blue-500/20 to-cyan-600/10', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
];

// 备用兜底节点：抓取不可达或节点不足时使用，保证彩蛋恒为 9 项。
const FALLBACK_NODES = [
  { ip: '73.231.88.34', countryLong: 'United States', countryShort: 'US', sessions: 8 },
  { ip: '136.85.57.165', countryLong: 'United States', countryShort: 'US', sessions: 30 },
  { ip: '27.130.34.23', countryLong: 'Thailand', countryShort: 'TH', sessions: 0 },
];

const VPN_DELAYS = ['0.40s', '0.46s', '0.52s'];
const VPN_FLOAT_DELAYS = ['1.5s', '0.3s', '2.4s'];
const VPN_COLORS = [
  'from-rose-500/25 to-red-600/10',
  'from-amber-500/25 to-orange-600/10',
  'from-emerald-500/25 to-teal-600/10'
];
const VPN_BORDERS = [
  'border-rose-400/60',
  'border-amber-400/60',
  'border-emerald-400/60'
];
const VPN_GLOWS = [
  'shadow-rose-500/30',
  'shadow-amber-500/30',
  'shadow-emerald-500/30'
];

/**
 * 解析 VPNGate CSV 文本为节点数组。
 * 容忍表头前后的注释行与 '*' 开头的行，忽略字段缺失或非法 IP 的行。
 */
function parseVpnGateCsv(raw) {
  if (typeof raw !== 'string' || !raw.includes('#HostName')) return [];

  const lines = raw.split(/\r?\n/);
  const headerLineIdx = lines.findIndex(l => l.startsWith('#HostName'));
  if (headerLineIdx === -1) return [];

  const headers = lines[headerLineIdx].replace('#', '').split(',');
  const ipIdx = headers.indexOf('IP');
  const countryLongIdx = headers.indexOf('CountryLong');
  const countryShortIdx = headers.indexOf('CountryShort');
  const sessionsIdx = headers.indexOf('NumVpnSessions');
  if (ipIdx === -1 || countryLongIdx === -1 || countryShortIdx === -1 || sessionsIdx === -1) {
    return [];
  }

  const nodes = [];
  for (let i = headerLineIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('*')) continue;
    const cols = line.split(',');
    const ip = cols[ipIdx];
    if (!isValidIpv4(ip)) continue;
    const sessions = parseInt(cols[sessionsIdx] || '999999', 10);
    nodes.push({
      ip,
      countryLong: cols[countryLongIdx] || '',
      countryShort: (cols[countryShortIdx] || '').toUpperCase(),
      sessions: Number.isFinite(sessions) ? sessions : 999999,
    });
  }
  return nodes;
}

/**
 * 选点规则：优先 US（最多 2 个），其余按 sessions 升序补足到 3 个。
 * 排序稳定：sessions 相同时保持 CSV 中的原始出现顺序。
 */
function pickVpnNodes(allNodes, pickCount = VPN_PICK_COUNT) {
  const bySessions = (a, b) => a.sessions - b.sessions;
  const usNodes = allNodes.filter(n => n.countryShort === 'US').sort(bySessions);
  const otherNodes = allNodes.filter(n => n.countryShort !== 'US').sort(bySessions);

  const picked = [];
  for (const node of usNodes) {
    picked.push(node);
    if (picked.length >= 2) break;
  }
  for (const node of otherNodes) {
    if (picked.length >= pickCount) break;
    picked.push(node);
  }
  return picked;
}

/** 选点不足时用固定兜底节点补齐，且不重复已有 IP。 */
function applyFallbackNodes(vpnNodes, pickCount = VPN_PICK_COUNT) {
  const picked = [...vpnNodes];
  for (const fallback of FALLBACK_NODES) {
    if (picked.length >= pickCount) break;
    if (!picked.find(n => n.ip === fallback.ip)) picked.push(fallback);
  }
  return picked;
}

/** 把节点组装成彩蛋条目（id 从 7 开始，接在 6 个固定友链之后）。 */
function buildVpnItems(vpnNodes) {
  return vpnNodes.map((node, idx) => ({
    id: FIXED_LINKS.length + 1 + idx,
    text: node.ip,
    url: null,
    isReal: true,
    label: `[${node.countryShort}] L2TP/IPsec 节点 (${node.sessions} Sessions)`,
    delay: VPN_DELAYS[idx],
    floatDelay: VPN_FLOAT_DELAYS[idx],
    color: VPN_COLORS[idx],
    border: VPN_BORDERS[idx],
    glow: VPN_GLOWS[idx],
  }));
}

/** 校验彩蛋数据不变量：ID 唯一且 1..N 连续，字段齐备。 */
function validateEasterEggItems(items) {
  const ids = items.map(item => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`彩蛋数据存在重复 ID: ${ids.join(', ')}`);
  }
  items.forEach((item, index) => {
    if (item.id !== index + 1) {
      throw new Error(`彩蛋数据 ID 不连续，期望 ${index + 1}，实际 ${item.id}`);
    }
  });
  return items;
}

/** 生成 src/data/easterEggData.ts 的完整文件内容。 */
function buildEasterEggFile(items) {
  return `/**
 * 🌟 ✦ 量子礼花 · 猜你喜欢 ✦ 彩蛋专属数据
 * 包含：6 个固定精选友情链接 + 3 个来自 VPNGate 严格筛选的 L2TP/IPsec 优质节点
 */

export interface EasterEggItem {
  id: number;
  text: string;
  url: string | null;
  isReal: boolean;
  label: string;
  delay: string;
  floatDelay: string;
  color: string;
  border: string;
  glow: string;
}

export const EASTER_EGG_ITEMS: EasterEggItem[] = ${JSON.stringify(items, null, 2)};
`;
}

function fetchVpnGate() {
  return new Promise((resolve) => {
    https.get('https://www.vpngate.net/api/iphone/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 12000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(null));
  });
}

async function main() {
  console.log('🌐 正在从 VPNGate 官方获取实时节点列表...');
  const raw = await fetchVpnGate();

  const allNodes = parseVpnGateCsv(raw);
  let vpnNodes = pickVpnNodes(allNodes);

  if (vpnNodes.length < VPN_PICK_COUNT) {
    console.warn('⚠️ 实时拉取节点较少，使用精选稳定节点兜底补足...');
    vpnNodes = applyFallbackNodes(vpnNodes);
  }

  console.log(`✅ 成功锁定 ${vpnNodes.length} 款节点：`);
  vpnNodes.forEach((n, idx) => {
    console.log(`   [${idx + 1}] IP: ${n.ip} | 地区: [${n.countryShort}] ${n.countryLong} | 当前会话数: ${n.sessions}`);
  });

  const fullItems = validateEasterEggItems([...FIXED_LINKS, ...buildVpnItems(vpnNodes)]);
  fs.writeFileSync(OUTPUT_PATH, buildEasterEggFile(fullItems), 'utf8');
  console.log(`🎉 成功更新彩蛋数据至: ${OUTPUT_PATH}`);
}

module.exports = {
  FIXED_LINKS,
  FALLBACK_NODES,
  VPN_PICK_COUNT,
  isValidIpv4,
  parseVpnGateCsv,
  pickVpnNodes,
  applyFallbackNodes,
  buildVpnItems,
  validateEasterEggItems,
  buildEasterEggFile,
};

if (require.main === module) {
  main().catch(console.error);
}
