const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
          config.optimization.minimizer('terser').tap(args => {
          //移除 console.log 和debugger
          args[0].terserOptions.compress.drop_console = true
          args[0].terserOptions.compress.drop_debugger = true
          return args
    })
    }

  },
  // 代码分割
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
            },
 
          }
        }
      }
    }
    }
  }
})
