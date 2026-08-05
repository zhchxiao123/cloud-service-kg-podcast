# EP05｜OWL 与推理：机器究竟推断出了什么？

这一集把前面搭好的类、属性和实例交给推理器，观察显式事实如何变成隐式知识，并用一个最小冲突案例学习定位不一致的来源。

## 本集目标

- 区分 asserted facts 与 inferred facts
- 理解 `subClassOf`、`equivalentClass`、`disjointWith`
- 用 `someValuesFrom` 表达“至少存在一个”
- 理解开放世界假设与非唯一名称假设
- 在 Protégé 中运行 HermiT 并解释自动归类和不一致结果
- 区分 OWL 推理与 SHACL 数据校验

## 实践产物

- `project/ontology/reasoning_demo.ttl`
- `project/ontology/inconsistent_example.ttl`
- `project/docs/reasoning-expected-results.md`

## 验收标准

学习者能指出 `Demo_GPU_Service` 被自动归为 `GPUComputeOffering` 的公理链，并能指出导致 `Broken_Service` 冲突的三条具体公理。

下一集将使用 SPARQL 把 Competency Questions 变成可执行查询。
