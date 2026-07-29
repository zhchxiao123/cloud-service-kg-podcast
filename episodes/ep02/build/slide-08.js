// Slide 8: Content - Turtle：把 RDF 写得像代码一样清楚
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'Turtle：把 RDF 写得像代码一样清楚');
  subtitleLine(slide, theme, '@prefix、a、分号和逗号，都是可读性的语法糖');

  const tags = [
    '@prefix 缩短长 IRI',
    'a 是 rdf:type 的缩写',
    '分号延续同一主语',
    '逗号并列多个宾语',
  ];
  tags.forEach((text, index) => {
    const x = 0.65 + (index % 2) * 4.50;
    const y = 1.18 + Math.floor(index / 2) * 0.48;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.18, h: 0.34,
      fill: { color: index % 2 === 0 ? theme.light : theme.accent },
      line: { type: 'none' },
    });
    slide.addText(text, {
      x: x + 0.16, y, w: 3.86, h: 0.34,
      fontSize: 13, fontFace: 'Noto Sans CJK SC',
      color: index % 2 === 0 ? theme.bg : theme.primary,
      align: 'left', valign: 'middle', margin: 0,
    });
  });

  const codeX = 0.65;
  const codeY = 2.25;
  const codeW = 8.70;
  const codeH = 2.10;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: codeX, y: codeY, w: codeW, h: codeH,
    fill: { color: theme.bg }, line: { color: theme.secondary, width: 1.5 },
  });

  const code = [
    '@prefix cskg: <https://example.org/cloud#> .',
    '',
    'cskg:EC2 a cskg:ComputeService ;',
    '    cskg:hasGPU true ;',
    '    cskg:hasRegion cskg:Tokyo, cskg:Singapore .',
  ];
  code.forEach((line, index) => {
    slide.addText(line, {
      x: codeX + 0.34, y: codeY + 0.22 + index * 0.34,
      w: codeW - 0.68, h: 0.30,
      fontSize: 16, fontFace: 'Liberation Sans',
      color: index === 0 ? theme.secondary : theme.primary,
      align: 'left', valign: 'middle', margin: 0,
      fit: 'shrink',
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
