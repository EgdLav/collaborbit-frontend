import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    avatar: localStorage.getItem('avatar') as string | null,
    id: localStorage.getItem('id') as string | null,
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
    setId(id: string) {
      this.id = id
      localStorage.setItem('id', id)
    },

    logout() {
      this.token = null
      this.avatar = null
      this.id = null

      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
      localStorage.removeItem('id')
    },
  },
})
