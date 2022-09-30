import axios, { AxiosResponse } from 'axios'
import { ResponseBody } from '@/types'

const HTTP = axios.create({
  baseURL: '/api',
  timeout: 30 * 1000
})

//拦截器
//请求拦截
HTTP.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error)
});

//相应拦截
HTTP.interceptors.response.use((response: AxiosResponse<ResponseBody>) => {
	const data = response.data
	return data
}, error => {
	return Promise.reject(error);
});

type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'
interface RequestOptions {
  headers?: any
}
export default function request(method: RequestMethod, path: string, data = {}, options:RequestOptions = {}) {
  // 默认设置`json`传参
  const header = (!options || !options?.headers) ? {
    'codeMode': 'json',
  } : {};
  return HTTP({
    method: method,
    url: path,
    params: method === 'GET' ? data : {},
    data: method !== 'GET' ? data : {},
    headers: header,
    ...options,
  })
}