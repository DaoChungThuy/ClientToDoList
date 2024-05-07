import { authStore } from '@/stores/auth-store.ts'
import axios from 'axios'

const apiHost = 'http://127.0.0.1:8000/api/'
const store = authStore()
const axiosInstance = axios.create({
  baseURL: apiHost,
  headers: {
    Authorization: `Bearer ${store.token}`,
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
