const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const router = new Router({
  prefix: '/file'
});

const tmp = path.resolve(__dirname, '../../../static/tmp')
if (!fs.existsSync(tmp)) {
  fs.mkdirSync(tmp)
}

router.post('/upload', async ctx => {
  const { file, name, index } = ctx.request.fields
  const tempPath = path.resolve(tmp, name)
  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath)
  }
  const filepath = file[0].path
  const reader = fs.createReadStream(filepath)
  const writer = fs.createWriteStream(path.resolve(tempPath, index))
  reader.pipe(writer)
  ctx.body = {
    msg: 'this is a upload api.'
  }
})

router.get('/merge', async ctx => {
  const { name, total } = ctx.query
  const files = fs.readdirSync(tmp)
  console.log(files)
  ctx.body = {
    msg: 'merge success.'
  }
})

module.exports = app => {
  return router.routes();
}