import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import menu from './menu'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    // redirect: '/home',
    meta: {
      noShow: true
    },
    component: () => import('@/layout/index.vue'),
    children: menu
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/pages/test/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {
  routes
}

export default router;