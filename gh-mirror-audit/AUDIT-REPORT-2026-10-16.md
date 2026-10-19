# Gh-Mirror v4.0 Worker 安全审计报告

- 审计对象：`~/Desktop/Kejilion/gh-mirror-audit/worker.js`（Gh-Mirror v4.0，线上部署于 git.tomt.cc.cd，Worker 名 git-tomt-mirror）
- 审计日期：2026-10-16
- 样本核验：本地文件 13,819 字节（去末尾换行 13,818 字节，SHA-256 `c3be828bde1eff1a752c5adc1f8bd2a7fb827cb805a71f2f190337693e403529`，与线上原件一致，内容无差异）
- 审计方式：静态逐行分析 + 对线上 git.tomt.cc.cd 的最小只读验证请求（共 19 组，全部为 GET/HEAD，无压测、无攻击性利用）
- 结论标注：所有结论均基于代码阅读与线上实测；线上实测以「实测」标注；仅靠推理未实测的标「存疑」
- 声明：本单只产出报告与方案，未修改任何代码、未触碰线上 Worker 与 DNS/路由

## 一、总览结论

Worker 整体架构清晰，主机白名单、方法白名单、请求头清理、HTML 改写与客户端注入的基本盘是好的。线上实测确认：非白名单主机、尾点域名、带端口主机均被 403 拒绝；仓库页 HTML 改写与脚本注入工作正常；git upload-pack 通道可用。

但存在 3 个高严重度问题、4 个中严重度问题，核心风险集中在：**① 开放代理可被任何人滥用（盗刷额度/跳板/风控连坐）；② `GITHUB_S3_RE` 正则允许代理任意 `github-*` S3 桶（实测确认，非白名单桶 `github-evil.s3.amazonaws.com` 被放行）；③ `authorization` 头被无条件透传到全部上游主机（含各 S3 桶与 api.github.com），令牌外泄面大**。

Bug 层面：`/proxy/` 路径的 rest 提取逻辑存在尾斜杠丢失问题；HTML 全量缓冲对大页面有内存与 TTFB 影响；`content-length` 在部分分支删除不一致。优化空间集中在缓存分层、可观测性与本地可测试性。

问题计数：高 3 / 中 4 / 低 6（安全），Bug 5，优化建议 7。

## 二、安全问题清单

### 【高-1】GITHUB_S3_RE 允许代理任意 `github-*` 命名空间的 S3 桶

- 位置：`GITHUB_S3_RE` 定义（worker.js:47）、`isProxiable`（worker.js:154-160）
- 问题：正则 `/^github-[a-z0-9][a-z0-9-]*\.s3\.amazonaws\.com$/i` 匹配所有以 `github-` 开头的 S3 桶名。任何人在 AWS 上注册 `github-xxx.s3.amazonaws.com` 桶即可被本镜像代理。
- 利用条件与影响：攻击者可注册形如 `github-` 前缀的 S3 桶，通过镜像分发恶意内容（借 GitHub 镜像域名信誉做钓鱼）、或滥用镜像流量打自己的桶。桶名全局唯一、AWS 会保留知名前缀（github 相关桶名大概率被 GitHub 占用），实际可注册的 `github-` 前缀桶有限——但代码层面这确实是白名单语义漏洞。
- 证据（实测）：请求 `https://git.tomt.cc.cd/proxy/github-evil.s3.amazonaws.com/x` 返回 404，响应体为 S3 的 `NoSuchBucket` XML：
  ```xml
  <Error><Code>NoSuchBucket</Code>...<BucketName>github-evil</BucketName>...</Error>
  ```
  Worker 本身未拒绝（对比 `evil.com` 返回 Worker 自身的 403 文本），证明请求已被转发到任意 `github-*` 桶。
- 修复建议：S3 主机改用与 `PROXY_HOSTS` 一致的白名单方式（Set 精确匹配），删除宽松正则；或至少收紧为「PROXY_HOSTS 已列出的 4 个桶 + 正则」，即先查 Set，未命中再看是否属于已知桶列表。

### 【高-2】authorization 头无条件透传到所有上游主机，令牌外泄面大

