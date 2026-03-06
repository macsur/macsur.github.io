// Docsify 自定义插件

// 视频嵌入短代码
docsify.register('video', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/\[video\](https?:\/\/[^\]]+)\[ Video ID: (\w+) \]/g, function (match, url, id) {
            return `<div class="video-container">
                <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
            </div>`;
        });
    });
});

// 徽章短代码
docsify.register('badge', function (hook, vm) {
    hook.afterEach(function (html) {
        return html.replace(/\[badge:(new|hot|update)\](.+?)\[/g, function (match, type, text) {
            return `<span class="badge badge-${type}">${text}</span>`;
        });
    });
});

// 目录增强
docsify.register('toc', function (hook, vm) {
    hook.afterEach(function (html) {
        // 为 h2 标题添加锚点
        return html.replace(/<h2([^>]*)>([^<]*)<\/h2>/g, function (match, attrs, content) {
            var id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5\-]/g, '');
            return `<h2${attrs} id="${id}">${content}</h2>`;
        });
    });
});

// 复制代码优化
window.$docsify.copyCode = {
    buttonText: '📋 复制',
    errorText: '失败',
    successText: '已复制!'
};

// 搜索高亮
window.$docsify.search = {
    paths: 'auto',
    placeholder: '🔍 搜索教程、功能...',
    noData: '😕 没有找到结果',
    depth: 2
};
