<template>
  <div class="form-design-content">
    <el-scrollbar>
      <el-form :model="formData" :rules="formRules" class="design-form">
        <template :key="item.itemId" v-for="item in formItems">
          <el-form-item 
            :label="item.widget.label" 
            :class="['design-form-item', item.itemId === selectedFormItem?.itemId ? 'design-form-item__active' : '']"
            @click="onFormItemClick(item)"
          >
            <component :is="item.name" v-bind="item.widget" v-model:value="item.value" />
          </el-form-item>
        </template>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import FormInfo from '@/store/FormInfo';
import { FormDesignInfo } from '@/types/Form';
import { ref, watch } from 'vue';

const formData = ref<BaseObj<any>>({})
const formRules = ref({})

const formItems = FormInfo.formItems
const selectedFormItem = FormInfo.selectedFormItem

watch(() => formItems.value.length, () => {
})

const onFormItemClick = (item: FormDesignInfo.FormItem) => {
  selectedFormItem.value = item
}
</script>
<style lang="scss" scoped>
.form-design-content {
  .design-form {
    padding: 20px 10px;
    .design-form-item {
      border: 1px solid transparent;
      padding: 5px 10px 20px;
      cursor: pointer;
      border-radius: 10px;
      &.design-form-item__active {
        border-color: var(--blue);
      }
    }
  }
}
</style>