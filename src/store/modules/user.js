import { login } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(), // token
  userInfo: {}// 用户信息

}
const mutations = {
  // ---------- 设置token ----------
  setToken (state, payload) {
    state.token = payload
  },
  // ---------- 设置用户信息 ----------
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  // ---------- 删除token ----------
  removeToken (state) {
    state.token = null
    removeToken()// 删除token 在auth.js中
  },
  // ---------- 删除用户信息 ----------
  removeUserInfo (state) {
    state.userInfo = {}
  }

}
const actions = {
  // ----------------------------------
  // 登录
  async login (context, data) {
    // ---- 获取登录信息api -----
    const res = await login(data)
    console.log(res)
    const userToken = res.data.data.token
    // ---- 把token存入vuex -----
    context.commit('setToken', userToken)
    console.log(userToken)
    // ---- 把token存入cookie -----
    setToken(userToken)
    // console.log(getToken())
  },
  // ----- 退出 ----
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
