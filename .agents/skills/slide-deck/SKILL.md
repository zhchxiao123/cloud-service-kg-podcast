---
name: slide-deck
description: >
  根据播客大纲生成专业的演示文稿，是播客视频流水线的视觉环节。也可以独立生成 PPT 或编辑已有演示文稿。
  只要用户提到生成 PPT、做幻灯片、制作演示文稿、做 slides、幻灯片生成，
  或者正在制作播客视频需要视觉内容，就应该触发此技能——即使用户只说"帮我做个 PPT"也要触发。
license: MIT
compatibility: Requires Node.js (v16+) and pptxgenjs (npm install -g pptxgenjs)
metadata:
  version: "1.0"
  category: productivity
  sources: "https://gitbrent.github.io/PptxGenJS, https://github.com/microsoft/markitdown"
---

# 幻灯片生成

根据 `slide-outline.json` 大纲生成专业 PPTX，是播客视频流水线的视觉支线。每张幻灯片对应大纲中的一个 slide，编号严格一致，这样下游的 `/podcast-video` 才能正确计算每张幻灯片的播放时长。

详细参考文档见 `references/` 目录：
- [slide-types.md](references/slide-types.md) — 5 种幻灯片类型的布局规范
- [design-system.md](references/design-system.md) — 配色方案、字体、风格样式
- [pptxgenjs.md](references/pptxgenjs.md) — PptxGenJS 完整 API 参考
- [editing.md](references/editing.md) — 编辑现有 PPTX 的 XML 工作流
- [pitfalls.md](references/pitfalls.md) — QA 流程和常见陷阱

## 项目目录管理

所有产物统一存放在：
```
<当前工作空间>/podcast-projects/<项目名>/v<N>/presentation.pptx
```

`<当前工作空间>` 是调用此技能时所在的目录。播客视频流水线中的所有技能建议在同一个目录下调用，确保 `podcast-projects/` 始终在同一位置。

中间构建文件（JS slides、编译脚本）存放在不版本化的 `_build/` 目录：
```
podcast-projects/<项目名>/_build/
  slide-01.js, slide-02.js ...
  compile.js
  imgs/
```

**确定项目：** 扫描 `podcast-projects/` 目录，找到含 `slide-outline.json` 的项目，向用户确认后继续。

**自动版本：** 读取 `<项目名>/current.txt`：
- `presentation.pptx` **已存在**于当前版本 → 创建 vN+1/ 目录，复制现有产物，再写入新 PPTX，更新 `current.txt`
- `presentation.pptx` **不存在** → 直接写入当前版本，成功后更新 `current.txt`

## 前置检查

在开始生成幻灯片之前，先确认这些条件满足，避免在构建到一半时才发现问题：

- [ ] 项目版本目录下存在 `slide-outline.json` 且格式合法（含 `meta.total_slides` 和 `slides` 数组）
- [ ] `node` 可用：`node --version`
- [ ] `pptxgenjs` 已全局安装：`npm list -g pptxgenjs`（未安装则执行 `npm install -g pptxgenjs`）
- [ ] 中文字体文件存在：`<skill-dir>/fonts/wqy-microhei.ttc`

---

## Quick Reference

