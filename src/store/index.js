import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
    userName: ''
  },
  mutations: {
    loggedIn(state, payload) {
      state.isAuthenticated = true;
      state.token = payload.Token;
      state.userName = payload.Nombre;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
