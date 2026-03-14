# OpenAI Token 专题通道｜04：误提交密钥到 GitHub 了怎么办？（撤销 + 历史清理 + 复发防护）

> 这篇是“救火流程”。你不需要懂所有 Git 细节，只要照做。

---

## 先讲最重要的：删文件 ≠ 没泄露
你把 `token.txt` 从仓库删掉、再提交一次——**不等于安全**。

原因：
- Git 的历史记录里依然保留那次提交
- 任何人（包括缓存/镜像/爬虫）都有可能已经抓到

正确姿势：
1) **立刻撤销旧密钥**
2) **判断泄露范围**
3) **必要时清理 Git 历史**（rewrite history）
4) **加防护，避免二次事故**

---

## Step 0｜立刻止血（1 分钟）
无论你泄露的是 OpenAI / GitHub / Cloudflare / AWS，第一步都一样：

### ✅ 0.1 立刻 Revoke
- 去密钥来源平台撤销（Revoke/Delete）旧 token
- 生成新 token（但先别到处更新，等确认清理方案）

### ✅ 0.2 检查异常使用
- 看调用日志 / 账单 / 使用量
- 有异常就进一步改密码、开二次验证、加风控

> 金句：**先撤销，再修仓库。** 不然你一边清理，别人一边刷你。

---

## Step 1｜确认“到底有没有泄露进 Git 历史”
在本地仓库目录里，你可以用这些方式快速搜：

### 方法 A：全历史搜索（推荐）
```bash
git log --all -p | grep -n "sk-" 
```
你也可以替换成你自己的关键字：
- `sk-`（常见 API key 前缀示例）
- `github_pat_`
- `OPENAI_API_KEY`
- `token=`

### 方法 B：列出可能的文件
```bash
git log --name-only --pretty=format: | sort -u
```
看有没有：`.env`、`token.txt`、`account.txt`、`secrets.json` 这类可疑文件。

> 注意：不同平台 token 前缀不一样，不要只搜 `sk-`。

---

## Step 2｜选择清理方案（按严重程度）
### 情况 1：只是在本地改过，从没 push
恭喜，直接删掉文件/撤销 token，然后正常提交即可。

### 情况 2：已经 push 到 GitHub（最常见）
你需要做 **历史清理**。常用两条路线：

- **方案 A：git filter-repo**（推荐，干净、快）
- 方案 B：BFG Repo-Cleaner（也常用）

这篇我以 **git filter-repo** 为主（更现代）。

---

## Step 3｜用 git filter-repo 清理历史（推荐流程）
> 这是“破坏性操作”：会重写历史。建议先备份、并通知协作者。

### 3.1 备份（必须）
```bash
cd /path/to/your/repo

git branch backup-before-secret-cleanup
```

### 3.2 安装 git-filter-repo
- macOS（Homebrew）：
```bash
brew install git-filter-repo
```

### 3.3 删除敏感文件（按文件名清理）
例如你泄露的是 `token.txt`：
```bash
git filter-repo --path token.txt --invert-paths
```

如果是 `.env`：
```bash
git filter-repo --path .env --invert-paths
```

> 如果文件在子目录里，要写完整路径。

### 3.4 按内容模式清理（按字符串/正则）
如果你不知道文件名，但知道 token 形态，可以用 replace-text：
1) 新建一个规则文件 `replacements.txt`：
```text
regex:github_pat_[A-Za-z0-9_]+==>REDACTED
regex:sk-[A-Za-z0-9]{20,}==>REDACTED
```
2) 执行：
```bash
git filter-repo --replace-text replacements.txt
```

> 注意：不同 token 格式差异很大，正则要谨慎。宁可保守一点，多跑几轮验证。

---

## Step 4｜强制推送覆盖远端（rewrite history 必须 force）
清理完历史后，你需要强制推送：
```bash
git push --force --all
# 如果有 tag 也要：
git push --force --tags
```

然后去 GitHub：
- 检查文件/内容是否还存在于历史
- 确认仓库默认分支正常

> 提醒：第三方缓存/已 fork 的仓库你控制不了，所以 **撤销 token 仍然是最重要的**。

---

## Step 5｜让这事以后别再发生（复发防护）
### 5.1 `.gitignore`（最小防线）
建议加：
- `.env`
- `.env.*`
- `*token*`
- `account.txt`
- `secrets*.json`

### 5.2 提交前自动扫描（本地钩子）
可以用：
- gitleaks
- trufflehog

把它接到 pre-commit 或 CI，提交前就拦住。

### 5.3 GitHub Push Protection / Secret scanning
能开就开（不同账号/仓库权限不同）。

---

## 一句话模板（你可以发给团队/自己留档）
> 我不小心把密钥 push 到 GitHub 了：我已立刻 revoke 并换新；随后用 filter-repo 清理历史并 force push；最后补上 gitignore + secret scan，防止复发。

---

## 下一篇（05）建议
如果你想更“体系化”，下一篇可以写：
- 「多环境密钥管理」：本机 / NAS / 服务器 / CI 各自怎么放最安全
