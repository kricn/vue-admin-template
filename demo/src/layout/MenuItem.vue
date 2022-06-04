<template>
  <el-menu-item v-if="!info.children" :index="info.path" @click="toPage(info)">{{info?.meta?.title}}</el-menu-item>
  <template v-if="info.children && info.children.length > 1">
    <el-sub-menu :index="info.path">
      <template #title><span>{{info?.meta?.title}}</span></template>
      <template v-for="item in info.children" :key="item.path">
        <MenuItem v-if="hasChildren(item)" :info="item" />
        <el-menu-item :index="item.path" v-else @click="toPage(item)">{{item?.meta?.title}}</el-menu-item>
      </template>
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'

export default defineComponent({
  name: "MenuItem",
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  setup() {

    const router = useRouter()

    // 判断有没有子菜单 && 子菜单是否为一个
    const hasChildren = computed(() => {
      return (item: RouteRecordRaw) => {
        return item?.children && item.children.length > 1
      }
    })

    const toPage = (item:any) => {
      item.path && router.push(item.path)
    }

    return {
      hasChildren,
      toPage
    }
  }

  
})

  
</script>
<style lang="scss" scoped>
</style>