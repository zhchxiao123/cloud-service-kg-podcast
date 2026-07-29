// Slide 9: Content - RDF 是模型，不是存储引擎
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'RDF 是模型，不是存储引擎');
  subtitleLine(slide, theme, '不要把数据模型、文件格式和数据库产品混在一起');

  const boxes = [
    { x: 0.45, w: 1.95, color: theme.light, text: 'Turtle／JSON-LD', sub: '写出 RDF' },
    { x: 2.75, w: 1.55, color: theme.accent, text: 'RDF 图', sub: '数据模型' },
    { x: 4.75, w: 1.95, color: theme.secondary, text: 'Triple Store', sub: '存储 RDF' },
    { x: 7.15, w: 1.55, color: theme.primary, text: 'SPARQL', sub: '查询 RDF' },
  ];

  boxes.forEach((box, index) => {
    const textColor = box.color === theme.accent ? theme.primary : theme.bg;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: box.x, y: 1.70, w: box.w, h: 1.05,
      fill: { color: box.color }, line: { type: 'none' },
    });
    slide.addText(box.text, {
      x: box.x, y: 1.88, w: box.w, h: 0.32,
      fontSize: index === 0 ? 13 : 16, fontFace: 'Noto Sans CJK SC',
      color: textColor, bold: true, align: 'center', valign: 'middle', margin: 0,
      fit: 'shrink',
    });
    slide.addText(box.sub, {
      x: box.x, y: 2.28, w: box.w, h: 0.24,
      fontSize: 12, fontFace: 'Noto Sans CJK SC',
      color: textColor, align: 'center', valign: 'middle', margin: 0,
    });
    if (index < boxes.length - 1) {
      slide.addShape(pres.shapes.CHEVRON, {
        x: box.x + box.w + 0.20, y: 2.02, w: 0.32, h: 0.36,
        fill: { color: theme.primary }, line: { type: 'none' },
      });
    }
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.10, y: 3.30, w: 7.80, h: 0.86,
    fill: { color: theme.bg }, line: { color: theme.light, width: 1.5 },
  });
  slide.addText('Neo4j 是属性图数据库', {
    x: 1.35, y: 3.45, w: 2.20, h: 0.28,
    fontSize: 16, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'left', valign: 'middle', margin: 0,
  });
  slide.addText('导入 RDF 需要模型映射，不会自动保留全部 OWL 语义', {
    x: 3.62, y: 3.43, w: 4.98, h: 0.34,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, align: 'left', valign: 'middle', margin: 0,
  });

  pageBadge(slide, pres, theme, 9);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-09-preview.pptx' });
}

module.exports = { createSlide };
