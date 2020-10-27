
//1.使用CommonJs的模块化规范
const {add , mul} = require("./mathUtils.js")

console.log(add(10,20))
console.log(mul(10,2))

//2.ES6的模块化规范
import {name,age,height} from './info.js'
console.log(name)
console.log(age)
console.log(height)

//webpack .\src\main.js .\dist\bundle.js
//将js打包成一个文件，在html中只需要引用一个