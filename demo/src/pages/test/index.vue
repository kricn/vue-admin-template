<template>
  <div class="test">
    <TestSearch v-model:value="keyword" />
  </div>
</template>
<script setup lang="ts">
import TestSearch from '@/components/testComponent/TestSearch.vue'
import { ref } from '@vue/reactivity'
const keyword = ref('')
</script>