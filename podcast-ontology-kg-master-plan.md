# 《本体工程与知识图谱实战》播客/视频系列完整制作方案

> **课程结构更新提示**：主线 EP01–EP16 正在按教学递进重新编排。课程内容与制作顺序以
> [`docs/course-blueprint.md`](./docs/course-blueprint.md) 为当前基线；本文保留原始研究、分发和番外方案，
> 后续再按新蓝图逐节同步。

> 版本：v1.0  
> 生成日期：2026-07-27  
> 适用范围：B站 / YouTube / 视频号 / 公众号 / 知乎 / 掘金 / GitHub 多平台分发  
> 核心载体：云服务选型知识图谱（第 14 集实战项目）

---

## 目录

1. [项目总览与定位](#1-项目总览与定位)
2. [主线课程：16 集详细方案](#2-主线课程16-集详细方案)
3. [番外/第二季：8 集详细方案](#3-番外第二季8-集详细方案)
4. [多平台分发执行模板](#4-多平台分发执行模板)
5. [项目载体：云服务选型知识图谱](#5-项目载体云服务选型知识图谱)
6. [生产流水线与里程碑](#6-生产流水线与里程碑)
7. [内容对抗性验证报告](#7-内容对抗性验证报告)
8. [附录：已核验资源清单](#8-附录已核验资源清单)

---

## 1. 项目总览与定位

### 1.1 系列架构

| 维度 | 主线课程 | 番外/第二季 |
|------|---------|------------|
| 名称 | 《本体工程与知识图谱实战》 | 《本体研究前沿》 |
| 受众 | 开发者、研究生、技术工程师 | 研究者、博士生、技术决策者 |
| 时长 | 8–12 分钟/集 | 15–20 分钟/集 |
| 总集数 | 16 集，分四季 | 8 集 |
| 更新节奏 | 每周 1 集，4 个月播完 | 主线播完后，每月 1–2 集 |
| 语言 | 中文，代码/术语保留英文 | 中文，引用英文术语与论文 |
| 默认配音 | omlx 本地 TTS（中文） | omlx 本地 TTS（中文） |

### 1.2 统一内容原则

1. **每集必须带代码/演示**：主线课程至少一段可运行的代码或一次 Protégé/Neo4j 录屏。
2. **每集必须回答一个具体问题**：标题即问题，结尾 30 秒给出结论。
3. **真实工具优先**：只使用 2024–2026 年仍维护、有官方文档或论文支撑的工具。
4. **对抗性验证**：关键技术/论文在方案中标注“核验状态”，并附上可核查来源。
5. **GitHub 同步**：每集代码、数据、PPT 源文件在 GitHub 发布，并通过 Zenodo 生成 DOI（第 14–16 集）。

### 1.3 推荐制作工具链

| 环节 | 推荐工具 | 备注 |
|------|---------|------|
| 大纲/脚本 | Markdown + GitHub Issues | 每集一个 Issue，模板见第 6 节 |
| PPT | Marp / reveal.js / Keynote | 导出 16:9 与 9:16 两版 |
| 录屏 | OBS + 内置字幕条 | 1080p 60fps |
| 插图 | gpt-image（已在 pipeline 集成） | 用于概念图、流程图 |
| 代码演示 | VS Code + Jupyter Lab | 仓库统一环境 |
| 配音 | omlx 本地 TTS | 中文，目标 10 分钟 |
| 字幕 | whisper.cpp / faster-whisper | 导出 SRT + 简明字幕 |
| 视频剪辑 | DaVinci Resolve / CapCut | 加片头/片尾/章节标记 |
| 分发管理 | Notion/飞书多维表格 | 跟踪各平台稿件状态 |

---

## 2. 主线课程：16 集详细方案

### 2.1 第一季：本体基础（第 01–04 集）

---

#### 第 01 集：《本体到底解决什么问题？》

**核心目标**：让观众在 10 分钟内建立学习动机，理解“数据孤岛、语义不一致、LLM 幻觉”三个痛点如何通过本体工程缓解。

**知识点清单**：
- 数据孤岛：同一实体在不同系统里的不同名字（例如 `Azure VM` vs `EC2 Instance` vs `云服务器`）。
- 语义不一致：同一字段在不同表里有不同含义（`price` 是月费？一次性授权？是否含税？）。
- LLM 幻觉：大模型缺乏结构化领域知识，会编造关系或属性。
- 本体的价值：提供“共享概念化”的显式、形式化规格说明（Tom Gruber 经典定义）。
- 用一张对比图展示：关键词搜索 → 向量检索 → 知识图谱检索的差异。

**演示素材**：
- 一张手绘风格的对比图：Excel 表格 vs 图结构 vs 加了 OWL 约束的图。
- 示例：用自然语言问“适合机器学习训练的云服务有哪些？”分别用向量 RAG 和知识图谱回答，对比 hallucination。

**课后作业**：
> 列出你工作中遇到的 3 个“同一个词在不同地方意思不同”的例子，发到 GitHub Discussion。

**配套 GitHub 资源**：
- `ep01/README.md`：术语表 + 3 个真实案例
- `ep01/assets/`：对比图 PNG

**预计时长**：10 分钟

**核验备注**：
- Tom Gruber 的“本体是共享概念化的显式形式化规格说明”是经典定义， widely cited。

---

#### 第 02 集：《RDF 三元组：知识的原子单位》

**核心目标**：理解 RDF 三元组、URI、字面量、图模型；能手写 10 条 Turtle 语句。

**知识点清单**：
- 三元组 = 主语（Subject）+ 谓语（Predicate）+ 宾语（Object）。
- URI vs URL vs URN：URI 是标识符，不一定是可点击链接。
- RDF 图是“带标签的有向图”。
- Turtle 语法：前缀声明、缩写、多语言字面量、类型化字面量。
- 常见谓语：`rdf:type`、`rdfs:label`、`rdfs:comment`。
- N-Triples 与 Turtle 的互换。

**演示素材**：
- VS Code 中手写 Turtle 描述一个云服务：
  ```turtle
  @prefix : <http://example.org/cloud#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

  :AWS_EC2 a :ComputeService ;
      rdfs:label "Amazon EC2"@en ;
      rdfs:label "亚马逊 EC2"@zh ;
      :hasRegion :us-east-1 .
  ```
- 用 `rapper`（Raptor）或 Python `rdflib` 做格式转换验证。

**课后作业**：
> 用 Turtle 写 10 条关于“你常用的一个云服务”的三元组，并用 rdflib 解析验证。

**配套 GitHub 资源**：
- `ep02/sample.ttl`
- `ep02/verify.py`：rdflib 解析 + 三元组计数

**预计时长**：10 分钟

**核验备注**：
- RDF 1.1 规范由 W3C 发布；Turtle 是 W3C Recommendation。

---

#### 第 03 集：《Protégé 入门：画出你的第一个本体》

**核心目标**：安装 Protégé，创建类、对象属性、数据属性、个体；理解 TBox vs ABox。

**知识点清单**：
- TBox（Terminology Box）：类、属性、约束。
- ABox（Assertion Box）：个体、具体事实。
- OWL 类、对象属性（Object Property）、数据属性（Data Property）、注释属性（Annotation Property）。
- 域（Domain）与范围（Range）。
- 类之间的包含关系：`rdfs:subClassOf`。

**演示素材**：
- Protégé 5.6.9 录屏（已验证为当前最新稳定版）。
- 创建最小本体：
  - 类：`CloudService` → `ComputeService`、`StorageService`、`DatabaseService`
  - 对象属性：`hasProvider`（Domain: CloudService, Range: CloudProvider）
  - 数据属性：`monthlyPriceUsd`（Domain: CloudService, Range: xsd:decimal）
  - 个体：`AWS_EC2`、`AWS_S3`、`Azure_Blob_Storage`

**课后作业**：
> 在 Protégé 中扩展第 02 集的 Turtle，画出至少 5 个类、3 个属性、5 个个体，导出 OWL/Turtle。

**配套 GitHub 资源**：
- `ep03/cloud_service_ontology.ttl`
- `ep03/protege_screenshots/`

**预计时长**：12 分钟

**核验备注**：
- Protégé 当前最新版为 5.6.9（2024/2025 期间发布），支持 Java 11 至 Java 25。
- Protégé 5.6.4（2024-05-30）捆绑了 ELK 0.6.0，并仍支持 HermiT、Pellet 等推理机插件。
- ELK 是默认捆绑的高速 OWL 2 EL 推理机；HermiT/Pellet 需在插件市场安装。

---

#### 第 04 集：《OWL 与推理机：让知识自己说话》

**核心目标**：用 HermiT 或 Pellet 做逻辑推理，展示本体如何“自动发现”隐式知识。

**知识点清单**：
- OWL 2 概要：类表达式、属性约束、数据范围。
- 关键构造子：`owl:equivalentClass`、`owl:disjointWith`、`owl:TransitiveProperty`、`owl:FunctionalProperty`、`owl:someValuesFrom`、`owl:allValuesFrom`。
- 推理机能做什么：类层级补全、不一致检测、属性链推断。
- 解释“开放世界假设”与“封闭世界假设”对本体检索的影响。

**演示素材**：
- 在 Protégé 中定义：
  ```turtle
  :ManagedDatabaseService owl:equivalentClass [
      owl:intersectionOf (
          :DatabaseService
          [ owl:someValuesFrom :ManagedOption ; owl:onProperty :hasManagementModel ]
      )
  ] .
  ```
- 给 `AWS_RDS` 添加 `hasManagementModel :ManagedOption`，运行 HermiT，自动归类为 `ManagedDatabaseService`。
- 故意制造一个不一致（如把 `AWS_EC2` 同时声明为 `ComputeService` 和 `StorageService` 的等价类，且二者 `owl:disjointWith`），演示推理机报错。

**课后作业**：
> 给第 03 集的本体增加至少 3 条推理规则，运行 HermiT/Pellet 后解释推理结果。

**配套 GitHub 资源**：
- `ep04/reasoning_demo.ttl`
- `ep04/inconsistent_example.ttl`

**预计时长**：12 分钟

**核验备注**：
- HermiT 与 Pellet 都是 Protégé 长期支持的 OWL 2 DL 推理机；ELK 仅支持 OWL 2 EL 片段，速度更快。
- OWL 2 规范为 W3C Recommendation（2009/2012）。

---

### 2.2 第二季：知识图谱构建（第 05–09 集）

---

#### 第 05 集：《从需求到 Competency Question》

**核心目标**：学会用 Competency Question（CQ）驱动本体设计，掌握“先写问题，再建本体”的工作流。

**知识点清单**：
- CQ 是什么：本体应能回答的业务/科学问题。
- 好的 CQ 标准：具体、可验证、覆盖领域核心概念。
- 从 CQ 到本体元素的映射：
  - 名词 → 类
  - 动词/关系 → 对象属性
  - 形容词/数值 → 数据属性
  - 问题的限定条件 → 约束/规则
- CQ 优先级排序：Must-have / Should-have / Nice-to-have。

**演示素材**：
- 以“云服务选型”为例写出 6 条 CQ：
  1. 哪些计算服务支持 GPU 实例？
  2. 哪个对象存储在亚太地区有可用区？
  3. 关系型数据库服务的托管程度如何？
  4. 哪些服务提供免费额度？
  5. 服务 A 与服务 B 之间有没有数据迁移路径？
  6. 相同性能规格下，AWS、Azure、GCP 哪家月费最低？
- 用 Markdown 表格展示 CQ → 本体元素映射。

**课后作业**：
> 为你熟悉的领域写 5 条 CQ，并映射到类/属性/约束。

**配套 GitHub 资源**：
- `ep05/cq_template.md`
- `ep05/cloud_selection_cq.md`

**预计时长**：10 分钟

**核验备注**：
- CQ 工程是本体工程经典方法；2024 年 EKAW 有系统综述《A Review and Comparison of Competency Question Engineering Approaches》。
- 2024 年涌现多篇 LLM 生成 CQ 的论文（RAG-based、RevOnt、RETROFIT-CQ 开源模型版）。

---

#### 第 06 集：《实体抽取：NER 与 LLM 对比》

**核心目标**：用 spaCy、BERT 和 LLM 三种方式从云服务商文档中抽取实体，对比精度、成本、可控性。

**知识点清单**：
- NER 任务定义：识别文本中的命名实体并分类。
- spaCy `en_core_web_sm` / `zh_core_web_sm` 快速基线。
- Hugging Face Transformers + BERT/SpanBERT 做领域 NER。
- LLM zero-shot / few-shot NER：提示词设计、输出格式约束（JSON）。
- 评估指标：Precision、Recall、F1；实体级别 vs token 级别。

**演示素材**：
- 输入片段（来自 AWS 或 Azure 公开文档）：
  > “Amazon EC2 P5 instances are powered by NVIDIA H100 Tensor Core GPUs and are ideal for training generative AI models.”
- 三种方法输出对比：
  - spaCy：`Amazon EC2 P5` (ORG? 不准)、`NVIDIA H100` (PRODUCT?)
  - BERT（微调的 cloud-NER 模型）：`Amazon EC2 P5` → ComputeService, `NVIDIA H100` → GPU
  - LLM：结构化 JSON，但可能编造不在文档中的属性

**课后作业**：
> 用 spaCy 和一种 LLM API 对同一段云服务描述做 NER，手动标注 20 个实体，计算 F1。

**配套 GitHub 资源**：
- `ep06/ner_compare.ipynb`
- `ep06/sample_docs.json`

**预计时长**：11 分钟

**核验备注**：
- spaCy 3.x 提供 `EntityLinker` 组件；另有社区包 `spacy-entity-linker` 用于 Wikidata 链接。
- BERT/SpanBERT 为 Hugging Face 常见 NER 模型。

---

#### 第 07 集：《关系抽取：OpenIE 与 LLM 方法》

**核心目标**：从非结构化文本中抽取关系三元组，对比传统 OpenIE 与 LLM 生成式抽取。

**知识点清单**：
- OpenIE：从开放域文本抽取 `(arg1, relation, arg2)`，无需预定义关系 schema。
- Stanford CoreNLP OpenIE：基于句法结构的经典工具。
- 神经 OpenIE：RnnOIE、IMoJIE、OpenIE6。
- LLM 关系抽取：提示词给出 schema 或让模型自由生成，再用约束过滤。
- 关系规范化：把自由文本关系映射到本体属性（如把 “is available in” 映射到 `:hasRegion`）。

**演示素材**：
- 输入：
  > “Azure Blob Storage is available in multiple regions. It supports hot, cool, and archive access tiers.”
- Stanford OpenIE 输出：`(Azure Blob Storage, is available in, multiple regions)`
- LLM 输出（JSON）：
  ```json
  [
    {"subject": "Azure Blob Storage", "predicate": "hasRegion", "object": "multiple regions"},
    {"subject": "Azure Blob Storage", "predicate": "supportsAccessTier", "object": "hot"}
  ]
  ```
- 关系映射表：OpenIE relation → ontology property。

**课后作业**：
> 对一段 200 字的云服务文档，分别用 Stanford OpenIE 和 LLM 抽取三元组，统计有多少能映射到第 05 集的本体属性。

**配套 GitHub 资源**：
- `ep07/openie_demo.py`
- `ep07/relation_mapping.csv`

**预计时长**：11 分钟

**核验备注**：
- Stanford CoreNLP OpenIE 为经典工具，基于 2015 年论文《Leveraging Linguistic Structure For Open Domain Information Extraction》。
- 2024 EMNLP Findings 有综述《A Survey on Open Information Extraction from Rule-based Model to Large Language Model》。
- 2024 ACL 有 ORELLM（合作 LLM 做 Open Relation Extraction）。

---

#### 第 08 集：《实体链接：把名字对到真实世界》

**核心目标**：理解实体消歧与实体链接，把文本 mentions 链接到 Wikidata / DBpedia。

**知识点清单**：
- 实体链接 pipeline：mention detection → candidate generation → entity disambiguation → NIL detection。
- Wikidata QID 与 DBpedia URI 作为全局标识符。
- spaCy + `spacy-entity-linker` 链接到 Wikidata。
- `spacy-dbpedia-spotlight` 链接到 DBpedia。
- 实体链接评估：准确率、候选覆盖率、NIL 率。

**演示素材**：
- 输入句子：
  > “We use SageMaker for training and S3 for storage.”
- spaCy-entity-linker 输出：
  - `SageMaker` → QID ???（可能无法识别，因为不是常见百科实体）
  - 说明：通用 KB 链接对云服务名覆盖差，需要领域 KB。
- 演示如何自建小型 KnowledgeBase：把 AWS 服务名 → Wikidata QID / 自建 URI。

**课后作业**：
> 为你的领域构建一个 50 条记录的 mini-KB，用 spaCy EntityLinker 做本地链接。

**配套 GitHub 资源**：
- `ep08/build_kb.py`
- `ep08/mini_kb.json`

**预计时长**：10 分钟

**核验备注**：
- `spacy-entity-linker` 基于预处理的 Wikidata alias 数据库，PyPI 最新 1.0.3（2023-02）。
- DBpedia Spotlight 仍可作为本地/远程服务使用，`spacy-dbpedia-spotlight` 兼容 spaCy 3.x。

---

#### 第 09 集：《Neo4j 存储与 Cypher 查询》

**核心目标**：把 RDF 三元组导入 Neo4j，写 Cypher 查询，理解属性图与 RDF 的映射。

**知识点清单**：
- Neo4j 属性图模型：节点、关系、属性、标签。
- RDF → 属性图的映射策略：
  - 资源 → 节点
  - `rdf:type` → 标签
  - 对象属性 → 关系
  - 数据属性 → 节点属性
- n10s / Neosemantics 插件导入 RDF。
- Cypher 基础：`MATCH`、`WHERE`、`RETURN`、`CREATE`、`MERGE`。
- 简单图算法：度数统计、最短路径。

**演示素材**：
- 安装/启动 Neo4j（Docker 或 Neo4j Desktop）。
- 用 n10s 导入第 03/04 集的 TTL：
  ```cypher
  CREATE CONSTRAINT n10s_unique_uri FOR (r:Resource) REQUIRE r.uri IS UNIQUE;
  CALL n10s.graphconfig.init();
  CALL n10s.rdf.import.fetch('file:///path/to/cloud_service_ontology.ttl', 'Turtle');
  ```
- Cypher 查询：
  ```cypher
  MATCH (s:ComputeService)-[:hasProvider]->(p:CloudProvider)
  RETURN p.label, count(s) ORDER BY count(s) DESC;
  ```

**课后作业**：
> 把前几集的本体导入 Neo4j，写出 3 个 Cypher 查询对应第 05 集的 CQ。

**配套 GitHub 资源**：
- `ep09/neo4j_import.cypher`
- `ep09/queries.cypher`
- `ep09/docker-compose.yml`

**预计时长**：12 分钟

**核验备注**：
- Neo4j n10s（Neosemantics）支持 Neo4j 5.14+，官方文档仍维护。
- 必须先创建 `Resource(uri)` 唯一约束并初始化 graphconfig，否则导入会报错。
- n10s 支持 Turtle/N-Triples/RDF/XML/JSON-LD/TriG/N-Quads。

---

### 2.3 第三季：LLM + 本体（第 10–13 集）

---

#### 第 10 集：《LLM 能帮我自动生成本体吗？》

**核心目标**：用 LLM 从文档生成 OWL/Turtle 草案，理解其能力与边界。

**知识点清单**：
- LLM 生成本体的工作流：文档分块 → 提取术语/关系 → 生成类/属性 → 人工校验 → 导入 Protégé。
- 提示词工程：给 LLM 明确输出格式（Turtle）、提供示例（few-shot）、约束命名空间。
- 典型问题：
  - 关系方向搞反（`subClassOf` 方向错误）
  - 遗漏关键约束
  - 编造不存在的属性/类
  - 命名空间混乱
- 人工在环（Human-in-the-loop）的重要性。

**演示素材**：
- 输入：一段 AWS EC2 产品描述（200 字）。
- 提示词要求输出 Turtle。
- 展示 LLM 生成的草案，然后在 Protégé 中打开，指出 3 处需要修改的地方。

**课后作业**：
> 选一篇技术博客/文档，用 LLM 生成一个 OWL 草案，在 Protégé 中修正后提交 PR。

**配套 GitHub 资源**：
- `ep10/prompt_template.md`
- `ep10/llm_generated.ttl`
- `ep10/revised.ttl`

**预计时长**：11 分钟

**核验备注**：
- LLMs4OL 2024/2025 挑战显示：Term Typing 与 Taxonomy Discovery 已较成熟，Non-taxonomic Relation Extraction 与盲测泛化仍是难点。
- OLLM（NeurIPS 2024）是端到端本体学习代表工作，但属于研究前沿，番外 E03 再深入。

---

#### 第 11 集：《本体质量怎么保证？SHACL 与 OOPS!》

**核心目标**：用 OOPS! 与 SHACL 自动检测本体错误，建立质量检查流水线。

**知识点清单**：
- OOPS!（OntOlogy Pitfall Scanner）：检测 41 类常见本体陷阱（P01 多义、P08 缺失注释、P10 缺失不相交声明、P41 未声明许可证等）。
- SHACL（Shapes Constraint Language）：W3C 标准，用于验证 RDF 图是否满足指定 shape。
- pySHACL、TopBraid SHACL API、Apache Jena SHACL。
- 质量检查流水线：OOPS!（静态 OWL 陷阱）→ SHACL（领域规则）→ 人工 review。

**演示素材**：
- 用 OOPS! Web 或 Docker 版扫描前几集本体，展示 P08/P41 等警告。
- 写一条 SHACL shape：
  ```turtle
  :ComputeServiceShape a sh:NodeShape ;
      sh:targetClass :ComputeService ;
      sh:property [
          sh:path :hasProvider ;
          sh:minCount 1 ;
          sh:maxCount 1 ;
      ] .
  ```
- 用 pySHACL 验证，展示违反结果。

**课后作业**：
> 给第 10 集 LLM 生成的本体添加 3 条 SHACL 约束并修复所有违反项。

**配套 GitHub 资源**：
- `ep11/shapes.ttl`
- `ep11/validate.py`（pySHACL）
- `ep11/oops_report.md`

**预计时长**：12 分钟

**核验备注**：
- OOPS! 当前版本主要检测 OWL/RDF 陷阱，**没有原生 SHACL 验证**。SHACL 需要 pySHACL / Jena / TopBraid 等专用工具。
- OOPS! 有 Docker 镜像 `mpovedavillalon/oops:v1`，可本地运行。

---

#### 第 12 集：《GraphRAG：用大模型查知识图谱》

**核心目标**：理解 GraphRAG 与 Text2Cypher/Text2SPARQL，能在 Neo4j 上跑通一个最小 GraphRAG。

**知识点清单**：
- 传统 RAG：向量相似度检索文本块。
- GraphRAG：先用 LLM 从文本构建知识图谱，再做社区摘要/实体/关系检索。
- Microsoft GraphRAG：From Local to Global（2024）。
- Text2Cypher：把自然语言转成 Cypher 查询 Neo4j。
- Text2SPARQL：把自然语言转成 SPARQL 查询 RDF 三元组存储。
- Neo4j GraphRAG Python 包 + Text2CypherRetriever（2024 年发布）。

**演示素材**：
- 用前几集构建的云服务知识图谱。
- 用 `neo4j-graphrag` + LLM 实现：
  - 用户问：“哪些 GPU 计算服务在亚太地区可用？”
  - LLM 生成 Cypher → 执行 → 把结果交给 LLM 生成自然语言答案。
- 展示查询失败案例：LLM 生成错误 Cypher，如何用 schema 提示词修正。

**课后作业**：
> 在 Neo4j 上为你的知识图谱实现一个 Text2Cypher 问答接口，至少支持 5 个问题。

**配套 GitHub 资源**：
- `ep12/graphrag_demo.py`
- `ep12/text2cypher_prompt.md`
- `ep12/failed_queries.md`（用于教学）

**预计时长**：12 分钟

**核验备注**：
- Microsoft GraphRAG 2024 年开源，论文《From Local to Global: A Graph RAG Approach to Query-Focused Summarization》。
- Neo4j 2024 年发布 Text2Cypher 2024v1 数据集（44,387 条 NL→Cypher）和 `neo4j-graphrag` Python 包。
- 注意区分：Microsoft GraphRAG 是“从文本建图再 RAG”；Neo4j Text2Cypher 是“已有图 + NL2Cypher”。

---

#### 第 13 集：《LLM 时代的本体对齐》

**核心目标**：了解 Agent-OM、LogMap-LLM 等 LLM 驱动的本体对齐方法，知道何时使用。

**知识点清单**：
- 本体对齐（Ontology Matching）：找两个本体之间的对应关系。
- OAEI（Ontology Alignment Evaluation Initiative）年度评测。
- 传统匹配器：基于字符串、结构、语义相似度。
- LLM 驱动匹配器：
  - Agent-OM：Retrieval Agent + Matching Agent，用 LLM 做候选排序与验证。
  - LogMap-LLM：LogMap 先给初步对齐，LLM 作为 Oracle 验证不确定的映射。
- 对齐关系不止等价： subclass、superclass、overlap、disjoint（OAEI 2025 BeyondEquivalence 新 track）。

**演示素材**：
- 展示两个小型云服务本体（AWS 版 vs Azure 版）。
- 用 LogMap/Agent-OM（若可运行）或展示其 OAEI 2025 结果截图。
- 讨论 LLM 对齐的边界：成本高、对 biomedical 大图慢、小模型容易混淆 subclass/superclass 方向。

**课后作业**：
> 找两个描述同一领域的不同 schema（如 Schema.org vs 自建本体），手动列出 10 条候选对齐，再与 LLM 输出对比。

**配套 GitHub 资源**：
- `ep13/alignment_candidates.csv`
- `ep13/README.md`（工具安装说明）

**预计时长**：11 分钟

**核验备注**：
- Agent-OM 论文发表于 PVLDB 2024/2025，2025 年首次参加 OAEI，有 Agent-OM 与 Agent-OM-Lite 两个变体。
- LogMap-LLM 核心论文 Accepted to EACL 2026，OAEI 2025 Bio-ML track 排名第二。
- OAEI 2025 新增 BeyondEquivalence track，评估等价之外的 5 种关系（≡、≥、≤、≈、⊘）。

---

### 2.4 第四季：项目实战与发布（第 14–16 集）

---

#### 第 14 集：《实战：从 0 构建一个云服务知识图谱》

**核心目标**：完整项目闭环，从需求、本体、抽取、存储到查询全部跑通。

**知识点清单**：
- 项目启动：用 CQ 驱动需求。
- 数据源：
  - 云服务商公开文档（AWS、Azure、GCP、阿里云/腾讯云公开页面）。
  - 定价页、区域列表、服务目录。
  - 注意版权与数据使用条款，只使用公开可访问文本。
- 本体设计：覆盖 Compute、Storage、Database、Networking、AI/ML、Pricing、Region。
- 抽取流水线：
  - 文档下载 → 文本清洗 → NER → OpenIE → 关系映射 → 人工校验 → RDF 生成。
- 导入 Neo4j 并用 n10s。
- 构建最小 GraphRAG 查询接口。

**演示素材**：
- 完整录屏：从空文件夹到 Neo4j 可查询图。
- 展示 `pipeline.py` 的 6 个阶段。
- 在 Neo4j Browser 中跑一个综合 Cypher：
  ```cypher
  MATCH (s:ComputeService)-[:hasRegion]->(r:Region)
  WHERE r.code STARTS WITH 'ap-'
  RETURN s.label, collect(r.code) LIMIT 20;
  ```

**课后作业**：
> Fork 项目仓库，替换为你关心的另一个领域，复现完整流水线。

**配套 GitHub 资源**：
- `ep14/` 项目主目录
- `ep14/pipeline.py`
- `ep14/data/`（清洗后的公开数据）
- `ep14/ontology/cloud_service.ttl`
- `ep14/README.md`（完整复现指南）

**预计时长**：12 分钟

---

#### 第 15 集：《如何评估你的知识图谱？》

**核心目标**：用 F1、CQ 覆盖率、OntoMetrics/NEOntometrics 等指标评估知识图谱质量。

**知识点清单**：
- 端到端评估 vs 组件级评估。
- 组件级：
  - 实体抽取 F1
  - 关系抽取 F1
  - 实体链接准确率
  - 本体一致性（HermiT/ELK）
- 本体级：
  - OntoMetrics / NEOntometrics：base/schema/graph/knowledgebase/class 指标。
  - OOPS! 陷阱扫描。
  - SHACL 违反率。
- 应用级：
  - CQ 覆盖率：能回答多少条预设问题。
  - GraphRAG 答案准确率（人工标注 50 问）。

**演示素材**：
- 对第 14 集的项目跑评估脚本，展示：
  - 抽取 F1 表格
  - NEOntometrics GraphQL API 调用示例
  - CQ 覆盖率雷达图
- 展示一个“不及格”指标，并说明如何改进。

**课后作业**：
> 为你的第 14 集项目写一份评估报告，包含至少 3 个指标和对应的改进计划。

**配套 GitHub 资源**：
- `ep15/evaluate.py`
- `ep15/metrics_report.md`
- `ep15/cq_coverage.csv`

**预计时长**：11 分钟

**核验备注**：
- NEOntometrics 是 OntoMetrics 的继任者，开源，提供 GUI 与 GraphQL API，支持多种质量框架（OntoQA、OQuaRE、oQual 等）。
- 2024 年 Nature 论文仍使用 OntoMetrics 指标（base/schema/graph）。

---

#### 第 16 集：《开源、投稿与持续维护》

**核心目标**：把项目以可引用、可复现、可持续的方式发布。

**知识点清单**：
- GitHub 仓库规范：
  - `README.md`、LICENSE、CONTRIBUTING、CODE_OF_CONDUCT
  - `CITATION.cff` 便于学术引用
  - `.zenodo.json` 控制 Zenodo 元数据
- Zenodo + GitHub 集成：每次 release 自动生成 DOI，实现 FAIR。
- 选择许可证：
  - 代码：MIT / Apache-2.0
  - 数据/本体：CC-BY-4.0 / CC0
- 投稿渠道：
  - 学术：ISWC、EKAW、Journal of Web Semantics、Semantic Web Journal
  - 技术博客：公众号、知乎、掘金、Dev.to
- 持续维护：Issue 模板、Discussion、版本发布节奏、依赖更新。

**演示素材**：
- 录屏：从 GitHub release → Zenodo DOI。
- 展示 `CITATION.cff` 与 `.zenodo.json` 示例。
- 给出适合本项目投稿的会议/期刊清单。

**课后作业**：
> 为你的第 14 集项目发布 v1.0.0，获取 Zenodo DOI，并写一条发布推文/动态。

**配套 GitHub 资源**：
- `ep16/CITATION.cff`
- `ep16/.zenodo.json`
- `ep16/CONTRIBUTING.md`
- `ep16/publish_checklist.md`

**预计时长**：10 分钟

**核验备注**：
- Zenodo–GitHub 集成会自动为每个 release 生成 DOI；`.zenodo.json` 优先级高于 `CITATION.cff`。
- 多个 ontology 项目已采用此模式（如 SSBD Ontology、SSbD Core Ontology、ODP-Reuse 数据集）。

---

## 3. 番外/第二季：8 集详细方案

> 番外集面向研究者与博士生，需要引用真实论文、说明争议点、给出延伸阅读。

---

#### E01：《2025 本体研究地图》

**核心目标**：给出 Semantic Web / Knowledge Graph in AI 的全景图，帮助听众定位后续集数。

**内容要点**：
- Semantic Web 栈：URI → RDF → RDFS → OWL → SPARQL → SHACL → SHex。
- 2025 年关键会议：ISWC、ESWC、EKAW、OM Workshop、AAAI Symposium。
- KG in AI Landscape：KG 作为 LLM 的外部记忆、约束层、可解释性来源。
- 研究领域地图：
  - 本体学习（Ontology Learning）
  - 本体对齐（Ontology Matching/Alignment）
  - 本体评估（Ontology Evaluation）
  - 本体与 LLM（Ontology + LLM / Neuro-symbolic AI）
  - 知识图谱构建与应用

**争议/边界**：
- “Semantic Web 已死”是常见误解；实际是基础设施化，不再以独立技术栈面目出现。

**延伸阅读**：
- Semantic Web Journal、ISWC 2024/2025 proceedings
- 《Knowledge Graphs》教科书（Hogan et al.）

**预计时长**：18 分钟

---

#### E02：《LLM for Ontology Engineering：自动化到哪一步？》

**核心目标**：基于 LLMs4OL 2024/2025 与相关论文，客观评估 LLM 在本体工程中的自动化边界。

**内容要点**：
- LLMs4OL 挑战：
  - 2024 三任务：Term Typing / Taxonomy Discovery / Non-Taxonomic Relation Extraction
  - 2025 四任务：新增 Text2Onto（Term/Type extraction）
- 2024/2025 结果：
  - Term Typing 已可达 F1 ≈ 0.99（WordNet 等通用域）
  - Taxonomy Discovery 表现良好
  - Non-taxonomic relation 与 blind-eval 仍是硬骨头
- 自动化边界：
  - LLM 适合草案生成、候选扩展、术语建议
  - 人类仍需验证关系方向、约束、命名空间、领域语义

**核心论文**：
- LLMs4OL 2024 Overview (arXiv:2409.10146)
- LLMs4OL 2025 Overview (DOI:10.52825/ocp.v6i.2913)

**争议/边界**：
- 论文中的高 F1 多来自“seen-eval”或特定域；跨域泛化仍差。

**预计时长**：16 分钟

---

#### E03：《端到端本体学习：OLLM 解析》

**核心目标**：深入讲解 NeurIPS 2024 论文 OLLM 的方法、指标与启示。

**内容要点**：
- 作者：Andy Lo, Albert Q. Jiang, Wenda Li, Mateja Jamnik（Cambridge / Edinburgh）
- 核心思想：不拆分子任务，直接端到端生成子图再合并剪枝。
- 模型：Mistral 7B v0.2 + LoRA。
- 数据集：Wikipedia categories、arXiv taxonomy。
- 评估指标：Fuzzy F1、Continuous F1、Graph F1、Motif Distance。
- 结果：OLLM 在语义与结构指标上超过 Hearst patterns、REBEL、prompting baseline。

**核心论文**：
- End-to-End Ontology Learning with Large Language Models (NeurIPS 2024, arXiv:2410.23584)
- 代码：https://github.com/andylolu2/ollm

**争议/边界**：
- 端到端方法好但训练成本高；对中小规模领域本体是否必要仍需讨论。

**预计时长**：17 分钟

---

#### E04：《本体对齐的 Agent 时代》

**核心目标**：讲解 Agent-OM 与 OAEI 2025 对齐评测，说明 LLM Agent 如何改变对齐流程。

**内容要点**：
- OAEI 2025 概览。
- Agent-OM 架构：
  - Retrieval Agent：抽取实体元数据，存到关系+向量混合数据库。
  - Matching Agent：RRF 排序 + LLM 验证候选。
- Agent-OM vs Agent-OM-Lite（商用 LLM vs 本地 Llama-3-8b）。
- 2025 参加的 tracks：anatomy、conference、multifarm、bio-ml、biodiv、dh、arch-multiling、ce。

**核心论文**：
- Agent-OM: Leveraging LLM Agents for Ontology Matching (PVLDB 2024/2025, arXiv:2312.00326)
- Agent-OM Results for OAEI 2025 (CEUR-WS Vol.4144, paper 11)

**争议/边界**：
- Agent-OM 在 biomedical 大本体上计算昂贵，因为每个实体都提取 syntactic/lexical/semantic 信息。
- 小模型（Llama-3-8b）会混淆 subclass/superclass 方向。

**预计时长**：16 分钟

---

#### E05：《Beyond Equivalence：对齐不只是找等价》

**核心目标**：介绍 OAEI 2025 新 track BeyondEquivalence，拓展听众对“对齐关系”的认知。

**内容要点**：
- 传统对齐只关注 `owl:equivalentClass`/`owl:equivalentProperty`。
- BeyondEquivalence track 评估 5 种关系：
  - Equivalence (≡)
  - Superclass_of (≥)
  - Subclass_of (≤)
  - Overlap (≈)
  - Disjoint (⊘)
- 数据集：10 个，来自工业产品分类标准（GPC/UNSPSC/ETIM/eClass）与 STROMA/TaSeR 测试用例。
- 结果：多数系统仍难以检测非等价关系；MDMapper 表现相对较好。

**核心论文/来源**：
- OAEI 2025 BeyondEquivalence track page
- Results of the Ontology Alignment Evaluation Initiative 2025 (CEUR-WS Vol.4144)

**争议/边界**：
- 非等价对齐在真实企业集成中极其重要，但评测数据仍偏少。

**预计时长**：15 分钟

---

#### E06：《ShEx 与 KG 模式生成》

**核心目标**：讲解 ShEx 与 LLM 生成 KG schema 的最新工作（YAGOS/WES 基准）。

**内容要点**：
- SHACL vs ShEx：都是 RDF 约束语言，语法与生态不同。
- ShEx（Shape Expressions）用于描述 RDF 图 shape。
- EMNLP 2025 Findings 论文《Schema Generation for Large Knowledge Graphs Using Large Language Models》：
  - 作者：Bohui Zhang, Yuan He, Lydia Pintscher, Albert Meroño-Peñuela, Elena Simperl
  - 基准：YAGOS（YAGO 4.5，36 类/678 约束） + WES（Wikidata EntitySchema，50 类/1874 约束）
  - 86 ShEx schemas，2552 约束，330 万+实例
  - 评估：Exact F1、子类松弛、数据类型松弛、基数松弛、NGED
- 结果：GPT-4o mini 在 YAGOS 表现最好；DeepSeek-V3 global 在 WES 综合最佳；松弛匹配下 F1 可达 0.839。

**核心论文**：
- Schema Generation for Large Knowledge Graphs Using Large Language Models (EMNLP 2025 Findings)

**争议/边界**：
- 完全自动生成 ShEx 仍不成熟；最佳策略是 LLM 生成草案 + 专家修正。

**预计时长**：17 分钟

---

#### E07：《神经符号 AI：本体如何喂给大模型？》

**核心目标**：讲解 GraphRAG、Logic-Augmented Generation 等神经符号方法。

**内容要点**：
- Neuro-symbolic AI 定义：神经网络 + 符号推理/知识。
- GraphRAG：用 KG 结构增强 RAG，Microsoft 2024。
- Logic-Augmented Generation (LAG)：
  - Gangemi & Nuzzolese (Journal of Web Semantics, 2025)：Semantic Knowledge Graphs + LLMs as Reactive Continuous Knowledge Graphs。
  - 用 SKG 作为逻辑/事实边界约束 LLM 生成。
- 另一支 LAG（Xiao et al., 2025）：逻辑分解 + 原子记忆库 + logical terminator 的 RAG。
- 本体在其中的角色：约束层、可解释性来源、一致性校验器。

**核心论文**：
- From Local to Global: A Graph RAG Approach to Query-Focused Summarization (Microsoft, 2024)
- Logic Augmented Generation (Gangemi & Nuzzolese, arXiv:2411.14012 / JoWS 2025)
- LAG: Logic-Augmented Generation from a Cartesian Perspective (arXiv:2508.05509)

**争议/边界**：
- LAG 有两组独立作者在用同名概念，需向听众说明差异。

**预计时长**：18 分钟

---

#### E08：《未来 5 年本体研究往哪走？》

**核心目标**：趋势预测、研究机会、给研究者/博士生的建议。

**内容要点**：
- 趋势 1：从“手工建本体”到“人机协同本体工程”。
- 趋势 2：本体对齐从等价走向丰富关系（BeyondEquivalence）。
- 趋势 3：LLM 作为本体匹配/学习/评估的组件，而非替代专家。
- 趋势 4：ShEx/SHACL 等模式语言与 LLM schema 生成结合。
- 趋势 5：工业界 KG 应用从“搜索/推荐”扩展到“合规/审计/供应链”。
- 研究机会：
  - 多模态本体学习（图文共同抽取）
  - 本体演化与版本控制
  - 本体解释性/可信赖 AI
  - 中文/低资源语言本体工具

**争议/边界**：
- 明确说明这是基于 2024–2025 年会议/论文的预测，不是事实。

**预计时长**：18 分钟

---

## 4. 多平台分发执行模板

### 4.1 平台矩阵

| 平台 | 形式 | 节奏 | 特殊要求 |
|------|------|------|---------|
| B站 | 完整视频 16:9 | 每周一首发 | 封面 1146×717，标题带编号，标签 #知识图谱 #本体 #AI |
| YouTube | 完整视频 + 英文字幕 | 与 B站同步或晚 1 天 | 标题英文，描述中英双语，字幕 SRT |
| 视频号 | 1 分钟预告/金句 9:16 | 每集上线前 2 天发预告 | 前三秒必须有钩子 |
| 公众号 | 文字稿 + 关键截图 | 视频发布后 1 天内 | 排版用 Markdown/秀米 |
| 知乎 | 专栏文章 + 代码块 | 与公众号同步或拆分 | 强调“为什么”与“怎么做” |
| 掘金 | 技术文章（偏代码） | 主线集优先 | 代码高亮，提供可运行示例 |
| GitHub | 代码/数据/课件/Release | 每集同步更新 | 用 Issue/Discussion 收集反馈 |

### 4.2 每集分发清单

```markdown
- [ ] B站：上传完整视频 + 封面 + 简介 + 标签 + 分章节
- [ ] YouTube：上传 + 英文字幕 + 英文标题/描述
- [ ] 视频号：剪辑 1 条预告（竖屏）+ 1 条金句（竖屏）
- [ ] 公众号：文字稿 + 插图 + 代码链接
- [ ] 知乎：专栏稿（可拆分上下篇）
- [ ] 掘金：代码详解版
- [ ] GitHub：合并当集代码到 main，更新 README
- [ ] 社群/朋友圈：发布动态（含 B站/公众号链接）
```

### 4.3 标题与描述模板

**B站/YouTube 标题**：
```
【本体工程与知识图谱实战】EP01 | 本体到底解决什么问题？
```

**视频号文案**：
```
“同一个词，在不同系统里意思完全不一样——这就是本体工程要解决的第一个问题。”
完整版 10 分钟视频已上线，点击主页观看。
#知识图谱 #本体工程 #AI
```

**公众号标题**：
```
EP01 笔记：本体到底解决什么问题？（附 3 个真实案例）
```

### 4.4 封面与品牌规范

- 主色调：深蓝 (#1E3A5F) + 橙 (#F4A261)，体现理性+活力。
- 字体：封面用 Noto Sans SC / Noto CJK（见 [[podcast-video-font-fallback]] 记忆）。
- 片头：5 秒，显示系列名 + 集数 + 标题。
- 片尾：3 秒，GitHub 链接 + 公众号二维码占位。

---

## 5. 项目载体：云服务选型知识图谱

### 5.1 项目定位

**名称**：`cloud-service-kg`（暂定）
**目标**：构建一个公开、可复现、可引用的中文/英文双语云服务选型知识图谱。
**理由**：
- 开发者熟悉云服务，降低理解门槛。
- 数据公开（厂商文档、定价页、区域列表）。
- 对齐关系明确（不同厂商的同类服务易于对比）。
- 能自然演示 NER、OpenIE、LLM 抽取、GraphRAG。

### 5.2 核心本体（草案）

```turtle
@prefix : <https://example.org/cloud-service-kg#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

:CloudProvider a owl:Class ;
    rdfs:label "Cloud Provider" .

:CloudService a owl:Class ;
    rdfs:label "Cloud Service" .

:ComputeService rdfs:subClassOf :CloudService .
:StorageService rdfs:subClassOf :CloudService .
:DatabaseService rdfs:subClassOf :CloudService .
:NetworkingService rdfs:subClassOf :CloudService .
:MLService rdfs:subClassOf :CloudService .

:hasProvider a owl:ObjectProperty ;
    rdfs:domain :CloudService ;
    rdfs:range :CloudProvider .

:hasRegion a owl:ObjectProperty ;
    rdfs:domain :CloudService ;
    rdfs:range :Region .

:hasAccessTier a owl:ObjectProperty ;
    rdfs:domain :StorageService .

:monthlyPriceUsd a owl:DatatypeProperty ;
    rdfs:domain :CloudService ;
    rdfs:range xsd:decimal .

:hasGPU a owl:DatatypeProperty ;
    rdfs:domain :ComputeService ;
    rdfs:range xsd:boolean .
```

### 5.3 数据来源与使用边界

| 数据类型 | 来源示例 | 使用方式 |
|---------|---------|---------|
| 服务列表 | AWS/Azure/GCP/阿里云/腾讯云 服务目录页 | 仅使用公开可见的文本，不抓登录后内容 |
| 定价 | 厂商公开定价页 | 仅作示例，不保证实时准确 |
| 区域 | 厂商公开 region 列表 | 用于演示 |
| 文档片段 | 厂商公开文档 | 用于 NER/OpenIE 演示 |

**合规提醒**：
- 不抓取受版权保护的长文档全文；优先使用公开 API 或手动摘录 200 字以内片段。
- 数据集标注 `data_source` 与 `last_updated`。
- 最终数据以 CC-BY-4.0 发布（需符合各厂商商标使用条款，不暗示官方背书）。

### 5.4 Competency Questions（项目级）

1. 哪些计算服务支持 GPU 实例？
2. 对象存储服务在亚太地区有哪些？
3. 关系型数据库的托管模式是什么（PaaS / IaaS / Serverless）？
4. 哪些服务提供免费额度？
5. 同规格下不同厂商计算服务月费对比。
6. 服务 A 的数据能否通过托管服务迁移到服务 B？

### 5.5 评估方案

| 层级 | 指标 | 目标值（v1.0.0） |
|------|------|-----------------|
| 本体一致性 | HermiT 无不一致 | 100% 通过 |
| OOPS! 扫描 | Critical/Important 陷阱数为 0 | 通过 |
| SHACL 验证 | 核心 shape 违反率 < 5% | < 5% |
| CQ 覆盖率 | 6 条核心 CQ 均可回答 | 6/6 |
| GraphRAG 准确率 | 50 问人工评估 Top-1 正确率 | ≥ 70% |
| NEOntometrics | 关键 schema/graph 指标记录 | 有基线报告 |

---

## 6. 生产流水线与里程碑

### 6.1 单集生产模板

每个 GitHub Issue 使用以下模板：

```markdown
## EPxx: 标题
- 目标时长：xx 分钟
- 预计发布日期：YYYY-MM-DD

### 阶段 1：研究（Day 1-2）
- [ ] 验证技术/论文真实性
- [ ] 列出 5 个关键引用

### 阶段 2：脚本（Day 3-4）
- [ ] 写 1500-2000 字讲稿
- [ ] 设计 3 个演示点
- [ ] 生成插图

### 阶段 3：代码/演示（Day 5-6）
- [ ] 准备可运行代码
- [ ] 本地录制 Protégé/Neo4j 屏幕

### 阶段 4：配音与剪辑（Day 7-8）
- [ ] omlx TTS 配音
- [ ] 剪辑 + 字幕

### 阶段 5：发布（Day 9）
- [ ] 多平台分发清单
- [ ] GitHub 合并
```

### 6.2 关键里程碑

| 时间 | 里程碑 |
|------|--------|
| 第 1 周 | 发布 EP01，建立 GitHub 仓库与多平台账号 |
| 第 4 周 | 第一季完（EP01-04），收集反馈调整第二季 |
| 第 9 周 | 第二季完（EP05-09），启动云服务 KG 项目 |
| 第 13 周 | 第三季完（EP10-13），GraphRAG demo 上线 |
| 第 16 周 | 第四季完（EP14-16），项目发布 v1.0.0 + Zenodo DOI |
| 第 17 周+ | 进入番外/第二季，每月 1–2 集 |

---

## 7. 内容对抗性验证报告

本方案中所有关键工具、论文、评测均经过检索验证。以下是主要核验结论：

| 项目 | 原方案说法 | 核验结果 | 需要修正的说明 |
|------|-----------|---------|---------------|
| Protégé 版本 | 安装 Protégé | ✅ Protégé 5.6.9 为当前最新稳定版，支持 Java 11–25 | 安装教程需区分平台版与独立版 |
| HermiT/Pellet | 用 HermiT/Pellet 做推理 | ✅ Protégé 仍支持 HermiT、Pellet；ELK 0.6.0 已捆绑 | HermiT/Pellet 需从插件市场安装 |
| OOPS! + SHACL | OOPS! 与 SHACL 共同保证质量 | ⚠️ OOPS! 不原生支持 SHACL，SHACL 需 pySHACL/Jena/TopBraid | 分两条流水线说明 |
| Agent-OM | LLM Agent 对齐 | ✅ PVLDB 2024/2025，OAEI 2025 首次参加 | 区分 Agent-OM 与 Agent-OM-Lite |
| LogMap-LLM | LLM 驱动的 LogMap | ✅ EACL 2026 接受，OAEI 2025 Bio-ML #2 | 主要论文尚未正式发表，需说明状态 |
| LLMs4OL | LLM for Ontology Learning 挑战 | ✅ ISWC 2024/2025 挑战，2025 新增 Text2Onto | 结果来自挑战论文 |
| OLLM | 端到端本体学习 | ✅ NeurIPS 2024，arXiv:2410.23584，代码开源 | 属于研究前沿，方法较复杂 |
| OAEI BeyondEquivalence | 对齐不只是等价 | ✅ OAEI 2025 新 track，5 种关系，10 数据集 | 多数系统表现仍差 |
| ShEx/YAGOS/WES | ShEx 与 KG 模式生成 | ✅ EMNLP 2025 Findings，YAGOS+WES 基准 | 论文较新，数据集需确认可下载 |
| GraphRAG | 用大模型查知识图谱 | ✅ Microsoft 2024 开源，有论文 | 区分“建图再 RAG”与“已有图 NL2Cypher” |
| Neo4j Text2Cypher | Text2Cypher | ✅ Neo4j 2024 数据集 + neo4j-graphrag 包 | 闭源 API 效果仍优于微调模型 |
| n10s RDF 导入 | Neo4j 导入 RDF | ✅ n10s/Neosemantics 支持 Neo4j 5.14+ | 必须先建约束 + graphconfig |
| OntoMetrics | 评估本体 | ✅ NEOntometrics 为当前继任者 | 原 OntoMetrics 仍可引用 |
| Zenodo DOI | 发布 DOI | ✅ Zenodo–GitHub 集成可自动生成 DOI | 需配置 `.zenodo.json` |
| Logic-Augmented Generation | 神经符号 AI | ✅ Gangemi & Nuzzolese 2025 JoWS；另有同名 Xiao et al. 2025 | 需说明同名不同团队 |

### 7.1 仍未完全确认的风险点

1. **OAEI 2025 部分结果**：OAEI 2025 官方结果页与 CEUR-WS 论文已公开，但具体 F1 数值可能随最终版更新。
2. **ShEx/YAGOS/WES 数据集**：EMNLP 2025 Findings 论文已确认，但数据集公开下载地址需在项目启动时再次核对。
3. **云服务数据版权**：需确保只使用公开文本片段，并标注来源与时间戳。
4. **ollx TTS 可用性**：根据记忆，ollx 服务器 503 曾导致配音卡住，制作前需确认服务状态或准备备选 TTS。

---

## 8. 附录：已核验资源清单

### 8.1 工具与官方链接

| 工具 | 类型 | 官方链接 |
|------|------|---------|
| Protégé | 本体编辑器 | https://protege.stanford.edu/software/ |
| HermiT | OWL 推理机 | Protégé 插件市场 |
| Pellet | OWL 推理机 | Protégé 插件市场 |
| ELK | OWL 2 EL 推理机 | 已捆绑于 Protégé 5.6.0+ |
| Neo4j | 图数据库 | https://neo4j.com/ |
| n10s / Neosemantics | RDF→Neo4j 插件 | https://neo4j.com/labs/neosemantics/ |
| OOPS! | 本体陷阱扫描 | https://oops.linkeddata.es/ |
| pySHACL | SHACL 验证（Python） | https://github.com/RDFLib/pySHACL |
| rdflib | Python RDF 库 | https://rdflib.readthedocs.io/ |
| spaCy | NLP/NER | https://spacy.io/ |
| Stanford CoreNLP OpenIE | 关系抽取 | https://stanfordnlp.github.io/CoreNLP/openie.html |
| Microsoft GraphRAG | 图 RAG | https://microsoft.github.io/graphrag/ |
| neo4j-graphrag | Neo4j GraphRAG Python 包 | https://github.com/neo4j-graphrag/neo4j-graphrag-python |
| NEOntometrics | 本体指标 | https://github.com/achiminator/NEOntometrics |
| Zenodo | DOI 存档 | https://zenodo.org/ |

### 8.2 关键论文与来源

| 论文/来源 | 作者/机构 | 年份 | 链接 |
|-----------|----------|------|------|
| Agent-OM: Leveraging LLM Agents for Ontology Matching | Qiang, Wang, Taylor | 2024/2025 | https://arxiv.org/abs/2312.00326 |
| Agent-OM Results for OAEI 2025 | Qiang et al. | 2025 | https://ceur-ws.org/Vol-4144/om2025-oaei-paper11.pdf |
| Large Language Models as Oracles for Ontology Alignment | Lushnei et al. | 2026 | https://arxiv.org/abs/（EACL 2026 接受） |
| LogMap Family welcomes LogMapLLM in the OAEI 2025 | City, University of London | 2025 | https://ceur-ws.org/Vol-4144/om2025-oaei-paper7.pdf |
| End-to-End Ontology Learning with Large Language Models | Lo, Jiang, Li, Jamnik | 2024 | https://arxiv.org/abs/2410.23584 |
| LLMs4OL 2024 Overview | Giglou, D’Souza, Auer | 2024 | https://arxiv.org/abs/2409.10146 |
| LLMs4OL 2025 Overview | Giglou et al. | 2025 | https://doi.org/10.52825/ocp.v6i.2913 |
| Results of OAEI 2025 | OAEI | 2025 | https://ceur-ws.org/Vol-4144/om2025-oaei-paper0.pdf |
| OAEI 2025 BeyondEquivalence | OAEI | 2025 | https://oaei.ontologymatching.org/2025/beyondequivalence/ |
| Schema Generation for Large KGs Using LLMs | Zhang et al. | 2025 | https://aclanthology.org/2025.findings-emnlp.671 |
| From Local to Global: A Graph RAG Approach | Edge et al. (Microsoft) | 2024 | https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/ |
| Logic Augmented Generation | Gangemi, Nuzzolese | 2025 | https://arxiv.org/abs/2411.14012 |
| NEOntometrics | Achiminator et al. | 2023/2024 | https://doi.org/10.4230/tgdk.2.2.2 |
| A Review and Comparison of Competency Question Engineering Approaches | Alharbi et al. | 2024 | https://livrepository.liverpool.ac.uk/3184940/1/EKAW2024-2.pdf |
| A RAG Approach for Generating Competency Questions | Pan et al. | 2024 | https://arxiv.org/abs/2409.08820 |

### 8.3 数据集与代码库

| 名称 | 说明 | 链接 |
|------|------|------|
| OLLM code | Cambridge 端到端本体学习 | https://github.com/andylolu2/ollm |
| Agent-OM code | OAEI 2025 alignments | https://github.com/qzc438/ontology-llm |
| LogMap-LLM code | City AI | https://github.com/city-artificial-intelligence/logmap-llm |
| Microsoft GraphRAG | 开源实现 | https://github.com/microsoft/graphrag |
| Neo4j Text2Cypher 2024v1 | 44k NL→Cypher | https://huggingface.co/datasets/neo4j/text2cypher-2024v1 |
| neo4j-labs/text2cypher | 数据集与微调指南 | https://github.com/neo4j-labs/text2cypher |
| NEOntometrics | 本体指标工具 | https://github.com/achiminator/NEOntometrics |

---

## 9. 后续建议

1. **立即执行**：创建 GitHub 仓库 `cloud-service-kg`，设置 Issue 模板与 README 骨架。
2. **第一周**：完成 EP01 脚本、PPT、代码、配音、剪辑、多平台发布。
3. **每月复盘**：根据播放数据与 GitHub star/issue 调整后续集数深度与时长。
4. **建立反馈闭环**：每集结尾引导观众在 GitHub Discussion 提交 CQ 或纠错。
5. **提前准备备选 TTS**：鉴于 omlx 历史 503 问题，准备本地 Piper/TTS 备选方案。

---

*本方案由 Claude Code 生成，关键工具与论文已通过网络检索进行对抗性验证。制作前请再次确认工具最新版本与数据使用条款。*
