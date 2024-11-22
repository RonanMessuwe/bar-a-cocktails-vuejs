import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Web sockets
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.min.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')

declare global {
  interface Window {
    Pusher: unknown
    Echo: Echo<'reverb'>
  }
}

window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'reverb',
  key: '5i32ii9ha1aawlhqktou',
  wsHost: 'localhost',
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
})
// window.Echo = new Echo({
//   broadcaster: 'reverb',
//   key: import.meta.env.VITE_REVERB_APP_KEY,
//   wsHost: import.meta.env.VITE_REVERB_HOST,
//   wsPort: import.meta.env.VITE_REVERB_PORT,
//   wssPort: import.meta.env.VITE_REVERB_PORT,
//   forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//   enabledTransports: ['ws', 'wss'],
// })
