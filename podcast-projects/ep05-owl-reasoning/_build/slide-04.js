const { addText, rect, line, base, node } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 4, 'subClassOf 让类型沿层级传递', 'CLASS HIERARCHY');
  node(slide, pres, theme, 'Demo_GPU_Service', 0.68, 2.12, 2.18, 0.64, false, 13);
  line(slide, pres, 2.86, 2.44, 0.78, 0, theme.accent, 3, 'triangle');
  node(slide, pres, theme, 'ComputeService', 3.64, 2.12, 2.05, 0.64, true, 13);
  line(slide, pres, 5.69, 2.44, 0.78, 0, theme.accent, 3, 'triangle');
  node(slide, pres, theme, 'CloudService', 6.47, 2.12, 2.05, 0.64, false, 13);
  addText(slide, 'ASSERTED TYPE', 0.68, 1.66, 2.18, 0.28, { fontSize: 10, color: theme.accent, bold: true, align: 'center', fontFace: 'Liberation Sans' });
  addText(slide, 'subClassOf', 2.85, 1.70, 0.82, 0.28, { fontSize: 9.5, color: theme.accent, bold: true, align: 'center', fontFace: 'Liberation Sans' });
  addText(slide, 'INFERRED TYPE', 6.47, 1.66, 2.05, 0.28, { fontSize: 10, color: theme.accent, bold: true, align: 'center', fontFace: 'Liberation Sans' });
  rect(slide, pres, 1.22, 3.54, 7.12, 0.72, theme.secondary, theme.light, 22);
  addText(slide, '标签“Compute”不会触发推理；正式公理才会。', 1.48, 3.70, 6.60, 0.36, { fontSize: 16, color: theme.light, bold: true, align: 'center' });
  return slide;
}
module.exports = { createSlide };
