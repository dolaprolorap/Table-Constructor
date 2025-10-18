import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app/App.vue'
import router from './app/router'

import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
