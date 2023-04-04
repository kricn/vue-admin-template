<template>
  <div class="form-input">
    <el-input 
      v-model="value" 
      :placeholder="props.placeholder"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: "FormInput"
}
</script>
<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const emits = defineEmits<{
  (event: 'update:value', val: string): void
}>()

const value = computed({
  get: () => {
    return props.value
  },
  set: (val) => {
    emits('update:value', val)
  }
})

</script>