const path = require('path');
const Koa = require('koa');
const app = new Koa();

// 配置环境变量
require('dotenv').config({path: '.env'})

// 配置 post 请求
const BodyParse = require('koa-better-body');
app.use(BodyParse())

// 配置 session 
const session = require('./session')
app.use(session(app))

// 日志系统
const logger = require('./logger')
app.use(logger())

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

// 静态服务
const static = require('koa-static')
const mount = require('koa-mount')
app.use(mount('/public', static(path.resolve(__dirname, '../static/public'))))

module.exports = app;