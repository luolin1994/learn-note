export default {
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

}