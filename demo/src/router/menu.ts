import { RouteRecordRaw } from 'vue-router'
const menu: RouteRecordRaw[] = [
  {
    path: 'file-upload',
    name: "FileUpload",
    meta: {
      title: '大文件上传'
    },
    component: () => import('@/pages/FileUpload/index.vue')
  }
]

export default menu