// Docsify 自定义插件 - GitHub 风格增强

// 视频嵌入
docsify.register('video', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/\[video\](https?:\/\/[^\]]+)\[ Video ID: (\w+) \]/g, function (match, url, id) {
            return `<div class="video-container">
                <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
            </div>`;
        });
    });
});

// 徽章
docsify.register('badge', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/\[badge:(new|hot|update)\](.+?)\[/g, function (match, type, text) {
            return `<span class="badge badge-${type}">${text}</span>`;
        });
    });
});

// 轮播图短代码 [carousel:img1|title|desc,img2|title|desc,...]
docsify.register('carousel', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/\[carousel:([^\]]+)\]/g, function (match, itemsStr) {
            var items = itemsStr.split(',').map(function(item) {
                var parts = item.split('|');
                return {
                    img: parts[0].trim(),
                    title: parts[1] || '',
                    desc: parts[2] || ''
                };
            });

            var slidesHtml = items.map(function(item, index) {
                var active = index === 0 ? 'active' : '';
                var caption = item.title || item.desc ?
                    `<div class="carousel-caption">
                        ${item.title ? '<h4>'+item.title+'</h4>' : ''}
                        ${item.desc ? '<p>'+item.desc+'</p>' : ''}
                    </div>` : '';
                return `
                    <div class="carousel-slide ${active}" data-index="${index}">
                        <img src="${item.img}" alt="Slide ${index+1}" loading="lazy">
                        ${caption}
                    </div>`;
            }).join('');

            var indicatorsHtml = items.map(function(_, index) {
                var active = index === 0 ? 'active' : '';
                return `<div class="carousel-indicator ${active}" data-index="${index}"></div>`;
            }).join('');

            return `
                <div class="carousel-container" data-carousel>
                    ${slidesHtml}
                    <button class="carousel-control carousel-prev" data-direction="prev">‹</button>
                    <button class="carousel-control carousel-next" data-direction="next">›</button>
                    <div class="carousel-indicators">
                        ${indicatorsHtml}
                    </div>
                </div>`;
        });
    });
});

// 轮播图交互
(function initCarousel() {
    document.addEventListener('click', function(e) {
        var carousel = e.target.closest('[data-carousel]');
        if (!carousel) return;

        if (e.target.classList.contains('carousel-indicator')) {
            var index = parseInt(e.target.dataset.index);
            goToSlide(carousel, index);
        } else if (e.target.classList.contains('carousel-prev')) {
            navigateSlide(carousel, -1);
        } else if (e.target.classList.contains('carousel-next')) {
            navigateSlide(carousel, 1);
        }
    });

    // 自动播放（5秒）
    setInterval(function() {
        document.querySelectorAll('[data-carousel]').forEach(function(carousel) {
            var activeSlide = carousel.querySelector('.carousel-slide.active');
            if (activeSlide) {
                var currentIndex = parseInt(activeSlide.dataset.index);
                var slides = carousel.querySelectorAll('.carousel-slide');
                var nextIndex = (currentIndex + 1) % slides.length;
                goToSlide(carousel, nextIndex);
            }
        });
    }, 5000);
})();

function goToSlide(carousel, index) {
    var slides = carousel.querySelectorAll('.carousel-slide');
    var indicators = carousel.querySelectorAll('.carousel-indicator');
    slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach(function(ind, i) {
        ind.classList.toggle('active', i === index);
    });
}

function navigateSlide(carousel, delta) {
    var activeSlide = carousel.querySelector('.carousel-slide.active');
    if (activeSlide) {
        var currentIndex = parseInt(activeSlide.dataset.index);
        var slides = carousel.querySelectorAll('.carousel-slide');
        var nextIndex = (currentIndex + delta + slides.length) % slides.length;
        goToSlide(carousel, nextIndex);
    }
}

// 复制代码
window.$docsify.copyCode = {
    buttonText: '📋 复制',
    errorText: '失败',
    successText: '已复制!'
};

// 搜索
window.$docsify.search = {
    paths: 'auto',
    placeholder: '🔍 搜索教程、功能...',
    noData: '😕 没有找到结果',
    depth: 2,
    maxAge: 86400000,
    highlight: function (matches, keywords) {
        return matches.map(function (match) {
            var html = match.html
                .replace(new RegExp('(' + keywords + ')', 'gi'), '<mark>$1</mark>');
            return Object.assign({}, match, {html: html});
        });
    }
};

// 移动端侧边栏切换
(function () {
    var menuBtn = document.createElement('button');
    menuBtn.className = 'menu-button';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    document.body.appendChild(menuBtn);

    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    function toggleMenu() {
        var isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleMenu();
        }
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    sidebar.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            setTimeout(toggleMenu, 100);
        }
    });
})();

