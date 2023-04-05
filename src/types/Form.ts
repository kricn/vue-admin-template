import components from '@/build/components.json'

export namespace FormDesignInfo {

  /** 所有组件的 key */
  export type ComponentsKey = keyof typeof components

  export interface FormItem {
    /** 类型，组件名称 */
    name: string
    /** 组件 key，唯一字段，不可有两个同名字段 */
    key: string
    /** 记录组件值 */
    value: any
    /** 组件id */
    itemId: string
    /** 配置项 */
    widget: Widget
  }

  interface BaseWidget {
    /** 表单项标题 */
    label: string,
    /** 组件校验规则 */
    rules?: Array<RuleItem>
    /** 组件状态 */
    status: 'normal' | 'disabled' | 'readonly' | 'hidden'
    /** 占位符 */
    placeholder?: string
  }

  /** 输入框配置 */
  export interface InputWidget extends BaseWidget {
    
  }

  /** 下拉框配置 */
  export interface SelectWidget<T=string> extends BaseWidget {
    options: Array<OptionItem<T>>
  }

  export type Widget = InputWidget
    | SelectWidget
    
  
  interface RuleItem {
    /** 出发时机，默认 blur */
    trigger?: 'blur' | 'change'
    /** 提示信息，默认不提示 */
    message?: string
    /** 是否为必填 */
    required?: boolean
    /** 自定义校验函数 */
    validator?: Function
  }

  export interface OptionItem<T=string> {
    label: string
    value: T
    [key: string]: any
  }

}