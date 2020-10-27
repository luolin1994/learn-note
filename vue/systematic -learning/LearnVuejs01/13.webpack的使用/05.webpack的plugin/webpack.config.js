
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        //publicPath: 'dist/'   //给url加上路径
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            //css-loader只负责将css文件加载
            //style-loader负责渲染
            //使用多个loader时，是从右向左读取
            use: [ 'style-loader', 'css-loader' ]
          },
          {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  //当加载的图片，小于limit时，会将图片编译成base64字符串形式
                  //当加载的图片，大于limit时，需要使用file-loader进行加载
                  limit: 8591,
                  name: 'img/[name].[hash:8].[ext]' //设定加载后图片的命名方式
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          {
            test: /\.vue$/,
            use: ['vue-loader']
          }
        ]
      },
    resolve:{
      extensions: ['.js', '.vue', '.css'],//可省略内容
      //别名
      alias: {
        'vue$': 'vue/dist/vue.esm.js' //在编译时选择相应的版本
      }
    },
    plugins: [
      //添加版权信息的插件
      new webpack.BannerPlugin('最终版权归aaa所有'),
      //在dist中根据模板自动生成index.html文件，并自动引入bundle.js
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      //压缩js文件,开发时不推荐
      //new UglifyjsWebpackPlugin()
    ],
    //开发阶段需要，打包时不需要
    devServer: {
      contentBase: './dist',
      //页面实时刷新
      inline: true

    }
  
}