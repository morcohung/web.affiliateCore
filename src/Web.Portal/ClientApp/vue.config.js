const WebpackAssetsManifest = require('webpack-assets-manifest');
const assetsManifestPath = '../Configuration/AssetsManifest.json';
const cdnPublicPath = '../cdn1133';
const developmentPort = process.env.developmentPort;
const devServerPort = process.env.devServerPort;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  runtimeCompiler: true,
  outputDir: cdnPublicPath,
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/': {
        target: `https://localhost:${developmentPort}`,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/assets/scss/_common.scss';`,
      },
      sass: {
        prependData: `@import '@/assets/scss/_vuetify-variables.sass'`,
      },
    },
  },
  configureWebpack: (config) => {
    config.output = Object.assign(config.output, {
      filename: isProduction ? 'js/[name].[contentHash:8].js' : 'js/[name].js',
      chunkFilename: isProduction
        ? 'js/[name].[contentHash:8].js'
        : 'js/[name].js',
    });
    if (isProduction) {
      config.plugins.push(
        new WebpackAssetsManifest({ output: assetsManifestPath })
      );
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
    // config.plugins.delete('html');
    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch');
    // config.plugins.delete('precache');
  },
};
