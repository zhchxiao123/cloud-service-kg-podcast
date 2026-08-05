const { addText, rect, base } = require('./helpers');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 2, '本期要回答四个问题', 'ROADMAP');
  const cards = [
    ['01', '什么是 CQ？', '它与普通业务问题有什么不同'],
    ['02', '怎样写得可测试？', '对象、边界、数据与答案形式'],
    ['03', '怎样映射到模型？', '类、关系、属性与约束信号'],
    ['04', '怎样成为验收标准？', '从问题追踪到查询测试'],
  ];
  cards.forEach((c, i) => {
    const x = 0.60 + (i % 2) * 4.52;
    const y = 1.38 + Math.floor(i / 2) * 1.48;
    rect(slide, pres, x, y, 4.18, 1.14, i === 0 ? 'E9C46A' : 'FFFFFF', theme.secondary);
    addText(slide, c[0], x + 0.20, y + 0.17, 0.52, 0.35, {
      fontSize: 18, color: theme.accent, bold: true,
    });
    addText(slide, c[1], x + 0.82, y + 0.14, 3.05, 0.38, {
      fontSize: 19, color: theme.primary, bold: true,
    });
    addText(slide, c[2], x + 0.82, y + 0.57, 3.02, 0.30, {
      fontSize: 12, color: theme.primary,
    });
  });
  return slide;
}
module.exports = { createSlide };
