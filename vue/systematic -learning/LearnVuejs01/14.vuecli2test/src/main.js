// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
  
  //效果等同于上,将下面的内容替换<div id="app"></div>
  // render: function(createElement){
  //   //1.普通用法 createElement('标签',{标签的属性},[' '])
  //   return createElement('h2',
  //                        {class:'box'},
  //                        ['hello world',createElement('button',['按钮'])])

  //   //2.传入组件对象 return createElement(App) ,即为runtime-only的原理, .vue组件传入的时候已经编译成render函数了

  // }
}) 
