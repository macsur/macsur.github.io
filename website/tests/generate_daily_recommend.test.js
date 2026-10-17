'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const GENERATOR_PATH = path.join(PROJECT_ROOT, 'generate_daily_recommend.js');
const APPS_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/data/appsData.ts');
const MANIFEST_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/data/recommendManifest.json');
const FIXED_NOW = '2026-10-18T00:00:00.000Z';
const FIXED_TODAY = '2026-10-18';

function scratchDir(name) {
  const base = process.env.PAPERCLIP_RUN_SCRATCH_DIR || require('node:os').tmpdir();
  fs.mkdirSync(base, { recursive: true });
  return fs.mkdtempSync(path.join(base, `${name}-`));
}

function writeCurrentSnapshot(root) {
  fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });
  fs.copyFileSync(APPS_SOURCE_PATH, path.join(root, 'src/data/appsData.ts'));
  fs.copyFileSync(MANIFEST_SOURCE_PATH, path.join(root, 'src/data/recommendManifest.json'));
}

function writeFixture(root, { ids, seenIds, history }) {
  fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });
  const apps = ids.map(id => ({
    id,
    name: `Fixture app ${id}`,
    category: 'ops',
    isStar: true,
    rec: {
      badge: 'Fixture badge',
      stars: '100k+',
      highlight: 'Fixture highlight',
      reason: 'Fixture reason',
    },
  }));
  const appsData = `export const CATEGORIES: Category[] = [{ id: 'ops', name: 'Operations' }];\nexport const BUILTIN_APPS: AppItem[] = ${JSON.stringify(apps, null, 2)};\n`;
  fs.writeFileSync(path.join(root, 'src/data/appsData.ts'), appsData, 'utf8');
  fs.writeFileSync(
    path.join(root, 'src/data/recommendManifest.json'),
    JSON.stringify({ seenIds, history }, null, 2),
    'utf8',
  );
}

function runGenerator(root, scriptPath = GENERATOR_PATH, now = FIXED_NOW) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    env: {
      ...process.env,
      DAILY_RECOMMEND_ROOT: root,
      DAILY_RECOMMEND_NOW: now,
    },
  });
  assert.equal(result.status, 0, `${scriptPath} failed\nstdout: ${result.stdout}\nstderr: ${result.stderr}`);
  return result;
}

function readManifest(root) {
  return JSON.parse(fs.readFileSync(path.join(root, 'src/data/recommendManifest.json'), 'utf8'));
}

function readOutput(root) {
  const content = fs.readFileSync(path.join(root, 'src/data/dailyRecommend.ts'), 'utf8');
  const marker = 'export const DAILY_RECOMMEND: DailyRecommendItem[] = ';
  const start = content.indexOf(marker);
  assert.notEqual(start, -1, 'Generated output is missing DAILY_RECOMMEND');
  return JSON.parse(content.slice(start + marker.length).replace(/;\s*$/, ''));
}

function outputIds(root) {
  return readOutput(root).map(item => item.id);
}

test('current snapshot stays byte-stable when a Beijing-date history already exists', () => {
  const root = scratchDir('daily-current');
  writeCurrentSnapshot(root);
  const sourceManifest = JSON.parse(fs.readFileSync(MANIFEST_SOURCE_PATH, 'utf8'));
  const anchor = sourceManifest.history.at(-1);
  assert.ok(anchor, 'Current manifest must have a history anchor');
  const anchorNow = `${anchor.date}T00:00:00.000Z`;

  runGenerator(root, GENERATOR_PATH, anchorNow);
  const firstOutput = fs.readFileSync(path.join(root, 'src/data/dailyRecommend.ts'), 'utf8');
  const firstManifest = fs.readFileSync(path.join(root, 'src/data/recommendManifest.json'), 'utf8');

  runGenerator(root, GENERATOR_PATH, anchorNow);
  const secondOutput = fs.readFileSync(path.join(root, 'src/data/dailyRecommend.ts'), 'utf8');
  const secondManifest = fs.readFileSync(path.join(root, 'src/data/recommendManifest.json'), 'utf8');
  const manifest = readManifest(root);

  assert.deepEqual(outputIds(root), anchor.ids);
  assert.equal(manifest.history.filter(entry => entry.date === anchor.date).length, 1);
  assert.equal(secondOutput, firstOutput);
  assert.equal(secondManifest, firstManifest);
});

