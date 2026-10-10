const fs = require('fs');
const path = require('path');

function parseWindows() {
  const md = fs.readFileSync(path.resolve(__dirname, '../src/data/windows-audit/windows-v1.0.md'), 'utf8');
  const sections = md.split(/\n## /).slice(1);
  const items = [];
  let group = '';
  for (const section of sections) {
    const lines = section.split('\n');
    const title = lines[0].trim();
    if (/^一、/.test(title)) group = '优化与隐私';
    else if (/^二、/.test(title)) group = '安装与清理';
    else if (/^三、/.test(title)) group = '网络与浏览器';
    else if (/^四、/.test(title)) group = '文件与效率';
    else if (/^五、/.test(title)) group = '开发与工具链';
    else if (/^六、/.test(title)) group = '安全与排查';
    else continue;
    const body = lines.slice(1).join('\n');
    const blocks = body.split(/\n(?=\*\*W\d+ · )/).filter(Boolean);
    for (const block of blocks) {
      const header = block.split('\n')[0];
      const m = header.match(/\*\*W(\d+) · (.+?)\*\* · 形态：(.+)/);
      if (!m) continue;
      const fields = {};
      for (const line of block.split('\n').slice(1)) {
        const fm = line.match(/^- (用途|来源|热度|维护|适用|管理员|风险|交付)：(.+)$/);
        if (fm) fields[fm[1]] = fm[2].trim();
      }
      items.push({
        id: 'W' + m[1],
        name: m[2].trim(),
        form: m[3].trim(),
        group,
        use: fields['用途'] || '',
        source: fields['来源'] || '',
        stars: fields['热度'] || '',
        maintenance: fields['维护'] || '',
        os: fields['适用'] || '',
        admin: fields['管理员'] || '',
        risk: fields['风险'] || '',
        delivery: fields['交付'] || '',
      });
    }
  }
  return items;
}

function parseZero() {
  const md = fs.readFileSync(path.resolve(__dirname, '../src/data/windows-audit/zero-degree.md'), 'utf8');
  const sections = md.split(/\n## /).slice(1);
  const items = [];
  let group = '';
  for (const section of sections) {
    const lines = section.split('\n');
    const title = lines[0].trim();
    if (/^一、/.test(title)) group = '优化与设置';
    else if (/^二、/.test(title)) group = '下载工具';
    else if (/^三、/.test(title)) group = '互传、装机与维护';
    else continue;
    const body = lines.slice(1).join('\n');
    const blocks = body.split(/\n(?=\*\*L\d+ · )/).filter(Boolean);
    for (const block of blocks) {
      const header = block.split('\n')[0];
      const m = header.match(/\*\*L(\d+) · (.+?)\*\* · 标签：(.+)/);
      if (!m) continue;
      const fields = {};
      for (const line of block.split('\n').slice(1)) {
        const fm = line.match(/^- (用途|博客|视频|来源|备注)：(.+)$/);
        if (fm) fields[fm[1]] = fm[2].trim();
      }
      items.push({
        id: 'L' + m[1],
        name: m[2].trim(),
        tag: m[3].trim(),
        group,
        use: fields['用途'] || '',
        blog: fields['博客'] || '',
        video: fields['视频'] === '无' ? '' : (fields['视频'] || ''),
        source: fields['来源'] || '',
        note: fields['备注'] || '',
      });
    }
  }
  return items;
}

const output = {
  fixedRiskNotice: '使用前先看说明；建议先建系统还原点；需管理员权限的条目已标出；个别工具可能被杀软误报；本站只做收录与展示；内容有争议先下架。',
  windows: parseWindows(),
  zero: parseZero(),
};

fs.writeFileSync(
  path.resolve(__dirname, '../src/data/windowsDesktop.ts'),
  `export interface WindowsItem {\n  id: string;\n  name: string;\n  form: string;\n  group: string;\n  use: string;\n  source: string;\n  stars: string;\n  maintenance: string;\n  os: string;\n  admin: string;\n  risk: string;\n  delivery: string;\n}\n\nexport interface ZeroDegreeItem {\n  id: string;\n  name: string;\n  tag: string;\n  group: string;\n  use: string;\n  blog: string;\n  video: string;\n  source: string;\n  note: string;\n}\n\nexport const WINDOWS_DESKTOP = ${JSON.stringify(output, null, 2)} as const;\n`
);

