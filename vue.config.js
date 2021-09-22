// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
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
