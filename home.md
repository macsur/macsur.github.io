# OpenClaw 未来实验工作室

<div class="neo-hero">
  <div class="neo-hero__inner">
    <div class="neo-hero__badge">MacSur · Docsify · OpenClaw</div>
    <h1 class="neo-hero__title">OpenClaw 未来实验工作室</h1>
    <p class="neo-hero__desc">把教程、工具、自动化工作流装进一个可用的 AI 工作台：能跑、可复现、可运维。</p>

    <div class="neo-hero__cta">
      <a class="neo-btn neo-btn--primary" href="#/tutorials/openai-token/README">进入：OpenAI Token 专题通道</a>
      <a class="neo-btn" href="#/tools/ask">打开：Ask 搜索 + AI 总结</a>
    </div>

    <div class="neo-hero__meta">
      <span>稳定优先</span>
      <span>缓存可控</span>
      <span>可观测可排障</span>
    </div>
  </div>
</div>

<div class="neo-grid">
  <a class="neo-card" href="#/tutorials/openai-token/README">
    <div class="neo-card__kicker">专题</div>
    <div class="neo-card__title">OpenAI Token 专题通道</div>
    <div class="neo-card__desc">注册/收信、密钥安全、轮换、历史清理、CI 最佳实践、部署模板，一条龙打通。</div>
    <div class="neo-card__footer">阅读目录 →</div>
  </a>

  <a class="neo-card" href="#/tools/ask">
    <div class="neo-card__kicker">工具</div>
    <div class="neo-card__title">Ask：搜索 + AI 总结</div>
    <div class="neo-card__desc">SearXNG 搜索 + 自定义大模型汇总，输出结论并附引用来源（Sources）。</div>
    <div class="neo-card__footer">开始提问 →</div>
  </a>

  <a class="neo-card" href="#/tutorials/news-digest">
    <div class="neo-card__kicker">自动化</div>
    <div class="neo-card__title">多源技术新闻摘要系统（晨报）</div>
    <div class="neo-card__desc">RSS 抓取 + 过滤 + Markdown 生成 + 定时推送/播报：每天早上自动交付。</div>
    <div class="neo-card__footer">查看教程 →</div>
  </a>
</div>

---

## 为什么要做这个“实验工作室”？

- **少说多做**：每个能力都要能在真实机器上跑通
- **可回滚**：站点改版/脚本升级必须能快速恢复
- **可运维**：遇到 Loading、缓存不更新、权限问题都有 Runbook

> 提示：如果你更喜欢“heyneo”那种观感，这个页面就是同路线的封面页；但文档部分仍然保持 Docsify 的稳定性与可维护性。

<style>
/* Neo-ish cover for Docsify (CSP-friendly: external JS only) */

/* base typography rhythm */
.markdown-section{letter-spacing:.2px;}
.markdown-section h1,h2,h3{letter-spacing:.3px;}
.markdown-section p{line-height:1.75;}

