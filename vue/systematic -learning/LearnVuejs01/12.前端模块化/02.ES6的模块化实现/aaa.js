var name = 'xiaoming'
var age  = 18
var flag = true

function sum(num1,num2){
    return num1 + num2
}

if(flag){
    sum(20,30)
}


//1.导出方式一
export {
    flag, sum

}

//2.导出方式二：
export var num1 = 300;
export var num2 = 400;

//3.导出函数/类
export function mul(num1, num2){
    return num1 * num2
}


export class Person{
    run(){
        console.log('running')
    }
}

//4.export default
//在同一个模块中，有且仅有一个default
const address = "上海"
//export default address

export default function(arg){
    console.log(arg)
}



