function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '05', theme);

  slide.addText('痛点二：同一个词，不同部门说的不是一回事', {
    x: 0.55,
    y: 0.35,
    w: 8.90,
    h: 0.70,
    fontSize: 28,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  // Center circle
  slide.addShape(pres.shapes.OVAL, {
    x: 4.35,
    y: 1.55,
    w: 1.30,
    h: 1.30,
    fill: { color: theme.colors.light }
  });
  slide.addText('客户', {
    x: 4.35,
    y: 1.55,
    w: 1.30,
    h: 1.30,
    fontSize: 22,
    fontFace: theme.fonts.zh,
    color: theme.colors.bg,
    align: 'center',
    valign: 'middle',
    bold: true
  });

  // Four labels around
  const bubbles = [
    { label: 'client', sub: '财务', x: 0.70, y: 1.25, color: theme.colors.accent, fs: 22 },
    { label: 'customer', sub: 'CRM', x: 7.80, y: 1.25, color: theme.colors.accent, fs: 20 },
    { label: 'account', sub: 'ERP', x: 0.70, y: 2.75, color: theme.colors.secondary, fs: 22 },
    { label: 'consignee', sub: '物流', x: 7.80, y: 2.75, color: theme.colors.secondary, fs: 17 }
  ];

  bubbles.forEach((b) => {
    const boxH = 0.95;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: b.x,
      y: b.y,
      w: 1.80,
      h: boxH,
      fill: { color: b.color },
      rectRadius: 0.15
    });
    slide.addText(b.label, {
      x: b.x,
      y: b.y + 0.08,
      w: 1.80,
      h: 0.52,
      fontSize: b.fs || 22,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
    slide.addText(b.sub, {
      x: b.x,
      y: b.y + 0.58,
      w: 1.80,
      h: 0.28,
      fontSize: 13,
      fontFace: theme.fonts.zh,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle'
    });
  });

  // Key points at bottom safe area
  const points = [
    '同一人在三系统三个名',
    '17 种互不兼容的 Phase 3 临床试验'
  ];
  points.forEach((text, i) => {
    slide.addText(text, {
      x: 0.70,
      y: 4.05 + i * 0.28,
      w: 8.60,
      h: 0.25,
      fontSize: 16,
      fontFace: theme.fonts.zh,
      color: theme.colors.primary,
      align: 'left',
      valign: 'middle'
    });
  });

  return slide;
}

module.exports = { createSlide };
