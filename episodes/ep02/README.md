# EP02 | RDF 三元组：知识的原子单位

> 状态：**已完成** ✅  
> 首发日期：2026-07-27  
> 时长：约 6 分 40 秒  
> 视频：[B站] · [YouTube]（发布后更新）  
> 音频：`assets/podcast.mp3`  
> 完整视频：`assets/final.mp4`

---

## 学习目标

让观众理解 RDF 三元组、URI、图模型与 Turtle 写法，能手写简单的 RDF 三元组。

## 核心知识点

1. **RDF 三元组 = 主语 + 谓语 + 宾语**  
   对应图中的一条带标签的有向边。

2. **URI 是全球唯一身份证**  
   通过命名空间前缀缩写（如 `foaf:`、`dbpedia:`）提高可读性。

3. **图模型天然适合表达关系**  
   多个三元组共享同一节点即可自动连接成知识网络。

4. **字面量只能做宾语**  
   字符串、数字、日期等值；可带类型或语言标签。

5. **Turtle 是开发者最友好的 RDF 写法**  
   `a` = `rdf:type`，`;` 同一主语多个谓语，`,` 同一谓语多个宾语。

6. **RDF 不是数据库表**  
   RDF 是语义表达层，与关系型数据库共存，生产环境用 Triple Store / 图数据库查询。

## 节目结构

| 段落 | 内容 |
|------|------|
| 开场 | 从上一集过渡到 RDF 数据语言 |
| 目录 | 三元组、URI、图模型、字面量、Turtle、与数据库对比 |
| 概念 1 | 从本体到 RDF：为什么需要统一数据语言 |
| 概念 2 | 三元组：知识的最小单位 |
| 概念 3 | URI 给每个事物全球身份证 |
| 概念 4 | 图模型：三元组连成的知识网络 |
| 概念 5 | 字面量与可链接性之间的权衡 |
| 概念 6 | Turtle 语法糖演示 |
| 概念 7 | RDF vs 关系型数据库 |
| 总结 | 四个关键认知 + 课后作业 |

## 资源文件

| 文件 | 说明 |
|------|------|
| `assets/final.mp4` | 完整视频（Git LFS） |
| `assets/podcast.mp3` | 音频（Git LFS） |
| `assets/presentation.pptx` | PPT 源文件（Git LFS） |
| `assets/script.json` | 完整讲稿（按 slide 分段） |
| `assets/slides.json` | 幻灯片大纲与讲者备注 |
| `assets/durations.json` | 句子级时间戳 |
| `notes.md` | 研究包：RDF 概念、Turtle 示例、参考来源 |
| `build/` | PPT 生成脚本（pptxgenjs） |

## 课后作业

> 用 Turtle 写 5 个关于你身边事物的三元组，并用 `rdflib` 解析验证，发到 [GitHub Discussions](https://github.com/zhchxiao123/cloud-service-kg-podcast/discussions)。

## 关键参考来源

- W3C RDF 1.1 Primer: https://www.w3.org/TR/rdf-primer/
- W3C RDF 1.1 Concepts: https://www.w3.org/TR/rdf-concepts/
- W3C RDF 1.1 Turtle: https://www.w3.org/TR/turtle/

---

*本集使用本地 omlx Qwen3-TTS 配音，幻灯片与脚本来自同一 `slide-outline.json`，保证音画一致。*
