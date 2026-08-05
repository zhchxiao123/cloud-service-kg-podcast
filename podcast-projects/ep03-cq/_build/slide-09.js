const { addText, rect, line, base } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 9, 'CQ 要落到模型、数据与测试', 'TRACEABILITY');
  const stages = [
    ['CQ', '问题'],
    ['MODEL', '类与属性'],
    ['DATA', '事实与来源'],
    ['QUERY', 'SPARQL'],
    ['RESULT', '预期答案'],
  ];
  stages.forEach((s, i) => {
    const x = 0.52 + i * 1.86;
    const color = [theme.primary, theme.secondary, theme.light, theme.accent, theme.primary][i];
    slide.addShape(pres.shapes.HEXAGON, {
      x, y: 1.55, w: 1.45, h: 1.10,
      fill: { color }, line: { type: 'none' },
    });
    addText(slide, s[0], x + 0.12, 1.73, 1.21, 0.28, {
      fontSize: 13, color: i === 2 ? theme.primary : 'FFFFFF', bold: true, align: 'center',
    });
    addText(slide, s[1], x + 0.12, 2.08, 1.21, 0.28, {
      fontSize: 11, color: i === 2 ? theme.primary : 'FFFFFF', align: 'center',
    });
    if (i < 4) line(slide, pres, x + 1.44, 2.10, 0.40, 0, theme.primary, 2, undefined, 'triangle');
  });
  rect(slide, pres, 0.98, 3.28, 8.04, 0.80, 'FFFFFF', theme.accent);
  addText(slide, '空结果 ≠ 不存在', 1.22, 3.28, 2.10, 0.80, {
    fontSize: 20, color: theme.accent, bold: true, align: 'center',
  });
  addText(slide, '也可能是数据缺失、模型遗漏、映射错误或查询写错', 3.35, 3.28, 5.35, 0.80, {
    fontSize: 15, color: theme.primary, bold: true, align: 'center',
  });
  addText(slide, '每条 Must CQ 都要能追踪到测试证据。', 1.65, 4.35, 6.70, 0.28, {
    fontSize: 14, color: theme.secondary, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
