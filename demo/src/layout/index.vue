<template>
  <div>
    <template v-for="item in renderRouteLists" :key="item.path">
      <router-link :to="{path: item.path}">{{item.meta.title}}</router-link>
    </template>
    <router-view />
  </div>
</template>
<script>
import { ref } from 'vue'
import routes from '@/router/menu'
export default {
  name: 'Layout',
  setup() {
    let renderRouteLists = ref([])
    const filterRoute = (routes) => {
      return routes.filter(item => {
        if (item.children && item.children.length > 0) {
          item.children = filterRoute(item.children)
        }
        return !item.meta || (item.meta && !item.meta.noShow)
      })
    }
    renderRouteLists = filterRoute(routes)
    console.log(renderRouteLists)
    return {
      renderRouteLists
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  padding: 10px 12px;
}
</style>