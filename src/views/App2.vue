<template>
  <h3>This is App 2 main page</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptates magnam provident, nisi maxime odio totam voluptate? Fugiat, culpa iure, quasi provident eveniet ratione deleniti velit neque molestiae commodi ex.</p>
  <ul>
    <li v-for="region in regiones" :key="region.IdRegion">
      {{ region.Nombre }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      regiones: {}
    }  
  },

  async mounted() {
 
    const resp = await fetch('http://localhost:57258/api/Region/GetRegionPaging', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
      body: '{ "iDisplayStart" : 0,	"iDisplayLength" : 5,	"sSearch_a" : 1,	"sSearch" : "",	"iSortCol_0" : 0, "sSortDir_0" : "asc"}'
    });
    const data = await resp.json();
    this.regiones = data.aaData;
  }

}
</script>