import { createApp } from "vue";
import App from "./App.vue";

import "element-plus/dist/index.css";
import ElementUi from "element-plus";

import router from "./router";

import SvgIcon from "./icons/index.vue";

// 全局样式 
import "./styles/index.scss";

// 工具方法
import ripple from './utils/ripple';

const app = createApp(App);

// 全局组件
app.component("svg-icon", SvgIcon);

// 全局指令
app.directive("ripple", {
  mounted(el: HTMLElement) {
    /** 添加事件类型 */
    el.setAttribute("ripple", "");
    el.addEventListener('click', function (e) {
      ripple(e, el);
    });
  },
});
app.use(router).use(ElementUi).mount("#app");
