'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Star, 
  ExternalLink, 
  Cpu, 
  ShieldCheck, 
  Globe, 
  Database, 
  Bot, 
  Server,
  Zap,
  FolderGit2,
  Flame,
  GitFork,
  TrendingUp,
  Clock,
  Play,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { CATEGORIES, BUILTIN_APPS, AppItem, Category } from '@/data/appsData';
import { GITHUB_TRENDING_APPS, LAST_UPDATED_AT, GithubTrendingRepo } from '@/data/trendingData';
import { DAILY_RECOMMEND } from '@/data/dailyRecommend';
import { EASTER_EGG_ITEMS, EasterEggItem } from '@/data/easterEggData';
import { isHolidayToday } from '@/data/holidays';

interface RecommendedAppItem {
  id: number;
  cmd: string;
  badge: string;
  name: string;
  category: string;
  stars: string;
  highlight: string;
  reason: string;
}

// 动态按需加载 confetti 特效库，降低首屏 Bundle 体积
import type { Options as ConfettiOptions } from 'canvas-confetti';
const fireConfetti = async (options?: ConfettiOptions) => {
  try {
    const confettiModule = (await import('canvas-confetti')).default;
    return confettiModule(options);
  } catch (err) {
    console.error('Failed to load confetti module', err);
  }
};

