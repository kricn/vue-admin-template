import {
  createRouter,
  createWebHistory
} from 'vue-router'
import menu from './menu'

const routes = [
  {
    path: '/',
    name: 'Layout',
    meta: {
      noShow: true
    },
    component: () => import('@/layout'),
    children: menu
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {
  routes
}

export default router;