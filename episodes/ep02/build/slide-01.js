// Slide 1: Cover
const pptxgen = require('pptxgenjs');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.accent }, line: { type: 'none' },
  });

  // Decorative dot grid (top-right, subtle)
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      slide.addShape(pres.shapes.OVAL, {
        x: 7.5 + c * 0.18, y: 0.45 + r * 0.18, w: 0.05, h: 0.05,
        fill: { color: theme.accent }, line: { type: 'none' },
      });
    }
  }

  // Episode tag
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.25, w: 1.8, h: 0.35,
    fill: { color: theme.accent }, line: { type: 'none' },
    rectRadius: 0.06,
  });
  slide.addText('EPISODE 02', {
    x: 0.7, y: 1.25, w: 1.8, h: 0.35,
    fontSize: 12, fontFace: 'Liberation Sans',
    color: 'FFFFFF', bold: true, align: 'center', valign: 'middle',
  });

  // Main title
  slide.addText('RDF 三元组：知识的原子单位', {
    x: 0.7, y: 1.85, w: 8.6, h: 1.0,
    fontSize: 44, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, bold: true, align: 'left', valign: 'middle',
  });

  // Subtitle
  slide.addText('从主谓宾到图模型，理解本体的数据语言', {
    x: 0.7, y: 2.95, w: 8.6, h: 0.5,
    fontSize: 22, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, align: 'left', valign: 'middle',
  });

  // Divider
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.65, w: 1.4, h: 0.04,
    fill: { color: theme.accent }, line: { type: 'none' },
  });

  // Series line
  slide.addText('《本体工程与知识图谱实战》', {
    x: 0.7, y: 3.85, w: 8.6, h: 0.35,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: theme.light, align: 'left', valign: 'middle',
  });

  // Footer
  slide.addText('2026 · 播客项目', {
    x: 0.7, y: 4.35, w: 4, h: 0.25,
    fontSize: 11, fontFace: 'Liberation Sans',
    color: theme.light, align: 'left', valign: 'middle',
  });

  // No page number on cover
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-01-preview.pptx' });
}

module.exports = { createSlide };
