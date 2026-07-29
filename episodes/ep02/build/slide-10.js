// Slide 10: Summary
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '从一句事实，走到一张可交换的图', { fontSize: 24 });
  subtitleLine(slide, theme, '本期四个核心认知');

  bulletList(slide, pres, theme, [
    '三元组是一条有方向的事实',
    'IRI 提供可治理的全局标识',
    '字面量保存类型与语言',
    'Turtle 只是 RDF 的一种写法',
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
  slide.addText('行动建议：运行 RDFLib 示例，再用 Turtle 手写 5 个三元组', {
    x: ctaX, y: ctaY, w: ctaW, h: ctaH,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  // Next episode teaser
  slide.addText('下一集：先写 Competency Questions，再开始建模', {
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
