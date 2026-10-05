import os
import shutil
import subprocess
from PIL import Image, ImageDraw, ImageFont

# 视频参数: 960x560, 15fps, 11.4s -> 171 帧
WIDTH = 960
HEIGHT = 560
FPS = 15
TOTAL_FRAMES = int(11.4 * FPS) # 171 frames

FONT_PATH_MONO = '/System/Library/Fonts/Menlo.ttc'
FONT_PATH_ZH = '/System/Library/Fonts/Hiragino Sans GB.ttc'

font_mono_regular = ImageFont.truetype(FONT_PATH_MONO, 18)
font_mono_bold = ImageFont.truetype(FONT_PATH_MONO, 18)
font_mono_large = ImageFont.truetype(FONT_PATH_MONO, 20)
font_zh = ImageFont.truetype(FONT_PATH_ZH, 16)
font_zh_bold = ImageFont.truetype(FONT_PATH_ZH, 17)
font_title = ImageFont.truetype(FONT_PATH_ZH, 14)

OUTPUT_DIR = '/tmp/demo_frames'
if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 颜色定义 (Google AI / Cyber Dark)
BG_COLOR = (13, 16, 23)        # #0d1017 极客暗黑
BAR_COLOR = (22, 27, 34)       # #161b22 顶部栏
BORDER_COLOR = (48, 54, 61)    # 终端边框
TEXT_WHITE = (230, 237, 243)
TEXT_GRAY = (139, 148, 158)
TEXT_GREEN = (63, 185, 80)     # #3fb950
TEXT_CYAN = (56, 189, 248)     # #38bdf8
TEXT_YELLOW = (245, 158, 11)   # #f59e0b
TEXT_BLUE = (88, 166, 255)
PROMPT_COLOR = (88, 166, 255)

