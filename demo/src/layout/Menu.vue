<template>
  <el-menu
    :collapse="trigger"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#fff"
  >
    
      <div class="logo">
        <div class="inner"></div>
      </div>
    <MenuItem v-for="item in menus" :info="item" />
  </el-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MenuItem from './MenuItem.vue';
import menus from '@/router/menu'
export default defineComponent({
  name: "Menu",
  components: { MenuItem },
  props: {
    trigger: {
      type: Boolean,
      default: false,
    }
  },
  setup() {

    return {
      menus
    }
  }
})


  
</script>
<style lang="scss" scoped>

/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
</style>