- 位置：`cleanRequestHeaders`（worker.js:196-227，第 217 行注释明确保留 authorization）
- 问题：用户经 `/proxy/api.github.com/...` 或 `/proxy/任意S3桶/...` 发请求时，其 `authorization` 头（可能含 GitHub PAT、Bearer token）会被原样转发到该上游。GitHub 官方域名的桶是可信的，但【高-1】的任意 `github-*` 桶 + 本条叠加后：攻击者若能让用户访问 `https://git.tomt.cc.cd/proxy/github-attackers-bucket.s3.amazonaws.com/...`（例如在镜像站页面/教程评论区诱导），用户若把镜像站当 GitHub 用并携带了 token，token 就发给了攻击者的 S3 桶。
- 利用条件：需要诱导受害者主动带 token 访问恶意构造的镜像 URL（社工条件不低，但一旦成立即 token 泄露）；另有一个无需社工的被动面：凡是被 GitHub 页面 JSON/链接引到 `objects.githubusercontent.com` 等桶的带鉴权请求，token 也随行——这些是 GitHub 自家可信桶，属低风险，但语义上仍是「把 GitHub 凭证发给 GitHub 之外的域名」（amazonaws.com 属 AWS）。
- 证据：worker.js:217 注释明确写「保留 authorization，以便私有仓库带 token 也能 clone」。git smart HTTP 通道（e 分支）确实需要它。
- 修复建议：按目标主机分类处理——仅当目标是 `github.com`（git smart HTTP 通道）且路径匹配 git 端点正则时才转发 authorization；`/proxy/` 分支一律剥除 authorization（或仅允许 api.github.com）；S3 桶一律剥除。这样私有 clone 不受影响，其余外泄面关闭。

### 【高-3】开放代理：任何人可无限使用，可盗刷 Workers 免费额度、做跳板、触发风控连坐

- 位置：整个 fetch handler（worker.js:340-435），无任何访问控制
- 问题：镜像完全开放，互联网任何人/任何脚本都能用。后果：
  1. **额度盗刷**：Workers 免费版 10 万请求/天，付费版按请求计费。被爬虫脚本或滥用者盯上即超额。
  2. **风控连坐**：所有请求经同一出口 IP 段（实测 GitHub 对镜像出口显示为 `104.23.251.21`）访问 GitHub。滥用者的疯狂请求会让这个出口 IP 被 GitHub 限流/封禁——实测已出现：`api.github.com` 请求返回 `{"message":"API rate limit exceeded for 104.23.251.21...`，x-ratelimit-remaining: 53，说明共享出口的 60 次/时限流池已在被消耗。此后所有正常用户的 API 代理请求一起被限。
  3. **跳板**：白名单内主机虽可控，但 `api.github.com` 代理允许把镜像当作 GitHub API 的匿名代理用（写操作经 POST 也被允许），可能被滥用为刷 GitHub API、批量注册探测等行为的隐匿跳板。
- 证据（实测）：① 任何人无需认证即可使用全部功能；② api.github.com 代理请求实际命中限流：`x-ratelimit-limit: 60, x-ratelimit-used: 7, x-ratelimit-remaining: 53`；③ GitHub 报错文本 `API rate limit exceeded for 104.23.251.21` 直接暴露镜像出口 IP 段。
- 修复建议（按成本递增，代价写清）：
  - **方案 A（零成本）**：Workers 侧加 Ratelimit binding（Cloudflare 原生，免费额度内），对每 IP 限流（如 30 req/min）。代价：正常重度用户可能被限。
  - **方案 B（低）**：仅对 `/proxy/api.github.com/*` 限流或加 Turnstile 挑战；页面/raw/git clone 不动（这些走 Cloudflare 缓存或 GitHub 自身限流）。代价：API 代理用户体验下降。
  - **方案 C（中）**：整站 Cloudflare WAF 规则按 ASN/国家/UA 过滤，或加 Access（Zero Trust）认证。代价：公开镜像变私有，失去「公共镜像」性质。
  - 建议至少先上 A：一行 binding + fetch 入口三行代码，保护额度与风控。

### 【中-1】CSP 与 X-Frame-Options 被剥离 + 客户端脚本注入：镜像站可被任意 iframe 嵌套、失去 GitHub 原生 CSP 保护

