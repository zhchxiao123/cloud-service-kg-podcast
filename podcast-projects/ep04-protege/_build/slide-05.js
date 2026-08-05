const { addText, rect, connector, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 5, '类、产品与 SKU 不在同一粒度', 'GRANULARITY');
  const tiers = [
    [1.00, 1.48, 8.00, 0.70, theme.primary, 'CLASS', 'ComputeService', '一组计算服务'],
    [1.72, 2.48, 6.56, 0.70, theme.secondary, 'PRODUCT', 'Amazon EC2', '当前建成个体'],
    [2.44, 3.48, 5.12, 0.70, theme.accent, 'SKU', 'GPU 实例规格', '价格 CQ 再展开'],
  ];
  tiers.forEach((t, i) => {
    rect(slide, pres, t[0], t[1], t[2], t[3], t[4]);
    pill(slide, pres, t[5], t[0] + 0.18, t[1] + 0.19, 1.10, theme.light, theme.primary);
    addText(slide, t[6], t[0] + 1.56, t[1], 2.40, t[3], {
      fontSize: 19, color: theme.light, bold: true,
    });
    addText(slide, t[7], t[0] + t[2] - 2.65, t[1], 2.40, t[3], {
      fontSize: 13, color: theme.light, align: 'right',
    });
    if (i < 2) connector(slide, pres, 5.00, t[1] + t[3], 0, 0.30, theme.accent, 2, 'triangle');
  });
  addText(slide, '不是看名称决定层级，而是看 CQ 需要返回什么。', 1.40, 4.30, 7.15, 0.26, {
    fontSize: 15, color: theme.primary, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
