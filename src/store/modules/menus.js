import { getMenus } from '@/api/menus'

const state = {
  AsideList: []
}
const mutations = {
  // 设置用户信息
  saveMenusList (state, payload) {
    state.AsideList = payload
  }
}
const actions = {
  // ----------------------------------
  // 登录
  async getMenus (context) {
    // ---- 获取侧边栏 -----
    const res = await getMenus()
    const Menus = res.data.data
    console.log('侧边栏列表', Menus)// 侧边栏菜单列表
    // ---- 把侧边栏存入vuex中 -----
    context.commit('saveMenusList', res.data.data)
    // ---- 把Menus存入cookie -----
    // setToken(Menus)
    // console.log(getToken())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
