import { RouteRecordRaw } from 'vue-router'
const menu: RouteRecordRaw[] = [
  {
    path: '/file-upload',
    name: "FileUpload",
    meta: {
      title: '大文件上传'
    },
    component: () => import('@/pages/FileUpload/index.vue')
  },
  {
    path: '/test',
    meta: {
      title: '级联菜单'
    },
    redirect: '/test/test1',
    component: () => import("@/pages/index.vue"),
    children: [
      {
        path: '/test/test1',
        meta: {
          title: '子菜单1'
        },
        component: () => import("@/pages/index.vue")
      },
      {
        path: '/test/test2',
        meta: {
          title: '子菜单2'
        },
        component: () => import("@/pages/index.vue"),
        children: [
          {
            path: '/test/test2/test21',
            meta: {
              title: '子菜单21'
            },
            component: () => import("@/pages/index.vue")
          },
          {
            path: '/test/test2/test22',
            meta: {
              title: '子菜单22'
            },
            component: () => import("@/pages/index.vue")
          },
        ]
      },
    ]
  }
]

export default menu