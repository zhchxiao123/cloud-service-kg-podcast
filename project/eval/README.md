# 评估报告

本项目评估报告将在 EP15 发布后持续更新。

## 当前基线（v0.1.0-alpha）

| 指标 | 状态 | 备注 |
|------|------|------|
| 本体一致性 | ⏳ 待运行 | 待加入 HermiT/ELK 一致性检查 |
| OOPS! 扫描 | ⏳ 待运行 | 待接入 OOPS! Docker 或 REST API |
| SHACL 验证 | ✅ 已通过 | `project/tests/test_ontology.py` |
| CQ 覆盖率 | ⏳ 待统计 | 当前仅 6 条 CQ 定义 |
| GraphRAG 准确率 | ⏳ 待评估 | 待构建查询接口与测试集 |
| NEOntometrics | ⏳ 待接入 | 待加入 NEOntometrics API 调用 |

## 运行评估

```bash
cd project
python -m pytest tests/
python src/pipeline.py build --ontology ontology/cloud_service.ttl --output data/kg.ttl
python src/pipeline.py stats data/kg.ttl
```

## 历史报告

- 2026-07-27：初始基线建立，SHACL 测试通过。
