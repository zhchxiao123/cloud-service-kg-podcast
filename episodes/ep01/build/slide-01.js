function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  slide.addText('本体到底解决什么问题？', {
    x: 0.55,
    y: 1.80,
    w: 8.90,
    h: 1.00,
    fontSize: 44,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'center',
    valign: 'middle',
    bold: true
  });

  slide.addText('数据孤岛、语义不一致、LLM 幻觉背后的共同根因', {
    x: 0.55,
    y: 2.95,
    w: 8.90,
    h: 0.60,
    fontSize: 20,
    fontFace: theme.fonts.zh,
    color: theme.colors.light,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('《本体工程与知识图谱实战》第 01 集', {
    x: 0.55,
    y: 3.70,
    w: 8.90,
    h: 0.30,
    fontSize: 14,
    fontFace: theme.fonts.zh,
    color: theme.colors.secondary,
    align: 'center',
    valign: 'middle'
  });

  return slide;
}

module.exports = { createSlide };
