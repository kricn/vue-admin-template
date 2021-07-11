module.exports = {
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