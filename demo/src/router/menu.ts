const menu = [
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