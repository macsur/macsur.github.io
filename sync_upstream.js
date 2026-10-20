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
    const localCandidates = [
        path.join(ROOT_DIR, 'official-upstream.sh'),
        path.join(ROOT_DIR, 'kejilion.sh')
    ];
    let loaded = false;
    for (const cand of localCandidates) {
        if (fs.existsSync(cand)) {
            const candidateContent = fs.readFileSync(cand, 'utf8');
            if (candidateContent.includes('kejilion_sh()') && candidateContent.includes('linux_panel()')) {
                officialCode = candidateContent;
                console.log(`✅ 成功从本地 ${path.basename(cand)} 读取源码`);
                loaded = true;
                break;
            }
        }
    }
    if (!loaded) {
        console.error('❌ 未能获取到有效的官方源码，已中止。');
        process.exit(1);
    }
}

console.log('🔧 [2/5] 正在执行智能守护与健壮性补丁...');

// 补丁 1.1: 增加 ZTTZ 增强版标识
if (!officialCode.includes('zttz_edition="true"')) {
    const versionOld = `sh_v="4.5.10"`;
    if (officialCode.includes(versionOld)) {
        officialCode = officialCode.replace(versionOld, `${versionOld}\nzttz_edition="true"\nzttz_v="1.0.0"`);
    } else {
        officialCode = officialCode.replace(/(sh_v="[^"]*")/, `$1\nzttz_edition="true"\nzttz_v="1.0.0"`);
    }
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

// 补丁 2: 修复管道直接运行环境下的脚本自适应保存与入口原子安全部署
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

const protocolBlockNew = `zttz_deploy_entry() {
	local src="\$1"
	local dest="\$2"
	[ -f "\$src" ] || return 1

	if [ -f "\$dest" ] && cmp -s "\$src" "\$dest"; then
		chmod +x "\$dest" > /dev/null 2>&1 || true
		return 0
	fi

	local dest_dir
	dest_dir=\$(dirname "\$dest")
	mkdir -p "\$dest_dir" > /dev/null 2>&1 || true

	local tmp_dest="\${dest}.tmp.\$\$"
	if ! cp -f "\$src" "\$tmp_dest" > /dev/null 2>&1; then
		rm -f "\$tmp_dest" > /dev/null 2>&1
		return 1
	fi
	chmod +x "\$tmp_dest" > /dev/null 2>&1 || true

	if ! mv -f "\$tmp_dest" "\$dest" > /dev/null 2>&1; then
		rm -f "\$tmp_dest" > /dev/null 2>&1
		return 1
	fi
	return 0
}

zttz_verify_entries() {
	local src="\$1"
	local failed=0
	for target in /usr/local/bin/k /usr/local/bin/z; do
		if [ ! -f "\$target" ]; then
			echo -e "\${gl_hong}❌ 入口自检失败: \$target 不存在！\${gl_bai}"
			failed=1
		elif ! cmp -s "\$src" "\$target"; then
			echo -e "\${gl_hong}❌ 入口自检失败: \$target 与 \$src 逐字节不一致！\${gl_bai}"
			failed=1
		elif ! bash -n "\$target" > /dev/null 2>&1; then
			echo -e "\${gl_hong}❌ 入口自检失败: \$target 语法检查未通过！\${gl_bai}"
			failed=1
		fi
	done
	if [ "\$failed" -eq 1 ]; then
		echo -e "\${gl_hong}❌ 致命错误：命令入口部署验证未通过，已中止运行！\${gl_bai}"
		return 1
	fi
	return 0
}

if ! kpanel_protocol_active; then
	if [ ! -f ~/kejilion.sh ]; then
		if [ -f "./kejilion.sh" ]; then
			cp -f ./kejilion.sh ~/kejilion.sh > /dev/null 2>&1 || { echo -e "\${gl_hong}❌ 自举失败：复制 ./kejilion.sh 到 ~/kejilion.sh 失败，已中止。\${gl_bai}"; exit 1; }
		elif [ -f "./z.sh" ]; then
			cp -f ./z.sh ~/kejilion.sh > /dev/null 2>&1 || { echo -e "\${gl_hong}❌ 自举失败：复制 ./z.sh 到 ~/kejilion.sh 失败，已中止。\${gl_bai}"; exit 1; }
		elif [ -f "./x.sh" ]; then
			cp -f ./x.sh ~/kejilion.sh > /dev/null 2>&1 || { echo -e "\${gl_hong}❌ 自举失败：复制 ./x.sh 到 ~/kejilion.sh 失败，已中止。\${gl_bai}"; exit 1; }
		elif [ -n "\${BASH_SOURCE[0]:-}" ] && [ -f "\${BASH_SOURCE[0]}" ]; then
			cp -f "\${BASH_SOURCE[0]}" ~/kejilion.sh > /dev/null 2>&1 || { echo -e "\${gl_hong}❌ 自举失败：复制当前脚本到 ~/kejilion.sh 失败，已中止。\${gl_bai}"; exit 1; }
		else
			# 下载兜底：本地五路皆空时从官网拉取脚本落盘（修复进程替换管道场景 BASH_SOURCE 非 regular file 导致的自举失败）
			echo -e "\${gl_huang}本地未找到脚本文件，正在从官网下载...\${gl_bai}"
			_zttz_dl_ok=0
			if command -v curl >/dev/null 2>&1; then
				curl -fsSL https://zttz.eu.org/z.sh -o ~/kejilion.sh > /dev/null 2>&1
			elif command -v wget > /dev/null 2>&1; then
				wget -qO ~/kejilion.sh https://zttz.eu.org/z.sh > /dev/null 2>&1
			fi
			if [ -s ~/kejilion.sh ] && [ "\$(head -c 15 ~/kejilion.sh 2>/dev/null | grep -c '#!/bin/bash')" -ge 1 ] && grep -q 'sh_v=' ~/kejilion.sh 2>/dev/null; then
				echo -e "\${gl_lv}✅ 已从官网下载脚本到 ~/kejilion.sh\${gl_bai}"
			else
				rm -f ~/kejilion.sh > /dev/null 2>&1
				echo -e "\${gl_hong}❌ 自举失败：未找到可用脚本文件，且官网下载未成功，已中止。\${gl_bai}"
				exit 1
			fi
		fi
	fi

	canshu_v6 || { echo -e "\${gl_hong}❌ 自举失败：恢复区域参数失败，已中止。\${gl_bai}"; exit 1; }
	CheckFirstRun_true || { echo -e "\${gl_hong}❌ 自举失败：恢复授权参数失败，已中止。\${gl_bai}"; exit 1; }
	yinsiyuanquan2 || { echo -e "\${gl_hong}❌ 自举失败：恢复隐私参数失败，已中止。\${gl_bai}"; exit 1; }

	# 清理 k 与 z 的别名劫持 (防范 zoxide 等工具别名冲突)
	sed -i '/^alias k=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.bash_profile > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias z=/d' ~/.bash_profile > /dev/null 2>&1

	# 原子部署 k 与 z 命令入口，防范正在运行的入口被原地改写导致语法解析错位崩坏
	if [ -f ~/kejilion.sh ]; then
		chmod +x ~/kejilion.sh > /dev/null 2>&1 || { echo -e "\${gl_hong}❌ 自举失败：chmod ~/kejilion.sh 失败，已中止。\${gl_bai}"; exit 1; }
		zttz_deploy_entry ~/kejilion.sh /usr/local/bin/k || { echo -e "\${gl_hong}❌ 自举失败：原子部署 /usr/local/bin/k 失败，已中止。\${gl_bai}"; exit 1; }
		zttz_deploy_entry ~/kejilion.sh /usr/local/bin/z || { echo -e "\${gl_hong}❌ 自举失败：原子部署 /usr/local/bin/z 失败，已中止。\${gl_bai}"; exit 1; }
		[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
		[ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z > /dev/null 2>&1
		zttz_verify_entries ~/kejilion.sh || exit 1
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

// 补丁 4.1: 主菜单入口层接入平台闸门，非 Linux 环境不进入 GNU 专用命令
const menuChoiceGateTarget = `read -e -p "请输入你的选择: " choice

case $choice in`;
const menuChoiceGateReplacement = `read -e -p "请输入你的选择: " choice

if ! z_platform_guard_menu_choice "$choice"; then
    break_end
    continue
fi

case $choice in`;
if (officialCode.includes(menuChoiceGateTarget)) {
    officialCode = officialCode.replace(menuChoiceGateTarget, menuChoiceGateReplacement);
    console.log('  ✅ 补丁4.1: 主菜单入口平台闸门注入成功');
} else {
    console.warn('  ⚠️  补丁4.1: 主菜单 choice target 未命中，请检查上游格式是否变化');
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
				zttz_deploy_entry ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
				zttz_deploy_entry ~/kejilion.sh /usr/local/bin/z > /dev/null 2>&1
				[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
				[ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z > /dev/null 2>&1
				zttz_verify_entries ~/kejilion.sh > /dev/null 2>&1 || true`;

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

z_platform_detect() {
    if [ -n "\${Z_FORCE_PLATFORM:-}" ]; then
        Z_OS="\$(echo "\$Z_FORCE_PLATFORM" | tr '[:upper:]' '[:lower:]')"
    elif [ "\$(uname -s 2>/dev/null || true)" = "Darwin" ]; then
        Z_OS="macos"
    elif [ "\$(uname -s 2>/dev/null || true)" = "Linux" ]; then
        if grep -Eiq 'microsoft|wsl' /proc/sys/kernel/osrelease /proc/version 2>/dev/null; then
            Z_OS="wsl"
        else
            Z_OS="linux"
        fi
    else
        local uname_out
        uname_out="\$(uname -s 2>/dev/null || true)"
        case "\$uname_out" in
            MINGW*|MSYS*|CYGWIN*) Z_OS="windows" ;;
            *) Z_OS="unknown" ;;
        esac
    fi

    case "\$Z_OS" in
        linux|wsl)
            if [ "\$Z_OS" = "linux" ] && [ -d /run/systemd/system ] && command -v systemctl >/dev/null 2>&1; then
                Z_HAS_SYSTEMD="yes"
            elif [ "\$Z_OS" = "wsl" ] && systemctl is-system-running >/dev/null 2>&1; then
                Z_HAS_SYSTEMD="yes"
            else
                Z_HAS_SYSTEMD="no"
            fi
            ;;
        *)
            Z_HAS_SYSTEMD="no"
            ;;
    esac
}

