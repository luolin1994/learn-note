<template>
    <div>
       <h2>{{message}}</h2>

       <h2>{{name}}</h2>
       <Cpn/>
    </div>
</template>

<script>
import Cpn from './Cpn.vue'
export default {
    name: "App",
    data(){
        return {
            message: 'hello,webpack',
            name: 'wangwu'
        
        }
        
    },
    components:{
        Cpn
    }
}
</script>

<style scope>
   
</style>