import CIcon from '@coreui/icons-vue'
import CoreuiVue from '@coreui/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './app/App.vue'
import router from './app/router'
import { iconsSet as icons } from './shared/ui/assets/icons'

import '@/shared/ui/styles/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.use(router)

app.mount('#app')