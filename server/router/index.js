const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');

const dir = './modules'
const dirPath = path.resolve(__dirname, dir);

route = []
function readModules (filePath) {
  const files = fs.readdirSync(filePath)
  for (let file of files) {
    const p = path.resolve(filePath, file)
    const stat = fs.lstatSync(p)
    if (stat.isDirectory()) {
      readModules(p)
    } else {
      route.push(p)
    }
  }
}

module.exports = app => {
  return new Promise(async (resolve) => {
    readModules(dirPath)
    route.forEach(item => {
      app.use(require(item)(app))
    })
    resolve()
  })
}
