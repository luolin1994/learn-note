import Vue from 'vue'
import Vuex from 'vuex'
import {INCREMENT} from './mutation-types'

//1.安装插件
Vue.use(Vuex)

//2.创建对象

const moduleA = {
    state: {
        name: 'zhangjike'
    },
    mutations: {
        updateName(state,payload){
            state.name = payload
        }
    },
    actions: {
        //此时的context只能commit module中的mutation
        aUpdateName(context){
            //console.log(context)
            setTimeout(() => {
                context.commit('updateName','wangwu')
            },1000)
            
        }
    },
    getters: {
        fullName(state){
            return state.name + '11111'
        },
        fullName2(state,getters){
            return getters.fullName + '22222'
        },
        fullName3(state,getters, rootState){
            return getters.fullName2 + rootState.counter
        }
    }
}
const store = new Vuex.Store({
    state: {
        counter: 1000,
        students: [
            {id: 110, name: 'xiaoa', age: 18},
            {id: 111, name: 'xiaob', age: 24},
            {id: 112, name: 'xiaoc', age: 30},
            {id: 113, name: 'xiaod', age: 11}
        ],
        info: {name:'jackson', age:24, height:188}
    },
    mutations: {
        //方法,自动传递参数state
        [INCREMENT](state) {
            state.counter++
        },
        decrement(state){
            state.counter--
        },
        //携带参数
        //普通提交
        // incrementCount(state,count){
        //     state.counter += count
        // },
        //特殊提交
        incrementCount(state,payload){
            state.counter += payload.count
        },

        addStudent(state,stu){
            state.students.push(stu)
        },
        updateInfo(state){
            //响应式，已事先在state中定义
            state.info.name='lily'
            //非响应式,单独语句为非响应式，但是若该方法内有一条语句为响应式，则全部语句都将是响应式
            //state.info['stress'] = 'new york'

        }
    },
    actions: {
        //context:上下文，目前可以理解为store对象
        // aUpdateInfo(context,payload){
        //     setTimeout(() => {
        //         context.commit('updateInfo')
        //         console.log(payload.message)
        //         payload.success()
        //     }, 1000)
        // },

        aUpdateInfo(context,payload){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('updateInfo')
                    console.log(payload);
                    resolve('11111111')
                }, 1000)
            })
        }

    },
    getters: {
        powerCounter(state){
            return state.counter*state.counter
        },
        more20stu(state){
            return state.students.filter(s => s.age > 20)
        },
        //传入的第二个参数为getters
        more20stuLength(state,getters){
            return getters.more20stu.length
        },
        //如果想向其传递参数，可使用该方法
        moreAgeStu(state){
            // return function(age){
            //     return state.students.filter(s => s.age > age)
            // }

            return age => {
                return state.students.filter(s => s.age > age)
            }
        }

    },
    modules: {
        a: moduleA
    }
})

//3.导出store
export default store

//es6语法，对象的解构
const obj = {
    name: 'lily',
    age: 13,
    height: 123
}
//按照名字来分配
const {name , age, height}=obj;