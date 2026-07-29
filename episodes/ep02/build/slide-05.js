// Slide 5: Content - IRI：给标识一个全局作用域
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'IRI：给标识一个全局作用域');
  subtitleLine(slide, theme, '标识机制需要命名空间治理');

  bulletList(slide, pres, theme, [
    'IRI 标识资源与关系',
    '命名空间减少冲突',
    '前缀只是可读缩写',
    '空白节点表示匿名资源',
  ], { x: 0.65, y: 1.35, w: 4.2, lineH: 0.56, fontSize: 16 });

  const rows = [
    { pos: '主语', allowed: 'IRI 或空白节点', color: theme.light, text: theme.bg },
    { pos: '谓语', allowed: '必须是 IRI', color: theme.accent, text: theme.primary },
    { pos: '宾语', allowed: 'IRI、空白节点或字面量', color: theme.secondary, text: theme.bg },
  ];

  slide.addText('三元组各位置允许什么？', {
    x: 5.05, y: 1.25, w: 4.15, h: 0.36,
    fontSize: 16, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, bold: true, align: 'left', valign: 'middle', margin: 0,
  });

  rows.forEach((row, index) => {
    const y = 1.75 + index * 0.72;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.05, y, w: 1.05, h: 0.54,
      fill: { color: row.color }, line: { type: 'none' },
    });
    slide.addText(row.pos, {
      x: 5.05, y, w: 1.05, h: 0.54,
      fontSize: 14, fontFace: 'Noto Sans CJK SC',
      color: row.text, bold: true, align: 'center', valign: 'middle', margin: 0,
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 6.20, y, w: 3.05, h: 0.54,
      fill: { color: theme.bg, transparency: 0 },
      line: { color: row.color, width: 1.2 },
    });
    slide.addText(row.allowed, {
      x: 6.38, y, w: 2.70, h: 0.54,
      fontSize: 14, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'left', valign: 'middle', margin: 0,
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.05, y: 4.00, w: 4.20, h: 0.42,
    fill: { color: theme.primary }, line: { type: 'none' },
  });
  slide.addText('IRI 提供机制，不自动保证命名正确', {
    x: 5.05, y: 4.00, w: 4.20, h: 0.42,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.bg, bold: true, align: 'center', valign: 'middle', margin: 0,
  });

  pageBadge(slide, pres, theme, 5);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-05-preview.pptx' });
}

module.exports = { createSlide };
