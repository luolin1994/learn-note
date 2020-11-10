//配置路由相关的信息
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

//路由懒加载，使用时再加载，分割打包后的js文件，一个懒加载对应一个js文件，提高访问效率
const Home = () => import('../components/Home')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')

//1.通过Vue.use(插件)，安装插件
Vue.use(Router)

//2.创建路由对象
const router =  new Router({
  routes: [
    {
      //设定路由的默认地址
      path: '/',
      //重定向：
      redirect: '/home'
    },
    {
      path: '/hellowprld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '',
          redirect: 'news'
        },
        {
          path: 'news',
          component: HomeNews
        },
        {
          path: 'message',
          component: HomeMessage
        }
      ]

    },
    {
      path: '/about',
      component: About,
      meta: {
        title: '关于'
      },
    },
    {
      //动态路由,通过params传递参数
      path: '/user/:userid',
      component: User,
      meta: {
        title: '用户'
      },
    },
    {
      //通过query传递参数
      path: '/profile',
      component: Profile,
      meta: {
        title: '档案'
      },
    }
  ],
  //将hash模式改成history模式
  mode: 'history',
  linkActiveClass:'active'
})


//全局导航守卫
//路由进行跳转之前会执行这个函数
//前置守卫
router.beforeEach((to, from, next) => {
  //实现页面标题随路由跳转而变化
  //从from跳转到to
  document.title = to.matched[0].meta.title
  //console.log(to)
  //console.log('beforeEach')
  next() //必须要主动调取，执行下一步动作
})

//后置钩子
router.afterEach((to,from) => {
  //console.log('afterEach')
})


export default router


