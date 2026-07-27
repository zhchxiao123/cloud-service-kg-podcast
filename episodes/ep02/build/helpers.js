// helpers.js — shared slide utilities (theme-consistent)
// Dark theme, Noto Sans CJK SC + Liberation Sans

function pageBadge(slide, pres, theme, num) {
  // Spec: x:9.20, y:4.30, w:0.50, h:0.35 (bottom = 4.65, inside safe area)
  slide.addShape(pres.shapes.OVAL, {
    x: 9.20, y: 4.30, w: 0.50, h: 0.35,
    fill: { color: theme.accent }, line: { type: "none" }
  });
  slide.addText(String(num), {
    x: 9.20, y: 4.30, w: 0.50, h: 0.35,
    fontSize: 16, fontFace: "Liberation Sans", color: "FFFFFF", bold: true,
    align: "center", valign: "middle", margin: 0
  });
}

function titleBlock(slide, pres, theme, title, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.5;
  const y = opts.y != null ? opts.y : 0.32;
  const w = opts.w != null ? opts.w : 9.0;
  const fs = opts.fontSize != null ? opts.fontSize : 28;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y + 0.12, w: 0.12, h: 0.40,
    fill: { color: theme.accent }, line: { type: "none" }
  });
  slide.addText(title, {
    x: x + 0.24, y: y, w: w - 0.24, h: 0.65,
    fontSize: fs, fontFace: "Noto Sans CJK SC", color: theme.primary,
    bold: true, align: "left", valign: "middle", margin: 0, fit: "shrink"
  });
}

function eyebrow(slide, theme, text, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.5;
  const y = opts.y != null ? opts.y : 0.35;
  const w = opts.w != null ? opts.w : 9.0;
  slide.addText(text, {
    x: x, y: y, w: w, h: 0.25,
    fontSize: 11, fontFace: "Liberation Sans", color: theme.accent,
    bold: true, align: "left", valign: "middle", margin: 0
  });
}

function subtitleLine(slide, theme, text, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.74;
  const y = opts.y != null ? opts.y : 0.98;
  const w = opts.w != null ? opts.w : 8.5;
  slide.addText(text, {
    x: x, y: y, w: w, h: 0.30,
    fontSize: 13, fontFace: "Noto Sans CJK SC", color: theme.light,
    bold: false, align: "left", valign: "middle", margin: 0
  });
}

function bulletList(slide, pres, theme, items, opts) {
  opts = opts || {};
  const x = opts.x != null ? opts.x : 0.5;
  const y = opts.y != null ? opts.y : 1.55;
  const w = opts.w != null ? opts.w : 9.0;
  const lineH = opts.lineH != null ? opts.lineH : 0.55;
  const fs = opts.fontSize != null ? opts.fontSize : 17;
  items.forEach((t, i) => {
    const yy = y + i * lineH;
    slide.addShape(pres.shapes.OVAL, {
      x: x, y: yy + 0.18, w: 0.13, h: 0.13,
      fill: { color: theme.accent }, line: { type: "none" }
    });
    slide.addText(t, {
      x: x + 0.28, y: yy, w: w - 0.28, h: lineH - 0.05,
      fontSize: fs, fontFace: "Noto Sans CJK SC", color: theme.primary,
      align: "left", valign: "middle", margin: 0
    });
  });
}

module.exports = { pageBadge, titleBlock, eyebrow, subtitleLine, bulletList };
