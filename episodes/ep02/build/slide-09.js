// Slide 9: Content - RDF 不是数据库表
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, 'RDF 不是数据库表');
  subtitleLine(slide, theme, '两种建模范式，各有所长');

  const rows = [
    { dim: 'Schema', rdf: '无固定 Schema，关系即数据', db: '强 Schema，表结构预先定义' },
    { dim: '灵活性', rdf: '适合 evolving 的语义', db: '适合稳定的业务实体' },
    { dim: '查询语言', rdf: 'SPARQL', db: 'SQL' },
    { dim: '最佳场景', rdf: '语义集成、知识图谱', db: '事务、报表、强一致性' },
  ];

  const tblX = 0.6;
  const tblY = 1.25;
  const colW1 = 1.8;
  const colW2 = 3.4;
  const colW3 = 3.4;
  const rowH = 0.50;
  const hdrH = 0.42;

  // Header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: tblX, y: tblY, w: colW1, h: hdrH,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('维度', {
    x: tblX, y: tblY, w: colW1, h: hdrH,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: 'FFFFFF', bold: true, align: 'center', valign: 'middle',
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: tblX + colW1, y: tblY, w: colW2, h: hdrH,
    fill: { color: theme.secondary }, line: { color: theme.secondary, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('RDF / 知识图谱', {
    x: tblX + colW1, y: tblY, w: colW2, h: hdrH,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: tblX + colW1 + colW2, y: tblY, w: colW3, h: hdrH,
    fill: { color: theme.light }, line: { color: theme.light, width: 1 },
    rectRadius: 0.05,
  });
  slide.addText('关系型数据库', {
    x: tblX + colW1 + colW2, y: tblY, w: colW3, h: hdrH,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  rows.forEach((row, i) => {
    const y = tblY + hdrH + i * rowH;
    const fill = i % 2 === 0 ? '0B1426' : '061026';
    slide.addShape(pres.shapes.RECTANGLE, {
      x: tblX, y: y, w: colW1, h: rowH,
      fill: { color: fill }, line: { color: theme.light, width: 0.5 },
    });
    slide.addText(row.dim, {
      x: tblX, y: y, w: colW1, h: rowH,
      fontSize: 12, fontFace: 'Noto Sans CJK SC',
      color: theme.secondary, bold: true, align: 'center', valign: 'middle',
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: tblX + colW1, y: y, w: colW2, h: rowH,
      fill: { color: fill }, line: { color: theme.light, width: 0.5 },
    });
    slide.addText(row.rdf, {
      x: tblX + colW1 + 0.1, y: y, w: colW2 - 0.2, h: rowH,
      fontSize: 12, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'center', valign: 'middle',
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: tblX + colW1 + colW2, y: y, w: colW3, h: rowH,
      fill: { color: fill }, line: { color: theme.light, width: 0.5 },
    });
    slide.addText(row.db, {
      x: tblX + colW1 + colW2 + 0.1, y: y, w: colW3 - 0.2, h: rowH,
      fontSize: 12, fontFace: 'Noto Sans CJK SC',
      color: theme.primary, align: 'center', valign: 'middle',
    });
  });

  // Bottom insight band (inside safe area: y=3.85, h=0.55 → bottom=4.40)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 3.85, w: 8.8, h: 0.55,
    fill: { color: theme.primary }, line: { type: 'none' },
    rectRadius: 0.06,
  });
  slide.addText('企业通常共存：RDF 作为语义层盖在数据库之上', {
    x: 0.6, y: 3.85, w: 8.8, h: 0.55,
    fontSize: 14, fontFace: 'Noto Sans CJK SC',
    color: '000814', bold: true, align: 'center', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 9);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-09-preview.pptx' });
}

module.exports = { createSlide };
