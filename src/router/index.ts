import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { RouteItem } from '@/types';
import { initPermission } from './permission';
import Page404 from '@/views/page-404.vue';
import config from '@/utils/config';

/**
 * 基础路由
 * @description 
 * - `vue-router 4.x`之后路由路径匹配规则改了，不再是智能匹配，所以在定义路由的时候必须要在前面加上`/`
 * - 重定向`redirect`也要加'/'
 * - 子路由`children`里面的路由也是需要基于父级来定义，从下面代码观察一下就会发现规律了
 */
const base: Array<RouteItem> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: { hidden: true, title: '请登录' },
  }, {
    path: '/404',
    name: 'page-404',
    component: Page404,
    meta: { hidden: true, title: '不存在该页面' },
  }, {
    path: '/401',
    name: 'page-401',
    component: () => import('../views/page-401.vue'),
    meta: { hidden: true, title: '暂无权限访问' },
  }
];

/** 图标路由对象 */
const iconRoute = {
  path: '/icon',
  name: 'icon',
  meta: { title: '图标栏目' },
  component: Layout,
  redirect: '/icon/svg-icons',
  children: [
    {
      path: '/icon/svg-icons',
      name: 'svg-icons',
      component: () => import(/* webpackChunkName: 'icons' */ '../views/svg-icons/index.vue'),
      meta: { title: 'svg-图标', icon: 'svg-icon' }
    }
  ]
}

/**
 * 动态路由
 */
const add: Array<RouteItem> = [
  // {
  //   path: '/',
  //   name: 'index',
  //   redirect: '/home',
  //   component: Layout,
  //   meta: { title: '首页', icon: 'home' },
  //   children: [
  //     {
  //       path: '/home',
  //       meta: { title: '首页展示', icon: 'guide' },
  //       component: () => import('../views/example/home.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/contract',
  //   component: Layout,
  //   name: 'Contract',
  //   meta: {
  //     title: '合同管理',
  //     icon: 'contract'
  //   },
  //   redirect: '/contract/archives',
  //   children: [
  //     {
  //       path: '/contract/archives',
  //       name: 'Archives',
  //       component: () => import('../views/contract/archives.vue'),
  //       meta: { title: '合同档案' }
  //     },
  //     {
  //       path: '/contract/audit',
  //       name: 'Audit',
  //       component: () => import('../views/contract/audit.vue'),
  //       meta: { title: '合同审核' }
  //     },
  //     {
  //       path: '/contract/counterparty',
  //       name: 'Counterparty',
  //       component: () => import('../views/contract/counterparty.vue'),
  //       meta: { title: '合同相对方' }
  //     },
  //     {
  //       path: '/contract/contractType',
  //       name: 'ContractType',
  //       component: () => import('../views/contract/contractType.vue'),
  //       meta: { title: '合同类型（类型业务线）' }
  //     },
  //     {
  //       path: '/contract/counterpartyType',
  //       name: 'CounterpartyType',
  //       component: () => import('../views/contract/counterpartyType.vue'),
  //       meta: { title: '合同相对类型' }
  //     },
  //     {
  //       path: '/contract/template',
  //       name: 'Template',
  //       component: () => import('../views/contract/template.vue'),
  //       meta: { title: '合同模板' }
  //     },
  //   ]
  // },
  // {
  //   path: '/finance',
  //   component: Layout,
  //   name: 'Finance',
  //   meta: {
  //     title: '财务管理',
  //     icon: 'finance'
  //   },
  //   redirect: '/finance/collection',
  //   children: [
  //     {
  //       path: '/finance/collection',
  //       name: 'FinanceCollection',
  //       component: () => import('../views/finance/collection.vue'),
  //       meta: { title: '合同收款计划' }
  //     },
  //     {
  //       path: '/finance/payment',
  //       name: 'FinancePayment',
  //       component: () => import('../views/finance/payment.vue'),
  //       meta: { title: '合同付款计划' }
  //     },
  //     {
  //       path: '/finance/invoice',
  //       name: 'FinanceInvoice',
  //       component: () => import('../views/finance/invoice.vue'),
  //       meta: { title: '合同开票记录' }
  //     },
  //   ]
  // },
  // {
  //   path: '/auth',
  //   component: Layout,
  //   name: 'Auth',
  //   meta: { title: '权限管理', icon: 'menu' },
  //   redirect: '/auth/menu',
  //   children: [
  //     {
  //       path: '/auth/menu',
  //       name: 'AuthMenu',
  //       component: () => import('../views/auth/menu.vue'),
  //       meta: { title: '菜单管理' }
  //     },
  //     {
  //       path: '/auth/user',
  //       name: 'AuthUser',
  //       component: () => import('../views/auth/user.vue'),
  //       meta: { title: '用户管理' }
  //     },
  //     {
  //       path: '/auth/role',
  //       name: 'AuthRole',
  //       component: () => import('../views/auth/role.vue'),
  //       meta: { title: '角色管理' }
  //     },
  //     {
  //       path: '/auth/employee',
  //       name: 'AuthEmployee',
  //       component: () => import('../views/auth/employee.vue'),
  //       meta: { title: '员工管理' }
  //     },
  //   ]
  // },
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
  history: createWebHashHistory(),
  routes: base
})

initPermission(router, base, add);

export default router;