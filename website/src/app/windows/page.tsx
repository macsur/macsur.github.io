'use client';

import React from 'react';
import { WINDOWS_DESKTOP, WindowsItem, ZeroDegreeItem } from '@/data/windowsDesktop';

const GROUPS = ['优化与隐私', '安装与清理', '网络与浏览器', '文件与效率', '开发与工具链', '安全与排查'];
const ZERO_GROUPS = ['优化与设置', '下载工具', '互传、装机与维护'];

function deliveryText(item: WindowsItem) {
  return item.delivery;
}

function WindowsCard({ item }: { item: WindowsItem }) {
  return (
    <article className="google-card rounded-xl border border-white/[0.08] bg-[#0d1017]/80 p-4 shadow-lg shadow-black/30 transition-all hover:border-cyan-400/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 font-mono">{item.id}</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px]">
              {item.form}
            </span>
          </div>
          <h3 className="mt-2 text-base font-bold text-white">{item.name}</h3>
        </div>
        <span className={`shrink-0 px-2 py-1 rounded-md text-[11px] font-medium ${
          item.risk.includes('高') ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' : item.risk.includes('中') ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
        }`}>
          {item.risk.split('，')[0]}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.use}</p>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
        <div><span className="text-slate-500">来源：</span>{item.source}</div>
        <div><span className="text-slate-500">适用：</span>{item.os}</div>
        <div><span className="text-slate-500">管理员：</span>{item.admin}</div>
        <div><span className="text-slate-500">维护：</span>{item.maintenance}</div>
      </div>

      <div className="mt-3 rounded-lg bg-black/25 border border-white/[0.06] p-3 text-[11px] text-slate-400">
        <div className="font-medium text-slate-300">风险说明</div>
        <p className="mt-1 leading-relaxed">{item.risk}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">交付：{deliveryText(item)}</span>
        <a href={`https://github.com/${item.source.split('（')[0].trim()}`} target="_blank" rel="noreferrer" className="text-xs text-cyan-300 hover:text-cyan-200">查看上游</a>
      </div>
    </article>
  );
}

function ZeroCard({ item }: { item: ZeroDegreeItem }) {
  return (
    <article className="google-card rounded-xl border border-white/[0.08] bg-[#0d1017]/80 p-4 shadow-lg shadow-black/30 transition-all hover:border-amber-400/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono">{item.id}</span>
            {item.tag.includes('博主推荐') && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">博主推荐</span>
            )}
          </div>
          <h3 className="mt-2 text-base font-bold text-white">{item.name}</h3>
        </div>
        <span className="text-[11px] text-slate-400">{item.tag}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.use}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        <a href={item.blog} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">博客原文</a>
        {item.video && <a href={item.video} target="_blank" rel="noreferrer" className="text-rose-300 hover:text-rose-200">视频教程</a>}
        {item.source && <span className="text-slate-400">{item.source}</span>}
      </div>
      {item.note && <p className="mt-2 text-[11px] text-slate-500">{item.note}</p>}
    </article>
  );
}

export default function WindowsPage() {
  const windows = WINDOWS_DESKTOP.windows as unknown as WindowsItem[];
  const zero = WINDOWS_DESKTOP.zero as unknown as ZeroDegreeItem[];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100">
      <div className="fixed inset-0 google-ai-mesh pointer-events-none z-0" />
      <div className="fixed inset-0 google-subtle-grid pointer-events-none z-0" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="mb-8">
          <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">← 返回首页</a>
          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Windows 桌面专区</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">独立收录 Win10 / Win11 桌面可用的高价值脚本与工具，与 Linux 服务器线并行，不混编编号与入口。</p>
        </header>

        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
            {WINDOWS_DESKTOP.fixedRiskNotice}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">正选 35 条</h2>
          {GROUPS.map(group => {
            const items = windows.filter(item => item.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-10">
                <h3 className="mb-3 text-lg font-semibold text-cyan-300">{group}</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map(item => <WindowsCard key={item.id} item={item} />)}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-white">零度解说推荐</h2>
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-400">
            闭源条目带「博主推荐」标签。此为零度解说的个人推荐，本站未做代码审计，下载请认准官方渠道。
          </div>
          <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5">
            <div className="text-xs text-amber-300/80">特别推荐</div>
            <h3 className="mt-2 text-xl font-bold text-white">Windows 10/11 优化天花板</h3>
            <a href="https://www.youtube.com/watch?v=HSn9E31L4gc" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-cyan-300 hover:text-cyan-200">观看视频教程</a>
          </div>
          {ZERO_GROUPS.map(group => {
            const items = zero.filter(item => item.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-10">
                <h3 className="mb-3 text-lg font-semibold text-amber-300">{group}</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map(item => <ZeroCard key={item.id} item={item} />)}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

