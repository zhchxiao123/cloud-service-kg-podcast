# 播客视频流水线与本地 Skills 集成

本仓库的视频制作遵循一套本地播客 skills 流水线。后续每集制作 Issue 都按此流程拆分。

## 技能清单

| Skill | 作用 | 输入 | 输出 |
|-------|------|------|------|
| `/podcast-outline` | 内容转大纲 | 文章/URL/关键词 | `podcast-projects/<项目>/v<N>/slide-outline.json` |
| `/slide-deck` | 生成 PPT | `slide-outline.json` | `presentation.pptx` + `_build/*.js` + `_build/imgs/*.png` |
| `/podcast-script` | 生成双人对话脚本 | `slide-outline.json` | `podcast-script.json` |
| `/omlx-podcast-tts` | 本地 TTS 配音 | `podcast-script.json` + 参考音频 | `podcast.mp3` + `podcast_durations.json` |
| `/podcast-video` | 合成最终视频 | PPTX + MP3 + 脚本 | `final.mp4` |
| `/wechat-tech-article` | 生成公众号文章 | 仓库/内容 | `*_wechat.md` |

## 标准目录结构（每集）

```
podcast-projects/<项目名>/
├── current.txt              # 当前版本号，如 v1
├── _build/                  # 不进入 Git 的中间产物
│   ├── compile.js
│   ├── slide-01.js ... slide-NN.js
│   └── imgs/
│       └── slide-01.png ... slide-NN.png
└── v<N>/
    ├── slide-outline.json
    ├── presentation.pptx
    ├── podcast-script.json
    ├── podcast.mp3
    ├── podcast_durations.json
    └── final.mp4
```

合成完成后，把 `v<N>/` 中的产物归档到本仓库：

```
cloud-service-kg-podcast/episodes/epXX/
├── README.md
├── notes.md               # 研究包
├── assets/
│   ├── final.mp4          # Git LFS
│   ├── podcast.mp3        # Git LFS
│   ├── presentation.pptx  # Git LFS
│   ├── script.json
│   ├── slides.json        # 即 slide-outline.json
│   └── durations.json     # 即 podcast_durations.json
└── build/
    ├── compile.js         # 可复现的 PPT 生成脚本
    ├── slide-01.js ... slide-NN.js
    ├── package.json
    └── package-lock.json
```

## 流水线执行顺序

```text
1. /podcast-outline
       ↓ slide-outline.json
2. /slide-deck  ─────────┐
       ↓ presentation.pptx│
3. /podcast-script ────────┤
       ↓ podcast-script.json│
4. /omlx-podcast-tts      │
       ↓ podcast.mp3 + durations.json
5. /podcast-video ◄───────┘
       ↓ final.mp4
6. 分发 + 归档到 episodes/epXX/
```

**关键约束**：`slide-deck` 和 `podcast-script` 必须读取**同一份** `slide-outline.json`，这是保证幻灯片内容与对话一致的核心。

## 每集命名建议

| 集数 | 项目名示例 |
|------|-----------|
| EP01 | `ontology-basics-01` |
| EP02 | `ontology-basics-02` |
| EP03 | `ontology-basics-03` |
| EP04 | `ontology-basics-04` |
| EP05 | `kg-construction-01` |
| ... | ... |
| EP14 | `cloud-service-kg` |
| EP15 | `kg-evaluation` |
| EP16 | `open-source-publish` |

## 环境变量备忘（omlx）

```bash
export OMLX_BASE_URL="http://192.168.2.140:18000"
export OMLX_API_KEY="your-key"
export OMLX_REF_AUDIO_HOST="/path/to/host.wav"
export OMLX_REF_AUDIO_GUEST="/path/to/guest.wav"
```

注意：`OMLX_API_KEY` 不要写入仓库文件。

## TTS 归一化 checklist

- [ ] 版本号/IP/域名中的 `.` 替换为中文「点」或英文 `dot`
- [ ] ASCII 引号 `'` / `"` 替换为中文「」或删除
- [ ] 全角标点优先（`，。：；！？`）
- [ ] 用 `normalize_text.py` 扫描一遍

## 视频合成依赖

```bash
# Ubuntu/Debian
sudo apt install ffmpeg libreoffice
pip install pymupdf

# macOS
brew install ffmpeg libreoffice
pip install pymupdf
```

## 常见问题

| 现象 | 原因 | 处理 |
|------|------|------|
| omlx 503 | 本地服务过载 | `--concurrency 1`，或改用备选 TTS |
| 幻灯片与字幕不同步 | `podcast-script.json` 与 `podcast_durations.json` 不一致 | 重跑 TTS 或重新对齐 |
| PPTX 幻灯片数 != 脚本最大 slide 号 | 上游某步生成错误 | 重跑 `/slide-deck` 或 `/podcast-script` |
| 布局审计失败 | 元素侵入字幕区 | 调整 `slide-*.js` 中的 y/height |
