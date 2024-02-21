// 导入 express 模块
const express = require('express')
// 创建 express 的web服务器实例
const app = express()

// 导入config
const config = require('./config')
// 导入 cors 中间件,并注册为全局中间件，解决跨域问题
const cors = require('cors')
app.use(cors())

app.use(express.json()) // for parsing application/json
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false }))

// 这里少写了/api，我想死
// 获取商品列表，typeNav
app.get('/api/product/getBaseCategoryList', (req, res) => {
    res.send({
        "code": 200,
        "message": "成功",
        "data": [{ categoryId: 1, categoryName: '精品推荐', categoryChild: [{ categoryId: 1, categoryName: '精品推荐' }] },
        { categoryId: 2, categoryName: 'apple', categoryChild: [{ categoryId: 2, categoryName: 'apple' }] },
        { categoryId: 3, categoryName: 'apple', categoryChild: [{ categoryId: 3, categoryName: 'apple' }] },
        { categoryId: 4, categoryName: 'apple', categoryChild: [{ categoryId: 4, categoryName: 'apple' }] },
        { categoryId: 5, categoryName: 'apple', categoryChild: [{ categoryId: 5, categoryName: 'apple' }] },
        { categoryId: 6, categoryName: 'apple', categoryChild: [{ categoryId: 6, categoryName: 'apple' }] },
        { categoryId: 7, categoryName: 'apple', categoryChild: [{ categoryId: 7, categoryName: 'apple' }] },
        { categoryId: 8, categoryName: 'apple', categoryChild: [{ categoryId: 8, categoryName: 'apple' }] },
        { categoryId: 9, categoryName: 'apple', categoryChild: [{ categoryId: 9, categoryName: 'apple' }] },
        { categoryId: 10, categoryName: 'apple', categoryChild: [{ categoryId: 10, categoryName: 'apple' }] },
        { categoryId: 11, categoryName: 'apple', categoryChild: [{ categoryId: 11, categoryName: 'apple' }] },
        { categoryId: 12, categoryName: 'apple', categoryChild: [{ categoryId: 12, categoryName: 'apple' }] },
        { categoryId: 13, categoryName: 'apple', categoryChild: [{ categoryId: 13, categoryName: 'apple' }] },
        ],
        "ok": true
    })
})

// 导入expressJWT,algorithms: ["RS256"],algorithms` is a required option
const { expressjwt } = require('express-jwt')
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"], }).unless({ path: ["/api/login", "/api/register"] }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter) //这里加了api，我自己应该不用加了，待会肯定报错/    

// 错误中间件
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        console.log(1111 + err.message);
        return res.send({
            "code": 201,
            "message": '身份认证失败',
        })
    }

    next()
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8081, function () {
    console.log('api server running at http://127.0.0.1:8081')
})
