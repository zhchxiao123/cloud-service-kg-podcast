# 贡献指南

感谢你对《本体工程与知识图谱实战》系列感兴趣！本仓库欢迎纠错、补充案例、改进代码、提交翻译等贡献。

---

## 仓库双许可证说明

- **代码**（`.py`、`.js`、Actions 等）使用 **MIT License**。
- **数据、本体、文字稿、PPT 源文件**使用 **CC BY 4.0**。

提交 PR 即表示你同意按上述许可证发布你的贡献。

---

## 如何贡献

### 1. 纠错（Errata）

如果你发现视频/文章/代码中的技术错误：

1. 开一个 Issue，标题格式：`[errata] EPxx: 简短描述`。
2. 指出具体文件/时间戳/行号。
3. 给出你建议的修正或引用来源。

### 2. 提交 Competency Question

在 GitHub Discussions 的 **CQ 征集** 分类下发帖，格式：

```markdown
**领域**：云服务选型
**问题**：哪些 GPU 计算服务在亚太地区可用？
**希望映射到的本体元素**：
- 类：ComputeService, GPUInstance, Region
- 属性：hasRegion, hasGPU
```

### 3. 贡献代码

1. Fork 本仓库。
2. 从 `main` 切出一个分支：`git checkout -b fix/epxx-short-desc`。
3. 修改代码，确保本地测试通过：`python -m pytest project/tests/`。
4. 提交 PR，填写模板。

### 4. 改进文档或翻译

- 文档改进直接 PR。
- 英文字幕/翻译请到 `episodes/epxx/subtitles/` 目录提交 SRT 文件。

---

## 代码规范

- Python 代码遵循 **PEP 8**，使用 `black` 格式化。
- 新增功能必须附带测试。
- 所有提交信息使用英文，格式：`type(scope): subject`，例如：
  - `feat(ep03): add Protégé ontology export script`
  - `fix(project): correct SHACL shape for ComputeService`
  - `docs(readme): update episode index`

---

## 本地开发环境

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
pre-commit install
```

---

## 审核流程

- 维护者会在 7 个工作日内回复 Issue/PR。
- 重大改动（如修改本体核心结构）需先在 Discussion 中讨论。
- PR 合并前需通过 CI（测试 + lint + 本体一致性检查）。

---

再次感谢你的贡献！
