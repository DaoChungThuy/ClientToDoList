import { defineStore } from 'pinia'
import type { User } from '@/types'

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string
}

export const authStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
    token: ''
  }),

  actions: {
    login(user: User, token: string): void {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      this.isLoggedIn = true
      this.user = user
      this.token = token
    },
    logout(): void {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.isLoggedIn = false
      this.user = null
      this.token = ''
    },
    onInit(): void {
      const userStr = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (userStr && token) {
        const user = JSON.parse(userStr)
        this.isLoggedIn = true
        this.user = user
        this.token = token
      }
    }
  },

  getters: {
    isAuthenticated(state): boolean {
      return state.isLoggedIn
    }
  }
})
