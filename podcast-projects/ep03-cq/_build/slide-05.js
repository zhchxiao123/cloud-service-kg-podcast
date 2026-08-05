const { addText, rect, base } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 5, '好 CQ 有四个检查点', 'QUALITY GATE');
  const checks = [
    ['1', '对象明确', '要回答哪些实体或类别'],
    ['2', '边界明确', '区域、时间与比较口径'],
    ['3', '数据可得', '知道证据从哪里来'],
    ['4', '答案可验', '输出形式可以被检查'],
  ];
  checks.forEach((c, i) => {
    const x = 0.72 + i * 2.28;
    rect(slide, pres, x, 1.55, 1.96, 2.35, i % 2 ? 'FFFFFF' : 'E9C46A', theme.secondary);
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.65, y: 1.82, w: 0.66, h: 0.66,
      fill: { color: i === 3 ? theme.accent : theme.secondary }, line: { type: 'none' },
    });
    addText(slide, c[0], x + 0.65, 1.82, 0.66, 0.66, {
      fontSize: 21, color: 'FFFFFF', bold: true, align: 'center',
    });
    addText(slide, c[1], x + 0.18, 2.67, 1.60, 0.36, {
      fontSize: 18, color: theme.primary, bold: true, align: 'center',
    });
    addText(slide, c[2], x + 0.17, 3.18, 1.62, 0.46, {
      fontSize: 12, color: theme.primary, align: 'center',
    });
  });
  addText(slide, '四项都能回答，才进入正式 CQ 清单。', 2.05, 4.16, 5.90, 0.30, {
    fontSize: 15, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
