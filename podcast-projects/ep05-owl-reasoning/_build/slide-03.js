const { addText, rect, line, base, node } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 3, '显式事实，不等于全部知识', 'ASSERTED → INFERRED');
  addText(slide, '文件里直接写下', 0.62, 1.32, 2.56, 0.30, { fontSize: 13, color: theme.accent, bold: true });
  ['type ComputeService', 'hasRegion Tokyo', 'hasGPU true'].forEach((t, i) => node(slide, pres, theme, t, 0.62, 1.76 + i * 0.68, 2.56, 0.48, false, 12));
  line(slide, pres, 3.38, 2.55, 1.18, 0, theme.accent, 3, 'triangle');
  node(slide, pres, theme, 'OWL\n公理', 4.66, 2.09, 1.20, 0.95, true, 14);
  line(slide, pres, 5.98, 2.55, 1.18, 0, theme.accent, 3, 'triangle');
  addText(slide, '推理器计算得到', 7.22, 1.32, 2.12, 0.30, { fontSize: 13, color: theme.accent, bold: true });
  ['CloudService', 'Regional Offering', 'GPU Offering'].forEach((t, i) => node(slide, pres, theme, t, 7.22, 1.76 + i * 0.68, 2.12, 0.48, i === 2, 11.5));
  rect(slide, pres, 2.00, 4.06, 6.10, 0.48, theme.primary, theme.accent);
  addText(slide, '推理不是概率猜测：结论在所有满足前提的情况下都成立', 2.12, 4.10, 5.86, 0.38, { fontSize: 13, color: theme.light, align: 'center' });
  return slide;
}
module.exports = { createSlide };
