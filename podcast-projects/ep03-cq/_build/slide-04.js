const { addText, rect, line, base } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 4, '“推荐最好的”不是合格问题', 'ANTI-PATTERN');
  rect(slide, pres, 2.12, 1.75, 5.76, 0.88, theme.primary);
  addText(slide, '请推荐最好的 GPU 云服务', 2.12, 1.75, 5.76, 0.88, {
    fontSize: 25, color: 'FFFFFF', bold: true, align: 'center',
  });
  const notes = [
    [0.58, 1.35, '最好 = 哪个维度？'],
    [7.54, 1.35, '适用 = 哪个区域？'],
    [0.58, 3.04, '同规格 = 什么边界？'],
    [7.54, 3.04, '数据 = 哪个时间点？'],
  ];
  notes.forEach((n, i) => {
    rect(slide, pres, n[0], n[1], 1.88, 0.72, i < 2 ? 'E9C46A' : 'FFFFFF', theme.accent);
    addText(slide, n[2], n[0] + 0.08, n[1], 1.72, 0.72, {
      fontSize: 12, color: theme.primary, bold: true, align: 'center',
    });
  });
  line(slide, pres, 2.45, 1.72, -0.72, -0.28, theme.accent, 2);
  line(slide, pres, 7.55, 1.72, 0.72, -0.28, theme.accent, 2);
  line(slide, pres, 2.45, 2.62, -0.72, 0.76, theme.accent, 2);
  line(slide, pres, 7.55, 2.62, 0.72, 0.76, theme.accent, 2);
  addText(slide, '评价维度没有定义，就无法形成唯一、可复核的验收结论。', 1.40, 4.02, 7.20, 0.35, {
    fontSize: 15, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
