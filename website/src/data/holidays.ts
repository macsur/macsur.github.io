/**
 * 2026年国家法定节假日及调休安排表
 * 包含：元旦、春节、清明、劳动节、端午、中秋、国庆
 * 每年 11 月国务院发布新一年法定节假日安排后手动更新
 */
export interface HolidayRange {
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export const OFFICIAL_HOLIDAYS_2026: HolidayRange[] = [
  { name: '元旦', startDate: '2026-01-01', endDate: '2026-01-03' },
  { name: '春节', startDate: '2026-02-15', endDate: '2026-02-23' },
  { name: '清明节', startDate: '2026-04-04', endDate: '2026-04-06' },
  { name: '劳动节', startDate: '2026-05-01', endDate: '2026-05-05' },
  { name: '端午节', startDate: '2026-06-19', endDate: '2026-06-21' },
  { name: '中秋节', startDate: '2026-09-25', endDate: '2026-09-27' },
  { name: '国庆节', startDate: '2026-10-01', endDate: '2026-10-07' },
];

/**
 * 获取当前北京时间 (UTC+8) 的 YYYY-MM-DD 日期字符串
 */
export function getBeijingDateString(dateInput?: Date): string {
  const now = dateInput || new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bjTime = new Date(utc + 8 * 3600000);
  const year = bjTime.getFullYear();
  const month = String(bjTime.getMonth() + 1).padStart(2, '0');
  const day = String(bjTime.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 判断指定日期（默认当前北京时间）是否落在国家法定节假日区间
 */
export function isHolidayToday(customDate?: Date | string): boolean {
  const targetDate = typeof customDate === 'string' 
    ? customDate 
    : getBeijingDateString(customDate);

  return OFFICIAL_HOLIDAYS_2026.some((h) => {
    return targetDate >= h.startDate && targetDate <= h.endDate;
  });
}
