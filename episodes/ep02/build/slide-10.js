// Slide 10: Summary
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '关键洞察：RDF 三元组是知识图谱的原子', { fontSize: 24 });
  subtitleLine(slide, theme, '本期四个核心认知');

  bulletList(slide, pres, theme, [
    '三元组 = 主谓宾 = 一条带标签的边',
    'URI 让事物在全球唯一可识别',
    '图模型天然适合表达关系知识',
    'Turtle 是开发者入门首选格式',
  ], { y: 1.35, lineH: 0.58, fontSize: 17, w: 8.8 });

  // Call to action card (inside safe area)
  const ctaX = 0.8;
  const ctaY = 3.55;
  const ctaW = 8.4;
  const ctaH = 0.60;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: ctaX, y: ctaY, w: ctaW, h: ctaH,
    fill: { color: theme.accent }, line: { type: 'none' },
    rectRadius: 0.08,
  });
  slide.addText('行动建议：打开 W3C RDF Primer，用 Turtle 手写 5 个三元组', {
    x: ctaX, y: ctaY, w: ctaW, h: ctaH,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  // Next episode teaser
  slide.addText('下一集：Protégé 入门，画出你的第一个本体', {
    x: 0.8, y: 4.10, w: 8.4, h: 0.28,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.light, align: 'center', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 10);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-10-preview.pptx' });
}

module.exports = { createSlide };
