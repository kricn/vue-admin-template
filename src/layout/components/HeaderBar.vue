<template>
  <div class="the-layout-header">
    <div class="the-layout-navbar flex">
      <div :class="['fcc hamburger', { 'hamburger-active': layoutInfo.sidebarOpen }]" @click="onSwitch()">
        <svg-icon name="hamburger" />
      </div>
      <Breadcrumb class="f1" />
      <div class="user-info-box fvertical">
        <img class="avatar" :src="userInfo.avatar || defaultAvatar">
        <span class="the-tag blue mgr_10"><i class="el-icon-phone el-icon--left"></i>{{ userInfo.phone }}</span>
        <el-dropdown>
          <span class="the-tag green">
            <i class="el-icon-user el-icon--left"></i>
            {{ userInfo.username || userInfo.phone || "用户未设置昵称" }}
            <i class="el-icon-arrow-down el-icon--right" v-if="userInfo.roleList.length > 0"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in userInfo.roleList" :key="index" :divided="index > 0" disabled>{{ index + 1 }}. {{ item }}</el-dropdown-item>
              <template v-if="userInfo.roleList.length == 0">
                <el-dropdown-item disabled>当前用户暂无角色...</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <el-button type="primary" text>更多操作<i class="el-icon--right el-icon-arrow-down"></i></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="onLogout()">退出登录</el-dropdown-item>
              <el-dropdown-item @click.native="clearCache()">清除菜单缓存</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="the-layout-tags" v-if="layoutInfo.showTagsView">
      <el-scrollbar>
        <router-link
          v-for="(item, index) in layoutInfo.historyViews"
          :class="['the-layout-tag', {'the-layout-tag-on': isActive(item)}]"
          :key="index + item.path"
          :to="{ path: item.path, query: item.query, params: item.params }"
        >
          <span>{{ item.meta.title }}</span>
          <i class="close" @click.prevent.stop="onRemove(index)">-</i>
        </router-link>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "./Breadcrumb.vue";
import Global from "@/store";
import { HistoryViewsItem } from "@/types";

const route = useRoute();
const router = useRouter();
const layoutInfo = Global.layout.info;
const userInfo = Global.user.info;

function onSwitch() {
  layoutInfo.sidebarOpen = !layoutInfo.sidebarOpen;
}

const defaultAvatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";

function onLogout() {
  router.push('/login').then(() => {
    clearCache();
  });
}

function clearCache() {
  layoutInfo.historyViews = [];
  Global.permission.reset();
  // 现在不需要了，vue 3.x 之后路由增加了删除路由方法
  // removeRoutes();
  // TODO: 这里必选要刷新，因为需要请求接口
  location.reload();
}

function isActive(item: HistoryViewsItem) {
  return item.path === route.path && JSON.stringify(item.query) === JSON.stringify(route.query) && JSON.stringify(item.params) === JSON.stringify(route.params);
}

function onRemove(index: number) {
  layoutInfo.historyViews.splice(index, 1);
}

// layoutInfo.historyViews = [];
watch(() => route.path, function () {
  // console.log("route >>", route);
  const hasItem = layoutInfo.historyViews.some(item => isActive(item))
  if (!hasItem) {
    layoutInfo.historyViews.push({
      name: route.name as string,
      path: route.path,
      query: route.query,
      params: route.params,
      meta: route.meta as any
    })
  }
}, {
  immediate: true
})
</script>
<style lang="scss">

@mixin font {
  font-size: 15px;
  color: #555;
}
.user-info-box {
  @include font();
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    display: inline-block;
  }
  .logout {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 6px 10px 6px 4px;
    line-height: 1;
    @include font();
    transition: var(--transition);
    &:hover {
      color: var(--blue);
    }
    .svg-icon {
      margin-right: 4px;
    }
  }
}

</style>