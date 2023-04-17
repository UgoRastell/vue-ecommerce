import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProductView from '../views/ProductView.vue'
import SingleProductView from '../views/SingleProductView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/store',
      name: 'store',
      component: ProductView
    },
    {
      path: '/product/:id',
      name: 'SingleProduct',
      component: SingleProductView,
    },
  ]
})

export default router
