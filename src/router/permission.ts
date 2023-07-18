import { Router } from 'vue-router';
import Global from '../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RouteItem } from '@/types';
import { getToken } from '@/utils/authorization';

// NProgress.configure({ showSpinner: false });

/** 路由初始化时信息对象 */
const routerTo = {
  path: '/',
  query: {}
}

/**
 * 重定向到`/404`的路由名
 */
const redirectRouteName = 'redirect404';

/**
 * 路由实例
 * @description 
 * 这里不使用 `import router from './index.ts'`的原因是因为如果该文件在
 * `src/layout/components/Navbar.vue`文件中导入某个方法的时候，会导致循环引用而产生的`router = undefined`;
 * 原因是文件引用的先后顺序问题，如果有比当前文件过早引用的情况下就会出现这类情况，为了兼容所以使用这种动态变量设置方式
 */
let router: Router;

const vueFiles = import.meta.glob<typeof import('*.vue')>('../views/**/*.vue');

/**
 * 获取动态目录文件
 * @param path 
 */
function getViewComponent(path: string) {
  return vueFiles[`../views${path}.vue`];
}


/**
 * 初始化权限管理
 * @param vueRouter 路由实例
 * @param baseRoutes 基础路由
 * @param addRoutes 动态路由
 */
export function initPermission(vueRouter: Router, baseRoutes: Array<RouteItem>, addRoutes: Array<RouteItem>) {
  // 设置路由实例
  router = vueRouter;

  /** 初始化基础路由 */
  for (let i = 0; i < baseRoutes.length; i++) {
    const item = baseRoutes[i];
    router.addRoute(item);
  }

  router.beforeEach(function (to, from, next) {
    NProgress.start();

    const token = getToken();
    if (token) {
      // 判断是否有缓存有用户信息
      if (!Global.user.info.id && Global.user.info.token !== token) {
        Global.user.loading.value = true
        new Promise<void>(() => {
          setTimeout(() => {
            Global.user.update({
              id: Date.now() + Math.random().toString(36).substring(2),
              phone: '13800000000',
              avatar: '',
              sex: 1,
              username: 'kricn',
              token: '',
              roleList: ['超级管理员'],
            })
            Global.user.loading.value = false
            next()
          }, 1500);
        })
      }
      if (Global.layout.privateRouters.length > 0) {
        next();
      } else {
        Global.layout.privateRouters = addRoutes
        // 逐个添加进去
        for (let i = 0; i < Global.layout.privateRouters.length; i++) {
          const item = Global.layout.privateRouters[i];
          router.addRoute(item);
        }
        if (!router.hasRoute(redirectRouteName)) {
          router.addRoute({ ...baseRoutes[1], path: "/:catchAll(.*)", name: redirectRouteName });
        }

        Global.layout.routers = baseRoutes.concat(Global.layout.privateRouters);

        next({ ...to, replace: true });
      }
    } else {
      if (to.path === '/login') {
        next();
      } else {
        routerTo.path = to.path;
        routerTo.query = to.query;
        next({ path: '/login' });
        NProgress.done();
        removeRoutes();
      }
    }

  });

  // 获取首个路由并跳转
  router.beforeResolve((to, from ,next) => {
    if (to.path === '/') {
      next({ path: Global.layout.privateRouters[0].path });
    }
    const matched = Global.layout.routers.find(item => item.path == to.path)
    if (matched && matched.children) {
      next({ path: matched.children[0].path });
    } else {
      next(); 
    }
    NProgress.done();
  });

  router.afterEach(to => {
    NProgress.done();
    // 根据路由名动态设置文档的标题
    if (to.meta && to.meta.title) {
      document.title = to.meta.title as string;
    }
  })
}

/**
 * 跳转路由初始化页面 
 * - 登录成功之后用
*/
export function openNextPage() {
  router.replace({
    path: routerTo.path,
    query: routerTo.query
  })
}

/** 
 * 移除已添加的路由列表
 * - 退出登录时用
*/
export function removeRoutes() {
  const list = Global.layout.privateRouters;
  for (let i = list.length - 1; i > -1; i--) {
    const item = list[i];
    if (item.name && router.hasRoute(item.name)) {
      router.removeRoute(item.name);
    }
  }
  routerTo.path = "/";
  routerTo.query = {};
  // 和上面对应的 404
  router.removeRoute(redirectRouteName);
  // 清空路由缓存对象
  Global.layout.privateRouters = Global.layout.routers = [];
}
