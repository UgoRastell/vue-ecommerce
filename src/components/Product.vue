<template>
  <div class="container">
    <h1>Liste des produits</h1>
    <div class="row">
      <div v-for="product in productList" :key="product.id" class="col-md-4">
        <div class="card">
          <div class="card-img-container">
            <img :src="product.image" alt="Product Image" class="card-img-top">
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ product.title }}</h2>
            <p class="card-text">Prix : {{ product.price }} €</p>
            <button class="btn btn-primary" @click="getProduct(product.id)">Voir le produit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { useProductStore } from '@/stores/products'

export default {
  name: 'ProductList',
  setup() {
    const productStore = useProductStore()
    console.log(productStore)
    return {
      productStore,
    }
  },
  data(){
      return {productList:[]}
  },
  async mounted(){
      await this.productStore.fetchProducts()
      this.productList = this.productStore.getProducts
  },
  methods: {
    async getProduct(id){
      await this.productStore.viewProduct(id)
      console.log(id)
      this.$router.push({ name: 'SingleProduct', params: { id }})
    }
  }
}
</script>