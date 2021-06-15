<template>
<div id="container">
  <header>
    <div id="main-header">
      <Button icon="pi pi-sign-out" @click="logOut" class="p-button-rounded p-button-danger p-mr-2 p-mb-2" />
      <!-- <i class="fas fa-sign-out-alt" @click="logOut"></i> -->
    </div>
  </header>
  <nav>
    <h5>{{ $store.state.nombreUsuario }}</h5>
    <Menu />
  </nav>
  <main>
    <router-view />
  </main>
</div>
</template>

<script>
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
    }
  },
  provide() {
    return {
      dato: computed( () => this.dato ),
      actualizarDato: (nuevoValor) => this.dato = nuevoValor
    }
  },
  components: {
    Menu,
    Button
  }
}
</script>

<style scoped>
  #container {
    width:80%;
    margin:auto;
  }
  header {
    background-color: #2c3e50;
    display: flex;
    justify-content: right;
    padding-top: 8px;
  }
  nav {
    width: 15%;
    float: left;
    box-sizing: border-box;
  }

  main {
    width: 85%;
    float: right;
    box-sizing: border-box;
  }
</style>