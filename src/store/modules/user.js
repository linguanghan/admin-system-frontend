/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const { result,errorMsg } = await login(userInfo)
    const accessToken = result?.data;
    console.log("accessToken");
    if (accessToken) {
      commit('setAccessToken', accessToken)
      commit('setUsername', userInfo.username)
      localStorage.setItem("username", userInfo.username)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        errorMsg,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const username = localStorage.getItem("username");
    const { result } = await getUserInfo(username)
    if (!result && !result?.data) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let {userName, avatar } = result?.data;
    if ( userName) {
      commit('setPermissions', [userName])
      commit('setUsername', userName)
      commit('setAvatar', avatar)
      return [userName]
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
