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

export default HTTP