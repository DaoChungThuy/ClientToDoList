import { createRouter, createWebHistory } from 'vue-router'
import main from './main.js'
import auth from './auth.js'

const routes = [...main, ...auth]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
