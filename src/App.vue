<template>
  <router-view />
</template>
<script>
export default {
  created() {
    const data = this.$cookies.get('userInfo');
    if (data) {
      this.$store.commit('loggedIn', data);
    }
  }
}
</script>
<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*/
</style>
