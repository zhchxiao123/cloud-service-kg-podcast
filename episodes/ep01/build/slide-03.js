function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '03', theme);

  slide.addText('开场故事：客户问了一句', {
    x: 0.50,
    y: 0.30,
    w: 8.90,
    h: 0.45,
    fontSize: 22,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });
  slide.addText('「我的订单为什么延迟？」', {
    x: 0.50,
    y: 0.80,
    w: 8.90,
    h: 0.55,
    fontSize: 34,
    fontFace: theme.fonts.zh,
    color: theme.colors.secondary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  // Top key points
  const points = [
    '答案散落在 5 个系统里',
    '每个系统都说自己是对的'
  ];
  points.forEach((text, i) => {
    slide.addText(text, {
      x: 0.70,
      y: 1.45 + i * 0.40,
      w: 8.60,
      h: 0.35,
      fontSize: 18,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  // Center question mark
  slide.addText('？', {
    x: 4.40,
    y: 2.05,
    w: 1.20,
    h: 1.00,
    fontSize: 70,
    fontFace: theme.fonts.en,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'middle',
    bold: true
  });

  // Five system boxes around the question mark
  const systems = [
    { label: 'ERP', x: 1.20, y: 2.90, color: theme.colors.light },
    { label: 'MES', x: 7.50, y: 2.90, color: theme.colors.light },
    { label: 'WMS', x: 1.00, y: 3.80, color: theme.colors.accent },
    { label: '物流', x: 4.35, y: 3.80, color: theme.colors.accent },
    { label: '客服', x: 7.40, y: 3.80, color: theme.colors.light }
  ];

  systems.forEach((sys) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sys.x,
      y: sys.y,
      w: 1.30,
      h: 0.75,
      fill: { color: sys.color },
      rectRadius: 0.08
    });
    slide.addText(sys.label, {
      x: sys.x,
      y: sys.y,
      w: 1.30,
      h: 0.75,
      fontSize: 22,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
  });

  return slide;
}

module.exports = { createSlide };
