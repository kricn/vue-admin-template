<template>
  <div>
    <FormDesign :data="formData" />
    <el-button type="primary" @click="onGetData">获取表单数据</el-button>
    <!-- <el-button type="primary" @click="onPreview">预览</el-button> -->
  </div>
</template>
<script setup lang="ts">
import FormDesign from '@/components/FormDesign/src/FormDesign.vue';
import FormInfo from '@/store/FormInfo';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const formData = ref({})

const onGetData = () => {
  console.log(FormInfo.getFormData())
}

const onPreview = () => {
  
}

</script>