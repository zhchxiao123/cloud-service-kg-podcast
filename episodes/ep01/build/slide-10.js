function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '10', theme);

  slide.addText('关键洞察：本体是 AI 理解企业数据的语义地基', {
    x: 0.55,
    y: 0.35,
    w: 8.90,
    h: 0.80,
    fontSize: 26,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  const insights = [
    { num: '01', text: '数据孤岛本质是语义孤岛' },
    { num: '02', text: 'LLM 不会自动理解业务' },
    { num: '03', text: '本体工程是企业 AI 落地必修课' }
  ];

  insights.forEach((item, i) => {
    const y = 1.45 + i * 0.95;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.70,
      y: y,
      w: 0.65,
      h: 0.65,
      fill: { color: theme.colors.secondary },
      rectRadius: 0.12
    });
    slide.addText(item.num, {
      x: 0.70,
      y: y,
      w: 0.65,
      h: 0.65,
      fontSize: 20,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });

    slide.addText(item.text, {
      x: 1.60,
      y: y,
      w: 7.50,
      h: 0.65,
      fontSize: 24,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle',
      bold: true
    });
  });

  // Call to action
  slide.addText('行动建议：找出公司里三个在不同系统里名称不同但指同一事物的词', {
    x: 0.70,
    y: 4.25,
    w: 8.60,
    h: 0.30,
    fontSize: 15,
    fontFace: theme.fonts.zh,
    color: theme.colors.secondary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  return slide;
}

module.exports = { createSlide };