| 任务 | 方法 |
|------|----------|
| 读取/分析现有 PPTX | `python -m markitdown presentation.pptx` |
| 从 slide-outline.json 生成 | 见下方 [从大纲生成](#从大纲生成) |
| 从模板编辑 | 见 [editing.md](references/editing.md) |
| 从零自定义创作 | 见下方 [自定义创作流程](#自定义创作流程) |

| 参数 | 值 |
|------|-------|
| 画布尺寸 | 10" x 5.625"（LAYOUT_16x9） |
| 颜色格式 | 6 位十六进制，不含 #（如 `"FF0000"`） |
| 英文字体 | Arial（Win/Mac）/ Liberation Sans（Linux，内置于 `<skill-dir>/fonts/`） |
| 中文字体 | Microsoft YaHei（Win/Mac）/ WenQuanYi Micro Hei（Linux，内置于 `<skill-dir>/fonts/`） |
| **内容安全区** | 顶部 0.30"–底部 4.65"（垂直活动区 4.35"高）|
| **字幕预留区** | y: 4.85"–5.55"，距底 55px，仅 `podcast-video` 模式下需要 |
| **页码位置** | 视频专用（带字幕）：x: 9.30", y: 4.25"（徽章 h=0.40，bottom=4.65）/ 独立 PPT：x: 9.30", y: 5.10" |
| 主题键名 | `primary`, `secondary`, `accent`, `light`, `bg` |

---

## 从大纲生成

当项目目录下存在 `slide-outline.json` 时使用此路径。跳过"研究需求"和"规划大纲"步骤，直接读取大纲内容。

### 读取大纲

```json
{
  "slides": [
    {
      "slide": 1,
      "type": "cover",
      "title": "...",
      "subtitle": "...",
      "key_points": []
    }
  ]
}
```

### 类型映射规则

| outline `type` | 幻灯片布局 | `key_points` 处理 |
|---|---|---|
| `cover` | 封面页 | 忽略（空数组）；`title` 作主标题，`subtitle` 作副标题 |
| `toc` | 目录页 | 忽略（空数组）；从所有 `content`/`section` 幻灯片的 `title` 自动生成目录条目（最多 6 条） |
| `section` | 章节分隔页 | 忽略或最多显示 1 条；`title` 作大字分节标题 |
| `content` | 内容页 | 每条作为一个 bullet point |
| `summary` | 总结页 | 每条作为结论 bullet |

关键约束（这些约束保证下游 `/podcast-video` 能正确同步）：
- JS 文件编号严格对应 `slide` 字段：`slide: 3` → `slide-03.js`，不按数组下标
- `compile.js` 的循环次数必须等于 `meta.total_slides`
- 不要改动幻灯片顺序，`/podcast-script` 的 `"slide": N` 注解依赖这个顺序

### 视觉插图（gpt-image 集成）

如果大纲中包含 `visual` 字段（由 `podcast-outline` 配合 `gpt-image` skill 生成），可在 `node compile.js` 之前自动生成插图。

**大纲字段约定**（每张 slide 可选）：

```json
{
  "slide": 4,
  "type": "content",
  "title": "推理成本下降 90%",
  "key_points": ["..."],
  "visual": {
    "enabled": true,
    "kind": "data-viz",
    "prompt": "A clean editorial line chart showing GPU inference cost from $100 to $10 over 24 months, single line, no grid",
    "style_anchor": "editorial infographic, muted teal + cream + charcoal, white background, thin sans-serif",
    "size": "1024x1024",
    "quality": "low"
  }
}
```

| 字段 | 说明 | 默认 |
|---|---|---|
| `enabled` | 是否为该 slide 生成图 | `false`（无图） |
| `kind` | 用途分类：cover / hero / data-viz / diagram / section-bg | 无 |
| `prompt` | 1-2 句具体场景描述 | 必填 |
| `style_anchor` | 风格锚，整期播客必须保持一致 | 无（建议填） |
| `size` | 像素尺寸 / 别名（`1k`/`2k`/`portrait` 等） | `1024x1024` |
| `quality` | `low`（草稿）/ `medium`（探索）/ `high`（终稿） | `low` |

**生成插图**（在 `node compile.js` 之前跑）：

```bash
python <skill-dir>/scripts/prebuild_images.py <project>/v<N>/slide-outline.json
```

脚本行为：
- 读所有 `visual.enabled=true` 的 slide
- 对每张调 `gpt-image` CLI（已在 PATH 上）
- 输出到 `<project>/_build/imgs/slide-NN.png`
- **幂等**：PNG 已存在且 > 10KB 自动跳过
- 失败 exit 1，触发上层 Step 4 重试

**在 slide-NN.js 中插入图片**：用共享 helper：

```javascript
const { addSlideImage } = require('./slide-image');

// 在 createSlide 末尾:
addSlideImage(slide, pres, 4, { layout: 'corner' });      // content: 右下角图位
addSlideImage(slide, pres, 1, { layout: 'background' });  // cover: 全幅背景
addSlideImage(slide, pres, 4, { layout: 'left' });        // content: 左侧大图
```

helper 在图不存在时静默返回 `false`（回退到纯文字版），不影响未配 `visual` 的旧项目。

**前置要求**：
- `gpt-image` 在 PATH 上：`pipx install git+https://github.com/wuyoscar/gpt_image_2_skill`
- `OPENAI_API_KEY` 环境变量已设
- prompt 风格参考 `~/.claude/skills/gpt-image/references/craft.md`（密度/对齐/排版规范）

**成本控制**：
- `content` slide 用 `quality=low`，单期 5-8 张 ≈ $0.05
- `cover` 用 `quality=high`，单图 ≈ $0.10
- 单期总成本 < $0.20

### 视频合成模式（重要）

当目标产物是 `/podcast-video` 合成的 MP4（带字幕烧录）时，**必须**遵守以下布局规范：

- **内容垂直活动区**：y 从 0.30" 到 4.65"（顶部留 0.30" 边距，底部 4.65" 以下为字幕区）
- **字幕区位置**：y = 4.85"–5.55"（距画布底边 55–520px），`podcast-video` 在此区域烧录白色字幕
- **页码徽章**：移到 y = 4.25"（h=0.40 时 bottom=4.65，刚好在内容活动区内）
- **核心内容（卡片、文本块、图表）**：所有元素的 `y + height ≤ 4.65"`（即元素底边必须在 4.65" 以下）

**生成完成后必须做布局审计**（仅视频模式）：

```bash
# 提取所有元素的 y 坐标和底边，断言底边 < 4.75
python <skill-dir>/scripts/layout_audit.py presentation.pptx
```

如果审计报错，将违规元素的 `y` 值上移直到通过。

---

## 自定义创作流程

没有 `slide-outline.json` 时，从零创作。

**Step 1** 了解需求：主题、受众、风格、幻灯片数量。

**Step 2** 选配色和字体：参考 [design-system.md](references/design-system.md)。

**Step 3** 选设计风格：Sharp / Soft / Rounded / Pill 四选一。

**Step 4** 规划大纲：为每张幻灯片选定一个类型（见 [slide-types.md](references/slide-types.md)），确保视觉多样性，不重复同一布局。

**Step 5** 生成 JS 文件：在 `_build/` 下为每张幻灯片创建一个 JS 文件，命名 `slide-01.js`、`slide-02.js`……可并发最多 5 个子任务同时生成。

**Step 6** 编译成 PPTX：创建 `_build/compile.js` 合并所有模块，输出到版本目录。

`compile.js` 运行前先读取 `current.txt` 确定输出路径，避免硬编码版本号：

```javascript
const fs = require('fs');
const version = fs.readFileSync(`podcast-projects/<项目名>/current.txt`, 'utf8').trim();
const outputPath = `podcast-projects/<项目名>/${version}/presentation.pptx`;
```

**Step 7** QA：参考 [pitfalls.md](references/pitfalls.md)。

---

## 幻灯片输出格式

每个 JS 文件必须导出同步的 `createSlide(pres, theme)` 函数：

```javascript
// slide-01.js
const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };
  slide.addText("标题", {
    x: 0.5, y: 2, w: 9, h: 1.2,
    fontSize: 48, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center"
  });
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: "22223b", secondary: "4a4e69", accent: "9a8c98", light: "c9ada7", bg: "f2e9e4" };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide };
```

## 主题对象（必须使用这些键名）

| 键 | 用途 | 示例 |
|-----|---------|---------|
| `theme.primary` | 最深色，用于标题 | `"22223b"` |
| `theme.secondary` | 深色强调，用于正文 | `"4a4e69"` |
| `theme.accent` | 中间调强调色 | `"9a8c98"` |
| `theme.light` | 浅色强调 | `"c9ada7"` |
| `theme.bg` | 背景色 | `"f2e9e4"` |

不要使用 `background`、`text`、`muted` 等其他键名——主题对象由 `compile.js` 传入，键名不对会导致颜色失效。

## 页码徽章（封面页以外的所有幻灯片必须包含）

页码让观众随时知道自己看到哪一张，在合成为视频后不依赖播放器进度条——这对播客视频这种线性播放场景尤为重要，也保证了每张幻灯片的视觉风格一致。

```javascript
// 独立 PPT（无字幕）— 放在最右下角
slide.addShape(pres.shapes.OVAL, { x: 9.30, y: 5.10, w: 0.40, h: 0.40, fill: { color: theme.accent } });
slide.addText("3", { x: 9.30, y: 5.10, w: 0.40, h: 0.40, fontSize: 12, fontFace: "Arial", color: "FFFFFF", bold: true, align: "center", valign: "middle" });

// 视频专用（带字幕）— 上移到内容活动区内（bottom = 4.25 + 0.40 = 4.65）
slide.addShape(pres.shapes.OVAL, { x: 9.30, y: 4.25, w: 0.40, h: 0.40, fill: { color: theme.accent } });
slide.addText("3", { x: 9.30, y: 4.25, w: 0.40, h: 0.40, fontSize: 12, fontFace: "Arial", color: "FFFFFF", bold: true, align: "center", valign: "middle" });
```

---

## 产物校验

生成完成后，确认以下各项，避免让下游流程因无效 PPTX 而失败：

- [ ] `podcast-projects/<项目名>/v<N>/presentation.pptx` 存在且大小 > 50KB
- [ ] `python -m markitdown presentation.pptx` 提取的幻灯片数 = `meta.total_slides`
- [ ] 每张幻灯片标题与大纲 `title` 字段一致
- [ ] `key_points` 中的要点全部出现在对应幻灯片上
- [ ] JS 文件编号与 `slide` 字段一致：扫描 `_build/` 下的所有 `slide-XX.js`，对照 `slide-outline.json` 中每条 slide 的 `slide` 字段值，确认编号是按 `slide` 值命名而非数组下标（例如第一个 content slide 若 `slide: 3`，文件必须是 `slide-03.js`）。发现不一致时列出冲突项，说明哪个 JS 文件编号错误，需要修正后重新编译
- [ ] **视频模式布局审计**（目标为 `/podcast-video` 时）：`python <skill-dir>/scripts/layout_audit.py presentation.pptx` 输出 `OK`，所有非封面元素的 `y + height ≤ 4.65`

## 反问清单

| 缺失情况 | 标准反问 |
|---|---|
| 无大纲文件 | "项目目录下未找到大纲文件，请先运行 `/podcast-outline`，或提供现有大纲的路径。" |
| `node` 未安装 | "需要安装 Node.js，请访问 https://nodejs.org 安装后重试。" |
| 用户未指定项目 | "请告诉我要继续哪个播客项目，或新建一个项目名称。" |
