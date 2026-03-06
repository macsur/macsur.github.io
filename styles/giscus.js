// Giscus 评论系统配置
// 在 index.html 中引入

window.$docsify = {
    // ... 其他配置
    plugins: [
        function (hook, vm) {
            // 在页面底部插入 Giscus 容器
            hook.doneEach(function () {
                var container = document.createElement('div');
                container.id = 'giscus-container';
                container.style = 'margin-top: 3em; padding-top: 2em; border-top: 1px solid #eee;';
                container.innerHTML = `
                    <script src="https://giscus.app/client.js"
                        data-repo="macsur/macsur.github.io"
                        data-repo-id="R_kgDOxxxxxx"
                        data-category="Announcements"
                        data-category-id="DIC_kwDOxxxxxx"
                        data-mapping="pathname"
                        data-strict="0"
                        data-reactions-enabled="1"
                        data-emit-metadata="0"
                        data-input-position="bottom"
                        data-theme="preferred_color_scheme"
                        data-lang="zh-CN"
                        crossorigin="anonymous"
                        async>
                    </script>
                `;
                document.body.appendChild(container);
            });
        }
    ]
};
