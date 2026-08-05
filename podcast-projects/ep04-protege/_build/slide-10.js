const { addText, rect, base, pill, circleLabel, connector } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 10, '先有可评审模型，再有可维护工具文件', 'TAKEAWAYS');
  const items = [
    ['1', 'CQ 决定建模范围', '只建当前问题需要的语言'],
    ['2', '元素类型不要混用', '类、个体和属性各司其职'],
    ['3', 'TBox 与 ABox 要分清', '结构与事实概念分工'],
    ['4', '保存重开才算交付', 'IRI、标签与断言都完整'],
  ];
  items.forEach((it, i) => {
    const y = 1.34 + i * 0.72;
    circleLabel(slide, pres, it[0], 0.70, y + 0.06, 0.44,
      i === 3 ? theme.accent : theme.primary, theme.light, 14);
    addText(slide, it[1], 1.36, y, 2.55, 0.56, {
      fontSize: 17, color: theme.primary, bold: true,
    });
    addText(slide, it[2], 3.98, y, 2.15, 0.56, {
      fontSize: 12, color: theme.primary,
    });
  });
  rect(slide, pres, 6.48, 1.38, 2.76, 2.76, theme.primary);
  pill(slide, pres, 'NEXT · EP05', 6.98, 1.72, 1.78, theme.accent, theme.light);
  addText(slide, '启动推理机', 6.78, 2.43, 2.16, 0.48, {
    fontSize: 24, color: theme.light, bold: true, align: 'center',
  });
  connector(slide, pres, 7.18, 3.18, 1.18, 0, theme.secondary, 3, 'triangle');
  addText(slide, '显式事实  →  隐式结论', 6.74, 3.48, 2.24, 0.32, {
    fontSize: 13, color: theme.secondary, bold: true, align: 'center',
  });
  return slide;
}
module.exports = { createSlide };
