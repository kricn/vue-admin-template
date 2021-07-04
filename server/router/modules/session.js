const Router = require('koa-router');
const router = new Router();

router.get('/session', async ctx => {
  let view = ctx.session.view || 0
  ctx.session.view = ++view;
  ctx.body = {
    msg: 'this is a session api.',
    view
  }
})

module.exports = app => {
  return router.routes();
}