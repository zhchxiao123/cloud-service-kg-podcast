const { addText, rect, base } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 8, '优先级决定先建什么', 'PRIORITIZE');
  const rows = [
    ['MUST', '没有它，核心交付失败', 1.30, 7.35, theme.accent, 'GPU + 区域可用性'],
    ['SHOULD', '显著提升交付价值', 1.82, 6.30, theme.secondary, '免费额度 · 可比价格'],
    ['NICE', '有价值，但可后置', 2.34, 5.25, theme.light, '迁移路径与证据'],
  ];
  rows.forEach((r, i) => {
    const x = 0.75 + i * 0.52;
    const y = 1.42 + i * 1.03;
    rect(slide, pres, x, y, r[3], 0.78, r[4]);
    addText(slide, r[0], x + 0.20, y, 1.12, 0.78, {
      fontSize: 17, color: i === 2 ? theme.primary : 'FFFFFF', bold: true,
    });
    addText(slide, r[1], x + 1.40, y, 2.35, 0.78, {
      fontSize: 14, color: i === 2 ? theme.primary : 'FFFFFF', bold: true,
    });
    addText(slide, r[5], x + r[3] - 2.65, y, 2.40, 0.78, {
      fontSize: 13, color: i === 2 ? theme.primary : 'FFFFFF', align: 'right',
    });
  });
  addText(slide, '优先级是范围决策，不是永久标签。', 1.30, 4.30, 6.90, 0.26, {
    fontSize: 14, color: theme.primary, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
