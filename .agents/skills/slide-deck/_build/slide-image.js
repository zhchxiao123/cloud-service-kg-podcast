"use strict";
// slide-image.js — 共享 helper: 在 _build/imgs/slide-NN.png 存在时,自动插入到 slide
// 用法:
//   const { addSlideImage } = require('./slide-image');
//   addSlideImage(slide, pres, 4, { layout: 'corner' });   // slide 4 走右下角图位
//   addSlideImage(slide, pres, 1, { layout: 'background' }); // slide 1 走全幅背景

const fs = require('fs');
const path = require('path');

function imgPath(slideNum) {
  // __dirname 在 _build/ 下, 直接 join imgs/
  return path.join(__dirname, 'imgs', `slide-${String(slideNum).padStart(2, '0')}.png`);
}

function addSlideImage(slide, pres, slideNum, opts = {}) {
  const layout = opts.layout || 'corner';
  const p = imgPath(slideNum);
  if (!fs.existsSync(p)) return false;  // 静默跳过 — 无图时回到纯文字版
  const stat = fs.statSync(p);
  if (stat.size < 10_000) return false;

  if (layout === 'background') {
    // 全幅背景 + 30% 透明度黑遮罩 — 适合 cover / section / summary
    slide.addImage({ path: p, x: 0, y: 0, w: 10, h: 5.625, sizing: { type: 'cover', w: 10, h: 5.625 } });
    slide.addShape(pres.ShapeType.rect, {
      x: 0, y: 0, w: 10, h: 5.625,
      fill: { color: '000000', transparency: 30 },
      line: { color: '000000', width: 0 },
    });
  } else if (layout === 'corner') {
    // 右下角图位 (3.2 x 3.2 inch) — 适合 content slide
    slide.addImage({ path: p, x: 6.3, y: 1.3, w: 3.2, h: 3.2, sizing: { type: 'contain', w: 3.2, h: 3.2 } });
  } else if (layout === 'left') {
    // 左侧大图 + 右侧文字 (适合双栏数据图)
    slide.addImage({ path: p, x: 0.3, y: 1.0, w: 4.5, h: 3.6, sizing: { type: 'contain', w: 4.5, h: 3.6 } });
  }
  return true;
}

module.exports = { addSlideImage, imgPath };
