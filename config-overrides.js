const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra');
const path = require('path');
  module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'true',
   }),
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: { '@primary-color': '#ffc000' },
   }),
   addWebpackAlias({
     "package": path.resolve(__dirname, "package.json"),
     "res": path.resolve(__dirname, "src/res"),
     "lib": path.resolve(__dirname, "src/lib"),
     "app": path.resolve(__dirname, "src/containers/app"),
     "components": path.resolve(__dirname, "src/components")
   })
  );
