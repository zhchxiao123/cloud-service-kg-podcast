const { addText, rect, line, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 7, '一条模糊需求，改成三条 CQ', 'LIVE REWRITE');
  rect(slide, pres, 0.58, 1.32, 2.15, 2.78, theme.primary);
  addText(slide, '模糊入口', 0.83, 1.60, 1.65, 0.38, {
    fontSize: 16, color: theme.light, bold: true, align: 'center',
  });
  addText(slide, '帮我选择\nGPU 云服务', 0.83, 2.20, 1.65, 0.98, {
    fontSize: 25, color: 'FFFFFF', bold: true, align: 'center', breakLine: true,
  });
  addText(slide, '保留意图\n删除歧义', 0.83, 3.40, 1.65, 0.46, {
    fontSize: 13, color: theme.light, align: 'center',
  });
  line(slide, pres, 2.80, 2.70, 0.50, 0, theme.accent, 3, undefined, 'triangle');
  const cards = [
    ['CQ 1 · 候选集', '哪些计算服务支持 GPU，\n并在东京或新加坡可用？'],
    ['CQ 2 · 免费额度', '这些候选中，哪些公开提供\n免费额度与证据？'],
    ['CQ 3 · 可比价格', '统一规格与时间点后，\n哪项公开月费更低？'],
  ];
  cards.forEach((c, i) => {
    const y = 1.28 + i * 1.05;
    rect(slide, pres, 3.38, y, 5.95, 0.84, i === 1 ? 'E9C46A' : 'FFFFFF', i === 1 ? theme.light : theme.secondary);
    pill(slide, pres, c[0], 3.60, y + 0.23, 1.62, i === 2 ? theme.accent : theme.secondary,
      'FFFFFF');
    addText(slide, c[1], 5.42, y + 0.11, 3.65, 0.60, {
      fontSize: 14, color: theme.primary, bold: true,
    });
  });
  addText(slide, '推荐结论 = 可解释的筛选 + 可复核的比较', 3.55, 4.35, 5.55, 0.28, {
    fontSize: 14, color: theme.accent, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
