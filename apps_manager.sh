#!/usr/bin/env bash
# ==============================================================================
# Kejilion 应用市场增强版模块 (apps_manager.sh)
# 采用手风琴折叠分类菜单、动态扩展自定义软件生态与一键生成向导
# 100% 兼容 Bash 3.2+ (macOS) 与 Bash 4/5 (Linux)
# ==============================================================================


# 兼容 macOS / Alpine 缺失 timeout 命令的情况
if ! command -v timeout >/dev/null 2>&1; then
    timeout() {
        # 如果第一个参数是数字或带s的超时时间 (如 30s)，则跳过
        if [[ "$1" =~ ^[0-9]+[sSmMhHdD]?$ ]]; then
            shift
        fi
        "$@"
    }
fi

# 定义分类列表: 分类ID:快捷键:分类名称:预置数量
CATEGORY_LIST=(
  "panel:A:🖥️  服务器运维与面板:14"
  "ai:B:🤖 人工智能与大模型:14"
  "monitor:C:📊 探针监控与运维告警:9"
  "storage:D:🗄️  私有网盘与文件存储:10"
  "network:E:🌐 网络代理与穿透组网:11"
  "media:F:🎬 影音媒体与下载娱乐:10"
  "office:G:📝 协作办公与知识库:11"
  "social:H:💬 即时通讯与社交媒体:6"
  "tools:I:🛠️  远程工具与实用套件:14"
  "custom:J:📦 自定义与第三方应用:0"
)

# 展开状态记录字符串 (空格分隔的已展开分类ID，初始为空代表全折叠)
EXPANDED_CATEGORIES=""

is_cat_expanded() {
    local target="$1"
    [[ " $EXPANDED_CATEGORIES " == *" $target "* ]]
}

toggle_cat_expanded() {
    local target="$1"
    if is_cat_expanded "$target"; then
        # 再次选中当前已展开的分类，执行折叠收起
        EXPANDED_CATEGORIES=""
    else
        # 独占式手风琴：只展开当前选中的分类，其他分类自动折叠
        EXPANDED_CATEGORIES=" $target "
    fi
}

expand_all_cats() {
    EXPANDED_CATEGORIES="panel ai monitor storage network media office social tools custom"
}

collapse_all_cats() {
    EXPANDED_CATEGORIES=""
}

get_cat_name() {
    local target="$1"
    for item in "${CATEGORY_LIST[@]}"; do
        local cid="" ckey="" cname="" ccount=""
        IFS=':' read -r cid ckey cname ccount <<< "$item"
        if [ "$cid" = "$target" ]; then
            echo "$cname"
            return 0
        fi
    done
    echo "$target"
}

get_cid_by_key() {
    local upper_k="$1"
    for item in "${CATEGORY_LIST[@]}"; do
        local cid="" ckey="" cname="" ccount=""
        IFS=':' read -r cid ckey cname ccount <<< "$item"
        if [ "$ckey" = "$upper_k" ]; then
            echo "$cid"
            return 0
        fi
    done
    echo ""
}

