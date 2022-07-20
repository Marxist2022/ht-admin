import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/', redirect: '/login' }, // 重定向打开就在login页面

  // ------ 登录界面 ------
  {
    path: '/login',
    component: () => import('@/views/Login')
  }, // 登录界面懒加载
  // ------ 404 ------
  {
    path: '/404',
    component: () => import('@/views/404')

  },
  // ------ 主界面 ------
  {
    path: '/home',
    redirect: '/home/first',
    component: () => import('@/views/Home'),
    // ------ 首页 ------
    children: [
      {
        path: 'first',
        name: 'first',
        component: () => import('@/views/First')
      },
      // ------ "用户管理" ------
      // ------ 用户列表 ------
      {
        path: 'user_list',
        name: 'users',
        component: () => import('@/views/user_list')
      },
      // ------ "权限管理""rights" ------
      // ------ 角色列表 "roles"------
      {
        path: 'role_list',
        name: 'roles',
        component: () => import('@/views/role_list')
      },
      // ------ 权限列表 "rights"------
      {
        path: 'vip_list',
        name: 'rights',
        component: () => import('@/views/vip_list')
      },
      // ------ "商品管理" "goods"------
      // ------ 商品列表 "goods"------
      {
        path: 'goods_list',
        name: 'goods',
        component: () => import('@/views/goods_list')
      },
      // ------ 分类参数 "params"------
      {
        path: 'sort_param',
        name: 'params',
        component: () => import('@/views/sort_param')
      },
      // ------ 商品分类 "categories"------
      {
        path: 'goods_sort',
        name: 'categories',
        component: () => import('@/views/goods_sort')
      },
      // ------ "订单管理" "orders"------
      // ------ 订单列表 "orders"------
      {
        path: 'order_list',
        name: 'orders',
        component: () => import('@/views/order_list')
      },
      // ------ "数据统计" "reports"------
      // ------ 数据报表 "reports"------
      {
        path: 'data_list',
        name: 'reports',
        component: () => import('@/views/data_list')
      }]

  } // 后台界面主页懒加载//

]

const router = new VueRouter({
  routes
})

export default router
