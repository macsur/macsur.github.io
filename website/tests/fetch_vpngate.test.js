'use strict';

/**
 * 回归测试：彩蛋节点生成器 fetch_vpngate.js 的选点与输出不变量。
 *
 * 为什么必须有这个测试：
 *   fetch_vpngate.js 在 CI 构建期（prebuild）会覆写 src/data/easterEggData.ts，
 *   提交到仓库里的该文件从不上线。历史上团队已两次栽在「只改数据文件、
 *   没改生成器」上（2026-10-09 / 2026-10-10 MUSE 留言板两次「彩蛋下架没生效」）。
 *   该生成器此前零测试覆盖，任何口径改动都只能靠线上肉眼发现。
 *
 *   本测试把选点逻辑与不变量固化成可回归的断言，锁死「9 项、ID 1..9 连续、
 *   无重复 ID」以及「离线兜底仍产出完整 9 项」。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const GENERATOR_PATH = path.join(PROJECT_ROOT, 'fetch_vpngate.js');
const HOMEPAGE_PATH = path.join(PROJECT_ROOT, 'src/app/page.tsx');
const {
  FIXED_LINKS,
  FALLBACK_NODES,
  VPN_PICK_COUNT,
  parseVpnGateCsv,
  pickVpnNodes,
  applyFallbackNodes,
  buildVpnItems,
  formatNodeLabel,
  validateEasterEggItems,
  buildEasterEggFile,
  isValidIpv4,
} = require(GENERATOR_PATH);

const HEADER =
  '#HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64';

function csvRow(ip, countryLong, countryShort, sessions) {
  return `node-${ip},${ip},1,10,100,${countryLong},${countryShort},${sessions},1000,10,10,2weeks,op,,config`;
}

/** 组装一份可控的 VPNGate CSV 文本。 */
function buildCsv(rows, { withHeader = true } = {}) {
  const head = withHeader ? `*vpn_servers\n${HEADER}\n` : '';
  return head + rows.map((r) => (Array.isArray(r) ? r.join(',') : r)).join('\n') + '\n';
}

const RICH_CSV = buildCsv([
  csvRow('10.0.0.1', 'United States', 'US', 40),
  csvRow('10.0.0.2', 'United States', 'US', 5),
  csvRow('10.0.0.3', 'United States', 'US', 99),
  csvRow('10.0.0.4', 'Japan', 'JP', 50),
  csvRow('10.0.0.5', 'Japan', 'JP', 1),
  csvRow('10.0.0.6', 'Korea Republic of', 'KR', 0),
]);

test('parseVpnGateCsv 解析出全部合法节点', () => {
  const nodes = parseVpnGateCsv(RICH_CSV);
  assert.equal(nodes.length, 6);
  assert.deepEqual(nodes[0], {
    ip: '10.0.0.1',
    countryLong: 'United States',
    countryShort: 'US',
    sessions: 40,
  });
});

test('parseVpnGateCsv 忽略非法 IP、注释行与缺表头输入', () => {
  const messy = buildCsv([
    csvRow('10.0.0.1', 'Japan', 'JP', 3),
    csvRow('not-an-ip', 'Japan', 'JP', 1),
    csvRow('999.1.1.1', 'Japan', 'JP', 1),
    csvRow('1.2.3.256', 'Japan', 'JP', 1),
  ]).replace(HEADER, `${HEADER}\n#comment,ignored,row`);
  const nodes = parseVpnGateCsv(messy);
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].ip, '10.0.0.1');

  assert.deepEqual(parseVpnGateCsv(''), []);
  assert.deepEqual(parseVpnGateCsv(null), []);
  assert.deepEqual(parseVpnGateCsv('no header here'), []);
});

test('isValidIpv4 拒绝越界段（999.1.1.1 这类旧实现会误放行）', () => {
  assert.equal(isValidIpv4('10.0.0.1'), true);
  assert.equal(isValidIpv4('0.0.0.0'), true);
  assert.equal(isValidIpv4('255.255.255.255'), true);
  assert.equal(isValidIpv4('999.1.1.1'), false);
  assert.equal(isValidIpv4('1.2.3.256'), false);
  assert.equal(isValidIpv4('1.2.3.4.5'), false);
  assert.equal(isValidIpv4('1.2.3'), false);
  assert.equal(isValidIpv4('1.2.3.0004'), false);
});

test('parseVpnGateCsv 对缺失的 sessions 字段回退到 999999', () => {
  const csv = buildCsv([['n', '10.0.0.9', '1', '10', '100', 'Japan', 'JP', '', '1', '1', '1', '2w', 'op', '', 'cfg']]);
  const nodes = parseVpnGateCsv(csv);
  assert.equal(nodes[0].sessions, 999999);
});

