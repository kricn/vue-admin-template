/// <reference types="vite/client" />

// defineComponent函数的返回值类型本身是包含install属性的，这种做法更直观且更贴合组件本身的类型
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'element-plus'