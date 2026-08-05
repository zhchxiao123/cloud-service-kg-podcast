# EP04｜Protégé 入门：从 CQ 到第一个本体

## 学习目标

- 区分类、个体、对象属性、数据属性和注释属性。
- 区分 TBox 与 ABox。
- 在 Protégé 中创建、保存并重新打开一个本体。

## 核心知识点

- 先从 CQ 制作概念表，再进入工具。
- 类与个体的粒度由问题和答案形式决定。
- 对象属性连接对象，数据属性连接字面量，注释属性记录说明与来源。
- Domain/Range 具有推理语义，不是数据录入校验规则。
- 稳定 IRI、双语标签、定义和来源共同保证可维护性。

## 演示素材

- 把 CQ-01 映射成类、属性和个体。
- 在 Protégé 中创建最小云服务本体。
- 保存为 Turtle，关闭后重新打开并核对实体。

## 课后作业

> 从一条自己的 CQ 制作概念表，在 Protégé 中至少创建 6 个类、4 个对象属性、4 个数据属性和 4 个个体；补充双语标签与定义，保存为 Turtle 后重新打开。

## 文件清单

- `README.md`：本文件
- [`../../project/ontology/cloud_service.ttl`](../../project/ontology/cloud_service.ttl)：v0.1 云服务本体
- [`../../project/docs/terminology.md`](../../project/docs/terminology.md)：术语表与粒度决定
- [`../../project/docs/naming-conventions.md`](../../project/docs/naming-conventions.md)：IRI、实体和标签命名约定
- [`../../podcast-projects/ep04-protege/v2/slide-outline.json`](../../podcast-projects/ep04-protege/v2/slide-outline.json)：10 页结构化大纲
- [`../../podcast-projects/ep04-protege/v2/podcast-script.json`](../../podcast-projects/ep04-protege/v2/podcast-script.json)：双人对话脚本
- [`../../podcast-projects/ep04-protege/v2/presentation.pptx`](../../podcast-projects/ep04-protege/v2/presentation.pptx)：修订版演示文稿
- [`../../podcast-projects/ep04-protege/v2/podcast.mp3`](../../podcast-projects/ep04-protege/v2/podcast.mp3)：双人配音
- [`../../podcast-projects/ep04-protege/v2/final.mp4`](../../podcast-projects/ep04-protege/v2/final.mp4)：修订版 1080p 字幕视频
- [`../../podcast-projects/ep04-protege/v2/QA.md`](../../podcast-projects/ep04-protege/v2/QA.md)：制作验收记录

## 外部资源

- 视频链接：B站 · YouTube（发布后更新）
- 公众号文章：（发布后更新）
- [Protégé Desktop 官方仓库](https://github.com/protegeproject/protege)
- [Protégé Desktop 入门文档](https://protegeproject.github.io/protege/getting-started/)
- [W3C OWL 2 Structural Specification](https://www.w3.org/TR/owl2-syntax/)
