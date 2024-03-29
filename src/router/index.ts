import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import { RouteItem } from "@/types";
import { initPermission } from "./permission";
import Page404 from "@/views/page-404.vue";
import config from "@/utils/config";

/**
 * 基础路由
 * @description
 * - `vue-router 4.x`之后路由路径匹配规则改了，不再是智能匹配，所以在定义路由的时候必须要在前面加上`/`
 * - 重定向`redirect`也要加'/'
 * - 子路由`children`里面的路由也是需要基于父级来定义，从下面代码观察一下就会发现规律了
 */
const base: Array<RouteItem> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: { hidden: true, title: "请登录" },
  },
  {
    path: "/404",
    name: "page-404",
    component: Page404,
    meta: { hidden: true, title: "不存在该页面" },
  },
  {
    path: "/401",
    name: "page-401",
    component: () => import("../views/page-401.vue"),
    meta: { hidden: true, title: "暂无权限访问" },
  },
];

/** 图标路由对象 */
const iconRoute = {
  path: "/icon",
  name: "icon",
  meta: { title: "图标栏目" },
  component: Layout,
  redirect: "/icon/svg-icons",
  children: [
    {
      path: "/icon/svg-icons",
      name: "svg-icons",
      component: () =>
        import(/* webpackChunkName: 'icons' */ "../views/svg-icons/index.vue"),
      meta: { title: "svg-图标", icon: "svg-icon" },
    },
  ],
};

/**
 * 动态路由
 */
const add: Array<RouteItem> = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: Layout,
    meta: { title: "首页", icon: "home" },
    children: [
      {
        path: "/home",
        meta: { title: "首页展示", icon: "guide" },
        component: () => import("../views/home.vue"),
      }
    ],
  },
];

/**
 * 过滤掉侧边导航栏不显示的路由
 * @param array 路由列表
 */
export function filterHidden(array: Array<RouteItem>) {
  array = JSON.parse(JSON.stringify(array));
  const result: Array<RouteItem> = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (!item.meta || (item.meta && !item.meta.hidden)) {
      result.push(item);
      if (item.children && item.children.length > 0) {
        item.children = filterHidden(item.children);
      }
    }
  }
  return result;
}

if (config.isDev) {
  add.push(iconRoute);
}

/**
 * 路由实例
 * [文档地址](https://next.router.vuejs.org/introduction.html)
 */
const router = createRouter({
  history: createWebHistory(),
  routes: base,
});

initPermission(router, base, add);

export default router;
