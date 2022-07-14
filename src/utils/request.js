import axios from 'axios'
const request = axios.create({
  // 基础端口
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000// 延时8秒
})
export default request
