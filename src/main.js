import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import './assets/layout/layout.scss';

import { createApp , reactive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';

import VueCookies from 'vue3-cookies'; 

const app = createApp(App);
app.use(store);
app.use(router);

app.use(
  PrimeVue,
  { ripple: true,
    locale: {
      startsWith: 'Comienza',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina',
      equals: 'Igual',
      notEquals: 'Distinto',
      noFilter: 'Sin filtro',
      lt: 'Menor',
      lte: 'Menor o igual',
      gt: 'Mayor',
      gte: 'Mayor o igual',
      dateIs: 'Igual',
      dateIsNot: 'Distinta',
      dateBefore: 'Antes de',
      dateAfter: 'Después de',
      clear: 'Borrar',
      apply: 'Aplicar',
      matchAll: 'Todos',
      matchAny: 'Cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
      accept: 'Si',
      reject: 'No',
      choose: 'Escoger',
      upload: 'Subir',
      cancel: 'Cancelar',
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
      monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      weekHeader: 'Sem',
      firstDayOfWeek: 1,
      dateFormat: 'dd/mm/yyyy',
      weak: 'Débil',
      medium: 'Mediana',
      strong: 'Fuerte',
      passwordPrompt: 'Ingrese clave',
      emptyFilterMessage: 'No hay resultado',
      emptyMessage: 'No hay opciones'
    }
  }
);

app.use(VueCookies);

app.directive('ripple', Ripple);

app.mount('#app');
