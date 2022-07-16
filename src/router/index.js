import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 重定向打开就在login页面

  // ------ 登录界面 ------
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  }, // 登录界面懒加载
  // ------ 404 ------
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // ------ 主界面 ------
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      // ------ "用户管理" ------
      // ------ 用户列表 ------
      {
        path: 'user_list',
        name: 'users',
        component: () => import('@/views/Aside_Nav/Users_M/user_list')
      },
      // ------ "权限管理""rights" ------
      // ------ 角色列表 "roles"------
      {
        path: 'role_list',
        name: 'roles',
        component: () => import('@/views/Aside_Nav/VIP_M/role_list')
      },
      // ------ 权限列表 "rights"------
      {
        path: 'vip_list',
        name: 'rights',
        component: () => import('@/views/Aside_Nav/VIP_M/vip_list')
      },
      // ------ "商品管理" "goods"------
      // ------ 商品列表 "goods"------
      {
        path: 'goods_list',
        name: 'goods',
        component: () => import('@/views/Aside_Nav/Goods_M/goods_list')
      },
      // ------ 分类参数 "params"------
      {
        path: 'sort_param',
        name: 'params',
        component: () => import('@/views/Aside_Nav/Goods_M/sort_param')
      },
      // ------ 商品分类 "categories"------
      {
        path: 'goods_sort',
        name: 'categories',
        component: () => import('@/views/Aside_Nav/Goods_M/goods_sort')
      },
      // ------ "订单管理" "orders"------
      // ------ 订单列表 "orders"------
      {
        path: 'order_list',
        name: 'orders',
        component: () => import('@/views/Aside_Nav/Order_M/order_list')
      },
      // ------ "数据统计" "reports"------
      // ------ 数据报表 "reports"------
      {
        path: 'data_list',
        name: 'reports',
        component: () => import('@/views/Aside_Nav/Data_M/data_list')
      }]

  } // 后台界面主页懒加载//

]

const router = new VueRouter({
  routes
})

export default router
