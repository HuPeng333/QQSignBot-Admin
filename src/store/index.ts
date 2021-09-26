import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userModule from './user'
import state from './state'
import mutations from './mutations'
import actions from './actions'

export default createStore({
  state,
  mutations,
  actions,
  modules: {
    user: userModule
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
