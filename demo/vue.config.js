const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: './src/main.ts'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        //依次导入的公用的scss变量，公用的scss混入，共用的默认样式
        additionalData: `
          @import "@/assets/styles/color.scss";
        `,
      }
    },
  },
  chainWebpack: (config) => {
    config
      .resolve.extensions.add('.ts').add('.tsx').add('.vue').add('.js')
      .end().end()
      .module
      .rule('typescript')
      .test(/\.tsx?$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        appendTsSuffixTo: [
          '\\.vue$',
        ],
        happyPackMode: false,
      })
      .end()
      .resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .end()
  },
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  lintOnSave: false
}