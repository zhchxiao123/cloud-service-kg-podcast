const { addText, rect, line, pill, node } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: theme.accent }, line: { type: 'none' } });
  pill(slide, pres, 'EP05 · OWL REASONING', 0.62, 0.62, 2.18, theme.secondary, theme.light);
  addText(slide, '机器究竟\n推断出了什么？', 0.62, 1.22, 4.48, 1.72, { fontSize: 35, color: theme.light, bold: true, breakLine: true });
  addText(slide, '从显式事实到自动归类，再到可解释的逻辑冲突', 0.64, 3.12, 4.20, 0.72, { fontSize: 16, color: theme.accent });
  node(slide, pres, theme, 'ASSERTED\n三条事实', 5.68, 0.86, 2.25, 0.82, false, 13);
  line(slide, pres, 6.80, 1.68, 0, 0.50, theme.accent, 3, 'triangle');
  node(slide, pres, theme, 'OWL AXIOMS\n明确规则', 5.68, 2.18, 2.25, 0.82, true, 13);
  line(slide, pres, 6.80, 3.00, 0, 0.50, theme.accent, 3, 'triangle');
  node(slide, pres, theme, 'INFERRED\n必然结论', 5.68, 3.50, 2.25, 0.82, false, 13);
  addText(slide, '不是猜测，是可追溯的蕴含', 5.30, 4.62, 3.05, 0.34, { fontSize: 12, color: theme.light, align: 'center' });
  return slide;
}
module.exports = { createSlide };
