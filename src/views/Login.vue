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

import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import { useCookie } from "@vue-composable/cookie";

export default {
  name: 'Login',
  components: {
    Button,
    InputText,
    Password
  },
  setup() {
    const usr = ref('');
    const pwd = ref('');

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const login = async () => {
      const userDTO = {
        IdOrganizacion: 1,
        UserName: usr.value,
        Password: pwd.value
      };
      const resp = await fetch('/api/Login/Login', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userDTO)
      });
      if (resp.status !== 200) {
        alert("Username or password incorrect or doesn't exist.");
        return;
      }
      const data = await resp.json();
      store.commit('loggedIn', data);
      const { setCookie } = useCookie("userInfo");
      setCookie(data, {expires: 0.25, SameSite: 'Lax'});
      router.push({ name: route.params.previousRoute || 'Main' });
    };

    return {
      usr,
      pwd,
      login
    }
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