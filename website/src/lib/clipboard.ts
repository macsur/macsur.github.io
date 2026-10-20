/**
 * 剪贴板复制辅助（纯逻辑，可被回归测试直接引用）。
 *
 * 背景（2026-10-21 前端巡检发现）：
 *   首页原先直接调用 `navigator.clipboard.writeText(text)` 且不 await、不 catch。
 *   1) 非安全上下文（http://）下 `navigator.clipboard` 为 undefined → 同步抛
 *      TypeError，整个点击处理被中断；
 *   2) 即使 clipboard 存在，写入被拒（如权限被拒 / 非用户手势）时 Promise 被
 *      拒绝 → 产生 unhandledrejection，同时 UI 仍然把按钮切换成「已复制」，
 *      用户拿到的是**假成功提示**。
 *
 * 这里把「写入是否真的成功」如实反馈给调用方：只有写入成功才应该展示已复制态。
 */

export type CopyResult = { ok: true } | { ok: false; reason: 'unsupported' | 'rejected' };

/**
 * 尝试把文本写入剪贴板。
 *
 * @param text 待复制文本
 * @param clipboardApi 可注入的 clipboard 实现（默认取 navigator.clipboard），便于测试
 * @returns 写入结果；调用方应据此决定是否展示「已复制」反馈
 */
export async function copyTextToClipboard(
  text: string,
  clipboardApi?: Pick<Clipboard, 'writeText'> | null,
): Promise<CopyResult> {
  const api = clipboardApi !== undefined ? clipboardApi : getNavigatorClipboard();
  if (!api || typeof api.writeText !== 'function') {
    return { ok: false, reason: 'unsupported' };
  }
  try {
    await api.writeText(text);
    return { ok: true };
  } catch {
    return { ok: false, reason: 'rejected' };
  }
}

/** 安全读取 navigator.clipboard（SSR / 非安全上下文下 navigator 可能不存在）。 */
function getNavigatorClipboard(): Pick<Clipboard, 'writeText'> | null {
  if (typeof navigator === 'undefined') return null;
  return navigator.clipboard ?? null;
}