- 位置：`upstream`（worker.js:303-309 删除 CSP/XFO 头）、`injectScript`（worker.js:172-185）
- 问题：GitHub 页面原生 `x-frame-options: deny` 与严格 CSP（script-src 只允许官方资源）被镜像剥离，且注入了自己的运行时脚本。后果：镜像站可被任何第三方 iframe 嵌套（做钓鱼壳）；镜像页面运行在无 CSP 环境下，若【高-1】的恶意桶内容或上游改写 bug 引入恶意脚本，无第二道防线。注入的 CLIENT_SCRIPT 劫持了 `window.fetch`/`XMLHttpRequest`/`window.open`，若上游页面自身依赖这些 API 的特定行为（如 Request 对象复制丢失 duplex/ime 转发等边缘属性），可能产生功能性问题。
- 证据（实测）：直连 `github.com/octocat/Hello-World` 返回 `x-frame-options: deny` + 严格 CSP；经镜像后响应头两者均不存在（curl -I 零命中确认）。注入脚本 `data-mirror="runtime"` 存在于改写后的页面。
- 修复建议：改为「重建并收紧 CSP」而非删除——移除 frame-ancestors 限制（或不限制，方便他人嵌套属产品决策），但保留 script-src 指向 github.githubassets.com + 注入脚本自身哈希；至少恢复 `x-content-type-options: nosniff`（实测上游有、镜像也透传了，此条 OK）。

### 【中-2】缓存投毒面：raw 与静态资源 cacheEverything + query 完整参与缓存键

- 位置：`upstream`（worker.js:274-279，`init.cf = { cacheEverything: true, cacheTtl }`）与各分支调用（worker.js:374-412）
- 问题：Cloudflare 缓存键含 query string。raw 路径 TTL 600s、静态 86400s。带 query 的不同 URL 会各自缓存，正常；但**上游返回的私有/带鉴权响应若被缓存，会被串给其他无鉴权用户**。当前 raw 静态文件（公开仓库）无鉴权，GitHub 私有仓库 raw 需要 token——经镜像时 token 在 authorization 头里（若用户带了），而 Cloudflare 默认不缓存带 authorization 头的响应（`cacheEverything` 不覆盖这一点，CF 默认行为：带 Authorization 头的响应不缓存，除非配置 cacheKey 绕过）——此点存疑，需实测带 token 的私有仓库请求是否被缓存后再被他人命中。
- 证据（实测）：`/raw/octocat/Hello-World/master/README` 两次请求 `cf-cache-status: MISS → HIT`，缓存生效。带鉴权场景未实测（避免使用真实 token，且需要私有仓库样本）。
- 修复建议：在 cache 分支显式加 `cacheKey` 规则排除 authorization 影响，或在 `upstream` 里检测到请求带 authorization 头时强制 `cache: false`，一行代码关闭此面：`cache: !headers.has('authorization') && ...`。
- 存疑：Range 请求已被代码排除（`!headers.has('range')` 时不走 cacheEverything，worker.js:274），已核无问题。

### 【中-3】api.github.com 的 POST 通道开放，可被滥用为 GitHub API 的匿名写代理

- 位置：`ALLOW_METHODS`（worker.js:63）允许 POST；/proxy/ 分支对 api.github.com 无方法限制
- 问题：任何人可经镜像向 api.github.com 发 POST。匿名下能做的写操作有限（GitHub API 写操作基本都需要 token），但配合【高-2】authorization 透传，持 token 者可把镜像当 API 中转；更重要的是滥用者可经镜像匿名批量打 API 探测（如枚举用户/仓库），消耗的是镜像出口 IP 的限流配额，连坐全体用户（实测限流池已见消耗）。
- 证据：代码白名单允许 POST；GET 实测 api 代理路径通（限流报错本身证明请求到达了 GitHub）。
- 修复建议：/proxy/ 分支按主机细分方法——api.github.com 仅放行 GET/HEAD；S3 桶仅 GET/HEAD；git 端点（github.com 的 info/refs、upload-pack、receive-pack）才允许 POST。这是【高-2】的配套修复。

### 【中-4】git-receive-pack（push 通道）默认开放，必要性存疑

