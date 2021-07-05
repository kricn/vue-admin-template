<template>
  <div class="container">
    <input class="file_trigger" type="file" ref="fileTrigger" @change="handleFileChange" />
    <div class="file_field">
      <a-button @click="handleSelectFile">{{ filename ? '重新选择文件' : '请选择文件'}}</a-button>
      <div v-if="filename">
        已选文件：{{ filename }}
      </div>
    </div>
    <div>
      <template v-for="(chunk) in chunks" :key="chunk.index">
        <div class="chunk">
          <span :style="{ color: chunk.status === 'fail' ? 'red': '' }">{{chunk.name}}-{{chunk.hash}}-{{chunk.index}}--------{{ chunk.status }}</span>
          <a-button 
            type="primary" 
            @click="handleUploadAgain(chunk.index)"
            v-if="chunk.status === 'fail'"
          >
            重新上传
          </a-button>
        </div>
      </template>
    </div>
    <a-button type="primary" @click="handleUpload">upload</a-button>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import {
  uploadBigFile,
  mergeBigFile
} from '@/api/file.js'

function asyncPool(pool) {

  const copyPool = pool.slice()
  const running = []
  const finished = []

}

export default {
  name: 'FileUpload',
  setup() {
    let filename = ref(null)
    let hash = ref(null)
    let fileTrigger = ref(null)
    let file = ref(null)
    let chunks = ref([])
    let tasks = reactive([])
    const chunkSize = 1024 * 1024

    const handleSelectFile = () => {
      const trigger = fileTrigger.value
      trigger.click()
    }
    const handleFileChange = (e) => {
      file.value = e.target.files[0]
      hash.value = 'abcdef'
      filename.value = file.value.name
      chunks.value = handleSpliceFile(file.value, chunkSize)
      chunks.value.forEach((item, index) => {
        let formdata = new FormData()
        formdata.append('file', item.blob)
        formdata.append('name', item.name)
        formdata.append('index', index)
        tasks.push({
          index,
          action: () => uploadBigFile(formdata)
        })
      })
    }
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
    const handleUpload = () => {
      const tasksCopy = tasks.slice()
      const taskControl = () => {
        if (tasksCopy.length === 0) {
          return ;
        }
        const taskAction = tasksCopy.shift()
        const currentTask = chunks.value.find(i => i.index === taskAction.index)
        currentTask && (currentTask.status = 'uploading')
        taskAction.action().then(() => {
          currentTask && (currentTask.status = 'success')
          if (
            chunks.value.filter(i => i.status == 'success') && 
            chunks.value.filter(i => i.status == 'success').length === chunks.value.length
          ) {
            mergeBigFile({name: filename.value, total: chunks.value.length})
          }
        }).catch(() => {
          currentTask && (currentTask.status = 'fail')
        }).finally(() => {
          taskControl()
        })
      }
      for (let i = 0; i < 2; i ++) {
        taskControl()
      }
    }
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
.container {
  padding: 12px;
}
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