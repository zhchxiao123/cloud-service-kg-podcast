// Slide 8: Content - Turtle：最友好的 RDF 写法
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'Turtle：最友好的 RDF 写法');
  subtitleLine(slide, theme, 'Terse RDF Triple Language');

  bulletList(slide, pres, theme, [
    'PREFIX 声明命名空间，避免每次都写长 URI',
    'a 是 rdf:type 的语法糖',
    '; 同一主语继续陈述，, 同一谓语并列宾语',
  ], { y: 1.35, lineH: 0.46, fontSize: 16 });

  // Code block card — moved up so everything stays inside the safe area
  const codeX = 0.7;
  const codeY = 2.55;
  const codeW = 8.6;
  const codeH = 1.85;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: codeX, y: codeY, w: codeW, h: codeH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08,
  });

  // Window dots
  ['FF5F56', 'FFBD2E', '27C93F'].forEach((c, i) => {
    slide.addShape(pres.shapes.OVAL, {
      x: codeX + 0.25 + i * 0.22, y: codeY + 0.12, w: 0.12, h: 0.12,
      fill: { color: c }, line: { type: 'none' },
    });
  });

  const code = [
    'PREFIX ex:   <http://example.org/>',
    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>',
    '',
    'ex:Bob a foaf:Person ;',
    '  foaf:name "Bob"@en ;',
    '  foaf:knows ex:Alice ;',
    '  ex:age 30 .',
    'ex:Alice a foaf:Person ;',
    '  ex:worksAt ex:Company .',
  ];

  code.forEach((line, i) => {
    slide.addText(line, {
      x: codeX + 0.25, y: codeY + 0.35 + i * 0.155,
      w: codeW - 0.5, h: 0.18,
      fontSize: 12, fontFace: 'Liberation Sans',
      color: theme.primary, align: 'left', valign: 'middle',
    });
  });

  pageBadge(slide, pres, theme, 8);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-08-preview.pptx' });
}

module.exports = { createSlide };
