# EP05 推理实验：预期结果

## 实验一：自动归类

在 Protégé 中打开 `project/ontology/reasoning_demo.ttl`，选择 **Reasoner → HermiT**，然后选择 **Reasoner → Start reasoner**（macOS 可使用 `Command+R`）。

`Demo_GPU_Service` 只显式声明了以下事实：

- 类型是 `ComputeService`
- `hasRegion` 指向 `Tokyo`
- `hasGPU` 的值为 `true`

启动推理后，预期得到三个额外类型：

- `CloudService`：来自 `ComputeService rdfs:subClassOf CloudService`
- `RegionalComputeOffering`：来自等价类定义中的 `hasRegion some Region`
- `GPUComputeOffering`：来自等价类定义中的 `hasGPU value true`

注意：`hasGPU some xsd:boolean` 只要求存在一个布尔值，`false` 也满足，因此不能表达“支持 GPU”。

## 实验二：定位不一致

单独打开 `project/ontology/inconsistent_example.ttl` 并启动 HermiT。预期本体被报告为不一致。

最小冲突由三条公理组成：

1. `ComputeService disjointWith StorageService`
2. `Broken_Service rdf:type ComputeService`
3. `Broken_Service rdf:type StorageService`

这里的矛盾来自本体自己的建模决定，并不表示现实中的混合服务一定不可能。若业务允许同一产品同时承担计算和存储职责，应删除互斥公理或调整分类方式。

## 语义边界

- OWL 采用开放世界假设：缺失一条事实，不代表该事实为假。
- OWL 不默认不同名称指向不同个体；需要时使用 `owl:differentFrom`。
- 推理器回答“哪些结论被公理蕴含、知识是否自洽”；SHACL 回答“数据是否符合规定的形状”。两者不能互相替代。
