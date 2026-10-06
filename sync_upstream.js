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

// 补丁 1: 修复 sed: can't read ~/kejilion.sh 报错
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
		elif [ -f "./x.sh" ]; then
			cp -f ./x.sh ~/kejilion.sh > /dev/null 2>&1
		elif [ -n "\${BASH_SOURCE[0]:-}" ] && [ -f "\${BASH_SOURCE[0]}" ]; then
			cp -f "\${BASH_SOURCE[0]}" ~/kejilion.sh > /dev/null 2>&1
		fi
	fi

	canshu_v6
	CheckFirstRun_true
	yinsiyuanquan2

	sed -i '/^alias k=/d' ~/.bashrc > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.profile > /dev/null 2>&1
	sed -i '/^alias k=/d' ~/.bash_profile > /dev/null 2>&1
	[ -f ~/kejilion.sh ] && cp -f ~/kejilion.sh /usr/local/bin/k > /dev/null 2>&1
	[ -f /usr/local/bin/k ] && ln -sf /usr/local/bin/k /usr/bin/k > /dev/null 2>&1
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
const mainMenuTopTarget = 'echo -e "命令行输入${gl_huang}k${gl_kjlan}可快速启动脚本${gl_bai}"\n' +
'echo -e "${gl_kjlan}------------------------${gl_bai}"';

const mainMenuTopReplacement = 'echo -e "命令行输入${gl_huang}k${gl_kjlan}可快速启动脚本${gl_bai}"\n' +
'echo -e "${gl_huang}11+. ${gl_bai}应用市场 [分类折叠]${gl_bai}"\n' +
'echo -e "${gl_kjlan}------------------------${gl_bai}"';

if (officialCode.includes(mainMenuTopTarget)) {
    officialCode = officialCode.replace(mainMenuTopTarget, mainMenuTopReplacement);
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
echo "应用市场 [分类折叠]  k app+"`;
if (officialCode.includes(kInfoTarget)) {
    officialCode = officialCode.replace(kInfoTarget, kInfoReplacement);
}

console.log('💾 [4/5] 写入同步生成的 kejilion.sh 并验证语法...');
fs.writeFileSync(path.join(ROOT_DIR, 'kejilion.sh'), officialCode, 'utf8');

try {
    cp.execSync('bash -n kejilion.sh', { cwd: ROOT_DIR });
    console.log('✅ 语法检验通过 (bash -n kejilion.sh 成功)！');
} catch (err) {
    console.error('❌ 生成的 kejilion.sh 存在语法错误：', err.message);
    process.exit(1);
}

console.log('🎉 [5/5] 同步完成！最新官方特性已完整融入 11+ 分类折叠架构！');
