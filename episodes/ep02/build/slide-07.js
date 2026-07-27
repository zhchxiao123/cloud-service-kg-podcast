// Slide 7: Content - 字面量：当知识需要具体数值
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '字面量：当知识需要具体数值');
  subtitleLine(slide, theme, 'Literal 只能做宾语，带类型和语言标签');

  bulletList(slide, pres, theme, [
    '字面量只能出现在宾语位置',
    '支持字符串、数字、日期等',
    '可附带数据类型或语言标签',
    '字符串想变主体？提升为资源节点',
  ], { y: 1.35, lineH: 0.50, fontSize: 16 });

  // Code-like examples card
  const cardX = 0.7;
  const cardY = 3.25;
  const cardW = 5.0;
  const cardH = 1.25;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText('Bob 的名字  →  "Bob"^^xsd:string', {
    x: cardX + 0.2, y: cardY + 0.18, w: cardW - 0.4, h: 0.28,
    fontSize: 13, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });
  slide.addText('Bob 的年龄  →  30^^xsd:integer', {
    x: cardX + 0.2, y: cardY + 0.52, w: cardW - 0.4, h: 0.28,
    fontSize: 13, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });
  slide.addText('Bob 的生日  →  "1990-07-04"^^xsd:date', {
    x: cardX + 0.2, y: cardY + 0.86, w: cardW - 0.4, h: 0.28,
    fontSize: 13, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });

  // Reification mini diagram
  const diagX = 6.2;
  const diagY = 1.35;
  const diagW = 3.5;
  const diagH = 3.15;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: diagX, y: diagY, w: diagW, h: diagH,
    fill: { color: '0B1426' }, line: { color: theme.light, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText('把字面量提升为资源', {
    x: diagX, y: diagY + 0.12, w: diagW, h: 0.30,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });

  // Before/after
  slide.addText('Before', {
    x: diagX + 0.2, y: diagY + 0.55, w: 1.5, h: 0.25,
    fontSize: 11, fontFace: 'Liberation Sans',
    color: theme.light, align: 'left', valign: 'middle',
  });
  slide.addText('Bob  name  "Bob"', {
    x: diagX + 0.2, y: diagY + 0.85, w: 3.1, h: 0.25,
    fontSize: 12, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: diagX + 0.2, y: diagY + 1.25, w: 3.1, h: 0.02,
    fill: { color: theme.accent }, line: { type: 'none' },
  });

  slide.addText('After', {
    x: diagX + 0.2, y: diagY + 1.40, w: 1.5, h: 0.25,
    fontSize: 11, fontFace: 'Liberation Sans',
    color: theme.light, align: 'left', valign: 'middle',
  });
  slide.addText(':name1  rdf:value  "Bob"', {
    x: diagX + 0.2, y: diagY + 1.70, w: 3.1, h: 0.25,
    fontSize: 12, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });
  slide.addText(':name1  :language  "en"', {
    x: diagX + 0.2, y: diagY + 2.00, w: 3.1, h: 0.25,
    fontSize: 12, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });
  slide.addText(':name1  :source  "HR"', {
    x: diagX + 0.2, y: diagY + 2.30, w: 3.1, h: 0.25,
    fontSize: 12, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });

  slide.addText('复杂性换可链接性', {
    x: diagX, y: diagY + 2.75, w: diagW, h: 0.25,
    fontSize: 12, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 7);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-07-preview.pptx' });
}

module.exports = { createSlide };
