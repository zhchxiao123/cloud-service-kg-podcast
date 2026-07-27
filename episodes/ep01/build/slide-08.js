function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '08', theme);

  slide.addText('痛点三：LLM 会「猜」，本体让它「有据可查」', {
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

  // Bar 1: ~25%
  const bar1H = chartH * 0.55;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 0.80,
    y: chartY + chartH - bar1H,
    w: 2.20,
    h: bar1H,
    fill: { color: 'C0392B' }
  });
  slide.addText('~25%', {
    x: chartX + 0.80,
    y: chartY + chartH - bar1H - 0.45,
    w: 2.20,
    h: 0.35,
    fontSize: 26,
    fontFace: theme.fonts.en,
    color: 'C0392B',
    align: 'center',
    valign: 'bottom',
    bold: true
  });
  slide.addText('普通 LLM\n幻觉率', {
    x: chartX + 0.80,
    y: chartY + chartH,
    w: 2.20,
    h: 0.45,
    fontSize: 14,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'center',
    valign: 'top'
  });

  // Bar 2: 4%
  const bar2H = chartH * 0.09;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 3.40,
    y: chartY + chartH - bar2H,
    w: 2.20,
    h: bar2H,
    fill: { color: theme.colors.secondary }
  });
  slide.addText('4%', {
    x: chartX + 3.40,
    y: chartY + chartH - bar2H - 0.45,
    w: 2.20,
    h: 0.35,
    fontSize: 26,
    fontFace: theme.fonts.en,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'bottom',
    bold: true
  });
  slide.addText('本体 + FDE\n幻觉率', {
    x: chartX + 3.40,
    y: chartY + chartH,
    w: 2.20,
    h: 0.45,
    fontSize: 14,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'center',
    valign: 'top'
  });

  // Key points on the right
  const points = [
    '晦涩字段名让 LLM 靠概率猜',
    '本体方法把幻觉率压到 4% 以下'
  ];
  points.forEach((text, i) => {
    slide.addText(text, {
      x: 6.40,
      y: 1.30 + i * 0.55,
      w: 3.50,
      h: 0.50,
      fontSize: 16,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  return slide;
}

module.exports = { createSlide };