z_platform_notice() {
    case "\$Z_OS" in
        macos)
            echo -e "\${gl_huang}检测到 macOS：系统级功能仅支持 Linux，本机仅提供有限支持\${gl_bai}"
            ;;
        windows)
            echo -e "\${gl_hong}请在 WSL 里运行本脚本，原生 Windows 暂不提供完整支持。\${gl_bai}"
            ;;
        wsl)
            if [ "\$Z_HAS_SYSTEMD" = "no" ]; then
                echo -e "\${gl_huang}当前 WSL 未启用 systemd；可在 .wslconfig 中启用 systemd 后重试服务类功能。\${gl_bai}"
            fi
            ;;
        *)
            ;;
    esac
}

z_require_linux() {
    if [ "\$Z_OS" != "linux" ] && [ "\$Z_OS" != "wsl" ]; then
        echo -e "\${gl_hong}此功能仅支持 Linux\${gl_bai}"
        return 1
    fi
    return 0
}

z_require_systemd() {
    if [ "\$Z_OS" = "wsl" ] && [ "\$Z_HAS_SYSTEMD" = "no" ]; then
        echo -e "\${gl_huang}当前 WSL 未启用 systemd，此功能不可用；可在 .wslconfig 启用 systemd 后重试\${gl_bai}"
        return 1
    fi
    return 0
}

z_platform_guard_menu_choice() {
    local choice="\${1:-}"
    case "\$choice" in
        1|15|00|0)
            return 0
            ;;
    esac
    if ! z_require_linux; then
        return 1
    fi
    if [ "\$Z_OS" = "wsl" ] && [ "\$Z_HAS_SYSTEMD" = "no" ]; then
        case "\$choice" in
            2|3|4|5|6|7|9|10|11|11+|11p|12|13|14|16|17)
                z_require_systemd || return 1
                ;;
        esac
    fi
    return 0
}

