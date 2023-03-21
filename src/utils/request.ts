import axios, { ResponseType } from 'axios';
import config from './config';
import { getQueryParam, jsonToFormData } from './index';
import { getToken, removeToken } from './authorization';

const service = axios.create({
  baseURL: '',
  timeout: config.requestOvertime
})

const postMode = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 请求拦截处理
service.interceptors.request.use(async options => {
  // 判断一下是`json`或者是表单传参
  // 因为当前`java`后台用的框架是比较老的`spring boot`，有很多接口传参都是以前`jsp`搬过来用的，所以才会有表单`post`这种操作
  if (options.method!.toUpperCase() === 'POST') {
    const key = options.headers!['codeMode'] as 'json' | 'form';
    if (key && postMode[key]) {
      options.headers!['Content-Type'] = postMode[key];
    }
  }

  // 没有在接口设置到`token`时，添加`token`
  if (!options.headers!['Authorization']) {
    options.headers!['Authorization'] = 'Bearer ' + getToken();
  }
  return options;
}, error => {
  return Promise.reject(error)
})

/** 是否执行了401没有权限操作 */
let implement401 = false; 

/** 是否执行了跳转登录操作 */
let implementLogin = false;

interface ResponseInfo {
  msg?: string,
  code: number
}

/**
 * 响应提示
 * @param status 状态码
 * @param info 
 * @param showTip 
 */
function responseTip(status: number, info: ResponseInfo, showTip?: string | boolean) {
  switch (status) {
    case 200:
      break;
  }
}

// 响应拦截器异常处理
service.interceptors.response.use(res => {
  // console.log('response >>', res);
  let result = res.data;
  // 特殊处理一下数据流
  if (['arraybuffer', 'blob'].includes(res.config.responseType!)) {
    result = {
      code: 1,
      data: res.data
    }
  }
  responseTip(res.status, result, (<any>res.config).showTip);
  return result;
}, error => {
  // 这样其他地方调用时，就一定会有返回值，就不用写多一个`catch`来捕获失败状态了
  return {
    code: -1,
    msg: `${error}`,
    data: {}
  }
})

interface RequestOptions {
  /**
   * 请求头配置，会覆盖默认设置
   * - 默认`headers: { "codeMode": "json" }`;
   * - 需要表单形式就`headers: { "codeMode": "form" }`;
   * - 两者都不要就`headers: { "codeMode": "" }`;
   * - 其他头部设置自行定义
   */
   headers: {
    /**
     * 默认传参类型
     * | 值 | 说明 |
     * |---|---|
     * | json | json格式数据 |
     * | form | 表单格式 |
     * | 空字符串 | 上传文件需要用到 |
     */
    codeMode?: 'json' | 'form' | ''
  } & BaseObj<string>
  /**
   * 请求数据类型
   */
  dataType: 'json' | 'text' | ''
  /** 接口数据响应类型 */
  responseType: ResponseType
  /** 是否在`res.code !== 1`的时候显示提示，默认`false`，传入`true`则用`res.msg`作为提示，也可以传入字符串作为提示内容 */
  showTip: boolean | string
  /** 单独设置超时时间，毫秒 */
  timeout: number
}

/**
 * 基础请求
 * @param method 请求方法
 * @param path 请求路径
 * @param data 请求数据
 * @param options `axios`请求配置，优先级最高
 */
export default function request<T = any>(method: 'GET' | 'POST' | 'DELETE' | 'PUT', path: string, data?: any, options: Partial<RequestOptions> = {}) {
  // 默认设置`json`传参
  const header = (!options || !options.headers) ? {
    'codeMode': 'json',
  } : {};
  return service({
    method: method,
    url: path,
    params: method === 'GET' ? data : {},
    data: method !== 'GET' ? data : {},
    // dataType: 'json', 默认就是，可写可不写，根据情况定
    headers: header,
    ...options,
    timeout: options.timeout
  }) as unknown as Promise<ApiResult<T>>
}
