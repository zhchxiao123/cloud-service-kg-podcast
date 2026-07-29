// Slide 6: Content - 共享节点，让事实自动连成图
const pptxgen = require('pptxgenjs');
const { pageBadge, titleBlock, subtitleLine, bulletList } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  titleBlock(slide, pres, theme, '共享节点，让事实自动连成图');
  subtitleLine(slide, theme, '能连接，不代表连接一定正确');

  // Bullets on the right side so graph has the left/center space
  bulletList(slide, pres, theme, [
    '相同 IRI 指向相同节点',
    '多个事实可独立增加',
    '跨来源合并依赖标识治理',
    '图连接不等于自动正确',
  ], { x: 6.4, y: 1.35, w: 3.2, lineH: 0.48, fontSize: 15 });

  // Graph diagram
  const nodeW = 1.05;
  const nodeH = 0.50;
  const nodeR = 0.08;

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
        x: x - nodeW / 2, y: y + nodeH / 2 + 0.05, w: nodeW, h: 0.20,
        fontSize: 9, fontFace: 'Liberation Sans',
        color: theme.light, align: 'center', valign: 'middle',
      });
    }
  }

  function drawEdge(x1, y1, x2, y2, label, labelOffset = { dx: 0, dy: -0.18 }) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const halfW = nodeW / 2 + 0.05;
    const halfH = nodeH / 2 + 0.05;

    const startX = x1 + ux * halfW;
    const startY = y1 + uy * halfH;
    const endX = x2 - ux * halfW;
    const endY = y2 - uy * halfH;

    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: startY + (endY - startY) / 2 - 0.015,
      w: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2),
      h: 0.03,
      fill: { color: theme.secondary }, line: { type: 'none' },
      rotate: Math.atan2(endY - startY, endX - startX) * 180 / Math.PI,
    });

    const angle = Math.atan2(endY - startY, endX - startX);
    slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
      x: endX - 0.12 * Math.cos(angle - Math.PI / 6),
      y: endY - 0.12 * Math.sin(angle - Math.PI / 6),
      w: 0.15, h: 0.12,
      fill: { color: theme.secondary }, line: { type: 'none' },
      rotate: angle * 180 / Math.PI,
    });

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const lx = midX + labelOffset.dx;
    const ly = midY + labelOffset.dy;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: lx - 0.65, y: ly, w: 1.30, h: 0.24,
      fill: { color: theme.bg }, line: { type: 'none' },
      rectRadius: 0.02,
    });
    slide.addText(label, {
      x: lx - 0.65, y: ly, w: 1.30, h: 0.24,
      fontSize: 9, fontFace: 'Liberation Sans',
      color: theme.secondary, bold: true, align: 'center', valign: 'middle',
      margin: 0, fit: 'shrink',
    });
  }

  const ec2 = { x: 2.65, y: 2.80 };
  const aws = { x: 4.95, y: 2.05 };
  const tokyo = { x: 4.95, y: 3.55 };
  const gpu = { x: 1.20, y: 3.55 };

  drawEdge(ec2.x, ec2.y, aws.x, aws.y, 'hasProvider', { dx: 0.0, dy: -0.22 });
  drawEdge(ec2.x, ec2.y, tokyo.x, tokyo.y, 'hasRegion', { dx: 0.25, dy: 0.12 });
  drawEdge(ec2.x, ec2.y, gpu.x, gpu.y, 'hasGPU', { dx: 0.35, dy: 0.05 });

  drawNode(ec2.x, ec2.y, 'EC2', 'IRI', theme.primary);
  drawNode(aws.x, aws.y, 'AWS', 'IRI', theme.primary);
  drawNode(tokyo.x, tokyo.y, 'Tokyo', 'IRI', theme.primary);
  drawNode(gpu.x, gpu.y, 'true', 'Literal', theme.light);

  // Insight callout on the right
  const boxX = 6.4;
  const boxY = 3.40;
  const boxW = 3.0;
  const boxH = 0.92;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: boxX, y: boxY, w: boxW, h: boxH,
    fill: { color: '0B1426' }, line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08,
  });
  slide.addText('图的力量', {
    x: boxX, y: boxY + 0.08, w: boxW, h: 0.22,
    fontSize: 13, fontFace: 'Noto Sans CJK SC',
    color: theme.secondary, bold: true, align: 'center', valign: 'middle',
  });
  slide.addText('同一个 EC2 IRI\n连接厂商、区域与能力\n但实体粒度仍需治理', {
    x: boxX + 0.12, y: boxY + 0.32, w: boxW - 0.24, h: 0.50,
    fontSize: 12, fontFace: 'Noto Sans CJK SC',
    color: theme.primary, align: 'center', valign: 'middle',
    margin: 0, fit: 'shrink',
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
