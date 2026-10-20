'use strict';

/**
 * 回归测试：首页复制按钮的「已复制」反馈必须如实反映剪贴板写入结果，
 * 且常用指令列表不得出现重复指令（否则两张卡同时亮起「已复制」勾）。
 *
 * 历史缺陷（2026-10-21 前端巡检发现）：
 *   1) page.tsx 直接 `navigator.clipboard.writeText(text)`，不 await、不 catch。
 *      - 非安全上下文（http://）下 navigator.clipboard 为 undefined → 同步抛
 *        TypeError，整个点击处理被中断；
 *      - 写入被拒（权限被拒 / 非用户手势）时 Promise 被拒 → unhandledrejection，
 *        同时 UI 仍切到「已复制」→ 用户看到**假成功提示**。
 *   2) quickCommands 里 'z app+' 出现两次（原两条描述分别是「打开分类手风琴应用市场」
 *      与「进入应用市场后选择 DeepSeek AI 应用」）。复制态用 `copiedText === item.cmd`
 *      判定，同一条指令会让**两张卡片同时**显示已复制勾，用户无法分辨复制的是哪一条。
 *
 * 本测试直接复用页面真实使用的复制逻辑（src/lib/clipboard.ts 的纯函数版），
 * 并对页面源码做结构断言，避免测试与实现漂移。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PAGE_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/app/page.tsx');
const CLIPBOARD_MODULE_PATH = path.join(PROJECT_ROOT, 'src/lib/clipboard.ts');

const pageSource = fs.readFileSync(PAGE_SOURCE_PATH, 'utf8');

/**
 * 页面源码是 TSX，无法直接 require；而 src/lib/clipboard.ts 是 TypeScript。
 * 这里用仓库自带的 typescript 编译器把真实实现转译成 JS 后求值，
 * 保证测试跑的是**真实实现**而不是复制粘贴的副本，
 * 同时不依赖特定 Node 版本的原生类型剥离能力（CI 跑在 GitHub runner 上）。
 */
function loadCopyTextToClipboard() {
  const ts = require('typescript');
  const source = fs.readFileSync(CLIPBOARD_MODULE_PATH, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const module = { exports: {} };
  const factory = new Function('exports', 'module', 'require', transpiled);
  factory(module.exports, module, require);
  return module.exports.copyTextToClipboard;
}

test('clipboard 写入成功时才报告 ok', async () => {
  const copy = loadCopyTextToClipboard();
  const result = await copy('hello', { writeText: async () => {} });
  assert.deepEqual(result, { ok: true });
});

test('clipboard 被拒时报告 rejected 而不是抛出', async () => {
  const copy = loadCopyTextToClipboard();
  const result = await copy('hello', {
    writeText: async () => {
      throw new Error('NotAllowedError');
    },
  });
  assert.deepEqual(result, { ok: false, reason: 'rejected' });
});

test('clipboard 不可用（http:// 非安全上下文）时报告 unsupported 而不是抛 TypeError', async () => {
  // navigator.clipboard 为 undefined —— 正是 http:// 场景下的真实形态
  const copy = loadCopyTextToClipboard();
  const result = await copy('hello', undefined);
  assert.deepEqual(result, { ok: false, reason: 'unsupported' });
});

test('clipboard.writeText 同步抛错也被吞掉并归类为 rejected', async () => {
  const copy = loadCopyTextToClipboard();
  const result = await copy('hello', {
    writeText: () => {
      throw new Error('boom');
    },
  });
  assert.deepEqual(result, { ok: false, reason: 'rejected' });
});

test('页面复制处理器只在写入成功时切换「已复制」态', () => {
  // 旧的假成功写法：先切 UI 态，再无保护地写剪贴板
  assert.ok(
    !/navigator\.clipboard\.writeText\(/.test(pageSource),
    'page.tsx 不得再直接调用 navigator.clipboard.writeText（缺少失败处理）',
  );
  assert.ok(
    /if \(!result\.ok\) return;/.test(pageSource),
    '复制处理器必须在写入失败时直接返回，不得显示「已复制」',
  );
  assert.ok(
    /void copyTextToClipboard\(/.test(pageSource),
    'page.tsx 必须通过 copyTextToClipboard 复制',
  );
});

test('常用指令列表不得有重复指令（否则复制态会同时点亮多张卡）', () => {
  const listMatch = pageSource.match(
    /const quickCommands = \[([\s\S]*?)\n  \];/,
  );
  assert.ok(listMatch, '必须能从 page.tsx 解析出 quickCommands 列表');
  const cmds = [...listMatch[1].matchAll(/cmd:\s*'([^']+)'/g)].map((m) => m[1]);
  assert.ok(cmds.length > 0, 'quickCommands 不应为空');
  const duplicates = cmds.filter((cmd, i) => cmds.indexOf(cmd) !== i);
  assert.deepEqual(
    duplicates,
    [],
    `quickCommands 存在重复指令，会让多张卡同时显示「已复制」：${[...new Set(duplicates)].join(', ')}`,
  );
});
