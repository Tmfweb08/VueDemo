/*
  入口js文件
*/
import Vue from 'vue'
import App from './App.vue'

/*引入路由器*/
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
