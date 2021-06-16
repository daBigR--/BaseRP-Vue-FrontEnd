<template>
  
    <div class="layout-topbar" id="main-header">
   		<button class="p-link layout-menu-button" @click="onMenuToggle">
        <span class="pi pi-bars"></span>
		  </button>
      <div class="layout-topbar-icons">
        <button class="p-link" @click="logOut">
          <span class="layout-topbar-item-text">Logout</span>
          <span class="layout-topbar-icon pi pi-sign-out"></span>
        </button>
      </div>
    </div>

</template>

<script>
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
    logOut(event) {
      this.$emit('logout', event);
    }
  },
  emits: [
    'menu-toggle',
    'logout'
  ]

}
</script>