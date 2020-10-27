<template>
    <div>
        <h2>我是用户界面</h2>
        <p>我是用户界面的相关信息</p>
        <h2>{{userid}}</h2>
    </div>
</template>

<script>
    export default{
        name: 'User',
        computed: {
            userid(){
                //拿到的是处于活跃状态的路由
                return this.$route.params.userid
            }
        },
    }
</script>

<style>

</style>