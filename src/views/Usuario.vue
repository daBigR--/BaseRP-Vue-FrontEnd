<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<h5>Usuarios</h5>
        <DataTable
          ref="dt"
          :value="usuarios"
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
          :globalFilterFields="['NombreCompleto','UserName','Email']"
          responsiveLayout="scroll"
          class="p-datatable-sm"
          stripedRows
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="De un total de {totalRecords} filas ({first} a {last})"
        >
          <template #header>
            <div class="p-d-flex p-jc-between">
              <div>
                <Button class="p-button-raised p-button-text" icon="pi pi-plus" label="Crear usuario" @click="addUsuario" />
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
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="editUsuario(slotProps.data.IdUsuario)" />
            </template>
          </Column>
          <Column
            field="NombreCompleto"
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
                placeholder="Buscar por nombre completo"
              />
            </template>                    
          </Column>
          <Column
            field="UserName"
            header="Usuario"
            filterMatchMode="contains"
            :filterMatchModeOptions="nombreMatchModeOptions"
            ref="Usuario"
            :sortable="true"
          >  
            <template #filter="{filterModel,filterCallback}">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Buscar por user name"
              />
            </template>                    
          </Column>
          <Column
            field="Email"
            header="Correo"
            filterMatchMode="contains"
            :filterMatchModeOptions="nombreMatchModeOptions"
            ref="Correo"
            :sortable="true"
          >  
            <template #filter="{filterModel,filterCallback}">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Buscar por dirección correo"
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

  <UsuarioDialog
    v-model="usuario"
    :organizaciones="organizaciones"
    :perfiles="perfiles"
    v-model:visible="displayUsuarioDialog"
    @action="usuarioDialogAction"
  />

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import UsuarioDialog from '@/components/UsuarioDialog.vue';

export default {
  data() {
    return {
      usuarios: null,
      filters: {'global': {value: null, matchMode: 'contains'}},
      totalRecords: 0,
      tableRows: 5,
      loading: false,
      getUsuarioPagingParams: {},
      orderColumn: null,
      displayUsuarioDialog: false,
      usuario: {
        IdUsuario: null,
        NombreCompleto: null,
        UserName: null,
        Email: null,
        ValidaEnAD: null,
        Vigente: null,
        IdOrganizacion: null,
        Perfiles: null
      },
      perfiles: {
        IdPerfil: null,
        Nombre: null
      },
      organizaciones: {
        IdOrganizacion: null,
        Nombre: null
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
      this.getUsuarioPagingParams = {
        iDisplayStart: 0,
        iDisplayLength: this.tableRows,
        sSearch_a: 0,
        sSearch: '',
        iSortingCols: 0,
        iSortCol_0: 0,
        sSortDir_0: 'asc'
      };
    },
    resetFilters() {
      this.filters = {
        'global': {value: null, matchMode: 'contains'},
        'NombreCompleto': {value: null, matchMode: 'contains'},
        'UserName': {value: null, matchMode: 'contains'},
        'Email': {value: null, matchMode: 'contains'},
        'Vigente': {value: null, matchMode: 'equals'}
      }
    },
    async fetchData() {
      const resp = await fetch('api/Usuario/GetUsuariosPaging', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(this.getUsuarioPagingParams)
      });
      const data = await resp.json();
      this.usuarios = data.aaData;
      this.totalRecords = data.iTotalRecords;
    },
    onPage(e) {
      this.loading = true;
      this.tableRows = e.rows;
      this.getUsuarioPagingParams.iDisplayStart = e.first;
      this.getUsuarioPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    onSort(e) {
      this.loading = true;
      this.getUsuarioPagingParams.iSortingCols = 1;
      switch (e.sortField) {
        case 'NombreCompleto':
          this.getUsuarioPagingParams.iSortCol_0 = 1;
          break;
        case 'UserName':
          this.getUsuarioPagingParams.iSortCol_0 = 2;
          break;
        case 'Email':
          this.getUsuarioPagingParams.iSortCol_0 = 3;
          break;
        default:
          this.getUsuarioPagingParams.iSortCol_0 = 1;
          break;
      }
      this.getUsuarioPagingParams.sSortDir_0 = e.sortOrder === -1 ? 'desc' : 'asc';
      this.getUsuarioPagingParams.iDisplayStart = 0;
      this.getUsuarioPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    onFilter(e) {
      this.loading = true;
      if (e.filters.NombreCompleto.value) {
        this.getUsuarioPagingParams.sSearch = e.filters.NombreCompleto.value;
      } else if (e.filters.UserName.value) {
        this.getUsuarioPagingParams.sSearch = e.filters.UserName.value;
      } else if (e.filters.Email.value) {
        this.getUsuarioPagingParams.sSearch = e.filters.Email.value;
      };
      this.getUsuarioPagingParams.iDisplayStart = 0;
      this.getUsuarioPagingParams.iDisplayLength = this.tableRows;
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
      this.getUsuarioPagingParams.sSearch = this.filters['global'].value;
      this.getUsuarioPagingParams.iDisplayStart = 0;
      this.getUsuarioPagingParams.iDisplayLength = this.tableRows;
      this.fetchData();
      this.loading = false;
    },
    async addUsuario() {
      this.usuario = {};
      const resp = await fetch(`api/Usuario/GetById/?IdUsuario=0`, {
        headers: { 'Authorization': this.$store.state.token },
      });
      const usuarioDTO = await resp.json();
      this.perfiles = usuarioDTO.PerfilesCbo;
      this.organizaciones = usuarioDTO.Organizaciones;
      this.displayUsuarioDialog = true;
    },
    async editUsuario(IdUsuario) {
      const resp = await fetch(`api/Usuario/GetById/?IdUsuario=${IdUsuario}`, {
        headers: { 'Authorization': this.$store.state.token },
      });
      const usuarioDTO = await resp.json();
      this.perfiles = usuarioDTO.PerfilesCbo;
      this.organizaciones = usuarioDTO.Organizaciones;
      delete usuarioDTO.PerfilesCbo;
      delete usuarioDTO.Organizaciones;
      this.usuario = usuarioDTO;
      this.usuario.Perfiles = this.perfiles.filter(perfil => usuarioDTO.Perfiles.includes(perfil.IdPerfil));
      this.displayUsuarioDialog = true;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    usuarioDialogAction(e) {
      this.displayUsuarioDialog = false;
      if (e === 'save') {
        this.resetParameters();
        this.fetchData();
        this.$refs.dt.resetPage();
      }
    }
  },
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Checkbox,
    UsuarioDialog
  }

}
</script>

<style lang="scss" scoped>
	.p-datatable .p-column-filter {
		display: none;
	}
  #perfiles {
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
</style>