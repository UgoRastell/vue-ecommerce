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
import { ref } from 'vue'

export default {
  name: 'SingleProduct',
  setup() {
    const productStore = useProductStore()
    const product = ref({})
    const productId = ref(null)

    return {
      productStore,
      product,
      productId,
    }
  },
  async mounted() {
    this.productId = this.$route.params.id
    const productData = await this.productStore.viewProduct(this.productId)
    this.product = productData
  },
}
</script>

  