zttz_update_rollback() {
    local msg="\${1:-更新失败}"
    echo -e "\${gl_hong}❌ \${msg}\${gl_bai}"
    rm -f "\${tmp_file:-}" "\${checksum_file:-}" 2>/dev/null || true
    if [ -f ~/kejilion.sh.bak ]; then
        if mv -f ~/kejilion.sh.bak ~/kejilion.sh; then
            chmod +x ~/kejilion.sh 2>/dev/null || true
            zttz_deploy_entry ~/kejilion.sh /usr/local/bin/k 2>/dev/null || true
            zttz_deploy_entry ~/kejilion.sh /usr/local/bin/z 2>/dev/null || true
            [ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k 2>/dev/null || true
            [ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z 2>/dev/null || true
            zttz_verify_entries ~/kejilion.sh 2>/dev/null || true
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
    zttz_deploy_entry ~/kejilion.sh /usr/local/bin/k || zttz_update_rollback "原子部署 /usr/local/bin/k 失败，已回滚"
    zttz_deploy_entry ~/kejilion.sh /usr/local/bin/z || zttz_update_rollback "原子部署 /usr/local/bin/z 失败，已回滚"
    [ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k 2>/dev/null || true
    [ -f /usr/local/bin/z ] && ln -sf /usr/local/bin/z /usr/bin/z 2>/dev/null || true
    zttz_verify_entries ~/kejilion.sh || { zttz_update_rollback "入口文件自检比对或语法检查失败，已回滚"; return 1; }

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
        if ! git -C "$Z_APPS_DIR" checkout -f HEAD 2>/dev/null; then
            if ! git -C "$Z_APPS_DIR" restore . 2>/dev/null; then
                echo -e "\${gl_hong}❌ 同步失败：恢复本地被删改的 .conf 失败，已中止。\${gl_bai}"
                return 1
            fi
        fi
        git -C "$Z_APPS_DIR" clean -fd >/dev/null 2>&1 || { echo -e "\${gl_hong}❌ 同步失败：清理未跟踪文件失败，已中止。\${gl_bai}"; return 1; }

        local pull_err=""
        if pull_err=\$(git -C "$Z_APPS_DIR" pull --ff-only "$Z_APPS_REPO" main 2>&1); then
            chmod +x "$Z_APPS_DIR"/*.conf 2>/dev/null || true
            echo -e "\${gl_lv}✅ 同步成功！自用应用配置已更新至最新。\${gl_bai}"
            sync_ok=1
        else
            echo -e "\${gl_hong}❌ 同步失败：git pull --ff-only 拉取失败，已中止。\${gl_bai}"
            echo -e "\${gl_hui}详情: \${pull_err}\${gl_bai}"
            return 1
        fi
    fi

    # 完整性校验：同步完成后必须确保有 .conf 配置文件，否则决不允许假报成功
    local local_conf_count remote_conf_count
    local_conf_count=\$(find "$Z_APPS_DIR" -maxdepth 1 -name '*.conf' -type f 2>/dev/null | wc -l | tr -d ' ')
    remote_conf_count=\$(git -C "$Z_APPS_DIR" ls-tree -r --name-only HEAD 2>/dev/null | grep -c '\.conf$' || true)
    remote_conf_count=\$(echo "\$remote_conf_count" | tr -d ' ')
    local check_confs=("$Z_APPS_DIR"/*.conf)
    if [ ! -e "\${check_confs[0]}" ]; then
        echo -e "\${gl_hong}❌ 错误: 同步完成但未在 $Z_APPS_DIR 检测到任何 .conf 应用配置！\${gl_bai}"
        return 1
    fi
    if [ -n "\$remote_conf_count" ] && [ "\$local_conf_count" != "\$remote_conf_count" ]; then
        echo -e "\${gl_hong}❌ 错误: 本地 .conf 数量(\$local_conf_count)与远端(\$remote_conf_count)不一致，拒绝视为同步成功。\${gl_bai}"
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
        echo -e "\${gl_huang}如为官方应用编号，请直接使用: z app \${target}\${gl_bai}"
        return 1
    fi
}

z_update() {
    if zttz_safe_update; then
        echo ""
        echo -e "\${gl_huang}🔄 正在自动同步应用市场数据 (z-apps)...\${gl_bai}"
        if z_sync_apps; then
            echo -e "\${gl_lv}✅ 应用市场数据同步完成！\${gl_bai}"
        else
            echo -e "\${gl_hong}⚠️ 警告: 脚本本体已更新成功，但应用市场数据同步失败！\${gl_bai}"
            echo -e "\${gl_huang}请检查网络连接后手动运行 'z app sync' 重新同步应用数据。\${gl_bai}"
        fi
        return 0
    else
        return 1
    fi
}

z_run_checked() {
    local label="\${1:-命令}"
    shift
    "\$@"
    local rc=$?
    if [ "\$rc" -ne 0 ]; then
        echo -e "\${gl_hong}❌ 命令失败: \${label} (退出码 \$rc)\${gl_bai}"
    fi
    return "\$rc"
}

z_uninstall() {
    clear
    echo -e "\${gl_kjlan}==================================================\${gl_bai}"
    echo -e "\${gl_huang}      🗑️ 卸载 CODE MATRIX 代码矩阵脚本\${gl_bai}"
    echo -e "\${gl_kjlan}==================================================\${gl_bai}"
    echo "将彻底卸载代码矩阵脚本及所有关联命令入口。"
    echo -e "\${gl_lv}安全边界: 仅清理脚本本体与命令入口，绝不影响 Docker 容器、KPanel、/etc 系统配置与用户数据。\${gl_bai}"
    echo ""
    echo -e "\${gl_huang}待清理项目清单：\${gl_bai}"

    local targets=()
    # 1. 核心命令入口四处
    for bin in /usr/local/bin/z /usr/local/bin/k /usr/bin/z /usr/bin/k; do
        if [ -f "\$bin" ] || [ -L "\$bin" ]; then
            targets+=("\$bin")
            echo -e "  • 命令入口: \${gl_bai}\$bin\${gl_bai}"
        fi
    done

    # 2. 快捷软链接：扫描 /usr/local/bin 与 /usr/bin 下所有指向 codematrix.sh 或 kejilion.sh 的链接
    for dir in /usr/local/bin /usr/bin; do
        [ -d "\$dir" ] || continue
        for link in "\$dir"/*; do
            if [ -L "\$link" ]; then
                local dest
                dest=\$(readlink "\$link" 2>/dev/null || true)
                if [[ "\$dest" == *"codematrix.sh"* ]] || [[ "\$dest" == *"kejilion.sh"* ]]; then
                    if [[ ! " \${targets[*]} " =~ " \${link} " ]]; then
                        targets+=("\$link")
                        echo -e "  • 快捷软链: \${gl_bai}\$link -> \$dest\${gl_bai}"
                    fi
                fi
            fi
        done
    done

    # 3. 脚本本体与历史备份（明确包含 codematrix 及旧 kejilion 全家桶）
    for f in ~/codematrix.sh ~/codematrix.sh.bak ~/kejilion.sh ~/kejilion.sh.bak ~/kejilion.sh.migrated; do
        local expanded_f=\$(eval echo "\$f")
        if [ -f "\$expanded_f" ] || [ -L "\$expanded_f" ]; then
            targets+=("\$expanded_f")
        fi
    done

    # 4. crontab 任务
    echo -e "  • 定时任务: \${gl_bai}清理包含 codematrix.sh 与 kejilion.sh 的 crontab 任务\${gl_bai}"
    # 5. alias 别名
    echo -e "  • Shell别名: \${gl_bai}清理 ~/.bashrc 等文件中的 alias k= / alias z=\${gl_bai}"

    echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"

    local choice_uninstall="N"
    if [ -t 0 ]; then
        read -e -p "是否确认卸载代码矩阵脚本？(y/N): " choice_uninstall
    else
        read -r choice_uninstall || choice_uninstall="N"
    fi
    if [ "\$choice_uninstall" != "y" ] && [ "\$choice_uninstall" != "Y" ]; then
        echo -e "\${gl_huang}已取消卸载，未做任何修改。\${gl_bai}"
        return 0
    fi

    # 单独确认 z-apps 自用应用目录
    local delete_zapps=0
    if [ -d "\$HOME/z-apps" ]; then
        echo ""
        local choice_zapps="N"
        if [ -t 0 ]; then
            read -e -p "检测到自定义应用配置目录 ~/z-apps，是否同时删除？(y/N, 默认保留): " choice_zapps
        else
            read -r choice_zapps || choice_zapps="N"
        fi
        if [ "\$choice_zapps" = "y" ] || [ "\$choice_zapps" = "Y" ]; then
            delete_zapps=1
            echo -e "\${gl_huang}已标记删除: ~/z-apps\${gl_bai}"
        else
            echo -e "\${gl_lv}已保留: ~/z-apps\${gl_bai}"
        fi
    fi

    echo ""
    echo -e "\${gl_huang}正在执行清理...\${gl_bai}"

    # 1. 清理 crontab (仅在确实存在相关任务时重写，避免盲跑影响系统)
    if command -v crontab >/dev/null 2>&1; then
        local current_cron
        current_cron=\$(crontab -l 2>/dev/null || true)
        if [ -n "\$current_cron" ] && echo "\$current_cron" | grep -q -E "codematrix\.sh|kejilion\.sh"; then
            echo "\$current_cron" | grep -v -E "codematrix\.sh|kejilion\.sh" | crontab - 2>/dev/null || true
        fi
    fi

    # 2. 清理 alias
    for rc in ~/.bashrc ~/.profile ~/.bash_profile; do
        if [ -f "\$rc" ]; then
            sed -i '/^alias k=/d' "\$rc" 2>/dev/null || true
            sed -i '/^alias z=/d' "\$rc" 2>/dev/null || true
        fi
    done

    # 3. 使用标准 unlink 语义逐个安全清除所有列入清单的入口、软链与脚本本体及备份文件
    for t in "\${targets[@]}"; do
        if [ -f "\$t" ] || [ -L "\$t" ]; then
            command -v unlink >/dev/null 2>&1 && unlink "\$t" 2>/dev/null || rm -f "\$t" 2>/dev/null || true
        fi
    done

    echo -e "\${gl_lv}✅ 脚本已卸载，再见！\${gl_bai}"
    exit 0
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
        echo -e "\${gl_huang}      🚀 CODE MATRIX 代码矩阵工作台\${gl_bai}"
        echo -e "\${gl_kjlan}==================================================\${gl_bai}"
        echo -e "\${gl_lv}CODE MATRIX REVOLUTION\${gl_bai}"
        echo -e "\${gl_bai}欢迎来到代码矩阵，矩阵已就位，只等你敲下回车\${gl_bai}"
        echo -e "\${gl_kjlan}1. \${gl_bai}自用应用市场列表 (z app)"
        echo -e "\${gl_kjlan}2. \${gl_bai}从 GitHub 同步自用配置 (z app sync)"
        echo -e "\${gl_kjlan}3. \${gl_bai}第三方与社区扩展应用 [\${custom_cnt} 款]"
        echo -e "\${gl_kjlan}4. \${gl_bai}上游分类折叠市场 (k app+)"
        echo -e "\${gl_kjlan}5. \${gl_bai}切换至上游主菜单 (k)"
        echo -e "\${gl_kjlan}6. \${gl_bai}在线更新脚本 (z update)"
        echo -e "\${gl_kjlan}7. \${gl_bai}卸载代码矩阵脚本 (z uninstall)"
        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        echo -e "\${gl_kjlan}0. \${gl_bai}退出"
        echo -e "\${gl_kjlan}--------------------------------------------------\${gl_bai}"
        read -e -p "请输入你的选择: " z_choice
        case "$z_choice" in
            1)
                z_run_checked "z app 列表" z_list_apps interactive
                break_end
                ;;
            2)
                z_run_checked "z app sync" z_sync_apps
                break_end
                ;;
            3)
                z_run_checked "第三方应用市场" linux_panel_accordion "custom"
                ;;
            4)
                z_run_checked "上游分类市场" linux_panel_accordion
                ;;
            5)
                kejilion_sh
                break
                ;;
            6)
                z_run_checked "z update" z_update
                break_end
                ;;
            7)
                z_uninstall
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
                z_run_checked "z app sync" z_sync_apps
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
                    if z_apps_panel "$@"; then
                        :
                    elif [[ "$1" =~ ^[0-9]+$ ]]; then
                        echo -e "\${gl_huang}未命中自用配置，转由官方应用编号直达安装。\${gl_bai}"
                        z_require_linux || return 0
                        linux_panel "$@"
                    fi
                fi
            else
                z_apps_panel "$@"
            fi
            ;;
        app+|app-cat|app-category)
            z_require_linux || return 0
            linux_panel_accordion "$@"
            ;;
        sync)
            z_run_checked "z app sync" z_sync_apps
            ;;
        update|upgrade)
            z_run_checked "z update" z_update
            ;;
        uninstall)
            z_uninstall
            ;;
        help|--help|-h)
            echo "ZTTZ 脚本用法:"
            echo "  z                    打开 ZTTZ 自用工作台"
            echo "  z app                查看自定义应用列表 (为空时引导 sync)"
            echo "  z app <数字/代号>    优先安装自用指定应用；未命中时按官方编号直达"
            echo "  z app sync           从 GitHub 同步自用应用配置 (macsur/z-apps)"
            echo "  z app+               打开分类手风琴应用市场"
            echo "  z update             更新融合版脚本"
            echo "  z uninstall          卸载代码矩阵脚本 (完整清理入口与本体)"
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

# 平台识别与入口级降级提示
z_platform_detect
z_platform_notice
if [ "\$Z_OS" = "windows" ]; then
    exit 1
fi

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
    ['科技lion脚本工具箱 v$sh_v', 'CODE MATRIX 代码矩阵 v$sh_v'],
    ['欢迎使用科技lion脚本工具箱', '欢迎使用 CODE MATRIX 代码矩阵'],
    ['🚀 Kejilion 应用市场 · 8 大分类', '🚀 CODE MATRIX 代码矩阵 · 8 大分类'],
    ['🔍 Kejilion 应用市场 · 快速搜索', '🔍 CODE MATRIX 代码矩阵 · 快速搜索'],
    ['➕ Kejilion 新增自定义软件向导', '➕ CODE MATRIX 代码矩阵新增自定义软件向导'],
    ['🚀 Linux 百宝箱 · 8 大分类', '🚀 CODE MATRIX 代码矩阵 · 8 大分类'],
    ['🔍 Linux 百宝箱 · 快速搜索', '🔍 CODE MATRIX 代码矩阵 · 快速搜索'],
    ['➕ Linux 百宝箱新增自定义软件向导', '➕ CODE MATRIX 代码矩阵新增自定义软件向导'],
    ['卸载科技lion脚本', '卸载代码矩阵脚本'],
    ['将彻底卸载kejilion脚本', '将彻底卸载代码矩阵脚本'],
    ['安装科技lion脚本', '安装代码矩阵脚本'],
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

// 补丁 13: 主菜单横幅整体替换为站主亲选 Slant 斜锋体定版（五行，单引号原样打印防转义）
const bannerOld = `echo "╦╔═╔═╗ ╦╦╦  ╦╔═╗╔╗╔ ╔═╗╦ ╦"
echo "╠╩╗║╣  ║║║  ║║ ║║║║ ╚═╗╠═╣"
echo "╩ ╩╚═╝╚╝╩╩═╝╩╚═╝╝╚╝o╚═╝╩ ╩"`;
const bannerNew = `echo ' _____ _________________     ________  __  ____  ____  ______'
echo '/__  //_  __/_  __/__  /    / ____/ / / / / __ \\/ __ \\/ ____/'
echo '  / /  / /   / /    / /    / __/ / / / / / / / /_/ / / __'
echo ' / /__/ /   / /    / /___ / /___/ /_/ /_/ /_/ / _, _/ /_/ /'
echo '/____/_/   /_/    /____(_)_____/\\____/(_)____/_/ |_|\\____/'`;
if (officialCode.includes(bannerOld)) {
    officialCode = officialCode.replace(bannerOld, bannerNew);
    console.log('✅ 主菜单横幅已整体替换为站主亲选 Slant 斜锋体五行定版');
} else {
    console.log('⚠️ 去痕: 未找到上游三行字符画横幅，横幅补丁跳过');
}

// 补丁 14: 去痕 - 主菜单 17 项描述
const menuDescReplacements = [
    ['kejilion.sh 的现代化网页管理界面', 'CODE MATRIX 代码矩阵的现代化网页管理界面'],
];
for (const [oldStr, newStr] of menuDescReplacements) {
    if (officialCode.includes(oldStr)) {
        officialCode = officialCode.split(oldStr).join(newStr);
        console.log('✅ 17 项描述已替换');
    } else {
        console.log(`⚠️ 去痕: 未找到 17 项描述 "${oldStr}"，跳过`);
    }
}

// 补丁 15: 去痕 - 广告专栏整页替换为 CODE MATRIX 品牌页
const adSectionOld = `kejilion_Affiliates() {

clear
send_stats "广告专栏"
echo "广告专栏"
echo "------------------------"
echo "将为用户提供更简单优雅的推广与购买体验！"
echo ""
echo -e "服务器优惠"
echo "------------------------"
echo -e "\${gl_lan}莱卡云 香港CN2 GIA 韩国双ISP 美国CN2 GIA 优惠活动\${gl_bai}"
echo -e "\${gl_bai}网址: https://www.lcayun.com/aff/ZEXUQBIM\${gl_bai}"
echo "------------------------"
echo -e "\${gl_lan}VMRack 美国优质原生 CN2 大带宽 每月9.9刀起\${gl_bai}"
echo -e "\${gl_bai}网址: https://www.vmrack.net?ref_code=5bFonow83w5\${gl_bai}"
echo "------------------------"
echo -e "\${gl_lan}RackNerd 10.99刀每年 美国 1核心 1G内存 20G硬盘 1T流量每月\${gl_bai}"
echo -e "\${gl_bai}网址: https://my.racknerd.com/aff.php?aff=5501&pid=879\${gl_bai}"
echo "------------------------"
echo -e "\${gl_zi}Hostinger 52.7刀每年 美国 1核心 4G内存 50G硬盘 4T流量每月\${gl_bai}"
echo -e "\${gl_bai}网址: https://cart.hostinger.com/pay/d83c51e9-0c28-47a6-8414-b8ab010ef94f?_ga=GA1.3.942352702.1711283207\${gl_bai}"
echo "------------------------"
echo -e "\${gl_huang}搬瓦工 49刀每季 美国CN2GIA 日本软银 2核心 1G内存 20G硬盘 1T流量每月\${gl_bai}"
echo -e "\${gl_bai}网址: https://bandwagonhost.com/aff.php?aff=69004&pid=87\${gl_bai}"
echo "------------------------"
echo -e "\${gl_lan}DMIT 28刀每季 美国CN2GIA 1核心 2G内存 20G硬盘 800G流量每月\${gl_bai}"
echo -e "\${gl_bai}网址: https://www.dmit.io/aff.php?aff=4966&pid=100\${gl_bai}"
echo "------------------------"
echo -e "\${gl_zi}V.PS 6.9刀每月 东京软银 2核心 1G内存 20G硬盘 1T流量每月\${gl_bai}"
echo -e "\${gl_bai}网址: https://vps.hosting/cart/tokyo-cloud-kvm-vps/?id=148&?affid=1355&?affid=1355\${gl_bai}"
echo "------------------------"
echo -e "\${gl_kjlan}VPS更多热门优惠\${gl_bai}"
echo -e "\${gl_bai}网址: https://kejilion.pro/topvps/\${gl_bai}"
echo "------------------------"
echo ""
echo -e "域名优惠"
echo "------------------------"
echo -e "\${gl_lan}GNAME 8.8刀首年COM域名 6.68刀首年CC域名\${gl_bai}"
echo -e "\${gl_bai}网址: https://www.gname.com/register?tt=86836&ttcode=KEJILION86836&ttbj=sh\${gl_bai}"
echo "------------------------"
echo ""
echo -e "科技lion周边"
echo "------------------------"
echo -e "\${gl_kjlan}B站: \${gl_bai}https://b23.tv/2mqnQyh              \${gl_kjlan}油管: \${gl_bai}https://www.youtube.com/@kejilion\${gl_bai}"
echo -e "\${gl_kjlan}官网: \${gl_bai}https://kejilion.pro/              \${gl_kjlan}导航: \${gl_bai}https://dh.kejilion.pro/\${gl_bai}"
echo -e "\${gl_kjlan}博客: \${gl_bai}https://blog.kejilion.pro/         \${gl_kjlan}软件中心: \${gl_bai}https://app.kejilion.pro/\${gl_bai}"
echo "------------------------"
echo -e "\${gl_kjlan}脚本官网: \${gl_bai}https://kejilion.sh            \${gl_kjlan}GitHub地址: \${gl_bai}\${gh_https_url}github.com/kejilion/sh\${gl_bai}"
echo "------------------------"
echo ""
}`;
const adSectionNew = `kejilion_Affiliates() {

clear
echo "CODE MATRIX 品牌专栏"
echo "------------------------"
echo "用代码 · 爱上Linux"
echo ""
echo -e "\${gl_kjlan}品牌名: \${gl_bai}CODE MATRIX 代码矩阵\${gl_bai}"
echo -e "\${gl_kjlan}口号: \${gl_bai}用代码 · 爱上Linux\${gl_bai}"
echo -e "\${gl_kjlan}官网: \${gl_bai}https://zttz.eu.org/\${gl_bai}"
echo -e "\${gl_kjlan}安装: \${gl_bai}bash <(curl -sL https://zttz.eu.org/z)\${gl_bai}"
echo "------------------------"
echo ""
}`;
if (officialCode.includes(adSectionOld)) {
    officialCode = officialCode.replace(adSectionOld, adSectionNew);
    console.log('✅ 广告专栏整页已替换为 CODE MATRIX 品牌页');
} else {
    console.log('⚠️ 去痕: 未找到广告专栏函数体，广告专栏补丁跳过');
}

// 补丁 16: 去痕 - 应用市场页脚开发者指南行删除
const devGuideOld = 'echo -e "${gl_kjlan}想要让你的应用出现在这里？查看开发者指南: ${gl_huang}https://dev.kejilion.sh/${gl_bai}"';
if (officialCode.includes(devGuideOld)) {
    officialCode = officialCode.split(devGuideOld).join('');
    console.log('✅ 应用市场页脚开发者指南行已删除');
} else {
    console.log('⚠️ 去痕: 未找到开发者指南行，跳过');
}

// 补丁 17: 去痕 - 进阶玩法 ssh-key 上游链接删除（保留功能文案）
const sshKeyOld = 'echo "进阶玩法: https://blog.kejilion.pro/ssh-key"';
if (officialCode.includes(sshKeyOld)) {
    officialCode = officialCode.split(sshKeyOld).join('echo "进阶玩法: 配置 SSH 密钥登录"');
    console.log('✅ 进阶玩法 ssh-key 上游链接已替换');
} else {
    console.log('⚠️ 去痕: 未找到进阶玩法 ssh-key 链接，跳过');
}

// 补丁 18: 去痕 - 首次许可协议上游域名链接删除（保留协议提示文字）
const licenseOld = 'echo "用户许可协议: https://blog.kejilion.pro/user-license-agreement/"';
if (officialCode.includes(licenseOld)) {
    officialCode = officialCode.split(licenseOld).join('echo "用户许可协议: 使用本脚本前请阅读并同意用户许可协议"');
    console.log('✅ 许可协议上游链接已替换');
} else {
    console.log('⚠️ 去痕: 未找到许可协议链接，跳过');
}

// 补丁 19: 去痕 - KPanel 进度与日志类可见文案中的 kejilion.sh → 代码矩阵脚本
const kpanelReplacements = [
    ['正在执行 kejilion.sh 应用安装函数', '正在执行代码矩阵脚本应用安装函数'],
    ['写入 kejilion.sh 兼容状态', '写入代码矩阵脚本兼容状态'],
    ['未发现 kejilion.sh 应用安装标记', '未发现代码矩阵脚本应用安装标记'],
    ['正在修复 kejilion.sh 应用安装标记', '正在修复代码矩阵脚本应用安装标记'],
];
let kpanelOk = 0;
for (const [oldStr, newStr] of kpanelReplacements) {
    if (officialCode.includes(oldStr)) {
        officialCode = officialCode.split(oldStr).join(newStr);
        kpanelOk++;
    } else {
        console.log(`⚠️ 去痕: 未找到 KPanel 文案 "${oldStr}"，跳过`);
    }
}
console.log(`✅ KPanel 文案替换完成 (${kpanelOk}/${kpanelReplacements.length})`);

// 补丁 20: 去痕 - 写入用户服务器配置文件的 Managed by kejilion.sh → Managed by CODE MATRIX
const managedOld = 'Managed by kejilion.sh';
const managedNew = 'Managed by CODE MATRIX';
let managedCount = 0;
while (officialCode.includes(managedOld)) {
    officialCode = officialCode.replace(managedOld, managedNew);
    managedCount++;
}
if (managedCount > 0) {
    console.log(`✅ Managed by 注释已替换 (${managedCount} 处)`);
} else {
    console.log('⚠️ 去痕: 未找到 Managed by kejilion.sh，跳过');
}

// 补丁 21: 去痕 - board.kejilion.pro 留言板链接替换
const boardOld = 'https://board.kejilion.pro';
const boardNew = 'https://zttz.eu.org';
if (officialCode.includes(boardOld)) {
    officialCode = officialCode.split(boardOld).join(boardNew);
    console.log('✅ board.kejilion.pro 链接已替换');
} else {
    console.log('⚠️ 去痕: 未找到 board.kejilion.pro，跳过');
}

// 补丁 22: 去痕 - send_stats 死代码整段删除（含 api.kejilion.pro 端点）
// 定位 send_stats 函数完整范围，从 "send_stats() {" 到下一个顶层函数定义前，避免非贪婪正则因内部大括号截断代码
const sendStatsMatch = officialCode.match(/send_stats\(\) \{[\s\S]*?(?=\n[a-zA-Z0-9_]+\(\) \{)/);
if (sendStatsMatch) {
    officialCode = officialCode.replace(sendStatsMatch[0], 'send_stats() {\n\treturn 0  # CODE MATRIX: 上报已永久关闭\n}\n\n');
    console.log('✅ send_stats 死代码整段已删除，仅保留空壳 return 0');
} else {
    console.log('⚠️ 去痕: 未找到 send_stats 完整函数体，跳过整段删除');
}

// 补丁 22.1: 去痕 - 内联 Python 脚本中的 send_stat 上报函数清空（彻底消除第二处 api.kejilion.pro）
const pySendStatOld = `def send_stat(action):
    if not stats_enabled:
        return
    payload = {
        "action": action,
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"),
        "country": "",
        "os_info": platform.platform(),
        "cpu_arch": platform.machine(),
        "version": script_version,
    }
    try:
        req = urllib.request.Request(
            "https://api.kejilion.pro/api/log",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=3):
            pass
    except Exception:
        pass`;
const pySendStatNew = `def send_stat(action):
    return`;
if (officialCode.includes(pySendStatOld)) {
    officialCode = officialCode.replace(pySendStatOld, pySendStatNew);
    console.log('✅ Python 内联 send_stat 上报函数已清空，彻底消除第二处 api.kejilion.pro');
} else {
    console.log('⚠️ 去痕: 未找到 Python 内联 send_stat 定义，跳过');
}

// 补丁 23: 去痕 - 家目录脚本文件名 ~/kejilion.sh → ~/codematrix.sh（全量替换）
// 注意：只替换用户可见/路径引用，不碰函数名 kejilion()/kejilion_sh()
// 保护已有的存量迁移块，防止将迁移源 ~/kejilion.sh 破坏成 ~/codematrix.sh（根因修复）
const migrationBlockRegex = /if \[ -f ~\/kejilion\.sh \] && \[ ! -f ~\/codematrix\.sh \]; then[\s\S]*?fi\nif \[ ! -f ~\/codematrix\.sh \]; then/;
let savedMigrationBlock = null;
const existingMigrationMatch = officialCode.match(migrationBlockRegex);
if (existingMigrationMatch) {
    savedMigrationBlock = existingMigrationMatch[0];
    officialCode = officialCode.replace(savedMigrationBlock, '__CODE_MATRIX_MIGRATION_PLACEHOLDER__');
}

let codematrixCount = 0;
const cmMatches = officialCode.match(/~\/kejilion\.sh/g);
if (cmMatches) codematrixCount = cmMatches.length;
officialCode = officialCode.replace(/~\/kejilion\.sh/g, '~/codematrix.sh');
// 同时替换 kejilion.sh.bak
officialCode = officialCode.replace(/kejilion\.sh\.bak/g, 'codematrix.sh.bak');

if (savedMigrationBlock) {
    officialCode = officialCode.replace('__CODE_MATRIX_MIGRATION_PLACEHOLDER__', savedMigrationBlock);
}
console.log(`✅ 家目录脚本文件名已替换 (~/kejilion.sh → ~/codematrix.sh, 约 ${codematrixCount} 处; .bak 同步替换; 迁移块受保护)`);

// 补丁 24: 去痕 - 存量迁移逻辑注入
// 在脚本首次运行或更新时，若发现旧 ~/kejilion.sh 存在，迁移参数后处置旧文件
if (officialCode.includes('# CODE MATRIX 存量迁移')) {
    console.log('✅ 存量迁移逻辑已存在，跳过重复注入（幂等保证）');
} else {
    const migrationOld = 'if [ ! -f ~/codematrix.sh ]; then';
    const migrationNew = `if [ -f ~/kejilion.sh ] && [ ! -f ~/codematrix.sh ]; then
	# CODE MATRIX 存量迁移：旧版 kejilion.sh → codematrix.sh，保留已同意状态
	cp -f ~/kejilion.sh ~/codematrix.sh
	# 迁移关键参数（canshu / permission_granted / ENABLE_STATS）
	_old_canshu=$(grep -E '^canshu=' ~/kejilion.sh 2>/dev/null | tail -1)
	_old_perm=$(grep -E '^permission_granted=' ~/kejilion.sh 2>/dev/null | tail -1)
	_old_stats=$(grep -E '^ENABLE_STATS=' ~/kejilion.sh 2>/dev/null | tail -1)
	[ -n "$_old_canshu" ] && sed -i "s/^canshu=.*/$_old_canshu/" ~/codematrix.sh 2>/dev/null
	[ -n "$_old_perm" ] && sed -i "s/^permission_granted=.*/$_old_perm/" ~/codematrix.sh 2>/dev/null
	[ -n "$_old_stats" ] && sed -i "s/^ENABLE_STATS=.*/$_old_stats/" ~/codematrix.sh 2>/dev/null
	# 处置旧文件：改名 .migrated 备份
	mv -f ~/kejilion.sh ~/kejilion.sh.migrated
	echo -e "\${gl_lv}✅ 存量迁移完成：参数已迁入 ~/codematrix.sh，旧文件已备份为 ~/kejilion.sh.migrated\${gl_bai}"
fi
if [ ! -f ~/codematrix.sh ]; then`;
    if (officialCode.includes(migrationOld)) {
        officialCode = officialCode.replace(migrationOld, migrationNew);
        console.log('✅ 存量迁移逻辑已注入（旧 ~/kejilion.sh → ~/codematrix.sh，参数 preserved，旧文件 .migrated 备份）');
    } else {
        console.log('⚠️ 去痕: 未找到首次安装检测点，存量迁移补丁跳过');
    }
}

// 结构断言：绝对禁止出现恒假迁移块与自毁/自复制逻辑
if (officialCode.includes('[ -f ~/codematrix.sh ] && [ ! -f ~/codematrix.sh ]')) {
    throw new Error('❌ 致命结构错误: 检测到恒假迁移块 [ -f ~/codematrix.sh ] && [ ! -f ~/codematrix.sh ]');
}
if (officialCode.includes('mv -f ~/codematrix.sh ~/codematrix.sh.migrated')) {
    throw new Error('❌ 致命结构错误: 检测到错误移动 ~/codematrix.sh 的破坏逻辑');
}
if (/\bcp\s+-f\s+~\/codematrix\.sh\s+~\/codematrix\.sh(?:\s|$)/.test(officialCode)) {
    throw new Error('❌ 致命结构错误: 检测到同名自复制逻辑 cp -f ~/codematrix.sh ~/codematrix.sh');
}
const migrationMatches = officialCode.match(/# CODE MATRIX 存量迁移/g);
if (!migrationMatches || migrationMatches.length !== 1) {
    throw new Error(`❌ 致命结构错误: 存量迁移块数量异常 (预期 1 处，实际 ${migrationMatches ? migrationMatches.length : 0} 处)`);
}

// 补丁 25: 统一卸载入口 - 将 k 菜单第 102 项替换为调用统一的 z_uninstall 并清除旧逻辑与上报
const uninstall102Re = /\n\t\t\s*102\)[\s\S]*?\n\t\t\t\s*esac\s*\n\t\t\t\s*;;/;
if (uninstall102Re.test(officialCode)) {
    officialCode = officialCode.replace(uninstall102Re, `\n\t\t  102)\n\t\t\t  z_uninstall\n\t\t\t  ;;`);
    console.log('✅ k 菜单第 102 项已接入统一的 z_uninstall 卸载流程 (清除旧逻辑与上报)');
} else {
    console.log('⚠️ 未找到 k 菜单 102 项定义，卸载入口接入跳过');
}

console.log('🔍 [4/5] 验证生成代码结构与语法（写盘前双门禁校验）...');

// 写临时文件执行写盘前 bash -n + zsh -n 双校验
const os = require('os');
const tmpCheckFile = path.join(os.tmpdir(), `codematrix_syntax_gate_${Date.now()}_${process.pid}.sh`);
try {
    fs.writeFileSync(tmpCheckFile, officialCode, 'utf8');
    cp.execSync(`bash -n "${tmpCheckFile}"`);
    console.log('  ✅ 写盘前门禁: bash -n 语法检验通过');
    cp.execSync(`zsh -n "${tmpCheckFile}"`);
    console.log('  ✅ 写盘前门禁: zsh -n 语法检验通过');
} catch (err) {
    try { fs.unlinkSync(tmpCheckFile); } catch (_) {}
    console.error('❌ 写盘前语法门禁拦截：生成的脚本存在语法错误，已中止写盘，工作区未受污染！', err.message);
    process.exit(1);
} finally {
    try { fs.unlinkSync(tmpCheckFile); } catch (_) {}
}

console.log('💾 语法门禁全部通过，开始原子写入 6 份 shell 镜像及校验和文件...');

const websitePublicDir = path.join(ROOT_DIR, 'website', 'public');
const targetMirrors = [
    path.join(ROOT_DIR, 'kejilion.sh'),
    path.join(ROOT_DIR, 'z.sh'),
    path.join(ROOT_DIR, 'x.sh'),
    path.join(websitePublicDir, 'kejilion.sh'),
    path.join(websitePublicDir, 'x.sh'),
    path.join(websitePublicDir, 'z.sh')
];

for (const targetFile of targetMirrors) {
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(targetFile, officialCode, 'utf8');
}

const crypto = require('crypto');
const zshSha256 = crypto.createHash('sha256').update(officialCode).digest('hex');
const sha256Content = `${zshSha256}  z.sh\n`;
fs.writeFileSync(path.join(ROOT_DIR, 'z.sh.sha256'), sha256Content, 'utf8');
if (fs.existsSync(websitePublicDir)) {
    fs.writeFileSync(path.join(websitePublicDir, 'z.sh.sha256'), sha256Content, 'utf8');
}

console.log('🔍 正在执行写盘后一致性与完整性校验（6 份镜像 cmp 逐字节一致性 + sha256 校验）...');
const baseFile = path.join(ROOT_DIR, 'kejilion.sh');
for (const mirror of targetMirrors) {
    cp.execSync(`bash -n "${mirror}"`);
    cp.execSync(`zsh -n "${mirror}"`);
    if (mirror !== baseFile) {
        cp.execSync(`cmp "${baseFile}" "${mirror}"`);
    }
}
const currentZshSha = cp.execSync(`shasum -a 256 "${path.join(ROOT_DIR, 'z.sh')}" | awk '{print $1}'`).toString().trim();
if (currentZshSha !== zshSha256) {
    throw new Error(`SHA-256 不匹配: 预期 ${zshSha256}, 实际 ${currentZshSha}`);
}
console.log(`✅ 6 份镜像字节完全一致，bash/zsh 语法全通过，SHA-256 匹配 (${zshSha256})！`);

console.log('🎉 [5/5] 同步完成！最新官方特性已完整融入 11+ 分类折叠架构！');
