const session = require('koa-session');
module.exports = (app) => {
  // 配置 session
  app.keys = ['kricn']
  const conf = {
    key: 'test',
    maxAge: 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,  // 改写 session
    // renew: true, // 快到期刷新 session
  }

  return session(conf, app)
}
