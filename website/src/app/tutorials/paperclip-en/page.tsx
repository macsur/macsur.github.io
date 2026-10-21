import type { Metadata } from 'next';
import MarkdownContent from '@/components/MarkdownContent';
import {
  PAPERCLIP_EN_TITLE,
  PAPERCLIP_EN_SUMMARY,
  PAPERCLIP_EN_CONTENT,
} from '@/data/paperclipEnData';

/**
 * 🌐 Paperclip 教程英文版
 *
 * 独立路由，不进中文教程列表页，避免英文条目混入中文列表。
 * 按 Muse 交办要求：页眉、视频脚手架、文末相关视频区均不进英文版，
 * 正文直接采用站主放行的英文定稿，不自行重译。
 */

export const metadata: Metadata = {
  title: `${PAPERCLIP_EN_TITLE} | Muse Miracle`,
  description: PAPERCLIP_EN_SUMMARY,
  alternates: {
    canonical: '/tutorials/paperclip-en/',
  },
};

export default function PaperclipEnPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 dark:bg-[#090a0f] dark:text-slate-100">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 语言互链：英文页 ↔ 中文原页 ↔ 教程列表（页眉栏位不进英文版，只留返回类导航） */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href="/tutorials/paperclip/"
            className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            ← Read in Chinese
          </a>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
            |
          </span>
          <a
            href="/tutorials/"
            className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            All tutorials
          </a>
        </div>

        {/* 正文：英文定稿全文 */}
        <div className="mt-10 border-t border-slate-200 pt-10 dark:border-white/10">
          <MarkdownContent content={PAPERCLIP_EN_CONTENT} />
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/tutorials/paperclip/"
              className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              ← Read in Chinese
            </a>
            <a
              href="/tutorials/"
              className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              All tutorials
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
