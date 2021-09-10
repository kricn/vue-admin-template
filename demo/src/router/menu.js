const menu = [
  {
    path: 'home',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('@/pages/Home')
  },
  {
    path: 'file-upload',
    name: "FileUpload",
    meta: {
      title: '大文件上传'
    },
    component: () => import('@/pages/FileUpload')
  }
]

export default menu