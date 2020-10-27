<template>
    <div>
        <h2>我是首页</h2>
        <p>我是首页内容，哈哈哈</p>

        <router-link to='/home/news'>新闻</router-link>
        <router-link to='/home/message'>消息</router-link>
        <router-view ></router-view>
    </div>
</template>

<script>
    export default {
        name:"Home",
        //组件被创建后自动执行该函数
        data(){
            return {
                path:'/home/news'
            }
        },
        created() {
            console.log('home created')
            //document.title='首页'
        },
        destroyed() {
            console.log('home destroyed')
        },

        //下面两个函数只有在组件使用了keep-alive时才是有效的
        activated() {
            this.$router.push(this.path)
        },
        deactivated() {
            
        },
        
        beforeRouteLeave (to, from, next) {
            // ...
            this.path = this.$route.path
            next()
        }

    }
</script>

<style>
    
</style>