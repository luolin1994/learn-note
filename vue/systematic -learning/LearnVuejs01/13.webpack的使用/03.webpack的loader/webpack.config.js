
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'   //给url加上路径
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
          }
        ]
      }
  
}