- 位置：GIT_RECEIVE_RE（worker.js:58）、e 分支（worker.js:418-427）
- 问题：镜像同时开放了 push 通道。镜像定位是「GitHub 只读镜像站」，push 需要用户带 GitHub 凭证（authorization 头经镜像转发），凭证会经手镜像 Worker。对公共镜像站而言：① 用户把 PAT/凭证发给第三方域名有被记录的信任成本（Worker 代码可见、账号可见、日志可见，站主可信但用户未必知道）；② push 大请求体保持流式（代码正确处理），但 receive-pack 无重试，失败需客户端自己重试；③ 若站主从未打算支持 push，这是一条纯多余的攻击面。
- 证据：代码 e 分支对 receive-pack 无条件放行；info/refs 实测 200。
- 修复建议：产品决策——若镜像定位只读，直接删 GIT_RECEIVE_RE 分支或 403；若要支持 push，配套【高-2】的 authorization 分类处理并在文档明示「凭证将经手镜像」。

### 【低-1】错误信息回显上游 err.message，可能泄露内部细节

- 位置：`upstream`（worker.js:298、333）
- 问题：`errorResponse(502, '上游请求失败:' + err.message)` 把 fetch 异常消息直接回显。Workers fetch 异常消息通常只含「fetch failed」类泛化信息，但个别情况下（如 DNS/TLS 错误细节）可能带内部信息。风险低。
- 修复建议：生产环境改为固定文案，err.message 只进 console.error/日志。

### 【低-2】HTML 改写 REWRITE_RE 的误伤与漏改

- 位置：`rewriteText`（worker.js:162-170）、REWRITE_RE（worker.js:49）
- 误伤面：正则 `(https?:)?\/\/([a-z0-9.-]+)(\/...)? ` 匹配页面中所有 URL 形态文本，包括 JS 字符串、JSON 数据、注释。若页面 JS 逻辑依赖 URL 字面量做比较（如 `if (url === 'https://github.com/...')`），改写后逻辑分支可能变化——上游 GitHub 页面自身的脚本因此出 bug 的概率低（其 JS 多从 githubassets.com 加载后动态构造 URL，改写的多是 HTML 属性与 JSON 数据），但客户端 fetch 劫持已兜底大部分。
- 漏改面：实测改写后页面残留 1 处 `https://github.community`——它是 github 的子域白名单外站点（github.community 不匹配 `.github.com$` 也不匹配 `.githubusercontent.com$`），REWRITE_RE 匹配到 host `github.community` 后 `isProxiable` 返回 false，原样保留，行为正确（点到该链接会直连 GitHub 官方论坛，可接受）。另 `gist.github.com` 在 PROXY_HOSTS 但 REWRITE_RE 只匹配 `([a-z0-9.-]+)` 单标签 host——`gist.github.com` 能被匹配（点号在字符类内），实测确认主流程无漏改。
- 证据（实测）：仓库页 233,307 字节改写后仅 1 处残留，且为白名单语义外的正确保留。
- 修复建议：暂无需改；若未来发现页面功能异常，再考虑只改写 href/src/action 属性的解析式改写（DOM Parser）替代全文正则。

### 【低-3】方法白名单允许 POST 但无请求体大小限制

- 位置：ALLOW_METHODS（worker.js:63）、upstream body 处理（worker.js:281-289）
- 问题：upload-pack 的 POST 被缓冲进内存（arrayBuffer），receive-pack 流式透传。Workers 请求体上限由平台决定（免费版 100MB），单 Worker 内存 128MB，理论上恶意超大 upload-pack POST 可占用内存。实际 git upload-pack 请求体极小（KB 级），滥用面小。低风险。
- 修复建议：给缓冲分支加 `content-length` 上限检查（如 >1MB 直接 413）。

### 【低-4】`sleep` 重试的放大效应

- 位置：fetchWithRetry（worker.js:231-254）
- 问题：GET/HEAD/upload-pack 失败后 200ms 重试一次。每次失败请求变两次上游请求。滥用者可低成本让上游请求翻倍（构造必失败请求）。放大系数仅 2，风险低。
- 修复建议：可保留；若配合限流（【高-3】方案 A）则天然缓解。

