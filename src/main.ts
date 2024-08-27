import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getCurrentState } from './state/useLocalStorage';
const initState = getCurrentState();

const app = createApp(App)
app.use(router)
app.provide('state', initState)
app.mount('#app')
