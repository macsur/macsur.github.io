// 🌐 Paperclip 教程英文版（定稿，2026-10-21）
// 来源：paperclip-tutorial-EN-final-2026-10-21.md（站主放行的英文定稿，直接用作正文，不自行重译）
// 术语锁：Zhanzhu 0 命中；「站主」统一译为 the site owner；品牌名 / 仓库地址 / 版本号 /
// 语言代码 / 配置项 / 代码块 / 命令 / URL 逐字保留，不翻译、不改大小写。
// 页眉、视频脚手架、文末相关视频区均不进英文版（定稿已剔除）。

export const PAPERCLIP_EN_SLUG = 'paperclip-en';

export const PAPERCLIP_EN_TITLE =
  'Starting an AI Company by Yourself: A Paperclip Tutorial';

export const PAPERCLIP_EN_SUMMARY =
  'A hands-on guide to an open-source (MIT) AI employee management console: managing multiple agents as a team, assigning tasks, tracking progress, and controlling budgets. A complete record from local deployment on Mac and configuring employees on dual platforms (Sub2API + Agent2API) to plugin localization and daily management best practices.';

export const PAPERCLIP_EN_DATE = '2026-10-21';

export const PAPERCLIP_EN_CONTENT = `# Starting an AI Company by Yourself: A Paperclip Tutorial

A hands-on guide to an open-source (MIT) AI employee management console: managing multiple agents as a team, assigning tasks, tracking progress, and controlling budgets. A complete record from local deployment on Mac and configuring employees on dual platforms (Sub2API + Agent2API) to plugin localization and daily management best practices.

The Site Owner's Guide: Can a single person serve as the chairman of a tech company? As the capabilities of AI agents evolve, this is no longer science fiction. This article is based on the site owner's personal experience of building, verifying, and operating such a system daily on a Mac. It avoids abstract concepts and focuses entirely on practical, hands-on insights.

## 1. What is Paperclip

Paperclip is a fully open-source (MIT License) localized AI employee management console (official open-source repository: github.com/paperclipai/paperclip).

Previously, when we used Codex, Claude, or various Coding Agents, it was mostly one-on-one conversations or having a single agent handle linear tasks. Paperclip's core positioning, however, is to manage different agents as if they were a real team.

- Team Structure: You can create real roles for your company, such as CEO, CTO, Frontend, Backend, QA, and Editor-in-Chief, and set up clear reporting lines (Org Chart);

- Order Dispatching and Relay: All work is converted into task tickets (Tasks / Issues), supporting automatic relay operations across platforms for employees;

- Heartbeat and Cost Control: Set a Heartbeat and a monthly Budget Cap for each employee, and monitor resource consumption on the dashboard at any time.

## 2. Key Point: First, switch the interface to Chinese.

【Key Empirical Finding】: After installing this locally deployed version of Paperclip (version 2026.1005.0), the interface is entirely in English right out of the box. Although investigation revealed that the Simplified Chinese (zh-CN) language pack is already embedded within the underlying UI static resources, the initialization code locks the language to English and does not provide any frontend option to switch it. No language switcher can be found anywhere in the settings.

### Plugin Solution and Site Owner's Personal Test

In issue #1544 of the official repository, a community developer posted an elegant solution based on the plugin system: install the community language pack plugin paperclip-lang (by hinet). It injects a language selection dropdown via the top toolbar slot of the official plugin system and implements Chinese localization by dynamically replacing text with DOM nodes, requiring no modification to the host's source code or alteration of the underlying packaging files.

The site owner has personally completed the installation and hands-on testing:

- Installation path: Go to Instance Settings → Plugins → Install Plugin in the Paperclip sidebar;

- Enter the package name: In the pop-up installation window, enter the npm package name paperclip-lang, and click to confirm the installation;

- Switching and Applying: After installation, the status will display as Ready (version v1.0.2). At this point, a language selection dropdown will appear in the top-right corner of the global toolbar at the top of the page. Click to expand it and select "中文(简体)";

- Effects and Persistence: The page will automatically refresh, after which the sidebar menu (Dashboard, Inbox, Agent, Routines, Cost, etc.) will be fully localized into Chinese. This preference is saved locally in the browser (localStorage) and will automatically persist through subsequent restarts or page refreshes.

- Security and Rollback: The permissions requested by the plugin are limited to UI actions and settings registration, and do not involve any underlying sensitive system permissions. Should the official new version natively integrate the language switching feature in the future, you can simply click "Uninstall" on the plugin management page to roll back at any time with a single click, without any impact whatsoever on the company's employee and task data.

## 3. How I Set Up This Mac

Paperclip supports minimal local installation and data isolation. The site owner's deployment environment and steps are as follows:

- Runtime environment: Mac Terminal, Node.js v24.21.0;

- Initialization command:

\`\`\`
  npx paperclipai onboard --yes
\`\`\`

(Note: You can successfully complete dependency resolution and guidance by using the official npm registry.)

- Local Services and Access:

After installation, the service is bound to the local loopback address by default: http://localhost:3100 (or http://127.0.0.1:3100).

- Network Isolation: Binds only to the local loopback interface, with no exposure to the local area network or the public internet;

- Database: Automatically spins up an embedded lightweight PostgreSQL (port 54329) in the background, eliminating the need for manual configuration of an external database.

- Privacy and Security: Anonymous telemetry has been disabled in the configuration (telemetry.enabled: false);

- Data Storage: All configurations, databases, and logs are persisted under the user directory ~/.paperclip/instances/default/.

- Start-Stop Maintenance:

- Run in the foreground for debugging: npx paperclipai run

- Background service management: npx paperclipai service start / service stop

## 4. How to Start a Company and Hire People (Hands-on Guide for Both Sub2API and Agent2API Platforms)

In Paperclip, the core principle for starting a company is: a company first defines a specific and clear objective. The first test company created by the site owner was named "CODE MATRIX Test Company," with the clear objective of only verifying file inventory and task flow within the sandbox directory.

### Dual-Platform Division of Labor Architecture

In real-world business scenarios, a single model often struggles to meet the needs of all roles. The site owner has enabled dual-platform division of labor access on this machine:

- CEO / Chief Content Editor route (using Sub2API):

- Position: Responsible for strategic breakdown, review and finalization, and project closure review. Suitable for roles requiring advanced reasoning and logical judgment.

- Model: The main model is gemini-3.8-flash-high, with gemini-2.5-flash used for auxiliary copywriting.

- Key Security: The token is injected solely through the environment variable SUB2API_API_KEY mapped by the Mac's native system. No plaintext fragments will ever appear in configuration files or the message board.

- Engineer route (using Agent2API):

- Position: Responsible for page implementation, code writing, script automation, and risk-free execution;

- Model: The primary choice is deepseek-v4-pro (domestic gateway, fast response, rigorous coding).

### Strict physical-level configuration isolation

To prevent disrupting the site owner's main configuration for daily coding, you must never directly modify the global ~/.codex/config.toml.

The standardized connection method adopted by the site owner is:

- Create a dedicated config.toml for each employee under ~/.paperclip-codex-envs/<岗位slug>/.

- Specify the corresponding exclusive path in the Paperclip employee's adapterConfig.env.CODEX_HOME;

- Set the adapter uniformly to codex_local and the execution engine to cli. This way, each employee uses their own independent sandbox and model, without polluting the host's global environment at all.

Each employee is configured with a clear persona, work directory, monthly budget cap (e.g., a soft upper limit of $10~$30 during the trial period), and heartbeat interval (e.g., 300 or 900 seconds, with wakeOnDemand enabled). Hiring new employees must be approved by the Board of Directors (site owner).

## 5. How to manage on a daily basis

After setting up the company and building a good team of employees, the site owner's daily management principles are as follows:

- View the Dashboard to get a full overview:

Open the dashboard to see at a glance who is currently working (Live running status), the task completion rate, and the total cents spent this month, preventing unexpected infinite loops from causing models to run out of control;

- Inbox: Focus on the big picture and let go of the trivial:

Major decisions, such as new employee onboarding and operations that cross permission boundaries, will be uniformly routed to an inbox to await manual approval from the board of directors;

- All tasks are listed in the task list (Tasks):

Do not assign tasks arbitrarily offline. All tasks must be created on the Kanban board, with clear task descriptions and acceptance criteria documented. All process discussions, initial drafts, and review comments made by employees during the handover process must be kept in the task's comment section.

- If a mistake is made, add a rule; don't act emotionally:

If an employee's output does not meet expectations (for example, the screenshot is a white screen, or the formatting of a certain piece of code is incorrect), do not manually clean up the mess for it. Instead, directly add a clear negative rule or verification step to its persona (Instructions / SOUL.md).

- Regular Inspection Routine:

For repetitive tasks that do not require manual monitoring, such as candidate pool collection and weekly security scans, establish Routines to be triggered according to a scheduled cycle.

## 6. Pitfalls and Things to Note for Avoidance

- For internal network use only. Never expose it directly:

Paperclip has the capability to directly manipulate local commands and the file system, and must be strictly bound to the local loopback address 127.0.0.1. It must never be exposed to the public network through an unauthenticated reverse proxy.

- Subscription and API billing are two different things:

The billing rules for official OAuth subscription logins are completely different from those for third-party transit gateway APIs; always refer to the actual API console and the Paperclip cost dashboard for accuracy.

- First, test-run with a small, risk-free order:

When a new employee joins, they first run a relay test in a harmless sandbox directory (e.g., reviewing sample inventory files or writing a simple report). Only after confirming everything runs smoothly will they be assigned to an official project.

- Adhere to the principle of least privilege:

Except for the CEO, all other positions must have canCreateAgents disabled (unauthorized team expansion and hiring are prohibited), and all major operations must have an approval gate.

Starting an AI company by oneself is not a gimmick, but rather a brand-new productivity paradigm characterized by high self-discipline, engineering rigor, and a strong emphasis on system isolation and governance processes.`;
