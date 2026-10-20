import type { Metadata } from 'next';
import { TUTORIALS_DATA } from '@/data/tutorialsData';
import MarkdownContent from '@/components/MarkdownContent';
import { ExternalLink, Tv } from 'lucide-react';

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

        {/* 🎬 GitHub 一周热点专栏：本文所属期的原视频（16:9 B 站官方播放器，正文上方） */}
        {item.episodeVideo && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-md sm:p-5 dark:border-white/10 dark:bg-[#10131c]">
            <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                  <Tv className="h-3.5 w-3.5" />
                  <span>第 {item.episodeVideo.episode} 期原视频</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  UP 主：<span className="font-semibold text-slate-700 dark:text-slate-200">{item.episodeVideo.author}</span>
                </span>
              </div>
              <a
                href={item.episodeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                <span>在 B 站打开 ({item.episodeVideo.bvid})</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://player.bilibili.com/player.html?bvid=${item.episodeVideo.bvid}&autoplay=0`}
                className="absolute top-0 left-0 h-full w-full rounded-2xl border border-slate-800"
                scrolling="no"
                frameBorder="no"
                allowFullScreen
                title={item.episodeVideo.title}
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              {item.episodeVideo.title}
            </p>
          </div>
        )}

        {/* 🎬 官方 B 站同步视频（9:16 竖屏短片，桌面居中限宽，手机 390px 完整适配） */}
        {item.video && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md dark:border-white/10 dark:bg-[#10131c]">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3 dark:border-white/10">
              <div>
                <div className="inline-flex items-center space-x-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                  <Tv className="h-3.5 w-3.5" />
                  <span>先看 10 秒：本篇实录宣传片</span>
                </div>
                <h3 className="mt-1.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {item.video.title}
                </h3>
              </div>
              <a
                href={item.video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center space-x-1 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
              >
                <span>在 B 站打开 ({item.video.bvid})</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* 9:16 竖屏原生自托管播放器：桌面端居中限宽，手机端自适应，零拉伸零黑边，100% 畅通播放 */}
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px]">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                >
                  <source src="/videos/muse-miracle-promo-final.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              UP 主：<span className="font-semibold text-slate-700 dark:text-slate-200">{item.video.author}</span>
              <span className="mx-2">·</span>
              <span>10 秒竖屏实录短片，看完即懂</span>
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-slate-200 pt-10 dark:border-white/10">
          <MarkdownContent content={item.content} />
        </div>

        {/* 📺 外部视频组（B 站官方嵌入播放器，16:9 自适应，手机端不溢出，置于正文末尾） */}
        {item.externalVideos && item.externalVideos.length > 0 && (
          <div className="mt-10 border-t border-slate-200 pt-10 dark:border-white/10">
            <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              📺 相关视频
            </h2>
            <div className="space-y-8">
              {item.externalVideos.map((vid, idx) => (
                <div key={idx} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md dark:border-white/10 dark:bg-[#10131c]">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3 dark:border-white/10">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                        <Tv className="h-3.5 w-3.5" />
                        <span>{vid.desc}</span>
                      </div>
                      <h3 className="mt-1.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {vid.title}
                      </h3>
                    </div>
                    <a
                      href={`https://www.bilibili.com/video/${vid.bvid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <span>在 B 站打开 ({vid.bvid})</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={`https://player.bilibili.com/player.html?bvid=${vid.bvid}&autoplay=0`}
                      className="absolute top-0 left-0 h-full w-full rounded-2xl border border-slate-800"
                      scrolling="no"
                      frameBorder="no"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
