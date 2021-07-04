import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/file-upload',
    component: () => import('@/pages/FileUpload')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;