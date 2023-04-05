<template>
  <el-form label-position="top">
    <el-form-item label="标题：">
      <el-input v-model="widget.label" />
    </el-form-item>
    <el-form-item label="字段名：">
      <el-input v-model="selectedFormItem!.key" />
    </el-form-item>
    <el-form-item label="占位文字：">
      <el-input v-model="widget.placeholder" />
    </el-form-item>
    <el-form-item label="校验规则：">
      <el-checkbox label="必填" @change="onRequiredChange" v-model="isRequired" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
export default {
  name: 'FormInputConfig'
}
</script>
<script setup lang="ts">
import FormInfo from '@/store/FormInfo';
import { watch, ref } from 'vue';

const selectedFormItem = FormInfo.selectedFormItem
const widget = selectedFormItem.value!.widget

const isRequired = ref(false)

watch(() => selectedFormItem.value!.itemId, () => {
  const requiredIndexs = checkHasRequired()
  console.log(requiredIndexs)
  requiredIndexs.forEach(i => {
    isRequired.value = widget.rules![i].required || false
  })
}, {immediate: true})

/** 必填切换 */
const onRequiredChange = () => {
  const requiredIndexs = checkHasRequired()
  if (!requiredIndexs.length) {
    widget.rules?.push({
      required: isRequired.value,
      message: `字段必填`,
      trigger: 'blur'
    })
    return ;
  }
  requiredIndexs.forEach(i => {
    widget.rules![i].required = isRequired.value
  })
}

/** 
 * 判断规则里是否已经有加了required字段 
 * @returns {Array<number>} 返回所有带 required 字段的下标
 * */
function checkHasRequired(): Array<number> {
  if (!widget.rules) return [];
  const res: Array<number> = []
  for (let i = 0; i < widget?.rules?.length; i ++) {
    if ('required' in widget.rules[i]) {
      res.push(i)
    }
  }
  return res;
}

</script>