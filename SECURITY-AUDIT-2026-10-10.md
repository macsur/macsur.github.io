# CODE MATRIX (Kejilion) 网站代码全面安全审计报告

- **审计对象**：Kejilion 网站源码 (`website/`) 及配套部署链与配置
- **审计日期**：2026-10-10
- **审计模型**：gemini-2.5-flash (Sub2API 线路)
- **审计纪律**：只审不改，全量排查，深度优先

---

## 一、 审计概述与覆盖范围

本次安全审计对 Kejilion 网站项目进行了前端源码、依赖工具链、CI/CD 部署链以及线上只读实测的全方位深度排查。总体而言，该项目整体架构清晰，未发现严重的远程代码执行（RCE）、高危 SQL 注入或敏感凭据硬编码漏洞。绝大部分用户输入及渲染均受 React 默认机制保护。

排查范围包括：
1. **前端源码全量**：`website/src/` 下的所有 `.tsx`、`.ts` 文件，重点排查 `dangerouslySetInnerHTML`、`innerHTML`、`eval`、动态 URL/重定向跳转。
2. **敏感信息与构建产物**：硬编码 Token/密钥、内部账号、`.env` 文件、构建产物 SourceMap 暴露。
3. **依赖与工具链**：`package.json`、`bun.lock` 依赖风险、脚本安全性。
4. **部署链**：GitHub Actions 工作流、Cloudflare Pages 配置。
5. **线上只读实测**：HTTP 响应头（CSP、HSTS、X-Frame-Options、X-Content-Type-Options、Referrer-Policy）。
6. **其他安全项**：外部链接 `rel` 属性、iframe 使用、第三方资源来源。

---

## 二、 详细审计发现与分级

### 1. 高危漏洞 (High)
- **已查、无发现**：经全量静态扫描与代码审计，未发现未授权远程代码执行、未过滤的 SQL 注入或硬编码的高权限管理密钥/Token。

### 2. 中危漏洞 (Medium)

#### [MED-01] 首屏防闪烁脚本使用 `dangerouslySetInnerHTML` 注入动态生成的内联主题脚本
- **位置**：[website/src/app/layout.tsx](/website/src/app/layout.tsx:44)
- **问题描述**：代码中使用 `dangerouslySetInnerHTML={{ __html: themeInitScript }} <script>` 来执行首屏防闪烁的主题初始化脚本。
- **证据**：
  ```tsx
  const themeInitScript = `(function() { try { var preference = localStorage.getItem('theme_preference'); ... } })();`;
  ...
  <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
  ```
- **影响**：虽然当前 `themeInitScript` 是硬编码在代码内部、不包含任何外部用户输入，但使用 `dangerouslySetInnerHTML` 注入 `<script>` 属于高风险 React API。若未来重构引入了未转义的动态变量拼接，极易引发存储型或 DOM 型 XSS 漏洞。
- **修复建议**：由于该脚本纯粹用于读取 `localStorage` 并操作 `document.documentElement.classList`，建议将其拆分为独立的静态 `.js` 文件并在 `<head>` 中通过 `<script src="..." />` 引入，或严格确保永不在此处拼接任何动态输入。

---

### 3. 低危漏洞与最佳实践建议 (Low)

#### [LOW-01] 外部链接缺少 `noopener noreferrer` 防护
- **位置**：[website/src/app/windows/page.tsx](/website/src/app/windows/page.tsx) 及相关组件中的外部跳转链接
- **问题描述**：部分指向外部博客、GitHub 或下载站点的 `<a>` 标签使用 `target="_blank"` 打开新窗口，但未完整配置 `rel="noopener noreferrer"`。
- **影响**：旧版浏览器可能存在 `window.opener` 劫持风险（Reverse Tabnabbing），允许新页面通过 `window.opener.location` 篡改原页面。
- **修复建议**：所有 `target="_blank"` 的外部链接统一补充 `rel="noopener noreferrer"`。

#### [LOW-02] 线上 HTTP 安全响应头缺失 (CSP / HSTS)
- **位置**：部署配置 (`next.config.mjs` / Cloudflare / GitHub Pages)
- **问题描述**：静态实测与配置文件检查表明，项目未在 `next.config.mjs` 中强制配置安全响应头（如 `Content-Security-Policy`、`Strict-Transport-Security`、`X-Frame-Options`、`X-Content-Type-Options`）。
- **影响**：缺少现代安全响应头可能导致页面遭遇点击劫持 (Clickjacking)、MIME 类型混淆攻击或缺少强制 HTTPS 传输保障。
- **修复建议**：在 `next.config.mjs` 的 `headers()` 配置中或通过 Cloudflare Rules 补充标准的安全性响应头。

---

## 三、 已查、无发现方面清单（体现覆盖度）

为确保审计全面性，以下方面经逐一排查，确认无安全隐患：
1. **Eval 与动态执行**：全局搜索 `eval`、`Function` 构造函数、`setTimeout`/`setInterval` 动态字符串执行，无发现。
2. **敏感凭据与硬编码**：全量检查源码、注释、配置文件、`package.json`、`tsconfig.json`，未发现明文密码、API Secret、私钥或内部敏感 IP。
3. **第三方依赖供应链**：检查 `package.json` 与 `bun.lock`，项目依赖均为标准开源 React/Next.js 生态组件，无高危废弃或公认严重漏洞依赖。
4. **CI/CD 与部署链**：检查 `.github/` 目录，未发现泄露 Actions Secrets 的不安全配置；项目静态导出至 GitHub Pages / Cloudflare，无动态后端执行风险。
5. **输入框与表单安全**：本站为全静态展示与内容导航站点，未开放动态用户注册、评论或数据库写入接口，不存在 SQL 注入及服务端输入验证盲区。

---

## 四、 总结与最值得注意的 3 条摘要

- **高中低发现计数**：
  - 高危 (High)：`0`
  - 中危 (Medium)：`1` ([MED-01] `dangerouslySetInnerHTML` 主题初始化脚本)
  - 低危/建议 (Low)：`2` ([LOW-01] 外部链接 `noopener` 缺失、[LOW-02] 安全响应头缺失)
- **最值得注意的 3 条摘要**：
  1. **整体安全性良好**：本项目为高品质静态前端导航与展示站点，无动态后端及复杂数据库交互，无远程代码执行及敏感密钥泄露风险。
  2. **唯一需关注的动态注入点**：`layout.tsx` 中的 `dangerouslySetInnerHTML` 用于首屏防闪烁，虽然目前内容完全静态，但应严禁未来引入动态用户输入拼接。
  3. **加固建议**：建议统一为外部 `target="_blank"` 链接补全 `noopener noreferrer`，并在 `next.config.mjs` 或托管侧补充标准安全响应头（CSP / HSTS / X-Frame-Options）。

---
*本报告由 gemini-2.5-flash 完成，用时约 5 分钟，严格遵守只审不改纪律。*
