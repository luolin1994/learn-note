const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseconfig = require('./base.config')

module.exports = webpackMerge(baseconfig,{
    plugins: [
        //压缩js文件,开发时不推荐
        new UglifyjsWebpackPlugin()
      ]
})
