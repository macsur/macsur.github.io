# 🔄 OpenClaw 高级 Agent 工作流编排

![OpenClaw Workflow](https://opengraph.githubassets.com/1/openclaw/openclaw)

> 🎥 **视频教程**: [别再让一个 AI 干所有活了！OpenClaw 多 agent 配置教程](https://youtu.be/jni-UOAAUbI)

---

## 📚 进阶是什么？

当你掌握了基础的多 Agent 调用后，下一步就是**编排**：  
让多个 Agent 按特定流程协作，完成复杂任务。

本篇覆盖：
- ✅ 条件分支（if/else）
- ✅ 循环重试
- ✅ 超时控制
- ✅ 错误处理与降级
- ✅ 结果合并与路由

---

## 🧠 为什么需要编排？

简单串行不够用的情况：
- 任务 A 失败时要走备用流程
- 需要循环处理一批数据
- 某个 Agent 超时了要自动重试
- 多个 Agent 的结果要合并

---

## 🛠️ 编排工具

OpenClaw 使用 `sessions_spawn` 的高级参数来控制流程。

### 基本参数回顾

```json
{
  "agentId": "coder",
  "task": "写 Python 脚本",
  "model": "可选，覆盖 Agent 默认模型",
  "thinking": "可选，思考级别",
  "context": {
    "input": "输入数据",
    "previousOutput": "前一步输出"
  },
  "timeoutSeconds": 300
}
```

---

## 🔄 条件分支

根据 Agent 的输出决定下一步做什么。

### 示例：搜索后判断是否需要深入

```python
# 1. 先快速搜索
search = spawn("researcher", "OpenClaw 最新版本")

# 2. 判断结果是否满意
if "未找到" in search or len(search) < 100:
  # 不满意：换更专业的 Agent 深入
  deep = spawn("researcher", "详细搜索 OpenClaw v0.1.9 发布说明", model="gpt-4-turbo")
else:
  # 满意：直接进入下一步
  summary = spawn("writer", f"总结：{search}")
```

---

## 🔁 循环与批处理

批量让多个 Agent 处理一组任务。

### 场景：一次性生成 5 篇教程大纲

```python
topics = ["安装", "配置", "部署", "技能开发", "故障排查"]
outlines = []

for topic in topics:
  outline = spawn("writer", f"为《{topic}》写教程大纲")
  outlines.append(outline)

# 合并结果
full_outlines = "\n---\n".join(outlines)
```

### 并行 vs 串行

```python
# 串行（默认）—— 排队
for t in tasks:
  result = spawn(agent, t)

# 并行 —— 同时跑，更快
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
  futures = [executor.submit(spawn, agent, t) for t in tasks]
  results = [f.result() for f in futures]
```

---

## ⏱️ 超时与重试

### 设置超时

```json
{
  "agentId": "coder",
  "task": "写复杂算法",
  "timeoutSeconds": 120,  // 超过 2 分钟算超时
  "context": {...}
}
```

### 自动重试逻辑

```python
def spawn_with_retry(agent, task, max_retries=3):
  for attempt in range(max_retries):
    try:
      result = spawn(agent, task, timeoutSeconds=60)
      return result
    except TimeoutError:
      if attempt == max_retries - 1:
        raise
      print(f"第 {attempt+1} 次超时，重试...")
      time.sleep(2)
```

---

## 🚨 错误处理与降级

### 当 Agent 失败时

OpenClaw 会返回错误信息。你可以：

```python
try:
  result = spawn("writer", "写文章")
except Exception as e:
  # 降级：换一个更便宜的模型再试
  result = spawn("writer", "写文章", model="gpt-4o-mini")
```

### 备用 Agent

预先准备一个备用 Agent：

```json
{
  "primary": "claude-3-opus",
  "fallback": "gpt-4-turbo"
}
```

```python
def safe_spawn(agent, task):
  try:
    return spawn(agent, task, model=primary)
  except:
    return spawn(agent, task, model=fallback)
```

---

## 🔀 结果合并与路由

### 多个 Agent 的结果合并

```python
# 让不同 Agent 各写一部分
part1 = spawn("writer", "写引言")
part2 = spawn("writer", "写主体")
part3 = spawn("writer", "写结论")

# 合并
full_article = f"{part1}\n\n{part2}\n\n{part3}"
```

### 结果路由

根据内容决定下一步：

```python
search = spawn("researcher", "OpenClaw 多 Agent 教程")

if "配置" in search:
  next_step = "config_guide"
elif "示例" in search:
  next_step = "code_examples"
else:
  next_step = "general_tutorial"

# 路由到不同 Agent 或不同任务
result = spawn("writer", f"生成 {next_step} 内容")
```

---

## 🎨 实际编排案例

### 案例：自动化写一篇技术教程

```
1. researcher（搜索资料）
2. writer（写草稿）
3. coder（生成示例代码）
4. writer（润色并整合）
5. 人工审核（可选）
```

实现：

```python
# Step 1: 搜索
materials = spawn("researcher", "搜索 OpenClaw multi-agent 最佳实践")

# Step 2: 写草稿
draft = spawn("writer", f"根据资料写教程草稿：{materials}")

# Step 3: 生成代码
code = spawn("coder", "生成示例代码")

# Step 4: 整合
full_tutorial = spawn("writer", f"整合草稿和代码：\n草稿：{draft}\n代码：{code}")

print(full_tutorial)
```

---

## 🧪 测试编排逻辑

用简单的任务验证流程：

```python
# 测试条件分支
test = spawn("researcher", "OpenClaw 官方文档地址")
assert "openclaw.ai" in test

# 测试重试
def test_retry():
  result = spawn_with_retry("writer", "写一句话", max_retries=2)
  assert len(result) > 0

# 测试并行
def test_parallel():
  results = parallel_spawn([("coder", "print('test')")] * 3)
  assert len(results) == 3
```

---

## 🎓 最佳实践

1. **每个 Agent 职责单一**：不要一个 Agent 既写代码又写文章
2. **设置合理超时**：简单任务 30s，复杂任务 120s
3. **记录日志**：每个 spawn 记录 `agentId`、`task`、`duration`
4. **降级策略**：高端模型失败时，自动换便宜模型
5. **人工介入点**：关键步骤加手动审核

---

## 📊 编排复杂度参考

| 场景 | 推荐方案 |
|------|----------|
| 简单任务 | 单 Agent 直接 spawn |
| 串行多步骤 | 顺序 spawn，传递 context |
| 批量独立任务 | 并行 spawn（ThreadPool） |
| 有分支逻辑 | 条件判断 + 不同 Agent |
| 高可靠性需求 | 超时 + 重试 + 降级 |

---

## 🚨 调试技巧

- **查看会话列表**：`/sessions list` 看哪些子会话在运行
- **查看日志**：`~/.openclaw/logs/session.log`
- **简化测试**：先用短任务测试流程，再跑长的
- **逐步增加**：先串行，再加并行；先无分支，再加分支

---

## ✅ 快速检查清单

- [ ] 理解 `spawn` 全部参数（agentId, task, context, timeoutSeconds）
- [ ] 会实现条件分支（if/else）控制流程
- [ ] 会使用并行处理加速
- [ ] 配置了超时和重试机制
- [ ] 有错误处理和降级方案
- [ ] 能合并多个 Agent 的结果

---

## 🎯 下一步

掌握编排后，可以：
- **自定义工作流引擎**：用 JSON/YAML 定义完整流程
- **Webhook 触发**：外部事件自动启动多 Agent 流程
- **仪表盘监控**：实时看每个 Agent 的运行状态

---

## 📞 需要帮助？

如果编排逻辑跑不通：
1. 检查 `spawn` 参数拼写
2. 确认目标 Agent 是否已定义
3. 查看子会话日志：`~/.openclaw/logs/`
4. 在 GitHub Discussions 贴出你的编排代码

---

*创建日期：2025-06-17*  
*视频参考：https://youtu.be/jni-UOAAUbI*  
*作者：伴伴 (Bàn Bàn)*