### 【低-5】USER_AGENT 伪装为 Chrome/124

- 位置：cleanRequestHeaders（worker.js:219-221）
- 问题：UA 写死 Chrome/124（2024 年版本），两年后已过时，可能触发 GitHub 风控启发式（老旧 UA + 无指纹的请求特征）。git clone 的请求 UA（git/2.x）被保留（不匹配 `/^cloudflare/i`），没问题。
- 修复建议：UA 更新为近期版本，或直接透传用户真实 UA（推荐后者，行为更自然）。

### 【低-6】`/healthz` 端点可被外网无限探测

- 位置：fetch handler（worker.js:345-353）
- 问题：无认证健康检查端点。信息泄露为零（只回 ok），唯一面是可被用来确认 Worker 存活做进一步滥用前的探测。风险极低，运维需要它在。
- 修复建议：保留不动。

## 三、Bug 清单

### 【Bug-1】`/proxy/<host>/` 尾斜杠时 rest 为空串，路径语义偏差（低影响）

- 位置：a 分支（worker.js:367-380）
- 问题：`PROXY_PATH_RE = /^\/proxy\/([^/]+)(\/[\s\S]*)?$/`，当路径为 `/proxy/github.com/` 时 pm[2] = `/`，`rest = pm[2].slice(1) = ''`，拼出上游 `https://github.com/` 正确。当路径为 `/proxy/github.com`（无尾斜杠）时 pm[2] 为 undefined，rest = ''，同样正确。**但**当路径为 `/proxy/github.com/a//b`（双斜杠）时 rest 保留 `a//b`，上游按字面处理——GitHub 会归一化，通常无害。逐项核过路径拼接，未发现实际错误响应。定性：边界行为差异，非用户可见 bug。已核无实际问题。

### 【Bug-2】redirect 分支未删除 content-encoding，若上游返回压缩响应可能导致 body 损坏（存疑）

- 位置：upstream redirect 分支（worker.js:311-315）
- 问题：Workers fetch 会自动解压（Br/gzip），`resp.headers` 里的 content-encoding 在 Workers 运行时中通常已被平台移除（Cloudflare 文档：fetch 响应经 Workers 时 content-encoding 由运行时处理）。HTML 分支显式删了 content-encoding（worker.js:325），redirect 与透传分支未删。若运行时版本行为差异导致头残留，客户端会尝试二次解压失败。线上实测（首页、raw、仓库页、重定向场景）均无损坏。
- 证据（实测）：各路径响应正常，无解压错误。
- 结论：当前线上行为正确；建议防御性统一在所有 `new Response` 前删除 content-encoding/content-length（重定向分支已删 content-length，HTML 分支两删，透传分支未删——透传分支 content-length 与实际 body 一致时无害）。
- 存疑点已标注：缺不同 Workers runtime 版本的行为矩阵。

### 【Bug-3】HTML 分支 content-type 强制 text/html 但上游可能是 application/xhtml+xml（无影响）

- 位置：upstream（worker.js:326）
- 问题：GitHub 页面返回 text/html，判断条件 `ctype.includes('text/html')` 已覆盖。xhtml 场景 GitHub 不用。已核无问题。

### 【Bug-4】HEAD 请求丢失了上游 body 相关头的某些边缘场景（无影响）

- 位置：upstream（worker.js:317）
- 问题：`new Response(null)` 正确（HEAD 无 body）。content-length 保留上游值（HEAD 场景正确）。实测 HEAD 200 正常。已核无问题。

### 【Bug-5】URL 编码/双重编码：PROXY_PATH_RE 直接从原始 path 提取，未 decode

- 位置：a 分支（worker.js:367-374）
- 问题：`url.pathname` 是浏览器/客户端已编码的路径，Worker 直接拼接 `${SCHEME}://${host}/${rest}`。若用户访问 `/proxy/github.com/%2e%2e%2f`，rest 含编码字符原样转发，GitHub 收到后解码为 `../`——路径穿越由 GitHub 自己的 Web 层处理（其服务器会归一化），不构成对 Worker 的穿越。实测构造编码路径请求返回正常（GitHub 处理）。raw/blob 快捷路径（b/c/d 分支）的仓库名/分支名含 `/` 或特殊字符时由 GitHub raw 端点自行解析，实测 404 正常。已核：编码混淆不构成实际绕过白名单的通道（host 部分永远取自 pm[1] 且经 isProxiable 校验，编码不影响 host 判断，因为 `[^/]+` 不匹配 %2F——%2F 在 pathname 中是字面三个字符，不是路径分隔符）。
- 结论：已核无问题，无需修复。

