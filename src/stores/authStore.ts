import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    avatar: localStorage.getItem('avatar') as string | null,
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setAvatar(avatar: string) {
      this.avatar = avatar
      localStorage.setItem('avatar', avatar)
    },

    logout() {
      this.token = null
      this.avatar = null

      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
    },
  },
})
