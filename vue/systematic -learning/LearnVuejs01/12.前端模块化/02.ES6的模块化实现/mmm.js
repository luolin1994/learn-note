//1.导入的{}中定义的变量
import {flag, sum} from "./aaa.js"

if(flag){
    console.log('hahahahaha')
}

//2.直接导入export定义的变量
import {num1,num2} from "./aaa.js"
console.log(num1,num2)


//3.导入export的function/class
import {mul, Person} from "./aaa.js"
console.log(mul(100, 20))

const p = new Person()
p.run()

//4.导入export default
import addr from "./aaa.js"  //可以随便起名字
addr('hello')

//5. 统一全部导入
import * as info from "./aaa.js"
//console.log(aaa.flag)