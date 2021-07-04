<template>
  <div class="container">
    <input class="file_trigger" type="file" ref="fileTrigger" @change="handleFileChange" />
    <div class="file_field">
      <a-button @click="handleSelectFile">{{ filename ? '重新选择文件' : '请选择文件'}}</a-button>
      <div v-if="filename">
        已选文件：{{ filename }}
      </div>
    </div>
    <a-button type="primary" @click="handleUpload">upload</a-button>
  </div>
</template>
<script>
import { ref } from 'vue'
import {
  uploadBigFile
} from '@/api/file.js'
export default {
  name: 'FileUpload',
  setup() {
    let filename = ref(null)
    const fileTrigger = ref(null)
    const file = ref(null)
    const handleSelectFile = () => {
      const trigger = fileTrigger.value
      trigger.click()
    }
    const handleFileChange = (e) => {
      file.value = e.target.files[0]
      filename.value = file.value.name
    }
    const handleSpliceFile = (file, size) => {
      const filesize = file.size
      const chunkLen = Math.ceil(filesize / size)
      let blob = []
      for (let i = 0; i < chunkLen; i ++) {
        blob.push(file.slice(i * size, i * size + size))
      }
      return blob
    }
    const handleUpload = () => {
      const chunkSize = 1024 * 1024
      const blob = handleSpliceFile(file.value, chunkSize)
      blob.forEach((item, index) => {
        let formdata = new FormData()
        formdata.append('file', item)
        formdata.append('name', 'blob')
        formdata.append('index', index)
        uploadBigFile(formdata).then(() => {
          console.log('上传成功')
        })
      })
      // let formdata = new FormData()
      // formdata.append('file', file.value)
      // uploadBigFile(formdata).then(() => {
      //   console.log('上传成功')
      // })
    }
    return {
      fileTrigger,
      filename,
      handleSelectFile,
      handleFileChange,
      handleUpload
    }

  }
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
</style>