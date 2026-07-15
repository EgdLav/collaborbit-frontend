import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

(window as any).Pusher = Pusher

export const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,

  wsHost: import.meta.env.VITE_REVERB_HOST ?? '62.109.6.70',
  wsPort: 80,

  forceTLS: false,
  enabledTransports: ['ws', 'wss'],

  authEndpoint: 'http://62.109.6.70/broadcasting/auth',

  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
})
