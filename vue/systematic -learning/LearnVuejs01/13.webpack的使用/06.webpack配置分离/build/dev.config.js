const baseConfig = require('./base.config')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig,{
    //开发阶段需要，打包时不需要
    devServer: {
      contentBase: './dist',
      //页面实时刷新
      inline: true
    }
  
})