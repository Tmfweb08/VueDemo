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

//全局注册组件
Vue.component(Button.name, Button)  //mt-button

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
