<template>
  <div class="container">
    <SiderBar />
    <router-view />
  </div>
</template>
<script lang="ts">
import SiderBar from './Siderbar.vue'
export default {
  name: 'Layout',
  components: { SiderBar },
  setup() {
  },
}
</script>
<style lang="scss" scoped>
</style>