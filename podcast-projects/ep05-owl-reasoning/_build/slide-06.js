const { addText, rect, base, pill } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 6, 'some 是存在，不是布尔值为真', 'SOME vs VALUE');
  rect(slide, pres, 0.60, 1.42, 4.18, 2.80, theme.secondary, theme.light, 18);
  pill(slide, pres, 'someValuesFrom', 0.86, 1.66, 1.54, theme.primary, theme.accent);
  addText(slide, 'hasRegion some Region', 0.86, 2.22, 3.66, 0.46, { fontSize: 19, color: theme.light, bold: true, fontFace: 'Liberation Sans' });
  addText(slide, '至少存在一个目标属于 Region', 0.86, 2.80, 3.40, 0.36, { fontSize: 14, color: theme.accent });
  addText(slide, '目标可以暂时没有名字', 0.86, 3.38, 3.40, 0.34, { fontSize: 13, color: theme.light });
  rect(slide, pres, 5.06, 1.42, 4.18, 2.80, theme.primary, theme.accent);
  pill(slide, pres, 'hasValue', 5.32, 1.66, 1.16, theme.accent, theme.primary);
  addText(slide, 'hasGPU value true', 5.32, 2.22, 3.66, 0.46, { fontSize: 19, color: theme.accent, bold: true, fontFace: 'Liberation Sans' });
  addText(slide, '具体数据值必须等于 true', 5.32, 2.80, 3.40, 0.36, { fontSize: 14, color: theme.light });
  addText(slide, 'some boolean 也会接受 false', 5.32, 3.38, 3.40, 0.34, { fontSize: 13, color: theme.accent, bold: true });
  return slide;
}
module.exports = { createSlide };
