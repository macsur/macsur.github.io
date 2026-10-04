#!/usr/bin/env bash
# ==============================================================================
# Kejilion 官方源码一键同步与自动发布脚本
# 用法:
#   ./sync_upstream.sh          -> 仅同步官方最新源码并注入 11+ 分类折叠
#   ./sync_upstream.sh --deploy -> 同步后自动重新构建并部署到 GitHub Pages
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=================================================="
echo "  🔄 开始同步 Kejilion.sh 官方源码..."
echo "=================================================="

# 1. 运行 Node 同步注入引擎
node sync_upstream.js

# 2. 语法校验
bash -n kejilion.sh
bash -n apps_manager.sh

# 3. 同步到 website/public/
echo "📁 同步生成物到 website/public/ ..."
mkdir -p website/public
cp -f kejilion.sh website/public/kejilion.sh
cp -f kejilion.sh website/public/x.sh
cp -f kejilion.sh x.sh
cp -f apps_manager.sh website/public/apps_manager.sh

# 4. 判断是否需要自动部署
if [ "$1" = "--deploy" ] || [ "$1" = "-d" ]; then
    echo "=================================================="
    echo "  🚀 开始构建并自动部署至 GitHub Pages..."
    echo "=================================================="

    echo "🌐 [Trend] 同步抓取今日官方 GitHub Trending TOP 10 (含500字中文深度解析)..."
    node fetch_github_trending.js || echo "⚠️ 抓取跳过或保留现有版本数据"

    cd website
    npm run build
    cd "$SCRIPT_DIR"

    # 自动探测本地可用科学上网代理（避免 LibreSSL SSL_connect 失败）
    GIT_PROXY_OPTS=()
    for port in 10809 7890 10808 1080; do
        if curl -s -m 1 "http://127.0.0.1:$port" >/dev/null 2>&1 || [ $? -eq 52 ] || [ $? -eq 56 ]; then
            echo "⚡ 自动接入本地代理端口: 127.0.0.1:$port"
            GIT_PROXY_OPTS=(-c "http.proxy=http://127.0.0.1:$port" -c "https.proxy=http://127.0.0.1:$port")
            break
        fi
    done

    DEPLOY_TMP="/tmp/macsur_deploy_$$"
    rm -rf "$DEPLOY_TMP"
    echo "📥 克隆发布仓库 macsur.github.io ..."
    git "${GIT_PROXY_OPTS[@]}" clone --depth=1 https://github.com/macsur/macsur.github.io.git "$DEPLOY_TMP"
    cd "$DEPLOY_TMP"

    # 清理旧静态资源 (严格保留 .git，不上传 .github/workflows 以规避 OAuth App workflow scope 权限拦截)
    find . -maxdepth 1 ! -name ".git" ! -name "." -exec rm -rf {} +

    # 拷贝最新 Next.js 静态导出构建物
    cp -r "$SCRIPT_DIR/website/out/"* .
    cp -r "$SCRIPT_DIR/website/out/".[!.]* . 2>/dev/null || true

    # 确保 .nojekyll 存在，防止 GitHub Pages 忽略 _next 目录
    touch .nojekyll

    git add -A
    if git diff --cached --quiet; then
        echo "✅ 网站内容无变动，跳过提交"
    else
        git commit -m "AutoSync: Update website to Google AI modern style & Trending TOP 10 [$(date '+%Y-%m-%d %H:%M')]"
        echo "⬆️ 推送到远程 main 分支..."
        git "${GIT_PROXY_OPTS[@]}" push origin main
    fi

    cd "$SCRIPT_DIR"
    rm -rf "$DEPLOY_TMP"

    echo "=================================================="
    echo "  🎉 部署完成！线上 x.zttz.eu.org 已生效！"
    echo "=================================================="
else
    echo "💡 提示: 若需要同步并直接部署上线，请运行: ./sync_upstream.sh --deploy"
fi
