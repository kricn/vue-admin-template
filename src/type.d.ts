// 类型引用
/// <reference path="./components/type.d.ts" />

/** 深层递归所有属性为可选 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

/** 深层递归所有属性为只读 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
}

/** 运算符号 */
type NumberSymbols = "+" | "-" | "*" | "/";

/**
 * `JavaScript`类型
 */
type JavaScriptTypes = "string" | "number" | "array" | "object" | "boolean" | "function" | "null" | "undefined" | "regexp" | "promise" | "formdata";

/** 基础对象 */
interface BaseObj<T = string | number> {
  [key: string]: T
}

/** 接口请求基础响应数据 */
interface ApiResult<T = any> {
  /** 接口状态`code === 1`为成功 */
  code: number
  /** 接口响应数据 */
  data: T
  /** 接口响应信息 */
  msg: string
}

/** 接口请求列表响应数据 */
interface ApiResultList<T = any> extends PageInfo {
  /** 列表数据 */
  list: Array<T>
  /** 也是列表数据，通常旧版本接口会返回这个字段 */
  records: Array<T>
}

/** 页码信息 */
interface PageInfo {
  /** 一页多少条 */
  pageSize: number
  /** 当前页，从`1`开始 */
  currentPage: number
  /** 总数 */
  total?: number
}

interface Window {
  /**
   * 当前版本，方便在控制台查看调试用
   * @description 引用的是`package.json`中的`version`
  */
  version: string
  
  createObjectURL: Function
}

/** 
 * 后端接口路由信息
 * - 接口原始数据
 */
interface ApiMenuItem {
  /** 访问路径 */
  path: string
  /** 菜单图标，一级菜单用到 */
  icon?: string
  /** 组件路径 */
  component: string | 'Layout'
  /** 组件名，路由缓存用 */
  componentName?: string
  /** 菜单名称 */
  name: string
  /** 菜单`id` */
  id?: string
  /** 上级`id` */
  parentId?: string
  /** 是否在菜单栏中隐藏 */
  hidden: boolean
  /** 
   * 菜单类型
   * - 0 菜单 1 按钮 2 全局api  3 数据 4 其他
   */
  resourceType: number
  /** 菜单类型（1.业务平台，2.第三方平台） */
  menuType: 1 | 2
  /** 排序标识 */
  sort: number
  /** 
   * 路由缓存
   * - 0不缓存，1缓存
   */
  keepAlive: number
  /** 权限标识 */
  permission?: string
  /** 下级菜单信息 */
  children?: Array<ApiMenuItem>
}

/** 缓存`sessionStorage`中动态菜单信息 */
interface CacheMenuInfo {
  /** 后端权限菜单列表 */
  menus: Array<ApiMenuItem>
  /** 权限列表 */
  permissions: Array<string>
  /** 当前用户的`token`，获取缓存的时候需要用到该值来做对比；如果`cookie`中的值和`sessionStorage`中的值不一致，则清除上一次的缓存信息 */
  token: string
}
