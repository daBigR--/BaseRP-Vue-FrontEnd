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

import { ref, computed, watch, toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    Dialog,
    InputText,
    Checkbox,
    Button
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
  setup(props, { emit }) {
    const store = useStore();

    const { modelValue, visible } = toRefs(props);
    const displayDialog = ref(false);
    watch(visible, (newValue, oldValue) => displayDialog.value = newValue);
    watch(displayDialog, (newValue, oldValue) => emit('update:visible', newValue))

    const region = computed({ 
      get() { return modelValue.value },  
      set(val) { emit('update:modelValue', val) }
    });

    const cancelRegion = () => emit('action', 'cancel');

    const saveRegion = async () => {
      const regionDTO = region.value;
		  regionDTO.UsuarioModifico = store.state.userName;
      const resp = await fetch('api/Region/Save', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': store.state.token },
        body: JSON.stringify(regionDTO)
      });
      if (resp.status !== 200) {
        alert('Error al actualizar región');
        return;
      }
      emit('action', 'save');
    };

    return {
      displayDialog,
      region,
      cancelRegion,
      saveRegion
    }
  }
}
</script>