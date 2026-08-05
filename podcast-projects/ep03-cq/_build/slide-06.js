const { addText, rect, line, base, pill } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 6, '把一句问题拆成四类信号', 'DECOMPOSE');
  addText(slide, '哪些计算服务支持 GPU，并在东京可用？', 0.76, 1.28, 8.48, 0.50, {
    fontSize: 22, color: theme.primary, bold: true, align: 'center',
  });
  const items = [
    ['名词', '计算服务 · 东京', '类 / 实体', theme.secondary],
    ['动词', '支持 · 可用', '关系候选', theme.accent],
    ['条件', 'GPU', '属性 / 结构', theme.light],
    ['边界', '哪些 · 东京', '查询 / 约束', theme.primary],
  ];
  items.forEach((it, i) => {
    const x = 0.62 + i * 2.34;
    pill(slide, pres, it[0], x + 0.50, 2.10, 0.82, it[3], i === 2 ? theme.primary : 'FFFFFF');
    rect(slide, pres, x, 2.64, 1.82, 0.62, 'FFFFFF', it[3]);
    addText(slide, it[1], x + 0.08, 2.64, 1.66, 0.62, {
      fontSize: 13, color: theme.primary, bold: true, align: 'center',
    });
    line(slide, pres, x + 0.91, 3.27, 0, 0.42, it[3], 2, undefined, 'triangle');
    rect(slide, pres, x, 3.72, 1.82, 0.55, it[3]);
    addText(slide, it[2], x, 3.72, 1.82, 0.55, {
      fontSize: 14, color: i === 2 ? theme.primary : 'FFFFFF', bold: true, align: 'center',
    });
  });
  return slide;
}
module.exports = { createSlide };
