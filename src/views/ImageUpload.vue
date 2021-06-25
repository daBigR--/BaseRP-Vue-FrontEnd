<template>
  <div>
    <img :src="imageBlobBase64" class="uploaded-image" />

    <div class="p-fileupload p-fileupload-advanced p-component">
      <div class="p-fileupload-buttonbar">
        <span :class="['p-button p-component p-fileupload-choose', { 'p-focus': focused }]" @click="choose" @keydown.enter="choose" @focus="onFocus" @blur="onBlur" v-ripple tabindex="0">
          <input ref="fileInput" type="file" @change="uploadImage" accept="image/*" autofocus />
          <span class="p-button-icon p-button-icon-left pi pi-fw pi-image"></span>
          <span class="p-button-label">Cargar</span>
        </span>
        <Button label="Grabar" icon="pi pi-upload" @click="saveImage" />
        <Button label="Leer" icon="pi pi-download" @click="loadImage" />
      </div>
    </div>
    

  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: "ImageUpload",
  components: {
    Button
  },
  data() {
    return {
      imageBlobBase64: null,
      focused: false
    };
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
      reader.onload = () => this.imageBlobBase64 = reader.result;
    },

    async saveImage() {
      const usuarioDTO = {
        IdUsuario: 7,
        ImagenPerfil: this.imageBlobBase64
      };
      const resp = await fetch('api/Usuario/SaveImage', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Authorization': this.$store.state.token },
        body: JSON.stringify(usuarioDTO)
      });
      if (resp.status !== 200) {
        alert('Error al actualizar imagen');
        return;
      }
    },

    async loadImage() {
      const resp = await fetch(`api/Usuario/GetById/?IdUsuario=7`, {
        headers: { 'Authorization': this.$store.state.token },
      });
      const usuarioDTO = await resp.json();
      this.imageBlobBase64 = usuarioDTO.ImagenPerfil;
    }
  }
};
</script>

<style>
.uploaded-image {
  display: flex;
  max-width: 100px;
  max-height: 100px;
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
