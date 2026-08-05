const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const projectRoot = path.resolve(__dirname, '..');
const version = fs.readFileSync(path.join(projectRoot, 'current.txt'), 'utf8').trim();
const outputPath = path.join(projectRoot, version, 'presentation.pptx');
const theme = {
  primary: '000814',
  secondary: '003566',
  accent: 'FFC300',
  light: 'FFD60A',
  bg: '001D3D',
};
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'EP05｜OWL 与推理：机器究竟推断出了什么？';
pres.author = 'Cloud Service KG Podcast';
pres.subject = '从显式事实到自动归类，再到可解释的逻辑冲突';
pres.lang = 'zh-CN';
for (let i = 1; i <= 10; i += 1) {
  require(`./slide-${String(i).padStart(2, '0')}.js`).createSlide(pres, theme);
}
pres.writeFile({ fileName: outputPath }).then(() => console.log(`Wrote ${outputPath}`));
