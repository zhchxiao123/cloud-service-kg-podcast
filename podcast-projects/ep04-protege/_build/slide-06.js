const { addText, rect, connector, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 6, 'TBox 定义语言，ABox 记录事实', 'TBOX / ABOX');
  rect(slide, pres, 0.66, 1.42, 4.02, 2.68, theme.primary);
  pill(slide, pres, 'TBOX', 0.96, 1.72, 1.10, theme.accent, theme.light);
  addText(slide, '词典与语法', 0.96, 2.23, 2.64, 0.34, {
    fontSize: 22, color: theme.light, bold: true,
  });
  addText(slide, 'ComputeService  ⊑  CloudService\nhasProvider：CloudService → CloudProvider', 0.96, 2.83, 3.34, 0.82, {
    fontSize: 14, color: theme.light, breakLine: true,
  });
  rect(slide, pres, 5.32, 1.42, 4.02, 2.68, theme.secondary);
  pill(slide, pres, 'ABOX', 5.62, 1.72, 1.10, theme.light, theme.primary);
  addText(slide, '具体事实', 5.62, 2.23, 2.64, 0.34, {
    fontSize: 22, color: theme.light, bold: true,
  });
  addText(slide, 'AWS_EC2：ComputeService\nAWS_EC2  hasRegion  Tokyo', 5.62, 2.83, 3.34, 0.82, {
    fontSize: 14, color: theme.light, breakLine: true,
  });
  connector(slide, pres, 4.72, 2.74, 0.56, 0, theme.accent, 3, 'triangle');
  addText(slide, '同一 Turtle 文件 · 两种概念职责', 2.35, 4.36, 5.30, 0.28, {
    fontSize: 15, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
