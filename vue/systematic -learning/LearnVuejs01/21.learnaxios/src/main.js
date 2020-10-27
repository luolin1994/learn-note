import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

//1. axios的基本使用
//默认为get请求
// axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   method: 'get'
// }).then(res => {
//   console.log(res)
// })
//
// axios({
//   url: 'http://123.207.32.32:8000/home/data',
//   //专门针对get请求的参数拼接
//   params: {
//     type: 'sell',
//     page: 1
//   }
//
// }).then(res => {
//   console.log(res)
// })

//2.axios发送并发请求
// axios.all([axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }),axios({
//   url: 'http://123.207.32.32:8000/home/data',
//   params: {
//     type: 'sell',
//     page: 1
//   }
// })]).then(results => {
//   console.log(results)
//   console.log(results[0])
//   console.log(results[1])
// })

//3.使用全局的axios及其配置进行网络请求
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000
//
// axios.all([axios({
//   url: '/home/multidata'
// }),axios({
//   url: '/home/data',
//   params: {
//     type: 'sell',
//     page: 1
//   }
// })]).then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2);
// })
// )

//4.创建对应的axios的实例
// const instance1 = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
//
// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res);
// })
//
// instance1({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })
//
// const instance2 = axios.create({
//   baseURL: '',
//   timeout: 10000,
//   headers: {
//
//   }
// })


//5.封装request模块
import {request} from "./network/request";


// request({
//   baseConfig:{
//
//   },
//   success: function (res) {
//
//   },
//   failure: function (err) {
//
//   }
// })


// request({
//   url: '/home/multidata'
// },res => {
//   console.log(res);
// },err => {
//   console.log(err);
// })

request({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

//数组解构
const names = ['xiaoa','xiaob','xiaoc'];
const [name1, name2, name3] =names;


