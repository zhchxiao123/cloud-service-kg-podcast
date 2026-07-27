// helpers.js — shared slide utilities (theme-consistent, video-safe)
// Dark theme, Noto Sans CJK SC + Liberation Sans
// Safe area: content must stay below y = 4.05" so that y + height ≤ 4.65"
// (bottom 0.55" reserved for podcast-video burned subtitles at y 4.85"–5.55")

function pageBadge(slide, pres, theme, num) {
  // Spec: x:9.20, y:4.05, w:0.50, h:0.35 (bottom = 4.40, well inside safe area)
  slide.addShape(pres.shapes.OVAL, {
    x: 9.20, y: 4.05, w: 0.50, h: 0.35,
    fill: { color: theme.accent }, line: { type: "none" }
  });
  slide.addText(String(num), {
    x: 9.20, y: 4.05, w: 0.50, h: 0.35,
    fontSize: 16, fontFace: "Liberation Sans", color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

function titleBlock(slide, pres, theme, title, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.5;
  const y = opts.y != null ? opts.y : 0.30;
  const w = opts.w != null ? opts.w : 9.0;
  const fs = opts.fontSize != null ? opts.fontSize : 26;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y + 0.10, w: 0.12, h: 0.40,
    fill: { color: theme.accent }, line: { type: "none" }
  });
  slide.addText(title, {
    x: x + 0.24, y: y, w: w - 0.24, h: 0.60,
    fontSize: fs, fontFace: "Noto Sans CJK SC", color: theme.primary,
    bold: true, align: "left", valign: "middle", margin: 0, fit: "shrink"
  });
}

function eyebrow(slide, theme, text, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.5;
  const y = opts.y != null ? opts.y : 0.28;
  const w = opts.w != null ? opts.w : 9.0;
  slide.addText(text, {
    x: x, y: y, w: w, h: 0.22,
    fontSize: 11, fontFace: "Liberation Sans", color: theme.accent,
    bold: true, align: "left", valign: "middle", margin: 0
  });
}

function subtitleLine(slide, theme, text, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.74;
  const y = opts.y != null ? opts.y : 0.92;
  const w = opts.w != null ? opts.w : 8.5;
  slide.addText(text, {
    x: x, y: y, w: w, h: 0.28,
    fontSize: 13, fontFace: "Noto Sans CJK SC", color: theme.light,
    bold: false, align: "left", valign: "middle", margin: 0
  });
}

function bulletList(slide, pres, theme, items, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.6;
  const y = opts.y != null ? opts.y : 1.40;
  const w = opts.w != null ? opts.w : 8.8;
  const lineH = opts.lineH != null ? opts.lineH : 0.48;
  const fs = opts.fontSize != null ? opts.fontSize : 16;
  items.forEach((t, i) => {
    const yy = y + i * lineH;
    slide.addShape(pres.shapes.OVAL, {
      x: x, y: yy + 0.16, w: 0.12, h: 0.12,
      fill: { color: theme.accent }, line: { type: "none" }
    });
    slide.addText(t, {
      x: x + 0.26, y: yy, w: w - 0.26, h: lineH - 0.05,
      fontSize: fs, fontFace: "Noto Sans CJK SC", color: theme.primary,
      align: "left", valign: "middle", margin: 0
    });
  });
}

module.exports = { pageBadge, titleBlock, eyebrow, subtitleLine, bulletList };
