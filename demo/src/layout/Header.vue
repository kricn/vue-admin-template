<template>
  <div class="header fvertical">
    <div class="trigger" @click="handleTrigger">
      <el-icon>
        <Expand v-if="trigger" />
        <Fold v-else />
      </el-icon>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { defineEmits } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'

defineProps({
  trigger: {
    type: Boolean,
    default: false,
  }
})

const triggerEmit = defineEmits(['menuTrigger'])

const handleTrigger = () => {
  triggerEmit('menuTrigger')
}

</script>
  
<style lang="scss" scoped>
.header {
  height: 100%;
  .el-icon {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>