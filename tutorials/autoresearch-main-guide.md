# autoresearch 全面教程：让 AI 自己做 AI 研究（单卡、5 分钟一轮、睡一觉跑 100+ 次实验）

> 项目仓库：<https://github.com/macsur/autoresearch>
>
> 视频（观点来源）：<https://youtu.be/zjpkbQIwIYQ?si=hm_2ZTi1nu8YTfNb>

这篇教程的目标不是“介绍一下”，而是把 `autoresearch` 拆到你可以 **当晚跑起来**，并且能写出一套让 Agent **稳定迭代、可控、不乱飞** 的 `program.md`。

你会得到：

- 一套最短路径的本地跑通流程（含常见坑位和验证方法）
- 一套“元程序员（meta-programmer）”视角：怎么写 `program.md` 管住 Agent
- 一套可复现的实验循环：如何记录、如何保留 best、如何回滚
- 一套扩展阅读 + 最佳案例（fork、同类项目、可借鉴范式）

---

## 0. 先把核心讲透：这东西到底在干嘛？

`autoresearch` 想做的事非常明确：

1. 给 AI Agent 一个 **小但真实** 的 LLM 训练工程（单卡、PyTorch）
2. 让 Agent **只改一个文件**（`train.py`）
3. 每次改完就跑一次训练，但训练永远只有 **固定 5 分钟**
4. 跑完拿到统一指标 **`val_bpb`（越低越好）**
5. 好了就保留（commit 留下），差了就回滚（reset 回去）
6. 无限循环 —— 你睡觉，它“通宵做研究”

> 这套设计的精髓：**研究的速度比研究的深度更重要**。

### 0.1 视频观点：智能爆炸的“民主化”

你给的视频要点我把它落到 autoresearch 的实践语境里：

- **过去**：只有顶尖实验室（OpenAI / DeepMind）能做大规模试验（人力 + 算力 + 工程体系）。
- **现在**：只要你有一张 GPU，你也能跑一个“自主研究系统”。
- **范式转变**：人类从“亲手调参改代码的研究员”变成“写研究组织章程的元程序员”，也就是你主要写 `program.md`。
- **48 小时 ≈ 500 次实验**：不是一次实验多完美，而是 **迭代速度 + 自动试错** 带来的累积优势。
- **可能击败顶尖专家**（注意是“累积优势”）：
  - 24/7 不睡觉
  - 没有人类的路径依赖和认知偏见
  - 能更激进地尝试“看起来很疯”的点子

接下来整篇教程，就是把这些观点“落地成操作”。

---

## 1. 项目结构：为什么它能让 Agent 不跑偏？

这个仓库刻意做得很小，关键只有三件：

- `prepare.py`：**固定不改**。负责数据准备、tokenizer、dataloader、评估（指标的“裁判”）。
- `train.py`：**Agent 唯一允许改的文件**。模型结构、优化器、训练 loop、超参都在这里。
- `program.md`：**你（人类）写的规则/上下文**。告诉 Agent：怎么实验、怎么记录、怎么回滚、哪些不能碰。

这三件的组合很重要：

- 你要的是“让 AI 创新”，但必须 **锁住评估口径**（不然它会通过改评估作弊）。
- 只让它改一个文件，diff 才可 review，风险可控。

---

## 2. 跑通（Quick Start）：最短路径 + 每一步怎么验证

> 官方依赖：Python 3.10+、单张 NVIDIA GPU、以及 `uv`。

### 2.1 安装 uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

验证：

```bash
uv --version
```

### 2.2 安装依赖

进入仓库目录：

```bash
uv sync
```

常见坑：

- 驱动 / CUDA / PyTorch 不匹配 → 先跑个最小 torch.cuda.is_available()
- 公司网 / 代理导致下载失败 → 换源或提前准备 wheels

### 2.3 一次性准备数据 + tokenizer

```bash
uv run prepare.py
```

它会做：下载训练数据、生成 shards、训练 BPE tokenizer。

验证（很关键）：确认缓存目录里真的有内容。

- 参考 `program.md` 的约定：通常在 `~/.cache/autoresearch/` 一类目录（具体以脚本为准）

### 2.4 手动跑一次 baseline（5 分钟）

```bash
uv run train.py
```

训练结束会打印一个摘要（示例）：

- `val_bpb`：核心指标（越低越好）
- `training_seconds`：训练时间（≈ 300s）
- `peak_vram_mb`：峰值显存

你也可以把输出写到 log，避免屏幕刷爆：

```bash
uv run train.py > run.log 2>&1
grep "^val_bpb:\|^peak_vram_mb:" run.log
```

---

## 3. 指标解释：为什么是 val_bpb？你怎么判断“真的变强了”？

- `val_bpb` = validation bits-per-byte
- 好处：比起按 token 的 loss，它对 tokenizer 的影响更小，**不同 vocab_size 的实验更可比**。

你要建立一个“研究品味”：

- 微小提升（例如 0.001）但代码复杂度暴涨 → 多半不值
- 近似不变，但删掉一堆复杂逻辑 → 值（更稳、更可维护）

