<template>
  <div class="the-layout-sidebar">
    <el-scrollbar>
      <transition name="fade">
        <div class="the-logo-box" v-if="layoutInfo.showSidebarLogo">
          <router-link class="the-logo-link fvertical" to="/">
            <img class="the-logo" :src="info.logo" />
            <h1 class="the-logo-title ellipsis" :title="info.title">{{ info.title }}</h1>
          </router-link>
        </div>
      </transition>
      <Menu :mergeOnlyOneChild="false" :onlyMergeFirst="false" />
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import Menu from "./Menu.vue";
import Global from "@/store";

const layoutInfo = Global.layout.info;

const info = Global.projectInfo;

</script>