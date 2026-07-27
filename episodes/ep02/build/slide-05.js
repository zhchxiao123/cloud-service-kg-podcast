// Slide 5: Content - URI：给每个事物一张全球身份证
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'URI：给每个事物一张全球身份证');
  subtitleLine(slide, theme, 'URI = 统一资源标识符，消除同名歧义');

  bulletList(slide, pres, theme, [
    'URI：Uniform Resource Identifier，全球唯一地址',
    '同一个“苹果”可能指公司、水果、乐队',
    '示例：dbpedia:Leonardo_da_Vinci',
  ], { y: 1.35, lineH: 0.44, fontSize: 16, w: 5.0 });

  // ID card visual
  const cardX = 0.8;
  const cardY = 3.00;
  const cardW = 4.4;
  const cardH = 1.25;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 2 },
    rectRadius: 0.10,
  });

  // ID photo placeholder
  slide.addShape(pres.shapes.OVAL, {
    x: cardX + 0.25, y: cardY + 0.25, w: 0.70, h: 0.70,
    fill: { color: theme.light }, line: { type: 'none' },
  });
  slide.addText('ID', {
    x: cardX + 0.25, y: cardY + 0.25, w: 0.70, h: 0.70,
    fontSize: 14, fontFace: 'Liberation Sans',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  // ID fields
  slide.addText('Name: Leonardo da Vinci', {
    x: cardX + 1.15, y: cardY + 0.20, w: 2.9, h: 0.28,
    fontSize: 13, fontFace: 'Liberation Sans',
    color: theme.primary, align: 'left', valign: 'middle',
  });
  slide.addText('URI:', {
    x: cardX + 1.15, y: cardY + 0.52, w: 0.5, h: 0.22,
    fontSize: 11, fontFace: 'Liberation Sans',
    color: theme.light, align: 'left', valign: 'middle',
  });
  slide.addText('http://dbpedia.org/resource/Leonardo_da_Vinci', {
    x: cardX + 1.15, y: cardY + 0.74, w: 2.9, h: 0.28,
    fontSize: 10, fontFace: 'Liberation Sans',
    color: theme.secondary, align: 'left', valign: 'middle',
  });

  // Ambiguity disambiguation panel
  const ambX = 5.7;
  const ambY = 1.35;
  const ambW = 3.9;
  const ambH = 2.90;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: ambX, y: ambY, w: ambW, h: ambH,
    fill: { color: '0B1426' }, line: { color: theme.light, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText('同名歧义怎么破？', {
    x: ambX, y: ambY + 0.12, w: ambW, h: 0.32,
    fontSize: 15, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });

  const examples = [
    { label: '苹果公司', uri: 'dbpedia:Apple_Inc.' },
    { label: '水果苹果', uri: 'dbpedia:Apple' },
    { label: '苹果乐队', uri: 'dbpedia:The_Beatles' },
  ];
  examples.forEach((ex, i) => {
    const y = ambY + 0.58 + i * 0.68;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: ambX + 0.25, y: y, w: 3.4, h: 0.52,
      fill: { color: '000814' }, line: { color: theme.accent, width: 1 },
      rectRadius: 0.05,
    });
    slide.addText(ex.label, {
      x: ambX + 0.35, y: y, w: 1.2, h: 0.52,
      fontSize: 13, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'left', valign: 'middle',
    });
    slide.addText(ex.uri, {
      x: ambX + 1.65, y: y, w: 2.0, h: 0.52,
      fontSize: 11, fontFace: 'Liberation Sans',
      color: theme.light, align: 'left', valign: 'middle',
    });
  });

  pageBadge(slide, pres, theme, 5);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-05-preview.pptx' });
}

module.exports = { createSlide };
