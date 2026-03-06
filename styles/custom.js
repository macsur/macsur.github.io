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

// 目录增强 - 添加锚点
docsify.register('toc', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/<h2([^>]*)>([^<]*)<\/h2>/g, function (match, attrs, content) {
            var id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5\-]/g, '');
            return `<h2${attrs} id="${id}">${content}</h2>`;
        });
    });
});

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
    // 搜索高亮
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
    // 创建汉堡菜单按钮
    var menuBtn = document.createElement('button');
    menuBtn.className = 'menu-button';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    document.body.appendChild(menuBtn);

    // 创建遮罩层
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

    // ESC 键关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleMenu();
        }
    });

    // 响应窗口变化
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 点击侧边栏链接后自动关闭（移动端）
    sidebar.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            setTimeout(toggleMenu, 100);
        }
    });
})();

// 暗色模式优化：修复代码块色
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.setProperty('--code-bg', '#161b22');
}

// 阅读进度条（顶部）
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
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

console.log('✨ MacSur Docs - Custom enhancements loaded');
