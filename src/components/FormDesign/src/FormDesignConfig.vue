<template>
  <div class="form-design-config">
    <div v-if="!selectedFormItem?.name">请先选择需要配置的组件</div>
    <component :is="selectedFormItem.name + 'Config'" v-else v-bind="selectedFormItem.widget" />
  </div>
</template>
<script lang="ts" setup>
import FormInfo from '@/store/FormInfo';

const selectedFormItem = FormInfo.selectedFormItem
</script>