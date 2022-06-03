<template>
  <el-menu
    :collapse="isCollapse"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#fff"
  >
    <MenuItem v-for="item in menus" :info="item" />
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuItem from './MenuItem.vue';
import menus from '@/router/menu'
export default defineComponent({
  name: "Menu",
  components: { MenuItem },

  setup() {
    // 菜单收起展开
    const isCollapse = ref<boolean>(false)
    const trigger = () => {
      isCollapse.value = !isCollapse.value
    }

    return {
      isCollapse,
      trigger,
      menus
    }
  }
})


  
</script>
<style lang="scss" scoped>
.el-menu {
  flex: 1;
  border-right-width: 0;
  .el-menu-item {
    &.is-active {
      background: #1890ff;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>