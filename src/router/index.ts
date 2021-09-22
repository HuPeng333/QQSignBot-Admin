import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Door from '../pages/Door/Door.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Door',
    component: Door
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
