// Slide 4: Content - 三元组：知识的最小表达单位
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '三元组：知识的最小表达单位');
  subtitleLine(slide, theme, '主语 + 谓语 + 宾语 = 一条带标签的边');

  bulletList(slide, pres, theme, [
    '每个三元组 = 主语 + 谓语 + 宾语',
    '对应图中的一条有向边',
    '例：Bob knows Alice',
  ], { y: 1.40, lineH: 0.52, fontSize: 17 });

  // Diagram: subject —predicate→ object
  const boxY = 3.05;
  const boxH = 0.85;
  const boxW = 2.0;
  const startX = 0.9;
  const gap = 0.5;

  // Subject box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: boxY, w: boxW, h: boxH,
    fill: { color: theme.primary }, line: { type: 'none' },
    rectRadius: 0.08,
  });
  slide.addText('Subject\n主语', {
    x: startX, y: boxY, w: boxW, h: boxH,
    fontSize: 15, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  // Arrow with predicate label
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: startX + boxW + gap + 1.0, y: boxY + boxH / 2 - 0.10, w: 0.25, h: 0.20,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX + boxW + gap, y: boxY + boxH / 2 - 0.04, w: 1.0, h: 0.08,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  slide.addText('Predicate 谓语', {
    x: startX + boxW + gap, y: boxY - 0.35, w: 1.25, h: 0.30,
    fontSize: 12, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });

  // Object box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX + boxW + gap + 1.25 + gap, y: boxY, w: boxW, h: boxH,
    fill: { color: theme.light }, line: { type: 'none' },
    rectRadius: 0.08,
  });
  slide.addText('Object\n宾语', {
    x: startX + boxW + gap + 1.25 + gap, y: boxY, w: boxW, h: boxH,
    fontSize: 15, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  // Concrete example card
  const exX = 6.6;
  const exY = 1.40;
  const exW = 3.0;
  const exH = 2.50;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: exX, y: exY, w: exW, h: exH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText('例句 → 三元组', {
    x: exX, y: exY + 0.15, w: exW, h: 0.35,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });
  slide.addText('“Bob 认识 Alice”', {
    x: exX, y: exY + 0.55, w: exW, h: 0.35,
    fontSize: 15, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, align: 'center', valign: 'middle',
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: exX + 0.5, y: exY + 1.05, w: 2.0, h: 0.04,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  slide.addText('<Bob>  <knows>  <Alice>', {
    x: exX, y: exY + 1.25, w: exW, h: 0.40,
    fontSize: 14, fontFace: 'Liberation Sans',
    color: theme.light, bold: true, align: 'center', valign: 'middle',
  });
  slide.addText('主语        谓语        宾语', {
    x: exX, y: exY + 1.75, w: exW, h: 0.30,
    fontSize: 11, fontFace: 'Noto Sans CJK SC',
    color: theme.light, align: 'center', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 4);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-04-preview.pptx' });
}

module.exports = { createSlide };
