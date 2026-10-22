'use strict';

/**
 * 回归测试：「已复制」反馈必须按**按钮身份**点亮，不能按剪贴板内容点亮。
 *
 * 历史缺陷（2026-10-21 前端巡检发现）：
 *   page.tsx 用 copiedText === <剪贴板内容> 判定是否显示「已复制」。
 *   但首页存在大量**复制内容相同**的按钮：
 *   - 应用市场「社区与第三方扩展」板块 41 张卡的指令都是 `z app`；
 *   - 今日推荐的 `z app 201/202/203` 与应用市场里同款应用按钮内容一致；
 *   - 常用指令 `z app 57` 与应用市场 #57 卡的按钮内容一致。
 *   点其中任意一张，**多张卡会同时亮起「已复制」**，用户无法分辨复制的是哪一条。
 *
 * 本测试直接引用页面真实使用的 copy key 生成器（src/lib/copyKeys.ts），
 * 并对页面源码做结构断言，避免测试与实现漂移。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PAGE_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/app/page.tsx');
const APPS_DATA_PATH = path.join(PROJECT_ROOT, 'src/data/appsData.ts');
const COPY_KEYS_PATH = path.join(PROJECT_ROOT, 'src/lib/copyKeys.ts');

const pageSource = fs.readFileSync(PAGE_SOURCE_PATH, 'utf8');

/** 用仓库自带 typescript 编译器把真实实现转译成 JS 后求值。 */
function loadModule(modulePath) {
  const ts = require('typescript');
  const source = fs.readFileSync(modulePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const module = { exports: {} };
  const factory = new Function('exports', 'module', 'require', transpiled);
  factory(module.exports, module, require);
  return module.exports;
}

const { COPY_KEYS } = loadModule(COPY_KEYS_PATH);

/** 从 appsData.ts 解析应用 id / 分类。 */
function readApps() {
  const source = fs.readFileSync(APPS_DATA_PATH, 'utf8');
  const apps = [];
  const re = /\{\s*"id":\s*([^,]+),\s*"name":\s*"([^"]*)",\s*"category":\s*"([^"]*)"/g;
  let match;
  while ((match = re.exec(source))) {
    apps.push({
      id: match[1].trim().replace(/"/g, ''),
      name: match[2],
      category: match[3],
    });
  }
  return apps;
}

test('社区扩展板块的 41 张卡各自拥有唯一的 copy key（不再共享 `z app`）', () => {
  const apps = readApps();
  const customApps = apps.filter((app) => app.category === 'custom');
  assert.ok(customApps.length >= 40, '社区扩展板块应至少有 40 张卡');

  const keys = customApps.map((app) => COPY_KEYS.appMarket(app.id));
  assert.equal(
    new Set(keys).size,
    keys.length,
    '社区扩展卡的 copy key 必须按应用 id 唯一，不能因为指令都是 `z app` 而撞车',
  );
});

test('今日推荐卡与市场卡的 copy key 互不冲突（指令文本相同也各自独立）', () => {
  const apps = readApps();
  for (const cmd of ['z app 201', 'z app 202', 'z app 203']) {
    const app = apps.find((item) => `z app ${item.id}` === cmd);
    assert.ok(app, `市场里应存在应用 ${cmd}`);

    const dailyKey = COPY_KEYS.dailyRecommend(cmd);
    const marketKey = COPY_KEYS.appMarket(app.id);
    assert.notEqual(
      dailyKey,
      marketKey,
      `今日推荐卡与市场卡的指令都是 ${cmd}，copy key 必须不同，否则两张卡同时亮起`,
    );
  }
});

test('常用指令 `z app 57` 与市场 #57 卡的 copy key 互不冲突', () => {
  const apps = readApps();
  const app57 = apps.find((item) => item.id === '57');
  assert.ok(app57, '市场里应存在 #57 应用');

  assert.notEqual(
    COPY_KEYS.quickCommand('z app 57'),
    COPY_KEYS.appMarket(app57.id),
    '常用指令卡与市场卡的指令都是 `z app 57`，copy key 必须不同',
  );
});

test('全站所有复制按钮的 copy key 两两不重复', () => {
  const apps = readApps();
  const keys = [
    COPY_KEYS.install,
    ...['z', 'z app+', 'z app 57', 'z bbr3', 'z clean', 'z dd', 'z backup', 'z update'].map(
      (cmd) => COPY_KEYS.quickCommand(cmd),
    ),
    ...['z app 201', 'z app 202', 'z app 203'].map((cmd) => COPY_KEYS.dailyRecommend(cmd)),
    ...apps.map((app) => COPY_KEYS.appMarket(app.id)),
    ...Array.from({ length: 10 }, (_, i) => COPY_KEYS.trendingRepo(i + 1)),
  ];

  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  assert.deepEqual(
    duplicates,
    [],
    `存在重复的 copy key，会让多张卡同时显示「已复制」：${[...new Set(duplicates)].join(', ')}`,
  );
});

test('页面按 copy key 判定复制态（不得再用剪贴板内容做状态键）', () => {
  assert.ok(
    !/copiedText/.test(pageSource),
    'page.tsx 不得再用 copiedText（剪贴板内容）作为状态键，必须改用 copy key',
  );
  assert.ok(
    /copiedKey/.test(pageSource),
    'page.tsx 必须用 copiedKey 记录被点击的按钮身份',
  );
  assert.ok(
    /const handleCopy = \(text: string, copyKey: string\)/.test(pageSource),
    'handleCopy 必须同时接收复制内容与 copy key',
  );
  assert.ok(
    /setCopiedKey\(\(current\) => \(current === copyKey \? null : current\)\)/.test(pageSource),
    '清除复制态时只能清掉自己那一次，不能误清其他按钮',
  );
});

test('页面每一处复制按钮都传入 copy key', () => {
  const calls = [...pageSource.matchAll(/handleCopy\(([^)]*)\)/g)].map((m) => m[1]);
  assert.ok(calls.length > 0, '应至少有一处 handleCopy 调用');

  const withoutKey = calls.filter((args) => !/COPY_KEYS\./.test(args));
  assert.deepEqual(
    withoutKey,
    [],
    `以下复制调用没有传 copy key：${withoutKey.join(' | ')}`,
  );
});
