<template>
  <el-menu
    :collapse="isCollapse"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#fff"
  >
    <template v-for="item in menus" :key="item.path">
      <el-menu-item v-if="!hasChildren(item)" :index="item.path">
        {{item?.meta?.title}}
      </el-menu-item>
      <el-sub-menu :index="item.path" v-if="hasChildren(item)">
      <template #title><span>{{item?.meta?.title}}</span></template>
        <template v-for="i in item.children" :key="i.path">
          <el-menu-item :index="i.path">{{i?.meta?.title}}</el-menu-item>
        </template>
      </el-sub-menu>
      <!-- <template v-if="hasChildren(item)">
        <Siderbar :menus="item.children" />
      </template> -->
    </template>
    
  </el-menu>
</template>
<script setup lang="ts">
import { computed, ref, defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

import routers from '@/router/menu'

defineProps({
  menus: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: routers
  }
})

// 菜单收起展开
const isCollapse = ref<boolean>(false)
const trigger = () => {
  isCollapse.value = !isCollapse.value
}

// 判断有没有子菜单 && 子菜单是否为一个
const hasChildren = computed(() => {
  return (item: RouteRecordRaw) => {
    return item?.children && item.children.length > 1
  }
})
  
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
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