// 阅读进度条
(function () {
    var progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;width:0;height:3px;background:var(--theme-color);z-index:9999;transition:width 0.1s;';
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
})();

// 返回顶部按钮
(function () {
    var btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:40px;height:40px;border-radius:50%;background:var(--theme-color);color:white;border:none;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:none;align-items:center;justify-content:center;font-size:1.2rem;z-index:1000;transition:all 0.2s;';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    window.addEventListener('scroll', function () {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

console.log('✨ MacSur Docs - Custom enhancements loaded');



// 首页门户增强：首屏 Hero + 真轮播 + 视频精选
(function () {
    function buildHomepagePortal() {
        return `
          <section class="home-portal">
            <div class="home-portal-grid">
              <div class="home-feature-panel">
                <div class="home-hero-badges">
                  <span class="home-hero-badge">🚀 持续更新</span>
                  <span class="home-hero-badge">🧠 AI 工具实战</span>
                  <span class="home-hero-badge">🎥 图文 + 视频</span>
                </div>
                <h1 class="home-hero-title">OpenClaw / AI 工具未来实验室</h1>
                <p class="home-hero-desc">这里不是冷冰冰的文档索引，而是一个持续更新的 AI 工具门户：首页先给你看图、看视频、看最新教程，再带你进入真正值得花时间的项目专题和实战路线。</p>
                <div class="home-hero-actions">
                  <a class="home-hero-primary" href="#/tutorials/2026-hot-open-source-ai-projects-navigation">先看 2026 爆款 AI 项目总导航</a>
                  <a class="home-hero-secondary" href="#/tutorials/openclaw-gpt54-searxng-ollama-stack">看 OpenClaw + GPT-5.4 组合方案</a>
                </div>
              </div>
              <div class="home-feature-panel">
                <h3 class="home-panel-title">为什么首页必须高级</h3>
                <ul class="home-feature-list">
                  <li>首页不是目录，是门面，是用户决定要不要继续看的第一秒。</li>
                  <li>有图、有视频、有轮播，网站才像“持续运营中的媒体型教程站”。</li>
                  <li>最新教程必须放在首屏，不然用户根本不知道你最近更新了什么。</li>
                </ul>
              </div>
            </div>

            <div class="home-video-grid">
              <div class="home-video-panel home-video-wrap">
                <h3 class="home-panel-title">🎬 首页精选视频</h3>
                <iframe src="https://www.youtube.com/embed/pHF7s-oOTx0" title="AI Projects Featured Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div class="home-video-panel">
                <h3 class="home-panel-title">📌 精选入口</h3>
                <div class="home-mini-list">
                  <a class="home-mini-item" href="#/tutorials/copaw-topic-index"><strong>CoPaw 专题封面页</strong><span>个人 AI 助手 / OpenClaw 替代路线</span></a>
                  <a class="home-mini-item" href="#/tutorials/worldmonitor-topic-index"><strong>worldmonitor 专题封面页</strong><span>全球情报监控、地图图层与本地 AI 分析</span></a>
                  <a class="home-mini-item" href="#/tutorials/deer-flow-topic-index"><strong>deer-flow 专题封面页</strong><span>多智能体系统、技能、子代理与执行底座</span></a>
                </div>
              </div>
            </div>

            <div class="home-carousel-panel" style="margin-top:18px;">
              <div class="home-carousel-head">
                <h3 class="home-panel-title">🔥 首页轮播：最新 / 最值得先看的教程</h3>
                <div class="home-carousel-controls">
                  <button class="home-carousel-btn prev" aria-label="上一张">‹</button>
                  <button class="home-carousel-btn next" aria-label="下一张">›</button>
                </div>
              </div>
              <div class="home-slider" data-home-slider>
                <div class="home-slides">
                  <a class="home-slide active" data-slide-index="0" href="#/tutorials/openclaw-gpt54-searxng-ollama-stack">
                    <div class="home-slide-cover" style="background-image:url('https://opengraph.githubassets.com/1/openclaw/openclaw');"></div>
                    <div class="home-slide-body">
                      <div class="home-card-tag">LATEST STACK</div>
                      <div class="home-slide-title">OpenClaw + GPT-5.4 + SearXNG + Ollama 完整组合方案</div>
                      <div class="home-slide-desc">一页看懂模型、搜索、工作流和本地部署组合，是当前最适合首页首推的组合型内容。</div>
                    </div>
                  </a>
                  <a class="home-slide" data-slide-index="1" href="#/tutorials/2026-hot-open-source-ai-projects-navigation">
                    <div class="home-slide-cover" style="background-image:url('https://opengraph.githubassets.com/1/agentscope-ai/CoPaw');"></div>
                    <div class="home-slide-body">
                      <div class="home-card-tag">2026 HOT</div>
                      <div class="home-slide-title">5 大爆款开源 AI 项目精选教程导航</div>
                      <div class="home-slide-desc">第一次来到站里，最该先看这张总导航页，再决定你要先追哪条项目路线。</div>
                    </div>
                  </a>
                  <a class="home-slide" data-slide-index="2" href="#/tutorials/flynas-openclaw-troubleshooting">
                    <div class="home-slide-cover" style="background-image:url('https://opengraph.githubassets.com/1/koala73/worldmonitor');"></div>
                    <div class="home-slide-body">
                      <div class="home-card-tag">NAS PRACTICE</div>
                      <div class="home-slide-title">飞牛 NAS 上 OpenClaw 常见报错排查大全</div>
                      <div class="home-slide-desc">高需求、高搜索量、高实战价值，适合首页持续曝光，带动停留时间与点击率。</div>
                    </div>
                  </a>
                  <a class="home-slide" data-slide-index="3" href="#/tutorials/deer-flow-topic-index">
                    <div class="home-slide-cover" style="background-image:url('https://opengraph.githubassets.com/1/bytedance/deer-flow');"></div>
                    <div class="home-slide-body">
                      <div class="home-card-tag">SUPER AGENT</div>
                      <div class="home-slide-title">deer-flow 专题：多智能体、子代理与执行底座</div>
                      <div class="home-slide-desc">更偏 Agent 基础设施的重磅专题，适合放在首页当“技术深水区入口”。</div>
                    </div>
                  </a>
                </div>
                <div class="home-slider-dots">
                  <button class="home-slider-dot active" data-dot-index="0" aria-label="切换到第 1 张"></button>
                  <button class="home-slider-dot" data-dot-index="1" aria-label="切换到第 2 张"></button>
                  <button class="home-slider-dot" data-dot-index="2" aria-label="切换到第 3 张"></button>
                  <button class="home-slider-dot" data-dot-index="3" aria-label="切换到第 4 张"></button>
                </div>
              </div>
            </div>
          </section>
        `;
    }

    function showHomeSlide(root, index) {
        var slides = root.querySelectorAll('.home-slide');
        var dots = root.querySelectorAll('.home-slider-dot');
        if (!slides.length) return;
        index = (index + slides.length) % slides.length;
        root.setAttribute('data-active-index', index);
        slides.forEach(function (slide, i) {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === index);
        });
    }

    function bindHomeSlider(root) {
        if (!root || root.dataset.bound === '1') return;
        root.dataset.bound = '1';
        var timer = null;
        var total = root.querySelectorAll('.home-slide').length;

        function currentIndex() {
            return parseInt(root.getAttribute('data-active-index') || '0', 10);
        }
        function go(index) {
            showHomeSlide(root, index);
        }
        function next() {
            go(currentIndex() + 1);
        }
        function prev() {
            go(currentIndex() - 1);
        }
        function start() {
            stop();
            timer = setInterval(next, 4200);
        }
        function stop() {
            if (timer) clearInterval(timer);
            timer = null;
        }

        var prevBtn = root.querySelector('.home-carousel-btn.prev');
        var nextBtn = root.querySelector('.home-carousel-btn.next');
        if (prevBtn) prevBtn.addEventListener('click', prev);
        if (nextBtn) nextBtn.addEventListener('click', next);

        root.querySelectorAll('.home-slider-dot').forEach(function (dot) {
            dot.addEventListener('click', function () {
                go(parseInt(dot.getAttribute('data-dot-index') || '0', 10));
            });
        });

        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop);
        root.addEventListener('focusout', start);

        showHomeSlide(root, 0);
        if (total > 1) start();
    }

    function ensureHomepagePortal() {
        var isHome = location.hash === '#/' || location.hash === '' || location.hash === '#';
        var article = document.querySelector('.markdown-section');
        if (!isHome || !article) return;

        var existing = article.querySelector('.home-portal');
        if (!existing) {
            article.insertAdjacentHTML('afterbegin', buildHomepagePortal());
            existing = article.querySelector('.home-portal');
        }
        bindHomeSlider(existing);
    }

    function scheduleEnsure() {
        setTimeout(ensureHomepagePortal, 50);
        setTimeout(ensureHomepagePortal, 200);
        setTimeout(ensureHomepagePortal, 600);
        setTimeout(ensureHomepagePortal, 1200);
    }

    var observer = new MutationObserver(function () {
        scheduleEnsure();
    });

    document.addEventListener('DOMContentLoaded', function () {
        observer.observe(document.body, { childList: true, subtree: true });
        scheduleEnsure();
    });
    window.addEventListener('hashchange', scheduleEnsure);
    window.addEventListener('load', scheduleEnsure);
    scheduleEnsure();
})();

