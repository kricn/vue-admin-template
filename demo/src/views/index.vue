<template>
  <div class="container">
    <div class="flex">
      <template v-for="item in renderRouteLists" :key="item.path">
        <div class="card-wrapper">
          <router-link :to="{path: item.path}" class="card">{{item.meta.title}}</router-link>
        </div>
      </template>
      <el-button type="primary">按钮</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import routes from '@/router/menu'
export default {
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
    return {
      renderRouteLists
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 20px;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  .card-wrapper {
    width: 25%;
    padding: 12px;
    .card {
      display: block;
      background-color: #fff;
      text-align: center;
      padding: 30px 0;
      border-radius: 4px;
      box-shadow: 0px 2px 5px #aaa;
      transition: all .3s ease;
      &:hover {
        box-shadow: 0px 5px 5px #999;
      }
    }
  }
}

</style>