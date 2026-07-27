function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '07', theme);

  slide.addText('本体是什么？不只是高级版 E-R 图', {
    x: 0.55,
    y: 0.35,
    w: 8.90,
    h: 0.70,
    fontSize: 28,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  // Left side: E-R hint
  slide.addText('E-R 图：给人类看', {
    x: 0.70,
    y: 1.25,
    w: 3.80,
    h: 0.30,
    fontSize: 16,
    fontFace: theme.fonts.zh,
    color: theme.colors.light,
    align: 'center',
    valign: 'middle'
  });

  const erBoxes = [
    { label: 'Customer', x: 0.70, y: 1.75 },
    { label: 'Order', x: 3.00, y: 1.75 }
  ];
  erBoxes.forEach((b) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: b.x,
      y: b.y,
      w: 1.50,
      h: 0.65,
      fill: { color: theme.colors.light }
    });
    slide.addText(b.label, {
      x: b.x,
      y: b.y,
      w: 1.50,
      h: 0.65,
      fontSize: 16,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
  });

  slide.addShape(pres.shapes.DIAMOND, {
    x: 1.95,
    y: 2.60,
    w: 1.00,
    h: 0.80,
    fill: { color: theme.colors.accent }
  });
  slide.addText('places', {
    x: 1.95,
    y: 2.60,
    w: 1.00,
    h: 0.80,
    fontSize: 12,
    fontFace: theme.fonts.en,
    color: theme.colors.bg,
    align: 'center',
    valign: 'middle',
    bold: true
  });

  // Right side: Ontology graph
  slide.addText('本体：给机器执行', {
    x: 5.30,
    y: 1.05,
    w: 3.80,
    h: 0.30,
    fontSize: 16,
    fontFace: theme.fonts.zh,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'middle'
  });

  const ontNodes = [
    { label: ':Customer', x: 5.30, y: 1.80 },
    { label: ':Order', x: 7.60, y: 1.80 }
  ];
  ontNodes.forEach((n) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: n.x,
      y: n.y,
      w: 1.50,
      h: 0.55,
      fill: { color: theme.colors.secondary },
      rectRadius: 0.10
    });
    slide.addText(n.label, {
      x: n.x,
      y: n.y,
      w: 1.50,
      h: 0.55,
      fontSize: 14,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
  });

  slide.addShape(pres.shapes.LINE, {
    x: 6.80,
    y: 2.08,
    w: 0.80,
    h: 0,
    line: { color: theme.colors.light, width: 2, endArrowType: 'arrow' }
  });
  slide.addText('placesOrder', {
    x: 6.30,
    y: 1.50,
    w: 2.00,
    h: 0.28,
    fontSize: 13,
    fontFace: theme.fonts.en,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'middle',
    bold: true
  });

  // Key points bottom
  const points = [
    '形式化的领域概念、关系、约束',
    '机器可读、可共享、可推理',
    'RDF / OWL 是常见表达格式'
  ];
  points.forEach((text, i) => {
    slide.addText(text, {
      x: 0.70,
      y: 3.70 + i * 0.30,
      w: 8.60,
      h: 0.27,
      fontSize: 17,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  return slide;
}

module.exports = { createSlide };
