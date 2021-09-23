// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require('unplugin-vue-components/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // 添加全局样式
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
    config
      .plugin('webpack-bundle-analyzer')
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: {
    // 按需导入
    plugins: [
      components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    module: {
      unknownContextCritical: false
    }
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/GLOBAL_VARIABLE.scss'), path.resolve(__dirname, './src/styles/GLOBAL-STYLE.scss')]
    })
}
