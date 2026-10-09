#!/usr/bin/env node

/**
 * ==============================================================================
 * Kejilion.sh 官方源码自动化同步与智能打补丁工具 (sync_upstream.js)
 * 1. 自动拉取官方 kejilion/sh 最新源码
 * 2. 自动保留原有 11 项功能，零破坏
 * 3. 自动注入 11+. 应用市场 [分类折叠] 增强手风琴模块 (A1~J* + 原编号双向支持)
 * 4. 修复官方未做文件检测导致的 sed: can't read /root/kejilion.sh 报错
 * ==============================================================================
 */

const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname);
const UPSTREAM_URLS = [
    'https://raw.githubusercontent.com/kejilion/sh/main/kejilion.sh',
    'https://ghproxy.net/https://raw.githubusercontent.com/kejilion/sh/main/kejilion.sh',
    'https://cdn.jsdelivr.net/gh/kejilion/sh@main/kejilion.sh'
];

console.log('🚀 [1/5] 正在拉取 Kejilion.sh 官方最新源码...');
let officialCode = '';

for (const url of UPSTREAM_URLS) {
    try {
        console.log(`正在尝试从: ${url} 拉取...`);
        officialCode = cp.execSync(`curl -sL --connect-timeout 8 --max-time 15 "${url}"`, {
            maxBuffer: 50 * 1024 * 1024
        }).toString('utf8');
        if (officialCode.includes('kejilion_sh()') && officialCode.includes('linux_panel()')) {
            console.log(`✅ 成功从 ${url} 获取源码，大小：${(officialCode.length / 1024).toFixed(2)} KB`);
            break;
        }
    } catch (e) {
        // 继续下一个镜像
    }
}

if (!officialCode.includes('kejilion_sh()') || !officialCode.includes('linux_panel()')) {
    console.log('⚠️ 远程拉取超时，正在使用本地已有源码进行打补丁与同步...');
    officialCode = fs.readFileSync(path.join(ROOT_DIR, 'kejilion.sh'), 'utf8');
}

console.log('🔧 [2/5] 正在执行智能守护与健壮性补丁...');

