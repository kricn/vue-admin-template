import { App } from 'vue'
import Input from './Input/index'
import Select from './Select/index'
import InputConfig from './Input/src/inputConfig.vue'
import SelectConfig from './Select/src/selectConfig.vue'
const components = [
  Input,
  InputConfig,
  Select,
  SelectConfig
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (app: App) {
  // 遍历注册全局组件
  components.map(component => app.component(component.name, component))
}

// 判断是否是直接引入文件
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

export default {
  install
}