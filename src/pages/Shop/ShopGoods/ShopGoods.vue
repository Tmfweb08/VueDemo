<!--点餐组件-->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods"
              :class="{current:currentIndex===index}"
              @click="clickMenuItem(index,$event)">
            <span class="text border-1px">
              <img class="icon" v-if="item.icon" :src="item.icon">
                {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsWarpperUl">
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in item.foods" :key="index"
                @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default {
    data(){
      return {
        scrollY: 0,     //右侧y轴滑动的坐标
        tops: [],       //包含右侧所有分类小列表的top值
        food: {},       //当前需要显示的food
      }
    },
    mounted (){
      //使用axios请求mockjs提供的接口
      this.$store.dispatch('getShopGoods', () => {  //goods更新了，界面还没有更新
        this.$nextTick(() => {
          //初始化滚动
          this._initScroll()
          //初始化tops
          this._initTops()
        })
      })
    },
    methods: {
      _initScroll(){
        //左侧分类列表的BScroll
        new BScroll('.menu-wrapper', {
          click: true //响应点击
        })
        //右侧food列表的BScroll
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,   //手指滑动(惯性滑动和编码滑动不监视)
          click: true     //响应点击
        })
        //监视滑动过程
        this.foodsScroll.on('scroll', (pos) => {
          console.log(pos.y)
          //保存
          this.scollY = Math.abs(pos.y)
        })
        //监视滑动过程结束
        this.foodsScroll.on('scrollEnd', (pos) => {
          console.log('滑动结束', pos.y)
          this.scrollY = Math.abs(pos.y)  //解决惯性滑动更新
        })
      },

      _initTops(){
        const tops = []
        let top = 0
        //计算各个top，并保存到tops
        tops.push(top)
        //得到ul下所有的子li
        const lis = this.$refs.foodsWarpperUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach((li, index) => {
          top += li.clientHeight
          tops.push(top)
        })
        //保存tops
        this.tops = tops
        console.log(this.tops)
      },

      //选择左侧某个分类项
      clickMenuItem(index){
        //得到滚动目标坐标
        const top = this.tops[index]
          //更新目标scrollY值
        this.scrollY = top
        //平滑滚动到指定位置
        this.foodsScroll.scrollTo(0, -top, 300)
      },

      //显示food详情
      showFood(food){
        //更新food
        this.food = food
        //显示food组件界面
        //在父组件中得到子组件对象，并调用它的方法
        this.$refs.food.toggleShow()
      }
    },

    computed: {
      ...mapState(['goods']),
      //当前分类下标
      currentIndex() {
        return this.tops.findIndex((top, index) => {
          return this.scrollY >= top && this.scrollY < this.tops[index+1]
        })
      }
    },
    components: {
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


