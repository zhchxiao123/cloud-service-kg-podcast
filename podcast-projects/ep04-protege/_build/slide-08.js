const { addText, rect, connector, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 8, 'Domain 与 Range 不是输入校验', 'SEMANTICS');
  pill(slide, pres, 'OWL INFERENCE', 0.72, 1.38, 1.50, theme.primary, theme.light);
  rect(slide, pres, 0.72, 1.92, 5.68, 1.52, theme.light, theme.primary);
  const nodes = [
    [1.00, 'x', '未知类型'],
    [2.92, 'hasProvider', '关系断言'],
    [5.05, 'AWS', '未知类型'],
  ];
  nodes.forEach((n, i) => {
    rect(slide, pres, n[0], 2.26, i === 1 ? 1.36 : 0.92, 0.54,
      i === 1 ? theme.accent : theme.secondary);
    addText(slide, n[1], n[0], 2.26, i === 1 ? 1.36 : 0.92, 0.54, {
      fontFace: 'Liberation Sans', fontSize: 13, color: theme.light, bold: true, align: 'center',
    });
  });
  connector(slide, pres, 1.94, 2.53, 0.94, 0, theme.primary, 2, 'triangle');
  connector(slide, pres, 4.30, 2.53, 0.72, 0, theme.primary, 2, 'triangle');
  addText(slide, 'Domain 推断 x：CloudService', 0.98, 3.04, 2.44, 0.26, {
    fontSize: 12, color: theme.accent, bold: true,
  });
  addText(slide, 'Range 推断 AWS：CloudProvider', 3.63, 3.04, 2.54, 0.26, {
    fontSize: 12, color: theme.accent, bold: true, align: 'right',
  });

  pill(slide, pres, 'NOT VALIDATION', 6.78, 1.38, 1.45, theme.accent, theme.light);
  rect(slide, pres, 6.78, 1.92, 2.52, 1.52, theme.primary);
  addText(slide, '错误关系未必被拒绝', 7.04, 2.14, 2.00, 0.34, {
    fontSize: 17, color: theme.light, bold: true, align: 'center',
  });
  addText(slide, '它可能产生意外类型，\n或在更多公理下形成矛盾。', 7.04, 2.67, 2.00, 0.54, {
    fontSize: 12, color: theme.light, align: 'center', breakLine: true,
  });
  rect(slide, pres, 1.10, 3.85, 7.78, 0.56, theme.secondary);
  addText(slide, '字段必填、允许值和日期格式等数据质量规则  →  SHACL', 1.10, 3.85, 7.78, 0.56, {
    fontSize: 15, color: theme.light, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
