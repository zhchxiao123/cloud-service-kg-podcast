const { addText, rect, connector, base, pill, circleLabel } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 9, 'CQ-01 落成最小本体骨架', 'PROJECT INCREMENT');
  const stats = [
    ['10', '核心类'],
    ['5', '对象属性'],
    ['4', '数据属性'],
    ['2', '注释属性'],
  ];
  stats.forEach((s, i) => {
    const x = 0.62 + i * 1.38;
    rect(slide, pres, x, 1.36, 1.16, 0.82, i === 0 ? theme.accent : theme.primary);
    addText(slide, s[0], x, 1.43, 1.16, 0.34, {
      fontFace: 'Liberation Sans', fontSize: 24, color: theme.light, bold: true, align: 'center',
    });
    addText(slide, s[1], x, 1.82, 1.16, 0.22, {
      fontSize: 10, color: theme.light, align: 'center',
    });
  });
  pill(slide, pres, 'CQ-01 TRACE', 6.48, 1.36, 1.36, theme.secondary, theme.light);
  const network = [
    [7.30, 2.05, 'AWS_EC2', theme.accent],
    [6.15, 3.15, 'AWS', theme.primary],
    [8.45, 3.15, 'Tokyo', theme.secondary],
  ];
  network.forEach((n) => {
    circleLabel(slide, pres, n[2], n[0], n[1], 0.90, n[3], theme.light, 10);
  });
  connector(slide, pres, 7.43, 2.82, -0.62, 0.48, theme.primary, 2, 'triangle');
  connector(slide, pres, 8.07, 2.82, 0.70, 0.48, theme.primary, 2, 'triangle');
  addText(slide, 'hasProvider', 6.52, 2.79, 1.15, 0.22, {
    fontFace: 'Liberation Sans', fontSize: 9, color: theme.accent, bold: true,
  });
  addText(slide, 'hasRegion', 8.15, 2.79, 1.05, 0.22, {
    fontFace: 'Liberation Sans', fontSize: 9, color: theme.accent, bold: true, align: 'right',
  });
  const checks = [
    'AWS 与 Azure 两个厂商',
    'AWS_EC2 与 Azure_VM 两个服务',
    '东京与新加坡两个区域',
    '双语标签、定义与证据',
  ];
  checks.forEach((t, i) => {
    circleLabel(slide, pres, '✓', 0.78, 2.55 + i * 0.47, 0.28,
      i === 3 ? theme.accent : theme.secondary, theme.light, 10);
    addText(slide, t, 1.20, 2.49 + i * 0.47, 4.25, 0.34, {
      fontSize: 13, color: theme.primary,
    });
  });
  return slide;
}
module.exports = { createSlide };
