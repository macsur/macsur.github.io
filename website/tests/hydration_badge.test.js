'use strict';

/**
 * 回归测试：首帧渲染不得依赖「当前时间」，否则静态站点会触发 React 水合不一致。
 *
 * 历史缺陷（2026-10-21 前端巡检发现）：
 *   本站是 `output: 'export'` 纯静态站点，HTML 在 CI 构建那一刻烤死。
 *   但「今日更新」徽标文案原先在 useMemo([]) 里直接读 `new Date()`：
 *   1) 构建那天烤进去的是「今日 05:03 已更新」，访客第二天打开同一份
 *      静态 HTML 时，客户端算出的是「10-04 15:20 已更新」→ **React
 *      水合不一致**（hydration mismatch）报错；
 *   2) 缓存副本会一直谎报「今日」，即使数据已经是前天的。
 *
 * 修复后首帧只输出**绝对时间**（与当前时间无关），水合完成后才在
 * useEffect 里升级为相对当前时间的说法。
 *
 * 本测试直接引用页面真实使用的徽标计算模块（src/lib/updateBadge.ts）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PAGE_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/app/page.tsx');
const UPDATE_BADGE_PATH = path.join(PROJECT_ROOT, 'src/lib/updateBadge.ts');
const BUILD_TIME_PATH = path.join(PROJECT_ROOT, 'src/lib/buildTime.ts');

const pageSource = fs.readFileSync(PAGE_SOURCE_PATH, 'utf8');

/** 用仓库自带 typescript 编译器把真实实现转译成 JS 后求值。 */
function loadModule(modulePath, extraModules = {}) {
  const ts = require('typescript');
  const source = fs.readFileSync(modulePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const module = { exports: {} };
  const localRequire = (request) => {
    if (request in extraModules) return extraModules[request];
    return require(request);
  };
  const factory = new Function('exports', 'module', 'require', transpiled);
  factory(module.exports, module, localRequire);
  return module.exports;
}

const { formatUpdateBadge, parseUpdateTimestamp } = loadModule(UPDATE_BADGE_PATH, {
  '../data/holidays': loadModule(path.join(PROJECT_ROOT, 'src/data/holidays.ts')),
});

const BAKED = '2026-10-21 05:03 (UTC+8)';

test('确定性模式（首帧）输出绝对时间，与当前时间无关', () => {
  // 首帧必须与「现在」无关：SSR 与客户端首帧才能逐字节一致
  const text = formatUpdateBadge(BAKED, { viewerDate: null });
  assert.equal(text, '10-21 05:03 已更新');
  assert.ok(
    !/今日|假日/.test(text),
    '首帧不得出现「今日/假日」这类相对当前时间的措辞',
  );
});

test('确定性模式的输出对任意访客时刻都完全相同（结构上不可能水合不一致）', () => {
  const first = formatUpdateBadge(BAKED, { viewerDate: null });
  // 不同构建时刻（模拟不同 CI 跑批）产出的首帧文本彼此独立
  const otherBuild = formatUpdateBadge('2026-11-09 18:44 (UTC+8)', { viewerDate: null });
  assert.notEqual(first, otherBuild);

  // 同一份构建产物，无论访客什么时候打开，首帧文本都一样
  const rehydrated = formatUpdateBadge(BAKED, { viewerDate: null });
  assert.equal(first, rehydrated);
});

test('实时模式：当天升级为「今日 HH:MM」，跨天回落为绝对时间（绝不谎报今日）', () => {
  const sameDay = formatUpdateBadge(BAKED, {
    viewerDate: new Date('2026-10-21T12:00:00+08:00'),
    isHoliday: false,
  });
  assert.equal(sameDay, '今日 05:03 已更新');

  const nextDay = formatUpdateBadge(BAKED, {
    viewerDate: new Date('2026-10-22T09:00:00+08:00'),
    isHoliday: false,
  });
  assert.equal(nextDay, '10-21 05:03 已更新');
  assert.ok(!/今日/.test(nextDay), '跨天时不得再谎报「今日」');
});

test('实时模式：法定节假日当天显示「假日」', () => {
  const holiday = formatUpdateBadge('2026-10-01 09:00 (UTC+8)', {
    viewerDate: new Date('2026-10-01T10:00:00+08:00'),
    isHoliday: true,
  });
  assert.equal(holiday, '假日 09:00 已更新');
});

test('首帧文本与水合后的实时文本不同——这正是必须延后到 useEffect 的原因', () => {
  const ssr = formatUpdateBadge(BAKED, { viewerDate: null });
  const client = formatUpdateBadge(BAKED, {
    viewerDate: new Date('2026-10-21T12:00:00+08:00'),
    isHoliday: false,
  });
  assert.notEqual(
    ssr,
    client,
    '首帧与水合后文本不同时，若在首帧就算「今日」就会水合报错——必须由 useEffect 升级',
  );
});

test('时间戳解析：格式非法时安全降级', () => {
  assert.equal(parseUpdateTimestamp('not-a-timestamp'), null);
  const parsed = parseUpdateTimestamp(BAKED);
  assert.deepEqual(parsed, {
    year: 2026,
    month: '10',
    day: '21',
    hour: '05',
    minute: '03',
  });
});

test('页面首帧不依赖当前时间：徽标走确定性模式，真实时间只在 useEffect 里取', () => {
  assert.ok(
    /formatUpdateBadge\(LAST_UPDATED_AT, \{/.test(pageSource),
    '页面必须用 formatUpdateBadge 统一计算徽标文案',
  );
  assert.ok(
    /useState<Date \| null>\(null\)/.test(pageSource),
    '访客时间初始必须是 null（确定性模式），首帧才可能与 SSR 一致',
  );
  assert.ok(
    /setViewerDate\(new Date\(\)\)/.test(pageSource),
    '真实时间只能在 useEffect（水合之后）里取',
  );
});

test('月度 Logo 首帧用构建期常量，不用 new Date()（避免跨月水合不一致）', () => {
  assert.ok(
    /getMonthlyLogoFilename\(BUILD_TIME\)/.test(pageSource),
    '月度 Logo 首帧必须用构建期常量 BUILD_TIME',
  );
  assert.ok(
    /suppressHydrationWarning/.test(pageSource),
    'Logo 的 src 需标注 suppressHydrationWarning（内联脚本会在水合前改写 src）',
  );
});

test('构建期时间锚点解析为北京时间绝对时刻', () => {
  const { parseBeijingTimestamp } = loadModule(BUILD_TIME_PATH, {
    '../data/trendingData': { LAST_UPDATED_AT: BAKED },
  });
  const parsed = parseBeijingTimestamp(BAKED);
  assert.equal(parsed.toISOString(), '2026-10-20T21:03:00.000Z');
});
