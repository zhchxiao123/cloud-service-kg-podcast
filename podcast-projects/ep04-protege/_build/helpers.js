const FONT_CN = 'Noto Sans CJK SC';
const FONT_EN = 'Liberation Sans';

function addText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.fontFace || FONT_CN,
    fontSize: opts.fontSize || 15,
    color: opts.color || '003049',
    bold: Boolean(opts.bold),
    align: opts.align || 'left',
    valign: opts.valign || 'middle',
    margin: opts.margin == null ? 0 : opts.margin,
    fit: 'shrink',
    ...opts,
  });
}

function rect(slide, pres, x, y, w, h, fill, lineColor = fill, radius = 0.08, transparency = 0) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill, transparency },
    line: { color: lineColor, width: lineColor === fill ? 0 : 1.25 },
  });
}

function connector(slide, pres, x, y, w, h, color, width = 2, endArrowType) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h,
    line: { color, width, endArrowType },
  });
}

function pill(slide, pres, text, x, y, w, fill, color) {
  rect(slide, pres, x, y, w, 0.32, fill, fill, 0.16);
  addText(slide, text, x, y, w, 0.32, {
    fontFace: FONT_EN, fontSize: 10, color, bold: true, align: 'center',
    charSpacing: 1.2,
  });
}

function pageBadge(slide, pres, theme, num) {
  slide.addShape(pres.shapes.OVAL, {
    x: 9.30, y: 4.25, w: 0.40, h: 0.40,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  addText(slide, String(num), 9.30, 4.25, 0.40, 0.40, {
    fontFace: FONT_EN, fontSize: 14, color: theme.light, bold: true, align: 'center',
  });
}

function base(slide, pres, theme, page, title, kicker) {
  slide.background = { color: theme.bg };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.16, h: 4.65,
    fill: { color: theme.primary }, line: { type: 'none' },
  });
  pill(slide, pres, kicker, 0.56, 0.26, Math.max(1.05, kicker.length * 0.115 + 0.35), theme.accent, theme.light);
  addText(slide, title, 0.56, 0.64, 8.70, 0.52, {
    fontSize: 29, color: theme.primary, bold: true,
  });
  pageBadge(slide, pres, theme, page);
}

function circleLabel(slide, pres, text, x, y, size, fill, color, fs = 15) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color: fill }, line: { type: 'none' },
  });
  addText(slide, text, x, y, size, size, {
    fontSize: fs, color, bold: true, align: 'center',
  });
}

module.exports = { FONT_CN, FONT_EN, addText, rect, connector, pill, pageBadge, base, circleLabel };
