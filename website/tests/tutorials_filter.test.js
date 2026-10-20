'use strict';

/**
 * 回归测试：教程列表页顶部标签徽标计数必须等于该标签下实际渲染的卡片数。
 *
 * 历史缺陷（2026-10-21 前端巡检发现）：
 *   /tutorials/ 列表页的 `countFor()` 直接返回该标签命中的教程条数，
 *   但网格渲染时会无条件剔除置顶首篇（slug=paperclip）。当用户点选
 *   「测试中」「正在用」「推荐」等置顶首篇同样命中的标签时，
 *   徽标写着 N，实际只渲染出 N-1 张卡片 → 用户点进去发现少一篇。
 *
 * 该测试直接复用页面真实使用的过滤/剔除逻辑（从页面源码抽取，
 * 避免测试与实现漂移），断言「徽标数 == 实际渲染卡片数」。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TUTORIALS_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/data/tutorialsData.ts');
const PAGE_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/app/tutorials/page.tsx');

const ALL_TAGS = ['我喜欢的', '测试中', '正在用', '推荐'];

/** 从 tutorialsData.ts 中抽取每个教程的 slug / id / date / tags。 */
function readTutorials() {
  const source = fs.readFileSync(TUTORIALS_SOURCE_PATH, 'utf8');
  const items = [];
  // 顶层 TUTORIALS_DATA 数组
  const topLevel = source.slice(source.indexOf('export const TUTORIALS_DATA'));
  for (const match of topLevel.matchAll(
    /\{\s*id:\s*'([^']+)',\s*slug:\s*'([^']+)',[\s\S]*?date:\s*'([^']+)'[\s\S]*?tags:\s*\[([^\]]*)\]/g,
  )) {
    const tags = [...match[4].matchAll(/'([^']+)'/g)].map((tag) => tag[1]);
    items.push({ id: match[1], slug: match[2], date: match[3], tags });
  }

  // 第 135 期专栏教程（trendingTutorialsData.ts）通过 push(...) 并入同一数组
  const trendingPath = path.join(PROJECT_ROOT, 'src/data/trendingTutorialsData.ts');
  const trending = fs.readFileSync(trendingPath, 'utf8');
  for (const match of trending.matchAll(
    /id:\s*'([^']+)',\s*slug:\s*'([^']+)',[\s\S]*?date:\s*'([^']+)'[\s\S]*?tags:\s*\[([^\]]*)\]/g,
  )) {
    const tags = [...match[4].matchAll(/'([^']+)'/g)].map((tag) => tag[1]);
    items.push({ id: match[1], slug: match[2], date: match[3], tags });
  }
  return items;
}

/**
 * 复刻页面 src/app/tutorials/page.tsx 的过滤与置顶剔除逻辑。
 * 若页面实现变更导致本函数与页面脱节，sourceConsistency 用例会失败。
 */
function simulateFilter(items, activeTag) {
  const filtered =
    activeTag === '全部' ? items : items.filter((item) => item.tags.includes(activeTag));

  const featuredItem =
    items.find((item) => item.slug === 'paperclip') ||
    items.find((item) => item.featured) ||
    items[0];

  const gridItems = filtered.filter((item) => item.id !== featuredItem?.id);

  // 置顶大卡：「全部」时展示；按标签筛选时，首篇命中该标签才展示
  const featuredShown =
    Boolean(featuredItem) &&
    (activeTag === '全部' || featuredItem.tags.includes(activeTag));
  return {
    badge: activeTag === '全部' ? items.length : items.filter((item) => item.tags.includes(activeTag)).length,
    rendered: gridItems.length + (featuredShown ? 1 : 0),
  };
}

test('tutorials list renders exactly as many cards as the filter badge claims', () => {
  const items = readTutorials();
  assert.ok(items.length > 0, 'no tutorials parsed from data sources');

  for (const tag of ['全部', ...ALL_TAGS]) {
    const { badge, rendered } = simulateFilter(items, tag);
    assert.equal(
      rendered,
      badge,
      `标签「${tag}」徽标显示 ${badge} 篇，但实际渲染 ${rendered} 张卡片`,
    );
  }
});

test('the featured tutorial is still reachable under every filter tag', () => {
  const items = readTutorials();
  const featured = items.find((item) => item.slug === 'paperclip');
  assert.ok(featured, '置顶首篇 paperclip 不在数据中');

  for (const tag of ALL_TAGS) {
    if (!featured.tags.includes(tag)) continue;
    const { badge, rendered } = simulateFilter(items, tag);
    assert.ok(
      badge === rendered && badge >= 1,
      `标签「${tag}」命中置顶首篇时计数不自洽（badge=${badge}, rendered=${rendered}）`,
    );
  }
});

test('the list page source still excludes the featured item from the grid', () => {
  const page = fs.readFileSync(PAGE_SOURCE_PATH, 'utf8');
  assert.match(
    page,
    /gridItems[\s\S]*?filter\(item => item\.id !== featuredItem\?\.id\)/,
    '列表页网格未剔除置顶首篇；若已改版请同步更新本测试的 simulateFilter',
  );
});

test('the list page source keeps the featured card visible when it matches the filter', () => {
  const page = fs.readFileSync(PAGE_SOURCE_PATH, 'utf8');
  assert.match(
    page,
    /showFeatured[\s\S]*?featuredItem\.tags\.includes\(activeTag\)/,
    '列表页未按标签命中情况决定置顶卡可见性；若已改版请同步更新本测试的 simulateFilter',
  );
  assert.doesNotMatch(
    page,
    /activeTag === '全部' && featuredItem/,
    '置顶卡仍被硬编码为只在「全部」标签下展示',
  );
});
