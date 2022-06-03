<template>
  <el-container class="container">
    <el-aside class="flex">
      <div class="logo">
        <div class="inner"></div>
      </div>
      <Menu />
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
<script setup lang="ts">
import Menu from './Menu.vue'
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
  .el-aside {
    height: 100vh;
    flex-direction: column;
  }
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