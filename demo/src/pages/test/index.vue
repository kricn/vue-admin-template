<template>
  <div class="test-container">
    <TestSearch v-model:value="keyword" @search="handleSearch" />
  </div>
</template>
<script setup lang="ts">
import TestSearch from '@/components/testComponent/TestSearch.vue'
import { ref } from '@vue/reactivity'

const keyword = ref('')
const handleSearch = (val:String):void => {
  console.log(val)
}
</script>
<style lang="scss" scoped>
.test-container {
  padding: 20px;
}
</style>