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
<script lang="ts">
import { reactive, ref } from 'vue'
import { ResponseBody } from '@/types'
import { AxiosResponse } from 'axios'
import {
  uploadBigFile,
  mergeBigFile
} from '@/api/file'

interface Task {
  index: number
  action: () => Promise<any>
}

interface FileObj {
  name: string
  total: number
}

export default {
  name: 'FileUpload',
  setup() {
    // 该文件是否已经上传过
    let isUploaded = ref<boolean>(false)
    // 文件名
    let filename = ref<string>('')
    // 每个文件对应的 hash 值，用于后端识别合并文件
    let hash = ref<string>('')
    let fileTrigger = ref<null | HTMLElement>(null)
    // 需要上传的文件，到时候就是从这个文件切片
    let file = ref<File | null>(null)
    // 切片后的数组
    let chunks = ref<any[]>([])
    // 异步任务队列
    let tasks = reactive<Task[]>([])
    // 切片大小
    const chunkSize: number = 1024 * 1024

    const handleSelectFile = () => {
      const trigger = fileTrigger.value
      trigger?.click()
    }
    // 选择文件
    const handleFileChange = (e: Event) => {
      const element = e.target as HTMLInputElement
      const tempFile: File | null = (element.files as FileList)[0]
      if (!tempFile) return ;
      resetFile()
      isUploaded.value = false
      file.value = tempFile
      // hash 生成
      hash.value = 'abcdef'
      filename.value = file.value?.name
      // 切片
      chunks.value = handleSpliceFile(file.value, chunkSize)
      // 生成异步任务
      chunks.value.forEach((item, index) => {
        let formdata = new FormData()
        formdata.append('file', item.blob)
        formdata.append('name', item.name)
        formdata.append('index', index.toString())
        tasks.push({
          // 每个任务的标识
          index,
          action: () => uploadBigFile(formdata)
        })
      })
    }

    // 切片辅助函数
    const handleSpliceFile = (file: File, size: number) => {
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
      if (!file.value) return ;
      isUploaded.value = true
      // 复制一份任务队列
      const tasksCopy = tasks.slice()
      // 递归函数，控制并发，有顺序的执行任务
      const taskControl = () => {
        if (tasksCopy.length === 0) {
          return ;
        }
        const taskAction = tasksCopy.shift()
        const currentTask = chunks.value.find(i => i.index === taskAction?.index)
        currentTask && (currentTask.status = 'uploading')
        taskAction?.action().then(() => {
          currentTask && (currentTask.status = 'success')
          // 判断是否需要合并文件
          if (
            chunks.value.filter(i => i.status == 'success') && 
            chunks.value.filter(i => i.status == 'success').length === chunks.value.length
          ) {
            mergeFile({name: filename.value, total: chunks.value.length})
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
    const handleUploadAgain = (index: number) => {
      const currentTask = tasks.find(i => i.index === index)
      const currentChunk = chunks.value.find(i => i.index === index)
      currentTask?.action().then(() => {
        currentChunk && (currentChunk.status = 'success')
        if (
          chunks.value.filter(i => i.status == 'success') && 
          chunks.value.filter(i => i.status == 'success').length === chunks.value.length
        ) {
          mergeFile({name: filename.value, total: chunks.value.length})
        }
      }).catch(() => {
        currentChunk && (currentChunk.status = 'fail')
      })
    }

    const mergeFile = async (fileObj: FileObj) => {
      const res = await mergeBigFile(fileObj)
    }

    const resetFile = () => {
      file.value = null
      tasks = []
      filename.value = ''
      chunks.value = []
    }

    const cleanFile = () => {
      resetFile()
      isUploaded.value = false
    }

    return {
      fileTrigger,
      filename,
      chunks,
      isUploaded,
      handleSelectFile,
      handleFileChange,
      handleUpload,
      handleUploadAgain,
      cleanFile
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
  .ant-btn {
    margin-right: 20px;
  }
}
.chunk {
  padding: 12px 0;
}
</style>