.neo-hero{position:relative;margin:10px 0 18px;padding:18px;border-radius:22px;border:1px solid rgba(255,255,255,.16);
  background: radial-gradient(1200px 600px at 10% 0%, rgba(99,102,241,.28), transparent 62%),
              radial-gradient(900px 520px at 92% 18%, rgba(16,185,129,.20), transparent 58%),
              radial-gradient(700px 420px at 50% 110%, rgba(236,72,153,.12), transparent 60%),
              linear-gradient(180deg, rgba(17,24,39,.92), rgba(17,24,39,.70));
  box-shadow: 0 18px 60px rgba(0,0,0,.22);
  overflow:hidden;
}
/* floating glow blobs */
.neo-hero::before,.neo-hero::after{content:"";position:absolute;inset:auto;pointer-events:none;filter: blur(30px);opacity:.55;}
/* grid overlay */
.neo-hero .neo-hero__inner::before{content:"";position:absolute;inset:-40px;pointer-events:none;opacity:.18;
  background-image: linear-gradient(to right, rgba(255,255,255,.10) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,.10) 1px, transparent 1px);
  background-size: 54px 54px;
  transform: translateZ(0);
  mask-image: radial-gradient(circle at 30% 20%, rgba(0,0,0,1) 0%, rgba(0,0,0,.75) 45%, rgba(0,0,0,0) 78%);
}
/* subtle noise overlay (CSS-only) */
.neo-hero .neo-hero__inner::after{content:"";position:absolute;inset:-40px;pointer-events:none;opacity:.10;mix-blend-mode: overlay;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,.18) 0 1px, transparent 1px),
    radial-gradient(circle at 80% 40%, rgba(0,0,0,.18) 0 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,.14) 0 1px, transparent 1px);
  background-size: 3px 3px, 4px 4px, 5px 5px;
  filter: contrast(120%);
}
.neo-hero::before{width:380px;height:380px;left:-120px;top:-140px;background:radial-gradient(circle at 30% 30%, rgba(99,102,241,.9), transparent 60%);animation: neoFloat 8s ease-in-out infinite;}
.neo-hero::after{width:340px;height:340px;right:-120px;top:-120px;background:radial-gradient(circle at 30% 30%, rgba(16,185,129,.75), transparent 62%);animation: neoFloat2 10s ease-in-out infinite;}
@keyframes neoFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(18px,26px) scale(1.05)}}
@keyframes neoFloat2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-22px,18px) scale(1.06)}}

.neo-hero__inner{position:relative;padding:12px 16px;color:#f9fafb;isolation:isolate;}
.neo-hero__badge{display:inline-block;font-size:12px;letter-spacing:.5px;padding:6px 10px;border-radius:999px;
  background:rgba(255,255,255,.10);
  border:1px solid rgba(255,255,255,.14);
  box-shadow: 0 10px 30px rgba(0,0,0,.18);
  backdrop-filter: blur(12px);
}
.neo-hero__title{margin:12px 0 6px;font-size:36px;line-height:1.12;letter-spacing:.3px;}
.neo-hero__desc{margin:0 0 14px;color:rgba(249,250,251,.84);font-size:15px;max-width:62ch;}
.neo-hero__cta{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0 10px;}
.neo-btn{display:inline-block;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.18);
  background:rgba(255,255,255,.06);
  color:#f9fafb;text-decoration:none;
  box-shadow: 0 12px 35px rgba(0,0,0,.20);
}
.neo-btn:hover{background:rgba(255,255,255,.10)}
.neo-btn--primary{background:linear-gradient(135deg, rgba(99,102,241,.40), rgba(236,72,153,.22));border-color:rgba(99,102,241,.38)}
.neo-btn--primary:hover{background:linear-gradient(135deg, rgba(99,102,241,.50), rgba(236,72,153,.28))}
.neo-hero__meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;color:rgba(249,250,251,.72);font-size:12px;}
.neo-hero__meta span{padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05)}

.neo-grid{display:grid;grid-template-columns:repeat(3, minmax(0,1fr));gap:12px;margin:14px 0 6px;}
@media (max-width: 980px){.neo-grid{grid-template-columns:1fr;}}
.neo-card{display:block;padding:14px;border-radius:16px;border:1px solid rgba(17,24,39,.10);background:linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.86));box-shadow:0 14px 40px rgba(17,24,39,.08);text-decoration:none;color:#111827;}
.neo-card:hover{transform:translateY(-2px);box-shadow:0 18px 55px rgba(17,24,39,.14);}

/* scroll-in animation (paired with styles/home-anim.js) */
.neo-anim{opacity:0;transform: translateY(10px);transition: opacity .55s ease, transform .65s cubic-bezier(.2,.8,.2,1);will-change: opacity, transform;}
.neo-anim.neo-anim--in{opacity:1;transform: translateY(0);}
.neo-card__kicker{font-size:12px;color:rgba(17,24,39,.65);}
.neo-card__title{font-size:16px;font-weight:700;margin:6px 0 6px;}
.neo-card__desc{font-size:13px;line-height:1.6;color:rgba(17,24,39,.78);margin:0 0 10px;}
.neo-card__footer{font-size:12px;color:rgba(99,102,241,.95);font-weight:600;}
</style>
