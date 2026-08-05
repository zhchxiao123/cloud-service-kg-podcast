const { addText, rect, connector, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 3, '先做概念表，再操作工具', 'CONCEPT TABLE');
  rect(slide, pres, 0.70, 1.32, 8.60, 0.64, theme.primary);
  addText(slide, '哪些计算服务支持 GPU，并在东京或新加坡区域可用？', 0.70, 1.32, 8.60, 0.64, {
    fontSize: 20, color: theme.light, bold: true, align: 'center',
  });
  const cols = [
    ['名词', 'ComputeService\nRegion', '类 / 个体'],
    ['动词', '提供 · 可用', '对象属性'],
    ['值', 'GPU = true', '数据属性'],
    ['证据', '来源 · 日期', '注释属性'],
  ];
  cols.forEach((c, i) => {
    const x = 0.66 + i * 2.26;
    connector(slide, pres, x + 0.98, 1.97, 0, 0.32, theme.accent, 2, 'triangle');
    pill(slide, pres, c[0], x + 0.55, 2.34, 0.86, i === 0 ? theme.accent : theme.secondary, theme.light);
    rect(slide, pres, x, 2.83, 1.96, 0.66, theme.light, theme.primary);
    addText(slide, c[1], x + 0.10, 2.83, 1.76, 0.66, {
      fontSize: 14, color: theme.primary, bold: true, align: 'center', breakLine: true,
    });
    rect(slide, pres, x + 0.19, 3.68, 1.58, 0.48, theme.secondary);
    addText(slide, c[2], x + 0.19, 3.68, 1.58, 0.48, {
      fontSize: 13, color: theme.light, bold: true, align: 'center',
    });
  });
  return slide;
}
module.exports = { createSlide };
