# Vue CLI

## runtime-compile和runtime-only的区别

- ESLint到底是什么

- template -> ast -> render -> vdom -> 真是DOM

- render: (h) => , -> createElement

## Vue CLI 3

- 如何通过CLI3创建项目
- CLI3的目录结构
- 配置文件：1.Vue UI 2. 隐藏的配置文件 3.自定义vue.config.js



# 1.发展

## 1.1 阶段一

### 1.1.1 后端渲染

jsp : java server page

HTML页面是由服务器来渲染的，服务器直接生产渲染好对应的HTML页面，返回给客户端进行展示

### 1.1.2 后端路由

后端处理URL和页面之间的关系

## 1.2 阶段二

### 1.2.1 前后端分离

后端只负责提供数据，不负责任何阶段的内容

### 1.2.2 前端渲染

浏览器中显示的网页中大部分内容，都是由前端写的js代码在浏览器中执行最终渲染出来的网页

## 1.3 阶段三

### 1.3.1 单页面富应用阶段

SPA(simple page application)：在前后端分离的基础上再加上一层前端路由。

整个网页只有一个html页面

### 1.3.2 前端路由

管理url和js中组件的映射关系

核心：改变URL，但是页面不进行整体的刷新

## 1.4 路由的基本配置



# 2.改变URL但是页面不进行刷新

## 2.1 改变URL的hash

URL的hash也就是锚点(#)，本质上是改变window.location的href属性

location.hash = "foo"

![image-20200412154125316](C:\Users\LuoLin\AppData\Roaming\Typora\typora-user-images\image-20200412154125316.png)

## 2.2 HTML5中的history模式：pushState

可以保留历史记录，点击返回按钮，属于栈结构: 先入后出

history.pushState({},'','home')

history.pushState({},'','me')

history.back( )

与this.$router.push相似

## 2.3 HTML5中的history模式：replaceState

取代，不可返回

history.replaceState({},'','home')

与this.$router.replace相似

## 2.4 HTML5中的history模式：go

history.back()等价于history.go(-1)

history.forward()等价于history.go(1)

这几个接口等同于浏览器界面的前进后退

与this.$router.go(n)相似

# 3.传递参数的方式

## 3.1params

动态路由

- 配置路由格式：/router/:id
- 传递的方式：在path后面跟上对应的值
- 传递后形成的路径：/router/123, /router/abc
- 通过$route.params.id获取

## 3.2query

- 配置路由格式：/router，也就是普通配置

- 传递的方式：对象中使用query的key

- 传递后形成的路径：/router?id=123, /router?id=abc

# 4.$router和$route的区别

所有的组件都继承自Vue类的原型

例如设定Vue.prototype.name = "hahaha", 所有的组件都将有name属性，取this.name的值得到"hahaha"

$router是import Router from 'vue-router'中创建的VueRouter对象

$route是当前活跃的路由

# 5. 路由嵌套



# 6.导航守卫的使用

路由在跳转前后执行的函数

利用router.beforeEach来完成标题的修改

afterEach()，可以不用调取next()函数

详情见 /router/index.js

以上为全局守卫，此外还有路由独享的守卫、组件内的守卫，详见官网

# 7.keep-alive遇见vue-router

- 路由跳转时，组件在创建、销毁，为避免这种情况，可用keep-alive
- keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染
- keep-alive的属性：include  exclude



# 8 TabBar的封装

给文件起别名