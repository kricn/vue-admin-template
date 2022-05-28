const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const router = new Router({
  prefix: '/file'
});

const { mergeFile } = require('../../../utils/file.js')

const tmp = path.resolve(__dirname, '../../../static/tmp')
const publicPath = path.resolve(__dirname, '../../../static/public')
if (!fs.existsSync(tmp)) {
  fs.mkdirSync(tmp)
}
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

router.post('/upload', async ctx => {
  const { file, name, index } = ctx.request.fields
  // if (index == 3) {
  //   ctx.status = 401
  //   ctx.body = {
  //     msg: 'error'
  //   }
  //   return ;
  // }
  const tempPath = path.resolve(tmp, name)
  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath)
  }
  const filepath = file[0].path
  const reader = fs.createReadStream(filepath)
  const writer = fs.createWriteStream(path.resolve(tempPath, index))
  reader.pipe(writer)
  ctx.body = {
    name,
    index,
    code: 1,
    msg: 'upload success.'
  }
})

router.get('/merge', async ctx => {
  const { name, total } = ctx.query
  const dirPath = path.resolve(tmp, name)
  const files = fs.readdirSync(dirPath)
  if (files.length < total) {
    ctx.body = {
      code: -1,
      msg: '文件数量不正确'
    }
    return false;
  }
  const writer = fs.createWriteStream(path.resolve(publicPath, name))
  await mergeFile(dirPath, files, writer)
  ctx.body = {
    code: 1,
    msg: 'merge success.'
  }
})

module.exports = app => {
  return router.routes();
}