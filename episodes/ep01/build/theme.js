const theme = {
  colors: {
    primary: 'FFFFFF',
    secondary: 'FFD60A',
    accent: 'FF8500',
    light: '8DA9C4',
    bg: '000814'
  },
  fonts: {
    zh: 'Noto Sans CJK SC',
    en: 'Liberation Sans'
  }
};

function setupSlide(pres, slide, theme) {
  slide.background = { color: theme.colors.bg };
}

function addBadge(pres, slide, num, theme) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 9.20,
    y: 4.30,
    w: 0.50,
    h: 0.35,
    fill: { color: theme.colors.accent },
    rectRadius: 0.05
  });
  slide.addText(String(num), {
    x: 9.20,
    y: 4.30,
    w: 0.50,
    h: 0.35,
    fontSize: 14,
    fontFace: theme.fonts.en,
    color: theme.colors.bg,
    align: 'center',
    valign: 'middle',
    bold: true
  });
}

module.exports = { theme, setupSlide, addBadge };
