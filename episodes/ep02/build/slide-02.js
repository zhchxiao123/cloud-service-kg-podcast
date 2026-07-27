// Slide 2: Table of Contents
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '本期要聊什么', { fontSize: 30 });

  const toc = [
    { num: '01', text: '从本体到 RDF：我们需要一种通用语言' },
    { num: '02', text: '三元组：知识的最小表达单位' },
    { num: '03', text: 'URI：给每个事物一张全球身份证' },
    { num: '04', text: '图模型：三元组连成的知识网络' },
    { num: '05', text: '字面量：当知识需要具体数值' },
    { num: '06', text: 'Turtle：最友好的 RDF 写法' },
  ];

  const startX = 0.7;
  const startY = 1.25;
  const colW = 4.4;
  const rowH = 0.95;
  const gapX = 0.4;

  toc.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (colW + gapX);
    const y = startY + row * rowH;

    // Number badge
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y + 0.22, w: 0.45, h: 0.45,
      fill: { color: theme.accent }, line: { type: 'none' },
      rectRadius: 0.08,
    });
    slide.addText(item.num, {
      x: x, y: y + 0.22, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: 'Liberation Sans',
      color: 'FFFFFF', bold: true, align: 'center', valign: 'middle',
    });

    // Text
    slide.addText(item.text, {
      x: x + 0.6, y: y, w: colW - 0.6, h: rowH,
      fontSize: 15, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'left', valign: 'middle',
    });

    // Underline accent
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.6, y: y + rowH - 0.12, w: 0.8, h: 0.02,
      fill: { color: theme.light }, line: { type: 'none' },
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
