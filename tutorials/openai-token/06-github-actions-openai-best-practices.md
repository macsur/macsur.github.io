# OpenAI Token 专题通道｜06：GitHub Actions 调 OpenAI 最佳实践（Secrets / 防泄露 / 限流 / 重试 / 成本）

> 目标：让你在 CI 里调用 OpenAI **稳定、可控、不泄露、不破产**。

---

## 封面段落（为什么你需要这篇）
CI 里调用 OpenAI，最常见的翻车：
- token 写进 workflow 或日志里（直接泄露）
- 并发跑太多，429/超时
- PR 来自 fork，secrets 不可用，流程报错
- 成本不可控（每次 push 都触发大模型调用）

这篇给你一套可以直接抄的 workflow 思路。

---

## 0｜最重要原则（3 条）
1) **Token 永远放 GitHub Secrets**，不进仓库
2) **默认不对 fork PR 开放 secrets**（否则等于送钱）
3) **把 OpenAI 调用做成“可跳过/可限流/可重试”**

---

## 1｜把 Token 放到 GitHub Secrets（唯一正确姿势）
Repo → Settings → **Secrets and variables** → Actions → New repository secret

建议变量名：
- `OPENAI_API_KEY`

在 workflow 里使用：
```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

---

## 2｜日志防泄露（不要把自己害死）
### 2.1 永远不要 echo token
不要做：
- `echo $OPENAI_API_KEY`
- 在脚本里打印 headers

### 2.2 主动 mask（建议加一行）
GitHub Actions 支持 mask：
```bash
echo "::add-mask::${OPENAI_API_KEY}"
```

> 注意：mask 不是万能，如果你把 token 拼接/切片打印出来，仍可能泄露。

---

## 3｜fork PR 的安全处理（重点）
默认情况下：
- `pull_request` 事件对 fork PR **拿不到 secrets**（这是好事）

推荐策略：
- 对 `push` 到 main 才跑 OpenAI
- 或者对可信 contributor 用 `workflow_dispatch` 手动触发

---

## 4｜减少触发次数：只在需要时调用
### 4.1 只在文档变更时跑
```yaml
on:
  push:
    branches: [ main ]
    paths:
      - "tutorials/**"
      - "README.md"
```

### 4.2 用 label/注释触发（更省钱）
思路：
- 只有当 PR 打了某个 label（如 `ai-review`）才调用 OpenAI

---

## 5｜并发与限流（避免 429）
### 5.1 workflow 级并发控制
```yaml
concurrency:
  group: openai-${{ github.ref }}
  cancel-in-progress: true
```

### 5.2 任务内节流
- 每次调用之间 sleep
- 或者队列化处理（尤其批量文件）

---

## 6｜重试策略（网络/429/5xx 必备）
推荐用“指数退避”重试：
- 第一次失败等 2s
- 第二次 4s
- 第三次 8s

并且只对可重试错误重试：
- 429
- 500/502/503
- 网络超时

---

## 7｜成本控制（别让 CI 变吞金兽）
建议做法：
- 把模型、max_tokens、温度写成可配置变量
- 默认用更便宜的小模型做粗处理
- 只有在打标签/手动触发时才用更强模型

你甚至可以设置：
- 每天最多运行 N 次
- 超过直接 fail 或 skip

---

## 8｜一个可抄的最小 workflow 示例
> 示例：对变更的 markdown 做一次 AI 摘要生成（你后续按需替换脚本）。

```yaml
name: OpenAI CI

on:
  push:
    branches: [ main ]
    paths:
      - "tutorials/**.md"

jobs:
  openai:
    runs-on: ubuntu-latest
    concurrency:
      group: openai-${{ github.ref }}
      cancel-in-progress: true

    steps:
      - uses: actions/checkout@v4

      - name: Setup
        run: |
          echo "::add-mask::${OPENAI_API_KEY}"
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

      - name: Call OpenAI (example)
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          # 在这里调用你的脚本（curl/python/node 都行）
          # 重点：不要把 OPENAI_API_KEY 打印到日志
          echo "Run your OpenAI script here"
```

---

## 下一篇（07）预告
- 07：NAS/服务器落地模板（docker-compose / systemd）——把 05 的思路落地成可直接复制的配置。
