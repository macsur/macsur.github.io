# 🏗️ 实战：用 OpenClaw 多 Agent 构建智能助手系统

![OpenClaw Multi-Agent System](https://opengraph.githubassets.com/1/openclaw/openclaw)

> 🎥 **视频教程**: [别再让一个 AI 干所有活了！OpenClaw 多 agent 配置教程](https://youtu.be/jni-UOAAUbI)

---

## 📚 实战目标

我们将搭建一个**多功能智能助手**，它能：
- 回答用户问题（researcher）
- 生成代码（coder）
- 撰写文章（writer）
- 处理文件（file-agent）
- 管理日程（calendar-agent）

而不是把所有活都让一个 AI 干。

---

## 🧱 系统架构

```
用户
  ↓
主 Agent（Router）
  ├─→ Researcher（搜索、查资料）
  ├─→ Coder（写代码、改 Bug）
  ├─→ Writer（润色、起草）
  ├─→ FileAgent（读写文件）
  └─→ CalendarAgent（安排日程）
```

主 Agent 负责**路由**：根据用户意图，把任务分给合适的子 Agent。

---

## 🛠️ 第一步：定义专用 Agents

在 `openclaw.json` 中配置：

```json
{
  "agents": {
    "router": {
      "model": "gpt-4-turbo",
      "description": "主路由，理解用户意图并分派任务",
      "systemPrompt": "你是助手系统的路由器。分析用户请求，决定由哪个专业 Agent 处理，然后调用 spawn。"
    },
    "researcher": {
      "model": "gpt-4o-mini",
      "description": "快速搜索和知识问答",
      "systemPrompt": "你是一个信息检索专家，擅长查找资料、总结内容、提供引用。"
    },
    "coder": {
      "model": "claude-3.5-sonnet",
      "description": "编程专家，Python/JS/Shell",
      "systemPrompt": "你是一个资深程序员，写简洁高效的代码，包含注释和错误处理。"
    },
    "writer": {
      "model": "claude-3-opus",
      "description": "文案和长文写作",
      "systemPrompt": "你是一个专业编辑，文字优美，结构清晰，适合中文读者。"
    },
    "file-agent": {
      "model": "gpt-4-turbo",
      "description": "文件读写、整理",
      "systemPrompt": "你管理本地文件，可以列出目录、读写内容、移动重命名。"
    },
    "calendar-agent": {
      "model": "gpt-4-turbo",
      "description": "日程管理、提醒",
      "systemPrompt": "你管理用户日程，可以创建事件、查询空闲时间、设置提醒。"
    }
  }
}
```

---

## 🔄 第二步：实现路由逻辑

Router Agent 的核心任务：** classify -> dispatch **

### 路由规则

| 用户意图 | 目标 Agent | 示例指令 |
|----------|------------|----------|
| 搜索 / 是什么 / 为什么 | researcher | "OpenClaw 怎么安装？" |
| 写代码 / 改 Bug / 调试 | coder | "写一个爬虫抓取网页" |
| 写文章 / 润色 / 编辑 | writer | "把这段文字改得更正式" |
| 读文件 / 写文件 / 整理 | file-agent | "读取 config.json" |
| 安排日程 / 提醒 | calendar-agent | "明天下午两点开会" |

### Router 实现（伪代码）

```python
def route_and_spawn(user_message):
  # 1. 分类意图
  classification = spawn("router", f"判断这条指令的意图类型：'{user_message}'。输出类型：researcher/coder/writer/file-agent/calendar-agent")

  # 2. 根据分类分发
  if "researcher" in classification:
    return spawn("researcher", user_message)
  elif "coder" in classification:
    return spawn("coder", user_message)
  elif "writer" in classification:
    return spawn("writer", user_message)
  elif "file-agent" in classification:
    return spawn("file-agent", user_message)
  elif "calendar-agent" in classification:
    return spawn("calendar-agent", user_message)
  else:
    return "抱歉，我不理解你的需求，请重新表述"
```

---

## 🧪 第三步：测试每个 Agent

分别测试各个 Agent 是否正常工作：

```bash
# Researcher
/spawn researcher "OpenClaw 最新版本号是多少？"

# Coder
/spawn coder "写一个 Python 脚本，遍历当前目录所有 .md 文件并统计字数"

# Writer
/spawn writer "把这段文字改得更专业：'这个功能挺好的，推荐使用'"

# File Agent
/spawn file-agent "列出当前目录下所有 Markdown 文件"

# Calendar Agent
/spawn calendar-agent "添加一个明天下午 3 点的会议，主题是项目评审"
```

---

## 🔗 第四步：组合工作流

### 场景 1：写一篇技术博客

```
用户：写一篇关于 OpenClaw 多 Agent 的教程

流程：
1. researcher 搜集资料（官网、文档、社区）
2. writer 根据资料写草稿
3. coder 生成示例代码
4. writer 整合并润色
5. file-agent 保存为 Markdown
```

代码：

```python
# 1. 搜索
materials = spawn("researcher", "搜索 OpenClaw multi-agent 的最佳实践、配置方法、典型用例")

# 2. 写初稿
draft = spawn("writer", f"基于资料写一篇教程草稿：{materials}")

# 3. 生成代码示例
code = spawn("coder", "生成 2 个 spawn 调用示例：一个串行，一个并行")

# 4. 整合
full_tutorial = spawn("writer", f"整合草稿和代码：\n草稿：{draft}\n代码：{code}")

# 5. 保存
filename = "OpenClaw多Agent实战教程.md"
spawn("file-agent", f"将内容保存为 {filename}：\n{full_tutorial}")

print(f"已完成：{filename}")
```

---

### 场景 2：自动生成日报

```
用户：生成今天的工作日报

流程：
1. file-agent 读取项目日志
2. researcher 搜索今日行业动态
3. writer 整合成日报格式
4. file-agent 保存
```

```python
# 读取日志
logs = spawn("file-agent", "读取 ~/work.log 最后 20 行")

# 搜索动态
news = spawn("researcher", "搜索今日 AI 工具最新发布")

# 写成日报
report = spawn("writer", f"基于工作日志和行业动态写一篇日报：\n日志：{logs}\n动态：{news}")

# 保存
spawn("file-agent", f"保存日报到 ~/daily-report-{today}.md：\n{report}")
```

---

## 🎯 第五步：加入人工审核

关键步骤让用户确认，避免 AI 乱来：

```python
def spawn_with_approval(agent, task, description=""):
  result = spawn(agent, task)
  print(f"\n=== {description} 完成 ===")
  print(result[:500] + "..." if len(result) > 500 else result)
  confirm = input("\n确认通过？(y/n/e-edit): ")
  if confirm == "y":
    return result
  elif confirm == "e":
    edited = input("请输入修改后的内容：")
    return edited
  else:
    raise Exception("用户取消")
```

使用：

```python
draft = spawn_with_approval("writer", "写教程草稿", "初稿")
```

---

## 🚀 第六步：部署与自动运行

### 方式一：命令行脚本

```bash
#!/bin/bash
# generate_tutorial.sh
python3 -c "
from openclaw import spawn

materials = spawn('researcher', '搜索 OpenClaw multi-agent')
draft = spawn('writer', f'写教程：{materials}')
code = spawn('coder', '示例代码')
final = spawn('writer', f'整合：{draft}\n{code}')

with open('tutorial.md', 'w') as f:
  f.write(final)
print('教程已生成')
"
```

### 方式二：定时任务（Cron）

每天早上 9 点自动生成日报：

```bash
0 9 * * * /path/to/generate_daily_report.sh
```

### 方式三：Webhook 触发

外部事件（如 GitHub issue）自动触发工作流：

```yaml
# .github/workflows/generate.yml
on:
  issue:
    types: [labeled]

jobs:
  generate:
    if: contains(issue.labels.*.name, 'generate-tutorial')
    steps:
      - run: |
          python generate.py "${{ github.event.issue.title }}"
```

---

## 📊 监控与日志

### 查看运行状态

```bash
# 当前所有子会话
/sessions list

# 某个会话详情
/sessions get <sessionId>
```

### 日志位置

```bash
~/.openclaw/logs/session.log    # 所有 spawn 记录
~/.openclaw/logs/error.log      # 错误信息
```

### 记录性能数据

```python
import time

start = time.time()
result = spawn("coder", "写快排算法")
duration = time.time() - start

print(f"任务耗时：{duration:.2f}秒")
# 可以写入数据库或日志文件
```

---

## 🔐 安全与权限

### 限制 Agent 能力

不是每个 Agent 都需要文件访问权限：

```json
{
  "agents": {
    "writer": {
      "permissions": ["chat"],  // 只能聊天
      "deny": ["file-read", "file-write"]
    },
    "file-agent": {
      "permissions": ["file-read", "file-write"],
      "deny": ["network"]  // 不能访问网络
    }
  }
}
```

### API Key 隔离

不同 Agent 可以使用不同提供商的 API，便于计费和控制：

```json
{
  "agents": {
    "coder": {
      "provider": "openai",
      "apiKey": "..."
    },
    "writer": {
      "provider": "anthropic",
      "apiKey": "..."
    }
  }
}
```

---

## 🧩 扩展：自定义 Agent 技能

除了 spawn，你还可以给 Agent 绑定**技能**，让它执行特定动作：

```json
{
  "agentId": "file-agent",
  "skills": ["file-read-skill", "file-write-skill"]
}
```

然后可以直接调用：

```
/spawn file-agent "用 file-read-skill 读取 .gitignore"
```

---

## 📈 性能优化

### 1. 合理设置并发

```json
{
  "session": {
    "maxConcurrent": 10,   // 根据机器性能调整
    "queueSize": 20
  }
}
```

### 2. 并行处理独立任务

```python
from concurrent.futures import ThreadPoolExecutor

tasks = [
  ("coder", "写脚本 A"),
  ("coder", "写脚本 B"),
  ("coder", "写脚本 C")
]

with ThreadPoolExecutor(max_workers=3) as executor:
  results = list(executor.map(lambda t: spawn(*t), tasks))
```

### 3. 缓存重复结果

```python
import hashlib

def cached_spawn(agent, task):
  key = hashlib.md5(f"{agent}:{task}".encode()).hexdigest()
  if cache.exists(key):
    return cache.get(key)
  result = spawn(agent, task)
  cache.set(key, result, ttl=3600)
  return result
```

---

## 🎓 最佳实践总结

1. **Agent 职责单一化**：每个 Agent 只做一类事
2. **Router 轻量化**：路由逻辑尽量简单，不做复杂处理
3. **超时设置**：每个任务都要有 `timeoutSeconds`
4. **错误隔离**：一个 Agent 失败不影响整个流程
5. **日志记录**：记录每个 spawn 的参数和耗时
6. **人工审核点**：关键输出让用户确认
7. **渐进增强**：先从简单串行开始，再复杂编排

---

## ✅ 快速检查清单

- [ ] 定义了至少 4 种专用 Agent
- [ ] Router Agent 能正确分类意图
- [ ] 每个 Agent 的 model 和 prompt 合理
- [ ] 实现了完整工作流（搜索→写作→编码→保存）
- [ ] 加入了超时和错误处理
- [ ] 有日志记录和性能监控
- [ ] 测试了并行处理场景

---

## 🚀 下一步方向

- **UI 界面**：用 Web 界面展示工作流状态
- **可视化编排**：拖拽式定义 Agent 流程
- **结果持久化**：存入数据库或知识库
- **主动学习**：根据用户反馈优化路由规则

---

## 📞 需要帮助？

如果系统跑不起来：
1. 检查 openclaw.json 语法
2. 确保所有 Agent 的 model 都能正常调用
3. 查看日志：`~/.openclaw/logs/session.log`
4. 在 GitHub 提问时请附上你的编排代码

---

*创建日期：2025-06-17*  
*视频参考：https://youtu.be/jni-UOAAUbI*  
*作者：伴伴 (Bàn Bàn)*