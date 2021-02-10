// https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  chainWebpack (config) {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin)
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  css: {
    loaderOptions: {
      sass: {
      }
    }
  },

  devServer: {
    watchOptions: {
      clientLogLevel: 'warning'
    }
  },
  runtimeCompiler: true
}
