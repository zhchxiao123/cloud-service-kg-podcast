// Slide 3: Content - 从本体到 RDF
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '从本体到 RDF：我们需要一种通用语言');
  subtitleLine(slide, theme, 'Ontology 负责“是什么”，RDF 负责“怎么写”');

  bulletList(slide, pres, theme, [
    '本体是概念层：定义类、属性、关系',
    'RDF 是数据层：资源描述框架',
    'W3C 标准，1999 年发布，机器可交换知识',
    'JSON 缺乏全局唯一标识与显式关系语义',
  ], { y: 1.35, lineH: 0.46, fontSize: 16, w: 5.3 });

  // Conceptual layered stack diagram
  const stackX = 6.4;
  const stackY = 1.35;
  const stackW = 3.2;
  const stackH = 0.60;
  const layers = [
    { label: '应用层', color: theme.primary, text: 'FFFFFF' },
    { label: '本体层', color: theme.light, text: '000814' },
    { label: 'RDF 数据层', color: theme.accent, text: 'FFFFFF' },
    { label: '存储层', color: theme.secondary, text: '000814' },
  ];
  layers.forEach((layer, i) => {
    const y = stackY + i * (stackH + 0.08);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: stackX, y: y, w: stackW, h: stackH,
      fill: { color: layer.color }, line: { type: 'none' },
      rectRadius: 0.06,
    });
    slide.addText(layer.label, {
      x: stackX, y: y, w: stackW, h: stackH,
      fontSize: 14, fontFace: 'Noto Sans CJK SC',
      color: layer.text, bold: true, align: 'center', valign: 'middle',
    });
  });

  // Arrow pointing up
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: stackX + stackW / 2 - 0.15, y: stackY - 0.32, w: 0.30, h: 0.22,
    fill: { color: theme.accent }, line: { type: 'none' },
  });
  slide.addText('越具体', {
    x: stackX + stackW / 2 + 0.25, y: stackY - 0.32, w: 0.8, h: 0.22,
    fontSize: 10, fontFace: 'Noto Sans CJK SC',
    color: theme.light, align: 'left', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 3);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-03-preview.pptx' });
}

module.exports = { createSlide };