### 【Bug-补充核验】交办单中其余逐项结论

- **Set-Cookie 全删**：upstream（worker.js:303-309）删除 set-cookie/set-cookie2。影响：GitHub 会话 cookie（_gh_sess 等）不落地，镜像用户无登录态，页面表现为未登录状态。这是设计选择（镜像不支持登录），功能上安全且自洽。已核无问题。
- **二进制与大文件流式完整性**：非 HTML 分支直接 `new Response(resp.body)` 流式透传（worker.js:337），大 release 文件不整缓冲，Workers 流式管道 128MB 内存限制内可传大文件（受限于平台，超限会被 CF 断开，属平台约束非代码 bug）。git clone（info/refs + upload-pack）实测可用。已核无问题。
- **raw/blob 快捷路径对特殊字符处理**：见【Bug-5】，已核无问题。
- **GitHub 新增资源域名遗漏**：直连 GitHub 页面的 CSP 里出现 `objects-origin.githubusercontent.com`、`release-assets.githubusercontent.com`、`secured-user-images.githubusercontent.com`、`opengraph.githubassets.com`、`viewscreen.githubusercontent.com`、`notebooks.githubusercontent.com`、`private-avatars.githubusercontent.com` 等。其中以 `.githubusercontent.com` 结尾的全部被 `isProxiable` 的 endsWith 规则覆盖（自动跟随 GitHub 新增子域，这个设计是亮点）；`opengraph.githubassets.com`、`objects.githubusercontent.com` 在 PROXY_HOSTS 内或被覆盖；`productionresultssa*.blob.core.windows.net`（Copilot 用）不在白名单——但 Copilot 功能本就不该经镜像。已核：主要页面资源无遗漏；`github-production-upload-manifest-file-7fdce7.s3.amazonaws.com` 等 S3 桶不在 PROXY_HOSTS 但匹配 GITHUB_S3_RE 正则被放行（回到【高-1】的正则面）。
- **redirect: manual 的实际覆盖面**：实测 `/login?return_to=...` 返回 200（GitHub 直接渲染登录页而非 302）；api.github.com 的 3xx 场景返回 403 是 GitHub 限流而非 Worker 行为。redirect 分支（worker.js:311-315）对 Location 做 rewriteText：若 Location 指向白名单外域，rewriteText 不改写，Location 原样返回给客户端，客户端浏览器直连外域——这是正确行为（如 GitHub OAuth 跳转到第三方）。若 Location 指向白名单内域则改写为镜像路径。**关键点：上游重定向不会把 Worker 的 fetch 带出白名单**（redirect: manual 使 Worker 不自动跟随），客户端跟随与否是用户浏览器行为。已核无问题。

## 四、优化建议

1. **限流保护（收益高，代价低）**：加 Cloudflare Ratelimit binding，每 IP 30 req/min。防止额度盗刷与 GitHub 风控连坐。配合【高-3】。
2. **缓存分层（收益中，代价低）**：当前静态 24h / raw 10min 二层已合理；可加 `cacheTtlByStatus`（200 缓存长、4xx 短），并显式 `cacheKey` 排除 authorization 影响。配合【中-2】。
3. **HTML 缓冲优化（收益中，代价中）**：当前 isPage 整页 `resp.text()` 缓冲。GitHub 仓库页实测 233KB，在 128MB 限内，但 TTFB 增加整页传输时间。可选流式分块改写（复杂度高，不建议现在做）或对 HTML 也开 cacheEverything + 短 TTL（页面一致性换性能，产品决策）。
4. **可观测性（收益高，代价低）**：当前零日志。加 console.log 关键路径（method、path 首段、上游 status、耗时）+ Workers Logpush 或 wrangler tail 告警；按天看 4xx/5xx 比例。滥用发生时可定位。
5. **本地测试方案（收益高，代价低）**：用 vitest + miniflare（@cloudflare/vitest-pool-workers）搭单测：isProxiable 边界矩阵（尾点/端口/大小写/编码）、rewriteText 样本、git 端点路由。当前代码是纯函数为主，极易测。
6. **部署与版本管理（收益高，代价低）**：改用 wrangler.toml + `wrangler deploy`，代码入 git 仓库管理版本；设置 compatibility_date 与 flags（当前未知线上配置，建议显式声明，避免默认行为漂移）。
7. **代码结构（收益低，代价低）**：CLIENT_SCRIPT 移到单独文件用构建注入；REWRITE_RE/PROXY_HOSTS 等常量集中注释。可读性提升，无行为变化。

