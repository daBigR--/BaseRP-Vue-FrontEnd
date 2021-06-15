import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
    userName: '',
    nombreUsuario: ''
  },
  mutations: {
    loggedIn(state, payload) {
      state.isAuthenticated = true;
      state.token = payload.Token;
      state.userName = payload.UserName;
      state.nombreUsuario = payload.Nombre;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = '';
      state.nombreUsuario = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
