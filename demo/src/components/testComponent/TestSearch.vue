<template>
  <div class="test-search">
    <div class="input-wrapper">
      <input class="search-input" v-model:value="inputValue" />
      <button type="primary" @click="search">搜索</button>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  emits: {
    'update:value': (val: String):String => {
      return val
    },
    'search': (val: String):String => {
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
    const search = ():void => {
      context.emit('search', inputValue.value)
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
  padding: 10px;
  .input-wrapper {
    display: flex;
    .search-input {
      width: 60%; 
      margin-right: 12px;
    }
  }
}
</style>