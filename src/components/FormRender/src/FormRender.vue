<template>
  <div>
    <el-form ref="renderForm">
      <template :key="item.itemId" v-for="item in formItems">
        <el-form-item 
          :label="item.widget.label" 
        >
          <component :is="item.name" v-bind="item.widget" v-model:value="item.value" />
        </el-form-item>
      </template>
    </el-form>
  </div>
  
</template>
<script setup lang="ts">
import FormInfo from '@/store/FormInfo';
import { ElForm } from 'element-plus';
import { ref} from 'vue';

const formItems = FormInfo.formItems

const renderForm = ref<InstanceType<typeof ElForm>>()

</script>