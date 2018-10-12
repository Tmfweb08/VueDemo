<!--应用根组件-->
<template>
  <div id="app">
    <router-view />
    <!--$route代表当前路由-->
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
  /*引入底部组件*/
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    components: {
      FooterGuide
    },
    mounted(){
      //异步获取address，并保存到state
      this.$store.dispatch('getAddress')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #fff
</style>