def draw_window_frame():
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    # 顶部标题栏
    draw.rectangle([0, 0, WIDTH, 38], fill=BAR_COLOR)
    draw.line([0, 38, WIDTH, 38], fill=BORDER_COLOR, width=1)

    # 模拟 macOS 红黄绿圆点
    draw.ellipse([16, 13, 28, 25], fill=(239, 68, 68))
    draw.ellipse([36, 13, 48, 25], fill=(245, 158, 11))
    draw.ellipse([56, 13, 68, 25], fill=(16, 185, 129))

    # 标题文字
    title_text = "bash ~ root@linux-node: / (x.zttz.eu.org)"
    draw.text((WIDTH // 2 - 130, 10), title_text, fill=TEXT_GRAY, font=font_title)
    return img

# 剧本分段规划 (共 171 帧, 11.4 秒)
# 第一幕 (0 - 65 帧, 4.3 秒):
# 0-25 帧: 逐字打字 bash <(curl -sL https://x.zttz.eu.org/x.sh)
# 26-42 帧: 滚动输出安装日志
# 43-65 帧: 安装成功提示，停留
#
# 第二幕 (66 - 120 帧, 3.6 秒):
# 66 帧: 清屏
# 67-75 帧: 键入 k
# 76-120 帧: 弹出【Linux生态圈 · 主控制台】 7 大核心分类矩阵与快捷管理
#
# 第三幕 (121 - 171 帧, 3.5 秒):
# 121 帧: 清屏或在控制台下
# 122-132 帧: 键入 k app
# 133-171 帧: 正在呼出智能应用市场... 加载 128+ 精选应用, 7 个核心分类即装即用

CMD_1 = "bash <(curl -sL https://x.zttz.eu.org/x.sh)"

for frame_idx in range(TOTAL_FRAMES):
    img = draw_window_frame()
    draw = ImageDraw.Draw(img)
    cursor_visible = (frame_idx // 5) % 2 == 0

    if frame_idx < 66:
        # 第一幕
        # 提示符
        draw.text((24, 52), "root@cloud:~# ", fill=PROMPT_COLOR, font=font_mono_bold)

        # 打字效果
        typed_len = min(len(CMD_1), max(0, int((frame_idx - 5) / 20 * len(CMD_1))))
        current_cmd = CMD_1[:typed_len]
        draw.text((156, 52), current_cmd, fill=TEXT_WHITE, font=font_mono_bold)
        cmd_w = draw.textlength(current_cmd, font=font_mono_bold)
        if frame_idx < 28 and cursor_visible:
            draw.rectangle([158 + cmd_w, 53, 168 + cmd_w, 71], fill=TEXT_WHITE)

        y = 86
        if frame_idx >= 26:
            draw.text((24, y), "  [INFO] 正在连接 Linux生态圈极速镜像...", fill=TEXT_CYAN, font=font_zh)
        if frame_idx >= 32:
            draw.text((24, y + 26), "  [INFO] 依赖环境检测通过 (curl, tar, git, docker)...", fill=TEXT_GRAY, font=font_zh)
        if frame_idx >= 38:
            draw.text((24, y + 52), "  [INFO] 注入 7 大核心分类手风琴引擎与 128+ 应用矩阵...", fill=TEXT_GRAY, font=font_zh)
        if frame_idx >= 44:
            draw.text((24, y + 84), "  [ OK ] 快捷指令 'k' 已成功软链接至 /usr/local/bin/k", fill=TEXT_GREEN, font=font_zh_bold)
        if frame_idx >= 50:
            draw.text((24, y + 116), "  =======================================================", fill=BORDER_COLOR, font=font_mono_regular)
            draw.text((24, y + 142), "  ✨ 安装成功！输入快捷指令 ", fill=TEXT_WHITE, font=font_zh)
            draw.text((230, y + 140), "k", fill=TEXT_YELLOW, font=font_mono_large)
            draw.text((250, y + 142), " 即可随时呼出主控制面板与应用大厅", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 172), "  ✨ 一条 curl，整个开源世界随叫随到！", fill=TEXT_CYAN, font=font_zh_bold)
            draw.text((24, y + 202), "  =======================================================", fill=BORDER_COLOR, font=font_mono_regular)

    elif frame_idx < 121:
        # 第二幕: 清屏并展示 k 主控制台菜单
        local_f = frame_idx - 66
        draw.text((24, 52), "root@cloud:~# ", fill=PROMPT_COLOR, font=font_mono_bold)
        k_typed = "k" if local_f >= 4 else ""
        draw.text((156, 52), k_typed, fill=TEXT_WHITE, font=font_mono_bold)

        if local_f < 8 and cursor_visible:
            cur_x = 158 + (draw.textlength("k", font=font_mono_bold) if k_typed else 0)
            draw.rectangle([cur_x, 53, cur_x + 10, 71], fill=TEXT_WHITE)

        if local_f >= 8:
            y = 86
            draw.text((24, y), "  ================== Linux生态圈 · 主控制面板 ==================", fill=TEXT_CYAN, font=font_zh_bold)
            draw.text((24, y + 28), "  1) 智能应用市场   (k app)   --> 128+ 精选服务一键部署", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 56), "  2) BBRv3 内核加速 (k bbr3)  --> 极端网络链路深度优化", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 84), "  3) 系统深度清理   (k clean) --> 垃圾日志与无用内核自愈", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 112), "  4) 纯净系统重装   (k dd)    --> 官方纯净 Linux 秒级重置", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 140), "  5) 容器备份还原   (k backup)--> Docker 容器跨机秒级迁移", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 168), "  6) 检查与升级     (k update)--> 保持与全球开源生态同步", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 198), "  ================================================================", fill=BORDER_COLOR, font=font_mono_regular)
            draw.text((24, y + 230), "  请输入操作选项 [1-6] 或直接按回车退出: ", fill=TEXT_YELLOW, font=font_zh)
            if local_f >= 20:
                draw.text((360, y + 230), "1", fill=TEXT_WHITE, font=font_mono_bold)
                if local_f < 32 and cursor_visible:
                    draw.rectangle([376, y + 231, 386, y + 249], fill=TEXT_WHITE)

    else:
        # 第三幕: k app 直达应用市场 (7大分类矩阵)
        local_f = frame_idx - 121
        draw.text((24, 52), "root@cloud:~# ", fill=PROMPT_COLOR, font=font_mono_bold)
        app_cmd = "k app" if local_f >= 4 else "k"
        draw.text((156, 52), app_cmd, fill=TEXT_WHITE, font=font_mono_bold)

        y = 86
        if local_f >= 6:
            draw.text((24, y), "  [INFO] 正在呼出现代化应用生态大厅 (7 个应用分类 · 128+ 应用)...", fill=TEXT_CYAN, font=font_zh)
            draw.text((24, y + 28), "  ================ 🚀 精选开源服务 7 核心分类矩阵 ================", fill=TEXT_YELLOW, font=font_zh_bold)
            draw.text((24, y + 56), "  [A] 🌟 [Github乐园] 热门开源TOP10 (A1~A10 / DeepSeek / AI Agent)", fill=TEXT_GREEN, font=font_zh)
            draw.text((24, y + 84), "  [B] 🖥️  服务器运维与探针监控   (29款 / 宝塔面板, 哪吒探针, 1Panel)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 112), "  [C] 🤖 人工智能与前沿大模型   (14款 / Ollama, Dify, FastGPT, Open-WebUI)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 140), "  [D] 🌐 网络代理与穿透组网     (15款 / FRP, 1Panel-WAF, Tailscale)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 168), "  [E] 🗄️  私有网盘与数据存储     (14款 / AList, Nextcloud, Cloudreve)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 196), "  [F] 🎬 影音媒体与离线下载     (14款 / Emby, Jellyfin, qBittorrent)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 224), "  [G] 📝 协作办公与实用工具     (32款 / N8N, Vaultwarden, Halo, Memos)", fill=TEXT_WHITE, font=font_zh)
            draw.text((24, y + 254), "  ================================================================", fill=BORDER_COLOR, font=font_mono_regular)
            draw.text((24, y + 284), "  ⚡ 快捷操作：输入分类代号展开 [A-G]，或输入序号 (如 57) 直达安装", fill=TEXT_CYAN, font=font_zh)

            if local_f >= 25:
                draw.text((24, y + 314), "  选择 > ", fill=TEXT_YELLOW, font=font_zh_bold)
                draw.text((80, y + 314), "A", fill=TEXT_WHITE, font=font_mono_bold)
                if cursor_visible:
                    draw.rectangle([98, y + 315, 108, y + 333], fill=TEXT_WHITE)

    frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_idx:04d}.png")
    img.save(frame_path)

print(f"Rendered {TOTAL_FRAMES} frames successfully to {OUTPUT_DIR}")
