<template>
<div class="container">
  <form @submit.prevent="login">
  <div class="card p-fluid">
    <h5>Login</h5>
    <div class="p-inputgroup p-mt-5">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <span class="p-float-label">
        <InputText required id="usr" name="usr" v-model="usr" type="text" class="p-d-box" />
        <label for="usr">User name</label>
      </span>
    </div>
    <div class="p-inputgroup p-mt-5">
      <span class="p-inputgroup-addon">
        <i class="pi pi-key"></i>
      </span>
      <span class="p-float-label">
        <Password id="pwd" name="pwd" v-model="pwd" toggleMask :feedback="false" class="p-d-box" />
        <label for="pwd">Password</label>
      </span>
    </div>
    <div class="p-mt-5 login-button">
      <Button type="submit" label="Login" icon="pi pi-sign-in" class="p-button-raised " />
    </div>
  </div>
  </form>
</div>
</template>

<script>
// @ is an alias to /src
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

export default {
  name: 'Login',
  data() {
    return {
      usr: '',
      pwd: ''
    }
  },
  methods: {
    async login() {
      const userDTO = {
        IdOrganizacion: 1,
        UserName: this.usr,
        Password: this.pwd
      };
      const resp = await fetch('http://localhost:57258/api/Login/Login', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userDTO)
      });
      if (resp.status !== 200) {
        alert("Username or password incorrect or don't exist.");
        return;
      }
      const data = await resp.json();
      this.$cookies.set('userInfo', data, '8h');
      this.$store.commit('loggedIn', data);
      this.$router.push({ name: 'Main' });
    }
  },
  components: {
    Button,
    InputText,
    Password
  }
}
</script>

<style scoped>
  .container {
    width: 300px;
    margin: 50px auto;
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