# 内置 118 个软件的标准数据库 (id|name|category|star|aliases|desc)
BUILTIN_APPS=(
  "1|宝塔面板官方版|panel||bt|baota|" \
  "2|aaPanel宝塔国际版|panel||aapanel|" \
  "3|1Panel新一代管理面板|panel||1p|1panel|" \
  "4|NginxProxyManager可视化面板|network||npm|一个Nginx反向代理工具面板，不支持添加域名访问。" \
  "5|OpenList多存储文件列表程序|storage||openlist|一个支持多种存储，支持网页浏览和 WebDAV 的文件列表程序，由 gi..." \
  "6|Ubuntu远程桌面网页版|tools||webtop-ubuntu|webtop基于Ubuntu的容器。若IP无法访问，请添加域名访问。" \
  "7|哪吒探针VPS监控面板|monitor||nezha|" \
  "8|QB离线BT磁力下载面板|media||qb|QB|qbittorrent离线BT磁力下载服务" \
  "9|Poste.io邮件服务器程序|social||mail|" \
  "10|RocketChat多人在线聊天系统|social||rocketchat|Rocket.Chat 是一个开源的团队通讯平台，支持实时聊天、音视频通..." \
  "11|禅道项目管理软件|office||zentao|禅道是通用的项目管理软件" \
  "12|青龙面板定时任务管理平台|panel||qinglong|青龙面板是一个定时任务管理平台" \
  "13|Cloudreve网盘|storage||cloudreve|cloudreve是一个支持多家云存储的网盘系统" \
  "14|简单图床图片管理程序|storage||easyimage|简单图床是一个简单的图床程序" \
  "15|emby多媒体管理系统|media||emby|emby是一个主从式架构的媒体服务器软件，可以用来整理服务器上的视频和音..." \
  "16|Speedtest测速面板|monitor||looking|Speedtest测速面板是一个VPS网速测试工具，多项测试功能，还可以..." \
  "17|AdGuardHome去广告软件|network||adguardhome|AdGuardHome是一款全网广告拦截与反跟踪软件，未来将不止是一个D..." \
  "18|onlyoffice在线办公OFFICE|office||onlyoffice|onlyoffice是一款开源的在线office工具，太强大了！" \
  "19|雷池WAF防火墙面板|network||safeline|" \
  "20|portainer容器管理面板|panel||portainer|portainer是一个轻量级的docker容器管理面板" \
  "21|VScode网页版|office||vscode|VScode是一款强大的在线代码编写工具" \
  "22|UptimeKuma监控工具|monitor||uptime-kuma|Uptime Kuma 易于使用的自托管监控工具" \
  "23|Memos网页备忘录|office||memos|Memos是一款轻量级、自托管的备忘录中心" \
  "24|Webtop远程桌面网页版|tools||webtop|webtop基于Alpine的中文版容器。若IP无法访问，请添加域名访问..." \
  "25|Nextcloud网盘|storage||nextcloud|Nextcloud拥有超过 400,000 个部署，是您可以下载的最受欢..." \
  "26|QD-Today定时任务管理框架|tools||qd|QD-Today是一个HTTP请求定时任务自动执行框架" \
  "27|Dockge容器堆栈管理面板|panel||dockge|dockge是一个可视化的docker-compose容器管理面板" \
  "28|LibreSpeed测速工具|monitor||speedtest|librespeed是用Javascript实现的轻量级速度测试工具，即..." \
  "29|searxng聚合搜索站|tools||searxng|searxng是一个私有且隐私的搜索引擎站点" \
  "30|PhotoPrism私有相册系统|storage||photoprism|photoprism非常强大的私有相册系统" \
  "31|StirlingPDF工具大全|office||s-pdf|这是一个强大的本地托管基于 Web 的 PDF 操作工具，使用 dock..." \
  "32|drawio免费的在线图表软件|office||drawio|这是一个强大图表绘制软件。思维导图，拓扑图，流程图，都能画" \
  "33|Sun-Panel导航面板|social||sun-panel|Sun-Panel服务器、NAS导航面板、Homepage、浏览器首页" \
  "34|Pingvin-Share文件分享平台|storage||pingvin-share|Pingvin Share 是一个可自建的文件分享平台，是 WeTran..." \
  "35|极简朋友圈|social||moments|极简朋友圈，高仿微信朋友圈，记录你的美好生活" \
  "36|LobeChatAI聊天聚合网站|ai||lobe-chat|LobeChat聚合市面上主流的AI大模型，ChatGPT/Claude..." \
  "37|MyIP工具箱|tools||myip|是一个多功能IP工具箱，可以查看自己IP信息及连通性，用网页面板呈现" \
  "38|小雅alist全家桶|storage||xiaoya|" \
  "39|Bililive直播录制工具|media||bililive|Bililive-go是一个支持多种直播平台的直播录制工具" \
  "40|webssh网页版SSH连接工具|tools||webssh|简易在线ssh连接工具和sftp工具" \
  "41|耗子管理面板|panel||haozi|acepanel|" \
  "42|Nexterm远程连接工具|tools||nexterm|nexterm是一款强大的在线SSH/VNC/RDP连接工具。" \
  "43|RustDesk远程桌面(服务端)|tools||hbbs|rustdesk开源的远程桌面(服务端)，类似自己的向日葵私服。" \
  "44|RustDesk远程桌面(中继端)|tools||hbbr|rustdesk开源的远程桌面(中继端)，类似自己的向日葵私服。" \
  "45|Docker加速站|network||registry|Docker Registry 是一个用于存储和分发 Docker 镜像..." \
  "46|GitHub加速站|network||ghproxy|使用Go实现的GHProxy，用于加速部分地区Github仓库的拉取。" \
  "47|普罗米修斯监控|monitor||prometheus|grafana|Prometheus+Grafana企业级监控系统" \
  "48|普罗米修斯(主机监控)|monitor||node-exporter|这是一个普罗米修斯的主机数据采集组件，请部署在被监控主机上。" \
  "49|普罗米修斯(容器监控)|monitor||cadvisor|这是一个普罗米修斯的容器数据采集组件，请部署在被监控主机上。" \
  "50|补货监控工具|monitor||changedetection|这是一款网站变化检测、补货监控和通知的小工具" \
  "51|PVE开小鸡面板|panel||pve|" \
  "52|DPanel容器管理面板|panel||dpanel|Docker可视化面板系统，提供完善的docker管理功能。" \
  "53|llama3聊天AI大模型|ai||llama3|OpenWebUI一款大语言模型网页框架，接入全新的llama3大语言模..." \
  "54|AMH主机建站管理面板|panel||amh|" \
  "55|FRP内网穿透(服务端)|network||frps|" \
  "56|FRP内网穿透(客户端)|network||frpc|" \
  "57|Deepseek聊天AI大模型|ai||deepseek|OpenWebUI一款大语言模型网页框架，接入全新的DeepSeek R..." \
  "58|Dify大模型知识库|ai||dify|是一款开源的大语言模型(LLM) 应用开发平台。自托管训练数据用于AI生..." \
  "59|NewAPI大模型资产管理|ai||new-api|新一代大模型网关与AI资产管理系统" \
  "60|JumpServer开源堡垒机|panel||jms|是一个开源的特权访问管理 (PAM) 工具，该程序占用80端口不支持添加..." \
  "61|在线翻译服务器|tools||libretranslate|免费开源机器翻译 API，完全自托管，它的翻译引擎由开源Argos Tr..." \
  "62|RAGFlow大模型知识库|ai||ragflow|基于深度文档理解的开源 RAG（检索增强生成）引擎" \
  "63|OpenWebUI自托管AI平台|ai||open-webui|OpenWebUI一款大语言模型网页框架，官方精简版本，支持各大模型AP..." \
  "64|it-tools工具箱|tools||it-tools|对开发人员和 IT 工作者来说非常有用的工具" \
  "65|n8n自动化工作流平台|tools||n8n|是一款功能强大的自动化工作流平台" \
  "66|yt-dlp视频下载工具|media||yt|" \
  "67|ddns-go动态DNS管理工具|network||ddns|自动将你的公网 IP（IPv4/IPv6）实时更新到各大 DNS 服务商..." \
  "68|AllinSSL证书管理平台|network||allinssl|开源免费的 SSL 证书自动化管理平台" \
  "69|SFTPGo文件传输工具|storage||sftpgo|开源免费随时随地SFTP FTP WebDAV 文件传输工具" \
  "70|AstrBot聊天机器人框架|ai||astrbot|开源AI聊天机器人框架，支持微信，QQ，TG接入AI大模型" \
  "71|Navidrome私有音乐服务器|media||navidrome|是一个轻量、高性能的音乐流媒体服务器" \
  "72|bitwarden密码管理器|tools||bitwarden|一个你可以控制数据的密码管理器" \
  "73|LibreTV私有影视|media||libretv|免费在线视频搜索与观看平台" \
  "74|MoonTV私有影视|media||moontv|免费在线视频搜索与观看平台" \
  "75|Melody音乐精灵|media||melody|你的音乐精灵，旨在帮助你更好地管理音乐。" \
  "76|在线DOS老游戏|media||dosgame|是一个中文DOS游戏合集网站" \
  "77|迅雷离线下载工具|media||xunlei|迅雷你的离线高速BT磁力下载工具" \
  "78|PandaWiki智能文档管理系统|office||PandaWiki|PandaWiki是一款AI大模型驱动的开源智能文档管理系统，强烈建议不..." \
  "79|Beszel服务器监控|monitor||beszel|Beszel轻量易用的服务器监控" \
  "80|linkwarden书签管理|office||linkwarden|一个开源的自托管书签管理平台，支持标签、搜索和团队协作。" \
  "81|JitsiMeet视频会议|social||jitsi|一个开源的安全视频会议解决方案，支持多人在线会议、屏幕共享与加密通信。" \
  "82|gpt-load高性能AI透明代理|ai||gpt-load|高性能AI接口透明代理服务" \
  "83|komari服务器监控工具|monitor||komari|轻量级的自托管服务器监控工具" \
  "84|Wallos个人财务管理工具|office||wallos|开源个人订阅追踪器，可用于财务管理" \
  "85|immich图片视频管理器|storage||immich|高性能自托管照片和视频管理解决方案。" \
  "86|jellyfin媒体管理系统|media||jellyfin|是一款开源媒体服务器软件" \
  "87|SyncTV一起看片神器|media||synctv|远程一起观看电影和直播的程序。它提供了同步观影、直播、聊天等功能" \
  "88|Owncast自托管直播平台|media||owncast|开源、免费的自建直播平台" \
  "89|FileCodeBox文件快递|storage||file-code-box|匿名口令分享文本和文件，像拿快递一样取文件" \
  "90|matrix去中心化聊天协议|social||matrix|Matrix是一个去中心化的聊天协议" \
  "91|gitea私有代码仓库|tools||gitea|免费新一代的代码托管平台，提供接近 GitHub 的使用体验。" \
  "92|FileBrowser文件管理器|storage||filebrowser|是一个基于Web的文件管理器" \
  "93|Dufs极简静态文件服务器|storage||dufs|极简静态文件服务器，支持上传下载" \
  "94|Gopeed高速下载工具|media||gopeed|分布式高速下载工具，支持多种协议" \
  "95|paperless文档管理平台|office||paperless|开源的电子文档管理系统，它的主要用途是把你的纸质文件数字化并管理起来。" \
  "96|2FAuth自托管二步验证器|tools||2fauth|自托管的双重身份验证 (2FA) 账户管理和验证码生成工具。" \
  "97|WireGuard组网(服务端)|network||wgs|现代化、高性能的虚拟专用网络工具" \
  "98|WireGuard组网(客户端)|network||wgc|现代化、高性能的虚拟专用网络工具" \
  "99|DSM群晖虚拟机|tools||dsm|Docker容器中的虚拟DSM" \
  "100|Syncthing点对点文件同步工具|storage||syncthing|开源的点对点文件同步工具，类似于 Dropbox、Resilio Syn..." \
  "101|AI视频生成工具|ai||moneyprinterturbo|MoneyPrinterTurbo是一款使用AI大模型合成高清短视频的工..." \
  "102|VoceChat多人在线聊天系统|social||vocechat|是一款支持独立部署的个人云社交媒体聊天服务" \
  "103|Umami网站统计工具|monitor||umami|开源、轻量、隐私友好的网站分析工具，类似于GoogleAnalytics..." \
  "104|Stream四层代理转发工具|network||nginx-stream|" \
  "105|思源笔记|office||siyuan|思源笔记是一款隐私优先的知识管理系统" \
  "106|Drawnix开源白板工具|office||drawnix|是一款强大的开源白板工具，集成思维导图、流程图等。" \
  "107|PanSou网盘搜索|tools||pansou|PanSou是一个高性能的网盘资源搜索API服务。" \
  "108|LangBot聊天机器人|ai||langbot|是一个开源的大语言模型原生即时通信机器人开发平台" \
  "109|ZFile在线网盘|storage||zfile|是一个适用于个人或小团队的在线网盘程序。" \
  "110|Karakeep书签管理|office||karakeep|是一款可自行托管的书签应用，带有人工智能功能，专为数据囤积者而设计。" \
  "111|多格式文件转换工具|tools||convertx|是一个功能强大的多格式文件转换工具（支持文档、图像、音频视频等）强烈建议..." \
  "112|Lucky大内网穿透工具|network||lucky|Lucky 是一个大内网穿透及端口转发管理工具，支持 DDNS、反向代理..." \
  "113|Firefox浏览器|tools||firefox|是一个运行在 Docker 中的 Firefox 浏览器，支持通过网页直..." \
  "114|OpenClaw机器人管理工具|ai||Moltbot|ClawdBot|moltbot|clawdbot|openclaw|OpenClaw|" \
  "115|Hermes机器人管理工具|ai||hermes|" \
  "116|DeepSeek Harness管理工具|ai||deepseek-harness|DeepSeek-Harness|dsh|" \
  "117|99CDN自建CDN管理平台|network||99cdn|" \
  "118|99DNS智能调度服务|network||99dns|"
)