// 补丁 1.1: 增加 ZTTZ 增强版标识
const versionOld = `sh_v="4.5.10"`;
if (officialCode.includes(versionOld)) {
    officialCode = officialCode.replace(versionOld, `${versionOld}\nzttz_edition="true"\nzttz_v="1.0.0"`);
} else {
    officialCode = officialCode.replace(/(sh_v="[^"]*")/, `$1\nzttz_edition="true"\nzttz_v="1.0.0"`);
}
const canshuOld = `canshu_v6() {
	if grep -q '^canshu="V6"' /usr/local/bin/k > /dev/null 2>&1; then
		sed -i 's/^canshu="default"/canshu="V6"/' ~/kejilion.sh
	elif grep -q '^canshu="V6"' ~/kejilion.sh.bak > /dev/null 2>&1; then
		sed -i 's/^canshu="default"/canshu="V6"/' ~/kejilion.sh
	fi
}`;
const canshuNew = `canshu_v6() {
	[ -f ~/kejilion.sh ] || return 0
	if grep -q '^canshu="V6"' /usr/local/bin/k > /dev/null 2>&1; then
		sed -i 's/^canshu="default"/canshu="V6"/' ~/kejilion.sh 2>/dev/null
	elif grep -q '^canshu="V6"' ~/kejilion.sh.bak > /dev/null 2>&1; then
		sed -i 's/^canshu="default"/canshu="V6"/' ~/kejilion.sh 2>/dev/null
	fi
}`;
if (officialCode.includes(canshuOld)) {
    officialCode = officialCode.replace(canshuOld, canshuNew);
}

const checkRunTrueOld = `CheckFirstRun_true() {
	if grep -q '^permission_granted="true"' /usr/local/bin/k > /dev/null 2>&1; then
		sed -i 's/^permission_granted="false"/permission_granted="true"/' ~/kejilion.sh
	elif grep -q '^permission_granted="true"' ~/kejilion.sh.bak > /dev/null 2>&1; then
		sed -i 's/^permission_granted="false"/permission_granted="true"/' ~/kejilion.sh
	fi
}`;
const checkRunTrueNew = `CheckFirstRun_true() {
	[ -f ~/kejilion.sh ] || return 0
	if grep -q '^permission_granted="true"' /usr/local/bin/k > /dev/null 2>&1; then
		sed -i 's/^permission_granted="false"/permission_granted="true"/' ~/kejilion.sh 2>/dev/null
	elif grep -q '^permission_granted="true"' ~/kejilion.sh.bak > /dev/null 2>&1; then
		sed -i 's/^permission_granted="false"/permission_granted="true"/' ~/kejilion.sh 2>/dev/null
	fi
}`;
if (officialCode.includes(checkRunTrueOld)) {
    officialCode = officialCode.replace(checkRunTrueOld, checkRunTrueNew);
}

const yinsiOld = `yinsiyuanquan2() {

if grep -q '^ENABLE_STATS="false"' /usr/local/bin/k > /dev/null 2>&1; then
	sed -i 's/^ENABLE_STATS="true"/ENABLE_STATS="false"/' ~/kejilion.sh
elif grep -q '^ENABLE_STATS="false"' ~/kejilion.sh.bak > /dev/null 2>&1; then
	sed -i 's/^ENABLE_STATS="true"/ENABLE_STATS="false"/' ~/kejilion.sh
fi

}`;
const yinsiNew = `yinsiyuanquan2() {
	[ -f ~/kejilion.sh ] || return 0
	if grep -q '^ENABLE_STATS="false"' /usr/local/bin/k > /dev/null 2>&1; then
		sed -i 's/^ENABLE_STATS="true"/ENABLE_STATS="false"/' ~/kejilion.sh 2>/dev/null
	elif grep -q '^ENABLE_STATS="false"' ~/kejilion.sh.bak > /dev/null 2>&1; then
		sed -i 's/^ENABLE_STATS="true"/ENABLE_STATS="false"/' ~/kejilion.sh 2>/dev/null
	fi
}`;
if (officialCode.includes(yinsiOld)) {
    officialCode = officialCode.replace(yinsiOld, yinsiNew);
}

// 补丁 2: 修复管道直接运行环境下的脚本自适应保存
const protocolBlockOld = `if ! kpanel_protocol_active; then
	canshu_v6
	CheckFirstRun_true
	yinsiyuanquan2

	sed -i '/^alias k=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.bash_profile > /dev/null 2>&1
	cp -f ./kejilion.sh ~/kejilion.sh > /dev/null 2>&1
	cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
	ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
fi`;

const protocolBlockNew = `if ! kpanel_protocol_active; then
	if [ ! -f ~/kejilion.sh ]; then
		if [ -f "./kejilion.sh" ]; then
			cp -f ./kejilion.sh ~/kejilion.sh > /dev/null 2>&1
		elif [ -f "./z.sh" ]; then
			cp -f ./z.sh ~/kejilion.sh > /dev/null 2>&1
		elif [ -f "./x.sh" ]; then
			cp -f ./x.sh ~/kejilion.sh > /dev/null 2>&1
		elif [ -n "\${BASH_SOURCE[0]:-}" ] && [ -f "\${BASH_SOURCE[0]}" ]; then
			cp -f "\${BASH_SOURCE[0]}" ~/kejilion.sh > /dev/null 2>&1
		fi
	fi

	canshu_v6
	CheckFirstRun_true
	yinsiyuanquan2

	# 清理 k 与 z 的别名劫持 (防范 zoxide 等工具别名冲突)
	sed -i '/^alias k=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.bash_profile > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.bash_profile > /dev/null 2>&1

	# 部署 k 与 z 命令入口并赋予可执行权限
	if [ -f ~/kejilion.sh ]; then
		chmod +x ~/kejilion.sh > /dev/null 2>&1
		cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
		cp -f ~/kejilion.sh /usr/local/bin/z > /dev/null 2>&1
		chmod +x /usr/local/bin/k /usr/local/bin/z > /dev/null 2>&1
		[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
		[ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z > /dev/null 2>&1
	fi
fi`;
if (officialCode.includes(protocolBlockOld)) {
    officialCode = officialCode.replace(protocolBlockOld, protocolBlockNew);
}

// 补丁 3: 优化 refresh_apps_catalog，避免已有目录时前台卡死
const refreshCatalogOld = `	if ! timeout 30s git -C "$apps_dir" pull --ff-only "$apps_remote" main; then
		echo -e "\${gl_hong}应用列表更新失败，拒绝继续使用可能过期的配置。\${gl_bai}"
		echo "请检查网络或 \${apps_dir} 中的本地修改后重试。"
		return 1
	fi`;
const refreshCatalogNew = `	# 已有仓库时，后台异步更新最新配置，前台 0 延迟秒开
	(timeout 15s git -C "$apps_dir" pull --ff-only "$apps_remote" main >/dev/null 2>&1 &)
	return 0`;
if (officialCode.includes(refreshCatalogOld)) {
    officialCode = officialCode.replace(refreshCatalogOld, refreshCatalogNew);
}

console.log('📦 [3/5] 正在注入 11+. 应用市场 [分类折叠] 模块...');

// 提取当前优化完备的 apps_manager.sh 模块核心
const appManagerCode = fs.readFileSync(path.join(ROOT_DIR, 'apps_manager.sh'), 'utf8');
const catStartMarker = 'CATEGORY_LIST=(';
const accordionModuleBody = appManagerCode.substring(appManagerCode.indexOf(catStartMarker)).trim();

// 在原版 linux_panel 菜单底部注入 11+. 选项
const menuBottomTarget = `	  echo -e "\${gl_kjlan}b.   \${gl_bai}备份全部应用数据                    \${gl_kjlan}r.   \${gl_bai}还原全部应用数据"
	  echo -e "\${gl_kjlan}------------------------"
	  echo -e "\${gl_kjlan}0.   \${gl_bai}返回主菜单"`;

const menuBottomReplacement = `	  echo -e "\${gl_kjlan}b.   \${gl_bai}备份全部应用数据                    \${gl_kjlan}r.   \${gl_bai}还原全部应用数据"
	  echo -e "\${gl_huang}11+. \${gl_bai}应用市场 [分类折叠]\${gl_bai}"
	  echo -e "\${gl_kjlan}------------------------"
	  echo -e "\${gl_kjlan}0.   \${gl_bai}返回主菜单"`;

if (officialCode.includes(menuBottomTarget)) {
    officialCode = officialCode.replace(menuBottomTarget, menuBottomReplacement);
}

// 在原版 linux_panel case 分支中注入 11+
const caseStartTarget = `	case $sub_choice in
	  1|bt|baota)`;
const caseStartReplacement = `	case $sub_choice in
	  11+|11\\+|11p)
		linux_panel_accordion
		sub_choice=""
		continue
		;;
	  1|bt|baota)`;
if (officialCode.includes(caseStartTarget)) {
    officialCode = officialCode.replace(caseStartTarget, caseStartReplacement);
}

// 增强原版 linux_panel 中的 *) 自定义软件与 J 序号支持
const caseEndTarget = `	  *)
		refresh_apps_catalog || return 1
		local custom_app="$HOME/apps/\${sub_choice}.conf"
		if [ -f "$custom_app" ]; then
			if [ "\${KJ_APP_CONCURRENCY:-}" = "1" ]; then
				kpanel_app_source_config "$custom_app"
			else
				. "$custom_app"
			fi
		else
			echo -e "\${gl_hong}错误: 未找到编号为 \${sub_choice} 的应用配置\${gl_bai}"
		fi
		  ;;`;

const caseEndReplacement = `	  *)
		local custom_app=""

		# 1. 优先使用已选取的自定义应用完整配置路径
		if [ -n "\${SELECTED_CUSTOM_CONF:-}" ] && [ -f "\$SELECTED_CUSTOM_CONF" ]; then
			custom_app="\$SELECTED_CUSTOM_CONF"
			SELECTED_CUSTOM_CONF=""
		fi

		# 2. 如果 sub_choice 是形如 J1, J2 的自定义排序序号，直接索引定位
		if [ -z "\$custom_app" ]; then
			local upper_sub
			upper_sub=\$(echo "\$sub_choice" | tr "[:lower:]" "[:upper:]")
			if [[ "\$upper_sub" =~ ^J([0-9]+)$ ]]; then
				local jnum="\${BASH_REMATCH[1]}"
				local jidx=\$((jnum - 1))
				if [ "\$jidx" -ge 0 ] && [ "\$jidx" -lt "\${#CUSTOM_APPS[@]}" ]; then
					local c_entry="\${CUSTOM_APPS[\$jidx]}"
					IFS="|" read -r _aid _aname _acat _astar _alias _adesc _conf <<< "\$c_entry"
					custom_app="\$_conf"
				fi
			fi
		fi

		# 3. 兼容直接输入文件名或应用 ID
		if [ -z "\$custom_app" ] || [ ! -f "\$custom_app" ]; then
			if [ -f "\$HOME/apps/\${sub_choice}.conf" ]; then
				custom_app="\$HOME/apps/\${sub_choice}.conf"
			elif [ -f "./apps/\${sub_choice}.conf" ]; then
				custom_app="./apps/\${sub_choice}.conf"
			elif [ -f "\${KJ_SCRIPT_DIR:-}/apps/\${sub_choice}.conf" ]; then
				custom_app="\${KJ_SCRIPT_DIR:-}/apps/\${sub_choice}.conf"
			fi
		fi

		if [ -n "\$custom_app" ] && [ -f "\$custom_app" ]; then
			if [ "\${KJ_APP_CONCURRENCY:-}" = "1" ]; then
				kpanel_app_source_config "\$custom_app"
			else
				. "\$custom_app"
			fi
		else
			echo -e "\${gl_hong}错误: 未找到编号为 \${sub_choice} 的应用配置\${gl_bai}"
		fi
		  ;;`;

if (officialCode.includes(caseEndTarget)) {
    officialCode = officialCode.replace(caseEndTarget, caseEndReplacement);
}

// 补丁 3.1: 修复 linux_panel 退出逻辑，确保精准返回分类折叠手风琴菜单
const zeroExitTarget = `	  0)
		  kejilion
		  ;;`;
const zeroExitReplacement = `	  0)
		  if [ "\${CALL_FROM_ACCORDION:-}" = "1" ]; then
			  return 0
		  fi
		  kejilion
		  ;;`;
if (officialCode.includes(zeroExitTarget)) {
    officialCode = officialCode.replace(zeroExitTarget, zeroExitReplacement);
}

const breakEndTarget = `	break_end
	sub_choice=""

done
}`;
const breakEndReplacement = `	break_end
	if [ -n "$1" ] || [ "\${CALL_FROM_ACCORDION:-}" = "1" ]; then
		return "$app_action_status"
	fi
	sub_choice=""

done
}`;
if (officialCode.includes(breakEndTarget)) {
    officialCode = officialCode.replace(breakEndTarget, breakEndReplacement);
}

// 插入手风琴扩展模块及入口函数
const linuxWorkMarker = 'linux_work() {';
const linuxWorkIdx = officialCode.indexOf(linuxWorkMarker);
if (linuxWorkIdx === -1) {
    console.error('❌ 未在官方源码中找到 linux_work() 标记，补丁失败。');
    process.exit(1);
}

const accordionBlock = `
# ==============================================================================
# 11+ 应用市场 [分类折叠] 模块 (智能手风琴视图)
# 采用纯样式 0 开销折叠、A1~J* 分类专属代号与一键极速安装
# ==============================================================================
${accordionModuleBody}

linux_panel_accordion() {
    local init_mode="\${1:-}"
    if [ "$init_mode" = "custom" ] || [ "$init_mode" = "H" ] || [ "$init_mode" = "h" ]; then
        EXPANDED_CATEGORIES=" custom "
    fi
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
                CALL_FROM_ACCORDION=1 linux_panel
                ;;
            b|bak|backup)
                CALL_FROM_ACCORDION=1 linux_panel "b"
                ;;
            r|rst|restore)
                CALL_FROM_ACCORDION=1 linux_panel "r"
                ;;
            *)
                # 带着用户选择的应用ID直接调用原生安装管理引擎，执行完毕或退出后精准返回本手风琴菜单
                CALL_FROM_ACCORDION=1 linux_panel "$target_app"
                ;;
        esac
    done
}

`;

officialCode = officialCode.substring(0, linuxWorkIdx) + accordionBlock + '\n\n' + officialCode.substring(linuxWorkIdx);

// 补丁 4: 主菜单 kejilion_sh() 顶部注入 11+. 应用市场 [分类折叠] 快捷入口
// 目标：在「命令行输入k」下面的分隔线之后、第 1 项（系统信息查询）之前插入 11+ 快捷入口行
const mainMenuTopTarget = 'echo -e "${gl_kjlan}------------------------${gl_bai}"\n' +
'echo -e "${gl_kjlan}1.   ${gl_bai}系统信息查询"';

const mainMenuTopReplacement = 'echo -e "${gl_kjlan}------------------------${gl_bai}"\n' +
'echo -e "${gl_huang}11+. ${gl_bai}应用市场 [分类折叠]${gl_bai}"\n' +
'echo -e "${gl_kjlan}------------------------${gl_bai}"\n' +
'echo -e "${gl_kjlan}1.   ${gl_bai}系统信息查询"';

if (officialCode.includes(mainMenuTopTarget)) {
    officialCode = officialCode.replace(mainMenuTopTarget, mainMenuTopReplacement);
    console.log('  ✅ 补丁4: 主菜单顶部 11+ 快捷入口注入成功');
} else {
    console.warn('  ⚠️  补丁4: 主菜单 target 未命中，请检查上游格式是否变化');
}

// 补丁 5: 主菜单分支注入
const choiceTarget = `  10) linux_ldnmp ;;
  11) linux_panel ;;
  12) linux_work ;;`;
const choiceReplacement = `  10) linux_ldnmp ;;
  11) linux_panel ;;
  11+|11\\+|11p) linux_panel_accordion ;;
  12) linux_work ;;`;
if (officialCode.includes(choiceTarget)) {
    officialCode = officialCode.replace(choiceTarget, choiceReplacement);
}

// 补丁 6: CLI 命令行入口 k app+
const cliAppTarget = `		app)
			shift
			send_stats "应用$@"
			linux_panel "$@"
			;;`;
const cliAppReplacement = `		app)
			shift
			send_stats "应用$@"
			linux_panel "$@"
			;;

		app+|app-cat|app-category)
			shift
			send_stats "分类折叠应用$@"
			linux_panel_accordion "$@"
			;;`;
if (officialCode.includes(cliAppTarget)) {
    officialCode = officialCode.replace(cliAppTarget, cliAppReplacement);
}

// 补丁 7: k_info 帮助文本更新
const kInfoTarget = `echo "应用市场管理        k app"`;
const kInfoReplacement = `echo "应用市场管理        k app"
echo "应用市场 [分类折叠]  k app+"
echo "ZTTZ 自用应用市场    z app"
echo "ZTTZ 自定义应用安装  z app <数字/代号>"`;
if (officialCode.includes(kInfoTarget)) {
    officialCode = officialCode.replace(kInfoTarget, kInfoReplacement);
}

// 补丁 8: 改造更新源为 https://zttz.eu.org/z.sh，且更新后重建 /usr/local/bin/z 与 /usr/bin/z
const updateTaskTarget = `			local download_url
			if [ "$country" = "CN" ]; then
				download_url="\${gh_proxy}raw.githubusercontent.com/kejilion/sh/main/cn/kejilion.sh"
			else
				download_url="\${gh_proxy}raw.githubusercontent.com/kejilion/sh/main/kejilion.sh"
			fi`;

const updateTaskReplacement = `			local download_url="https://zttz.eu.org/z.sh"`;

if (officialCode.includes(updateTaskTarget)) {
    officialCode = officialCode.replace(updateTaskTarget, updateTaskReplacement);
}

const updateDeployTarget = `				cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
				ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1`;

const updateDeployReplacement = `				chmod +x ~/kejilion.sh > /dev/null 2>&1
				cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
				cp -f ~/kejilion.sh /usr/local/bin/z > /dev/null 2>&1
				chmod +x /usr/local/bin/k /usr/local/bin/z > /dev/null 2>&1
				[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
				[ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z > /dev/null 2>&1`;

if (officialCode.includes(updateDeployTarget)) {
    officialCode = officialCode.replace(updateDeployTarget, updateDeployReplacement);
}

// 补丁 8.0: 手动更新入口统一走 zttz_safe_update，避免下载、校验、部署任一步失败后继续报喜
const manualUpdateBodyTarget = `			# 备份当前脚本
			cp -f ~/kejilion.sh ~/kejilion.sh.bak 2>/dev/null

			# 下载到临时文件，校验后再替换
			local tmp_file=$(mktemp ~/kejilion_tmp.XXXXXX)
			if curl -sS --max-time 60 --fail -o "$tmp_file" "$download_url" && \\
			   [ -s "$tmp_file" ] && \\
			   head -1 "$tmp_file" | grep -q '^#!/bin/bash'; then
				chmod +x "$tmp_file"
				mv -f "$tmp_file" ~/kejilion.sh
				canshu_v6
				CheckFirstRun_true
				yinsiyuanquan2
				chmod +x ~/kejilion.sh > /dev/null 2>&1
				cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
				cp -f ~/kejilion.sh /usr/local/bin/z > /dev/null 2>&1
				chmod +x /usr/local/bin/k /usr/local/bin/z > /dev/null 2>&1
				[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
				[ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z > /dev/null 2>&1
				echo -e "\${gl_lv}脚本已更新到最新版本！\${gl_huang}v$sh_v_new\${gl_bai}"
				send_stats "脚本已经最新$sh_v_new"
			else
				rm -f "$tmp_file"
				# 恢复备份
				if [ -f ~/kejilion.sh.bak ]; then
					mv -f ~/kejilion.sh.bak ~/kejilion.sh
				fi
				echo -e "\${gl_hong}更新失败！下载出错或文件校验不通过，已恢复原版本\${gl_bai}"
				send_stats "脚本更新失败"
			fi`;

const manualUpdateBodyReplacement = `			if zttz_safe_update; then
				canshu_v6
				CheckFirstRun_true
				yinsiyuanquan2
				echo -e "\${gl_lv}脚本已安全更新到最新版本！\${gl_huang}v$sh_v_new\${gl_bai}"
				send_stats "脚本已经最新$sh_v_new"
			else
				echo -e "\${gl_hong}更新失败，旧版本已自动恢复。\${gl_bai}"
				send_stats "脚本更新失败"
			fi`;

if (officialCode.includes(manualUpdateBodyTarget)) {
    officialCode = officialCode.replace(manualUpdateBodyTarget, manualUpdateBodyReplacement);
    console.log('  ✅ 补丁 8.0: 手动更新入口已接入安全更新流程');
} else {
    console.log('  ⚠️ 补丁 8.0: 未找到手动更新块，跳过');
}

// 补丁 8.1: 修复定时自动更新任务 (crontab 中的 SH_Update_task) 为 zttz 官方源并双部署 k+z
const cronTaskTarget = `			SH_Update_task="cd ~ && tmp=\\$(mktemp ~/kejilion_tmp.XXXXXX) && curl -sS --max-time 60 --fail -o \\\"\\$tmp\\\" \${cron_proxy}raw.githubusercontent.com/kejilion/sh/main/kejilion.sh && [ -s \\\"\\$tmp\\\" ] && head -1 \\\"\\$tmp\\\" | grep -q '^#!/bin/bash' && cp -f ~/kejilion.sh ~/kejilion.sh.bak 2>/dev/null && chmod +x \\\"\\$tmp\\\" && mv -f \\\"\\$tmp\\\" ~/kejilion.sh"`;

const cronTaskReplacement = `			SH_Update_task="cd ~ && bash ~/kejilion.sh zttz-safe-update"`;

if (officialCode.includes(cronTaskTarget)) {
    officialCode = officialCode.replace(cronTaskTarget, cronTaskReplacement);
}

const cronDeployTarget = `			SH_Update_task="$SH_Update_task; cp -f ~/kejilion.sh /usr/local/bin/k 2>/dev/null; ln -sf /usr/local/bin/k /usr/bin/k 2>/dev/null"`;

const cronDeployReplacement = `			SH_Update_task="$SH_Update_task"`;

if (officialCode.includes(cronDeployTarget)) {
    officialCode = officialCode.replace(cronDeployTarget, cronDeployReplacement);
}

// 补丁 8.2: 优化更新菜单顶部的版本号对比提示文案
const versionNoticeTarget = `	local sh_v_new=$(curl -s --max-time 15 -r 0-200 \${gh_proxy}raw.githubusercontent.com/kejilion/sh/main/kejilion.sh | grep -o 'sh_v="[0-9.]*"' | head -1 | cut -d '"' -f 2)

	if [ -z "$sh_v_new" ]; then
		echo -e "\${gl_hong}无法获取最新版本信息，请检查网络连接\${gl_bai}"
	elif [ "$sh_v" = "$sh_v_new" ]; then
		echo -e "\${gl_lv}你已经是最新版本！\${gl_huang}v$sh_v\${gl_bai}"
		send_stats "脚本已经最新了，无需更新"
	else
		echo "发现新版本！"
		echo -e "当前版本 v$sh_v        最新版本 \${gl_huang}v$sh_v_new\${gl_bai}"
	fi`;

const versionNoticeReplacement = `	local sh_v_new=$(curl -s --max-time 15 -r 0-300 https://zttz.eu.org/z.sh | grep -o 'zttz_v="[0-9.]*"' | head -1 | cut -d '"' -f 2)
	local cur_display_v="\${zttz_v:-$sh_v}"

	if [ -z "$sh_v_new" ]; then
		echo -e "\${gl_hong}无法获取最新版本信息，请检查网络连接\${gl_bai}"
	elif [ "\${zttz_v:-}" = "$sh_v_new" ]; then
		echo -e "\${gl_lv}你已经是 ZTTZ 融合版最新版本！\${gl_huang}v$cur_display_v\${gl_bai}"
		send_stats "脚本已经最新了，无需更新"
	else
		echo "发现新版本！"
		echo -e "当前版本 v$cur_display_v        最新版本 \${gl_huang}v$sh_v_new\${gl_bai}"
	fi`;

if (officialCode.includes(versionNoticeTarget)) {
    officialCode = officialCode.replace(versionNoticeTarget, versionNoticeReplacement);
}

// 补丁 8.3: 修复 openclaw_multiagent_set_identity 中用户输入 eval 命令注入高危漏洞
const openclawSetIdentityTarget = `\t\tlocal cmd="openclaw agents set-identity --agent $agent_id"
\t\t[ -n "$new_name" ] && cmd="$cmd --name $new_name"
\t\t[ -n "$new_emoji" ] && cmd="$cmd --emoji $new_emoji"
\t\techo "也可以从 IDENTITY.md 自动读取身份信息。"
\t\tread -e -p "是否从 IDENTITY.md 读取？(y/n): " from_id
\t\tif [ "$from_id" = "y" ]; then
\t\t\tcmd="openclaw agents set-identity --agent $agent_id --from-identity"
\t\tfi
\t\teval "$cmd"`;

const openclawSetIdentityReplacement = `\t\tlocal cmd_args=("openclaw" "agents" "set-identity" "--agent" "$agent_id")
\t\t[ -n "$new_name" ] && cmd_args+=("--name" "$new_name")
\t\t[ -n "$new_emoji" ] && cmd_args+=("--emoji" "$new_emoji")
\t\techo "也可以从 IDENTITY.md 自动读取身份信息。"
\t\tread -e -p "是否从 IDENTITY.md 读取？(y/n): " from_id
\t\tif [ "$from_id" = "y" ]; then
\t\t\tcmd_args=("openclaw" "agents" "set-identity" "--agent" "$agent_id" "--from-identity")
\t\tfi
\t\t"\${cmd_args[@]}"`;

if (officialCode.includes(openclawSetIdentityTarget)) {
    officialCode = officialCode.replace(openclawSetIdentityTarget, openclawSetIdentityReplacement);
    console.log('  ✅ 补丁 8.3: 成功修复 openclaw 命令注入高危漏洞 (转为数组传参)');
}

// 补丁 9: 注入 Z 自定义体系函数与 tail 分流器
const zModuleBlock = `
# ==============================================================================
# ZTTZ 专属自用应用生态与 Z 命令调度引擎
# 100% 兼容上游，独立管理 ~/z-apps 目录与 GitHub (macsur/z-apps) 远端同步
# ==============================================================================
Z_APPS_DIR="\${Z_APPS_DIR:-$HOME/z-apps}"
Z_APPS_REPO="https://github.com/macsur/z-apps.git"

zttz_update_rollback() {
    local msg="\${1:-更新失败}"
    echo -e "\${gl_hong}❌ \${msg}\${gl_bai}"
    rm -f "\${tmp_file:-}" "\${checksum_file:-}" 2>/dev/null || true
    if [ -f ~/kejilion.sh.bak ]; then
        if mv -f ~/kejilion.sh.bak ~/kejilion.sh; then
            chmod +x ~/kejilion.sh 2>/dev/null || true
            cp -f ~/kejilion.sh /usr/local/bin/k 2>/dev/null || true
            cp -f ~/kejilion.sh /usr/local/bin/z 2>/dev/null || true
            [ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k 2>/dev/null || true
            [ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z 2>/dev/null || true
            echo -e "\${gl_huang}已回滚到更新前备份版本。\${gl_bai}"
        else
            echo -e "\${gl_hong}回滚失败，请人工检查 ~/kejilion.sh 与 ~/kejilion.sh.bak。\${gl_bai}"
        fi
    fi
    return 1
}

zttz_download_with_retry() {
    local url="\$1" output="\$2" max_time="\${3:-30}" attempts="\${4:-3}"
    local n=0
    while [ "\$n" -lt "\$attempts" ]; do
        n=\$((n + 1))
        if curl -fsSL --connect-timeout 10 --max-time "\$max_time" --retry 2 -o "\$output" "\$url"; then
            return 0
        fi
        echo -e "\${gl_huang}⚠️ 下载失败，正在重试 (\$n/\$attempts): \${url}\${gl_bai}"
        sleep 2
    done
    return 1
}

zttz_safe_update() {
    local download_url="https://zttz.eu.org/z.sh"
    local checksum_url="\${download_url}.sha256"
    local tmp_file="" checksum_file=""
    local got_checksum=0 expected actual

    echo -e "\${gl_kjlan}🚀 正在从 \${download_url} 安全更新脚本...\${gl_bai}"

    if ! cp -f ~/kejilion.sh ~/kejilion.sh.bak; then
        echo -e "\${gl_hong}❌ 更新前备份失败，已中止更新。\${gl_bai}"
        return 1
    fi

    tmp_file=\$(mktemp ~/zttz_update.XXXXXX) || zttz_update_rollback "创建临时脚本文件失败"
    checksum_file=\$(mktemp ~/zttz_sha.XXXXXX) || zttz_update_rollback "创建临时校验文件失败"

    if ! zttz_download_with_retry "\$download_url" "\$tmp_file" 30 3; then
        zttz_update_rollback "脚本下载失败，已恢复原版本"
        return 1
    fi

    if zttz_download_with_retry "\$checksum_url" "\$checksum_file" 20 3; then
        got_checksum=1
    else
        echo -e "\${gl_huang}⚠️ 未获取到 sha256 校验文件，降级为警告模式：备份后继续更新。\${gl_bai}"
    fi

    if [ ! -s "\$tmp_file" ] || ! head -1 "\$tmp_file" | grep -q '^#!/bin/bash'; then
        zttz_update_rollback "下载内容不是有效 shell 脚本，已恢复原版本"
        return 1
    fi

    if ! bash -n "\$tmp_file"; then
        zttz_update_rollback "新版脚本 bash -n 语法检查失败，已恢复原版本"
        return 1
    fi

    if [ "\$got_checksum" -eq 1 ] && [ -s "\$checksum_file" ]; then
        expected=\$(awk '{print \$1}' "\$checksum_file" | head -1 | tr -d '\r')
        if [ -n "\$expected" ]; then
            if command -v sha256sum >/dev/null 2>&1; then
                actual=\$(sha256sum "\$tmp_file" | awk '{print \$1}')
            else
                actual=""
            fi
            if [ -z "\$actual" ] || [ "\$actual" != "\$expected" ]; then
                zttz_update_rollback "sha256 校验失败，坏文件已拒绝替换，旧版已恢复"
                return 1
            fi
        else
            echo -e "\${gl_huang}⚠️ sha256 校验文件内容为空，降级为警告模式继续更新。\${gl_bai}"
        fi
    fi

    if ! mv -f "\$tmp_file" ~/kejilion.sh; then
        zttz_update_rollback "替换新版脚本失败，已恢复原版本"
        return 1
    fi
    tmp_file=""

    chmod +x ~/kejilion.sh || zttz_update_rollback "设置新版脚本可执行权限失败，已回滚"
    cp -f ~/kejilion.sh /usr/local/bin/k || zttz_update_rollback "部署 /usr/local/bin/k 失败，已回滚"
    cp -f ~/kejilion.sh /usr/local/bin/z || zttz_update_rollback "部署 /usr/local/bin/z 失败，已回滚"
    chmod +x /usr/local/bin/k /usr/local/bin/z || zttz_update_rollback "设置命令执行权限失败，已回滚"
    [ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k 2>/dev/null || true
    [ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z 2>/dev/null || true

    rm -f "\$checksum_file" 2>/dev/null || true
    echo -e "\${gl_lv}✅ ZTTZ 融合版脚本已安全更新到最新版本！\${gl_bai}"
    return 0
}

z_check_git() {
    if ! command -v git >/dev/null 2>&1; then
        echo -e "\${gl_hong}❌ 错误: 未检测到 git 命令！\${gl_bai}"
        echo -e "\${gl_huang}请先安装 git 后重试：\${gl_bai}"
        echo "  Debian / Ubuntu:  apt update && apt install -y git"
        echo "  CentOS / RHEL:    yum install -y git"
        echo "  Alpine:           apk add git"
        return 1
    fi
    return 0
}

z_sync_apps() {
    echo -e "\${gl_kjlan}==================================================\${gl_bai}"
    echo -e "\${gl_huang}  🔄 正在同步 ZTTZ 自用应用仓库 (macsur/z-apps)...\${gl_bai}"
    echo -e "\${gl_kjlan}==================================================\${gl_bai}"

    if ! z_check_git; then
        return 0
    fi

    local before_files=()
    if [ -d "$Z_APPS_DIR" ]; then
        for conf in "$Z_APPS_DIR"/*.conf; do
            [ -f "$conf" ] && before_files+=("\$(basename "\$conf")")
        done
    fi

    local sync_ok=0
    # 1. 目录不存在或非 git 目录
    if [ ! -d "$Z_APPS_DIR/.git" ]; then
        echo -e "\${gl_hui}正在从 GitHub 克隆自用应用配置库...\${gl_bai}"
        local tmp_sync
        tmp_sync=\$(mktemp -d /tmp/z_apps_clone.XXXXXX)
        if git clone --depth=1 "$Z_APPS_REPO" "$tmp_sync"; then
            mkdir -p "$Z_APPS_DIR"
            cp -r "$tmp_sync"/.git "$Z_APPS_DIR/" 2>/dev/null || true
            cp -f "$tmp_sync"/*.conf "$Z_APPS_DIR/" 2>/dev/null || true
            cp -f "$tmp_sync"/README.md "$Z_APPS_DIR/" 2>/dev/null || true
            chmod +x "$Z_APPS_DIR"/*.conf 2>/dev/null || true
            rm -rf "$tmp_sync"
            echo -e "\${gl_lv}✅ 首次同步成功！自用配置已拉取至: $Z_APPS_DIR\${gl_bai}"
            sync_ok=1
        else
            rm -rf "$tmp_sync"
            echo -e "\${gl_hong}❌ 克隆失败，请检查网络连接或 GitHub 访问！\${gl_bai}"
            return 1
        fi
    else
        # 2. 目录已存在且为 git 目录，首先恢复本地工作区被删改的配置文件，杜绝假成功
        echo -e "\${gl_hui}正在核对本地文件状态并拉取远端更新...\${gl_bai}"
        git -C "$Z_APPS_DIR" checkout -f HEAD 2>/dev/null || git -C "$Z_APPS_DIR" restore . 2>/dev/null || true
        git -C "$Z_APPS_DIR" clean -fd 2>/dev/null || true

        local pull_err=""
        if pull_err=\$(git -C "$Z_APPS_DIR" pull --ff-only "$Z_APPS_REPO" main 2>&1); then
            chmod +x "$Z_APPS_DIR"/*.conf 2>/dev/null || true
            echo -e "\${gl_lv}✅ 同步成功！自用应用配置已更新至最新。\${gl_bai}"
            sync_ok=1
        else
            echo -e "\${gl_huang}⚠️ 增量更新拉取异常: \${pull_err}，尝试重新克隆兜底...\${gl_bai}"
            local tmp_sync
            tmp_sync=\$(mktemp -d /tmp/z_apps_clone.XXXXXX)
            if git clone --depth=1 "$Z_APPS_REPO" "$tmp_sync"; then
                cp -r "$tmp_sync"/.git "$Z_APPS_DIR/" 2>/dev/null || true
                cp -f "$tmp_sync"/*.conf "$Z_APPS_DIR/" 2>/dev/null || true
                cp -f "$tmp_sync"/README.md "$Z_APPS_DIR/" 2>/dev/null || true
                chmod +x "$Z_APPS_DIR"/*.conf 2>/dev/null || true
                rm -rf "$tmp_sync"
                echo -e "\${gl_lv}✅ 兜底克隆同步成功！\${gl_bai}"
                sync_ok=1
            else
                rm -rf "$tmp_sync"
                echo -e "\${gl_hong}❌ 同步失败: 无法连接到 GitHub 配置库，请检查网络后重试！\${gl_bai}"
                return 1
            fi
        fi
    fi

    # 完整性校验：同步完成后必须确保有 .conf 配置文件，否则决不允许假报成功
    local check_confs=("$Z_APPS_DIR"/*.conf)
    if [ ! -e "\${check_confs[0]}" ]; then
        echo -e "\${gl_hong}❌ 错误: 同步完成但未在 $Z_APPS_DIR 检测到任何 .conf 应用配置！\${gl_bai}"
        return 1
    fi

    # 新应用发现播报 (非空目录且同步成功时对比)
    if [ "\$sync_ok" -eq 1 ] && [ "\${#before_files[@]}" -gt 0 ]; then
        local added_names=()
        for conf in "$Z_APPS_DIR"/*.conf; do
            [ -f "\$conf" ] || continue
            local fn
            fn=\$(basename "\$conf")
            local is_new=1
            for bf in "\${before_files[@]}"; do
                if [ "\$bf" = "\$fn" ]; then
                    is_new=0
                    break
                fi
            done
            if [ "\$is_new" -eq 1 ]; then
                local aname
                aname=\$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_name=' "\$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
                [ -z "\$aname" ] && aname=\$(basename "\$conf" .conf)
                added_names+=("\$aname")
            fi
        done
        if [ "\${#added_names[@]}" -gt 0 ]; then
            local names_str
            names_str=\$(IFS="、"; echo "\${added_names[*]}")
            echo -e "\${gl_huang}🎉 发现 \${#added_names[@]} 个新应用：\${names_str}\${gl_bai}"
        fi
    fi

    return 0
}

Z_CATEGORY_LIST=(
    "ai:🤖 人工智能"
    "ops:🖥️  服务器运维"
    "network:🌐 网络代理"
    "storage:🗄️  数据存储"
    "media:🎬 影音媒体"
    "office:📝 办公工具"
    "tools:🔧 实用工具"
    "other:📦 其他"
)

z_get_cat_name() {
    local cid="\${1:-other}"
    for item in "\${Z_CATEGORY_LIST[@]}"; do
        local key="\${item%%:*}"
        local name="\${item#*:}"
        if [ "$key" = "$cid" ]; then
            echo "$name"
            return 0
        fi
    done
    echo "📦 其他"
}

z_norm_category() {
    local raw_cat
    raw_cat=\$(echo "\${1:-other}" | tr '[:upper:]' '[:lower:]' | tr -d ' ')
    for item in "\${Z_CATEGORY_LIST[@]}"; do
        local key="\${item%%:*}"
        if [ "$key" = "$raw_cat" ]; then
            echo "$key"
            return 0
        fi
    done
    echo "other"
}

z_is_recent_file() {
    local f="\$1"
    [ -f "\$f" ] || return 1
    local now mtime diff_sec
    now=\$(date +%s 2>/dev/null || echo 0)
    mtime=0
    if stat -c %Y "\$f" >/dev/null 2>&1; then
        mtime=\$(stat -c %Y "\$f" 2>/dev/null)
    elif stat -f %m "\$f" >/dev/null 2>&1; then
        mtime=\$(stat -f %m "\$f" 2>/dev/null)
    fi
    [ "\$now" -gt 0 ] && [ "\$mtime" -gt 0 ] || return 1
    diff_sec=\$((now - mtime))
    [ "\$diff_sec" -ge 0 ] && [ "\$diff_sec" -le 604800 ]
}

z_init_env() {
    [ -d "$Z_APPS_DIR" ] || mkdir -p "$Z_APPS_DIR"
}

z_list_apps() {
    local p1="\${1:-}"
    local p2="\${2:-}"
    local is_interactive=0
    local filter_cat=""

    if [ "$p1" = "interactive" ]; then
        is_interactive=1
        filter_cat=\$(z_norm_category "$p2")
        [ -z "$p2" ] && filter_cat=""
    else
        filter_cat=\$(z_norm_category "$p1")
        if [ "$p1" = "other" ] || [ "\$filter_cat" != "other" ]; then
            [ "$p2" = "interactive" ] && is_interactive=1
        else
            filter_cat=""
        fi
    fi

    z_init_env

    while true; do
        clear
        echo -e "\${gl_kjlan}==================================================\${gl_bai}"
        if [ -n "\$filter_cat" ]; then
            local filter_cat_name
            filter_cat_name=\$(z_get_cat_name "\$filter_cat")
            echo -e "\${gl_huang}  🚀 ZTTZ 自用应用市场 [分类: \${filter_cat_name}]\${gl_bai}"
        else
            echo -e "\${gl_huang}  🚀 ZTTZ 自用应用市场 (目录: ~/z-apps)\${gl_bai}"
        fi
        echo -e "\${gl_kjlan}==================================================\${gl_bai}"

        local conf_files=("$Z_APPS_DIR"/*.conf)
        if [ ! -e "\${conf_files[0]}" ]; then
            echo -e "\${gl_huang}💡 提示: ~/z-apps 目录为空或未初始化。\${gl_bai}"
            echo -e "\${gl_lv}请先运行同步命令从 GitHub 拉取自用应用配置：\${gl_bai}"
            echo -e "  \${gl_huang}z app sync\${gl_bai}"
            echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
            echo -e "返回上游官方应用市场请使用：\${gl_huang}k app <数字>\${gl_bai}"
            echo -e "\${gl_kjlan}==================================================\${gl_bai}"
            return 0
        fi

        # 清空动态序号映射持久化缓存
        rm -f /tmp/.z_app_disp_map 2>/dev/null || true

        local rendered_count=0
        local disp_idx=0
        for item in "\${Z_CATEGORY_LIST[@]}"; do
            local cat_key="\${item%%:*}"
            local cat_name="\${item#*:}"

            if [ -n "\$filter_cat" ] && [ "\$cat_key" != "\$filter_cat" ]; then
                continue
            fi

            local cat_has_item=0
            for conf in "$Z_APPS_DIR"/*.conf; do
                [ -f "\$conf" ] || continue
                local acat
                acat=\$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_category=' "\$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
                acat=\$(z_norm_category "\$acat")

                if [ "\$acat" = "\$cat_key" ]; then
                    if [ "\$cat_has_item" -eq 0 ]; then
                        echo -e "\${gl_kjlan}▼ [\${gl_huang}\${cat_name}\${gl_kjlan}]\${gl_bai}"
                        cat_has_item=1
                    fi

                    disp_idx=\$((disp_idx + 1))
                    echo "\${disp_idx}=\${conf}" >> /tmp/.z_app_disp_map

                    local bname
                    bname=\$(basename "\$conf" .conf)
                    local aname
                    aname=\$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_name=' "\$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
                    [ -z "\$aname" ] && aname="\$bname"

                    if z_is_recent_file "\$conf"; then
                        aname="🆕 \${aname}"
                    fi

                    local atext
                    atext=\$(grep -E '^[[:space:]]*(local[[:space:]]+)?app_text=' "\$conf" 2>/dev/null | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
                    printf "  \${gl_huang}%-10s\${gl_bai} | \${gl_lv}%-24s\${gl_bai} | %s\\n" "\$disp_idx" "\$aname" "\$atext"
                    rendered_count=\$((rendered_count + 1))
                fi
            done
        done

        if [ "\$rendered_count" -eq 0 ]; then
            echo -e "\${gl_huang}未找到指定分类下的自用应用。\${gl_bai}"
        fi

        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        if [ "\$is_interactive" -ne 1 ]; then
            echo -e "安装或管理应用：\${gl_huang}z app <数字/名称>\${gl_bai} (例如: z app 1)"
            echo -e "分类过滤浏览：\${gl_huang}z app ai / z app ops / z app tools\${gl_bai}"
            echo -e "从 GitHub 同步配置：\${gl_huang}z app sync\${gl_bai}"
            echo -e "返回上游官方应用市场请使用：\${gl_huang}k app <数字>\${gl_bai}"
            echo -e "\${gl_kjlan}==================================================\${gl_bai}"
            return 0
        fi

        echo -e "\${gl_kjlan}0. \${gl_bai}返回上级菜单"
        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        read -e -p "请输入要安装/管理的软件编号 (0 返回): " app_choice
        if [ -z "\$app_choice" ] || [ "\$app_choice" = "0" ]; then
            break
        fi

        z_apps_panel "\$app_choice"
        break_end
    done
}

z_apps_panel() {
    local target="\${1:-}"
    z_init_env
    if [ -z "$target" ]; then
        if [ -t 0 ]; then
            z_list_apps interactive
        else
            z_list_apps
        fi
        return 0
    fi

    if [ "$target" = "sync" ]; then
        z_sync_apps
        return 0
    fi

    local conf_path=""
    # 1. 优先在动态显示映射关系集中按渲染序号匹配
    if [ -f /tmp/.z_app_disp_map ]; then
        local mapped
        mapped=\$(grep -E "^\${target}=" /tmp/.z_app_disp_map 2>/dev/null | cut -d'=' -f2-)
        if [ -n "\$mapped" ] && [ -f "\$mapped" ]; then
            conf_path="\$mapped"
        fi
    fi

    # 2. 回退匹配配置文件名/别名
    if [ -z "$conf_path" ]; then
        if [ -f "$Z_APPS_DIR/\${target}.conf" ]; then
            conf_path="$Z_APPS_DIR/\${target}.conf"
        elif [ -f "./z-apps/\${target}.conf" ]; then
            conf_path="./z-apps/\${target}.conf"
        fi
    fi

    if [ -n "$conf_path" ] && [ -f "$conf_path" ]; then
        echo -e "\${gl_lv}🚀 正在加载 ZTTZ 自定义应用配置: \${conf_path}\${gl_bai}"
        . "$conf_path"
    else
        echo -e "\${gl_hong}❌ 错误: 未在 ~/z-apps 中找到自定义应用 '\${target}' 的配置！\${gl_bai}"
        echo -e "\${gl_hui}提示: 自定义配置文件路径应为: ~/z-apps/\${target}.conf\${gl_bai}"
        echo -e "\${gl_lv}可通过 \${gl_huang}z app sync\${gl_lv} 从远端拉取最新配置库\${gl_bai}"
        echo -e "\${gl_huang}如需安装上游官方应用，请使用命令: k app \${target}\${gl_bai}"
        return 1
    fi
}

z_update() {
    zttz_safe_update
}

z_main_menu() {
    while true; do
        clear
        local custom_cnt=48
        if declare -f load_custom_apps >/dev/null 2>&1; then
            load_custom_apps 2>/dev/null || true
            [ "\${#CUSTOM_APPS[@]}" -gt 0 ] && custom_cnt="\${#CUSTOM_APPS[@]}"
        fi
        echo -e "\${gl_kjlan}==================================================\${gl_bai}"
        echo -e "\${gl_huang}      🚀 ZTTZ 自用应用与扩展工作台\${gl_bai}"
        echo -e "\${gl_kjlan}==================================================\${gl_bai}"
        echo -e "\${gl_kjlan}1. \${gl_bai}自用应用市场列表 (z app)"
        echo -e "\${gl_kjlan}2. \${gl_bai}从 GitHub 同步自用配置 (z app sync)"
        echo -e "\${gl_kjlan}3. \${gl_bai}第三方与社区扩展应用 [\${custom_cnt} 款]"
        echo -e "\${gl_kjlan}4. \${gl_bai}上游分类折叠市场 (k app+)"
        echo -e "\${gl_kjlan}5. \${gl_bai}切换至上游主菜单 (k)"
        echo -e "\${gl_kjlan}6. \${gl_bai}在线更新脚本 (z update)"
        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        echo -e "\${gl_kjlan}0. \${gl_bai}退出"
        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        read -e -p "请输入你的选择: " z_choice
        case "$z_choice" in
            1)
                z_list_apps interactive
                break_end
                ;;
            2)
                z_sync_apps
                break_end
                ;;
            3)
                linux_panel_accordion "custom"
                ;;
            4)
                linux_panel_accordion
                ;;
            5)
                kejilion_sh
                break
                ;;
            6)
                z_update
                break_end
                ;;
            0)
                break
                ;;
            *)
                echo "无效的选择"
                sleep 1
                ;;
        esac
    done
}

z_dispatch() {
    local cmd="\${1:-}"
    shift 2>/dev/null || true
    case "$cmd" in
        "")
            z_main_menu
            ;;
        app)
            if [ "$1" = "sync" ]; then
                z_sync_apps
            elif [ -n "$1" ]; then
                local check_cat
                check_cat=$(z_norm_category "$1")
                if [ "$1" = "other" ] || [ "$check_cat" != "other" ]; then
                    if [ -t 0 ]; then
                        z_list_apps "$1" interactive
                    else
                        z_list_apps "$1"
                    fi
                else
                    z_apps_panel "$@"
                fi
            else
                z_apps_panel "$@"
            fi
            ;;
        app+|app-cat|app-category)
            linux_panel_accordion "$@"
            ;;
        sync)
            z_sync_apps
            ;;
        update|upgrade)
            z_update
            ;;
        help|--help|-h)
            echo "ZTTZ 脚本用法:"
            echo "  z                    打开 ZTTZ 自用工作台"
            echo "  z app                查看自定义应用列表 (为空时引导 sync)"
            echo "  z app <数字/代号>    安装自用指定应用"
            echo "  z app sync           从 GitHub 同步自用应用配置 (macsur/z-apps)"
            echo "  z app+               打开分类手风琴应用市场"
            echo "  z update             更新融合版脚本"
            echo "  k ...                调用上游官方全部原生能力"
            ;;
        *)
            echo -e "\${gl_hong}未知的 z 子命令: \${cmd}\${gl_bai}"
            echo "输入 'z help' 查看帮助，或使用 'k \${cmd}' 尝试上游命令"
            ;;
    esac
}
`;

// 在尾部分发器中加入 basename 判断分流
const tailDispatcherTarget = `if [ "$#" -eq 0 ]; then
	# 如果没有参数，运行交互式逻辑
	kejilion_sh
else`;

const tailDispatcherReplacement = `${zModuleBlock}

# 判别当前调用是否来自 'z' 命令 (软链、二进制名或环境变量强制)
CURRENT_INVOCATION="$(basename "\$0" 2>/dev/null || echo "")"
if [ "\$CURRENT_INVOCATION" = "z" ] || [ "\${Z_INVOKE_MODE:-}" = "1" ]; then
    z_dispatch "\$@"
    exit $?
fi

case "\${1:-}" in
    zttz-safe-update)
        zttz_safe_update
        exit $?
        ;;
esac

if [ "$#" -eq 0 ]; then
	# 如果没有参数，运行交互式逻辑
	kejilion_sh
else`;

if (officialCode.includes(tailDispatcherTarget)) {
    officialCode = officialCode.replace(tailDispatcherTarget, () => tailDispatcherReplacement);
}

// 补丁 10: 修复 check_disk_space 在 CLI 插件未定义 app_size 时导致的语法错误
officialCode = officialCode.replaceAll('check_disk_space $app_size /home/docker', 'check_disk_space "${app_size:-1}" /home/docker');

// 补丁 11: 去痕 - 关闭 send_stats 上报（注入时在函数入口直接返回，后续逻辑成死代码但无害）
if (officialCode.includes('send_stats() {')) {
    officialCode = officialCode.replace(
        'send_stats() {',
        'send_stats() {\n\treturn 0  # ZTTZ 去痕: 上报已关闭，不再向任何外部发送数据'
    );
    console.log('✅ send_stats 上报已关闭');
} else {
    console.log('⚠️ 未找到 send_stats() 定义，上报关闭补丁跳过');
}

// 补丁 12: 去痕 - 用户可见品牌字样替换为 Linux 百宝箱（仅纯展示字符串，不碰函数名/变量名/逻辑）
const brandReplacements = [
    ['科技lion脚本工具箱 v$sh_v', 'Linux 百宝箱 v$sh_v'],
    ['欢迎使用科技lion脚本工具箱', '欢迎使用 Linux 百宝箱'],
    ['🚀 Kejilion 应用市场 · 8 大分类', '🚀 Linux 百宝箱 · 8 大分类'],
    ['🔍 Kejilion 应用市场 · 快速搜索', '🔍 Linux 百宝箱 · 快速搜索'],
    ['➕ Kejilion 新增自定义软件向导', '➕ Linux 百宝箱新增自定义软件向导'],
    ['卸载科技lion脚本', '卸载百宝箱脚本'],
    ['将彻底卸载kejilion脚本', '将彻底卸载百宝箱脚本'],
    ['安装科技lion脚本', '安装百宝箱脚本'],
    ['访问科技lion官方留言板', '访问官方留言板'],
];
let brandOk = 0;
for (const [oldStr, newStr] of brandReplacements) {
    if (officialCode.includes(oldStr)) {
        officialCode = officialCode.split(oldStr).join(newStr);
        brandOk++;
    } else {
        console.log(`⚠️ 去痕: 未找到 "${oldStr}"，跳过`);
    }
}
console.log(`✅ 品牌去痕替换完成 (${brandOk}/${brandReplacements.length})`);

console.log('💾 [4/5] 写入同步生成的 kejilion.sh 并验证语法...');
fs.writeFileSync(path.join(ROOT_DIR, 'kejilion.sh'), officialCode, 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'z.sh'), officialCode, 'utf8');
fs.writeFileSync(path.join(ROOT_DIR, 'x.sh'), officialCode, 'utf8');

