import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "./icons/index.vue";
import Router from "./router";
import ripple from "./utils/ripple";
import { copyText, isMobile } from "./utils";
import "./styles/index.scss"
import "./styles/layout.scss"

import "./styles/index.scss";

const app = createApp(App);

// 添加一个自定义指令`v-copy`点击复制内容
app.directive("copy", {
  mounted(el: HTMLElement, binding) {
    el.addEventListener("click", function () {
      copyText(
        binding.value,
        () => alert("复制成功"),
        (tip) => alert(tip)
      );
    });
  },
});

app.directive("ripple", {
  mounted(el: HTMLElement) {
    /** 添加事件类型 */
    const eventType = isMobile() ? "touchstart" : "mousedown";
    el.setAttribute("ripple", "");
    el.addEventListener(eventType, function (e) {
      ripple(e, el);
    });
  },
});

// 注册全局组件: `svg-icon`
app.component("svg-icon", SvgIcon);

app.use(Router).mount("#app");
