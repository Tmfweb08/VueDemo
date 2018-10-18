/*vuex的mutations模块*/
import Vue from 'vue'
//引入mutatiions-type 常量名
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo
  },
  //重置userInofo
  [RESET_USER](state){
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}){
    // if(!food.count){  //第一次增加时没有count
    //   Vue.set(food, 'count', 1)   //给有数据绑定的对象添加指定属性名和值的属性(有绑定)
    //   state.shopCart.push(food)   //添加到购物车
    // }else{
    //   //有count
    //   food.count++
    // }
    if(food.count) {
      food.count++
    } else { // 第一次增加, 没有count属性
      // 给food添加一个新的属性count, 值为1
      // food.count = 1   // 界面不会更新, 因为新添加的属性, 没有数据绑定
      Vue.set( food, 'count', 1) // 新添加的属性有数据绑定 ==>界面会更新
      // 将新的food添加到购物车中
      state.shopCart.push(food)
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}){
    if(food.count){   //count有值才为1
      food.count--
      if(food.count === 0){ //如果数量减为0，从购物车中移除
        state.shopCart.splice(state.shopCart.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state){
    //将所有food的count设置为0
    state.shopCart.forEach(food => food.count = 0)
    //将所有购物车重置为空数组
    state.shopCart = []
  }
}
