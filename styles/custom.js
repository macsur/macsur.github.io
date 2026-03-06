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
