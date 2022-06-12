const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const resolve = dir => path.join(__dirname, dir);

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
          @import "@/styles/element-ui.scss";
        `,
      }
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(), 
          IconsResolver({
            prefix: 'Icon',
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      }),
    ],
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
      // set svg-sprite-loader
      config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end()
      config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
          symbolId: "icon-[name]"
      })
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