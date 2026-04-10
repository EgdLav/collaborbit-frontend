// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),

  actions: {
    setToken(token: string) {
      // @ts-ignore
      this.token = token
    },

    logout() {
      this.token = null
    },
  },
})
