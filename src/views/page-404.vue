<template>
  <div class="page-not-find">
    <div class="content-404">
      <img :src="banner" alt="">
      <div class="bottom">
        <div class="list-box">
          <p>当前访问的页面不存在！请检查访问的链接是否正确或存在，如有不清楚，请</p>
          <b>联系管理员</b>
        </div>
        <router-link class="btn" to="/">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "page-404",
  setup() {
    return {
      banner: 'https://doctor-filemanager.oss-cn-beijing.aliyuncs.com/common/404_88gaz1.png'
    }
  }
})
</script>
<style lang="scss">
.page-not-find,
.page-not-find .content-404 .list-box,
.page-not-find .content-404 .btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-not-find {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  border: 10px solid #f4f6fb;
  
  .content-404 {
    width: 1032px;
    img {
      display: block;
      width: 100%;
    }
    .bottom {
      width: 100%;
      transform: translateY(-40px);
    }
    .list-box {
      width: 710px;
      height: 60px;
      background-color: #f5f7f8;
      font-size: 15px;
      color: #333;
      letter-spacing: 1px;
      margin: 0 auto 20px;
      b {
        color: #256AFF;
      }
    }
    .btn {
      width: 160px;
      height: 50px;
      font-size: 16px;
      color: #fff;
      background-color: #256AFF;
      line-height: 1;
      margin: 0 auto;
      border-radius: 2px;
    }
  }
}
</style>