//shims-vue.d.ts
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '*'

interface Window {
  /**
   * 当前版本，方便在控制台查看调试用
   * @description 引用的是`package.json`中的`version`
  */
  version: string
}