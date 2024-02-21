const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 添加标题第一种方法
  pages: {
    index: {
      entry: 'src/main.js', // 入口文件
      title: '你的标题'
    }
  },
  // 添加标题第二种方法
  // chainWebpack: config => {
  //   config
  //     .plugin('html')
  //     .tap(args => {
  //       args[0].title = "你的标题";
  //       return args
  //   })
  // }
  lintOnSave: 'warning',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true
        // pathRewrite: { '^/api': '' }
      }
    }
  }
})
