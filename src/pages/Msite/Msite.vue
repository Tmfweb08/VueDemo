<!--底部组件-->
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index2) in cs" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else alt="">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
  /*引入下载轮播图的插件*/
  import Swiper from 'swiper'
  import {mapState} from 'vuex'

  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
    data(){
      return{
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted(){
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed: {
      //计算属性
      ...mapState(['address','categorys']),

      //产生一个二维数组，小数组中元素的最大个数为8
      categorysArr(value){
        const max = 8   //最大
        const arr = []  //二维数组，大数组
        const {categorys} = this
        let smallArr = []   //小数组
        //遍历categorys
        categorys.forEach((c, index) => {
          //当小数组为空数组时，将小数组保存到大数组中
          if(smallArr.length === 0){
            arr.push(smallArr)
          }
          smallArr.push(c)
          //当小数组为8时，新建一个空数组
          if(smallArr.length === max){
            smallArr = []
          }
        })
        return arr
      }
    },
    watch: {
      categorys(value){
        //必须在状态数据
        this.$nextTick(() => {    //回调函数在界面更新之后执行
          //出书话列表显示之后执行
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav      //导航
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list    //附近商家
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
