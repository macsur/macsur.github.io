/**
 * Gh-Mirror v4.0（稳定版）*
 * 支持：*   https:// 你的域名 /owner/repo                    → 仓库页
 *   https:// 你的域名 /owner/repo/blob/main/x.py     → 代码页
 *   https:// 你的域名 /owner/repo/raw/main/x.py      → 原始文件（A 形式直连）*   https:// 你的域名 /raw/owner/repo/main/x.py      → 原始文件（B 形式直连）*   https:// 你的域名 /proxy/<github 域名 >/< 路径 >      → 静态资源 /API
 *   git clone https:// 你的域名 /owner/repo.git       → git smart HTTP 代理
 */

const SCHEME = 'https';
const MAIN_HOST = 'github.com';
const RAW_HOST = 'raw.githubusercontent.com';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const PROXY_HOSTS = new Set([
  'github.com',
  'github.githubassets.com',
  'avatars.githubusercontent.com',
  'user-images.githubusercontent.com',
  'private-user-images.githubusercontent.com',
  'media.githubusercontent.com',
  'cloud.githubusercontent.com',
  'camo.githubusercontent.com',
  'objects.githubusercontent.com',
  'github-releases.githubusercontent.com',
  'raw.githubusercontent.com',
  'codeload.github.com',
  'gist.github.com',
  'api.github.com',
  'github-cloud.s3.amazonaws.com',
  'github-production-release-asset-2e65be.s3.amazonaws.com',
  'github-production-user-asset-6210df.s3.amazonaws.com',
  'github-production-repository-file-5c1aeb.s3.amazonaws.com',
]);

const STATIC_CACHE_HOSTS = new Set([
  'github.githubassets.com',
  'avatars.githubusercontent.com',
  'user-images.githubusercontent.com',
  'private-user-images.githubusercontent.com',
  'media.githubusercontent.com',
  'cloud.githubusercontent.com',
  'camo.githubusercontent.com',
]);

// P0-1: 废弃 GITHUB_S3_RE 通配，改用 4 个精确桶名 Set
const GITHUB_S3_BUCKETS = new Set([
  'github-cloud.s3.amazonaws.com',
  'github-production-release-asset-2e65be.s3.amazonaws.com',
  'github-production-user-asset-6210df.s3.amazonaws.com',
  'github-production-repository-file-5c1aeb.s3.amazonaws.com',
]);

