const FONT_CN = 'Noto Sans CJK SC';
const FONT_EN = 'Liberation Sans';

function addText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.fontFace || FONT_CN,
    fontSize: opts.fontSize || 15,
    color: opts.color || 'FFD60A',
    bold: Boolean(opts.bold),
    align: opts.align || 'left',
    valign: opts.valign || 'middle',
    margin: opts.margin == null ? 0 : opts.margin,
    fit: 'shrink',
    breakLine: false,
    ...opts,
  });
}

function rect(slide, pres, x, y, w, h, fill, lineColor = fill, transparency = 0) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.10,
    fill: { color: fill, transparency },
    line: { color: lineColor, width: lineColor === fill ? 0 : 1.2 },
  });
}

function line(slide, pres, x, y, w, h, color, width = 2, endArrowType) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h, line: { color, width, endArrowType } });
}

function pill(slide, pres, text, x, y, w, fill, color) {
  rect(slide, pres, x, y, w, 0.32, fill, fill);
  addText(slide, text, x, y, w, 0.32, {
    fontFace: FONT_EN, fontSize: 9.5, color, bold: true, align: 'center', charSpacing: 1.1,
  });
}

function pageBadge(slide, pres, theme, num) {
  slide.addShape(pres.shapes.OVAL, {
    x: 9.30, y: 4.25, w: 0.40, h: 0.40,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  addText(slide, String(num), 9.30, 4.25, 0.40, 0.40, {
    fontFace: FONT_EN, fontSize: 13, color: theme.primary, bold: true, align: 'center',
  });
}

function base(slide, pres, theme, page, title, kicker) {
  slide.background = { color: theme.bg };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.14, h: 4.65,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  pill(slide, pres, kicker, 0.54, 0.25, Math.max(1.15, kicker.length * 0.115 + 0.38), theme.secondary, theme.light);
  addText(slide, title, 0.54, 0.64, 8.55, 0.53, {
    fontSize: 28, color: theme.light, bold: true,
  });
  pageBadge(slide, pres, theme, page);
}

function node(slide, pres, theme, text, x, y, w, h, accent = false, fs = 14) {
  rect(slide, pres, x, y, w, h, accent ? theme.accent : theme.secondary,
    accent ? theme.accent : theme.light, accent ? 0 : 18);
  addText(slide, text, x + 0.10, y + 0.04, w - 0.20, h - 0.08, {
    fontSize: fs, color: accent ? theme.primary : theme.light, bold: true, align: 'center',
  });
}

module.exports = { FONT_CN, FONT_EN, addText, rect, line, pill, pageBadge, base, node };
