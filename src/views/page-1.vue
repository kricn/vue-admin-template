<template>
  <div class="page-1">
    <header class="header fvertical">
      <!-- <el-button type="primary" @click="onGetData">获取表单数据</el-button> -->
      <el-button type="primary" @click="onPreview">预览</el-button>
    </header>
    <FormDesign />
    <el-drawer
      v-model="showProview"
      title="表单预览"
      direction="btt"
      @close="onPreviewClose"
      size="100vh"
    >
      <FormRender />
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import FormDesign from '@/components/FormDesign/src/FormDesign.vue';
import FormRender from '@/components/FormRender/src/FormRender.vue';
import FormInfo from '@/store/FormInfo';
import { ref } from 'vue';

const showProview = ref(false)

const onGetData = () => {
  console.log(FormInfo.getFormData())
}

const onPreview = () => {
  showProview.value = true
}

const onPreviewClose = () => {
  showProview.value = false
}

</script>
<style lang="scss" scoped>
.page-1 {
  background-color: #fff;
  min-height: 100vh;
  .header {
    padding: 0 20px;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>