const PptxGenJS = require('pptxgenjs');
const path = require('path');
const { theme } = require('./theme');

async function compile() {
  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Podcast Video Pipeline';
  pres.title = '本体到底解决什么问题？';
  pres.subject = '《本体工程与知识图谱实战》第 01 集';

  const slideModules = [
    './slide-01.js',
    './slide-02.js',
    './slide-03.js',
    './slide-04.js',
    './slide-05.js',
    './slide-06.js',
    './slide-07.js',
    './slide-08.js',
    './slide-09.js',
    './slide-10.js'
  ];

  for (const modPath of slideModules) {
    const slideMod = require(modPath);
    if (typeof slideMod.createSlide !== 'function') {
      throw new Error(`${modPath} does not export createSlide function`);
    }
    slideMod.createSlide(pres, theme);
  }

  const outputPath = path.resolve('/workspace/podcast-projects/ontology-basics-01/v1/presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation written to ${outputPath}`);
  return outputPath;
}

compile()
  .then((outputPath) => {
    const fs = require('fs');
    const stats = fs.statSync(outputPath);
    console.log(`File size: ${stats.size} bytes`);
    if (stats.size < 50 * 1024) {
      console.error('ERROR: Output file is smaller than 50KB');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
