# 云服务选型知识图谱 Competency Questions

> 版本：v0.1  
> 状态：EP03 建模输入  
> 作用：定义本体的功能需求、范围、数据需求与后续查询验收标准。

## 使用约定

- **Must-have**：缺少答案就无法完成项目的核心交付。
- **Should-have**：价值较高，但允许在核心模型稳定后补充。
- **Nice-to-have**：探索性较强、数据成本较高或依赖外部证据。
- “可回答”表示能够给出规定格式的结果并说明数据日期，不把空结果自动解释为否定答案。

## 核心 CQ

| ID | 优先级 | Competency Question | 预期答案形式 | 所需数据 | 候选本体元素 |
|---|---|---|---|---|---|
| CQ-01 | Must | 哪些计算服务支持 GPU，并在东京或新加坡区域可用？ | 服务、厂商、区域列表 | 服务类型、GPU 支持、可用区域、厂商 | `ComputeService`、`CloudProvider`、`Region`、`hasGPU`、`hasRegion`、`hasProvider` |
| CQ-02 | Must | 哪些对象存储服务在亚太区域可用，并提供哪些访问层级？ | 服务、厂商、区域、访问层级列表 | 服务类型、区域、访问层级、厂商 | `StorageService`、`AccessTier`、`hasRegion`、`hasAccessTier`、`hasProvider` |
| CQ-03 | Must | 每个关系型数据库服务采用哪种托管模式？ | 服务与托管模式映射 | 数据库类型、托管模式、厂商 | `DatabaseService`、`ManagementModel`、`hasManagementModel`、`hasProvider` |
| CQ-04 | Should | 哪些云服务提供公开免费额度，数据最后更新于何时？ | 服务、免费额度状态、更新时间列表 | 免费额度、更新时间、证据来源 | `CloudService`、`hasFreeTier`、`lastUpdated`、`dataSource` |
| CQ-05 | Should | 在相同规格、同一区域、同一计费周期和美元口径下，哪些计算服务月费低于给定预算？ | 可比服务列表与价格升序 | 规格基线、区域、月费、币种、计费周期、价格日期 | `ComputeService`、`Region`、`monthlyPriceUsd`，以及待补充的规格与价格口径 |
| CQ-06 | Nice | 从服务 A 到服务 B 是否存在有公开证据支持的托管数据迁移路径？ | 有向路径、迁移服务与证据；无证据时返回未知 | 迁移方向、支持范围、来源、更新时间 | `CloudService`、`canMigrateTo`、`dataSource`、`lastUpdated` |

## Must-have 数据追踪

| CQ | 必需数据字段 | 建议来源 | 缺失时的处理 |
|---|---|---|---|
| CQ-01 | 服务类型、`hasGPU`、`hasRegion`、`hasProvider` | 厂商服务目录、GPU 规格页、区域列表 | 标为数据缺口，不把缺失解释为不支持 |
| CQ-02 | 服务类型、`hasRegion`、`hasAccessTier`、`hasProvider` | 对象存储产品页、区域与访问层级文档 | 允许先回答区域，访问层级标为待补 |
| CQ-03 | 服务类型、`hasManagementModel`、`hasProvider` | 数据库产品说明与部署模式文档 | 无明确证据时返回未知 |

## 从 CQ 到查询测试

每条 CQ 后续至少配套以下内容：

1. 一条 SPARQL 查询或可执行的查询模板。
2. 查询所依赖的类、属性与数据字段清单。
3. 一个小型固定测试数据集。
4. 预期答案形式与至少一个正例。
5. 空结果的解释：确实没有、模型缺失、数据缺失或查询错误。

## 评审清单

- [ ] 问题中的对象、关系和限定条件是否明确？
- [ ] 是否仍包含未定义的“最好”“合适”“便宜”等词？
- [ ] 是否指定了区域、时间、币种或计费口径等必要边界？
- [ ] 所需数据是否可以列出来源与更新时间？
- [ ] 预期答案是列表、布尔值、排序、数量还是路径？
- [ ] 每条 Must-have CQ 是否都能追踪到明确的数据需求？
- [ ] 无数据时是否返回“未知”，而不是擅自回答“否”？

