import React from 'react';

type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'code'; text: string }
  | { type: 'bold'; children: InlineToken[] }
  | { type: 'link'; href: string; children: InlineToken[] };

function renderInline(tokens: InlineToken[], keyPrefix: string): React.ReactNode[] {
  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    switch (token.type) {
      case 'text':
        return <span key={key}>{token.text}</span>;
      case 'code':
        return (
          <code key={key} className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-blue-700 dark:border-white/10 dark:bg-slate-800/80 dark:text-cyan-200">
            {token.text}
          </code>
        );
      case 'bold':
        return <strong key={key} className="font-bold text-slate-900 dark:text-white">{renderInline(token.children, key)}</strong>;
      case 'link':
        return (
          <a key={key} href={token.href} target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-cyan-300 dark:hover:text-cyan-200">
            {renderInline(token.children, key)}
          </a>
        );
      default:
        return null;
    }
  });
}

// 轻量内联语法解析：`code`、**bold**、[text](url)
function parseInline(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let i = 0;
  const pushText = (text: string) => {
    if (text) tokens.push({ type: 'text', text });
  };
  while (i < source.length) {
    // 行内代码
    if (source[i] === '`') {
      const end = source.indexOf('`', i + 1);
      if (end !== -1) {
        pushText(source.slice(0, i));
        tokens.push({ type: 'code', text: source.slice(i + 1, end) });
        source = source.slice(end + 1);
        i = 0;
        continue;
      }
    }
    // 加粗
    if (source.startsWith('**', i)) {
      const end = source.indexOf('**', i + 2);
      if (end !== -1) {
        pushText(source.slice(0, i));
        tokens.push({ type: 'bold', children: parseInline(source.slice(i + 2, end)) });
        source = source.slice(end + 2);
        i = 0;
        continue;
      }
    }
    // 链接 [text](url)
    if (source[i] === '[') {
      const close = source.indexOf(']', i + 1);
      if (close !== -1 && source[close + 1] === '(') {
        const parenEnd = source.indexOf(')', close + 2);
        if (parenEnd !== -1) {
          pushText(source.slice(0, i));
          tokens.push({
            type: 'link',
            href: source.slice(close + 2, parenEnd),
            children: parseInline(source.slice(i + 1, close)),
          });
          source = source.slice(parenEnd + 1);
          i = 0;
          continue;
        }
      }
    }
    i += 1;
  }
  pushText(source);
  return tokens;
}

function renderBlockParagraph(line: string, key: string): React.ReactNode {
  return <p key={key} className="my-4 leading-relaxed text-[15px] text-slate-800 dark:text-slate-300">{renderInline(parseInline(line), key)}</p>;
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 水平线
    if (/^---+$/.test(line.trim())) {
      blocks.push(<hr key={`b-${key++}`} className="my-8 border-t border-slate-200 dark:border-white/10" />);
      i += 1;
      continue;
    }

    // 标题
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const className = [
        'mt-10 mb-4 font-extrabold tracking-tight text-slate-900 dark:text-white',
        'text-2xl',
        'text-xl',
        'text-lg',
        'text-base',
        'text-sm',
        'text-xs',
      ][level - 1] || 'text-sm';
      blocks.push(
        React.createElement(`h${level}`, { key: `b-${key++}`, className }, renderInline(parseInline(text), `h-${key}`)),
      );
      i += 1;
      continue;
    }

    // 代码块
    if (line.trim().startsWith('```')) {
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // 跳过结尾 ```
      blocks.push(
        <pre key={`b-${key++}`} className="my-5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-[13px] leading-relaxed text-slate-100 dark:border-white/10 dark:bg-[#07090e]">
          <code className="font-mono">{buf.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    // 引用块
    if (line.trim().startsWith('>')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push(
        <blockquote key={`b-${key++}`} className="my-5 rounded-r-xl border-l-4 border-blue-600 bg-blue-50/70 px-4 py-3 text-[14px] leading-relaxed text-slate-800 dark:border-cyan-500/60 dark:bg-cyan-500/[0.08] dark:text-slate-300">
          {buf.map((l, j) => (
            <p key={j} className={j > 0 ? 'mt-2' : ''}>{renderInline(parseInline(l), `q-${j}`)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    // 无序列表 / 有序列表（聚合相邻行）
    const isUl = /^[-*]\s+/.test(line.trim());
    const isOl = /^\d+[.)]\s+/.test(line.trim());
    if (isUl || isOl) {
      const items: string[] = [];
      while (i < lines.length) {
        const current = lines[i];
        if (isUl && /^[-*]\s+/.test(current.trim())) {
          items.push(current.trim().replace(/^[-*]\s+/, ''));
          i += 1;
        } else if (isOl && /^\d+[.)]\s+/.test(current.trim())) {
          items.push(current.trim().replace(/^\d+[.)]\s+/, ''));
          i += 1;
        } else {
          break;
        }
      }
      const listItems = items.map((item, j) => (
        <li key={j} className="my-1.5 leading-relaxed text-[15px] text-slate-800 dark:text-slate-300">
          {renderInline(parseInline(item), `li-${j}`)}
        </li>
      ));
      blocks.push(
        isOl ? (
          <ol key={`b-${key++}`} className="my-4 list-decimal space-y-1 pl-6">{listItems}</ol>
        ) : (
          <ul key={`b-${key++}`} className="my-4 list-disc space-y-1 pl-6">{listItems}</ul>
        ),
      );
      continue;
    }

    // 空行
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // 普通段落
    blocks.push(renderBlockParagraph(line.trim(), `b-${key++}`));
    i += 1;
  }

  return <div>{blocks}</div>;
}
