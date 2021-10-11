<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="handleBack">返回</span>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Layout',
  setup() {
    const router = useRouter()
    const handleBack = () => {
      router.go(-1)
    }

    return {
      handleBack
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  .header {
    padding: 0 20px;
    border-bottom: 1px solid #aaa;
    .back {
      line-height: 40px;
      cursor: pointer;
    }
  }
  .main {
    padding: 0 20px;
  }
}
</style>