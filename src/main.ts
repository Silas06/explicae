import './assets/main.css'

import { createApp } from 'vue'
import FloatingVue from 'floating-vue'
import { vMaska } from "maska/vue"

import App from './App.vue'
import router from './router'
import 'floating-vue/dist/style.css'
import store from './store'

const app = createApp(App)

app.directive("maska", vMaska)
app.use(FloatingVue)
app.use(router)
app.use(store)
app.mount('#app')
