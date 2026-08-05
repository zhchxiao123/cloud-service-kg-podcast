const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const projectRoot = path.resolve(__dirname, '..');
const version = fs.readFileSync(path.join(projectRoot, 'current.txt'), 'utf8').trim();
const outputPath = path.join(projectRoot, version, 'presentation.pptx');
const theme = {
  primary: '264653',
  secondary: '2A9D8F',
  accent: 'E76F51',
  light: 'E9C46A',
  bg: 'FFFFFF',
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'EP03｜先问问题，再画本体：Competency Questions';
pres.author = 'Cloud Service KG Podcast';
pres.subject = '用可测试的能力问题界定本体需求、范围与验收';
pres.lang = 'zh-CN';

for (let i = 1; i <= 10; i += 1) {
  require(`./slide-${String(i).padStart(2, '0')}.js`).createSlide(pres, theme);
}

pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Wrote ${outputPath}`);
});
