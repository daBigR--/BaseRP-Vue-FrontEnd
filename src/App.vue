<template>
  <router-view />
</template>


<script>
import { useStore } from 'vuex';
import { useCookie } from "@vue-composable/cookie";

export default {
  setup() {
    const store = useStore();
    const { cookie } = useCookie("userInfo");
    if (cookie.value) {
      const data = JSON.parse(cookie.value);
      if (localStorage.imagenPerfil) {
        data.ImagenPerfil = localStorage.imagenPerfil;
      }
      store.commit('loggedIn', data);
    }
  }
}
</script>

<style>
</style>
