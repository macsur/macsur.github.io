/**
 * 构建期时间锚点（静态导出站点的「现在」）。
 *
 * 背景（2026-10-21 前端巡检发现）：
 *   本站是 `output: 'export'` 的纯静态站点，HTML 在 CI 构建那一刻烤死。
 *   若组件在**首帧**读取 `new Date()`，构建机时区/时间与访客不同就会
 *   导致 React 水合不一致（hydration mismatch）报错。
 *
 * 这里用**构建期生成的数据时间戳**作为确定性的「构建时刻」：
 *   - `LAST_UPDATED_AT` 由 prebuild 的 fetch_github_trending.js 在构建时写入，
 *     格式为 "YYYY-MM-DD HH:mm (UTC+8)"，即北京时间；
 *   - 它对 SSR 与客户端是同一个常量 → 首帧渲染逐字节一致。
 *
 * 访客真实时间只能在 useEffect（水合之后）里取，再用来做「相对今天」的措辞。
 */
import { LAST_UPDATED_AT } from '../data/trendingData';

/** 把 "2026-10-04 15:20 (UTC+8)" 解析成绝对时刻（UTC+8 基准）。 */
export function parseBeijingTimestamp(value: string): Date {
  const match = value.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) {
    // 时间戳缺失时退回站点定版月份（2026-10），保证首帧仍有确定值
    return new Date('2026-10-01T00:00:00+08:00');
  }
  const [, year, month, day, hour, minute] = match;
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00+08:00`);
}

/** 构建时刻（北京时间）。SSR 与客户端读到的是同一个值。 */
export const BUILD_TIME: Date = parseBeijingTimestamp(LAST_UPDATED_AT);
