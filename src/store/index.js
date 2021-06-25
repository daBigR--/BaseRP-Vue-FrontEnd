import { createStore } from 'vuex'

import { useCookie } from "@vue-composable/cookie";

export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
    userName: '',
    nombreUsuario: '',
    imagenPerfil: null
  },
  mutations: {
    loggedIn(state, payload) {
      state.isAuthenticated = true;
      state.token = payload.Token;
      state.userName = payload.UserName;
      state.nombreUsuario = payload.Nombre;
      state.imagenPerfil = payload.ImagenPerfil;

      localStorage.imagenPerfil = payload.ImagenPerfil;
      delete payload.ImagenPerfil;

      const { setCookie } = useCookie("userInfo");
      setCookie(payload, {expires: 0.25, SameSite: 'Lax'});
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = '';
      state.nombreUsuario = '';
      state.imagenPerfil = null;

      localStorage.removeItem('imagenPerfil');

      const { removeCookie } = useCookie('userInfo');
      removeCookie();
    }
  },
  actions: {
  },
  modules: {
  }
})
