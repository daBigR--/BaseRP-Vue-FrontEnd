<template>
  <h3>This is App 2 main page</h3>
 
  <div>
    <DataTable
      :value="regiones"
      :lazy="true"
      :paginator="true"
      :rows="tableRows"
      :rowsPerPageOptions="[5,10,20]"
      v-model:filters="filters"
      ref="dt"
      :totalRecords="totalRecords"
      :loading="loading"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      filterDisplay="menu"
      :globalFilterFields="['Nombre']"
      responsiveLayout="scroll"
    >
      <template #header>
        <div style="text-align: left">
          <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
        </div>
      </template>
      <Column
        field="Nombre"
        header="Nombre"
        filterMatchMode="contains"
        ref="Nombre"
        :sortable="true"
      >  
        <template #filter="{filterModel,filterCallback}">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            placeholder="Buscar por nombre región"
          />
        </template>                    
      </Column>
      <Column
        field="Vigente"
        header="Vigente"
        ref="Vigente"
        :sortable="true"
      >
        <template #body="slotProps">
          {{ slotProps.data.Vigente ? 'Si' : 'No'}}
        </template>
      </Column>
    </DataTable>
</div>

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  data() {
    return {
      regiones: null,
      filters: {
        'Nombre': {value: '', matchMode: 'contains'}
      },
      totalRecords: 0,
      tableRows: 5,
      loading: false,
      parameters: {}
    }  
  },

  async mounted() {
    this.loading = true;
    this.parameters = {
      iDisplayStart: 0,
      iDisplayLength: this.tableRows,
      sSearch_a: 1,
      sSearch: '',
      iSortCol_0: 0,
      sSortDir_0: 'asc'
    };
    this.fetchData(this.parameters);
    this.loading = false;
  },

  methods: {
    async fetchData(parameters) {
      const resp = await fetch('http://localhost:57258/api/Region/GetRegionPaging', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(parameters)
      });
      const data = await resp.json();
      this.regiones = data.aaData;
      this.totalRecords = data.iTotalRecords;
    },
    onPage(e) {
      this.tableRows = e.rows;
      this.parameters.iDisplayStart = e.first;
      this.parameters.iDisplayLength = this.tableRows;
      this.fetchData(this.parameters);
      this.loading = false;
    },
    onSort(e) {
      this.loading = true;
      this.parameters.iSortCol_0 = e.sortField === 'Nombre' ? 1 : null;
      this.parameters.sSortDir_0 = e.sortOrder === 1 ? 'asc' : 'desc';
      this.parameters.iDisplayStart = 0;
      this.parameters.iDisplayLength = this.tableRows;
      this.fetchData(this.parameters);
      this.loading = false;
    },
    onFilter(e) {
      this.loading = true;
      this.parameters.sSearch = e.filters.Nombre.value;
      this.parameters.iDisplayStart = 0;
      this.parameters.iDisplayLength = this.tableRows;
      this.fetchData(this.parameters);
      this.loading = false;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    }
  },

  components: {
    DataTable,
    Column,
    InputText,
    Button
  }

}
</script>