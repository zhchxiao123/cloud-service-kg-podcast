const { addText, rect, base } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 2, '这一集只追四个问题', 'AGENDA');
  const items = [
    ['01', '结论从哪里来？', '显式事实 vs 隐式知识'],
    ['02', '什么驱动归类？', '子类、等价类与限制'],
    ['03', '矛盾怎样出现？', '互斥类与同一个体'],
    ['04', '未知为何不报错？', '开放世界与职责边界'],
  ];
  items.forEach((it, i) => {
    const x = 0.58 + (i % 2) * 4.48;
    const y = 1.42 + Math.floor(i / 2) * 1.45;
    rect(slide, pres, x, y, 4.16, 1.15, theme.secondary, theme.light, 18);
    addText(slide, it[0], x + 0.18, y + 0.12, 0.60, 0.42, { fontSize: 22, color: theme.accent, bold: true, fontFace: 'Liberation Sans' });
    addText(slide, it[1], x + 0.88, y + 0.10, 2.96, 0.44, { fontSize: 18, color: theme.light, bold: true });
    addText(slide, it[2], x + 0.88, y + 0.60, 2.96, 0.30, { fontSize: 11.5, color: theme.accent });
  });
  return slide;
}
module.exports = { createSlide };
