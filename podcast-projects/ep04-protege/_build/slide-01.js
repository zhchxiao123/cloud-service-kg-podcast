const pptxgen = require('pptxgenjs');
const { addText, rect, connector, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.10,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  pill(slide, pres, 'EPISODE 04', 0.70, 0.68, 1.52, theme.accent, theme.light);
  addText(slide, '从 CQ 到\n第一个本体', 0.70, 1.35, 5.20, 1.36, {
    fontSize: 44, color: theme.light, bold: true, breakLine: true,
  });
  addText(slide, '先想清楚模型，再打开 Protégé', 0.74, 2.95, 5.20, 0.42, {
    fontSize: 19, color: theme.secondary, bold: true,
  });
  addText(slide, '《本体工程与知识图谱实战》', 0.74, 3.70, 4.10, 0.28, {
    fontSize: 13, color: theme.light,
  });

  // Correct semantic flow: a CQ is transformed into modeling elements,
  // rather than being presented as a superclass of CloudService.
  pill(slide, pres, 'CQ-01', 7.15, 0.62, 1.30, theme.accent, theme.light);
  connector(slide, pres, 7.80, 0.96, 0, 0.30, theme.light, 2, 'triangle');

  rect(slide, pres, 6.20, 1.34, 3.20, 0.70, theme.secondary);
  addText(slide, '概念表', 6.38, 1.43, 0.90, 0.28, {
    fontSize: 18, color: theme.light, bold: true,
  });
  addText(slide, '名词 · 关系 · 值', 7.40, 1.43, 1.72, 0.28, {
    fontSize: 12, color: theme.light, align: 'right',
  });

  connector(slide, pres, 7.80, 2.04, 0, 0.30, theme.light, 2);
  connector(slide, pres, 6.45, 2.34, 2.70, 0, theme.light, 2);
  const elements = [
    [5.93, '类', 'ComputeService', theme.accent],
    [7.28, '属性', 'hasRegion', theme.secondary],
    [8.63, '个体', 'AWS_EC2', theme.light],
  ];
  elements.forEach((e, i) => {
    connector(slide, pres, e[0] + 0.52, 2.34, 0, 0.22, theme.light, 2, 'triangle');
    rect(slide, pres, e[0], 2.62, 1.04, 0.82, e[3],
      i === 2 ? theme.secondary : e[3]);
    addText(slide, e[1], e[0], 2.69, 1.04, 0.24, {
      fontSize: 13, color: i === 2 ? theme.primary : theme.light, bold: true, align: 'center',
    });
    addText(slide, e[2], e[0] + 0.05, 3.01, 0.94, 0.20, {
      fontFace: 'Liberation Sans', fontSize: 8.5,
      color: i === 2 ? theme.primary : theme.light, align: 'center',
    });
  });

  [6.45, 7.80, 9.15].forEach((x) => {
    connector(slide, pres, x, 3.44, 0, 0.18, theme.light, 2);
  });
  connector(slide, pres, 6.45, 3.62, 2.70, 0, theme.light, 2);
  connector(slide, pres, 7.80, 3.62, 0, 0.10, theme.light, 2, 'triangle');
  rect(slide, pres, 6.88, 3.76, 1.84, 0.46, theme.primary, theme.secondary);
  addText(slide, 'cloud_service.ttl', 6.88, 3.76, 1.84, 0.46, {
    fontFace: 'Liberation Sans', fontSize: 12, color: theme.light, bold: true, align: 'center',
  });
  addText(slide, 'CQ  →  概念表  →  本体元素  →  Turtle', 5.70, 4.34, 3.95, 0.26, {
    fontSize: 13, color: theme.secondary, bold: true, align: 'center',
  });
  return slide;
}

if (require.main === module) {
  const p = new pptxgen(); p.layout = 'LAYOUT_16x9';
  createSlide(p, { primary: '003049', secondary: '669BBC', accent: 'C1121F', light: 'FDF0D5', bg: 'FDF0D5' });
  p.writeFile({ fileName: 'slide-01-preview.pptx' });
}
module.exports = { createSlide };
