const pptxgen = require('pptxgenjs');
const { addText, rect, line, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.09,
    fill: { color: theme.light }, line: { type: 'none' },
  });

  pill(slide, pres, 'EPISODE 03', 0.68, 0.72, 1.55, theme.accent);
  addText(slide, '先问问题，\n再画本体', 0.68, 1.35, 5.6, 1.45, {
    fontSize: 46, color: 'FFFFFF', bold: true, breakLine: true,
  });
  addText(slide, 'Competency Questions：把模糊需求改写成可测试的问题', 0.72, 3.02, 6.4, 0.45, {
    fontSize: 18, color: theme.light, bold: true,
  });
  line(slide, pres, 0.72, 3.68, 1.3, 0, theme.accent, 4);
  addText(slide, '《本体工程与知识图谱实战》', 0.72, 3.82, 4.2, 0.30, {
    fontSize: 13, color: 'FFFFFF',
  });

  // Large question-mark motif: dot + arc-like stacked rings.
  slide.addShape(pres.shapes.ARC, {
    x: 7.15, y: 0.82, w: 1.95, h: 2.15,
    adjustPoint: 0.25,
    rotate: 10,
    fill: { color: theme.primary, transparency: 100 },
    line: { color: theme.secondary, width: 18, beginArrowType: 'none', endArrowType: 'none' },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 7.83, y: 3.18, w: 0.40, h: 0.40,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  ['需求', '范围', '验收'].forEach((t, i) => {
    pill(slide, pres, t, 6.55 + i * 1.02, 4.03, 0.82,
      [theme.secondary, theme.light, theme.accent][i],
      i === 1 ? theme.primary : 'FFFFFF');
  });
  return slide;
}

if (require.main === module) {
  const p = new pptxgen(); p.layout = 'LAYOUT_16x9';
  createSlide(p, { primary: '264653', secondary: '2A9D8F', accent: 'E76F51', light: 'E9C46A', bg: 'FFFFFF' });
  p.writeFile({ fileName: 'slide-01-preview.pptx' });
}
module.exports = { createSlide };
