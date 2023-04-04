<template>
  <div class="form-design-aside">
    <ul class="list flex">
      <li class="item" v-for="(item, key) in components" :key="key" @click="onSelect(key)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

import components from '@/build/components.json'
import FormInfo from '@/store/FormInfo'
import { FormDesignInfo } from '@/types/Form';
import { useFormInfo } from './hooks'
function onSelect(name: FormDesignInfo.ComponentsKey) {
  FormInfo.formItems.value.push(useFormInfo(name))
}

</script>
<style lang="scss" scoped>
.form-design-aside {
  .list {
    .item {
      width: 100px;
      border: 1px solid #dedecd;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
    }
  }
}

</style>