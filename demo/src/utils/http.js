import axios from 'axios'

const HTTP = axios.create({
  baseURL: '/api',
  timeout: 15 * 1000
})

//拦截器
//请求拦截
HTTP.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error)
});

//相应拦截
HTTP.interceptors.response.use(response => {
	const data = response.data
	return data
}, error => {
	return Promise.reject(error);
});

export default HTTP