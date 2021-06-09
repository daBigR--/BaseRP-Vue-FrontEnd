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

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue, { ripple: true });

app.directive('ripple', Ripple);

app.mount('#app');
