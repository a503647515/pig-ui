let path = require('path')
// let targetUrl = 'http://192.168.0.2:9999'
let targetUrl = 'http://47.105.163.104:9999'
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    host: '0.0.0.0',
    assetsPublicPath: '/',
    proxyTable: {
      '/auth': {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    },
    cssSourceMap: false
  }
}
