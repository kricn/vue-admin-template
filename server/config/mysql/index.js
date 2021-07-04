const mysql = require('mysql')
const co = require('co-mysql')
const {
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} = process.env
const options = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,  
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
};
const pool = mysql.createPool(options)

module.exports = app => {
  return new Promise((resolve, reject) => {
    console.log('数据库连接中...')
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('数据库链接失败！！')
        reject(err)
      } else {
        console.log('数据库连接成功...')
        app.context.db = pool
        resolve()
      }
    })
  })
}