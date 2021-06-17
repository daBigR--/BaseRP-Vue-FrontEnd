<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<h5>Regiones</h5>
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
          class="p-datatable-sm"
          stripedRows
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="De un total de {totalRecords} filas ({first} a {last})"
        >
          <template #header>
            <div class="p-d-flex p-jc-between">
              <div>
                <Button class="p-button-raised p-button-text" icon="pi pi-plus" label="Crear región" @click="addRegion" />
              </div>
              <div>
                <span class="p-input-icon-left p-mr-2">
                  <i class="pi pi-search" />
                  <InputText type="text" v-model="filters['global'].value" placeholder="Buscar" @keydown.enter="globalFilter" />
                </span>
                <Button class="p-button-raised p-button-text p-mr-2" icon="pi pi-filter-slash" label="Sin filtros" @click="eliminarFiltros" />
                <Button class="p-button-raised p-button-text" icon="pi pi-external-link" label="Exportar" @click="exportCSV" />
              </div>
            </div>
          </template>
          <template #empty>
            <h3>No hay registros.</h3>
          </template>
          <template #loading>
            <h3>Cargando registros. Espere.</h3>
          </template>
          <Column
            header="Editar"
            :exportable="false"
          >
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="editRegion(slotProps.data)" />
            </template>
          </Column>
          <Column
            field="Nombre"
            header="Nombre"
            filterMatchMode="contains"
            :filterMatchModeOptions="nombreMatchModeOptions"
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
              <span>{{ slotProps.data.Vigente ? 'Si' : 'No'}}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <div>
    <Dialog
      header="Región"
      v-model:visible="displayRegionDialog"
      :style="{width: '40vw'}"
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
        <Button label="Grabar" icon="pi pi-check" @click="saveRegion" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import Dialog from 'primevue/dialog';

export default {
  data() {
    return {
      regiones: null,
      filters: {'global': {value: null, matchMode: 'contains'}},
      totalRecords: 0,
      tableRows: 5,
      loading: false,
      getRegionPagingParams: {},
      orderColumn: null,
      displayRegionDialog: false,
      region: {
        IdRegion: null,
        Nombre: '',
        Vigente: null
      },
      nombreMatchModeOptions: [
        {label: 'Contiene', value: 'contains'}
      ]
    }  
  },

  async mounted() {
    this.loading = true;
    this.resetParameters();
    this.resetFilters();
    this.fetchData();
    this.loading = false;
  },

  methods: {
    resetParameters() {
      this.getRegionPagingParams = {
        iDisplayStart: 0,
        iDisplayLength: this.tableRows,
        sSearch_a: 1,
        sSearch: '',
        iSortCol_0: 0,
        sSortDir_0: 'asc'
      };
    },
    resetFilters() {
      this.filters = {
        'global': {value: null, matchMode: 'contains'},
        'Nombre': {value: null, matchMode: 'contains'},
        'Vigente': {value: null, matchMode: 'equals'}
      }
    },
    async fetchData() {
      const resp = await fetch('api/Region/GetRegionPaging', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(this.getRegionPagingParams)
      });
      const data = await resp.json();
      this.regiones = data.aaData;
      this.totalRecords = data.iTotalRecords;
    },
    onPage(e) {
      this.loading = true;
      this.tableRows = e.rows;
      this.getRegionPagingParams.iDisplayStart = e.first;
      this.getRegionPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    onSort(e) {
      this.loading = true;
      switch (e.sortField) {
        case 'Nombre':
          this.getRegionPagingParams.iSortCol_0 = 1;
          break;
        case 'Vigente':
          this.getRegionPagingParams.iSortCol_0 = 2;
          break;
        default:
          this.getRegionPagingParams.iSortCol_0 = 0;
          break;
      }
      this.getRegionPagingParams.sSortDir_0 = e.sortOrder === -1 ? 'desc' : 'asc';
      this.getRegionPagingParams.iDisplayStart = 0;
      this.getRegionPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    onFilter(e) {
      this.loading = true;
      this.getRegionPagingParams.sSearch = e.filters.Nombre.value;
      this.getRegionPagingParams.iDisplayStart = 0;
      this.getRegionPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    eliminarFiltros() {
      this.loading = true;
      this.resetParameters();
      this.resetFilters();
      this.fetchData();
      this.loading = false;
    },
    globalFilter() {
      this.loading = true;
      this.getRegionPagingParams.sSearch = this.filters['global'].value;
      this.getRegionPagingParams.iDisplayStart = 0;
      this.getRegionPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    addRegion() {
      this.region = {};
      this.displayRegionDialog = true;
    },
    editRegion(data) {
      this.region = data;
      this.displayRegionDialog = true;
    },
    closeRegionDialog() {
      this.region = {};
      this.displayRegionDialog = false;
    },
    async saveRegion() {
      const regionDTO = this.region;
		  regionDTO.UsuarioModifico = this.$store.state.userName;
      const resp = await fetch('api/Region/Save', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(regionDTO)
      });
      if (resp.status !== 200) {
        alert('Error al actualizar región');
        return;
      }
      this.resetParameters();
      this.fetchData();
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

<style lang="scss" scoped>
	.p-datatable .p-column-filter {
		display: none;
	}
</style>