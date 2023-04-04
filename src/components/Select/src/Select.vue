<template>
  <div class="form-input">
    <el-select 
      v-model="value"
      :placeholder="props.placeholder"
    >
      <el-option 
        :key="item.value" 
        :value="item.value" 
        :label="item.label" 
        v-for="item in props.options"
      ></el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
export default {
  name: "FormSelect"
}
</script>
<script lang="ts" setup>
import { FormDesignInfo } from '@/types/Form';
import { computed } from '@vue/reactivity';
import { PropType, ref } from 'vue';

const props = defineProps({
  options: {
    type: Array as PropType<Array<FormDesignInfo.OptionItem>>,
    default: () => []
  },
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