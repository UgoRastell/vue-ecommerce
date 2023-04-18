import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import CartView from '../views/CartView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showNavbar: true,
        showFooter: true
      }
    },
    {
      path: '/store',
      name: 'store',
      component: ProductView,
      meta: {
        showNavbar: true,
        showFooter: true
      }
    },
    {
      path: '/product/:id',
      name: 'SingleProduct',
      component: SingleProductView,
      showFooter: true
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
      meta: {
        showNavbar: true,
        showFooter: true
      }
    },
  ]
})

export default router
