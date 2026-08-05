const FONT_CN = 'Noto Sans CJK SC';
const FONT_EN = 'Liberation Sans';

function addText(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.fontFace || FONT_CN,
    fontSize: opts.fontSize || 16,
    color: opts.color || '264653',
    bold: Boolean(opts.bold),
    align: opts.align || 'left',
    valign: opts.valign || 'middle',
    margin: opts.margin == null ? 0 : opts.margin,
    breakLine: false,
    fit: 'shrink',
    ...opts,
  });
}

function rect(slide, pres, x, y, w, h, fill, line = fill, radius = 0.08) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, width: line === fill ? 0 : 1.2 },
  });
}

function line(slide, pres, x, y, w, h, color, width = 2, beginArrowType, endArrowType) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h,
    line: { color, width, beginArrowType, endArrowType },
  });
}

function base(slide, pres, theme, page, title, kicker) {
  slide.background = { color: theme.bg };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.secondary }, line: { type: 'none' },
  });
  if (kicker) {
    addText(slide, kicker.toUpperCase(), 0.55, 0.25, 2.8, 0.22, {
      fontFace: FONT_EN, fontSize: 10, color: theme.accent, bold: true,
      charSpacing: 1.5,
    });
  }
  addText(slide, title, 0.55, 0.48, 8.85, 0.54, {
    fontSize: 27, color: theme.primary, bold: true,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.08, w: 0.72, h: 0.05,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  if (page != null) pageBadge(slide, pres, theme, page);
}

function pageBadge(slide, pres, theme, num) {
  slide.addShape(pres.shapes.OVAL, {
    x: 9.30, y: 4.25, w: 0.40, h: 0.40,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  addText(slide, String(num), 9.30, 4.25, 0.40, 0.40, {
    fontFace: FONT_EN, fontSize: 14, color: 'FFFFFF', bold: true,
    align: 'center',
  });
}

function pill(slide, pres, text, x, y, w, fill, color = 'FFFFFF') {
  rect(slide, pres, x, y, w, 0.34, fill);
  addText(slide, text, x, y, w, 0.34, {
    fontSize: 12, color, bold: true, align: 'center',
  });
}

function dot(slide, pres, x, y, color, size = 0.12) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color }, line: { type: 'none' },
  });
}

module.exports = { FONT_CN, FONT_EN, addText, rect, line, base, pageBadge, pill, dot };
