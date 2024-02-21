// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象,地址是本地，因为我们操作的是自己电脑上的数据库
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_hungry',
})
// 测试mysql模块能否正常获取数据
db.query('select * from users', (err, results) => {
    // 报错
    if (err) return console.log(err.message);
    // console.log(results);
    // console.log(9);
})
// 插入数据
const user = { tell: '18888888888', name: '要发', password: 'Bzd8' }
// ？问号占位符
// const sqlStr = 'insert into users (tell,name,password) values (?,?,?)'
const sqlStr = 'insert into users set ?'
// db.query(sqlStr, user, (err, results) => {
//     if (err) return console.log(err.message);
//     // 如果操作影响的行数为1，就代表插入成功啦
//     if (results.affectedRows === 1) { console.log('插入数据成功'); }

// })

// 向外共享 db 数据库连接对象
module.exports = db                                                                                           