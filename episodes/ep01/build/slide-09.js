function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '09', theme);

  slide.addText('三个行业，同一套解题思路', {
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

  // Industry cards
  const cards = [
    { title: '制造', detail: '四系统语义统一', x: 0.70, color: theme.colors.light },
    { title: 'HVAC', detail: 'PDF 手册术语归一化', x: 3.70, color: theme.colors.accent },
    { title: '金融 / 物流', detail: '客户 360 与风控', x: 6.70, color: theme.colors.secondary }
  ];

  cards.forEach((c) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x,
      y: 1.45,
      w: 2.30,
      h: 2.20,
      fill: { color: c.color },
      rectRadius: 0.12
    });
    slide.addText(c.title, {
      x: c.x,
      y: 1.65,
      w: 2.30,
      h: 0.55,
      fontSize: 26,
      fontFace: theme.fonts.zh,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
    slide.addText(c.detail, {
      x: c.x,
      y: 2.35,
      w: 2.30,
      h: 1.00,
      fontSize: 15,
      fontFace: theme.fonts.zh,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle'
    });
  });

  // Pipeline below cards
  const pipeY = 4.00;
  const steps = [
    { label: '本体', x: 1.0, color: theme.colors.primary },
    { label: '知识图谱', x: 3.5, color: theme.colors.secondary },
    { label: 'AI Agent', x: 6.5, color: theme.colors.accent }
  ];

  slide.addShape(pres.shapes.LINE, {
    x: 1.0,
    y: pipeY + 0.25,
    w: 6.7,
    h: 0,
    line: { color: theme.colors.light, width: 3, endArrowType: 'arrow' }
  });

  steps.forEach((s) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: s.x,
      y: pipeY,
      w: 2.00,
      h: 0.50,
      fill: { color: s.color },
      rectRadius: 0.08
    });
    slide.addText(s.label, {
      x: s.x,
      y: pipeY,
      w: 2.00,
      h: 0.50,
      fontSize: 14,
      fontFace: theme.fonts.zh,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
  });

  return slide;
}

module.exports = { createSlide };
