function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '02', theme);

  slide.addText('本期要聊什么', {
    x: 0.55,
    y: 0.35,
    w: 8.90,
    h: 0.60,
    fontSize: 30,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  const items = [
    { n: 1, text: '一个客服问题为什么会难住 AI？' },
    { n: 2, text: '数据孤岛、语义不一致、LLM 幻觉三者之间有什么联系？' },
    { n: 3, text: '本体为什么是企业 AI 落地的必修课？' }
  ];

  items.forEach((it, i) => {
    const y = 1.35 + i * 1.05;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.70,
      y: y + 0.05,
      w: 0.45,
      h: 0.45,
      fill: { color: theme.colors.secondary },
      rectRadius: 0.10
    });
    slide.addText(String(it.n), {
      x: 0.70,
      y: y + 0.05,
      w: 0.45,
      h: 0.45,
      fontSize: 18,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
    slide.addText(it.text, {
      x: 1.40,
      y: y,
      w: 7.80,
      h: 0.55,
      fontSize: 20,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  return slide;
}

module.exports = { createSlide };