const REWRITE_RE = /(https?:)?\/\/([a-z0-9.-]+)(\/[^\s"'<>()]*)?/gi;
const PROXY_PATH_RE = /^\/proxy\/([^/]+)(\/[\s\S]*)?$/;
const RAW_PATH_RE = /^\/raw\/([\s\S]+)$/;
const GITHUB_RAW_RE = /^\/([^/]+)\/([^/]+)\/raw\/([\s\S]+)$/;
const GITHUB_BLOB_RE = /^\/([^/]+)\/([^/]+)\/blob\/([\s\S]+)$/;

// git smart HTTP
const GIT_INFO_RE = /\/info\/refs$/;
const GIT_UPLOAD_RE = /\/git-upload-pack$/;
const GIT_RECEIVE_RE = /\/git-receive-pack$/;

const TTL_STATIC = 86400; // 24h
const TTL_RAW = 600;      // 10min

const ALLOW_METHODS = new Set(['GET', 'HEAD', 'POST']);
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const RETRY_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CLIENT_SCRIPT = `
(function () {
  'use strict';

  function mirror(u) {if (typeof u !== 'string' || !u) return u;
    var s = u.trim();
    if (!s || s.charAt(0) === '#' ||
        s.slice(0, 7) === 'mailto:' ||
        s.slice(0, 11) === 'javascript:' ||
        s.slice(0, 5) === 'data:') return u;

    var url;
    try {url = new URL(s, document.baseURI || location.href); } catch (e) {return u;}

    var h = url.hostname.toLowerCase();
    var p = url.pathname + url.search + url.hash;

    if (h === 'github.com') return p || '/';
    if (h === 'raw.githubusercontent.com') return '/raw' + p;
    var s3Exact = {
      'github-cloud.s3.amazonaws.com': 1,
      'github-production-release-asset-2e65be.s3.amazonaws.com': 1,
      'github-production-user-asset-6210df.s3.amazonaws.com': 1,
      'github-production-repository-file-5c1aeb.s3.amazonaws.com': 1
    };
    if (/[.](github|githubusercontent)[.]com$/.test(h) || s3Exact[h]) {return '/proxy/' + h + p;}
    return u;
  }

  function fixHref(a) {
    try {var oldHref = a.getAttribute('href');
      if (!oldHref) return;
      var n = mirror(oldHref);
      if (n !== oldHref) a.setAttribute('href', n);
    } catch (e) {}}

  function scan(root) {if (!root || !root.querySelectorAll) return;
    try {root.querySelectorAll('a[href], area[href]').forEach(fixHref); } catch (e) {}}

  var nativeFetch = window.fetch;
  if (typeof nativeFetch === 'function') {window.fetch = function (input, init) {
      try {if (typeof input === 'string') {input = mirror(input);
        } else if (input && typeof input === 'object' && typeof input.url === 'string') {var n = mirror(input.url);
          if (n !== input.url) {
            input = new Request(n, {
              method: input.method,
              headers: input.headers,
              body: input.body,
              mode: input.mode,
              credentials: input.credentials,
              cache: input.cache,
              redirect: input.redirect,
              referrer: input.referrer,
              referrerPolicy: input.referrerPolicy,
              integrity: input.integrity,
              keepalive: input.keepalive
            });
          }
        }
      } catch (e) {}
      return nativeFetch.call(this, input, init);
    };
  }

  if (typeof XMLHttpRequest !== 'undefined') {
    var nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {try { arguments[1] = mirror(url); } catch (e) {}
      return nativeOpen.apply(this, arguments);
    };
  }

  if (typeof window.open === 'function') {
    var nativeOpenWindow = window.open;
    window.open = function (u) {try { arguments[0] = mirror(u); } catch (e) {}
      return nativeOpenWindow.apply(this, arguments);
    };
  }

  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document && !(el.tagName && String(el.tagName).toLowerCase() === 'a')) {el = el.parentNode;}
    if (el && el.tagName) fixHref(el);
  }, true);

  if (document.readyState === 'loading') {document.addEventListener('DOMContentLoaded', function () {scan(document); });
  } else {scan(document);
  }
})();
`;

function isProxiable(host) {if (!host) return false;
  const h = host.toLowerCase();
  if (PROXY_HOSTS.has(h) || h === MAIN_HOST) return true;
  if (GITHUB_S3_BUCKETS.has(h)) return true;
  if (h.endsWith('.github.com') || h.endsWith('.githubusercontent.com')) return true;
  return false;
}

function rewriteText(text, self) {if (!text) return text;
  return text.replace(REWRITE_RE, (m, _scheme, host, path) => {const h = (host || '').toLowerCase();
    const rest = path || '/';
    if (h === MAIN_HOST) return self + rest;
    if (h === RAW_HOST) return self + '/raw' + rest;
    if (isProxiable(h)) return self + '/proxy/' + h + rest;
    return m;
  });
}

function injectScript(html, script) {const lower = html.toLowerCase();
  const headIdx = lower.indexOf('<head');
  if (headIdx === -1) return script + html;

  const endIdx = html.indexOf('>', headIdx);
  if (endIdx === -1) return html;

  return (html.slice(0, endIdx + 1) +
    '\n<script data-mirror="runtime">' +
    script +
    '</script>\n' +
    html.slice(endIdx + 1)
  );
}

function errorResponse(status, message) {return new Response(`GitHub Mirror Error (${status})\n${message}`, {
    status,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function cleanRequestHeaders(request, targetUrl, isGit = false) {const headers = new Headers(request.headers);

  [
    'host',
    'accept-encoding',
    'cookie',
    'origin',
    'expect',
    'transfer-encoding',
    'connection',
    'proxy-connection',
    'cf-connecting-ip',
    'cf-ray',
    'cf-visitor',
    'cf-worker',
    'cdn-loop',
    'x-forwarded-for',
    'x-forwarded-proto',
    'x-real-ip',
  ].forEach((h) => headers.delete(h));

  // P0-2: authorization 头仅 git 通道及 github.com/api 保留，其余剥除
  let allowAuth = false;
  if (targetUrl) {
    try {
      const u = new URL(targetUrl);
      const th = u.hostname.toLowerCase();
      const tp = u.pathname;
      const isGitEndpoint = isGit || GIT_INFO_RE.test(tp) || GIT_UPLOAD_RE.test(tp) || GIT_RECEIVE_RE.test(tp);
      if (th === 'github.com' && isGitEndpoint) {
        allowAuth = true;
      } else if (th === 'api.github.com') {
        allowAuth = true;
      }
    } catch (_) {}
  }
  if (!allowAuth) {
    headers.delete('authorization');
  }

  const ua = headers.get('user-agent');
  if (!ua || /^cloudflare/i.test(ua)) {headers.set('user-agent', USER_AGENT);
  }

  if (!headers.has('accept')) {headers.set('accept', '*/*');
  }

  return headers;
}

/**
 * GET/HEAD 以及已缓冲的 upload-pack POST 可重试一次。*/
async function fetchWithRetry(target, init, canRetry = false) {
  const attempts = canRetry ? 2 : 1;

  for (let attempt = 0; attempt < attempts; attempt++) {
    let resp;
    try {resp = await fetch(target, init);
    } catch (err) {if (attempt === 0 && attempts > 1) {await sleep(200);
        continue;
      }
      throw err;
    }

    if (attempt === 0 && attempts > 1 && RETRY_STATUSES.has(resp.status)) {
      try {await resp.body?.cancel();
      } catch (_) {}
      await sleep(200);
      continue;
    }

    return resp;
  }

  throw new Error('upstream fetch failed after retries');
}

async function upstream(request, targetUrl, opts) {
  const {
    self,
    isPage = false,
    cache = false,
    cacheTtl = TTL_STATIC,
    retryPost = false,
    isGit = false,
  } = opts;

  const method = request.method.toUpperCase();
  const headers = cleanRequestHeaders(request, targetUrl, isGit);

  const init = {
    method,
    headers,
    redirect: 'manual',
  };

  // P0-4: 带 authorization 的请求 cache 一律 false
  const hasAuth = request.headers.has('authorization');
  if (cache && !hasAuth && (method === 'GET' || method === 'HEAD') && !headers.has('range')) {
    init.cf = {
      cacheEverything: true,
      cacheTtl,
    };
  }

  if (method !== 'GET' && method !== 'HEAD') {if (retryPost) {
      // upload-pack 的请求体通常很小，缓冲后可安全重试
      init.body = await request.arrayBuffer();
      headers.delete('content-length'); // 交给 fetch 重新计算
    } else {
      // push 等大请求体保持流式，不缓冲
      init.body = request.body;
    }
  }

  let resp;
  try {
    resp = await fetchWithRetry(
      targetUrl,
      init,
      method === 'GET' || method === 'HEAD' || retryPost
    );
  } catch (err) {return errorResponse(502, '上游请求失败:' + (err && err.message ? err.message : err));
  }

  const outHeaders = new Headers(resp.headers);

  [
    'set-cookie',
    'set-cookie2',
    'content-security-policy',
    'content-security-policy-report-only',
    'x-frame-options',
  ].forEach((h) => outHeaders.delete(h));

  if (REDIRECT_STATUSES.has(resp.status)) {const loc = outHeaders.get('location');
    if (loc) outHeaders.set('location', rewriteText(loc, self));
    outHeaders.delete('content-length');
    return new Response(resp.body, { status: resp.status, headers: outHeaders});
  }

  if (method === 'HEAD') {return new Response(null, { status: resp.status, headers: outHeaders});
  }

  const ctype = outHeaders.get('content-type') || '';

  if (isPage && ctype.includes('text/html')) {
    try {const html = await resp.text();
      outHeaders.delete('content-length');
      outHeaders.delete('content-encoding');
      outHeaders.set('content-type', 'text/html; charset=utf-8');

      const rewritten = rewriteText(html, self);
      return new Response(injectScript(rewritten, CLIENT_SCRIPT), {
        status: resp.status,
        headers: outHeaders,
      });
    } catch (err) {return errorResponse(502, 'HTML 处理失败:' + err.message);
    }
  }

  return new Response(resp.body, { status: resp.status, headers: outHeaders});
}

export default {async fetch(request, env, ctx) {const url = new URL(request.url);
    const self = SCHEME + '://' + url.host;
    const path = url.pathname;
    const q = url.search;

    if (path === '/healthz' || path === '/_health') {
      return new Response('ok', {
        status: 200,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
        },
      });
    }

    // P0-3: Ratelimit binding (每 IP 30 req/min)
    if (env && env.RATE_LIMITER) {
      const clientIp = request.headers.get('cf-connecting-ip') || 'anon';
      try {
        const { success } = await env.RATE_LIMITER.limit({ key: clientIp });
        if (!success) {
          return errorResponse(429, 'Too Many Requests (rate limit: 30 req/min)');
        }
      } catch (_) {}
    }

    const method = request.method.toUpperCase();
    if (!ALLOW_METHODS.has(method)) {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          allow: 'GET, HEAD, POST',
          'cache-control': 'no-store',
        },
      });
    }

    // a) /proxy/< 真实域名 >/< 路径 >
    const pm = path.match(PROXY_PATH_RE);
    if (pm) {const host = pm[1].toLowerCase();
      if (!isProxiable(host)) {return errorResponse(403, '不允许代理的主机:' + host);
      }
      const rest = pm[2] ? pm[2].slice(1) : '';
      const isMain = host === MAIN_HOST;
      const isRaw = host === RAW_HOST;
      return upstream(request, `${SCHEME}://${host}/${rest}${q}`, {
        self,
        isPage: isMain,
        cache: !isMain && (STATIC_CACHE_HOSTS.has(host) || isRaw),
        cacheTtl: isRaw ? TTL_RAW : TTL_STATIC,
      });
    }

    // b) /raw/<owner>/<repo>/<ref>/<file>
    const rm = path.match(RAW_PATH_RE);
    if (rm) {return upstream(request, `${SCHEME}://${RAW_HOST}/${rm[1]}${q}`, {
        self,
        isPage: false,
        cache: true,
        cacheTtl: TTL_RAW,
      });
    }

    // c) /owner/repo/raw/ref/file
    const rawShortcut = path.match(GITHUB_RAW_RE);
    if (rawShortcut) {
      return upstream(
        request,
        `${SCHEME}://${RAW_HOST}/${rawShortcut[1]}/${rawShortcut[2]}/${rawShortcut[3]}${q}`,
        {self, isPage: false, cache: true, cacheTtl: TTL_RAW}
      );
    }

    // d) /owner/repo/blob/ref/file?raw=1
    const wantRaw =
      url.searchParams.get('raw') === '1' || url.searchParams.get('raw') === 'true';
    if (wantRaw) {const blob = path.match(GITHUB_BLOB_RE);
      if (blob) {
        return upstream(
          request,
          `${SCHEME}://${RAW_HOST}/${blob[1]}/${blob[2]}/${blob[3]}`,
          {self, isPage: false, cache: true, cacheTtl: TTL_RAW}
        );
      }
    }

    // e) git smart HTTP：/owner/repo(.git)/info/refs|git-upload-pack|git-receive-pack
    const isGitInfo = GIT_INFO_RE.test(path);
    const isGitUpload = GIT_UPLOAD_RE.test(path);
    const isGitReceive = GIT_RECEIVE_RE.test(path);

    if (isGitInfo || isGitUpload || isGitReceive) {return upstream(request, `${SCHEME}://${MAIN_HOST}${path}${q}`, {
        self,
        isPage: false,
        cache: false,
        isGit: true,
        // upload-pack 是只读请求，缓冲后可安全重试；receive-pack（push）不重试
        retryPost: isGitUpload,
      });
    }

    // f) 其余按 github.com 页面处理
    return upstream(request, `${SCHEME}://${MAIN_HOST}${path}${q}`, {
      self,
      isPage: true,
      cache: false,
    });
  },
};
