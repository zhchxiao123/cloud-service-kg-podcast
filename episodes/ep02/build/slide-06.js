// Slide 6: Content - 图模型：三元组连成的知识网络
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '图模型：三元组连成的知识网络');
  subtitleLine(slide, theme, '节点 = 资源或字面量，边 = 谓语');

  // Bullets on the right side so graph has the left/center space
  bulletList(slide, pres, theme, [
    '节点：资源（URI）或字面量',
    '边：谓语，连接两个节点',
    '共享 URI 让图自然连接、扩展',
  ], { x: 6.2, y: 1.35, w: 3.4, lineH: 0.52, fontSize: 15 });

  // Graph diagram — larger, cleaner layout
  const nodeW = 1.15;
  const nodeH = 0.55;
  const nodeR = 0.08; // corner radius

  function drawNode(x, y, label, sub, fill) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x - nodeW / 2, y: y - nodeH / 2, w: nodeW, h: nodeH,
      fill: { color: fill }, line: { color: theme.accent, width: 2 },
      rectRadius: nodeR,
    });
    slide.addText(label, {
      x: x - nodeW / 2, y: y - nodeH / 2, w: nodeW, h: nodeH,
      fontSize: 13, fontFace: 'Noto Sans CJK SC',
      color: '000814', bold: true, align: 'center', valign: 'middle',
    });
    if (sub) {
      slide.addText(sub, {
        x: x - nodeW / 2, y: y + nodeH / 2 + 0.06, w: nodeW, h: 0.22,
        fontSize: 9, fontFace: 'Liberation Sans',
        color: theme.light, align: 'center', valign: 'middle',
      });
    }
  }

  function drawEdge(x1, y1, x2, y2, label, labelOffset = { dx: 0, dy: -0.18 }) {
    // Compute start/end points on node edges
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const halfW = nodeW / 2 + 0.05;
    const halfH = nodeH / 2 + 0.05;

    // Approximate edge intersection with rounded rectangle by using bounding-box margin
    const startX = x1 + ux * halfW;
    const startY = y1 + uy * halfH;
    const endX = x2 - ux * halfW;
    const endY = y2 - uy * halfH;

    // Line
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: startY + (endY - startY) / 2 - 0.015,
      w: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2),
      h: 0.03,
      fill: { color: theme.secondary }, line: { type: 'none' },
      rotate: Math.atan2(endY - startY, endX - startX) * 180 / Math.PI,
    });

    // Arrowhead
    const angle = Math.atan2(endY - startY, endX - startX);
    slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
      x: endX - 0.12 * Math.cos(angle - Math.PI / 6),
      y: endY - 0.12 * Math.sin(angle - Math.PI / 6),
      w: 0.15, h: 0.12,
      fill: { color: theme.secondary }, line: { type: 'none' },
      rotate: angle * 180 / Math.PI,
    });

    // Label background for readability
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const lx = midX + labelOffset.dx;
    const ly = midY + labelOffset.dy;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: lx - 0.45, y: ly, w: 0.90, h: 0.24,
      fill: { color: theme.bg }, line: { type: 'none' },
      rectRadius: 0.02,
    });
    slide.addText(label, {
      x: lx - 0.45, y: ly, w: 0.90, h: 0.24,
      fontSize: 11, fontFace: 'Liberation Sans',
      color: theme.secondary, bold: true, align: 'center', valign: 'middle',
    });
  }

  const bob = { x: 1.6, y: 2.9 };
  const alice = { x: 4.5, y: 2.2 };
  const company = { x: 4.5, y: 3.8 };
  const age = { x: 1.6, y: 3.9 };

  drawEdge(bob.x, bob.y, alice.x, alice.y, 'knows', { dx: 0.0, dy: -0.22 });
  drawEdge(alice.x, alice.y, company.x, company.y, 'worksAt', { dx: 0.55, dy: 0.0 });
  drawEdge(bob.x, bob.y, age.x, age.y, 'age', { dx: -0.55, dy: 0.0 });

  drawNode(bob.x, bob.y, 'Bob', 'Resource', theme.primary);
  drawNode(alice.x, alice.y, 'Alice', 'Resource', theme.primary);
  drawNode(company.x, company.y, 'Company', 'Resource', theme.primary);
  drawNode(age.x, age.y, '30', 'Literal', theme.light);

  // Insight callout placed below the bullets on the right
  const boxX = 6.0;
  const boxY = 3.15;
  const boxW = 3.6;
  const boxH = 1.35;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: boxH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText('图的力量', {
    x: boxX, y: boxY + 0.12, w: boxW, h: 0.28,
    fontSize: 15, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });
  slide.addText('如果 Bob knows Alice\nAlice worksAt Company\n那么 Bob 通过 Alice\n间接连接 Company', {
    x: boxX, y: boxY + 0.42, w: boxW, h: 0.90,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, align: 'center', valign: 'middle',
  });

  pageBadge(slide, pres, theme, 6);
  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = { primary: 'FFFFFF', secondary: 'FFD60A', accent: 'FF8500', light: '8DA9C4', bg: '000814' };
  createSlide(pres, theme);
  pres.writeFile({ fileName: 'slide-06-preview.pptx' });
}

module.exports = { createSlide };
