const { addText, rect, line, base, node } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 8, '三条公理，制造一个可解释冲突', 'DISJOINTNESS');
  node(slide, pres, theme, 'ComputeService', 0.74, 1.62, 2.30, 0.68, false, 14);
  node(slide, pres, theme, 'StorageService', 6.96, 1.62, 2.30, 0.68, false, 14);
  line(slide, pres, 3.04, 1.96, 3.92, 0, theme.accent, 3);
  rect(slide, pres, 4.00, 1.70, 2.00, 0.52, theme.primary, theme.accent);
  addText(slide, 'owl:disjointWith', 4.10, 1.78, 1.80, 0.34, { fontSize: 11, color: theme.accent, bold: true, align: 'center', fontFace: 'Liberation Sans' });
  node(slide, pres, theme, 'Broken_Service', 3.70, 3.34, 2.60, 0.76, true, 15);
  line(slide, pres, 4.38, 3.34, -2.26, -1.04, theme.light, 2, 'triangle');
  line(slide, pres, 5.62, 3.34, 2.26, -1.04, theme.light, 2, 'triangle');
  addText(slide, 'rdf:type', 2.72, 2.76, 0.86, 0.28, { fontSize: 10, color: theme.light, fontFace: 'Liberation Sans' });
  addText(slide, 'rdf:type', 6.42, 2.76, 0.86, 0.28, { fontSize: 10, color: theme.light, fontFace: 'Liberation Sans' });
  addText(slide, '双重类型本身不矛盾；互斥公理让三者无法同时成立。', 1.74, 4.28, 6.52, 0.30, { fontSize: 13, color: theme.accent, bold: true, align: 'center' });
  return slide;
}
module.exports = { createSlide };
