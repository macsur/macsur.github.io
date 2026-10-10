'use client';

import React from 'react';

export function scrollToPosition(target: 'top' | 'middle' | 'bottom') {
  if (typeof window === 'undefined') return;
  const docHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
  const top = target === 'top' ? 0 : target === 'bottom' ? docHeight : docHeight / 2;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function FloatingScrollDots() {
  return (
    <nav
      aria-label="页面快速定位"
      className="fixed bottom-4 right-3 z-[70] flex flex-col items-center gap-3"
    >
      <button
        type="button"
        onClick={() => scrollToPosition('top')}
        title="回到页面顶部"
        aria-label="回到页面顶部"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/75 text-[10px] text-cyan-300 shadow-lg shadow-black/30 backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-slate-800/80 active:scale-95"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => scrollToPosition('middle')}
        title="回到页面中间"
        aria-label="回到页面中间"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/75 text-[10px] text-cyan-300 shadow-lg shadow-black/30 backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-slate-800/80 active:scale-95"
      >
        ◉
      </button>
      <button
        type="button"
        onClick={() => scrollToPosition('bottom')}
        title="直达页面底部"
        aria-label="直达页面底部"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/75 text-[10px] text-cyan-300 shadow-lg shadow-black/30 backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400/50 hover:bg-slate-800/80 active:scale-95"
      >
        ↓
      </button>
    </nav>
  );
}
