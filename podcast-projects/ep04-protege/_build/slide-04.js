const { addText, rect, connector, base, pill } = require('./helpers');

function relationPanel(slide, pres, theme, x, y, w, title, left, relation, right, rightKind) {
  rect(slide, pres, x, y, w, 1.24, theme.light, theme.primary);
  pill(slide, pres, title, x + 0.16, y + 0.12, title.length > 4 ? 1.12 : 0.84,
    title === '注释属性' ? theme.secondary : theme.accent, theme.light);

  // Draw the directed relationship first; nodes and relation label sit above it.
  connector(slide, pres, x + 1.40, y + 0.84, w - 2.80, 0, theme.primary, 2, 'triangle');

  rect(slide, pres, x + 0.20, y + 0.61, 1.20, 0.46, theme.primary);
  addText(slide, left, x + 0.20, y + 0.61, 1.20, 0.46, {
    fontFace: 'Liberation Sans', fontSize: 10, color: theme.light, bold: true, align: 'center',
  });

  rect(slide, pres, x + w / 2 - 0.62, y + 0.66, 1.24, 0.36, theme.accent);
  addText(slide, relation, x + w / 2 - 0.62, y + 0.66, 1.24, 0.36, {
    fontFace: 'Liberation Sans', fontSize: 9, color: theme.light, bold: true, align: 'center',
  });

  rect(slide, pres, x + w - 1.40, y + 0.61, 1.20, 0.46,
    rightKind === 'literal' ? theme.secondary : theme.primary,
    rightKind === 'literal' ? theme.secondary : theme.primary);
  addText(slide, right, x + w - 1.40, y + 0.61, 1.20, 0.46, {
    fontFace: 'Liberation Sans', fontSize: 9.5, color: theme.light, bold: true, align: 'center',
  });
}

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 4, '五种元素，各自回答不同问题', 'OWL ELEMENTS');

  relationPanel(slide, pres, theme, 0.56, 1.36, 4.18,
    '类 + 个体', 'AWS_EC2', 'rdf:type', 'ComputeService', 'entity');
  relationPanel(slide, pres, theme, 5.04, 1.36, 4.30,
    '对象属性', 'AWS_EC2', 'hasProvider', 'AWS', 'entity');
  relationPanel(slide, pres, theme, 0.56, 2.92, 4.18,
    '数据属性', 'AWS_EC2', 'hasGPU', 'true', 'literal');
  relationPanel(slide, pres, theme, 5.04, 2.92, 4.30,
    '注释属性', 'AWS_EC2', 'dataSource', '证据 URL', 'literal');

  addText(slide, '对象属性连接对象；数据属性连接值；注释属性说明实体与证据。', 1.35, 4.35, 7.20, 0.26, {
    fontSize: 14, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
