<template>
  <div class="layout-wrapper layout-static" id="container">

    <TopBar @menu-toggle="onMenuToggle" @logout="logOut" />

    <transition name="layout-sidebar">
      <div class="layout-sidebar layout-sidebar-light" v-show="true">
        <UserProfile @logout="logOut" />
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

import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    TopBar,
    UserProfile,
    Menu
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const logOut = () => {
      store.commit('loggedOut');
      router.push({ name: 'Login' })
    };

    const onMenuToggle = () => {};
    
    return {
      logOut,
      onMenuToggle
    }
  }
}
</script>

<style scoped>
</style>