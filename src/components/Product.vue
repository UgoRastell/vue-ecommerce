<template>
  <div class="container">
    <h1>Liste des produits</h1>
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage()">Précédent</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage()">Suivant</button>
        </li>
      </ul>
    </nav>
    <div class="row">
      <div v-for="product in displayedProducts" :key="product.id" class="col-md-4">
        <div class="card">
          <div class="card-img-container">
            <img :src="product.image" alt="Product Image" class="card-img-top">
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ product.title }}</h2>
            <p class="card-text">Prix : {{ product.price }} €</p>
            <button class="btn btn-primary" @click="viewProduct(product.id)">Voir le produit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/products'
import * as Vue from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProductList',
  setup() {
    const productStore = useProductStore()
    const currentPage = Vue.ref(1)
    const productsPerPage = 6
    const router = useRouter()

    const displayedProducts = Vue.computed(() => {
      const startIndex = (currentPage.value - 1) * productsPerPage
      const endIndex = startIndex + productsPerPage
      return productStore.getProducts.slice(startIndex, endIndex)
    })

    const totalPages = Vue.computed(() => {
      return Math.ceil(productStore.getProducts.length / productsPerPage)
    })

    const viewProduct = async (id) => {
      await productStore.viewProduct(id)
      router.push({ name: 'SingleProduct', params: { id }})
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const changePage = (page) => {
      currentPage.value = page
    }

    Vue.onMounted(async () => {
      await productStore.fetchProducts()
    })

    return {
      displayedProducts,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      changePage,
      viewProduct
    }
  },
}

</script>

