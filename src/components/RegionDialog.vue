<template>
  <div>
    <Dialog
      header="Región"
      v-model:visible="displayDialog"
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
        <Button label="Cancelar" icon="pi pi-times" @click="cancelRegion" class="p-button-text"/>
        <Button label="Grabar" icon="pi pi-check" @click="saveRegion" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';


export default {
  data() {
    return {
      displayDialog: false
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
    }
  },
  emits: [
    'update:modelValue',
    'update:visible',
    'action'
  ],
  computed: {
    region: { 
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
    cancelRegion() {
      this.$emit('action', 'cancel');
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
      this.$emit('action', 'save');
    }
  },
  components: {
    Dialog,
    InputText,
    Checkbox,
    Button
  }
}
</script>