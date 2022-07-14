import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 重定向打开就在login页面
  { path: '/login', component: () => import('@/views/Login') }, // 登录界面懒加载
  { path: '/home', component: () => import('@/views/Home') }// 后台界面主页懒加载

]

const router = new VueRouter({
  routes
})

export default router
