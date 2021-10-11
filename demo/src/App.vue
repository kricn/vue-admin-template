<template >
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
