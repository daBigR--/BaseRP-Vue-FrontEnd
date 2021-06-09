<template>
<div class="container">
  <div class="card p-fluid">
    <h5>Login</h5>
    <div class="p-field p-mt-5">
      <span class="p-float-label">
        <InputText id="usr" v-model="usr" type="text" class="p-d-box" />
        <label for="usr">User name</label>
      </span>
    </div>
    <div class="p-field p-mt-5">
      <span class="p-float-label">
      <InputText id="pwd" v-model="pwd" type="password" class="p-d-box" />
      <label for="pwd">Password</label>
      </span>
    </div>
    <div class="p-mt-5 login-button">
      <Button label="Login" icon="pi pi-sign-in" @click="login" class="p-button-raised " />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

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
      if (this.usr && (this.usr === this.pwd)) {
        this.$store.commit('loggedIn');
        this.$router.push({ name: 'Main' });
      }
    }
  },
  components: {
    Button,
    InputText
  }
}
</script>

<style scoped>
  .container {
    margin: auto;
    width: 300px;
  }
  .login-button {
    width: 100px;
    margin: auto;
  }
  @media (max-width: 600px) {
  .container {
    width: 80%;
  }
  .login-button {
    width: 100%;
  }
  }
</style>