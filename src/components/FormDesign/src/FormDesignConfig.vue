<template>
  <div class="form-design-config">
    <el-scrollbar>
      <div class="config-content">
        <div v-if="!selectedFormItem?.name">请先选择需要配置的组件</div>
        <component :is="selectedFormItem.name + 'Config'" v-else :key="selectedFormItem.itemId" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import FormInfo from '@/store/FormInfo';

const selectedFormItem = FormInfo.selectedFormItem
</script>
<style lang="scss" scoped>
.config-content {
  padding: 20px 10px;
}
</style>