function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.colors.bg };

  const { addBadge } = require('./theme');
  addBadge(pres, slide, '06', theme);

  slide.addText('本体登场：先给业务画一张「语义地图」', {
    x: 0.55,
    y: 0.35,
    w: 8.90,
    h: 0.70,
    fontSize: 26,
    fontFace: theme.fonts.zh,
    color: theme.colors.primary,
    align: 'left',
    valign: 'middle',
    bold: true
  });

  function addEntityBox(label, sub, x, y) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x,
      y: y,
      w: 2.20,
      h: 0.90,
      fill: { color: theme.colors.secondary },
      rectRadius: 0.12
    });
    slide.addText(label, {
      x: x,
      y: y + 0.10,
      w: 2.20,
      h: 0.45,
      fontSize: 20,
      fontFace: theme.fonts.zh,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle',
      bold: true
    });
    slide.addText(sub, {
      x: x,
      y: y + 0.52,
      w: 2.20,
      h: 0.30,
      fontSize: 13,
      fontFace: theme.fonts.en,
      color: theme.colors.bg,
      align: 'center',
      valign: 'middle'
    });
  }

  function labelBadge(x, y, text) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x - 0.50,
      y: y - 0.16,
      w: 1.00,
      h: 0.32,
      fill: { color: theme.colors.bg },
      rectRadius: 0.04
    });
    slide.addText(text, {
      x: x - 0.50,
      y: y - 0.16,
      w: 1.00,
      h: 0.32,
      fontSize: 13,
      fontFace: theme.fonts.zh,
      color: theme.colors.secondary,
      align: 'center',
      valign: 'middle',
      bold: true
    });
  }

  const leftX = 1.20;
  const rightX = 6.60;
  const topY = 1.40;
  const bottomY = 3.45;

  addEntityBox('客户', 'Customer', leftX, topY);
  addEntityBox('订单', 'Order', rightX, topY);
  addEntityBox('产品', 'Product', leftX, bottomY);
  addEntityBox('发货', 'Shipment', rightX, bottomY);

  const boxW = 2.20;
  const boxH = 0.90;

  // Customer -> Order (horizontal top)
  const topEdgeY = topY + boxH / 2;
  slide.addShape(pres.shapes.LINE, {
    x: leftX + boxW,
    y: topEdgeY,
    w: rightX - (leftX + boxW),
    h: 0,
    line: { color: theme.colors.light, width: 2, endArrowType: 'arrow' }
  });
  labelBadge((leftX + boxW + rightX) / 2, topEdgeY - 0.22, '下单');

  // Order -> Product (diagonal)
  const fromX = rightX;
  const fromY = topY + boxH;
  const toX = leftX + boxW;
  const toY = bottomY;
  slide.addShape(pres.shapes.LINE, {
    x: fromX,
    y: fromY,
    w: toX - fromX,
    h: toY - fromY,
    line: { color: theme.colors.light, width: 2, endArrowType: 'arrow' }
  });
  labelBadge((fromX + toX) / 2 + 0.25, (fromY + toY) / 2 - 0.28, '包含');

  // Order -> Shipment (vertical)
  const rightEdgeX = rightX + boxW / 2;
  slide.addShape(pres.shapes.LINE, {
    x: rightEdgeX,
    y: topY + boxH,
    w: 0,
    h: bottomY - (topY + boxH),
    line: { color: theme.colors.light, width: 2, endArrowType: 'arrow' }
  });
  labelBadge(rightEdgeX + 0.30, (topY + boxH + bottomY) / 2, '交付');

  return slide;
}

module.exports = { createSlide };
