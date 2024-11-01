import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/bluetooth/:addr',
      name: 'Bluetooth',
      component: () => import('../views/BtControl.vue')
    }
  ]
})

export default router
