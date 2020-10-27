import Vue from 'vue'
import Vuex from 'vuex'
import {INCREMENT} from './mutation-types'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import moduleA from './modules/moduleA'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const state = {
    counter: 1000,
    students: [
        {id: 110, name: 'xiaoa', age: 18},
        {id: 111, name: 'xiaob', age: 24},
        {id: 112, name: 'xiaoc', age: 30},
        {id: 113, name: 'xiaod', age: 11}
    ],
    info: {name:'jackson', age:24, height:188}
}


const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        a: moduleA
    }
})

//3.导出store
export default store

//es6语法
const obj = {
    name: 'lily',
    age: 13,
    height: 123
}
const {name , age, height}=obj;