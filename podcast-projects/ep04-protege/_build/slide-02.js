const { addText, rect, connector, base, circleLabel } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 2, '本期完成四次转换', 'ROADMAP');
  const steps = [
    ['01', '需求语言', 'CQ 中的对象与关系'],
    ['02', '建模语言', '类、属性与个体'],
    ['03', '工具操作', '依赖顺序与界面'],
    ['04', '可维护文件', '保存、重开与审计'],
  ];
  steps.forEach((s, i) => {
    const x = 0.58 + i * 2.32;
    rect(slide, pres, x, 1.55, 1.92, 2.18, i === 1 ? theme.secondary : theme.light,
      i === 1 ? theme.secondary : theme.primary);
    circleLabel(slide, pres, s[0], x + 0.60, 1.80, 0.72,
      i === 1 ? theme.accent : theme.primary, theme.light, 15);
    addText(slide, s[1], x + 0.20, 2.78, 1.52, 0.36, {
      fontSize: 18, color: i === 1 ? theme.light : theme.primary, bold: true, align: 'center',
    });
    addText(slide, s[2], x + 0.16, 3.26, 1.60, 0.32, {
      fontSize: 12, color: i === 1 ? theme.light : theme.primary, align: 'center',
    });
    if (i < 3) connector(slide, pres, x + 1.96, 2.63, 0.32, 0, theme.accent, 2, 'triangle');
  });
  addText(slide, '需求语言  →  建模语言  →  工具操作  →  可维护文件', 1.28, 4.18, 7.20, 0.30, {
    fontSize: 15, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