export default function Home() {
  // 主题模式：'dark'（默认极客流光暗黑模式）或 'light'（清爽科技白昼模式）
  // 🌟 【今日推荐】精选 3 款极力推荐的一键部署应用（由 AI 原创精选 & 深度实测）
  // 🌟 【今日推荐】TOP 3 数据由构建时 generate_daily_recommend.js 每日生成
  // 内容铁律：上游有新应用时优先打新上榜，无新内容时随机抽取，每日构建刷新
  const recommendedApps: RecommendedAppItem[] = DAILY_RECOMMEND;
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true);
  const [heroVideoIdx, setHeroVideoIdx] = useState(0);

  // 宣传片多视频源轮播配置
  const heroVideos = useMemo(() => [
    {
      title: '10s 品牌片 (v7)',
      poster: '/ads/ad-oneclick-girl-16x9-poster.jpg',
      sources: [
        { media: '(max-width: 768px)', src: '/ads/ad-oneclick-girl-9x16-10s-v7-final.mp4' },
        { media: '', src: '/ads/ad-oneclick-girl-16x9-10s-v7-final.mp4' }
      ]
    },
    {
      title: '30s 品牌片 (女神版)',
      poster: '/ads/linux-brand-girl-30s-poster.jpg',
      sources: [
        { media: '', src: '/ads/linux-brand-girl-30s-final.mp4' }
      ]
    },
    {
      title: '30s 品牌片 (极客版)',
      poster: '/ads/linux-v2-30s-poster.jpg',
      sources: [
        { media: '', src: '/ads/linux-v2-30s-finalC.mp4' }
      ]
    }
  ], []);

  // 视频自然播完切换下一张
  const handleHeroVideoEnded = () => {
    setHeroVideoIdx((prev) => (prev + 1) % heroVideos.length);
  };

  useEffect(() => {
    const video = heroVideoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }, [heroVideoIdx]);

  // 🎯 Hero 广告语轮播 (12条文案，每4秒轮播一次，淡入淡出)
  const heroSlogans = useMemo(() => [
    '终端之美，效率之诗',
    '极简之美，一键即达',
    '运维的艺术，极客的浪漫',
    '工具箱在手，运维不愁',
    '少点点击，多点掌控',
    '不装面板，不将就',
    '一行命令，万事俱备',
    '把复杂留给脚本，把优雅留给你',
    '省下的时间，拿去写诗',
    '从裸机到就绪，只差一条命令',
    '重装不求人，部署不熬夜',
    '开箱即用，开箱即酷'
  ], []);
  const [sloganIdx, setSloganIdx] = useState(0);
  const [sloganFade, setSloganFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganFade(false);
      setTimeout(() => {
        setSloganIdx((prev) => (prev + 1) % heroSlogans.length);
        setSloganFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlogans.length]);

  // 主题模式状态机：'auto' | 'light' | 'dark'，默认 'auto'
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>('auto');
  // 实际生效的展示样式：'dark' | 'light'
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  // 计算当前北京时间 (UTC+8) 应该处于白天还是黑夜 (06:00-17:59 白天，其余黑夜)
  const getBeijingAutoTheme = useCallback((): 'light' | 'dark' => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const bjHour = new Date(utc + 8 * 3600000).getHours();
    return bjHour >= 6 && bjHour < 18 ? 'light' : 'dark';
  }, []);

  // 应用主题到 DOM 并同步状态
  const applyTheme = useCallback((mode: 'auto' | 'light' | 'dark') => {
    setThemeMode(mode);
    const resolved: 'light' | 'dark' = mode === 'auto' ? getBeijingAutoTheme() : mode;
    setActiveTheme(resolved);
    if (resolved === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [getBeijingAutoTheme]);

  // 初始化读取本地偏好
  useEffect(() => {
    const saved = localStorage.getItem('theme_preference') as 'dark' | 'light' | null;
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      applyTheme('auto');
    }
  }, [applyTheme]);
  useEffect(() => {
    if (themeMode !== 'auto') return;
    const interval = setInterval(() => {
      const currentAuto = getBeijingAutoTheme();
      if (currentAuto !== activeTheme) {
        applyTheme('auto');
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [themeMode, activeTheme, applyTheme, getBeijingAutoTheme]);

  // ① Logo 点击手动切换（白天/黑夜互切，写入 localStorage）
  const toggleTheme = () => {
    const next: 'light' | 'dark' = activeTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme_preference', next);
    applyTheme(next);
  };

  // ② "🕐 跟随时间"小按钮（清除手动记录，回到自动）
  const resetToAutoTheme = () => {
    localStorage.removeItem('theme_preference');
    applyTheme('auto');
  };

  // 宣传片默认静音自动播放；用户点击右下角小喇叭后取消静音听到标语
  const toggleHeroVideoAudio = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsHeroVideoMuted(nextMuted);
    if (!nextMuted) {
      video.play().catch(() => {
        video.muted = true;
        setIsHeroVideoMuted(true);
      });
    }
  };

  // 换算北京时间展示友好更新标签（如 "今日 03:00 已更新"）；法定节假日期间提示为假日更新
  const updateBadgeText = useMemo(() => {
    const holidayPrefix = isHolidayToday() ? '假日' : '今日';
    if (!LAST_UPDATED_AT) return `${holidayPrefix}已更新`;

    const match = LAST_UPDATED_AT.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
    if (!match) return `${holidayPrefix}已更新`;

    const [, year, month, day, hour, minute] = match;
    const now = new Date();
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
    const bjNow = new Date(utcNow + 8 * 3600000);
    const bjYear = bjNow.getFullYear();
    const bjMonth = String(bjNow.getMonth() + 1).padStart(2, '0');
    const bjDay = String(bjNow.getDate()).padStart(2, '0');

    if (parseInt(year, 10) === bjYear && month === bjMonth && day === bjDay) {
      return `${holidayPrefix} ${hour}:${minute} 已更新`;
    }
    return `${month}-${day} ${hour}:${minute} 已更新`;
  }, []);

  // 安装命令源切换 (默认推荐 zttz.eu.org 专属增强版)
  const [installSource] = useState<'enhanced'>('enhanced');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // 搜索关键字与星标过滤
  const [searchKeyword, setSearchKeyword] = useState('');
  const [onlyStar, setOnlyStar] = useState(false);

  // 整个应用生态大厅总主折叠状态 (默认全局折叠，不点击不展示也不打开)
  const [isMasterMarketOpen, setIsMasterMarketOpen] = useState(false);

  // 🌟 [Github乐园] 总主折叠状态 (默认全局折叠，点击展开呈现炫酷粒子流光与礼花彩蛋特效)
  const [isGithubParkOpen, setIsGithubParkOpen] = useState(false);
  const [hasCelebratedPark, setHasCelebratedPark] = useState(false);
  const [isParkShockwaveActive, setIsParkShockwaveActive] = useState(false);
  const [parkBurstParticles, setParkBurstParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

  // 💥 点击展开炸裂特效状态
  const [isShockwaveActive, setIsShockwaveActive] = useState(false);
  const [burstParticles, setBurstParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

  // 🎆 隐蔽彩蛋状态 (✦ 量子礼花 · 猜你喜欢 ✦：6个固定精选友情链接 + 3个来自 VPNGate L2TP/IPsec 优质节点)
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [copiedEasterId, setCopiedEasterId] = useState<number | null>(null);

  // 彩蛋数据：6个固定精选链接 + 3个来自 VPNGate 的 L2TP/IPsec 节点
  const easterEggItems: EasterEggItem[] = useMemo(() => EASTER_EGG_ITEMS, []);

  // 键盘 ESC 监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowEasterEgg(false);
      }
    };
    if (showEasterEgg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showEasterEgg]);

  // 播放彩蛋数据礼花专属音效
  const playEasterEggAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      
      // 升空哨音
      const whistle = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(280, now);
      whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      whistleGain.gain.setValueAtTime(0.25, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      whistle.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      whistle.start(now);
      whistle.stop(now + 0.22);

      // 水晶礼花爆裂高音
      const burstOsc = ctx.createOscillator();
      const burstGain = ctx.createGain();
      burstOsc.type = 'triangle';
      burstOsc.frequency.setValueAtTime(980, now + 0.18);
      burstOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.28);
      burstOsc.frequency.exponentialRampToValueAtTime(520, now + 0.6);
      burstGain.gain.setValueAtTime(0.3, now + 0.18);
      burstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      burstOsc.connect(burstGain);
      burstGain.connect(ctx.destination);
      burstOsc.start(now + 0.18);
      burstOsc.stop(now + 0.65);
    } catch {}
  };

  // 复制彩蛋条目并给予即时反馈
  const handleCopyEasterEggItem = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedEasterId(id);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {}
    setTimeout(() => {
      setCopiedEasterId(null);
    }, 2200);
  };

  // 触发彩蛋
  const triggerEasterEgg = () => {
    setShowEasterEgg(true);
    playEasterEggAudio();
    // 释放专属“星芒粒子礼花”
    fireConfetti({
      particleCount: 90,
      spread: 360,
      startVelocity: 38,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#ffffff'],
      shapes: ['star', 'circle'],
      ticks: 220,
      gravity: 0.65,
      zIndex: 100000
    });
  };

  // 纯原生 Web Audio 极客科幻跃迁充能音效 (零外部资源加载，0ms延迟)
  const playSciFiAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      // 1. 低频跃迁次声 (Sub-bass rumble)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(75, now);
      subOsc.frequency.exponentialRampToValueAtTime(260, now + 0.35);
      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.4);

      // 2. 高频光子脉冲能量谐波 (Photon shimmer)
      const shimmerOsc = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmerOsc.type = 'triangle';
      shimmerOsc.frequency.setValueAtTime(420, now + 0.05);
      shimmerOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.32);
      shimmerGain.gain.setValueAtTime(0.15, now + 0.05);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmerOsc.start(now + 0.05);
      shimmerOsc.stop(now + 0.45);
    } catch {
      // 忽略音频权限拦截
    }
  };

  // 生成粒子爆炸效果
  const triggerExplosion = (isPark = false) => {
    const colors = isPark
      ? ['#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#fbbf24', '#f97316']
      : ['#06b6d4', '#818cf8', '#10b981', '#f59e0b', '#ec4899', '#38bdf8', '#a855f7'];
    const count = 42;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 100 + Math.random() * 200;
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3
      });
    }
    if (isPark) {
      setParkBurstParticles(newParticles);
      setTimeout(() => {
        setParkBurstParticles([]);
      }, 1100);
    } else {
      setBurstParticles(newParticles);
      setTimeout(() => {
        setBurstParticles([]);
      }, 1100);
    }
  };

  // 记录是否已经触发过首次满屏大礼花
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // 🎆 节日专属满屏盛大烟花礼炮 (只在法定节假日期间触发，平时仅有超新星粒子冲击波与跃迁音效)
  const triggerGrandFireworks = () => {
    // 严守规则：只在法定节假日期间放礼花，平日不放
    if (!isHolidayToday()) return;

    // 1. 中央主礼炮炸裂
    fireConfetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#f59e0b', '#a855f7', '#10b981', '#ec4899', '#38bdf8'],
      disableForReducedMotion: true,
      zIndex: 9999
    });

    // 2. 左右两侧对冲加农炮齐射 (持续 2.5 秒)
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      fireConfetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#06b6d4', '#38bdf8', '#818cf8', '#f59e0b'],
        zIndex: 9999
      });
      fireConfetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ec4899', '#a855f7', '#10b981', '#f59e0b'],
        zIndex: 9999
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // 展开/收起【Github乐园】总折叠 (伴随量子彩蛋礼花、粒子冲击波与科幻跃迁音效)
  const handleToggleGithubPark = () => {
    if (!isGithubParkOpen) {
      if (!hasCelebratedPark) {
        setHasCelebratedPark(true);
        triggerGrandFireworks();
      }
      setIsParkShockwaveActive(true);
      triggerExplosion(true);
      playSciFiAudio();
      setTimeout(() => setIsParkShockwaveActive(false), 1200);
      setIsGithubParkOpen(true);
    } else {
      setIsGithubParkOpen(false);
    }
  };

  // 展开/收起生态大厅总折叠 (第一次打开满屏大礼花，第二次打开保持现有超新星粒子设计)
  const handleToggleMasterMarket = () => {
    if (!isMasterMarketOpen) {
      if (!hasCelebrated) {
        // 🎆 第一次打开：满屏超级大礼花
        setHasCelebrated(true);
        triggerGrandFireworks();
      }
      // 无论是第一次还是第二次打开，均伴随原有的赛博粒子爆炸、能量冲击波与跃迁音效
      setIsShockwaveActive(true);
      triggerExplosion();
      playSciFiAudio();
      setTimeout(() => setIsShockwaveActive(false), 1200);
      setIsMasterMarketOpen(true);
    } else {
      setIsMasterMarketOpen(false);
    }
  };

  // 导航栏跳转并触发特效展开
  const handleOpenMarketFromNav = () => {
    if (!isMasterMarketOpen) {
      handleToggleMasterMarket();
    }
  };

  const handleOpenGithubParkFromNav = () => {
    if (!isGithubParkOpen) {
      handleToggleGithubPark();
    }
  };

  // 手风琴分类展开状态 (默认全部折叠)
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  // 复制文本辅助函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // 安装命令
  const installCommands = {
    enhanced: 'bash <(curl -sL https://zttz.eu.org/z)',
  };

  // 常用指令列表
  const quickCommands = [
    { cmd: 'k', desc: '启动 Linux 百宝箱主控制面板' },
    { cmd: 'k app', desc: '直接呼出智能应用市场' },
    { cmd: 'k app 57', desc: '一键部署 DeepSeek AI 大模型' },
    { cmd: 'k bbr3', desc: 'BBRv3 内核与网络调优' },
    { cmd: 'k clean', desc: '一键深度清理系统冗余缓存' },
    { cmd: 'k dd', desc: '纯净版 Linux 系统一键重装' },
    { cmd: 'k backup', desc: '全自动 Docker 数据备份' },
    { cmd: 'k update', desc: '无缝更新工具箱至最新版本' }
  ];

  // 筛选应用
  const filteredApps = useMemo(() => {
    return BUILTIN_APPS.filter(app => {
      const matchKeyword = 
        !searchKeyword || 
        app.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        app.desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        app.alias.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        app.id.toString() === searchKeyword.trim();
      
      const matchStar = !onlyStar || app.isStar;

      return matchKeyword && matchStar;
    });
  }, [searchKeyword, onlyStar]);

  // 按分类对过滤后的应用进行分组
  const appsByCategory = useMemo(() => {
    const map: Record<string, AppItem[]> = {};
    for (const cat of CATEGORIES) {
      map[cat.id] = [];
    }
    for (const app of filteredApps) {
      if (map[app.category]) {
        map[app.category].push(app);
      }
    }
    return map;
  }, [filteredApps]);

  // 手风琴切换 (独占式：点击新分类折叠其他；点击已展开分类则收起)
  const toggleCategory = (catId: string) => {
    setExpandedCat(prev => prev === catId ? null : catId);
  };

  const expandAll = () => {
    setExpandedCat('ALL');
  };

  const collapseAll = () => {
    setExpandedCat(null);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300 ${
      activeTheme === 'dark' ? 'bg-[#090a0f] text-slate-100' : 'bg-[#f6f8fb] text-slate-800'
    }`}>
      {/* Google AI 极光科技流体背景 */}
      <div className="fixed inset-0 google-ai-mesh pointer-events-none z-0" />
      <div className="fixed inset-0 google-subtle-grid pointer-events-none z-0" />

      {/* 核心内容视口 (位于光效与网格之上的景深层) */}
      <div className="relative z-10">
        {/* 顶部导航 */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
          activeTheme === 'dark' ? 'bg-[#090a0f]/80 border-white/[0.08]' : 'bg-[#f6f8fb]/85 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 点击左上角 Logo 实现白天/夜间主题切换，带有轻微点击反馈与模式指示器 */}
              <div
                onClick={toggleTheme}
                title={activeTheme === 'dark' ? '点击切换为清新白天模式 ☀️' : '点击切换为默认极客暗黑模式 🌙'}
                className="relative group cursor-pointer"
              >
                <img
                  src="/logo.png"
                  alt="Linux 百宝箱 zttz.eu.org"
                  className="w-10 h-10 rounded-full shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/40 group-hover:scale-110 group-active:scale-95 transition-all object-cover"
                />
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-transparent flex items-center justify-center text-[8px] transition-all ${
                  activeTheme === 'dark' ? 'bg-amber-400 text-slate-950 ring-2 ring-[#090a0f]' : 'bg-blue-600 text-white ring-2 ring-white'
                }`}>
                  {activeTheme === 'dark' ? '🌙' : '☀️'}
                </span>
              </div>
              <div onClick={toggleTheme} className="cursor-pointer select-none">
                <span className={`font-bold text-lg tracking-wider transition-colors ${
                  activeTheme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Linux 百宝箱</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
                  activeTheme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
                }`}>v4.5.10</span>
              </div>
              {/* 跟随时间自动模式指示器与恢复按钮 */}
              <button
                onClick={resetToAutoTheme}
                title={themeMode === 'auto' ? '当前已跟随北京时间自动切换 (06:00~18:00 白天，其余夜晚)' : '点击恢复为跟随北京时间自动切换'}
                className={`ml-1 flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  themeMode === 'auto'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{themeMode === 'auto' ? '跟随时间' : '恢复自动'}</span>
              </button>
            </div>

            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
              <a href="#install" className="text-slate-300 hover:text-cyan-400 transition-colors">一键安装</a>
              <a href="#apps" onClick={handleOpenMarketFromNav} className="text-slate-300 hover:text-cyan-400 transition-colors">应用市场 (160+)</a>
              <a href="#commands" className="text-slate-300 hover:text-cyan-400 transition-colors">常用指令</a>
              <a href="#github-park" onClick={handleOpenGithubParkFromNav} className="text-slate-300 hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>GitHub乐园</span>
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <a 
                href="https://github.com/macsur/macsur.github.io" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-all hover:border-slate-500"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub</span>
              </a>
              <a 
                href="#install" 
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-white shadow-md shadow-cyan-500/25 transition-all"
              >
                立即使用
              </a>
            </div>
          </div>
        </header>

        {/* Hero 区域 */}
        <section id="install" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
          {/* 首屏定位胶囊 */}
          <div className="inline-flex items-center google-pill mb-8 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2.5 shadow-sm shadow-emerald-400/50" />
            <span className="text-xs text-slate-300 font-medium tracking-wide flex items-center">
              <span className="text-cyan-400 font-semibold">Linux 百宝箱</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3">
            <span className="block text-gradient-gemini font-extrabold tracking-tight">
              一键脚本，爱上 Linux
            </span>
          </h1>

          {/* 🎯 Hero 广告语轮播（情绪层） */}
          <div className="h-6 mb-4 flex items-center justify-center select-none">
            <span
              className={`text-xs sm:text-sm font-medium tracking-wider text-cyan-400/80 transition-opacity duration-500 ease-in-out ${
                sloganFade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              ✦ {heroSlogans[sloganIdx]} ✦
            </span>
          </div>

          {/* 🎬 Hero 宣传片：手机竖屏、桌面横屏，标语使用 HTML 浮层 */}
          <div className="max-w-4xl mx-auto mb-8 google-card p-3 border border-cyan-500/25 shadow-xl shadow-cyan-950/30 overflow-hidden group hover:border-cyan-400/40 transition-colors text-left">
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/[0.08]">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="text-[11px] text-slate-300 font-semibold tracking-wide">一键脚本 · 爱上 Linux</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">
                  {heroVideos[heroVideoIdx].title}
                </span>
                {/* 小圆点指示器 */}
                <div className="flex items-center space-x-1.5 ml-2">
                  {heroVideos.map((item, idx) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setHeroVideoIdx(idx)}
                      title={`切换至第 ${idx + 1} 个视频`}
                      aria-label={`切换至第 ${idx + 1} 个视频`}
                      className={`w-2 h-2 rounded-full transition-all ${
                        heroVideoIdx === idx ? 'bg-cyan-400 w-4' : 'bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden bg-[#0A0F1E] border border-slate-800/80 aspect-[9/16] md:aspect-video flex items-center justify-center">
              <video
                ref={heroVideoRef}
                autoPlay
                muted={isHeroVideoMuted}
                playsInline
                preload="metadata"
                poster={heroVideos[heroVideoIdx].poster}
                onEnded={handleHeroVideoEnded}
                className="w-full h-full object-contain md:object-cover"
                aria-label="一键脚本，爱上 Linux 首页宣传片"
              >
                {heroVideos[heroVideoIdx].sources.map((srcItem, sIdx) => (
                  <source
                    key={sIdx}
                    {...(srcItem.media ? { media: srcItem.media } : {})}
                    src={srcItem.src}
                    type="video/mp4"
                  />
                ))}
              </video>

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-slate-950/45" />
              <div className="absolute left-4 right-16 bottom-4 sm:left-6 sm:bottom-6 pointer-events-none">
                <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]">
                  一键脚本，爱上 Linux
                </p>
                <p className="mt-1 text-xs sm:text-sm text-cyan-100/90 font-medium tracking-wide drop-shadow">
                  从害怕终端，到离不开终端
                </p>
              </div>
              <button
                type="button"
                onClick={toggleHeroVideoAudio}
                title={isHeroVideoMuted ? '点击打开声音，听“一键脚本，爱上 Linux”' : '点击静音'}
                aria-label={isHeroVideoMuted ? '打开宣传片声音' : '静音宣传片'}
                className="absolute right-4 bottom-4 sm:right-5 sm:bottom-5 p-2.5 rounded-full bg-slate-950/75 hover:bg-cyan-500/90 text-white border border-white/15 hover:border-cyan-300/70 backdrop-blur-md shadow-lg shadow-black/40 transition-all active:scale-95"
              >
                {isHeroVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="mt-2 px-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate mr-2">复制一条命令，让终端自动搞定服务器</span>
              <span className="font-mono text-cyan-400 shrink-0">10s 循环</span>
            </div>
          </div>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
            第一次打开终端，大多数人的反应都是：关掉它。别怕——这里没有要背的命令，只有一条复制粘贴就能跑的一键脚本。系统重装、BBR 加速、Docker 部署、160+ 应用安装，全在终端里自动搞定。等你发现原来这么简单，Linux 就从“不敢碰”变成了“离不开”。
          </p>

          {/* 终端模拟一键安装框 */}
          <div className="max-w-2xl mx-auto google-card p-6 shadow-2xl shadow-black/60 border border-white/10 text-left">
            {/* 终端顶部操作栏 */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 font-mono ml-2">bash ~ terminal</span>
              </div>

              {/* 节点切换 */}
              <div className="flex items-center space-x-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-xs">
                <button
                  className="px-2.5 py-1 rounded-md transition-all font-medium flex items-center space-x-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                >
                  <span>🌟一键安装</span>
                </button>
              </div>
            </div>

            {/* 命令行与复制按钮 */}
            <div className="relative group">
              <div className={`p-4 rounded-xl border font-mono text-sm sm:text-base flex items-center justify-between overflow-x-auto shadow-inner transition-colors duration-300 ${
                activeTheme === 'dark' ? 'bg-[#090b10] border-white/[0.08] text-blue-300' : 'bg-slate-50 border-slate-200 text-blue-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 select-none font-bold">$</span>
                  <span className="select-all font-semibold">{installCommands[installSource]}</span>
                </div>
                <button
                  onClick={() => handleCopy(installCommands[installSource])}
                  className="ml-4 shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm active:scale-95"
                >
                  {copiedText === installCommands[installSource] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span>✨ 提示：安装后在任何终端输入快捷指令 <code className="px-1.5 py-0.5 bg-slate-800 text-cyan-300 rounded font-mono">k</code> 即可启动主控制台</span>
              <span className="font-mono text-slate-500">100% Free & Open Source</span>
            </div>
          </div>
      </section>

      {/* 快捷命令直达字典与终端演示动画 */}
      <section id="commands" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>常用指令</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">在安装完成后，无需进入层层菜单，输入子指令秒级直达</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左侧：8 个常用快捷指令卡片 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickCommands.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCopy(item.cmd)}
                className="google-card p-4 border border-white/[0.08] cursor-pointer group relative"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-sm font-semibold text-cyan-400 group-hover:text-cyan-300">
                    {item.cmd}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-700 rounded text-slate-300">
                    {copiedText === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className={`text-xs leading-relaxed transition-colors ${activeTheme === "dark" ? "text-slate-400" : "text-slate-800 font-medium"}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 右侧：单卡片展示（终端操作演示动画「怎么用」· 保持原位置，布局自然上提） */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="google-card p-3 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden group">
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/[0.08]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[11px] text-slate-400 font-mono ml-1.5">terminal · demo</span>
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  <Play className="w-2.5 h-2.5 fill-emerald-400" />
                  <span>操作演示</span>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-[#0d1017] border border-slate-800/80 aspect-[960/560]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/hero-terminal-demo.gif"
                >
                  <source src="/hero-terminal-demo.mp4" type="video/mp4" />
                  {/* 降级备用图片 */}
                  <img src="/hero-terminal-demo.gif" alt="终端操作演示动画" className="w-full h-full object-cover" />
                </video>
              </div>
              <div className="mt-2 px-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>三幕流程：一键安装 → 呼出 k → 直达常用与分类</span>
                <span className="font-mono text-cyan-400">11.4s 循环</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 🌟 【今日推荐】专区：精选本站极力推荐使用的 3 款一键部署神作 */}
      <section id="daily-recommend" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className={`relative rounded-3xl p-6 sm:p-10 border transition-colors duration-300 backdrop-blur-2xl shadow-2xl overflow-hidden ${
          activeTheme === "dark" ? "border-white/10 bg-[#0e111a]/80 shadow-black/50" : "border-slate-200/90 bg-white/90 shadow-slate-200/60"
        }`}>
          {/* 背景装饰辉光 */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* 专区标题头 */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>每日甄选 · 极力推荐 · 经过实战高频检验</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center space-x-3">
                <span>【今日推荐】</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  顶级神作 一键部署 TOP 3
                </span>
              </h2>
              <p className={`text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed transition-colors ${
                activeTheme === "dark" ? "text-slate-400" : "text-slate-700 font-medium"
              }`}>
                从本站 160+ 现代化应用库与 Linux 百宝箱中精选出的 3 款必装神器。由 AI 原创深度解读架构特色与实战推荐理由，开箱即用，装机首选。
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 font-mono flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>动态算法实时精选</span>
              </span>
            </div>
          </div>

          {/* 3款推荐卡片 */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendedApps.map((app, idx) => (
              <div
                key={idx}
                className="google-card p-6 border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-xs font-semibold tracking-wide">
                      {app.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ★ {app.stars}
                    </span>
                  </div>

                  <h3 className={`font-bold text-base mb-2 transition-colors ${activeTheme === "dark" ? "text-white group-hover:text-blue-400" : "text-slate-950 font-extrabold group-hover:text-blue-600"}`}>
                    {app.name}
                  </h3>

                  <div className="text-[11px] text-slate-400 mb-3 flex items-center space-x-1">
                    <span>分类：</span>
                    <span className="font-medium text-slate-300">{app.category}</span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 text-justify min-h-[50px] transition-colors ${activeTheme === "dark" ? "text-slate-300" : "text-slate-900 font-medium"}`}>
                    {app.highlight}
                  </p>

                  <div className={`p-3 rounded-xl mb-4 text-xs transition-colors duration-300 border ${
                    activeTheme === "dark" ? "bg-slate-900/60 border-slate-800/80" : "bg-slate-50 border-slate-200"
                  }`}>
                    <span className="text-blue-400 font-bold block mb-1">💡 推荐理由：</span>
                    <span className={`leading-relaxed ${activeTheme === "dark" ? "text-slate-400" : "text-slate-800 font-medium"}`}>{app.reason}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1 font-mono text-xs text-slate-400 overflow-hidden">
                    <span className="text-blue-400 font-bold">$</span>
                    <span className="truncate text-blue-300">{app.cmd}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(app.cmd)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm active:scale-95 flex items-center space-x-1"
                  >
                    {copiedText === app.cmd ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>一键部署</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 手风琴应用市场大厅 (全折叠为一个大折叠栏目，不点击不展示也不打开 · 伴随炸裂展开动效) */}
      <section id="apps" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
        {/* 💥 粒子炸裂超新星容器 */}
        {burstParticles.length > 0 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none z-50">
            {burstParticles.map(p => (
              <span
                key={p.id}
                className="absolute rounded-full shadow-lg pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 14px ${p.color}, 0 0 26px ${p.color}`,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out',
                  opacity: 0.95
                }}
              />
            ))}
          </div>
        )}

        {/* 动态激光边框外壳 (展开状态下高速彩色激光流光环绕 + 冲击波脉冲) */}
        <div className={`relative rounded-3xl p-[2px] transition-all duration-500 overflow-hidden ${
          isMasterMarketOpen 
            ? 'shadow-2xl shadow-cyan-500/25 ring-1 ring-cyan-400/40' 
            : 'border border-slate-800/90 hover:border-cyan-500/30'
        } ${isShockwaveActive ? 'animate-shockwave' : ''}`}>

          {/* 展开时的高速激光扫掠底层 */}
          {isMasterMarketOpen && (
            <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#06b6d4,#818cf8,#ec4899,#10b981,#06b6d4)] animate-laser-rotate opacity-75 pointer-events-none blur-sm" />
          )}

          {/* 主体卡片面板 */}
          <div className={`relative google-card rounded-3xl overflow-hidden z-10 transition-all duration-300 border ${
            activeTheme === "dark" ? "bg-[#0c0e17]/95 border-white/[0.08]" : "bg-white/95 border-slate-200 shadow-lg shadow-slate-200/50"
          }`}>
            {/* 展开瞬间的全息激光扫描光束 */}
            {isShockwaveActive && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 via-sky-300 to-transparent blur-xs shadow-[0_0_24px_#06b6d4] z-40 pointer-events-none animate-holo-scan" />
            )}

            {/* 大折叠总栏目头部 (默认展示，点击展开/收起全部内容) */}
            <div
              onClick={handleToggleMasterMarket}
              className={`p-6 sm:p-8 cursor-pointer hover:bg-slate-900/50 transition-all select-none flex flex-col md:flex-row md:items-center justify-between gap-6 group ${
                isShockwaveActive ? 'animate-cyber-flash' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-5 flex-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isMasterMarketOpen
                    ? 'bg-gradient-to-tr from-cyan-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-400/30 scale-105'
                    : 'bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-105'
                }`}>
                  <Layers className={`w-7 h-7 transition-transform duration-300 ${isMasterMarketOpen ? 'rotate-90' : ''}`} />
                </div>
                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      isMasterMarketOpen
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-400/20'
                        : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                    }`}>
                      {isMasterMarketOpen ? '⚡ QUANTUM CORE ONLINE' : 'App Marketplace 4.0'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs">
                      8 个应用分类 · 160+ 应用
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                      一键快速部署
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-center sm:justify-start space-x-2.5">
                    <span>工具箱 · 应用市场</span>
                    {isMasterMarketOpen && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 animate-pulse">
                        已激活
                      </span>
                    )}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                    涵盖服务器面板、AI大模型、探针监控、私有云盘等全景生态。默认全收纳折叠，点击展开浏览。
                  </p>
                </div>
              </div>

              {/* 展开/折叠状态指示器按钮 */}
              <div className="flex items-center justify-center shrink-0 self-center">
                <button
                  type="button"
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-md ${
                    isMasterMarketOpen
                      ? 'bg-slate-900 border border-cyan-500/50 text-cyan-300 shadow-cyan-500/20'
                      : 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-300 group-hover:border-cyan-400 group-hover:text-white shadow-cyan-500/10'
                  }`}
                >
                  <span>{isMasterMarketOpen ? '收起应用市场' : '点击展开应用市场'}</span>
                  {isMasterMarketOpen ? (
                    <ChevronDown className="w-4 h-4 text-cyan-400 transform rotate-180 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform animate-bounce" />
                  )}
                </button>
              </div>
            </div>

          {/* 当且仅当点击展开后，才展示内部所有搜索栏与8个应用分类列表 */}
          {isMasterMarketOpen && (
            <div className="p-6 sm:p-8 pt-2 border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
              {/* 搜索与快捷控制栏 */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
                {/* 搜索输入框 */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="搜索应用名称、编号(如 57)、功能..." 
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchKeyword && (
                    <button 
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 筛选按钮组 */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  {/* 节日专属：仅在法定节假日开放「放礼花」按钮 */}
                  {isHolidayToday() && (
                    <button
                      onClick={() => {
                        triggerGrandFireworks();
                        playSciFiAudio();
                      }}
                      title="节日专属：触发满屏礼花"
                      className="flex items-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 bg-slate-900/60 transition-all shadow-sm active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:text-cyan-300" />
                      <span>放礼花</span>
                    </button>
                  )}

                  <button
                    onClick={() => setOnlyStar(!onlyStar)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      onlyStar 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${onlyStar ? 'text-amber-400 fill-amber-400' : ''}`} />
                    <span>精选星标应用</span>
                  </button>

                  <button
                    onClick={expandAll}
                    className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    全部展开
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    全部折叠
                  </button>
                </div>
              </div>

              {/* 手风琴分类列表 */}
              <div className="space-y-3">
                {CATEGORIES.map((cat: Category) => {
                  const catApps = appsByCategory[cat.id] || [];
                  const isExpanded = expandedCat === 'ALL' || expandedCat === cat.id;

                  if (searchKeyword && catApps.length === 0) {
                    return null;
                  }

                  return (
                    <div 
                      key={cat.id} 
                      className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
                    >
                      {/* 手风琴分类条 */}
                      <div 
                        onClick={() => toggleCategory(cat.id)}
                        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors select-none"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                            {cat.key}
                          </span>
                          <span className="text-base sm:text-lg font-bold text-white">
                            {cat.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                            {catApps.length} 款
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-400">
                          <span className="text-xs hidden sm:inline text-slate-500">
                            {isExpanded ? '点击折叠' : '点击独占展开'}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* 手风琴分类展开内容 */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-900/30">
                          {cat.id === 'custom' && (
                            <div className="mt-3 mb-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between text-amber-300">
                              <span>💡 本板块为社区与第三方优秀扩展应用示例展示。实际安装请在终端按 <code className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-cyan-300">H</code> 查看与部署本地扩展。</span>
                              <span className="font-mono text-[11px] text-slate-400">~/apps/*.conf</span>
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-3">
                            {catApps.map((app: AppItem) => (
                              <div
                                key={app.id}
                                className="glass-panel glass-panel-hover p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                                      {cat.id === 'custom' ? `EXT` : `#${app.id}`}
                                    </span>
                                    {cat.id === 'custom' ? (
                                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                                        示例展示
                                      </span>
                                    ) : app.isStar && (
                                      <span className="flex items-center space-x-1 text-xs text-amber-400 font-medium">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span>官方星标</span>
                                      </span>
                                    )}
                                  </div>
                                  <h3 className={`text-sm font-bold mb-1.5 line-clamp-1 ${activeTheme === "dark" ? "text-white" : "text-slate-950 font-extrabold"}`}>
                                    {app.name}
                                  </h3>
                                  <p className={`text-xs line-clamp-2 leading-relaxed mb-3 ${activeTheme === "dark" ? "text-slate-400" : "text-slate-800 font-medium"}`}>
                                    {app.desc || '便捷部署，极速配置与开箱即用。'}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                                  <span className="text-[11px] text-slate-500 font-mono">
                                    {cat.id === 'custom' ? `终端指令: k app` : `指令: k app ${app.id}`}
                                  </span>
                                  {cat.id === 'custom' ? (
                                    <button
                                      onClick={() => handleCopy(`k app`)}
                                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-medium transition-all flex items-center space-x-1"
                                    >
                                      {copiedText === `k app` ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-400" />
                                          <span>已复制</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>终端安装</span>
                                        </>
                                      )}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleCopy(`k app ${app.id}`)}
                                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-medium transition-all flex items-center space-x-1"
                                    >
                                      {copiedText === `k app ${app.id}` ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-400" />
                                          <span>已复制</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>复制安装</span>
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* 核心能力特性矩阵 */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Power & Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            全能高效的 Linux 运维底座
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Linux 百宝箱不仅是应用市场，更是一整套经过实战检验的服务器全周期管理方案。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">系统调优与深度清理</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              一键清除缓存、无用旧内核、日志与垃圾文件；轻松扩展 SWAP 虚拟内存、修改时区与系统信息全盘查询。
            </p>
          </div>

          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">BBRv3 与网络极限加速</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              集成最新 BBRv3 内核调优算法，智能优化 TCP 拥塞控制；支持 Cloudflare WARP 优选，告别网络拥堵。
            </p>
          </div>

          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Docker 现代化容器编排</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              内置官方与自定义 Compose 模板引擎，118+ 容器化应用秒级起停、自动检测端口占用与冲突防护。
            </p>
          </div>

          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI 与大模型知识库矩阵</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              第一时间适配 Deepseek、Dify、OpenWebUI、RAGFlow、Hermes 与 OpenClaw 等尖端 AI 自托管工具。
            </p>
          </div>

          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">全应用灾备与跨机还原</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              支持一键无缝打包全部容器数据与数据库，支持 SCP 远程跨服务器秒级迁移与自动还原，数据安全无忧。
            </p>
          </div>

          <div className="google-card p-6 border border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">安全防护与端口安全组</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              集成 Fail2ban 防暴力破解、SSH 密钥导入与安全加固、iptables 防火墙精细化放行与违规 IP 拦截。
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 [Github乐园] 实时官方热榜 TOP 10 专区 (默认折叠，点击展开呈现量子数据礼花与震撼冲击波) */}
      <section id="github-park" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
        {/* 💥 粒子炸裂超新星容器 */}
        {parkBurstParticles.length > 0 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none z-50">
            {parkBurstParticles.map(p => (
              <span
                key={p.id}
                className="absolute rounded-full shadow-lg pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 14px ${p.color}, 0 0 26px ${p.color}`,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out",
                  opacity: 0.95
                }}
              />
            ))}
          </div>
        )}

        {/* 动态激光边框外壳 (展开状态下高速彩色激光流光环绕 + 冲击波脉冲) */}
        <div className={`relative rounded-3xl p-[2px] transition-all duration-500 overflow-hidden ${
          isGithubParkOpen 
            ? "shadow-2xl shadow-amber-500/25 ring-1 ring-amber-400/40" 
            : "border border-white/10 hover:border-amber-500/30"
        } ${isParkShockwaveActive ? "animate-shockwave" : ""}`}>

          {/* 展开时的高速激光扫掠底层 */}
          {isGithubParkOpen && (
            <div className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#f59e0b,#ec4899,#06b6d4,#10b981,#f59e0b)] animate-laser-rotate opacity-75 pointer-events-none blur-sm" />
          )}

          {/* 主体卡片面板 */}
          <div className={`relative google-card rounded-3xl overflow-hidden z-10 transition-all duration-300 border ${
            activeTheme === "dark" ? "bg-[#0c0e17]/95 border-white/[0.08]" : "bg-white/95 border-slate-200 shadow-lg shadow-slate-200/50"
          }`}>
            {/* 展开瞬间的全息激光扫描光束 */}
            {isParkShockwaveActive && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 via-orange-300 to-transparent blur-xs shadow-[0_0_24px_#f59e0b] z-40 pointer-events-none animate-holo-scan" />
            )}

            {/* 大折叠总栏目头部 (默认展示，点击展开/收起全部内容) */}
            <div 
              onClick={handleToggleGithubPark}
              className={`p-6 sm:p-8 cursor-pointer hover:bg-slate-900/50 transition-all select-none flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                isParkShockwaveActive ? "animate-cyber-flash" : ""
              }`}
            >
              <div className="flex items-start sm:items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isGithubParkOpen 
                    ? "bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-400/30 scale-105" 
                    : "bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 group-hover:scale-105"
                }`}>
                  <Flame className={`w-6 h-6 transition-transform duration-300 ${isGithubParkOpen ? "rotate-12 scale-110" : ""}`} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      isGithubParkOpen 
                        ? "bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-400/20" 
                        : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    }`}>
                      {isGithubParkOpen ? "🔥 TRENDING RADAR ONLINE" : "GitHub Trending 官方热榜今日直通"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs">
                      TOP 10 深度中文
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-mono">
                      🕒 更新于: {LAST_UPDATED_AT}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-amber-300 transition-colors flex items-center space-x-2">
                    <span>GitHub乐园 今日顶流精选 TOP 10</span>
                    {isGithubParkOpen && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 animate-pulse">
                        已激活
                      </span>
                    )}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    源自 GitHub 官方趋势榜，每日自动抓取今日星标增长最迅猛的神作，并结合大模型呈现 500 字深度架构解析。默认折叠收纳，点击展开浏览。
                  </p>
                </div>
              </div>

              {/* 展开/折叠状态指示器按钮 */}
              <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                <button 
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all shadow-md ${
                    isGithubParkOpen 
                      ? "bg-slate-900 border border-amber-500/50 text-amber-300 shadow-amber-500/20" 
                      : "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-300 group-hover:border-amber-400 group-hover:text-white shadow-amber-500/10"
                  }`}
                >
                  <span>{isGithubParkOpen ? "收起 GitHub乐园" : "点击展开 GitHub乐园"}</span>
                  {isGithubParkOpen ? (
                    <ChevronDown className="w-4 h-4 text-amber-400 transform rotate-180 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-amber-400 transition-transform animate-bounce" />
                  )}
                </button>
              </div>
            </div>

            {/* 当且仅当点击展开后，才展示内部所有 TOP 10 卡片列表与说明 */}
            {isGithubParkOpen && (
              <div className="p-6 sm:p-8 pt-4 border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
                {/* 顶部快捷操作栏 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/60">
                  <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>🤖 数据 100% 源自 GitHub 官方趋势榜（github.com/trending），GitHub Actions 每日凌晨自动更新。</span>
                  </div>
                  <a
                    href="https://github.com/trending"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center space-x-1.5 transition-all shadow-sm shrink-0"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>查看 GitHub 官方原榜单</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                {/* TOP 10 卡片列表 (2列布局) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {GITHUB_TRENDING_APPS.map((item: GithubTrendingRepo) => {
                    const rankBadgeClass = 
                      item.rank === 1 ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/30" :
                      item.rank === 2 ? "bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-lg shadow-slate-300/20" :
                      item.rank === 3 ? "bg-gradient-to-r from-amber-700 to-amber-600 text-white font-black shadow-lg shadow-amber-700/20" :
                      "bg-slate-800 text-slate-300 font-bold border border-slate-700";

                    return (
                      <div
                        key={item.rank}
                        className="google-card p-6 border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                      >
                        <div>
                          {/* 卡片头部信息 */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center space-x-3">
                              <span className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono ${rankBadgeClass}`}>
                                #{item.rank}
                              </span>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className={`font-bold text-base transition-colors ${activeTheme === "dark" ? "text-white group-hover:text-amber-300" : "text-slate-950 font-extrabold group-hover:text-amber-700"}`}>
                                    {item.name}
                                  </h3>
                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                                    {item.tag}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-400 font-mono flex items-center space-x-1 mt-0.5">
                                  <FolderGit2 className="w-3 h-3 text-slate-500" />
                                  <span>{item.repo}</span>
                                </span>
                              </div>
                            </div>

                            {/* 今日暴增 Stars */}
                            <div className="flex items-center space-x-1.5 shrink-0">
                              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 shadow-sm animate-pulse">
                                <Flame className="w-3.5 h-3.5 text-amber-400" />
                                <span>{item.starsToday}</span>
                              </span>
                            </div>
                          </div>

                          {/* 项目简介 */}
                          <p className={`text-xs leading-relaxed mb-4 text-justify transition-colors ${activeTheme === "dark" ? "text-slate-300" : "text-slate-900 font-medium leading-normal"}`}>
                            {item.desc}
                          </p>

                          {/* 指标栏 (语言、总Stars、总Forks) */}
                          <div className="flex items-center space-x-4 text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800/50">
                            <span className="flex items-center space-x-1.5">
                              <span 
                                className="w-2.5 h-2.5 rounded-full inline-block" 
                                style={{ backgroundColor: item.langColor || "#3b82f6" }}
                              />
                              <span className="font-medium text-slate-300">{item.language}</span>
                            </span>

                            <span className="flex items-center space-x-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              <span className={`font-mono font-semibold ${activeTheme === "dark" ? "text-slate-200" : "text-slate-900"}`}>{item.stars}</span>
                            </span>

                            <span className="flex items-center space-x-1">
                              <GitFork className="w-3.5 h-3.5 text-slate-400" />
                              <span className={`font-mono font-semibold ${activeTheme === "dark" ? "text-slate-300" : "text-slate-800"}`}>{item.forks}</span>
                            </span>
                          </div>
                        </div>

                        {/* 底部操作栏 */}
                        <div className="pt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-1 text-slate-400 font-mono text-xs overflow-hidden">
                            <span className="text-cyan-400 select-none">$</span>
                            <span className="truncate text-slate-400 text-[11px]">{item.deployCmd}</span>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => handleCopy(item.deployCmd)}
                              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-semibold transition-all border border-amber-500/40 flex items-center space-x-1.5 shadow-sm active:scale-95"
                            >
                              {copiedText === item.deployCmd ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>已复制指令</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>复制代码</span>
                                </>
                              )}
                            </button>

                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className={`p-1.5 rounded-lg transition-all border ${
                                activeTheme === "dark"
                                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border-slate-300"
                              }`}
                              title="直达 GitHub 开源仓库"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 开发者与生态指南 */}
      <section id="developer" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className={`google-card rounded-3xl p-8 sm:p-12 border relative overflow-hidden shadow-2xl transition-colors duration-300 backdrop-blur-2xl ${
          activeTheme === "dark" ? "border-white/[0.08] bg-[#0c0e17]/80 shadow-black/50" : "border-slate-200 bg-white/90 shadow-slate-200/60"
        }`}>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>开放社区生态</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              想要让你的开源应用加入工具箱应用市场？
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Linux 百宝箱应用市场遵循规范化开放标准。任何开发者只需根据官方规范编写一份简明的应用配置文件（<code className="text-cyan-300 font-mono">apps/*.conf</code>），即可无缝接入全球数十万服务器终端。
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="https://github.com/macsur/z-apps" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2"
              >
                <span>应用配置规范</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://github.com/macsur/macsur.github.io" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center space-x-2"
              >
                <span>GitHub Apps 仓库提交 PR</span>
              </a>

              {/* 按钮行右侧极不显眼的微光星芒触发点 */}
              <button
                onClick={triggerEasterEgg}
                title="✦"
                className="p-2 text-slate-700/40 hover:text-cyan-400 hover:scale-125 transition-all duration-300 rounded-lg hover:bg-white/5 cursor-pointer group"
                aria-label="Quantum Easter Egg"
              >
                <Sparkles className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
              </button>
            </div>

            {/* 该区域最下面的一列：不显眼，平时暗沉，悬停微亮，点击即是惊喜 */}
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500/70 gap-2">
              <div className="flex items-center space-x-3 font-mono">
                <span>Schema: v2.4</span>
                <span className="text-slate-700">•</span>
                <span>自动化 CI/CD 校验</span>
                <span className="text-slate-700">•</span>
                <span>全网分发终端: 100,000+</span>
              </div>
              <button
                onClick={triggerEasterEgg}
                title="✦ 惊喜彩蛋"
                className="inline-flex items-center space-x-1 text-slate-600/50 hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer group px-2 py-0.5 rounded hover:bg-slate-800/40"
              >
                <Sparkles className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
                <span className="text-[10px] text-slate-600/70 group-hover:text-cyan-300 font-mono transition-colors">✦</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 底部 Footer */}
      <footer className="border-t border-white/[0.08] py-14 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 bg-[#07080c]/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Linux 百宝箱 · zttz.eu.org</span>
            <span>- 现代化服务器运维与开源应用</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="#daily-recommend" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>今日更新 ({updateBadgeText})</span>
            </a>
            <span>•</span>
            <a href="#features" className="text-slate-400 hover:text-cyan-400 transition-colors">核心特性</a>
            <span>•</span>
            <a href="#developer" className="text-slate-400 hover:text-cyan-400 transition-colors">开发者生态</a>
            <span>•</span>
            <a href="https://github.com/macsur/macsur.github.io" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
              GitHub 仓库
            </a>
          </div>
        </div>

        {/* 底部最下一列：极不显眼的隐蔽彩蛋入口与节点状态 */}
        <div className="mt-8 pt-5 border-t border-slate-900/80 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2">
          <span>© 2026 Linux 百宝箱 · zttz.eu.org · 保留所有权利</span>
          <div className="flex items-center space-x-2.5">
            <span className="text-slate-600/80">Cluster: HK-Edge-01</span>
            <span className="text-slate-800">•</span>
            <span className="text-slate-600/80">Latency: 18ms</span>
            <span className="text-slate-800">•</span>
            {/* 极度不显眼的微光星芒触发点：平时极暗，悬浮微亮，点击引爆惊喜彩蛋 */}
            <button
              onClick={triggerEasterEgg}
              title="✦"
              className="p-1 text-slate-700/40 hover:text-cyan-400 hover:scale-125 transition-all duration-300 rounded focus:outline-none cursor-pointer group"
              aria-label="Quantum Easter Egg"
            >
              <Sparkles className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-opacity" />
            </button>
          </div>
        </div>
      </footer>
      </div>

      {/* 🎆 专属量子数据礼花彩蛋弹窗 (跟礼花差不多，但是不一样：9枚炸裂展开的数据碎片，3真实IP+6镜像，点击即复制) */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setShowEasterEgg(false)}
        >
          {/* 背景全息流光与暗场辐射光 */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(168,85,247,0.1)_45%,transparent_75%)]" />
          
          {/* 彩蛋主体容器 */}
          <div 
            className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-900/90 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden z-10 animate-egg-burst"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 顶沿物理反光条 */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
            
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      ✦ 量子礼花 · 猜你喜欢 ✦
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Easter Egg
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    绽放 9 枚全息数据碎片 · 包含 6 个精选导航与 3 个实时精选的 L2TP/IPsec [US] 节点（点击即复制）
                  </p>
                </div>
              </div>

              {/* 关闭按钮 */}
              <button
                onClick={() => setShowEasterEgg(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="关闭 (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 9 枚如礼花般炸开展开的数据碎片卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 my-2">
              {easterEggItems.map((item) => {
                const isCopied = copiedEasterId === item.id;
                const handleClick = () => {
                  if (item.isReal) {
                    handleCopyEasterEggItem(item.text, item.id);
                  } else if (item.url) {
                    window.open(item.url, '_blank', 'noopener,noreferrer');
                  }
                };

                return (
                  <div
                    key={item.id}
                    onClick={handleClick}
                    style={{
                      animationDelay: item.delay,
                    }}
                    title={item.isReal ? `点击复制真实 IP: ${item.text}` : `点击在新窗口访问: ${item.url}`}
                    className={`group relative rounded-2xl p-4 border ${item.border} bg-gradient-to-br ${item.color} hover:bg-slate-800/80 cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] shadow-lg ${item.glow} backdrop-blur-md animate-egg-burst animate-egg-float`}
                  >
                    {/* 微妙的全息流光角标 */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
                        #0{item.id} · {item.label}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${item.isReal ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-400/60'}`} />
                    </div>

                    {/* IP 或域名内容展示 */}
                    <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wide break-all my-1 select-all flex items-center justify-between">
                      <span className={item.isReal ? 'text-emerald-300' : 'text-cyan-200 group-hover:text-cyan-300 transition-colors'}>
                        {item.text}
                      </span>
                      {!item.isReal && (
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400/60 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      )}
                    </div>

                    {/* 悬停与交互状态指示 (真实IP为复制，网站为新页面打开) */}
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      {item.isReal ? (
                        isCopied ? (
                          <span className="text-emerald-400 font-semibold flex items-center space-x-1 animate-pulse">
                            <Check className="w-3.5 h-3.5" />
                            <span>已复制 IP 到剪贴板！</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 group-hover:text-emerald-300 flex items-center space-x-1 transition-colors">
                            <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                            <span>点击复制真实 IP</span>
                          </span>
                        )
                      ) : (
                        <span className="text-slate-400 group-hover:text-cyan-300 flex items-center space-x-1 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                          <span>新页面访问网站 ↗</span>
                        </span>
                      )}

                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        item.isReal 
                          ? 'text-emerald-400/90 bg-emerald-500/10 border-emerald-500/20' 
                          : 'text-cyan-300/90 bg-cyan-500/10 border-cyan-500/20'
                      }`}>
                        {item.isReal ? 'REAL-IP' : 'VISIT ↗'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 底部操作与提示 */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>真实 IP 提取自 VPNGate 全球实时节点（会话最少 0 sessions）</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={triggerEasterEgg}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium hover:underline flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>再放一次礼花</span>
                </button>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500 font-mono text-[11px]">按 ESC 或点击空白处关闭</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

