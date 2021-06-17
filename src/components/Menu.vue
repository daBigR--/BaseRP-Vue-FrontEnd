<template>
	<div class="layout-menu-container">
    <PanelMenu :model="menuItems" />
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
              to: { name: 'Region' }
            }
          ]
        },
        {
          label: 'Seguridad',
          icon: 'pi pi-id-card',
          items: [
            { label: 'Usuarios',
              icon: 'pi pi-user-plus',
              to: { name: 'Usuario' }
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