import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CustomerOrderStatusView from '@/views/CustomerOrderStatusView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CustomerOrderStatusView,
    },
  ],
})

export default router