test('new unseen candidate remains on the list after a same-day retry', () => {
  const root = scratchDir('daily-unseen');
  writeFixture(root, {
    ids: [...Array.from({ length: 10 }, (_, index) => 201 + index), 999],
    seenIds: Array.from({ length: 10 }, (_, index) => 201 + index),
    history: [{ date: '2026-10-17', ids: [201, 202, 203] }],
  });

  runGenerator(root);
  const firstIds = outputIds(root);
  const firstManifest = readManifest(root);
  assert.deepEqual(firstIds, [999, 202, 203]);

  runGenerator(root);
  assert.deepEqual(outputIds(root), firstIds);
  const secondManifest = readManifest(root);
  assert.deepEqual(secondManifest, firstManifest);
  assert.equal(secondManifest.history.filter(entry => entry.date === FIXED_TODAY).length, 1);
});

test('duplicate same-day history is normalized to one canonical record', () => {
  const root = scratchDir('daily-duplicate');
  writeFixture(root, {
    ids: [201, 202, 203],
    seenIds: [201, 202, 203],
    history: [
      { date: FIXED_TODAY, ids: [201] },
      { date: FIXED_TODAY, ids: [201, 202, 203] },
    ],
  });

  runGenerator(root);
  const firstManifest = readManifest(root);
  assert.deepEqual(outputIds(root), [201, 202, 203]);
  assert.equal(firstManifest.history.filter(entry => entry.date === FIXED_TODAY).length, 1);
  assert.deepEqual(
    firstManifest.history.find(entry => entry.date === FIXED_TODAY).ids,
    [201, 202, 203],
  );

  runGenerator(root);
  assert.deepEqual(readManifest(root), firstManifest);
});

test('pre-fix baseline regression reproduces the original same-day drift', () => {
  const root = scratchDir('daily-head-baseline');
  writeFixture(root, {
    ids: [...Array.from({ length: 10 }, (_, index) => 201 + index), 999],
    seenIds: Array.from({ length: 10 }, (_, index) => 201 + index),
    history: [{ date: '2026-10-17', ids: [201, 202, 203] }],
  });

  const baseline = spawnSync('git', ['show', '36cb3c65^:website/generate_daily_recommend.js'], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });
  assert.equal(baseline.status, 0, baseline.stderr);
  const baselineScript = path.join(root, 'generate_daily_recommend.js');
  fs.writeFileSync(baselineScript, baseline.stdout, 'utf8');

  runGenerator(root, baselineScript);
  assert.deepEqual(outputIds(root), [999, 202, 203]);

  runGenerator(root, baselineScript);
  const baselineManifest = readManifest(root);
  assert.deepEqual(outputIds(root), [202, 203, 204]);
  assert.equal(baselineManifest.history.filter(entry => entry.date === FIXED_TODAY).length, 2);
});

test('a same-day history anchor referencing a missing candidate fails explicitly', () => {
  const root = scratchDir('daily-invalid-anchor');
  writeFixture(root, {
    ids: [201, 202, 203],
    seenIds: [201, 202, 203],
    history: [{ date: FIXED_TODAY, ids: [201, 202, 404] }],
  });

  const result = spawnSync(process.execPath, [GENERATOR_PATH], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    env: {
      ...process.env,
      DAILY_RECOMMEND_ROOT: root,
      DAILY_RECOMMEND_NOW: FIXED_NOW,
    },
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /候选池外 IDs: 404/);
  assert.equal(fs.existsSync(path.join(root, 'src/data/dailyRecommend.ts')), false);
});
