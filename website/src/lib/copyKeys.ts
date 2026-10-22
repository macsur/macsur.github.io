/**
 * 复制按钮身份标识（copy key）。
 *
 * 背景（2026-10-21 前端巡检发现）：
 *   首页的「已复制」反馈此前用**剪贴板内容**作为状态键
 *   （copiedText === item.cmd）。但复制内容相同的按钮远不止一个：
 *   - 应用市场「社区与第三方扩展」板块 41 张卡的指令都是 `z app`；
 *   - 今日推荐的 `z app 201/202/203` 与应用市场里同款应用的按钮内容一致；
 *   - 常用指令 `z app 57` 与应用市场 #57 卡的按钮内容一致。
 *   点其中任意一张，**多张卡会同时亮起「已复制」**，用户无法分辨复制的是哪一条。
 *
 * 修复：状态键改为**按钮身份**（谁被点了），与复制内容解耦。
 *   复制内容会随应用市场增删而变化，用内容当键必然撞车；
 *   按钮身份是稳定且唯一的标识，用命名空间隔离不同板块。
 */

export const COPY_KEYS = {
  /** 顶部安装命令（bash <(curl ...)） */
  install: 'copy:install',
  /** 常用指令卡（指令文本唯一） */
  quickCommand: (cmd: string) => `copy:quick:${cmd}`,
  /** 今日推荐卡（与市场卡指令可能相同，靠命名空间隔离） */
  dailyRecommend: (cmd: string) => `copy:daily:${cmd}`,
  /** 应用市场卡（按应用 id 唯一，含 41 张同指令的社区扩展卡） */
  appMarket: (appId: string | number) => `copy:market:${appId}`,
  /** GitHub 乐园 TOP10 卡（按排名唯一） */
  trendingRepo: (rank: number) => `copy:trending:${rank}`,
} as const;
