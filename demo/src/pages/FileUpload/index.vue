<template>
  <div class="container">
    <input class="file_trigger" type="file" ref="fileTrigger" @change="handleFileChange" />
    <div class="file_field">
      <button @click="handleSelectFile">{{ filename ? '重新选择文件' : '请选择文件'}}</button>
      <div v-if="filename">
        已选文件：{{ filename }}
      </div>
    </div>
    <div>
      <template v-for="(chunk) in chunks" :key="chunk.index">
        <div class="chunk">
          <span :style="{ color: chunk.status === 'fail' ? 'red': '' }">{{chunk.name}}-{{chunk.hash}}-{{chunk.index}}--------{{ chunk.status }}</span>
          <button 
            type="primary" 
            @click="handleUploadAgain(chunk.index)"
            v-if="chunk.status === 'fail'"
          >
            重新上传
          </button>
        </div>
      </template>
    </div>
    <button type="primary" @click="handleUpload">upload</button>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import {
  uploadBigFile,
  mergeBigFile
} from '@/api/file.js'

export default {
  name: 'FileUpload',
  setup() {
    // 文件名
    let filename = ref(null)
    // 每个文件对应的 hash 值，用于后端识别合并文件
    let hash = ref(null)
    let fileTrigger = ref(null)
    // 需要上传的文件，到时候就是从这个文件切片
    let file = ref(null)
    // 切片后的数组
    let chunks = ref([])
    // 异步任务队列
    let tasks = reactive([])
    // 切片大小
    const chunkSize = 1024 * 1024

    const handleSelectFile = () => {
      const trigger = fileTrigger.value
      trigger.click()
    }
    const handleFileChange = (e) => {
      file.value = e.target.files[0]
      // hash 生成
      hash.value = 'abcdef'
      filename.value = file.value.name
      // 切片
      chunks.value = handleSpliceFile(file.value, chunkSize)
      // 生成异步任务
      chunks.value.forEach((item, index) => {
        let formdata = new FormData()
        formdata.append('file', item.blob)
        formdata.append('name', item.name)
        formdata.append('index', index)
        tasks.push({
          // 每个任务的标识
          index,
          action: () => uploadBigFile(formdata)
        })
      })
    }
    // 切片辅助函数
    const handleSpliceFile = (file, size) => {
      const filesize = file.size
      const chunkLen = Math.ceil(filesize / size)
      let blob = []
      for (let i = 0; i < chunkLen; i ++) {
        blob.push({
          name: file.name,
          hash: hash.value,
          status: 'waitting',
          index: i,
          blob: file.slice(i * size, i * size + size)
        })
      }
      return blob
    }
    // 开始上传
    const handleUpload = () => {
      // 复制一份任务队列
      const tasksCopy = tasks.slice()
      // 递归函数，控制并发，有顺序的执行任务
      const taskControl = () => {
        if (tasksCopy.length === 0) {
          return ;
        }
        const taskAction = tasksCopy.shift()
        const currentTask = chunks.value.find(i => i.index === taskAction.index)
        currentTask && (currentTask.status = 'uploading')
        taskAction.action().then(() => {
          currentTask && (currentTask.status = 'success')
          // 判断是否需要合并文件
          if (
            chunks.value.filter(i => i.status == 'success') && 
            chunks.value.filter(i => i.status == 'success').length === chunks.value.length
          ) {
            mergeBigFile({name: filename.value, total: chunks.value.length})
          }
        }).catch(() => {
          currentTask && (currentTask.status = 'fail')
        }).finally(() => {
          // 递归调用
          taskControl()
        })
      }
      for (let i = 0; i < 2; i ++) {
        // 一次性并发的数量
        taskControl()
      }
    }
    // 单独的切片上传，用于意外原因而上传失败的切片
    const handleUploadAgain = index => {
      const currentTask = tasks.find(i => i.index === index)
      const currentChunk = chunks.value.find(i => i.index === index)
      currentTask.action().then(() => {
        currentChunk && (currentChunk.status = 'success')
        if (
          chunks.value.filter(i => i.status == 'success') && 
          chunks.value.filter(i => i.status == 'success').length === chunks.value.length
        ) {
          mergeBigFile({name: filename.value, total: chunks.value.length})
        }
      }).catch(() => {
        currentChunk && (currentChunk.status = 'fail')
      })
    }

    return {
      fileTrigger,
      filename,
      chunks,
      handleSelectFile,
      handleFileChange,
      handleUpload,
      handleUploadAgain
    }

  },
}
</script>
<style lang="scss" scoped>
.file_trigger {
  display: none;
}
.file_field {
  padding: 10px 0;
}
.chunk {
  padding: 12px 0;
}
</style>