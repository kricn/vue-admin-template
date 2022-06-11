# 大文件切片上传
## 流程
### 前端
获取上传文件 -> 将文件切片 -> 生成异步任务 -> 并发上传控制 -> 判断是否发起合并文件接口(文件上传失败处理) -> 发起文件合并请求
### 后端
接收文件切片 -> 生成单独文件夹保存切片 -> 合并接口通过参数判断能不能合并 -> 合并文件
## 前端并发请求处理
```js
// asyncCount 并发次数
// pool 异步请求池
function asyncPool (asyncCount = 3, pool) {

  const copyPool = pool.slice()
  function asyncPoolControll () {
    const currentTask = copyPool.shift()
    currentTask().then(() => {
      // 成功处理
    }).catch(err => {
      // 失败处理
    }).finally(() => {
      // 递归处理
      asyncPoolControll()
    })
  }

  for (let i = 0; i < asyncCount; i ++) {
    asyncPoolControll()
  }
}
```
## 代码位置
/demo/src/pages/FileUpload
/serve/router/modules/demo/upload.js