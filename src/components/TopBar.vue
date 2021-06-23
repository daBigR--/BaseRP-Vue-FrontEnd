<template>
  
    <div class="layout-topbar" id="main-header">
   		<button class="p-link layout-menu-button" @click="$emit('menu-toggle', $event)">
        <span class="pi pi-bars"></span>
		  </button>
      <div class="layout-topbar-icons">
        <!-- <span class="layout-topbar-search">
          <InputText type="text" placeholder="Search" />
          <span class="layout-topbar-search-icon pi pi-search"></span>
        </span> -->
        <button class="p-link" @click="$emit('logout')">
          <span class="layout-topbar-item-text">Logout</span>
          <span class="layout-topbar-icon pi pi-sign-out"></span>
        </button>
      </div>
    </div>

</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  emits: [
    'menu-toggle',
    'logout'
  ],
  components: {
    InputText
  }
}
</script>