<template>
  <div>
    <div class="mgb_30">
      <h2 class="the-title mgr_20">Svg Icons</h2>
      <span class="the-tag blue">点击复制代码</span>
    </div>
    <IconList />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconList from './components/IconList.vue';

export default defineComponent({
  name: 'svg-icons',
  components: {
    IconList
  }
})
</script>
<style lang="scss">

</style>