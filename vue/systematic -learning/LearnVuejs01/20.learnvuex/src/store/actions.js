export default {
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

}