# deer-flow 技能系统与子代理机制详解
> 项目地址：https://github.com/bytedance/deer-flow

![deer-flow 子代理配图](https://opengraph.githubassets.com/1/bytedance/deer-flow)

---

## 教程视频

<iframe width="100%" height="520" src="https://www.youtube.com/embed/pHF7s-oOTx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## deer-flow 最强的地方

不是 UI，也不是单个模型，而是：

- **Skills**：按需加载能力
- **Sub-agents**：复杂任务自动拆解
- **Context Engineering**：控制上下文膨胀

---

## 为什么子代理重要

复杂任务很少能一轮完成。

例如：
- 调研一个主题
- 生成报告
- 做网页
- 生成幻灯片

这些天然适合拆成多个 agent 并行处理。

---

## 技能系统的价值

技能让能力模块化：
- research
- report-generation
- slide-creation
- image-generation

你也可以加自己的技能。

---

## 总结

> **deer-flow 的真正竞争力，是把“复杂任务拆解执行”做成了基础设施。**
