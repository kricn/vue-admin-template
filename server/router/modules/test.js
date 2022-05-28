const Router = require('koa-router')
const router = new Router()

router.get("/test", async ctx => {
  console.log(ctx.query)
  console.log(ctx.request.fields)
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  })
  ctx.body = {
    code: 1,
    msg: '',
    data: [
      { label: 'test label', value: 1}
    ]
  }
})

module.exports = app => router.routes()