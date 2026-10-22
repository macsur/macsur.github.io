'use client';

import React, { useState } from 'react';
import {
  TRENDING_EPISODES,
  TRENDING_AUTHOR,
  TRENDING_STARS_DATE,
  TrendingEpisode,
  TrendingProject,
} from '@/data/trendingColumnData';
import { Tv, ExternalLink, Star, CheckCircle2, AlertTriangle, GitFork, ArrowRight } from 'lucide-react';

/** 实测徽章：仅 135 期实测篇有 */
function TestBadge({ project }: { project: TrendingProject }) {
  if (!project.testResult) return null;
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

/** 项目卡：华美玻璃拟态 + 悬停微浮 */
function ProjectCard({ project }: { project: TrendingProject }) {
  return (
    <a
      href={project.tutorialUrl}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_12px_40px_-12px_rgba(34,211,238,0.35)]"
    >
      {/* 顶部渐变光条 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-md bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
          {project.repo.split('/')[1]}
        </span>
        <TestBadge project={project} />
      </div>

      <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-cyan-200">
        {project.name}
      </h3>

      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">{project.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
          {project.stars.toLocaleString('en-US')}
        </span>
        <span className="font-mono">{project.language}</span>
        <span className="font-mono">{project.license}</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
        <span className="text-[11px] text-slate-500">阅读本篇 →</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
      </div>
    </a>
  );
}

/** 单期卡：可折叠，展开显示 5 个项目 */
function EpisodeCard({ episode, defaultOpen }: { episode: TrendingEpisode; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const totalStars = episode.projects.reduce((s, p) => s + p.stars, 0);

  return (
    <section className="mb-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-5"
      >
        {/* 期号徽章 */}
        <span className="shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/25 px-3 py-1.5 font-mono text-sm font-extrabold text-cyan-200 ring-1 ring-cyan-400/30">
          EP.{episode.episode}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold text-white sm:text-base">{episode.title}</h2>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2.5 text-[11px] text-slate-400">
            <span>{episode.projects.length} 个项目</span>
            <span>·</span>
            <span>{episode.date}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
              合计 {totalStars.toLocaleString('en-US')}
            </span>
          </p>
        </div>

        <span className="shrink-0 font-mono text-[11px] text-slate-500">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {open && (
        <div className="border-t border-white/[0.06] px-4 pb-5 pt-4 sm:px-5">
          {/* 期视频：16:9 B 站官方播放器内嵌 */}
          <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2 py-0.5 text-[11px] font-bold text-rose-200">
                <Tv className="h-3 w-3" />
                <span>第 {episode.episode} 期原视频</span>
              </span>
              {episode.episode === 135 && (
                <span className="text-[10px] text-slate-400">候选来源：IT咖啡馆《Github一周热点》第135期</span>
              )}
              <a
                href={episode.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-200"
              >
                <span>在 B 站打开 ({episode.bvid})</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://player.bilibili.com/player.html?bvid=${episode.bvid}&autoplay=0`}
                className="absolute top-0 left-0 h-full w-full"
                scrolling="no"
                frameBorder="no"
                allowFullScreen
                title={episode.title}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {episode.projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function GithubTrendingColumnPage() {
  const episodes = TRENDING_EPISODES;
  const totalProjects = episodes.reduce((s, e) => s + e.projects.length, 0);
  const totalStars = episodes.reduce(
    (s, e) => s + e.projects.reduce((x, p) => x + p.stars, 0),
    0
  );

  return (
    <div className="gh-dark-scope min-h-screen bg-[#080a0f] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← 返回首页
        </a>

        {/* 🌟 头部：华美渐变横幅 */}
        <header className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/60 via-slate-950/70 to-blue-950/50 p-6 sm:p-10">
          {/* 背景光斑 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
          {/* 网格纹理 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-400/30">
                <GitFork className="h-3.5 w-3.5" />
                <span>开源专栏</span>
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
                UP 主：{TRENDING_AUTHOR}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              GitHub 龙虎榜
              <span className="ml-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                逐周精选
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              GitHub 龙虎榜（原《GitHub 一周热点》）：每周按本周新增星标，只选真热前三。本站对每期项目真装真跑一遍 —— 跑通的出实操教程，装不动的如实降级为解读评估篇。
            </p>

            {/* 统计三连 */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { k: '已收录期数', v: `${episodes.length} 期`, s: 'EP.135 → EP.001（EP.89 官方未发布）' },
                { k: '项目卡片', v: `${totalProjects} 篇`, s: '每项目一页可读档案' },
                { k: '累计星标', v: totalStars.toLocaleString('en-US'), s: `数据日期 ${TRENDING_STARS_DATE}` },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm"
                >
                  <div className="text-[11px] font-medium text-slate-400">{x.k}</div>
                  <div className="mt-0.5 font-mono text-xl font-extrabold text-cyan-200">{x.v}</div>
                  <div className="mt-0.5 text-[10px] text-slate-500">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* 🌟 第 135 期置顶精选区块：龙虎榜本周真热前三 */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-950/70 via-slate-950/90 to-blue-950/70 p-6 shadow-xl sm:p-8">
          <div className="mb-4 flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-400/40">
                <Tv className="h-4 w-4" />
                <span>GitHub龙虎榜 · 第 135 期</span>
              </span>
              <span className="text-xs text-slate-400">
                出品方：<span className="font-semibold text-slate-200">代码咖啡馆 Code Cafe</span>
              </span>
            </div>
            <a
              href="https://www.bilibili.com/video/BV1omn26EEir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>在 B 站打开 (BV1omn26EEir)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* 左侧竖屏播放器容器（9:16 自适应居中） */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-black shadow-2xl">
                  <iframe
                    src="https://player.bilibili.com/player.html?bvid=BV1omn26EEir&autoplay=0"
                    className="absolute top-0 left-0 h-full w-full"
                    scrolling="no"
                    frameBorder="no"
                    allowFullScreen
                    title="GitHub龙虎榜第135期：本周真热前三"
                  />
                </div>
              </div>
            </div>

            {/* 右侧导读与三强项目卡链接 */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  本周真热前三 —— 第 135 期
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  按本周新增星标（而非总星标），从第 135 期的 5 个开源项目里严格筛选出真热前三：
                  <strong className="text-cyan-200">ArtCraft</strong> 两日新增 1,873 星夺冠；
                  <strong className="text-cyan-200">Anatomy</strong> 新增 1,618 星增速最快；
                  <strong className="text-cyan-200">PPT Master</strong> 总星标全场最高却因本周增速排在第三。逐个实测核查，全部免费开源。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <a
                  href="/tutorials/artcraft-ai-ide/"
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-cyan-400 hover:bg-white/[0.08]"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-cyan-300">冠军 · 新增 1,873 星</div>
                    <div className="mt-1 text-xs font-bold text-white group-hover:text-cyan-200">ArtCraft AI IDE</div>
                  </div>
                  <span className="mt-2 text-[10px] text-slate-400 group-hover:text-cyan-300">读实操教程 →</span>
                </a>

                <a
                  href="/tutorials/anatomy-isometric-skill/"
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-cyan-400 hover:bg-white/[0.08]"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-cyan-300">亚军 · 新增 1,618 星</div>
                    <div className="mt-1 text-xs font-bold text-white group-hover:text-cyan-200">Anatomy 等距图解</div>
                  </div>
                  <span className="mt-2 text-[10px] text-slate-400 group-hover:text-cyan-300">读实操教程 →</span>
                </a>

                <a
                  href="/tutorials/ppt-master-native-deck/"
                  className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all hover:border-cyan-400 hover:bg-white/[0.08]"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-cyan-300">季军 · 总星全场第一</div>
                    <div className="mt-1 text-xs font-bold text-white group-hover:text-cyan-200">PPT Master 原生PPT</div>
                  </div>
                  <span className="mt-2 text-[10px] text-slate-400 group-hover:text-cyan-300">读实操教程 →</span>
                </a>
              </div>

              <p className="text-xs text-slate-400">
                提示：下方可继续展开往期（第 135 期至第 1 期）全量归档及历史原视频。
              </p>
            </div>
          </div>
        </div>

        {/* 期数快选：移动端用 8 列网格，彻底避免横向溢出 */}
        <div className="mt-8 grid grid-cols-8 gap-2 sm:flex sm:flex-wrap">
          {episodes.map((e) => (
            <a
              key={e.episode}
              href={`#ep-${e.episode}`}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-center font-mono text-[11px] font-bold text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-700 sm:px-2.5 sm:text-left"
            >
              {e.episode}
            </a>
          ))}
        </div>
        {/* 期列表 */}
        <main className="mt-6">
          {episodes.map((e, i) => (
            <div key={e.episode} id={`ep-${e.episode}`} className="scroll-mt-20">
              <EpisodeCard episode={e} defaultOpen={i === 0} />
            </div>
          ))}
        </main>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <a
            href="/tutorials/"
            className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
          >
            ← 返回教程列表
          </a>
        </footer>
      </div>
    </div>
  );
}
