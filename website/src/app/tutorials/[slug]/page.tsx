import type { Metadata } from 'next';
import { TUTORIALS_DATA } from '@/data/tutorialsData';
import MarkdownContent from '@/components/MarkdownContent';

export function generateStaticParams() {
  return TUTORIALS_DATA.map(item => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = TUTORIALS_DATA.find(t => t.slug === params.slug);
  if (!item) return { title: '个人教程 | CODE MATRIX 代码矩阵' };
  return {
    title: `${item.title} | 个人教程`,
    description: item.summary,
  };
}

export default function TutorialArticlePage({ params }: { params: { slug: string } }) {
  const item = TUTORIALS_DATA.find(t => t.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f6f8fb] dark:bg-[#090a0f]">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <a href="/tutorials/" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-cyan-300">
            ← 返回教程列表
          </a>
          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">未找到该教程</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 dark:bg-[#090a0f] dark:text-slate-100">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <a
          href="/tutorials/"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          ← 返回教程列表
        </a>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-bold text-blue-800 dark:bg-cyan-500/15 dark:text-cyan-300">
              {item.category}
            </span>
            <span>{item.date}</span>
            <span>·</span>
            <span>{item.readTime}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {item.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {item.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 border-t border-slate-200 pt-10 dark:border-white/10">
          <MarkdownContent content={item.content} />
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          <a
            href="/tutorials/"
            className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            ← 返回教程列表
          </a>
        </footer>
      </article>
    </div>
  );
}
