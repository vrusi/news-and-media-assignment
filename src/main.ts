/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Toolbar from 'primevue/toolbar';

const app = createApp(App);

app.use(router).use(PrimeVue);

app.component('Button', Button)
    .component('Dialog', Dialog)
    .component('InputText', InputText)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Toolbar', Toolbar);

app.mount('#app');
