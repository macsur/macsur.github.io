#!/bin/bash

# MacSur 文档站 - 高级功能自动配置脚本
# 功能：设置 Giscus 评论 + Google Analytics

set -e

echo "========================================"
echo "🚀 MacSur 高级功能配置助手"
echo "========================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_ok() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_err() { echo -e "${RED}[ERR]${NC} $1"; }

# 检查 jq
if ! command -v jq &> /dev/null; then
    log_err "需要 jq 工具，请先安装: brew install jq"
    exit 1
fi

# 1. 获取 Repository ID
log_info "步骤 1/4: 获取 Repository ID"

REPO="macsur/macsur.github.io"
log_info "仓库: $REPO"

# 检查是否有 GitHub Token
if [ -z "$GITHUB_TOKEN" ]; then
    log_warn "未设置 GITHUB_TOKEN 环境变量"
    echo "请访问 https://github.com/settings/personal-access-tokens 创建 Token"
    echo "权限需要：repo (public_repo)"
    read -p "输入您的 GitHub Token: " GITHUB_TOKEN
    export GITHUB_TOKEN
fi

# 获取 repo_id
REPO_DATA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO")
REPO_ID=$(echo "$REPO_DATA" | jq -r '.id')

if [ -z "$REPO_ID" ] || [ "$REPO_ID" = "null" ]; then
    log_err "无法获取 Repository ID，请检查 Token 权限"
    exit 1
fi

log_ok "Repository ID: R_kgDO$(printf "%06x" $REPO_ID)"
REPO_ID_HEX="R_kgDO$(printf "%06x" $REPO_ID)"

# 2. 检查 Discussions 状态
log_info "步骤 2/4: 检查 Discussions"

DISCUSSIONS_ENABLED=$(echo "$REPO_DATA" | jq -r '.has_discussions')
if [ "$DISCUSSIONS_ENABLED" = "false" ]; then
    log_warn "Discussions 未启用，请前往仓库 Settings → Features 开启"
    echo "https://github.com/$REPO/settings/features"
    read -p "开启后按 Enter 继续..."
    # 重新获取
    REPO_DATA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO")
fi

log_ok "Discussions 已启用"

# 3. 获取或创建 Category ID
log_info "步骤 3/4: 处理 Discussions Category"

# 获取所有 categories
CATEGORIES=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/discussions/categories")

# 查找是否有 "Docs" 或 "Documentation"
CATEGORY_ID=$(echo "$CATEGORIES" | jq -r '.[] | select(.name == "Docs" or .name == "Documentation") | .id' | head -1)

if [ -z "$CATEGORY_ID" ] || [ "$CATEGORY_ID" = "null" ]; then
    log_warn "未找到 'Docs' 分类，需要创建"
    read -p "输入要创建的 Category 名称 (默认: Docs): " CATEGORY_NAME
    CATEGORY_NAME=${CATEGORY_NAME:-"Docs"}

    # 创建 category
    CREATE_DATA=$(printf '{"name":"%s","description":"文档评论和反馈"}' "$CATEGORY_NAME")
    RESULT=$(curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$CREATE_DATA" \
        "https://api.github.com/repos/$REPO/discussions/categories")

    CATEGORY_ID=$(echo "$RESULT" | jq -r '.id')
    log_ok "已创建 Category: $CATEGORY_NAME (ID: DIC_kw$CATEGORY_ID)"
    CATEGORY_ID_HEX="DIC_kw$CATEGORY_ID"
else
    CATEGORY_NAME=$(echo "$CATEGORIES" | jq -r ".[] | select(.id == $CATEGORY_ID) | .name")
    log_ok "找到 Category: $CATEGORY_NAME (ID: DIC_kw$CATEGORY_ID)"
    CATEGORY_ID_HEX="DIC_kw$CATEGORY_ID"
fi

# 4. 询问 GA4 Measurement ID
log_info "步骤 4/4: Google Analytics 配置"

echo "请在 GA4 中创建媒体资源，获取 Measurement ID (格式: G-XXXXXXXXXX)"
read -p "输入 GA4 Measurement ID (直接回车跳过): " GA4_ID

# 更新 index.html
INDEX_FILE="/Users/ttnk/.openclaw/workspace/macsur-docs/index.html"
BACKUP_FILE="${INDEX_FILE}.bak.backup-$(date +%Y%m%d-%H%M%S)"

if [ ! -f "$INDEX_FILE" ]; then
    log_err "未找到 index.html: $INDEX_FILE"
    exit 1
fi

# 备份
cp "$INDEX_FILE" "$BACKUP_FILE"
log_ok "已备份: $(basename $BACKUP_FILE)"

# 替换 Giscus 配置
TEMP_FILE=$(mktemp)
sed "s/data-repo-id=\"R_kgDOXXXXXX\"/data-repo-id=\"$REPO_ID_HEX\"/g" "$INDEX_FILE" > "$TEMP_FILE"
sed -i "s/data-category-id=\"DIC_kwDOXXXXXX\"/data-category-id=\"$CATEGORY_ID_HEX\"/g" "$TEMP_FILE"

# 如果提供了 GA4 ID，替换
if [ -n "$GA4_ID" ]; then
    sed -i "s/G-XXXXXXXXXX/$GA4_ID/g" "$TEMP_FILE"
    log_ok "已更新 GA4 Measurement ID"
fi

# 写回
mv "$TEMP_FILE" "$INDEX_FILE"
log_ok "已更新 index.html"

# 5. 输出配置总结
echo ""
echo "========================================"
echo "✅ 配置完成！"
echo "========================================"
echo ""
echo "📋 配置摘要："
echo "  Repository:  $REPO"
echo "  Repo ID:     $REPO_ID_HEX"
echo "  Category:    $CATEGORY_NAME"
echo "  Category ID: $CATEGORY_ID_HEX"
echo "  GA4 ID:      ${GA4_ID:-未设置}"
echo ""
echo "📝 下一步："
echo "  1. 测试本地预览: cd /Users/ttnk/.openclaw/workspace/macsur-docs && docsify serve ."
echo "  2. 检查评论是否显示在页面底部"
echo "  3. 验证 GA4 实时报告"
echo "  4. 推送到 GitHub: git add . && git commit -m 'config: analytics & comments' && git push"
echo ""
echo "🔧 如需修改，编辑: $INDEX_FILE"
echo "========================================"
