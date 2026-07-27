# 前置研究包：《RDF 三元组：知识的原子单位》

## 主题

《本体工程与知识图谱实战》系列第 02 集：RDF 三元组、URI、图模型。

## 目标受众

开发者、研究生、技术工程师。已经理解"为什么需要本体"，现在进入"本体用什么格式表达"。

## 核心角度

把 RDF 三元组比作"知识的原子单位"——单个三元组很渺小，但大量三元组按图模型连接起来，就能构成知识图谱这座"分子/物质"。

## 关键概念

### 1. RDF 三元组（Triple）

- 由 **主语（Subject）、谓语（Predicate）、宾语（Object）** 组成。
- 形式：`<主语> <谓语> <宾语>`
- 一个三元组 = 图中的一条有向边：从主语节点指向宾语节点，边上写着谓语标签。
- 示例：`ex:Bob ex:knows ex:Alice` 表示"Bob 认识 Alice"。

### 2. URI / IRI

- URI（统一资源标识符）是 RDF 中的"全球唯一身份证"。
- 每个实体、属性、类都用 URI 标识，避免同名歧义。
- 示例：`http://dbpedia.org/resource/Leonardo_da_Vinci`
- IRI 是 URI 的国际化扩展，支持非 ASCII 字符。

### 3. 图模型

- RDF 数据本质上是一个**有向标记图**。
- 节点：资源（URI）或字面量。
- 边：谓语（必须是 URI）。
- 多个三元组共享同一个 URI 主语/宾语时，图就连接起来了。

### 4. 字面量（Literal）

- 表示字符串、数字、日期等标量值。
- 示例：`"Mona Lisa"`、`"1990-07-04"^^xsd:date`、`"Léonard"@fr`
- 字面量只能做宾语，不能做主语或谓语。

### 5. Turtle 序列化

- 最常用、最可读的 RDF 文本格式。
- 语法糖：
  - `a` = `rdf:type`
  - `;` = 同一主语的多个谓语
  - `,` = 同一主语+谓语的多个宾语
  - `PREFIX` 声明命名空间

```turtle
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

ex:Bob a foaf:Person ;
    foaf:name "Bob" ;
    foaf:knows ex:Alice .
```

### 6. RDF vs 关系数据库

- 数据库表：固定 schema，行和列。
- RDF：灵活的图模型，关系即数据。
- RDF 更适合表达复杂、 evolving 的语义关系。

### 7. RDF 与知识图谱

- 单个三元组是"原子"。
- 成千上万个三元组按图连接，构成知识图谱。
- 查询语言：SPARQL（下几集会讲）。

## 本集要留下的认知

1. RDF 三元组是知识的最小表达单位：主谓宾。
2. URI 是 RDF 的"身份证"，让机器全球唯一地识别事物。
3. RDF 的图模型天然适合表达关系型知识。
4. Turtle 是开发者最友好的 RDF 写法。

## 参考素材

- W3C RDF 1.1 Primer: https://w3org.cn/TR/rdf-primer/
- W3C RDF 1.1 Concepts: https://w3org.cn/TR/rdf-concepts/
- W3C RDF 1.1 Turtle: https://w3org.cn/TR/turtle/
- W3C RDF 1.2 Primer: https://w3org.cn/TR/rdf12-primer/
