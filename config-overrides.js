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
     style: 'css',
   }),

   addWebpackAlias({
     "package": path.resolve(__dirname, "package.json"),
     "res": path.resolve(__dirname, "src/res"),
     "lib": path.resolve(__dirname, "src/lib"),
     "app": path.resolve(__dirname, "src/containers/app"),
     "login": path.resolve(__dirname, "src/containers/login"),
     "forgotPassword": path.resolve(__dirname, "src/containers/forgotPassword"),
     "utils": path.resolve(__dirname, "src/utils"),
     "components": path.resolve(__dirname, "src/components"),
     "assets": path.resolve(__dirname, "src/assets"),
   })
  );
