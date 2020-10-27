<template>
  <div id="app">
    <h2>我是APP组件</h2>

    <!-- router-link:全局注册组件，最终默认渲染成a标签 
              属性：
                  tag: 将其渲染成定义的组件
                  replace:不会留下history记录，后退键不能返回到上一个页面中
                  active-class: router-link在激活状态下会生成一个class=router-link-active-->
    
    <!-- <router-link to="/home" tag="button" replace  active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace active-class="active">关于</router-link> -->
    
    <!-- 在路由的index.js中统一将router-link-active改成active -->
    <!-- <router-link to="/home" tag="button" replace  active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace active-class="active">关于</router-link> -->
    
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-link v-bind:to="'/user/'+userid">用户</router-link>
    <router-link :to="{path: '/profile', query: {name: 'why', age:'17'}}">档案</router-link>
    
    
    
    
    
    <!-- 占位,动态渲染-->
    <!-- 在路由切换时，切换的是该标签挂载的组件，其他内容不会发生变化 -->
    
    <!-- 排除组件，组件名之间不能加空格-->
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
    

  
  <!-- 通过代码的方式修改路由 -->
  <!-- <button @click='homeClic'>home</button>
  <button @click='aboutClic'>about</button> -->
   <!-- <button @click="userClic">用户</button>
   <button @click="proClic">档案</button> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    homeClic(){

      //此处的router是VueRouter出来的实例
      //push => pushState()
      this.$router.push('/home')
      //this.$router.replace('/home')
    },
    aboutClic(){
      this.$router.push('about')
    },
    userClic(){
      this.$router.push('/user/'+this.userid)
    },
    proClic(){
      this.$router.push({
        path: '/profile',
        query:{
          name: 'zhangsan',
          age: '17'
        }
      })
    }
  },
  data(){
    return {
      userid: 'lisi'
    }
  }
}
</script>

<style>
  .active{
    color: red;
  }

</style>
