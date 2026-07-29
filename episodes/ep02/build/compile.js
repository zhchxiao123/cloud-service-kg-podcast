// Compile all slides into presentation.pptx
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const projectRoot = path.resolve(
  __dirname,
  '../../../podcast-projects/ep02-rdf',
);
const version = fs.readFileSync(path.join(projectRoot, 'current.txt'), 'utf8').trim();
const outputPath = path.join(projectRoot, version, 'presentation.pptx');

const theme = {
  primary: 'FFFFFF',
  secondary: 'FFD60A',
  accent: 'FF8500',
  light: '8DA9C4',
  bg: '000814',
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'EP02｜RDF 三元组：机器怎样把知识写成一张图？';
pres.author = 'Podcast Generator';

// Font setup: rely on system-installed Noto Sans CJK SC and Liberation Sans
// (pptxgenjs 4.x does not expose defineFontFaces; embedding omitted)
const notoPath = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc';
if (!fs.existsSync(notoPath)) {
  console.warn('Noto Sans CJK SC not found at system path — relying on fallback font');
}

const total = 10;
for (let i = 1; i <= total; i++) {
  const id = String(i).padStart(2, '0');
  const mod = require(`./slide-${id}.js`);
  mod.createSlide(pres, theme);
  console.log(`✓ slide-${id} added`);
}

pres.writeFile({ fileName: outputPath }).then((written) => {
  console.log(`\nWrote ${written}`);
});
