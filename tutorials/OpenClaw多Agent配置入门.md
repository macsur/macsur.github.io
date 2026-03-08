# 🤖 OpenClaw 多 Agent 配置入门

![OpenClaw Multi-Agent Architecture](https://opengraph.githubassets.com/1/openclaw/openclaw)

> 🎥 **视频教程**: [别再让一个 AI 干所有活了！OpenClaw 多 agent 配置教程](https://youtu.be/jni-UOAAUbI)

---

## 📚 为什么需要多 Agent？

别再让一个 AI 干所有活了！OpenClaw 的多 Agent 架构让你能够：

- **专岗专能**：每个 Agent 只做它擅长的事
- **任务分流**：把复杂任务拆给不同 Agent
- **效率倍增**：并行处理，不排队
- **灵活组合**：像搭积木一样组合工作流

---

## 🎯 核心概念

### 什么是 Agent？
在 OpenClaw 里，**Agent** 就是一段能独立思考和执行的 AI 助手。  
可以是一个子会话、一个专用技能、或者一个独立的模型实例。

### 为什么用多 Agent？
- **单一模型有局限**：一个模型不可能擅长所有事
- **任务类型多样**：写代码、查资料、做翻译、画图各需不同专长
- **成本控制**：简单任务用便宜模型，复杂任务用高级模型
- **可靠性**：某个 Agent 挂了不影响其它

---

## 🛠️ 基础配置步骤

### 1️⃣ 准备 Agent 定义

在你的 `openclaw.json` 或技能配置中，定义不同的 Agent：

```json
{
  "agents": {
    "coder": {
      "model": "gpt-4-turbo",
      "description": "代码专家，擅长 Python/JavaScript",
      "systemPrompt": "你是一个资深程序员..."
    },
    "writer": {
      "model": "claude-3-opus",
      "description": "文案写手，擅长文章润色",
      "systemPrompt": "你是一个专业编辑..."
    },
    "researcher": {
      "model": "gpt-4o-mini",
      "description": "快速搜索和总结",
      "systemPrompt": "你是一个信息整理专家..."
    }
  }
}
```

### 2️⃣ 启用会话管理

确保 OpenClaw 配置中启用了多会话支持：

```json
{
  "session": {
    "maxConcurrent": 5,
    "timeoutMinutes": 30
  }
}
```

### 3️⃣ 使用 `sessions_spawn` 创建子 Agent

当你需要某个 Agent 处理任务时，可以这样调用：

```
/spawn coder "帮我写一个 Python 脚本，批量重命名文件"
```

或者通过 API：

```bash
curl -X POST "http://localhost:8080/api/sessions/spawn" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "coder",
    "task": "写一个 Python 脚本，批量重命名文件"
  }'
```

---

## 🔄 工作流编排

### 简单串行

一个任务交给多个 Agent 依次处理：

1. Researcher 先搜索资料
2. Writer 根据资料撰写草稿
3. Coder 把草稿转成网页

```python
# 伪代码示例
research = spawn("researcher", "搜索 OpenClaw 多 Agent 教程")
draft = spawn("writer", f"根据以下资料写文章：{research}")
html = spawn("coder", f"把文章转成 HTML：{draft}")
```

### 并行处理

同时让多个 Agent 干活：

```python
tasks = [
  ("coder", "写登录模块"),
  ("coder", "写数据库模型"),
  ("coder", "写 API 路由")
]
results = parallel_spawn(tasks)  # 同时跑，不排队
```

---

## 🧩 实际使用技巧

### 选择合适的模型
- **Researcher**：用便宜模型（gpt-4o-mini），只要快
- **Coder**：用最新最强的（claude-3.5-sonnet 或 gpt-4-turbo）
- **Writer**：用 Claude 系列，文风好

### 控制成本
- 简单任务 → 轻量模型
- 复杂推理 → 高端模型
- 可以设置 `maxTokens` 限制输出长度

### 传递上下文
使用 `context` 参数把前面 Agent 的产出传给后面：

```json
{
  "agentId": "writer",
  "task": "润色以下文本",
  "context": {
    "previousOutput": "research 的输出..."
  }
}
```

---

## 🎨 进阶：自定义 Agent 技能

你还可以给 Agent 绑定特定技能，让它更专：

```json
{
  "agentId": "coder",
  "skills": ["python-skill", "git-skill", "docker-skill"]
}
```

这样 Agent 就能调用这些技能完成特定操作。

---

## 🧪 测试你的配置

创建一个简单的测试任务：

```
/spawn researcher "OpenClaw 是什么？"
/spawn writer "用通俗语言解释多 Agent 架构"
/spawn coder "写一个 Hello World Python 脚本"
```

观察输出是否符合预期。

---

## 🚨 常见问题

### Q: Agent 不响应？
A: 检查：
- Agent ID 拼写是否正确
- 模型是否可达（API Key 是否有效）
- 是否达到了并发限制

### Q: 任务丢失？
A: 确保 `session.timeoutMinutes` 足够长，或增加 `maxConcurrent`

### Q: 如何查看运行状态？
A: 使用 `/sessions list` 查看当前所有子会话

---

## ✅ 快速检查清单

- [ ] 在 `openclaw.json` 中定义了至少 2 个 Agent
- [ ] 每个 Agent 有独立的 `model` 和 `systemPrompt`
- [ ] `session.maxConcurrent` 设置合理（建议 3-5）
- [ ] 测试 `spawn` 命令成功运行
- [ ] 理解如何传递 `context` 数据

---

## 🎓 下一步

掌握基础后，可以探索：
- **动态路由**：根据任务内容自动选择 Agent
- **人工审核节点**：关键步骤需要人工确认
- **结果合并**：多个 Agent 的输出自动汇总

---

## 📞 需要帮助？

遇到配置问题，可以：
1. 检查 `openclaw.json` 语法
2. 查看 OpenClaw 日志 `~/.openclaw/logs/`
3. 在 GitHub Discussions 提问

---

*创建日期：2025-06-17*  
*视频参考：https://youtu.be/jni-UOAAUbI*  
*作者：伴伴 (Bàn Bàn)*