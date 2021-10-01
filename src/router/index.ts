import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Door from '../pages/Door/Door.vue'
const Index = () => import('../pages/Index/Index.vue')
const Sign = () => import('../pages/Sign/Sign.vue')
const GroupStatistic = () => import('../pages/GroupStatistic/GroupStatistic.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Door',
    component: Door,
    meta: {
      title: 'QQSignBotAdmin-请先登录',
      // 隐藏导航栏
      hideNav: true
    }
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
    meta: {
      title: '打卡情况'
    }
  },
  {
    path: '/statistic',
    name: 'GroupStatistic',
    component: GroupStatistic,
    meta: {
      title: '群收集'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? <string>to.meta.title : 'QQSignBotAdmin'
  next()
})

export default router
