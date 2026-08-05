const { addText, rect, connector, base, pill, circleLabel } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 7, '在 Protégé 中按依赖顺序建模', 'WORKFLOW');
  // Simplified tool window.
  rect(slide, pres, 0.58, 1.32, 8.82, 2.78, theme.light, theme.primary);
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.58, y: 1.32, w: 8.82, h: 0.35,
    fill: { color: theme.primary }, line: { type: 'none' },
  });
  circleLabel(slide, pres, '', 0.76, 1.43, 0.10, theme.accent, theme.light, 1);
  circleLabel(slide, pres, '', 0.94, 1.43, 0.10, theme.secondary, theme.light, 1);
  addText(slide, 'Protégé Desktop · cloud_service.ttl', 1.18, 1.36, 3.20, 0.24, {
    fontFace: 'Liberation Sans', fontSize: 11, color: theme.light, bold: true,
  });
  const tabs = ['Active Ontology', 'Classes', 'Object properties', 'Data properties', 'Individuals'];
  tabs.forEach((t, i) => {
    const y = 1.83 + i * 0.40;
    rect(slide, pres, 0.80, y, 2.08, 0.30, i === 1 ? theme.accent : theme.secondary);
    addText(slide, t, 0.90, y, 1.88, 0.30, {
      fontFace: 'Liberation Sans', fontSize: 10, color: theme.light,
    });
  });
  const steps = [
    ['1', 'Ontology IRI', '稳定标识与前缀'],
    ['2', '类与属性', '先搭 TBox 骨架'],
    ['3', '个体与断言', '再加入 ABox 事实'],
    ['4', '保存并重开', 'Turtle 才是交付'],
  ];
  steps.forEach((s, i) => {
    const x = 3.25 + (i % 2) * 2.78;
    const y = 1.88 + Math.floor(i / 2) * 1.00;
    circleLabel(slide, pres, s[0], x, y + 0.05, 0.42, i === 3 ? theme.accent : theme.primary, theme.light, 13);
    addText(slide, s[1], x + 0.58, y, 1.90, 0.34, {
      fontSize: 15, color: theme.primary, bold: true,
    });
    addText(slide, s[2], x + 0.58, y + 0.38, 1.90, 0.28, {
      fontSize: 11, color: theme.primary,
    });
    if (i % 2 === 0) connector(slide, pres, x + 2.42, y + 0.30, 0.26, 0, theme.accent, 1.5, 'triangle');
  });
  pill(slide, pres, 'CHECK', 3.38, 3.66, 0.82, theme.accent, theme.light);
  addText(slide, '显示标签可变，IRI 才是稳定标识。', 4.40, 3.63, 3.72, 0.34, {
    fontSize: 13, color: theme.primary, bold: true,
  });
  addText(slide, 'Protégé 5.6.9 · File → Save As → Turtle', 2.50, 4.35, 5.10, 0.26, {
    fontFace: 'Liberation Sans', fontSize: 12, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
