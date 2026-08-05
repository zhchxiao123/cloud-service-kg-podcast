const { addText, rect, line, base, node, pill } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 7, '三条事实，推断出三个新类型', 'HERMIT DEMO');
  pill(slide, pres, 'ASSERTED', 0.62, 1.38, 1.08, theme.secondary, theme.light);
  const facts = ['type ComputeService', 'hasRegion Tokyo', 'hasGPU true'];
  facts.forEach((t, i) => node(slide, pres, theme, t, 0.62, 1.92 + i * 0.72, 2.60, 0.50, false, 11.5));
  node(slide, pres, theme, 'HermiT\nSTART REASONER', 3.78, 2.12, 2.10, 1.30, true, 14);
  line(slide, pres, 3.22, 2.66, 0.56, 0, theme.accent, 3, 'triangle');
  line(slide, pres, 5.88, 2.66, 0.56, 0, theme.accent, 3, 'triangle');
  pill(slide, pres, 'INFERRED', 6.44, 1.38, 1.08, theme.accent, theme.primary);
  ['CloudService', 'Regional Offering', 'GPU Offering'].forEach((t, i) => node(slide, pres, theme, t, 6.44, 1.92 + i * 0.72, 2.60, 0.50, i === 2, 11.5));
  rect(slide, pres, 2.54, 4.10, 4.96, 0.42, theme.primary, theme.light);
  addText(slide, '查看黄色推断项，并用解释功能追踪公理链', 2.68, 4.14, 4.68, 0.32, { fontSize: 12.5, color: theme.light, align: 'center' });
  return slide;
}
module.exports = { createSlide };
