# 多平台分发模板

## 一、每集发布检查清单

```markdown
- [ ] B站：上传完整视频 + 封面 + 简介 + 标签 + 分章节
- [ ] YouTube：上传 + 英文字幕 + 英文标题/描述
- [ ] 视频号：剪辑 1 条预告（竖屏 9:16）+ 1 条金句（竖屏）
- [ ] 公众号：文字稿 + 插图 + 代码链接
- [ ] 知乎：专栏稿（可拆分上下篇）
- [ ] 掘金：代码详解版
- [ ] GitHub：合并当集代码到 main，更新 README 链接
- [ ] 社群/朋友圈：发布动态（含 B站/公众号链接）
```

## 二、标题模板

### B站 / YouTube

```
【本体工程与知识图谱实战】EP01 | 本体到底解决什么问题？
```

YouTube 英文版：

```
Ontology Engineering & Knowledge Graphs EP01 | What Problem Does Ontology Solve?
```

### 视频号

```
“同一个词，在不同系统里意思完全不一样——这就是本体工程要解决的第一个问题。”
完整版 10 分钟视频已上线，点击主页观看。
#知识图谱 #本体工程 #AI
```

### 公众号

```
EP01 笔记：本体到底解决什么问题？（附 3 个真实案例）
```

## 三、视频封面规范

- **B站/YouTube**：1146 × 717（16:9）
- **视频号**：1080 × 1920（9:16）
- 主色调：深蓝 `#1E3A5F` + 橙 `#F4A261`
- 字体：Noto Sans SC / Noto CJK（见仓库 `assets/fonts/` 说明）
- 必须元素：系列 Logo、集数、标题、主讲人/频道名

## 四、视频简介模板

### 中文

```
欢迎来到《本体工程与知识图谱实战》第 X 集。

本集内容：
- 知识点 1
- 知识点 2
- 知识点 3

代码与 PPT：https://github.com/YOUR_ORG/cloud-service-kg-podcast/tree/main/episodes/ep0X
系列总方案：https://github.com/YOUR_ORG/cloud-service-kg-podcast/blob/main/docs/master-plan.md

订阅本频道，每周更新一集。
```

### 英文

```
Welcome to Ontology Engineering & Knowledge Graphs, Episode X.

In this episode:
- Point 1
- Point 2
- Point 3

Code & slides: https://github.com/YOUR_ORG/cloud-service-kg-podcast/tree/main/episodes/ep0X
Series plan: https://github.com/YOUR_ORG/cloud-service-kg-podcast/blob/main/docs/master-plan.md

Subscribe for weekly updates.
```

## 五、公众号文章结构

1. **导语**：30 秒视频精华 + 引导点击完整视频。
2. **正文**：按讲稿整理，保留代码块与截图。
3. **关键结论**：用引用块或表格总结。
4. **课后作业**：复制讲稿中的作业。
5. **资源链接**：GitHub 目录、下一集预告。
6. **作者简介**：一句话 + 公众号/频道二维码占位。

## 六、掘金文章结构

1. **标题**：技术导向，例如《用 Protégé 画第一个本体：云服务选型实战》。
2. **前言**：说明背景与学习目标。
3. **环境准备**：Python/Protégé/Neo4j 版本。
4. **代码演示**：可运行的最小示例。
5. **原理解析**：关键知识点。
6. **总结与扩展**：课后作业、下一集预告。

## 七、字幕规范

- 导出 SRT 与简明字幕两种格式。
- 英文字幕需人工校对技术术语。
- 保留说话人标记（如采访或多人口播）。

## 八、发布日历模板

| 周次 | 集数 | B站 | YouTube | 视频号 | 公众号 | 知乎 | 掘金 |
|------|------|-----|---------|--------|--------|------|------|
| W1 | EP01 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| W2 | EP02 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ... | ... | | | | | | |

---

*模板会根据实际发布经验迭代更新。*
