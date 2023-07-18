<template>
  <router-view v-if="!loading" />
  <LayoutLoading v-else />
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import Global from './store';

export default defineComponent({
  name: "App",
})
</script>
<script lang="ts" setup>
import LayoutLoading from '@/layout/components/Loading.vue'
const loading = computed(() => Global.user.loading.value)
</script>
<style lang="scss">
@import "@/styles/index.scss";
@import "@/styles/layout.scss";
</style>
