<template>
  <div class="layout-wrapper layout-static" id="container">
    <TopBar @menu-toggle="onMenuToggle" @logout="logOut" />

    <transition name="layout-sidebar">
      <div class="layout-sidebar layout-sidebar-light" v-show="true">
        <UserProfile />
        <Menu />
      </div>
    </transition>

    <div class="layout-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue';
import UserProfile from '../components/UserProfile.vue'
import Menu from '../components/Menu.vue';
import Button from 'primevue/button';
import { computed } from '@vue/runtime-core';

export default {
  data() {
    return {
      dato: 1
    }
  },
  methods: {
    logOut() {
      this.$store.commit('loggedOut');
      this.$cookies.remove('userInfo');
      this.$router.push({ name: 'Login' })
    },
    onMenuToggle() {}
  },
  provide() {
    return {
      dato: computed( () => this.dato ),
      actualizarDato: (nuevoValor) => this.dato = nuevoValor
    }
  },
  components: {
    TopBar,
    UserProfile,
    Menu,
    Button
  }
}
</script>

<style scoped>

</style>