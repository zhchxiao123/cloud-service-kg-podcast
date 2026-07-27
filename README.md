# 本体工程与知识图谱实战 · 播客/视频系列

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](./LICENSE-data)
[![CI](https://github.com/YOUR_ORG/cloud-service-kg-podcast/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_ORG/cloud-service-kg-podcast/actions/workflows/ci.yml)

> 中文技术播客/视频系列《本体工程与知识图谱实战》的官方仓库。  
> 这里存放每集脚本、代码、数据、PPT 源文件，以及核心项目载体：**云服务选型知识图谱**。

---

## 📺 系列概览

| 系列 | 集数 | 时长 | 受众 |
|------|------|------|------|
| 主线课程《本体工程与知识图谱实战》 | 16 集 | 8–12 分钟/集 | 开发者、研究生、技术工程师 |
| 番外《本体研究前沿》 | 8 集 | 15–20 分钟/集 | 研究者、博士生、技术决策者 |

**首发平台**：B站 / YouTube（完整视频）  
**同步平台**：视频号、公众号、知乎、掘金、GitHub、Zenodo

---

## 📁 仓库目录

```
cloud-service-kg-podcast/
├── .github/                 # Issue 模板、PR 模板、GitHub Actions
├── episodes/                # 每集素材
│   ├── ep01/                # 主线第 01 集
│   ├── ...
│   ├── ep16/                # 主线第 16 集
│   ├── epE01/               # 番外第 E01 集
│   └── epE08/               # 番外第 E08 集
├── project/                 # 云服务选型知识图谱项目
│   ├── data/                # 清洗后的公开数据
│   ├── ontology/            # OWL/Turtle 本体文件
│   ├── notebooks/           # Jupyter 演示
│   ├── src/                 # 可运行代码
│   ├── tests/               # 测试与评估脚本
│   ├── docs/                # 项目文档
│   └── eval/                # 评估报告
├── scripts/                 # 仓库维护脚本
├── docs/                    # 系列总文档
├── assets/                  # 通用图片、字体、片头片尾
├── website/                 # GitHub Pages 站点（可选）
├── README.md
├── LICENSE                  # 代码许可证
├── LICENSE-data             # 数据许可证
├── CITATION.cff             # 学术引用文件
└── .zenodo.json             # Zenodo 元数据
```

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/YOUR_ORG/cloud-service-kg-podcast.git
cd cloud-service-kg-podcast
```

### 2. 安装依赖

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. 运行核心项目验证

```bash
cd project
python -m pytest tests/          # 运行测试
python src/pipeline.py --help    # 查看流水线命令
```

---

## 📅 更新节奏

- **主线**：每周 1 集，共 16 集，预计 4 个月播完。
- **番外**：主线播完后，每月 1–2 集。
- **项目版本**：第 14 集启动 `v0.1.0-alpha`，第 16 集发布 `v1.0.0` 并同步 Zenodo DOI。

---

## 🎯 核心项目：云服务选型知识图谱

本项目以“云服务选型”为实战载体，演示从需求、本体、抽取、存储到查询的完整知识图谱构建流程。

- **本体文件**：[`project/ontology/cloud_service.ttl`](./project/ontology/cloud_service.ttl)
- **抽取流水线**：[`project/src/pipeline.py`](./project/src/pipeline.py)
- **评估脚本**：[`project/tests/`](./project/tests/)
- **项目文档**：[`project/docs/`](./project/docs/)

### 最小运行示例

```bash
cd project
python src/build_kg.py \
  --data data/sample_docs.json \
  --ontology ontology/cloud_service.ttl \
  --output data/kg.ttl
```

---

## 🎬 每集内容索引

### 主线课程

| 集数 | 标题 | 视频 | 代码 |
|------|------|------|------|
| EP01 | 本体到底解决什么问题？ | [B站] · [YouTube] | [`episodes/ep01/`](./episodes/ep01) |
| EP02 | RDF 三元组：知识的原子单位 | [B站] · [YouTube] | [`episodes/ep02/`](./episodes/ep02) |
| EP03 | Protégé 入门：画出你的第一个本体 | [B站] · [YouTube] | [`episodes/ep03/`](./episodes/ep03) |
| EP04 | OWL 与推理机：让知识自己说话 | [B站] · [YouTube] | [`episodes/ep04/`](./episodes/ep04) |
| EP05 | 从需求到 Competency Question | [B站] · [YouTube] | [`episodes/ep05/`](./episodes/ep05) |
| EP06 | 实体抽取：NER 与 LLM 对比 | [B站] · [YouTube] | [`episodes/ep06/`](./episodes/ep06) |
| EP07 | 关系抽取：OpenIE 与 LLM 方法 | [B站] · [YouTube] | [`episodes/ep07/`](./episodes/ep07) |
| EP08 | 实体链接：把名字对到真实世界 | [B站] · [YouTube] | [`episodes/ep08/`](./episodes/ep08) |
| EP09 | Neo4j 存储与 Cypher 查询 | [B站] · [YouTube] | [`episodes/ep09/`](./episodes/ep09) |
| EP10 | LLM 能帮我自动生成本体吗？ | [B站] · [YouTube] | [`episodes/ep10/`](./episodes/ep10) |
| EP11 | 本体质量怎么保证？SHACL 与 OOPS! | [B站] · [YouTube] | [`episodes/ep11/`](./episodes/ep11) |
| EP12 | GraphRAG：用大模型查知识图谱 | [B站] · [YouTube] | [`episodes/ep12/`](./episodes/ep12) |
| EP13 | LLM 时代的本体对齐 | [B站] · [YouTube] | [`episodes/ep13/`](./episodes/ep13) |
| EP14 | 实战：从 0 构建一个云服务知识图谱 | [B站] · [YouTube] | [`project/`](./project) |
| EP15 | 如何评估你的知识图谱？ | [B站] · [YouTube] | [`project/tests/`](./project/tests) |
| EP16 | 开源、投稿与持续维护 | [B站] · [YouTube] | [`episodes/ep16/`](./episodes/ep16) |

### 番外/第二季

| 集数 | 标题 | 视频 | 笔记 |
|------|------|------|------|
| E01 | 2025 本体研究地图 | [B站] · [YouTube] | [`episodes/epE01/`](./episodes/epE01) |
| E02 | LLM for Ontology Engineering：自动化到哪一步？ | [B站] · [YouTube] | [`episodes/epE02/`](./episodes/epE02) |
| E03 | 端到端本体学习：OLLM 解析 | [B站] · [YouTube] | [`episodes/epE03/`](./episodes/epE03) |
| E04 | 本体对齐的 Agent 时代 | [B站] · [YouTube] | [`episodes/epE04/`](./episodes/epE04) |
| E05 | Beyond Equivalence：对齐不只是找等价 | [B站] · [YouTube] | [`episodes/epE05/`](./episodes/epE05) |
| E06 | ShEx 与 KG 模式生成 | [B站] · [YouTube] | [`episodes/epE06/`](./episodes/epE06) |
| E07 | 神经符号 AI：本体如何喂给大模型？ | [B站] · [YouTube] | [`episodes/epE07/`](./episodes/epE07) |
| E08 | 未来 5 年本体研究往哪走？ | [B站] · [YouTube] | [`episodes/epE08/`](./episodes/epE08) |

---

## 🤝 如何参与

欢迎通过以下方式参与：

1. **纠错**：发现技术错误？开 Issue 并标注 `[errata]`。
2. **补充 CQ**：在 GitHub Discussions 提交你关心的 Competency Question。
3. **贡献代码**：Fork → 修改 → 提交 PR，参见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。
4. **分享案例**：在 Discussion 分享你工作中的“同一个词不同含义”案例。

---

## 📄 许可证

- **代码**：MIT License，见 [`LICENSE`](./LICENSE)。
- **数据、本体、文字稿、PPT 源文件**：CC BY 4.0，见 [`LICENSE-data`](./LICENSE-data)。
- 云服务厂商名称与产品名归各自所有者所有，本项目仅用于教育与学术研究，不暗示官方背书。

---

## 📚 引用

如果本系列对你的研究有帮助，请使用以下方式引用：

```bibtex
@software{cloud_service_kg_podcast,
  title = {本体工程与知识图谱实战 · 播客/视频系列},
  author = {YOUR_NAME},
  year = {2026},
  url = {https://github.com/YOUR_ORG/cloud-service-kg-podcast},
  note = {Zenodo DOI will be minted at v1.0.0 release}
}
```

更新后的 DOI 将在 [`CITATION.cff`](./CITATION.cff) 中维护。

---

## 🔗 相关链接

- 系列总方案：[`docs/master-plan.md`](./docs/master-plan.md)
- 多平台分发模板：[`docs/distribution-template.md`](./docs/distribution-template.md)
- 项目评估报告：[`project/eval/README.md`](./project/eval/README.md)
- 视频频道：B站 / YouTube / 视频号

---

*本仓库所有内容遵循 MIT（代码）与 CC BY 4.0（数据/文档）双许可证发布。*
