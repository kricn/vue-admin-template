<template>
  <el-container class="container">
    <el-aside>
      <div class="logo">
        <div class="inner"></div>
      </div>
      <SiderBar />
    </el-aside>
    <el-container>
      <el-header>
        header
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
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
.el-container {
  height: 100vh;
  .logo {
    width: 100%;
    height: 80px;
    background-color: #001529;
    padding: 15px 50px;
    cursor: pointer;
    .inner {
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.3;
    }
  }
}
</style>