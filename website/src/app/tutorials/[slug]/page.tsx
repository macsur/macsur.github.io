import type { Metadata } from 'next';
import { TUTORIALS_DATA } from '@/data/tutorialsData';
import MarkdownContent from '@/components/MarkdownContent';
import { Play, ExternalLink, Tv } from 'lucide-react';

export function generateStaticParams() {
  return TUTORIALS_DATA.map(item => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = TUTORIALS_DATA.find(t => t.slug === params.slug);
  if (!item) return { title: 'Muse Miracle | CODE MATRIX 代码矩阵' };
  return {
    title: `${item.title} | Muse Miracle`,
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

        {/* 🎬 官方 B 站同步视频教程 */}
        {item.video && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-white/10 dark:bg-[#10131c]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <Tv className="h-4 w-4 text-rose-500" />
                <span>B 站实录教程 · {item.video.bvid}</span>
              </div>
              <a
                href={item.video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                <span>前往 B 站观看</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            {/* 16:9 高清播放器容器 */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`//player.bilibili.com/player.html?bvid=${item.video.bvid}&page=1&high_quality=1&danmaku=0`}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="h-full w-full"
                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
              />
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {item.video.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    UP 主：<span className="font-medium text-slate-700 dark:text-slate-200">{item.video.author}</span>
                    {item.video.desc && <span className="ml-2 hidden sm:inline text-slate-400">· {item.video.desc}</span>}
                  </p>
                </div>
                <a
                  href={item.video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center space-x-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-500 hover:text-white transition-all dark:bg-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500 dark:hover:text-white"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>B 站高清播放</span>
                </a>
              </div>
            </div>
          </div>
        )}

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
