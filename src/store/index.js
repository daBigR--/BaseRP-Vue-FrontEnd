import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false
  },
  mutations: {
    loggedIn(state) {
      state.isAuthenticated = true;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
