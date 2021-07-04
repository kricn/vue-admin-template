const app = require('./config')
const router = require('./router')
const mysql = require('./config/mysql')

;(async() => {
  console.log('starting......')
  await Promise.all([
    router(app),
    mysql(app)
  ])
  app.listen(10086, () => {
    console.log('server is listing on 10086...')
  })
})()