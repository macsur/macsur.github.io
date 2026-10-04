#!/usr/bin/env bash
# ==============================================================================
# Kejilion 官方源码同步与工程推送脚本
# 用法:
#   ./sync_upstream.sh          -> 仅同步官方最新源码并注入 11+ 分类折叠
#   ./sync_upstream.sh --deploy -> 同步后推送源码到 macsur.github.io 的 source 源码分支
#                                  (严格禁止推送到 main 分支，由云端 Actions 负责编译并发布到 main)
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

# 4. 判断是否需要自动推送源码分支
if [ "$1" = "--deploy" ] || [ "$1" = "-d" ]; then
    echo "=================================================="
    echo "  🚀 正在推送最新工程源码至 macsur.github.io:source 分支..."
    echo "  (遵守铁律：绝不直接推 main 分支，触发云端自动统一构建)"
    echo "=================================================="

    # 自动探测本地可用科学上网代理（避免 LibreSSL SSL_connect 失败）
    GIT_PROXY_OPTS=()
    for port in 10809 7890 10808 1080; do
        if curl -s -m 1 "http://127.0.0.1:$port" >/dev/null 2>&1 || [ $? -eq 52 ] || [ $? -eq 56 ]; then
            echo "⚡ 自动接入本地代理端口: 127.0.0.1:$port"
            GIT_PROXY_OPTS=(-c "http.proxy=http://127.0.0.1:$port" -c "https.proxy=http://127.0.0.1:$port")
            break
        fi
    done

    DEPLOY_TMP="/tmp/macsur_source_deploy_$$"
    rm -rf "$DEPLOY_TMP"
    echo "📥 克隆 source 源码分支 ..."
    git "${GIT_PROXY_OPTS[@]}" clone -b source --depth=1 https://github.com/macsur/macsur.github.io.git "$DEPLOY_TMP"

    # 将本地最新工程文件全量同步到临时仓库
    cp -r "$SCRIPT_DIR/website/src" "$DEPLOY_TMP/website/"
    cp -r "$SCRIPT_DIR/website/public" "$DEPLOY_TMP/website/"
    cp -f "$SCRIPT_DIR/fetch_github_trending.js" "$DEPLOY_TMP/"
    cp -f "$SCRIPT_DIR/sync_upstream.js" "$DEPLOY_TMP/"
    cp -f "$SCRIPT_DIR/sync_upstream.sh" "$DEPLOY_TMP/"
    cp -f "$SCRIPT_DIR/apps_manager.sh" "$DEPLOY_TMP/"
    cp -f "$SCRIPT_DIR/kejilion.sh" "$DEPLOY_TMP/"
    cp -f "$SCRIPT_DIR/x.sh" "$DEPLOY_TMP/"

    cd "$DEPLOY_TMP"
    git add -A
    if git diff --cached --quiet; then
        echo "✅ source 源码分支无变动，无需推送"
    else
        git commit -m "AutoSync Source: Update upstream kejilion & site source [$(date '+%Y-%m-%d %H:%M')]"
        echo "⬆️ 推送到远程 source 分支..."
        git "${GIT_PROXY_OPTS[@]}" push origin source
        echo "⚡ 提示: 云端 GitHub Actions 已被自动唤醒，正在进行全新数据拉取与 Pages 发布！"
    fi

    cd "$SCRIPT_DIR"
    rm -rf "$DEPLOY_TMP"

    echo "=================================================="
    echo "  🎉 源码已同步到 source 分支！云端正在自动构建下发！"
    echo "=================================================="
else
    echo "💡 提示: 若需要同步并推送到源码分支，请运行: ./sync_upstream.sh --deploy"
fi
