const { addText, rect, line, base, node, pill } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 5, 'equivalentClass 给出充分且必要条件', 'DEFINED CLASS');
  rect(slide, pres, 0.60, 1.44, 3.60, 2.58, theme.secondary, theme.light, 20);
  pill(slide, pres, 'CONDITIONS', 0.82, 1.66, 1.25, theme.primary, theme.accent);
  node(slide, pres, theme, 'ComputeService', 0.92, 2.22, 2.95, 0.52, false, 13);
  addText(slide, 'AND', 1.82, 2.82, 1.15, 0.32, { fontSize: 12, color: theme.accent, bold: true, align: 'center', fontFace: 'Liberation Sans' });
  node(slide, pres, theme, 'hasGPU value true', 0.92, 3.18, 2.95, 0.52, false, 13);
  line(slide, pres, 4.38, 2.43, 1.10, 0, theme.accent, 3, 'triangle');
  line(slide, pres, 5.48, 2.83, -1.10, 0, theme.light, 2, 'triangle');
  node(slide, pres, theme, 'GPUComputeOffering', 5.68, 2.08, 3.56, 1.02, true, 16);
  addText(slide, '充分条件：满足左侧，就能自动归类', 5.74, 3.40, 3.42, 0.30, { fontSize: 12, color: theme.light, align: 'center' });
  addText(slide, '必要条件：属于右侧，就必须满足左侧', 5.74, 3.78, 3.42, 0.30, { fontSize: 12, color: theme.accent, align: 'center' });
  return slide;
}
module.exports = { createSlide };
