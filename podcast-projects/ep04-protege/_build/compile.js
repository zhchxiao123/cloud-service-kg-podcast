const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const projectRoot = path.resolve(__dirname, '..');
const version = fs.readFileSync(path.join(projectRoot, 'current.txt'), 'utf8').trim();
const outputPath = path.join(projectRoot, version, 'presentation.pptx');
const theme = {
  primary: '003049',
  secondary: '669BBC',
  accent: 'C1121F',
  light: 'FDF0D5',
  bg: 'FDF0D5',
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'EP04｜Protégé 入门：从 CQ 到第一个本体';
pres.author = 'Cloud Service KG Podcast';
pres.subject = '把 Competency Questions 转成可维护的 OWL 本体骨架';
pres.lang = 'zh-CN';

for (let i = 1; i <= 10; i += 1) {
  require(`./slide-${String(i).padStart(2, '0')}.js`).createSlide(pres, theme);
}
pres.writeFile({ fileName: outputPath }).then(() => console.log(`Wrote ${outputPath}`));
