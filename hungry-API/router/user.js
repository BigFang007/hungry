const express = require('express')
// 创建路由对象
const router = express.Router()

//导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 未注册过的用户获取验证码
router.post('/captcha', userHandler.captcha)
// 注册新用户
router.post('/register', userHandler.regUser)

// 登录
router.post('/login', userHandler.login)

// 获取用户信息
router.get('/getUserInfo', userHandler.getUserInfo)

// 添加商品到购物车
router.post('/addShopping', userHandler.addShopping)
// 修改购物车商品数量
router.post('/changeShopping', userHandler.changeShopping)
// 删除购物车商品
router.post('/deleteShopping', userHandler.deleteShopping)
// 查询购物车商品,不用带用户信息，token里面带有用户信息，可以验证身份
router.get('/getShopcarInfo', userHandler.getShopcarInfo)

// 将路由对象共享出去
module.exports = router
