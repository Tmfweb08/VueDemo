/*
  入口js文件
*/
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'

/*引入路由器*/
import router from './router'
import store from './store'
import './mock/mockServer'
import './filters'

import  CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'

//全局注册组件
Vue.component(Button.name, Button)  //mt-button
Vue.component('CartControl', CartControl)   //注册全局组件CartControl
Vue.component('Split', Split)   //分割线全局组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
