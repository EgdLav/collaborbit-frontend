import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

;(window as any).Pusher = Pusher

export const echo = new Echo({
  broadcaster: 'reverb',

  key: import.meta.env.VITE_REVERB_APP_KEY,

  wsHost: window.location.hostname,

  wsPort: 443,
  wssPort: 443,

  forceTLS: true,

  enabledTransports: ['ws', 'wss'],

  authEndpoint: '/broadcasting/auth',

  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
})
