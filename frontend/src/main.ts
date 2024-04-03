import './styles.css';

import router from './router';
import { MotionPlugin } from '@vueuse/motion';
import { VueQueryPlugin } from '@tanstack/vue-query';
import VueFeather from 'vue-feather';

import { createApp } from 'vue';
import App from './app/App.vue';

const app = createApp(App);

app.use(router);
app.use(MotionPlugin);
app.use(VueQueryPlugin);
app.component(VueFeather.name, VueFeather);

app.mount('#root');
