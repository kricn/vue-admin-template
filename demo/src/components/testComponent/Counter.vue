<template>
  <div class="count">
    <div>{{ count }}</div>
    <button @click="add">+</button>
  </div>
</template>
<script>
export default {
  name: 'Counter',
  components:{},
  data() {
    return {
      count: 0
    }
  },
  mounted() {
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    add() {
      this.count ++
    }

    // ==================================== 二、数据请求类 ================================

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
.count {
  
}
</style>