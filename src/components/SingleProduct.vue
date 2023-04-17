<template>
    <div>
        <h1>{{ product.title }}</h1>
        <img :src="product.image" alt="Product Image" class="product-image">
        <p>{{ product.description }}</p>
        <p>Prix : {{ product.price }} €</p>
        <button class="product-button">Ajouter au panier</button>
      </div>
  </template>
  
  <script>
  import { useProductStore } from '@/stores/products'
  
  export default {
    name: 'SingleProduct',
    setup() {
      const productStore = useProductStore()
      return {
        productStore,
        product: {},
      }
    },
    async mounted() {
      const productId = this.$route.params.id
      await this.productStore.viewProduct(productId)
      this.product = this.productStore.productById
      console.log(this.product)
     
    },
  }
  </script>
  