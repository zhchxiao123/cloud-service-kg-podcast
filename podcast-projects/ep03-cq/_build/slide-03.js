const { addText, rect, line, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 3, 'CQ 是本体的功能需求', 'DEFINITION');
  const xs = [0.62, 3.55, 6.48];
  const data = [
    ['需求', '本体必须回答什么？', theme.secondary],
    ['范围', '哪些概念值得建模？', theme.light],
    ['验收', '怎样判断已经完成？', theme.accent],
  ];
  data.forEach((d, i) => {
    rect(slide, pres, xs[i], 1.52, 2.55, 1.42, i === 1 ? 'E9C46A' : 'FFFFFF', d[2]);
    pill(slide, pres, d[0], xs[i] + 0.18, 1.72, 0.74, d[2], i === 1 ? theme.primary : 'FFFFFF');
    addText(slide, d[1], xs[i] + 0.18, 2.22, 2.15, 0.42, {
      fontSize: 16, color: theme.primary, bold: true, align: 'center',
    });
    if (i < 2) line(slide, pres, xs[i] + 2.58, 2.22, 0.32, 0, theme.primary, 2, undefined, 'triangle');
  });
  rect(slide, pres, 1.45, 3.40, 7.10, 0.70, theme.primary);
  addText(slide, '业务语言的入口  →  本体工程的可测试合同', 1.45, 3.40, 7.10, 0.70, {
    fontSize: 20, color: 'FFFFFF', bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
