import { build } from 'vite';

// libraries
const libraries = [
  {
    entry: './src/Modules/WebsiteManager/resources/assets/entry.js',
    name: 'WebsiteManager',
    fileName: 'WebsiteManager',
  },
  {
    entry: './src/Modules/GrapesJS/resources/assets/entryHead.js',
    name: 'PageBuilderHead',
    fileName: 'PageBuilderHead',
  },
  {
    entry: './src/Modules/GrapesJS/resources/assets/entryBody.js',
    name: 'PageBuilderBody',
    fileName: 'PageBuilderBody',
  },
];

// build
libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    build: {
      lib: libItem,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return `${libItem.fileName}.css`;
            return assetInfo.name;
          },
        },
      },
    },
  });
});