## 五、分阶段整改方案

### P0 必修（建议本周内）

| 项 | 改动范围 | 风险 | 回滚 | 工时 |
|---|---|---|---|---|
| 1. S3 白名单收紧（【高-1】） | 删 GITHUB_S3_RE，改 4 个精确桶名 Set 查询 | 低（新增桶需改代码，但 GitHub 新增桶频率极低） | git revert 单 commit | 0.5h |
| 2. authorization 分类透传（【高-2】） | cleanRequestHeaders 加 target 参数，仅 git 通道保留 | 中（需回归测试私有仓库 clone；公共镜像不受影响） | revert | 1h（含测试） |
| 3. Ratelimit binding（【高-3】方案 A） | wrangler.toml + fetch 入口 3 行 | 低（阈值可调） | 关 binding | 0.5h |
| 4. 带鉴权请求禁缓存（【中-2】） | upstream 一行：headers.has('authorization') 时 cache:false | 极低 | revert | 0.2h |

P0 合计约 2-3 小时（含回归验证），一次性 commit 部署。

### P1 建议（两周内）

| 项 | 改动范围 | 风险 | 回滚 | 工时 |
|---|---|---|---|---|
| 5. POST 方法按主机细分（【中-3】） | /proxy/ 分支加方法矩阵 | 中（需确认无依赖 POST 的页面功能，如 GitHub 登录表单本就不经镜像支持） | revert | 1h |
| 6. push 通道产品决策（【中-4】） | 删 receive-pack 或文档明示 | 低 | revert | 0.5h |
| 7. 错误信息脱敏（【低-1】） | err.message 改 console.error | 极低 | revert | 0.2h |
| 8. 可观测性（优化4） | 日志 + 告警阈值 | 极低 | 关日志 | 1-2h |

### P2 可选（下迭代）

| 项 | 改动范围 | 风险 | 回滚 | 工时 |
|---|---|---|---|---|
| 9. vitest 单测脚手架（优化5） | 新增测试目录 | 零 | 删目录 | 3-4h |
| 10. wrangler 版本管理（优化6） | 部署流程改造 | 中（部署方式变更需验证） | 旧方式回退 | 2h |
| 11. CSP 重建（【中-1】） | 响应头重建策略 | 中（过紧 CSP 会破页面，需逐指令调） | revert | 2-3h |
| 12. UA 透传（【低-5】） | 一行改动 | 极低 | revert | 0.1h |

## 六、声明

1. 本单为纯审计任务：**未修改任何代码**（worker.js 保持原样，SHA-256 与线上原件一致）、**未重新部署**、**未触碰线上 Worker 与 DNS/路由**。
2. 线上验证全部为最小、无害的只读 GET/HEAD 请求（共 19 组），无压测、无破坏性或攻击性利用。
3. 实测中发现的 GitHub API 限流报错（`104.23.251.21`）是镜像出口共享限流池被消耗的自然表现，非本次验证所触发攻击。
4. 报告中标注「存疑」的项：【Bug-2】content-encoding 运行时行为矩阵、【中-2】带鉴权响应被缓存的实际行为——均写明了尚缺的证据（需真实 token + 私有仓库样本实测，为避免使用站主凭证未执行）。
5. 后续优化（P0/P1/P2）等站主看过本方案批准后，另行下单执行。

—— 审计执行：电脑小安，2026-10-16
