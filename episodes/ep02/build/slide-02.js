// Slide 2: Table of Contents
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '本期要回答四个问题', { fontSize: 28 });

  const toc = [
    { num: '01', text: '三元组怎样表达事实？' },
    { num: '02', text: 'IRI 怎样标识事物？' },
    { num: '03', text: '字面量怎样保存值？' },
    { num: '04', text: 'Turtle 与数据库什么关系？' },
  ];

  const startX = 0.7;
  const startY = 1.25;
  const colW = 4.4;
  const rowH = 0.82;
  const gapX = 0.4;

  toc.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (colW + gapX);
    const y = startY + row * rowH;

    // Number badge
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y + 0.18, w: 0.42, h: 0.42,
      fill: { color: theme.accent }, line: { type: 'none' },
      rectRadius: 0.08,
    });
    slide.addText(item.num, {
      x: x, y: y + 0.18, w: 0.42, h: 0.42,
      fontSize: 13, fontFace: 'Liberation Sans',
      color: 'FFFFFF', bold: true, align: 'center', valign: 'middle',
    });

    // Text
    slide.addText(item.text, {
      x: x + 0.58, y: y, w: colW - 0.58, h: rowH,
      fontSize: 15, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'left', valign: 'middle',
    });

  });

  pageBadge(slide, pres, theme, 2);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-02-preview.pptx' });
}

module.exports = { createSlide };
