
//1.使用CommonJs的模块化规范
const {add , mul} = require("./js/mathUtils.js")

console.log(add(10,20))
console.log(mul(10,2))

//2.ES6的模块化规范
import {name,age,height} from './js/info.js'
console.log(name)
console.log(age)
console.log(height)

//webpack .\src\main.js .\dist\bundle.js
//将js打包成一个文件，在html中只需要引用一个


//3.依赖css文件
//npm install --save-dev css-loader
require('./css/normal.css')

//4.依赖less文件
require('./css/special.less')

//npm install --save-dev babel-loader@7 babel-core babel-preset-es2015

//5.使用Vue进行开发 npm install vue --save
import Vue from 'vue'

//template中的内容会将el挂载点的内容进行替换

//npm install vue-loader vue-template-compiler --save-dev

//import App from './vue/app.js'
import App from './vue/App.vue'

new Vue({
    el: '#app',
    template: `<App/>`,
    components: {
        App
    }
    
})