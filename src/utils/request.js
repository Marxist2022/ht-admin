import axios from 'axios'
import { getTime, getToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  // 基础端口
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000// 延时8秒
})
// ------- 请求拦截器request -------
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = getToken()// 获取token
  if (token) {
    const timeout = Date.now() - getTime()// 获取时间差值
    // 判断token是否过期
    if (timeout > 2 * 60 * 60 * 1000) { // 超过2小时
      store.dispatch('user/logout')// 清除token
      router.push('/login')// 跳转到登录页面
    }
    console.log(token)
    config.headers.Authorization = token// 设置请求头
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
