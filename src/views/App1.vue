<template>
  <h3>This is app1 main page {{ dato.value }}</h3>
  <button @click="actualizarDato(dato.value + 1)">Incrementar</button>
  <h5>{{ region.Nombre }}</h5>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsum asperiores autem veritatis excepturi voluptates quod dolorum perspiciatis. Vero sit nobis sint quaerat! Quis nostrum id voluptatibus ipsam, minima quibusdam?</p>
</template>

<script>
export default {
  data() {
    return {
      region: {}
    }  
  },
  
  inject: [
    'dato', 'actualizarDato'
  ],

  async mounted() {
    const idRegion = 13;
    const resp = await fetch(`http://localhost:57258/api/Region/GetById?IdRegion=${encodeURIComponent(idRegion)}`, {
      headers: { 'Authorization': this.$store.state.token }
    });
    this.region = await resp.json();
  }

}
</script>