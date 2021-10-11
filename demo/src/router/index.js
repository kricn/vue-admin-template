import {
  createRouter,
  createWebHistory
} from 'vue-router'
import menu from './menu'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    meta: {
      noShow: true
    },
    component: () => import('@/layout'),
    children: menu
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages')
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