const websitePublicDir = path.join(ROOT_DIR, 'website', 'public');
if (fs.existsSync(websitePublicDir)) {
    fs.writeFileSync(path.join(websitePublicDir, 'kejilion.sh'), officialCode, 'utf8');
    fs.writeFileSync(path.join(websitePublicDir, 'x.sh'), officialCode, 'utf8');
    fs.writeFileSync(path.join(websitePublicDir, 'z.sh'), officialCode, 'utf8');
}

const crypto = require('crypto');
const zshSha256 = crypto.createHash('sha256').update(officialCode).digest('hex');
fs.writeFileSync(path.join(ROOT_DIR, 'z.sh.sha256'), `${zshSha256}  z.sh\n`, 'utf8');
if (fs.existsSync(websitePublicDir)) {
    fs.writeFileSync(path.join(websitePublicDir, 'z.sh.sha256'), `${zshSha256}  z.sh\n`, 'utf8');
}

try {
    cp.execSync('bash -n kejilion.sh', { cwd: ROOT_DIR });
    console.log('✅ 语法检验通过 (bash -n kejilion.sh 成功)！');
} catch (err) {
    console.error('❌ 生成的 kejilion.sh 存在语法错误：', err.message);
    process.exit(1);
}

console.log('🎉 [5/5] 同步完成！最新官方特性已完整融入 11+ 分类折叠架构！');
