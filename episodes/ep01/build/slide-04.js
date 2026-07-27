function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '04', theme);

  slide.addText('痛点一：数据孤岛不是问题，语义孤岛才是', {
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

  // Bar chart area
  const chartX = 0.75;
  const chartY = 1.25;
  const chartH = 2.60;

  // Baseline
  slide.addShape(pres.shapes.LINE, {
    x: chartX,
    y: chartY + chartH,
    w: 6.00,
    h: 0,
    line: { color: theme.colors.light, width: 2 }
  });

  // Bar 1: 56%
  const bar1H = chartH * 0.56;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 0.80,
    y: chartY + chartH - bar1H,
    w: 2.20,
    h: bar1H,
    fill: { color: theme.colors.secondary }
  });
  slide.addText('56%', {
    x: chartX + 0.80,
    y: chartY + chartH - bar1H - 0.45,
    w: 2.20,
    h: 0.35,
    fontSize: 24,
    fontFace: theme.fonts.en,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'bottom',
    bold: true
  });
  slide.addText('企业视数据孤岛为\nAI 落地首要障碍', {
    x: chartX + 0.80,
    y: chartY + chartH,
    w: 2.20,
    h: 0.45,
    fontSize: 13,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'center',
    valign: 'top'
  });

  // Bar 2: 7%
  const bar2H = chartH * 0.07;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 3.40,
    y: chartY + chartH - bar2H,
    w: 2.20,
    h: bar2H,
    fill: { color: theme.colors.light }
  });
  slide.addText('7%', {
    x: chartX + 3.40,
    y: chartY + chartH - bar2H - 0.45,
    w: 2.20,
    h: 0.35,
    fontSize: 24,
    fontFace: theme.fonts.en,
    color: theme.colors.light,
    align: 'center',
    valign: 'bottom',
    bold: true
  });
  slide.addText('自认已完全\nAI-ready', {
    x: chartX + 3.40,
    y: chartY + chartH,
    w: 2.20,
    h: 0.45,
    fontSize: 13,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'center',
    valign: 'top'
  });

  // Key points on the right
  const points = [
    '客户在不同系统里名字不同',
    'SQL 关联的真是同一实体？'
  ];
  points.forEach((text, i) => {
    slide.addText(text, {
      x: 6.55,
      y: 1.30 + i * 0.35,
      w: 3.10,
      h: 0.30,
      fontSize: 15,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  return slide;
}

module.exports = { createSlide };
