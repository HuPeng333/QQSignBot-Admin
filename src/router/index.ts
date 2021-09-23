import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Door from '../pages/Door/Door.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Door',
    component: Door,
    meta: {
      title: 'QQSignBotAdmin-请先登录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? <string>to.meta.title : 'QQSignBot'
  next()
})

export default router
