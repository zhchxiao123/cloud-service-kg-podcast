# 云服务选型知识图谱项目文档

## 项目目标

构建一个公开、可复现、可引用的中文/英文双语云服务选型知识图谱，作为《本体工程与知识图谱实战》第 14 集的实战载体。

## 目录

- `ontology/`：本体文件（Turtle / OWL / SHACL）
- `data/`：清洗后的公开数据
- `src/`：抽取与构建流水线
- `tests/`：测试与评估脚本
- `notebooks/`：Jupyter 演示
- `eval/`：评估报告

## Competency Questions

1. 哪些计算服务支持 GPU 实例？
2. 对象存储服务在亚太地区有哪些？
3. 关系型数据库的托管模式是什么？
4. 哪些服务提供免费额度？
5. 同规格下不同厂商计算服务月费对比。
6. 服务 A 的数据能否通过托管服务迁移到服务 B？

## 快速开始

```bash
cd project
python -m pytest tests/
python src/pipeline.py build --ontology ontology/cloud_service.ttl --output data/kg.ttl
python src/pipeline.py stats data/kg.ttl
```

## 数据来源

- 云厂商公开服务目录与文档（仅使用公开可见文本片段）
- 定价页（仅作示例，不保证实时准确）
- 区域列表页

所有数据均标注 `cskg:dataSource` 与 `cskg:lastUpdated`。

## 评估指标（v1.0.0 目标）

| 层级 | 指标 | 目标 |
|------|------|------|
| 本体一致性 | HermiT/ELK 无不一致 | 100% 通过 |
| OOPS! 扫描 | Critical/Important 陷阱数为 0 | 通过 |
| SHACL 验证 | 核心 shape 违反率 < 5% | < 5% |
| CQ 覆盖率 | 6 条核心 CQ 均可回答 | 6/6 |
| GraphRAG 准确率 | 50 问人工评估 Top-1 正确率 | ≥ 70% |
