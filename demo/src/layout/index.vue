<template>
  <el-container class="container">
    <el-aside class="flex" :width="isCollapse ? '0px' : '300px'">
      <div class="logo">
        <div class="inner"></div>
      </div>
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header @menuTrigger="toggleCollapse" :trigger="isCollapse" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Menu from './Menu.vue'
import Header from './Header.vue'

// 菜单收起展开
const isCollapse = ref<boolean>(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
  ::v-deep .el-aside {
    height: 100vh;
    flex-direction: column;
    position: relative;
    transition: all 0.3s;
    overflow-x: hidden;
    .trigger {
      position: absolute;
      top: 10px;
      right: -20px;
    }
    >.el-menu {
      flex: 1;
      border-right-width: 0;
      .el-menu-item {
        &.is-active {
          background: #1890ff;
        }
      }
      .el-sub-menu {
        .el-sub-menu__title {
          background-color: #001529 !important;
        }
        .el-menu {
          background-color: #000 !important;
          .el-sub-menu__title {
            background-color: #000 !important;
          }
        }
      }
    }
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
  .el-header {
    background-color: #fff;
    box-shadow: 0 1px 3px #eee;
  }
}
</style>