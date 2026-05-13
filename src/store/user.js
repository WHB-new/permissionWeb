import {getUserRoutes, getUserRole} from '@/mock'

const state = {
  role:'',// 用户角色
  userRoutes:[]// 可访问路由表
}
const mutations = {
  SET_ROLE(state, role) {
    state.role = role
  },
  SET_USER_ROUTES(state, routes) {
    state.userRoutes = routes
  },
  RESET_STATE(state) {
    state.role = ''
    state.userRoutes = []
  }
}
const actions = {
   resetState({commit}) {
    commit('RESET_STATE')
   },
  setRole({commit}, role) {
    commit('SET_ROLE', role)
  },
  async setUserRoutes({commit, state}) {
    let role = state.role
    const token = sessionStorage.getItem('token')
    // 可能碰到用户刷新页面角色丢失
    if (!role) {
      // 先判断是否处于登录态 如果不是的话return 并且拦截去登录页面（路由守卫那边处理）
      if(!token) return;
      // 如果有登录态 获取用户角色 重新提供用户路由信息
      const result = await getUserRole(token)
      if (result.code !== 0) return Promise.reject(new Error('获取用户角色失败'))
      role = result.data.role;
      commit('SET_ROLE', result.data.role)
    }
    let res = await getUserRoutes(role)
    if (res.code !== 0) return Promise.reject(new Error('获取用户路由失败'))
      commit('SET_USER_ROUTES', res.data.userRoutes)
    
  }
}
export default {
  state,
  mutations,
  actions,
  namespaced:true,
}