# EP01 PPT 生成脚本

本目录存放用 `pptxgenjs` 生成 EP01 幻灯片的脚本。

## 文件说明

- `compile.js`：主入口，组合所有 slide 并输出 `presentation.pptx`
- `slide-01.js` 到 `slide-10.js`：每张幻灯片的内容与样式
- `theme.js`：共享主题配置（颜色、字体、布局常量）
- `package.json`：依赖声明

## 使用方法

```bash
cd episodes/ep01/build
npm install
node compile.js
```

输出文件：`presentation.pptx`。

## 依赖

- [pptxgenjs](https://github.com/gitbrent/PptxGenJS) v4.0.1