这点会直接写进你的 `program.md` 规则里。

---

## 4. 真正的核心：你怎么写 program.md 才能让 Agent 稳定产出？

把你自己当成“研究组织的管理者”，`program.md` 是组织章程。

### 4.1 最小但有效的 program.md 结构（建议模板）

你可以用这几个块让 Agent 不乱来：

1) **Scope（范围）**
- 只能改 `train.py`
- 不能改 `prepare.py`
- 不能加依赖

2) **Metric（唯一 KPI）**
- 只看 `val_bpb`

3) **Experiment budget（预算）**
- 固定 5 分钟
- 超过 10 分钟 kill

4) **Logging（实验记录）**
- `results.tsv`（不提交）
- commit hash + val_bpb + 显存 + keep/discard/crash + 一句话描述

5) **Keep/discard 策略**
- 只要变好就 keep
- 变差就 reset
- crash 记录原因

6) **Idea generator（卡住了怎么办）**
- 先从低风险超参开始
- 再尝试结构性变化
- 再尝试激进点子

> 你给的视频观点里“速度比深度更重要”，在这里的落地就是：
> - 减少每次改动幅度
> - 保证每次都能跑完
> - 让实验吞吐最大化

### 4.2 你必须明确写给 Agent 的“禁止事项”

强烈建议把下面这些写死：

- 禁止改评估（`prepare.py` 任何函数都不要动）
- 禁止引入外部依赖
- 禁止把 `results.tsv` commit 进 git（只在本地积累）
- 禁止一次改动跨越太大（比如同时改模型结构 + 优化器 + batch + tokenizer）

---

## 5. 让它跑一整晚：一套可复现的自动实验循环

一个成熟的“睡觉研究模式”应该满足：

- **可中断**：你随时能停
- **可追溯**：每个实验都是一个 commit
- **可回滚**：差了就 reset
- **可复盘**：早上起来能快速看 best 是哪次、改了什么

### 5.1 建议的目录与文件约定

- `run.log`：当前一次实验日志（每次覆盖或按时间戳）
- `results.tsv`：实验汇总（不 commit）
- `notes.md`：你对“哪些改动有感觉”的人工笔记（可选）

### 5.2 一个“早上复盘”的固定流程

1. 看 `results.tsv` 最佳 `val_bpb`
2. `git show <best_commit>` 看它到底改了啥
3. 复刻验证：再跑一次 baseline vs best（排除偶然波动）
4. 把结论写回 `program.md`（让组织进化）

---

## 6. 硬件/平台差异：小 GPU、Mac、Windows 怎么办？

官方版本偏向 NVIDIA 单卡（H100 测试）。如果你在更小的平台：

- 选低熵数据（如 TinyStories）
- 降 `MAX_SEQ_LEN`
- 降 `DEPTH`
- 调整 batch（保持 2 的幂）
- 简化 attention pattern（例如只用 `L`）

仓库 README 也列出了一些 fork（MacOS / Windows / AMD），可以作为“成功案例”参考：

- MacOS: <https://github.com/miolini/autoresearch-macos>
- MacOS (MLX): <https://github.com/trevin-creator/autoresearch-mlx>
- Windows: <https://github.com/jsegov/autoresearch-win-rtx>
- AMD: <https://github.com/andyluo7/autoresearch>

---

## 7. 全网扩展：延伸教材 + 最优秀案例（你该抄谁）

这一节的目的：给你一份“从入门到进阶”的路线图。

### 7.1 教材/背景

- nanochat / nanogpt（理解最小 GPT 训练代码的经典路线）
- 训练指标与实验设计（为什么固定预算、为什么要 keep/discard）

### 7.2 最成功案例（你该学到的不是代码，是范式）

我会按下面维度去筛案例并持续补充：

- **跑得动**：能在消费级 GPU 或有限资源下稳定运行
- **可复现**：有明确的 setup、参数解释、日志
- **组织化**：把“prompt/程序（program.md）”作为研究组织的中心资产

> 这一节我会在后续迭代中补充更多链接与拆解（优先选能复现的 fork/文章/实践记录）。

---

## 8. 你可以直接复制的“起跑指令”（给 Claude/Codex/任意 coding agent）

把你的 Agent 丢进仓库目录，然后发它这一句：

> “阅读 program.md，先跑一次 baseline 建立 results.tsv，然后开始按规则做实验循环：每次只改 train.py，跑满 5 分钟，val_bpb 变低就 keep，否则 reset。”

---

## 附：视频观点（原始要点备份）

> 这部分是你提供的要点原样保留，方便日后对照。

- 智能爆炸的民主化：单卡即可运行自主 AI 研究系统
- 48 小时快速迭代：约 500 次实验；夜间运行，早上看结果
- AI 研究 AI：人类从执行者变为元程序员（program.md）
- 可能击败顶尖专家：24/7、无偏见、敢尝试疯狂想法、并行搜索
- 核心洞察：速度 > 深度；简单规则 + 大量迭代 = 涌现
