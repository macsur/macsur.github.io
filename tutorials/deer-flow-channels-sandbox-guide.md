# deer-flow 消息通道、沙箱执行与部署扩展阅读
> 项目地址：https://github.com/bytedance/deer-flow

![deer-flow 沙箱与通道配图](https://opengraph.githubassets.com/1/bytedance/deer-flow)

---

## 为什么 deer-flow 适合做生产型 Agent

因为它不只会“回答”，还真的考虑了：

- 沙箱执行
- 文件系统
- 通道接入
- 长任务运行
- Kubernetes / Docker 扩展

---

## 可接入的通道

- Telegram
- Slack
- Feishu / Lark

而且都比较偏“真正能上线”的工程实现，而不是演示性质。

---

## 沙箱价值

沙箱能隔离代码执行、文件写入、工具行为，这对长期运行的 Agent 很重要。

---

## 总结

> **如果你想搭一个更像“工作系统”的 Agent 平台，deer-flow 比很多 demo 型框架更成熟。**