test('pickVpnNodes 优先 US，其余按 sessions 升序', () => {
  const picked = pickVpnNodes(parseVpnGateCsv(RICH_CSV));
  assert.equal(picked.length, VPN_PICK_COUNT);
  // US 节点按 sessions 升序取前 2 个（5 → 40）；第三个名额给 sessions 最少的
  // 非 US 节点（KR 0 sessions 优于 JP 1 session）。
  assert.deepEqual(picked.map(n => n.ip), ['10.0.0.2', '10.0.0.1', '10.0.0.6']);
});

test('pickVpnNodes 在 US 节点不足时用其他国别补足', () => {
  const csv = buildCsv([
    csvRow('10.0.0.1', 'United States', 'US', 7),
    csvRow('10.0.0.2', 'Japan', 'JP', 3),
    csvRow('10.0.0.3', 'Korea Republic of', 'KR', 1),
  ]);
  const picked = pickVpnNodes(parseVpnGateCsv(csv));
  assert.deepEqual(picked.map(n => n.ip), ['10.0.0.1', '10.0.0.3', '10.0.0.2']);
});

test('pickVpnNodes 节点不足时返回不足 3 个（交由兜底补齐）', () => {
  const csv = buildCsv([csvRow('10.0.0.1', 'Japan', 'JP', 3)]);
  const picked = pickVpnNodes(parseVpnGateCsv(csv));
  assert.equal(picked.length, 1);
});

test('applyFallbackNodes 兜底补足到 3 个且不重复已有 IP', () => {
  const existing = [{ ip: '73.231.88.34', countryLong: 'United States', countryShort: 'US', sessions: 1 }];
  const filled = applyFallbackNodes(existing);
  assert.equal(filled.length, VPN_PICK_COUNT);
  assert.equal(new Set(filled.map(n => n.ip)).size, VPN_PICK_COUNT);
  assert.equal(filled[0].ip, '73.231.88.34');
});

test('applyFallbackNodes 在完全为空时仍产出 3 个兜底节点', () => {
  const filled = applyFallbackNodes([]);
  assert.equal(filled.length, VPN_PICK_COUNT);
  assert.deepEqual(filled.map(n => n.ip), FALLBACK_NODES.map(n => n.ip));
});

test('buildVpnItems 生成的条目 id 从 7 开始且带国别标签', () => {
  const items = buildVpnItems(pickVpnNodes(parseVpnGateCsv(RICH_CSV)));
  assert.equal(items.length, VPN_PICK_COUNT);
  assert.deepEqual(items.map(i => i.id), [7, 8, 9]);
  assert.equal(items[0].text, '10.0.0.2');
  assert.equal(items[0].isReal, true);
  assert.equal(items[0].url, null);
  assert.match(items[0].label, /^\[US\]/);
  assert.match(items[0].label, /OpenVPN/);
  assert.match(items[0].label, /抓取时 \d+ 会话）/);
});

test('formatNodeLabel 只标 OpenVPN，且不出现 L2TP/IPsec 伪断言', () => {
  const label = formatNodeLabel({ countryShort: 'US', sessions: 12 });
  assert.ok(!label.includes('L2TP'), '标签不得声称 L2TP');
  assert.ok(!label.includes('IPsec'), '标签不得声称 IPsec');
  assert.match(label, /OpenVPN/);
});

test('formatNodeLabel 用「抓取时」表述会话数，不声称实时', () => {
  const label = formatNodeLabel({ countryShort: 'TH', sessions: 0 });
  assert.ok(!label.includes('实时'), '会话数是抓取时刻快照，标签不得声称实时');
  assert.match(label, /抓取时 0 会话/);
});

test('formatNodeLabel 国别取自 CountryShort，无国别时不编造', () => {
  assert.match(formatNodeLabel({ countryShort: 'JP', sessions: 3 }), /^\[JP\]/);
  const noCountry = formatNodeLabel({ countryShort: '', sessions: 3 });
  assert.ok(!noCountry.startsWith('[]'), '空国别不得渲染成空括号');
  assert.match(noCountry, /OpenVPN/);
});

