export default {
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