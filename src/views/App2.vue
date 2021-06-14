<template>
  <h3>This is App 2 main page</h3>
 
  <div>
    <DataTable
      ref="dt"
      :value="regiones"
      :lazy="true"
      :paginator="true"
      :loading="loading"
      :rows="tableRows"
      :rowsPerPageOptions="[5,10,20]"
      removableSort
      v-model:sortField="orderColumn"
      :totalRecords="totalRecords"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      filterDisplay="menu"
      v-model:filters="filters"
      :globalFilterFields="['Nombre']"
      responsiveLayout="scroll"
    >
      <template #header>
        <div style="text-align: right">
          <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
        </div>
      </template>
      <Column
        header="Editar"
        :exportable="false"
      >
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editRegion(slotProps.data)" />
        </template>
      </Column>
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
        filterMatchMode="equals"
        ref="Vigente"
        :sortable="true"
      >
        <template #filter="{filterModel}">
          <Checkbox
            name="filtroVigente"
            v-model="filterModel.value"
            class="p-column-filter"
            :binary="true"
          />
          <label class="p-ml-2" for="filtroVigente">Vigente</label>
        </template>                    
        <template #body="slotProps">
          {{ slotProps.data.Vigente ? 'Si' : 'No'}}
        </template>
      </Column>
    </DataTable>
</div>

<div>
  <Dialog
    header="Editar Región"
    v-model:visible="displayRegionDialog"
    :style="{width: '50vw'}"
    :modal="true"
  >

    <form>
    <div class="card p-fluid">
      <div class="p-inputgroup p-mt-5">
        <span class="p-float-label">
          <InputText id="NombreRegion" name="NombreRegion" v-model="region.Nombre" type="text" class="p-d-box" />
          <label for="NombreRegion">Nombre región</label>
        </span>
      </div>
      <div class="p-inputgroup p-mt-5">
        <div class="p-field-checkbox">
          <Checkbox id="RegionVigente" v-model="region.Vigente" :binary="true" />
          <label for="RegionVigente">Vigente</label>
        </div>
      </div>
    </div>
    </form>


    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" @click="closeRegionDialog" class="p-button-text"/>
      <Button label="Grabar" icon="pi pi-check" @click="closeRegionDialog" autofocus />
    </template>
  </Dialog>
</div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';

export default {
  data() {
    return {
      regiones: null,
      filters: {
        'Nombre': {value: '', matchMode: 'contains'},
        'Vigente': {value: false, matchMode: 'equals'}
      },
      totalRecords: 0,
      tableRows: 5,
      loading: false,
      parameters: {},
      orderColumn: null,
      displayRegionDialog: false,
      region: {
        Nombre: '',
        Vigente: false
      }
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
      this.loading = true;
      this.tableRows = e.rows;
      this.parameters.iDisplayStart = e.first;
      this.parameters.iDisplayLength = this.tableRows;
      this.fetchData(this.parameters);
      this.loading = false;
    },
    onSort(e) {
      this.loading = true;
      switch (e.sortField) {
        case 'Nombre':
          this.parameters.iSortCol_0 = 1;
          break;
        case 'Vigente':
          this.parameters.iSortCol_0 = 2;
          break;
       default:
          this.parameters.iSortCol_0 = 0;
          break;
      }
      this.parameters.sSortDir_0 = e.sortOrder === -1 ? 'desc' : 'asc';
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
    editRegion(data) {
      this.region.Nombre = data.Nombre;
      this.region.Vigente = data.Vigente;
      this.displayRegionDialog = true;
    },
    closeRegionDialog() {
      this.displayRegionDialog = false;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    }
  },

  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Dialog,
    Checkbox
  }

}
</script>