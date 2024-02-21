// 又导入一遍，害
const express = require('express')

// 导入数据库
const db = require('../db/index')

//导入jwt
const jwt = require('jsonwebtoken')

// 导入配置文件
const config = require('../config')

// 定义查找号码是否已存在sql语句
const sqlCheckUserTell = 'select * from users where tell=? '
// 插入新注册电话
const sqlInsertUser = 'insert into users (tell,captcha) values (?,?)'
// 更新注册信息
const sqlUpdateUser = 'update users set name=?,password=? where tell=?'


// 注册获取验证码的处理函数
exports.captcha = (req, res) => {
    let user = req.body;
    db.query(sqlCheckUserTell, user.tell, (err, results) => {
        // 201-出错
        if (err) {
            // console.log('有错');
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        // 电话号码已获取过验证码，要确定是否注册过
        else if (results.length > 0) {
            // name为空说明未注册过，再次获取验证码，更新数据库的内容
            // console.log(results);
            if (results[0].name == null) {
                // 获取6位数字，当作验证码
                const captcha = (Math.random() + '').substring(2, 8);
                // 数据库存上用户名和验证码，以便注册时验证验证码是否正确
                db.query('update users set captcha=? where tell=?', [captcha, user.tell], (err, results) => {
                    if (err) return console.log(err.message);
                    // 如果操作影响的行数为1，就代表插入成功啦
                    if (results.affectedRows === 1) { console.log('更新数据成功'); }
                })
                return res.send({
                    "code": 200,
                    "message": "获取验证码成功",
                    "data": captcha,
                })
            }
            // 电话号码已注册
            else {
                return res.send({
                    "code": 202,
                    "message": "该电话号码已注册，请前往登录页面",
                })
            }

        }
        // 第一次获取验证码
        else {
            // 获取6位数字，当作验证码
            const captcha = (Math.random() + '').substring(2, 8);
            // 数据库存上用户名和验证码，以便注册时验证验证码是否正确
            db.query(sqlInsertUser, [user.tell, captcha], (err, results) => {
                if (err) return console.log(err.message);
                // 如果操作影响的行数为1，就代表插入成功啦
                if (results.affectedRows === 1) { console.log('插入数据成功'); }
            })
            return res.send({
                "code": 200,
                "message": "获取验证码成功",
                "data": captcha,
            })
        }
    })
}
// 注册用户的处理函数
exports.regUser = (req, res) => {
    let user = req.body;
    // console.log(user);
    db.query(sqlCheckUserTell, user.tell, (err, results) => {
        // 201-出错
        if (err) {
            // console.log('有错');
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        // 200-验证码是对的，成功
        else if (results[0].captcha == user.captcha) {
            // console.log(results[0].captcha);
            const { tell, name, password1 } = user
            db.query(sqlUpdateUser, [name, password1, tell], (err, results) => {
                if (err) return console.log(err.message);
                // 如果操作影响的行数为1，就代表成功啦
                if (results.affectedRows === 1) { console.log('完善数据成功'); }
            })
            return res.send({
                "code": 200,
                "message": "成功",
            })
        }
        // 202-验证码有误
        else {
            // console.log('有误');
            return res.send({
                "code": 202,
                "message": "验证码或电话号码有误",
            })
        }
    })
}
// 登陆的处理函数
exports.login = (req, res) => {
    let user = req.body;
    db.query(sqlCheckUserTell, user.tell, (err, results) => {
        // 201-出错
        if (err) {
            // console.log('有错');
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        // 200-数据库找到了这个电话
        else if (results.length > 0) {
            //  200-密码对上了！
            if (results[0].password == user.password) {
                // 剔除密码，再转token进行加密
                const user = { ...results[0], password: '' }
                // 生成 Token 字符串
                const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                    expiresIn: '10h', // token 有效期为 10 个小时
                })
                // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                return res.send({
                    "code": 200,
                    "message": '身份认证成功',
                    'token': tokenStr,
                })
            }
            // 203-密码错误
            else {
                return res.send({
                    "code": 203,
                    "message": '密码错误',
                })
            }
        }
        //  202-数据库里没找到这个电话
        else {
            return res.send({
                "code": 202,
                "message": "您尚未注册",
            })
        }
    })
}
// 获取用户信息
exports.getUserInfo = (req, res) => {
    // console.log(11111);
    // console.log(req.auth);
    db.query(sqlCheckUserTell, req.auth.tell, (err, results) => {
        // 201-出错
        if (err) {
            console.log(2222 + err.message);
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        else if (results.length == 1) {
            return res.send({
                "code": 200,
                "message": '获取用户信息成功',
                "data": req.auth
            })
        }
        else {
            return res.send({
                "code": 202,
                "message": '获取用户信息失败'
            })
        }
    })
}

// 查询用户的购物车商品
const sqlCheckShopcarTell = 'select * from shopcar where tell=?'
// 查找是否存在某个用户的某个商品
const sqlCheckShopcar = 'select * from shopcar where tell=? and shoppingName=? '
// 插入新商品
const sqlInsertShopcar = 'insert into shopcar (tell,shoppingName,shoppingNumber,unitPrice) values (?,?,?,?)'
// 更新商品数量
const sqlUpdateShopcar = 'update shopcar set shoppingNumber=? where tell=? and shoppingName=?'
// 删除商品
const sqlDeleteShopcar = 'delete from shopcar where tell=? and shoppingName=?'

// 添加商品到购物车
exports.addShopping = (req, res) => {
    let shopping = req.body;
    // const { } = shopping;
    // 此前，此人购物车中，是否存在此商品
    db.query(sqlCheckShopcar, [req.auth.tell, shopping.name], (err, results) => {
        // 201-出错
        if (err) {
            console.log(000 + err);
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        // 用户的购物车已存在部分商品,更新数量
        else if (results.length == 1) {
            // console.log(results);//[rowdatepacket{},]
            // 一开始数据格式不对，报错Unknown column 'NaN' in 'field list'
            db.query(sqlUpdateShopcar, [shopping.n + results[0].shoppingNumber, req.auth.tell, shopping.name], (err, results) => {
                if (err) {
                    // console.log(111 + err);
                    return res.send({
                        "code": 201,
                        "message": err.message,
                    })
                }
                if (results.affectedRows === 1) {
                    return res.send({
                        "code": 200,
                        "message": '加入购物车成功'
                    })
                }
            })
        }
        // 用户之前的购物车是空的,插入新的数据
        else {
            db.query(sqlInsertShopcar, [req.auth.tell, shopping.name, shopping.n, shopping.price], (err, reaults) => {
                if (err) {
                    // console.log(222 + err);
                    return res.send({
                        "code": 201,
                        "message": err.message,
                    })
                }
                if (results.affectedRows === 1) {
                    return res.send({
                        "code": 200,
                        "message": '加入购物车成功'
                    })
                }
            })
        }
    })
}
// 修改购物车商品数量
exports.changeShopping = (req, res) => {
    let shopping = req.body;
    console.log(shopping);
    db.query(sqlUpdateShopcar, [shopping.shoppingNumber, req.auth.tell, shopping.shoppingName], (err, results) => {
        if (err) {
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        console.log(results);
        if (results.affectedRows === 1) {
            return res.send({
                "code": 200,
                "message": '修改数量成功'
            })
        }
    })
}
// 删除购物车商品--参数只需要name
exports.deleteShopping = (req, res) => {
    let shopping = req.body;
    db.query(sqlDeleteShopcar, [req.auth.tell, shopping.shoppingName], (err, results) => {
        if (err) {
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        if (results.affectedRows === 1) {
            return res.send({
                "code": 200,
                "message": '删除商品成功'
            })
        }
    })
}
// 查询购物车商品,不用带用户信息，token里面带有用户信息，可以验证身份
exports.getShopcarInfo = (req, res) => {
    db.query(sqlCheckShopcarTell, req.auth.tell, (err, results) => {
        if (err) {
            return res.send({
                "code": 201,
                "message": err.message,
            })
        }
        // console.log(results);//array
        // 怎么可能等于1 啊，我很可能有很多个商品，
        if (results.length >= 0) {
            return res.send({
                "code": 200,
                "message": '加入购物车成功',
                'data': results
            })
        }
        else {
            return res.send({
                "code": 201,
                "message": '未知错误',
            })
        }
    })
}