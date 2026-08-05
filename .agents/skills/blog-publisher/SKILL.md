---
name: blog-publisher
description: |
  Publish articles to zhchxiao123.github.io — a Jekyll + Chirpy blog hosted on GitHub Pages.
  Use this skill whenever the user wants to:
  - Publish a new blog post
  - Post an article to their personal blog
  - Create and publish content about AI, tools, or tech

  Trigger phrases: "发布博客", "发布文章", "发博客", "发篇文章", "写博客并发布",
  "publish to my blog", "post to blog", "发布到博客", "帮我发篇博客", "写一篇发到博客"
---

# Blog Publisher — 博客自动发布器

将文章自动发布到 zhchxiao123.github.io（Jekyll + Chirpy 主题，GitHub Pages 托管）。

## 博客信息

- **仓库**: `https://github.com/zhchxiao123/zhchxiao123.github.io`
- **框架**: Jekyll + Chirpy 主题
- **文章目录**: `_posts/`
- **文件命名**: `YYYY-MM-DD-slug.md`
- **部署方式**: 推送到 `main` 分支 → GitHub Actions 自动构建部署

## 文章格式

每篇文章是 Markdown 文件，顶部是 YAML frontmatter：

```markdown
---
title: "文章标题"
date: YYYY-MM-DD HH:MM:SS +0800
categories: [分类1, 分类2]
tags: [标签1, 标签2, 标签3]
description: "文章摘要描述（可选，用于 SEO）"
image: /assets/img/xxx/banner.png  （可选，封面图路径）
pin: false  （是否置顶，默认 false）
---

正文内容（Markdown 格式）...
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题，可加引号 |
| `date` | ✅ | 格式 `YYYY-MM-DD HH:MM:SS +0800`（北京时间） |
| `categories` | ✅ | 分类数组，如 `[AI, 开发日志]` |
| `tags` | ✅ | 标签数组，如 `[AI Agent, 工具]` |
| `description` | 可选 | SEO 描述 |
| `image` | 可选 | 封面图路径（需同时上传图片到 `assets/img/`） |
| `pin` | 可选 | `true` 置顶 |

### Slug 命名

取英文 slug，用连字符分隔，例如：
- "我的 AI 编程工具清单" → `ai-programming-tools-summary`
- "内容工厂技能介绍" → `content-factory-skill-introduction`

## 发布流程

### Step 1: 确认文章内容

确认以下内容已准备好：
- [ ] 文章标题
- [ ] 分类（categories）
- [ ] 标签（tags）
- [ ] 英文 slug
- [ ] 正文 Markdown（由 Claude 撰写或用户提供）
- [ ] 可选的封面图路径

### Step 2: 生成 Markdown 文件

根据以上信息生成完整的 `.md` 文件（含 frontmatter + 正文），保存为临时文件。

### Step 3: 运行发布脚本

```bash
bash /workspace/.claude/skills/blog-publisher/scripts/publish.sh \
  --file /path/to/article.md \
  --slug "english-slug"
```

脚本会自动：
1. Clone 或 pull 博客仓库
2. 将文章文件复制到 `_posts/YYYY-MM-DD-slug.md`
3. Commit 并 push 到 `main` 分支
4. GitHub Actions 自动部署（约 1-2 分钟）

### Step 4: 报告结果

- ✅ 成功 → 显示文章 URL：`https://zhchxiao123.github.io/posts/<slug>/`
- ❌ 失败 → 报告错误原因并提供解决建议

## 首次配置

发布脚本需要 GitHub 权限才能 push。有两种方式：

### 方式一：GitHub Token（推荐）

设置环境变量或 `.env` 文件：

```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
```

Token 需要 `repo` scope。在 https://github.com/settings/tokens 创建。

如果不同环境变量，脚本会自动尝试使用 `gh` CLI 或 SSH。

### 方式二：配置本地 Git + SSH

确保本地已配置 SSH key 并添加到 GitHub：

```bash
ssh -T git@github.com  # 验证连接
git config --global user.name "zhchxiao123"
git config --global user.email "your-email@example.com"
```

## 文章内容要求

- 使用中文撰写（博客定位为中文技术博客）
- 技术文章需包含：背景/问题 → 核心内容 → 总结
- 适当使用小标题（`##`, `###`）组织结构
- 代码块标注语言类型
- 图片使用 Markdown 语法：`![描述](路径)`

## 已有分类参考

从现有文章看，常用分类：
- `[工具]` — 工具推荐/评测
- `[AI]` — AI 相关
- `[开发日志]` — 开发过程记录
- `[教程]` — 教程类

组合使用：`[AI, 开发日志]`、`[工具, AI]`

## 错误处理

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `git push` 失败 | 无推送权限 | 检查 GITHUB_TOKEN 或 SSH key |
| Clone 失败 | Token 无效或仓库不存在 | 检查 Token 权限和仓库 URL |
| `git pull` 冲突 | 本地有未推送的更改 | 手动处理或删除本地 clone 重试 |
| Frontmatter 格式错误 | YAML 语法问题 | 检查 `title` 中的冒号是否用了引号 |
