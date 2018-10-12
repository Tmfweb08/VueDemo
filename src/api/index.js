/*与后台交互模块*/
import ajax from './ajax'

/*获取地址信息(根据经纬度)*/
export const reqAddress = geohash => ajax('/api/position/' + geohash)

/*获取msite页面食品分类列表*/
export const reqCategorys = () => ajax('/api/index_category')

/*获取msite商铺列表(根据经纬度)*/
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

/*获取图片验证码*/
export const reqCaptchas = () => ajax('/appi/captchas')

/*账号密码登陆*/
export const accountLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/*获取短信验证码*/
export const mobileCode = phone => ajax('/api/sendcode', {phone})

/*手机号验证码登陆*/
export const phoneLogin = (phone, code) => ajax('api/login_sms', 'POST')

/*获取用户信息(根据会话)*/
export const reqUser = () => ajax('/api/userinfo')
