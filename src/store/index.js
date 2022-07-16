import Vue from 'vue'
import Vuex from 'vuex'
// ------ 引入 ------
import user from './modules/user'// 登录
import menus from './modules/menus'// 登录
// ------ 快捷获取 ------
import getters from './getters'// getters

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user, // 用户信息
    menus
  },
  getters
})

export default store
