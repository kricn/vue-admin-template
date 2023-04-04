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
import { watch } from 'vue';
import FormInfo from '@/store/FormInfo';

const props = defineProps({
  model: {
    type: Object,
    default: () => ({})
  }
})

watch(() => props.model, (val) => {
  FormInfo.formData = Object.assign(FormInfo.formData, val)
}, { deep: true })

</script>
<style lang="scss" scoped>
.form-design {
  display: flex;
  width: 100%;
  .form-design-aside {
    width: 20%;
  }
  .form-design-content {
    flex: 1;
  }
  .form-design-config {
    width: 20%;
  }
}
</style>