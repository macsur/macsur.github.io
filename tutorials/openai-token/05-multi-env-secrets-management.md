# OpenAI Token 专题通道｜05：多环境密钥管理（本机 / NAS / 服务器 / CI 一套通用思路）

> 目标：同一个 Token（或同一类密钥）在不同环境都能安全、可控地使用：
> - 不进仓库
> - 可轮换
> - 出事能快速止血

---

## 封面段落（先把场景说清楚）
你很快会遇到这种局面：
- 本机开发要用 `OPENAI_API_KEY`
- NAS 跑 Docker 也要用
- 云服务器上跑 OpenClaw / 脚本也要用
- GitHub Actions（CI）还要用

如果你每个地方都手动粘一份：
- 容易忘
- 容易泄露
- 更容易“某天换 token 后，半个系统集体瘫痪”

这一篇给你一套**统一管理**的做法。

---

## 金句（记住这 3 条就够用）
- **一个用途一个 token**（开发 / 部署 / CI 分开）
- **密钥只进“密钥系统”，不进“代码系统”**
- **轮换要可验证**（换完立刻能确认旧的已失效、新的已生效）

---

## 总体架构（推荐的最小复杂度）
把密钥分成 4 份（按用途切开）：
1) `dev`：本机开发
2) `nas`：NAS / 家里服务
3) `prod`：云服务器生产
4) `ci`：GitHub Actions / CI

每份 token：
- 权限最小化
- 过期时间合理（30~90 天）
- 泄露就只影响一个用途

---

## 01｜本机（macOS/Windows/Linux）怎么放最安全
### 推荐：系统 Keychain / 密码管理器
- macOS：Keychain（钥匙串）
- Win：Credential Manager
- Linux：Secret Service

开发时读取方式：
- 用 `.env` 只是“方便”，Keychain/密码管理器才是“稳”

### 如果你必须用 `.env`
规则：
- `.env` 永远在 `.gitignore`
- 仓库里只放 `.env.example`（无真实密钥）

---

## 02｜NAS / Docker 环境怎么放（最容易翻车的地方）
NAS 上跑服务，最常见是 Docker / docker-compose。

### 推荐做法：用环境变量注入（不要写死在镜像里）
- `docker run -e OPENAI_API_KEY=...`
- 或 `docker-compose.yml` 引用外部 `.env`

### NAS 上的安全建议
- `.env` 文件权限收紧（只给运行用户可读）
- 定期备份配置，但**不要把 `.env` 同步到公开网盘**
- 如果 NAS 有“密钥管理/配置中心”（不同系统不同），优先用它

---

## 03｜服务器（VPS/云主机）怎么放（建议 systemd / 进程级管理）
服务器上最怕：
- 你把 token 写进脚本
- 脚本到处复制

### 推荐：用 systemd environment（或等价机制）
思路：
- 让 token 跟着服务走
- 不跟着代码走

检查清单：
- 服务重启后 token 仍在
- 非管理员用户看不到 token

---

## 04｜CI（GitHub Actions）怎么放
### 唯一正确姿势：GitHub Secrets
- Repo → Settings → Secrets and variables → Actions
- 新增：`OPENAI_API_KEY`

在 workflow 里使用：
- 用 `${{ secrets.OPENAI_API_KEY }}` 注入到 env

### CI 的额外建议
- CI token 只给 CI 用（权限更小、可单独撤销）
- 避免在日志里 echo 出环境变量

---

## 05｜轮换（Rotation）怎么做才不痛
给你一个“不会瘫”的轮换套路：

### 5.1 先加新，再切换，再撤旧
1) 生成新 token
2) 更新 `dev/nas/prod/ci` 的配置（逐个环境）
3) 验证每个环境都正常
4) 最后撤销旧 token

### 5.2 做一个“轮换清单”（强烈建议写下来）
你至少要记录：
- 哪个环境用了哪个 token（名字/用途）
- token 到期日
- 更新入口在哪里（NAS 的 compose 文件？服务器的服务配置？CI secrets？）

---

## 06｜应急：怀疑泄露时的“一键止血”
1) 立刻 revoke 对应用途 token（先从最危险的：CI/公开环境开始）
2) 检查账单/日志
3) 只替换“受影响那一份”，别全换（除非你不知道泄露范围）

---

## 小结
多环境密钥管理，说白了就是：
- **切分用途**（别一把钥匙开所有门）
- **统一入口**（密钥只放密钥系统）
- **可轮换、可验证**（流程比“安全口号”更重要）

---

## 下一篇（06）建议
如果你愿意继续深入：
- 06：GitHub Actions 使用 OpenAI 的最佳实践（防日志泄露、并发限额、失败重试）