# 动态加载第三方应用
load_custom_apps() {
    CUSTOM_APPS=()
    local scanned_files=()

    local dirs=("$HOME/apps" "${KJ_SCRIPT_DIR:-}/apps" "$(dirname "$0")/apps" "./apps")

    # 搜集所有存在的 .conf 文件
    local found_confs=()
    for d in "${dirs[@]}"; do
        [ -d "$d" ] || continue
        for conf in "$d"/*.conf; do
            [ -f "$conf" ] || continue
            local bname
            bname=$(basename "$conf" .conf)
            if [[ " ${scanned_files[*]} " == *" ${bname} "* ]]; then
                continue
            fi
            scanned_files+=("$bname")
            found_confs+=("$conf")
        done
    done

    # 按照文件名升序排序，使 J1, J2... 顺序稳定固定
    local sorted_confs=()
    if [ "${#found_confs[@]}" -gt 0 ]; then
        while IFS= read -r line; do
            [ -n "$line" ] && sorted_confs+=("$line")
        done < <(printf '%s\n' "${found_confs[@]}" | sort -f)
    fi

    for conf in "${sorted_confs[@]}"; do
        local bname
        bname=$(basename "$conf" .conf)
        local app_id="$bname"
        local app_name=""
        local app_category="custom"
        local app_text=""
        local app_star=""

        app_id=$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_id=' "$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
        [ -z "$app_id" ] && app_id="$bname"

        app_name=$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_name=' "$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | sed -e 's/^[[:space:]]*["'\'']//' -e 's/["'\''][[:space:]]*$//')
        [ -z "$app_name" ] && app_name="$app_id"

        local cat_temp
        cat_temp=$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_category=' "$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ' | tr '[:upper:]' '[:lower:]')
        if [ -n "$cat_temp" ]; then
            case "$cat_temp" in
                panel|ai|monitor|storage|network|media|office|social|tools|custom)
                    app_category="$cat_temp"
                    ;;
            esac
        fi

        app_text=$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_text=' "$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | sed -e 's/^[[:space:]]*["'\'']//' -e 's/["'\''][[:space:]]*$//')
        [ -n "$app_text" ] && [ ${#app_text} -gt 36 ] && app_text="${app_text:0:36}..."

        CUSTOM_APPS+=("$app_id|$app_name|$app_category|$app_star|$bname|$app_text|$conf")
    done
}

# 渲染手风琴式可折叠菜单
render_accordion_apps_menu() {
    load_custom_apps

    local app_installed=""
    if [ -f /home/docker/appno.txt ]; then
        app_installed=$(cat /home/docker/appno.txt 2>/dev/null || echo "")
    fi

    while true; do
        clear
        echo -e "${gl_kjlan}========================================================================${gl_bai}"
        echo -e "${gl_huang}  🚀 科技Lion 应用市场 · 智能分类手风琴视图 (共 118+ 应用)${gl_bai}"
        echo -e "${gl_kjlan}========================================================================${gl_bai}"

        for item in "${CATEGORY_LIST[@]}"; do
            local cid="" ckey="" cname="" ccount=""
            IFS=':' read -r cid ckey cname ccount <<< "$item"

            # 关键修正：J 分类数量动态反映实际自定义应用款数！
            if [ "$cid" = "custom" ]; then
                ccount="${#CUSTOM_APPS[@]}"
            fi

            if is_cat_expanded "$cid"; then
                echo -e "${gl_kjlan}▼ [${gl_huang}$ckey${gl_kjlan}] ${gl_bai}$cname ${gl_hui}[$ccount 款]${gl_bai}"
                echo -e "${gl_hui}  ┌───────────────────────────────────────────────────────────────────${gl_bai}"

                # 仅对展开的目标分类遍历其包含的软件，纯 Bash 内置拆分，0 子进程！
                for entry in "${BUILTIN_APPS[@]}"; do
                    local aid="" aname="" acat="" astar="" aalias="" adesc=""
                    IFS='|' read -r aid aname acat astar aalias adesc <<< "$entry"

                    if [ "$acat" = "$cid" ]; then
                        local is_inst=0
                        if [ -n "$app_installed" ] && [[ " $app_installed " == *" $aid "* ]]; then
                            is_inst=1
                        fi

                        local star_badge=""
                        [ -n "$astar" ] && star_badge="${gl_huang}★${gl_bai}"

                        local num_prefix=""
                        num_prefix=$(printf "${gl_kjlan}  │ ${gl_bai}[%3d] " "$aid")
                        local status_badge=""
                        if [ "$is_inst" -eq 1 ]; then
                            status_badge="${gl_lv}[已安装]${gl_bai}"
                        fi

                        printf "%b%-34s %b %b\n" "$num_prefix" "$aname$star_badge" "$status_badge" "${gl_hui}$adesc${gl_bai}"
                    fi
                done

                # 若是自定义分类，自动生成 [J1]、[J2] 顺序序号并展示
                if [ "$cid" = "custom" ]; then
                    if [ "${#CUSTOM_APPS[@]}" -eq 0 ]; then
                        echo -e "${gl_hui}  │ (暂未检测到自定义应用。可按 [+] 添加或将 .conf 放入 ~/apps 目录)${gl_bai}"
                    else
                        local j_idx=1
                        for entry in "${CUSTOM_APPS[@]}"; do
                            local aid="" aname="" acat="" astar="" aalias="" adesc="" aconf=""
                            IFS='|' read -r aid aname acat astar aalias adesc aconf <<< "$entry"
                            local j_tag="J${j_idx}"
                            local num_prefix=""
                            num_prefix=$(printf "${gl_kjlan}  │ ${gl_huang}[%-4s]${gl_bai} " "$j_tag")
                            printf "%b%-28s %b\n" "$num_prefix" "$aname" "${gl_hui}$adesc${gl_bai}"
                            j_idx=$((j_idx + 1))
                        done
                    fi
                fi

                echo -e "${gl_hui}  └───────────────────────────────────────────────────────────────────${gl_bai}"
            else
                # 关键优化：未展开分类瞬间输出纯折叠样式行，不跑任何内部循环，0 延迟！
                echo -e "${gl_hui}▶ [${gl_huang}$ckey${gl_hui}] ${gl_bai}$cname ${gl_hui}[$ccount 款]${gl_bai}"
            fi
        done

        echo -e "${gl_kjlan}------------------------------------------------------------------------${gl_bai}"
        echo -e "${gl_bai}分类控制: [${gl_huang}A~J${gl_bai}] 折叠/展开对应分类  [${gl_huang}ALL${gl_bai}] 全部展开  [${gl_huang}COL${gl_bai}] 全部折叠"
        echo -e "${gl_bai}快捷操作: [${gl_huang}S${gl_bai}] 搜索应用  [${gl_huang}+${gl_bai}] 自定义软件  [${gl_huang}BAK${gl_bai}] 备份全部  [${gl_huang}R${gl_bai}] 还原  [${gl_huang}0${gl_bai}] 退出"
        echo -e "${gl_kjlan}------------------------------------------------------------------------${gl_bai}"
        echo -e "${gl_huang}提示: 输入 A~J 查看分类；输入数字(如 36, 57)或编号(如 J1, J2)直接开始安装！${gl_bai}"

        read -e -p "请输入你的选择: " user_input
        [ -z "$user_input" ] && continue

        local upper_input
        upper_input=$(echo "$user_input" | tr '[:lower:]' '[:upper:]')
        local lower_input
        lower_input=$(echo "$user_input" | tr '[:upper:]' '[:lower:]')

        # 1. 优先匹配 J1, J2, J3... 自定义序号快速安装
        if [[ "$upper_input" =~ ^J([0-9]+)$ ]]; then
            local j_num="${BASH_REMATCH[1]}"
            local j_idx=$((j_num - 1))
            if [ "$j_idx" -ge 0 ] && [ "$j_idx" -lt "${#CUSTOM_APPS[@]}" ]; then
                local t_entry="${CUSTOM_APPS[$j_idx]}"
                local t_aid="" t_aname="" t_acat="" t_astar="" t_alias="" t_adesc="" t_conf=""
                IFS='|' read -r t_aid t_aname t_acat t_astar t_alias t_adesc t_conf <<< "$t_entry"
                SELECTED_APP_ACTION="$t_alias"
                SELECTED_CUSTOM_CONF="$t_conf"
                return 0
            else
                echo -e "${gl_hong}错误: 自定义应用编号 J${j_num} 无效 (当前可用范围: J1 ~ J${#CUSTOM_APPS[@]})${gl_bai}"
                sleep 1.5
                continue
            fi
        fi

        # 2. 匹配单字母分类快捷键 (A~J / a~j)
        local matched_cid
        matched_cid=$(get_cid_by_key "$upper_input")
        if [ -n "$matched_cid" ]; then
            toggle_cat_expanded "$matched_cid"
            continue
        fi

        # 3. 匹配分类英文全称直接展开 (如 ai, panel, monitor 等)
        case "$lower_input" in
            panel|ai|monitor|storage|network|media|office|social|tools|custom)
                toggle_cat_expanded "$lower_input"
                continue
                ;;
        esac

        # 4. 全局快捷操作
        case "$lower_input" in
            0)
                SELECTED_APP_ACTION="0"
                return 0
                ;;
            all|\*)
                expand_all_cats
                continue
                ;;
            col|collapse|_|-)
                collapse_all_cats
                continue
                ;;
            s|/|search|find)
                search_apps_wizard
                if [ -n "$SELECTED_APP_ACTION" ]; then
                    return 0
                fi
                continue
                ;;
            \+|add|new)
                new_custom_app_wizard
                load_custom_apps
                continue
                ;;
            bak|backup)
                SELECTED_APP_ACTION="b"
                return 0
                ;;
            r|rst|restore)
                SELECTED_APP_ACTION="r"
                return 0
                ;;
            *)
                # 数字直接安装内置应用
                if [[ "$user_input" =~ ^[0-9]+$ ]]; then
                    SELECTED_APP_ACTION="$user_input"
                    return 0
                fi

                # 其它按键传给应用管理器处理
                SELECTED_APP_ACTION="$user_input"
                return 0
                ;;
        esac
    done
}

# 交互式搜索应用向导
search_apps_wizard() {
    clear
    echo -e "${gl_kjlan}========================================================================${gl_bai}"
    echo -e "${gl_huang}  🔍 Kejilion 应用市场 · 快速搜索${gl_bai}"
    echo -e "${gl_kjlan}========================================================================${gl_bai}"
    read -e -p "请输入应用关键词或拼音 (直接回车取消): " kw
    [ -z "$kw" ] && return 0

    local kw_lower
    kw_lower=$(echo "$kw" | tr '[:upper:]' '[:lower:]')

    local matches=()
    for entry in "${BUILTIN_APPS[@]}"; do
        local aid="" aname="" acat="" astar="" aalias="" adesc=""
        aid=$(echo "$entry" | cut -d'|' -f1)
        aname=$(echo "$entry" | cut -d'|' -f2)
        acat=$(echo "$entry" | cut -d'|' -f3)
        astar=$(echo "$entry" | cut -d'|' -f4)
        aalias=$(echo "$entry" | cut -d'|' -f5)
        adesc=$(echo "$entry" | cut -d'|' -f6)

        local search_str="$aid $aname $aalias $adesc $acat"
        search_str=$(echo "$search_str" | tr '[:upper:]' '[:lower:]')
        if [[ "$search_str" == *"$kw_lower"* ]]; then
            matches+=("$aid|$aname|$acat|$astar|$adesc")
        fi
    done

    for entry in "${CUSTOM_APPS[@]}"; do
        local aid="" aname="" acat="" astar="" aalias="" adesc=""
        aid=$(echo "$entry" | cut -d'|' -f1)
        aname=$(echo "$entry" | cut -d'|' -f2)
        acat=$(echo "$entry" | cut -d'|' -f3)
        astar=$(echo "$entry" | cut -d'|' -f4)
        aalias=$(echo "$entry" | cut -d'|' -f5)
        adesc=$(echo "$entry" | cut -d'|' -f6)

        local search_str="$aid $aname $aalias $adesc $acat"
        search_str=$(echo "$search_str" | tr '[:upper:]' '[:lower:]')
        if [[ "$search_str" == *"$kw_lower"* ]]; then
            matches+=("$aid|$aname|$acat|$astar|$adesc")
        fi
    done

    echo ""
    if [ ${#matches[@]} -eq 0 ]; then
        echo -e "${gl_hong}未找到与 "$kw" 相关的软件。${gl_bai}"
        read -e -p "按回车键返回菜单..." _dummy
        return 0
    fi

    echo -e "共找到 ${gl_huang}${#matches[@]}${gl_bai} 款匹配的应用："
    echo -e "${gl_hui}------------------------------------------------------------------------${gl_bai}"
    for m in "${matches[@]}"; do
        local maid="" maname="" macat="" mastar="" mdesc=""
        maid=$(echo "$m" | cut -d'|' -f1)
        maname=$(echo "$m" | cut -d'|' -f2)
        macat=$(echo "$m" | cut -d'|' -f3)
        mastar=$(echo "$m" | cut -d'|' -f4)
        mdesc=$(echo "$m" | cut -d'|' -f5)
        local cat_title
        cat_title=$(get_cat_name "$macat")
        printf "  ${gl_kjlan}[%-5s]${gl_bai} %-30s ${gl_hui}%-22s %s${gl_bai}\n" "$maid" "$maname" "($cat_title)" "$mdesc"
    done
    echo -e "${gl_hui}------------------------------------------------------------------------${gl_bai}"
    read -e -p "请输入要操作的应用编号 (输入0取消): " chosen_id
    if [ -n "$chosen_id" ] && [ "$chosen_id" != "0" ]; then
        SELECTED_APP_ACTION="$chosen_id"
    fi
}

# 一键创建自定义软件向导
new_custom_app_wizard() {
    clear
    echo -e "${gl_kjlan}========================================================================${gl_bai}"
    echo -e "${gl_huang}  ➕ Kejilion 新增自定义软件向导 (自动生成 apps/*.conf 模板)${gl_bai}"
    echo -e "${gl_kjlan}========================================================================${gl_bai}"
    echo -e "本向导将帮助您根据 ${gl_huang}dev.kejilion.sh${gl_bai} 官方规范快速注册一个新应用。"
    echo ""

    local app_dir="$HOME/apps"
    [ ! -d "$app_dir" ] && mkdir -p "$app_dir"

    read -e -p "1. 应用唯一英文ID (例: my-blog, 仅小写字母和连字符): " wiz_id
    wiz_id=$(echo "$wiz_id" | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9-_')
    if [ -z "$wiz_id" ]; then
        echo -e "${gl_hong}ID 不能为空，已取消。${gl_bai}"
        sleep 1.5
        return 0
    fi

    if [ -f "$app_dir/$wiz_id.conf" ]; then
        echo -e "${gl_hong}应用配置文件 $app_dir/$wiz_id.conf 已存在！${gl_bai}"
        read -e -p "是否覆盖创建？(y/N): " wiz_overwrite
        [[ "$wiz_overwrite" =~ ^[Yy]$ ]] || return 0
    fi

    read -e -p "2. 应用显示名称 (例: 我的个人博客): " wiz_name
    [ -z "$wiz_name" ] && wiz_name="$wiz_id"

    echo ""
    echo "请选择所属分类："
    echo "  1) panel   - 🖥️  服务器运维与面板"
    echo "  2) ai      - 🤖 人工智能与大模型"
    echo "  3) monitor - 📊 探针监控与运维告警"
    echo "  4) storage - 🗄️  私有网盘与文件存储"
    echo "  5) network - 🌐 网络代理与穿透组网"
    echo "  6) media   - 🎬 影音媒体与下载娱乐"
    echo "  7) office  - 📝 协作办公与知识库"
    echo "  8) social  - 💬 即时通讯与社交媒体"
    echo "  9) tools   - 🛠️  远程工具与实用套件"
    read -e -p "3. 请输入分类序号 [默认9]: " wiz_cat_idx
    local wiz_cat="tools"
    if [ "$wiz_cat_idx" = "1" ]; then
        wiz_cat="panel"
    elif [ "$wiz_cat_idx" = "2" ]; then
        wiz_cat="ai"
    elif [ "$wiz_cat_idx" = "3" ]; then
        wiz_cat="monitor"
    elif [ "$wiz_cat_idx" = "4" ]; then
        wiz_cat="storage"
    elif [ "$wiz_cat_idx" = "5" ]; then
        wiz_cat="network"
    elif [ "$wiz_cat_idx" = "6" ]; then
        wiz_cat="media"
    elif [ "$wiz_cat_idx" = "7" ]; then
        wiz_cat="office"
    elif [ "$wiz_cat_idx" = "8" ]; then
        wiz_cat="social"
    else
        wiz_cat="tools"
    fi

    read -e -p "4. 一句话简介 (说明用途): " wiz_text
    read -e -p "5. 项目官网/GitHub链接: " wiz_url
    read -e -p "6. Docker容器名 [默认 ${wiz_id}_app]: " wiz_dname
    [ -z "$wiz_dname" ] && wiz_dname="${wiz_id}_app"

    read -e -p "7. 默认访问端口 [默认 8080]: " wiz_dport
    [ -z "$wiz_dport" ] && wiz_dport="8080"

    read -e -p "8. 占用空间估算(GB) [默认 1]: " wiz_size
    [ -z "$wiz_size" ] && wiz_size="1"

    cat << WIZARD_EOF > "$app_dir/$wiz_id.conf"
# --- 基础信息 / Basic Information ---
local app_id="$wiz_id"
local app_name="$wiz_name"
local app_category="$wiz_cat"
local app_text="$wiz_text"
local app_url="$wiz_url"
local docker_name="$wiz_dname"
local docker_port="$wiz_dport"
local app_size="$wiz_size"

# --- 核心逻辑 / Core Logic ---
docker_app_install() {
    mkdir -p /home/docker/$wiz_id && cd /home/docker/$wiz_id
    cat << DOCKER_COMPOSE_EOF > docker-compose.yml
services:
  $wiz_dname:
    image: nginx:alpine
    container_name: $wiz_dname
    restart: always
    ports:
      - "\${docker_port}:80"
DOCKER_COMPOSE_EOF

    docker compose up -d
    echo "$wiz_name 安装完成！"
    check_docker_app_ip
}

docker_app_update() {
    cd /home/docker/$wiz_id
    docker compose pull
    docker compose up -d
    echo "$wiz_name 更新完成！"
}

docker_app_uninstall() {
    cd /home/docker/$wiz_id
    docker compose down --rmi all
    rm -rf /home/docker/$wiz_id
    echo "$wiz_name 卸载完成！"
}

# --- 注册 (必须包含) ---
docker_app_plus
WIZARD_EOF

    chmod +x "$app_dir/$wiz_id.conf"
    local cat_display
    cat_display=$(get_cat_name "$wiz_cat")
    echo ""
    echo -e "${gl_lv}✅ 成功创建自定义应用配置文件: $app_dir/$wiz_id.conf${gl_bai}"
    echo -e "您可以在该分类（$cat_display）下直接看到并管理它！"
    read -e -p "按回车键继续..." _dummy
}

linux_panel_accordion() {
    local target_app=""
    while true; do
        render_accordion_apps_menu
        target_app="$SELECTED_APP_ACTION"
        [ -z "$target_app" ] && break

        case "$target_app" in
            0)
                break
                ;;
            11|orig|classic)
                if command -v linux_panel >/dev/null 2>&1; then
                    linux_panel
                fi
                ;;
            b|bak|backup)
                if command -v linux_panel >/dev/null 2>&1; then
                    linux_panel "b"
                fi
                ;;
            r|rst|restore)
                if command -v linux_panel >/dev/null 2>&1; then
                    linux_panel "r"
                fi
                ;;
            *)
                if command -v linux_panel >/dev/null 2>&1; then
                    linux_panel "$target_app"
                fi
                ;;
        esac
    done
}

