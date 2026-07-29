// Slide 7: Content - 字面量：值也要带上类型和语言
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '字面量：值也要带上类型和语言');
  subtitleLine(slide, theme, '同样的字符，不同类型会有不同含义');

  const cards = [
    {
      x: 0.65, y: 1.25, color: theme.light, textColor: theme.bg,
      title: '字符串', code: '"ec2"', note: '服务代码',
    },
    {
      x: 5.10, y: 1.25, color: theme.accent, textColor: theme.primary,
      title: '整数', code: '30^^xsd:integer', note: '可比较与计算',
    },
    {
      x: 0.65, y: 2.75, color: theme.secondary, textColor: theme.bg,
      title: '日期', code: '"2026-07-29"^^xsd:date', note: '明确时间类型',
    },
    {
      x: 5.10, y: 2.75, color: theme.primary, textColor: theme.bg,
      title: '语言标签', code: '"对象存储"@zh', note: '保留语言信息',
    },
  ];

  cards.forEach((card) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: card.x, y: card.y, w: 4.25, h: 1.18,
      fill: { color: card.color }, line: { type: 'none' },
    });
    slide.addText(card.title, {
      x: card.x + 0.24, y: card.y + 0.16, w: 1.10, h: 0.28,
      fontSize: 16, fontFace: 'Noto Sans CJK SC',
      color: card.textColor, bold: true, align: 'left', valign: 'middle', margin: 0,
    });
    slide.addText(card.code, {
      x: card.x + 1.35, y: card.y + 0.14, w: 2.65, h: 0.34,
      fontSize: 15, fontFace: 'Liberation Sans',
      color: card.textColor, bold: false, align: 'left', valign: 'middle', margin: 0,
      fit: 'shrink',
    });
    slide.addText(card.note, {
      x: card.x + 0.24, y: card.y + 0.69, w: 3.75, h: 0.28,
      fontSize: 13, fontFace: 'Noto Sans CJK SC',
      color: card.textColor, align: 'left', valign: 'middle', margin: 0,
    });
  });

  slide.addText('字面量出现在宾语位置；复杂语句溯源留到后续项目建模。', {
    x: 0.65, y: 4.12, w: 8.35, h: 0.30,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.light, align: 'left', valign: 'middle', margin: 0,
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
