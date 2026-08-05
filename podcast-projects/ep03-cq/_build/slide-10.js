const { addText, rect, base, pill, line } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 10, '先定义验收，再开始建模', 'TAKEAWAYS');
  const items = [
    ['1', '写问题', '保留真实业务意图'],
    ['2', '去歧义', '补对象、边界与答案'],
    ['3', '排优先级', 'Must 先进入模型范围'],
    ['4', '建追踪链', '模型、数据、查询、结果'],
  ];
  items.forEach((it, i) => {
    const y = 1.34 + i * 0.72;
    slide.addShape(pres.shapes.OVAL, {
      x: 0.76, y: y + 0.06, w: 0.46, h: 0.46,
      fill: { color: i === 3 ? theme.accent : theme.secondary }, line: { type: 'none' },
    });
    addText(slide, it[0], 0.76, y + 0.06, 0.46, 0.46, {
      fontSize: 15, color: 'FFFFFF', bold: true, align: 'center',
    });
    addText(slide, it[1], 1.44, y, 1.42, 0.58, {
      fontSize: 17, color: theme.primary, bold: true,
    });
    addText(slide, it[2], 2.92, y, 3.10, 0.58, {
      fontSize: 14, color: theme.primary,
    });
  });
  rect(slide, pres, 6.42, 1.38, 2.82, 2.76, theme.primary);
  pill(slide, pres, 'NEXT · EP04', 6.93, 1.72, 1.80, theme.accent);
  addText(slide, '打开 Protégé', 6.74, 2.46, 2.18, 0.45, {
    fontSize: 24, color: 'FFFFFF', bold: true, align: 'center',
  });
  line(slide, pres, 7.18, 3.18, 1.24, 0, theme.light, 3, undefined, 'triangle');
  addText(slide, '从 CQ 到类与属性', 6.74, 3.48, 2.18, 0.32, {
    fontSize: 13, color: theme.light, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
