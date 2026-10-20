'use client';

import React, { useState } from 'react';
import {
  TRENDING_EPISODES,
  TRENDING_AUTHOR,
  TrendingEpisode,
  TrendingProject,
} from '@/data/trendingColumnData';
import { Tv, ExternalLink, Star, CheckCircle2, AlertTriangle, GitFork } from 'lucide-react';

/** 实测结论徽章：跑通 / 降级 */
function TestBadge({ project }: { project: TrendingProject }) {
  if (project.testResult === 'passed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
        <CheckCircle2 className="h-3 w-3" />
        <span>实测跑通</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
      <AlertTriangle className="h-3 w-3" />
      <span>降级·解读篇</span>
    </span>
  );
}

function ProjectCard({ project }: { project: TrendingProject }) {
  return (
    <article className="google-card rounded-2xl border border-white/[0.08] p-5 shadow-lg shadow-black/25 transition-all hover:border-cyan-400/40">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
          {project.repo}
        </span>
        <TestBadge project={project} />
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
          <span>{project.stars.toLocaleString('en-US')} 星</span>
        </span>
        <span className="text-[11px] text-slate-400">数据日期 {project.starsDate}</span>
      </div>

      <h3 className="mt-3 text-lg font-extrabold text-white">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

      <div className="mt-3 rounded-lg border border-amber-400/20 bg-amber-500/[0.07] p-3">
        <p className="text-[11px] font-semibold text-amber-200">实测结论</p>
        <p className="mt-1 text-xs leading-relaxed text-amber-100/90">{project.testNote}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={project.tutorialUrl}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-cyan-500"
        >
          阅读教程
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-300"
        >
          <GitFork className="h-3 w-3" />
          <span>项目地址</span>
        </a>
      </div>
    </article>
  );
}

/** 单期卡：135 置顶展开，134–130 占位收起 */
function EpisodeCard({ episode }: { episode: TrendingEpisode }) {
  const isLive = episode.status === 'live';
  const [open, setOpen] = useState(isLive);

  return (
    <section className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left"
      >
        <div className={`flex flex-wrap items-center gap-3 rounded-2xl border px-5 py-4 transition-colors ${
          isLive
            ? 'border-cyan-400/40 bg-cyan-500/[0.08]'
            : 'border-white/[0.08] bg-white/[0.02]'
        }`}
        >
          <span className={`rounded-lg px-2.5 py-1 font-mono text-sm font-extrabold ${
            isLive ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-700/60 text-slate-300'
          }`}>
            EP.{episode.episode}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold text-white sm:text-lg">{episode.title}</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {isLive ? `${episode.projects.length} 个项目 · ${episode.date}` : '待补存量'}
            </p>
          </div>
          {isLive && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-200">
              本期已上
            </span>
          )}
          <span className="font-mono text-xs text-slate-400">{open ? '收起 ▲' : '展开 ▼'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-4">
          {isLive ? (
            <>
              <div className="mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <p className="text-sm leading-relaxed text-slate-300">{episode.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-bold text-rose-200">
                    <Tv className="h-3 w-3" />
                    <span>UP 主：{episode.author}</span>
                  </span>
                  <a
                    href={episode.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-200 transition-colors hover:bg-rose-500/20"
                  >
                    <span>看第 135 期原视频（{episode.bvid}）</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {episode.projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-slate-400">
                第 {episode.episode} 期待补。站主拍板按期倒序补齐 134 → 130 存量。
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function GithubTrendingColumnPage() {
  const liveEpisode = TRENDING_EPISODES.find((e) => e.status === 'live');
  const plannedEpisodes = TRENDING_EPISODES.filter((e) => e.status === 'planned');

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 dark:bg-[#090a0f] dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          ← 返回首页
        </a>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300">
              开源专栏
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">
              UP 主：{TRENDING_AUTHOR}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            GitHub 一周热点 · 逐个实测
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            跟踪 B 站 UP 主「{TRENDING_AUTHOR}」的《{TRENDING_AUTHOR === 'IT咖啡馆' ? 'Github一周热点' : 'Github一周热点'}》系列。
            每期视频介绍几个热点项目，本站就在本机把每个项目真装真跑一遍，跑通的出实操教程，装不动的如实降级为解读评估篇并写明原因——
            不写假实测，不拿 README 充数。
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>首期打样：第 135 期</span>
            <span>·</span>
            <span>共 {liveEpisode?.projects.length ?? 0} 篇教程</span>
            <span>·</span>
            <span>存量倒序补 134 → 130</span>
          </div>
        </header>

        <main className="mt-10">
          {liveEpisode && <EpisodeCard episode={liveEpisode} />}
          <h2 className="mb-4 mt-10 text-lg font-extrabold text-slate-900 dark:text-white">
            往期存档（倒序补齐中）
          </h2>
          {plannedEpisodes.map((e) => (
            <EpisodeCard key={e.episode} episode={e} />
          ))}
        </main>
      </div>
    </div>
  );
}
