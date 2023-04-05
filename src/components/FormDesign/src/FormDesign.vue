<template>
  <div class="form-design">
    <FormDesignAside />
    <FormDesignContent />
    <FormDesignConfig />
  </div>
</template>
<script setup lang="ts">
import FormDesignAside from './FormDesignAside.vue';
import FormDesignContent from './FormDesignContent.vue';
import FormDesignConfig from './FormDesignConfig.vue';

</script>
<style lang="scss" scoped>
.form-design {
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  .form-design-aside {
    width: 20%;
    
  }
  .form-design-content {
    flex: 1;
    border-right: 1px solid #f0f0f0;
    border-left: 1px solid #f0f0f0;
    
  }
  .form-design-config {
    width: 20%;
    
  }
}
</style>