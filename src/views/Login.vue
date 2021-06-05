<template>
  <div class="login">
    <h3>Login</h3>
    <p><input
      v-model="usr"
      type="text"
      name="usr"
      placeholder="User name"
    ></p>
    <p><input
      v-model="pwd"
      type="password"
      name="pwd"
      placeholder="Password"
    ></p>
    <p><button @click="login">Login</button></p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  data() {
    return {
      usr: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      if (this.usr === this.pwd) {
        this.$store.commit('loggedIn');
        this.$router.push({ name: 'Main' })
      }
    }
  }
}
</script>
