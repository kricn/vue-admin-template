import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css';
import ElementUi from 'element-plus'

import router from './router';

/** 全局样式 */
import './styles/index.scss'

const app = createApp(App)
app.use(router)
   .use(ElementUi)
   .mount('#app')
