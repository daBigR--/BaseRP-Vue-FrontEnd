<template>
	<div class="layout-menu-container">

    <PanelMenu :model="menuItems" />
    <!-- <p><router-link :to="{ name: 'App1'}">App 1</router-link></p>
    <p><router-link :to="{ name: 'App2'}">App 2</router-link></p> -->
  </div>
</template>

<script>
import PanelMenu from 'primevue/panelmenu';

export default {
  name: 'Menu',
  data() {
    return {
      menuItems: [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          to: { name: 'Main' }
        },
        {
          label: 'Administración',
          icon: 'pi pi-cog',
          items: [
            { label: 'Región',
              icon: 'pi pi-map-marker',
              to: { name: 'App2' }
            }
          ]
        },
        {
          label: 'Seguridad',
          icon: 'pi pi-id-card',
          items: [
            { label: 'Usuarios',
              icon: 'pi pi-user-plus',
              to: { name: 'App1' }
            }
          ]
        }
      ]
    }
  },
  components: {
    PanelMenu
  }
}
</script>

<style scoped>

a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}

a.router-link-active, a.router-link-exact-active {
  color: lightseagreen;
}

</style>