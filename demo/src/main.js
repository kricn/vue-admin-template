import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'

import {
  Button
} from 'ant-design-vue'

import './assets/styles/index.scss';

const app = createApp(App)

app.use(Router)
   .use(Button)
   .mount('#app')
