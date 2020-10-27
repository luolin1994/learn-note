import {INCREMENT} from './mutation-types'

export default {
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
}