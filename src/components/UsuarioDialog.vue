<template>
  <div>
    <Dialog
      header="Usuario"
      v-model:visible="displayDialog"
      :style="{width: '40vw'}"
      :modal="true"
    >

      <form>
      <div class="card p-fluid">
        <div class="p-inputgroup">
          <img :src="usuario.ImagenPerfil || 'assets/layout/images/profile.png'" class="uploaded-image p-mr-5" />
            <div class="p-fileupload-buttonbar">
              <span :class="['p-button p-component p-fileupload-choose', { 'p-focus': focused }]" @click="choose" @keydown.enter="choose" @focus="onFocus" @blur="onBlur" v-ripple tabindex="0">
                <input ref="fileInput" type="file" @change="uploadImage" accept="image/*" autofocus />
                <span class="p-button-icon p-button-icon-left pi pi-fw pi-upload"></span>
                <span class="p-button-label">Cargar imagen</span>
              </span>
            </div>
        </div>
        <div class="p-inputgroup p-mt-5">
          <span class="p-float-label">
            <Dropdown v-model="usuario.IdOrganizacion" :options="organizaciones" optionLabel="Nombre" optionValue="IdOrganizacion" placeholder="" />
            <label for="Organizacion">Organización</label>
          </span>
        </div>
        <div class="p-inputgroup p-mt-5">
          <span class="p-float-label">
            <InputText id="NombreCompleto" name="NombreCompleto" v-model="usuario.NombreCompleto" type="text" class="p-d-box" />
            <label for="NombreCompleto">Nombre completo</label>
          </span>
        </div>
        <div class="p-inputgroup p-mt-5">
          <span class="p-float-label">
            <InputText id="UserName" name="UserName" v-model="usuario.UserName" type="text" class="p-d-box" />
            <label for="UserName">Nombre usuario</label>
          </span>
        </div>
        <div class="p-inputgroup p-mt-5">
          <span class="p-float-label">
            <InputText id="Email" name="Email" v-model="usuario.Email" type="text" class="p-d-box" />
            <label for="Email">Correo electrónico</label>
          </span>
        </div>
        <div class="p-mt-2">
        <label for="perfiles" class="p-ml-2" style="font-size: 12px;">Perfiles</label>          
        <div id="perfiles" class="p-grid p-mt-2 p-mx-1">
          <div v-for="perfil of perfiles" :key="perfil.IdPerfil" class="p-col-6 p-field-checkbox">
            <Checkbox :id="perfil.IdPerfil" name="perfil" :value="perfil" v-model="usuario.Perfiles" />
            <label :for="perfil.IdPerfil">{{perfil.Nombre}}</label>
          </div>
        </div>
        </div>
        <div class="p-inputgroup p-mt-5">
          <div class="p-field-checkbox">
            <Checkbox id="ValidaEnAD" v-model="usuario.ValidaEnAD" :binary="true" />
            <label for="Vigente">Valida en AD</label>
          </div>
        </div>
        <div class="p-inputgroup p-mt-2">
          <div class="p-field-checkbox">
            <Checkbox id="Vigente" v-model="usuario.Vigente" :binary="true" />
            <label for="Vigente">Vigente</label>
          </div>
        </div>
      </div>
      </form>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="cancelUsuario" class="p-button-text"/>
        <Button label="Grabar" icon="pi pi-check" @click="saveUsuario" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';

export default {
  data() {
    return {
      displayDialog: false,
      focused: false
    }
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    organizaciones: {
      type: Object,
      required: true
    },
    perfiles: {
      type: Object,
      required: true
    }
  },
  emits: [
    'update:modelValue',
    'update:visible',
    'action'
  ],
  computed: {
    usuario: { 
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) }
    }
  },
  watch: {
    visible(newValue, oldValue) {
      this.displayDialog = newValue;
    },
    displayDialog(newValue, oldValue) {
      this.$emit('update:visible', newValue)
    }
  },
  methods: {
    choose() {
      this.$refs.fileInput.click();
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    
    uploadImage(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => this.usuario.ImagenPerfil = reader.result;
    },

    cancelUsuario() {
      this.$emit('action', 'cancel');
    },
    async saveUsuario() {
      this.usuario.Perfiles = this.usuario.Perfiles.map(perfil => perfil.IdPerfil);
      const resp = await fetch('api/Usuario/Save', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(this.usuario)
      });
      if (resp.status !== 200) {
        alert('Error al grabar usuario.');
        return;
      }
      this.$emit('action', 'save');
    }
  },
  components: {
    Dialog,
    InputText,
    Button,
    Checkbox,
    Dropdown
  }
}
</script>

<style lang="scss" scoped>
.uploaded-image {
  display: flex;
  max-width: 100px;
  max-height: 100px;
}
#perfiles {
  border: 1px solid lightgrey;
  border-radius: 3px;
}
.p-button.p-fileupload-choose {
    position: relative;
    overflow: hidden;
}

.p-button.p-fileupload-choose input[type=file] {
    display: none;
}

.p-fileupload-choose.p-fileupload-choose-selected input[type=file] {
    display: none;
}

.p-fluid .p-fileupload .p-button {
    width: auto;
}

</style>