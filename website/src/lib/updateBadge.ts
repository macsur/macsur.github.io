/**
 * 首页「今日更新」徽标文案计算（纯逻辑，可被回归测试直接引用）。
 *
 * 背景（2026-10-21 前端巡检发现）：
 *   徽标文案原先在 page.tsx 的 useMemo([]) 里直接读 `new Date()`，于是
 *   **构建那一刻**的判断结果被烤进静态 HTML：
 *   1) 访客在别的日期打开时，客户端算出的是另一句文案 → React 水合不一致
 *      （hydration mismatch）报错；
 *   2) 缓存副本会一直谎报「今日 05:03 已更新」——数据其实已经是前天的了。
 *
 * 修复：把「相对今天」的判断挪到水合之后（useEffect）再做。
 *   - 确定性模式（viewerDate = null）：只输出与当前时间**无关**的绝对时间，
 *     SSR 与首次客户端渲染逐字节一致 → 结构上不可能水合不一致；
 *   - 实时模式（传入访客当前时间）：当天则升级为「今日/假日 HH:MM 已更新」，
 *     跨天则回落到绝对时间，绝不谎报「今日」。
 */
import { getBeijingDateString } from '../data/holidays';

export interface UpdateBadgeOptions {
  /** 访客当前时间；null = 确定性模式（SSR / 首次客户端渲染） */
  viewerDate: Date | null;
  /** 访客当日是否为法定节假日（仅实时模式使用） */
  isHoliday?: boolean;
}

export interface UpdateTimestamp {
  year: number;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

/** 解析 "2026-10-04 15:20 (UTC+8)" 这类时间戳。 */
export function parseUpdateTimestamp(value: string): UpdateTimestamp | null {
  const match = value.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return null;
  const [, year, month, day, hour, minute] = match;
  return { year: parseInt(year, 10), month, day, hour, minute };
}

/**
 * 计算「今日更新 (…已更新)」括号内的文案。
 *
 * @param lastUpdatedAt 数据生成时间戳（构建期常量，SSR 与客户端一致）
 * @param options 访客时间上下文；viewerDate 为 null 时输出绝对时间
 */
export function formatUpdateBadge(lastUpdatedAt: string, options: UpdateBadgeOptions): string {
  const parsed = parseUpdateTimestamp(lastUpdatedAt);

  if (!parsed) {
    if (options.viewerDate === null) return '已更新';
    return `${options.isHoliday ? '假日' : '今日'}已更新`;
  }

  const { year, month, day, hour, minute } = parsed;
  const absolute = `${month}-${day} ${hour}:${minute} 已更新`;

  // 确定性模式：不引入任何「当前时间」判断，保证 SSR 与客户端首帧完全一致
  if (options.viewerDate === null) return absolute;

  const viewerDate = getBeijingDateString(options.viewerDate);
  if (viewerDate !== `${year}-${month}-${day}`) return absolute;

  return `${options.isHoliday ? '假日' : '今日'} ${hour}:${minute} 已更新`;
}
