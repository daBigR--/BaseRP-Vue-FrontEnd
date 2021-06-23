<template>
	<div class="layout-menu-container">
    <PanelMenu :model="menuItems" />
  </div>
</template>

<script>
import PanelMenu from 'primevue/panelmenu';

import { reactive } from 'vue';

export default {
  name: 'Menu',
  components: {
    PanelMenu
  },
  setup() {
    const menuItems = reactive([
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
    ]);
    return {
      menuItems
    }
  }
}
</script>

<style scoped>
</style>