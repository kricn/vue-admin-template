<template>
  <div>
    返回
    <router-view />
  </div>
</template>
<script>
import { ref } from 'vue'
import routes from '@/router/menu'
export default {
  name: 'Layout',
  setup() {
  }
}
</script>
<style lang="scss" scoped>
a {
  padding: 10px 12px;
}
</style>