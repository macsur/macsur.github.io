'use client';

import React, { useMemo, useState } from 'react';
import { TUTORIALS_DATA, TutorialTag, TutorialItem } from '@/data/tutorialsData';

const ALL_TAGS: TutorialTag[] = ['我喜欢的', '测试中', '正在用', '推荐'];

// 状态标签配色：浅色与暗色模式下均提供高对比度
const TAG_STYLES: Record<TutorialTag, string> = {
  '我喜欢的': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/40',
  '测试中': 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/40',
  '正在用': 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40',
  '推荐': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/40',
};

function TutorialTagChip({ tag }: { tag: TutorialTag }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${TAG_STYLES[tag]}`}>
      {tag}
    </span>
  );
}

// 自绘代码封面：纯 CSS 极客终端字牌，内部文字强对比显式设定
function CoverCard({ item, large = false }: { item: TutorialItem; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 dark:border-white/10 dark:bg-[#07090e] ${large ? 'sm:w-1/2' : 'w-full'}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-3 py-2 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="ml-2 truncate font-mono text-[11px] text-slate-400">{item.slug}.md</span>
      </div>
      <div className={large ? 'p-6 sm:p-7' : 'p-4'}>
        <div className="mb-2.5 inline-block rounded-md border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-300">
          {item.coverBadge}
        </div>
        <div className={`font-mono font-bold leading-snug text-white ${large ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {item.coverTitle}
        </div>
        <div className={`mt-2 font-mono leading-relaxed text-slate-300 ${large ? 'text-sm' : 'text-xs'}`}>
          {item.coverSubtitle}
        </div>
        <div className={`mt-4 space-y-1 font-mono text-slate-400 ${large ? 'text-xs' : 'text-[11px]'}`}>
          <div><span className="text-cyan-400">$</span> cat {item.slug}.md</div>
          <div><span className="text-emerald-400">#</span> {item.category} · {item.readTime}</div>
        </div>
      </div>
    </div>
  );
}

// 置顶 Featured 大卡片
function FeaturedCard({ item }: { item: TutorialItem }) {
  return (
    <a
      href={`/tutorials/${item.slug}/`}
      className="group mb-10 flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md sm:flex-row sm:items-center sm:gap-8 sm:p-8 dark:border-white/10 dark:bg-[#10131c] dark:hover:border-cyan-400/50"
    >
      <CoverCard item={item} large={true} />
      <div className="mt-6 flex flex-1 flex-col justify-between sm:mt-0">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-cyan-500/15 dark:text-cyan-300">
              置顶精选
            </span>
            {item.tags.map(tag => (
              <TutorialTagChip key={tag} tag={tag} />
            ))}
          </div>
          <h2 className="mt-4 text-2xl font-extrabold leading-snug text-slate-900 group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-cyan-300">
            {item.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {item.summary}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 sm:text-sm dark:border-white/10 dark:text-slate-400">
          <span>{item.date} · {item.readTime}</span>
          <span className="inline-flex items-center font-bold text-blue-600 group-hover:translate-x-1 transition-transform dark:text-cyan-300">
            阅读教程 →
          </span>
        </div>
      </div>
    </a>
  );
}

function TutorialCard({ item }: { item: TutorialItem }) {
  return (
    <a
      href={`/tutorials/${item.slug}/`}
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-[#10131c] dark:hover:border-cyan-400/50"
    >
      <div>
        <CoverCard item={item} />
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {item.tags.map(tag => (
            <TutorialTagChip key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">
          {item.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        <span>{item.date} · {item.readTime}</span>
        <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform dark:text-cyan-300">
          阅读教程 →
        </span>
      </div>
    </a>
  );
}

export default function TutorialsPage() {
  const [activeTag, setActiveTag] = useState<'全部' | TutorialTag>('全部');

  const filtered = useMemo(() => {
    if (activeTag === '全部') return TUTORIALS_DATA;
    return TUTORIALS_DATA.filter(item => item.tags.includes(activeTag));
  }, [activeTag]);

  const featuredItem = useMemo(() => {
    return TUTORIALS_DATA.find(item => item.featured) || TUTORIALS_DATA[0];
  }, []);

  const gridItems = useMemo(() => {
    if (activeTag === '全部') {
      return filtered.filter(item => item.id !== featuredItem?.id);
    }
    return filtered;
  }, [activeTag, filtered, featuredItem]);

  const countFor = (tag: '全部' | TutorialTag) =>
    tag === '全部' ? TUTORIALS_DATA.length : TUTORIALS_DATA.filter(item => item.tags.includes(tag)).length;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 dark:bg-[#090a0f] dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header>
          <a href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200">
            ← 返回首页
          </a>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Muse Miracle
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            为什么叫 Miracle？因为这里记的每一件事，单靠我一个人原本都办不成：开一家有 12 名 AI 员工的公司、把网站一格一格亲手搭起来、给汽车车机换个更聪明的脑子……靠着 Muse 的指引和帮助，它们一件件都成了。这里收我喜欢的、正在测试、日常在用和真心推荐的，每一样都写成能照着做的教程。
          </p>
        </header>

        {/* 顶部状态过滤 chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(['全部', ...ALL_TAGS] as const).map(tag => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm dark:border-cyan-400 dark:bg-cyan-500 dark:text-slate-950'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-200'
                }`}
              >
                {tag}
                <span className={`text-xs ${active ? 'text-white/80 dark:text-slate-900' : 'text-slate-400 dark:text-slate-500'}`}>
                  {countFor(tag)}
                </span>
              </button>
            );
          })}
        </div>

        {/* 置顶 Featured 大卡片 (全部标签时展示) */}
        {activeTag === '全部' && featuredItem && (
          <div className="mt-8">
            <FeaturedCard item={featuredItem} />
          </div>
        )}

        {/* 教程网格列表 */}
        {gridItems.length > 0 && (
          <div className={`${activeTag === '全部' ? 'mt-6' : 'mt-8'} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
            {gridItems.map(item => (
              <TutorialCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            该分类下暂无教程。
          </div>
        )}
      </div>
    </div>
  );
}
