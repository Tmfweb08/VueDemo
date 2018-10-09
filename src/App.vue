<!--应用根组件-->
<template>
  <div id="app">
    <router-view />
    <FooterGuide />
  </div>
</template>

<script>
  /*引入底部组件*/
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #fff
</style>
