/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const app = createApp(App);

app.use(router).use(PrimeVue);

app.component('Button', Button).component('Dialog', Dialog).component('InputText', InputText);

app.mount('#app');
