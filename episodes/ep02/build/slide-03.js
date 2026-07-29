// Slide 3: Content - RDF 是数据模型，不是本体语言
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'RDF 是数据模型，不是本体语言');
  subtitleLine(slide, theme, '把模式与本体、数据模型和文件写法分开');

  const layers = [
    {
      y: 1.25,
      color: theme.light,
      label: 'RDFS／OWL',
      headline: '模式与本体层',
      detail: '表达类、属性、约束与公理',
      text: theme.bg,
    },
    {
      y: 2.20,
      color: theme.accent,
      label: 'RDF',
      headline: '数据模型层',
      detail: '用三元组构成 RDF 图',
      text: theme.primary,
    },
    {
      y: 3.15,
      color: theme.secondary,
      label: 'Turtle／JSON-LD',
      headline: '序列化层',
      detail: '把 RDF 图或数据集写成文档',
      text: theme.bg,
    },
  ];

  layers.forEach((layer, index) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.75, y: layer.y, w: 8.5, h: 0.72,
      fill: { color: layer.color }, line: { type: 'none' },
    });
    slide.addText(layer.label, {
      x: 1.00, y: layer.y, w: 2.25, h: 0.72,
      fontSize: 19, fontFace: 'Noto Sans CJK SC',
      color: layer.text, bold: true, align: 'left', valign: 'middle', margin: 0,
    });
    slide.addText(layer.headline, {
      x: 3.40, y: layer.y, w: 1.85, h: 0.72,
      fontSize: 17, fontFace: 'Noto Sans CJK SC',
      color: layer.text, bold: true, align: 'left', valign: 'middle', margin: 0,
    });
    slide.addText(layer.detail, {
      x: 5.45, y: layer.y, w: 3.40, h: 0.72,
      fontSize: 15, fontFace: 'Noto Sans CJK SC',
      color: layer.text, align: 'left', valign: 'middle', margin: 0,
    });
    if (index < layers.length - 1) {
      slide.addShape(pres.shapes.DOWN_ARROW, {
        x: 4.47, y: layer.y + 0.74, w: 0.30, h: 0.18,
        fill: { color: theme.primary }, line: { type: 'none' },
      });
      slide.addText(index === 0 ? '表达为 RDF 图' : '序列化为', {
        x: 4.87, y: layer.y + 0.73, w: 1.35, h: 0.20,
        fontSize: 8.5, fontFace: 'Noto Sans CJK SC',
        color: theme.primary, align: 'left', valign: 'middle', margin: 0,
      });
    }
  });

  slide.addText('普通 JSON 的字段语义通常由应用约定；JSON-LD 可以承载 RDF 语义。', {
    x: 0.75, y: 4.05, w: 8.25, h: 0.34,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, align: 'left', valign: 'middle', margin: 0,
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
