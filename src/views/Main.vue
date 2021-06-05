<template>
<div id="container">
  <header>
    <div id="main-header">
      <i class="fas fa-sign-out-alt" @click="logOut"></i>
    </div>
  </header>
  <nav>
    <Menu />
  </nav>
  <main>
    <router-view />
  </main>
</div>
</template>

<script>
import Menu from '../components/Menu.vue';
export default {
  components: {
    Menu
  },
  methods: {
    logOut() {
      this.$store.commit('loggedOut');
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
  #container {
    width:80%;
    margin:auto;
  }
  header {
    background-color: coral;
    display: flex;
    justify-content: right;
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