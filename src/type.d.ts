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