test('validateEasterEggItems 通过 9 项、ID 连续、无重复', () => {
  const items = [...FIXED_LINKS, ...buildVpnItems(applyFallbackNodes([]))];
  assert.equal(items.length, 9);
  const validated = validateEasterEggItems(items);
  assert.equal(validated.length, 9);
  assert.deepEqual(validated.map(i => i.id), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(new Set(validated.map(i => i.id)).size, 9);
});

test('validateEasterEggItems 拒绝重复 ID', () => {
  const items = [...FIXED_LINKS, ...buildVpnItems(applyFallbackNodes([]))];
  const dup = items.map((item, idx) => (idx === 8 ? { ...item, id: 7 } : item));
  assert.throws(() => validateEasterEggItems(dup), /重复 ID/);
});

test('validateEasterEggItems 拒绝不连续的 ID', () => {
  const items = [...FIXED_LINKS, ...buildVpnItems(applyFallbackNodes([]))];
  const gap = items.map((item, idx) => (idx === 8 ? { ...item, id: 10 } : item));
  assert.throws(() => validateEasterEggItems(gap), /ID 不连续/);
});

test('buildEasterEggFile 产出可被 TypeScript 解析的完整文件', () => {
  const items = validateEasterEggItems([...FIXED_LINKS, ...buildVpnItems(applyFallbackNodes([]))]);
  const content = buildEasterEggFile(items);
  assert.match(content, /export const EASTER_EGG_ITEMS: EasterEggItem\[\] = \[/);
  assert.match(content, /export interface EasterEggItem/);
  // 产出的数组必须是合法 JSON（TS 里的字面量）
  const jsonStart = content.indexOf('= [') + 2;
  const jsonEnd = content.lastIndexOf('];') + 1;
  const parsed = JSON.parse(content.slice(jsonStart, jsonEnd));
  assert.equal(parsed.length, 9);
});

/**
 * 取出首页「彩蛋弹窗」区块的源码。
 * 彩蛋弹窗由 {showEasterEgg && ( 开头、以好友链接弹窗 {showFriendLinks && ( 结尾，
 * 只在这个区间里做文案断言，避免把无关区块的「实时精选」误伤进来。
 */
function getEasterEggModalSource() {
  const homepage = fs.readFileSync(HOMEPAGE_PATH, 'utf8');
  const start = homepage.indexOf('{showEasterEgg && (');
  const end = homepage.indexOf('{showFriendLinks && (');
  assert.ok(start !== -1, '首页应存在彩蛋弹窗区块');
  assert.ok(end !== -1 && end > start, '首页应存在好友链接弹窗区块且位于彩蛋弹窗之后');
  return homepage.slice(start, end);
}

test('彩蛋文案不含 L2TP/IPsec 伪断言（生成器 + 首页 + 数据文件三处）', () => {
  // 验收标准 1/2/3：L2TP/IPsec 断言在整个彩蛋链路上都必须消失。
  // 生成器与数据文件是构建期产物，首页是唯一手写文案出口，三处一起守住。
  const generator = fs.readFileSync(GENERATOR_PATH, 'utf8');
  const homepage = fs.readFileSync(HOMEPAGE_PATH, 'utf8');
  const dataFile = fs.readFileSync(path.join(PROJECT_ROOT, 'src/data/easterEggData.ts'), 'utf8');

  for (const [name, content] of [['fetch_vpngate.js', generator], ['page.tsx', homepage], ['easterEggData.ts', dataFile]]) {
    assert.ok(!content.includes('L2TP/IPsec'), `${name} 仍含 L2TP/IPsec 伪断言`);
    assert.ok(!content.includes('L2TP'), `${name} 仍含 L2TP 伪断言`);
  }
});

test('首页彩蛋文案不写死 [US]，也不声称节点是「实时」', () => {
  // 验收标准 2/3：实际节点国别可能是 US/TH/JP/...，写死单一国别会与数据矛盾；
  // 会话数是抓取快照，称「实时」同样是事实错误。
  const easterEggBlock = getEasterEggModalSource();
  assert.ok(!easterEggBlock.includes('[US]'), '首页彩蛋弹窗文案不得写死 [US]');
  assert.ok(!easterEggBlock.includes('实时精选'), '首页彩蛋弹窗文案不得称「实时精选」');
  assert.ok(!easterEggBlock.includes('L2TP'), '首页彩蛋弹窗文案不得出现 L2TP');
});

test('首页彩蛋文案改为按实际数据描述，不承诺具体国别', () => {
  const easterEggBlock = getEasterEggModalSource();
  assert.match(easterEggBlock, /3 个来自全球节点的 OpenVPN 节点/);
});

test('生成器源码声明了「构建期会覆写 easterEggData.ts」这一坑位', () => {
  const source = fs.readFileSync(GENERATOR_PATH, 'utf8');
  assert.match(source, /prebuild/);
  assert.match(source, /easterEggData\.ts/);
});
