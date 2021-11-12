<template>
  <div class="test-search">
    <a-input v-model="inputValue" />
    <a-button type="primary" @click="search">搜索</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:value': (val: String):String => {
      return val
    }
  },
  setup (props, context) {
    const inputValue = ref('')
    watch(props, (newVal) => {
      inputValue.value = newVal.value
    })
    watch(inputValue, newVal => {
      context.emit('update:value', newVal)
    })
    const search = () => {

    }
    return {
      inputValue,
      search
    }
  }
})
</script>
<style lang="scss" scoped>
.test-search {
  display: flex;
}
</style>