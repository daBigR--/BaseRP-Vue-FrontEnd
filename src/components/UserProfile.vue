<template>
	<div class="layout-profile">
		<div>
			<img src="assets/layout/images/logo-grande.png" alt="" />
		</div>
		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">{{ $store.state.nombreUsuario }}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
        <li><button class="p-link" @click="logOut"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
      </ul>
    </transition>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        expanded: false
      }
    },
    methods: {
      logOut() {
        this.$store.commit('loggedOut');
        this.$cookies.remove('userInfo');
        this.$router.push({ name: 'Login' })
      },
      onClick(event){
        this.expanded = !this.expanded;
        event.preventDefault();
      }
    }
  }
</script>

