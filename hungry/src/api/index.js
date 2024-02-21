// API统一管理
import requests from "./request";
import mockRequests from './mockRequests'
// 三级联动接口
// axios发请求返回结果是promise对象
export const reqCategoryList = () =>
    requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
// 主轮播图接口
export const reqCarouselList = () => mockRequests.get('/carousel')
// 季节轮播图接口
export const reqSeasonList = () => mockRequests.get('/season')
// 商品陈列接口，写成post，因为要根据搜索展示相应商品，要传参数,params至少得是个空对象
// export const reqDisplayList = () => mockRequests.get('/display')
export const reqDisplayList = (params) => mockRequests({ url: '/display', method: 'post', data: params })

// 用户注册获取验证码：先验证该电话号码是否已注册，已注册就让他登陆
export const reqCaptcha = (user) =>
    requests({
        url: '/captcha',
        method: 'post',
        data: user
    })

// 注册
export const register = (user) => requests({ url: '/register', method: 'post', data: user })
// 登陆
export const login = (user) => requests({ url: '/login', method: 'post', data: user })
// 获取用户信息
export const getUserInfo = () => requests({ url: '/getUserInfo', method: 'get' })
// 添加商品到购物车
export const addShopping = (shopping) => requests({ url: '/addShopping', method: 'post', data: shopping })
// 修改购物车商品数量
export const changeShopping = (shopping) => requests({ url: '/changeShopping', method: 'post', data: shopping })
// 删除购物车商品
export const deleteShopping = (shopping) => requests({ url: '/deleteShopping', method: 'post', data: shopping })
// 查询购物车商品,不用带用户信息，token里面带有用户信息，可以验证身份
export const getShopcarInfo = () => requests({ url: '/getShopcarInfo', method: 'get' })

