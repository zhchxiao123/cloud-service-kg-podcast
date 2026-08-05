const { addText, rect, base, pill } = require('./helpers');
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  base(slide, pres, theme, 9, 'OWL 不把未知自动当成错误', 'SEMANTIC BOUNDARIES');
  const cards = [
    ['OPEN WORLD', '缺失 ≠ false', '没有记录，只能推出未知'],
    ['NO DEFAULT UNA', '不同名称 ≠ 必然不同', '需要时显式 differentFrom'],
    ['OWL REASONER', '蕴含 + 一致性', '哪些结论必然成立'],
    ['SHACL', '数据形状校验', '字段、数量与格式是否合规'],
  ];
  cards.forEach((c, i) => {
    const x = 0.60 + (i % 2) * 4.46;
    const y = 1.40 + Math.floor(i / 2) * 1.47;
    rect(slide, pres, x, y, 4.16, 1.18, i === 3 ? theme.primary : theme.secondary, i === 3 ? theme.accent : theme.light, 18);
    pill(slide, pres, c[0], x + 0.16, y + 0.13, c[0].length > 10 ? 1.52 : 1.14, i === 3 ? theme.accent : theme.primary, i === 3 ? theme.primary : theme.accent);
    addText(slide, c[1], x + 1.72, y + 0.12, 2.20, 0.38, { fontSize: 16, color: i === 3 ? theme.accent : theme.light, bold: true, align: 'right' });
    addText(slide, c[2], x + 0.18, y + 0.66, 3.78, 0.30, { fontSize: 11.5, color: theme.light });
  });
  return slide;
}
module.exports = { createSlide };
