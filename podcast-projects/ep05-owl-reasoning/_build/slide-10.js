const { addText, rect, line, base, node } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 10, '会解释结果，才算真正会推理', 'TAKEAWAYS');
  const xs = [0.62, 2.86, 5.10, 7.34];
  const ys = [3.22, 2.72, 2.22, 1.72];
  const labels = ['显式事实', '定义类归类', '互斥暴露冲突', 'SPARQL 验证 CQ'];
  xs.forEach((x, i) => {
    rect(slide, pres, x, ys[i], 1.96, 0.74, i === 3 ? theme.accent : theme.secondary, i === 3 ? theme.accent : theme.light, i === 3 ? 0 : 20);
    addText(slide, String(i + 1).padStart(2, '0'), x + 0.12, ys[i] + 0.10, 0.38, 0.28, { fontSize: 13, color: i === 3 ? theme.primary : theme.accent, bold: true, fontFace: 'Liberation Sans' });
    addText(slide, labels[i], x + 0.48, ys[i] + 0.10, 1.34, 0.48, { fontSize: 12.5, color: i === 3 ? theme.primary : theme.light, bold: true, align: 'center' });
    if (i < 3) line(slide, pres, x + 1.96, ys[i] + 0.37, 0.28, -0.50, theme.accent, 2, 'triangle');
  });
  addText(slide, '下一集', 7.34, 1.26, 1.96, 0.26, { fontSize: 11, color: theme.accent, bold: true, align: 'center' });
  rect(slide, pres, 1.32, 4.18, 6.86, 0.38, theme.primary, theme.accent);
  addText(slide, '解释自动分类的公理链，也解释造成冲突的最小公理集', 1.46, 4.21, 6.58, 0.30, { fontSize: 12.5, color: theme.light, align: 'center' });
  return slide;
}
module.exports = { createSlide };
