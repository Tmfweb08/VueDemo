/*包含n个getter的计算属性方法的对象*/
export default {
  //总数量
  totalCount(state){
    return state.shopCart.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  //总价格
  totalPrice(state){
    return state.shopCart.reduce((preTotal, food) => {
      return preTotal + food.count*food.price
    }, 0)
  },
  //满意的评价数量
  positiveRatingCount(state){
    return state.ratings.reduce((preTotal, rating) => {
      return preTotal + (rating.rateType === 0 ? 1 : 0)
    }, 0)
  }
}
