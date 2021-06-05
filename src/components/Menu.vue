<template>
  <div class="menu">
    <p><router-link :to="{ name: 'App1'}">App 1</router-link></p>
    <p><router-link :to="{ name: 'App2'}">App 2</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>

.menu {
  padding: 30px;
  background-color: #2c3e50;
}

.menu a {
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.menu a.router-link-active, a.router-link-exact-active {
  color: lightseagreen;
}

</style>