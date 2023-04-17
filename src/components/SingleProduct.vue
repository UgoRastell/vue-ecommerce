<template>
  <div>
    <h1>{{ product.title }}</h1>
    <img :src="product.image" alt="Product Image" class="product-image">
    <p>{{ product.description }}</p>
    <p>Prix : {{ product.price }} €</p>
    <button class="product-button" @click="addToCart()">Ajouter au panier</button>
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
  methods: {
    addToCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || []

      // Vérifier si le produit est déjà dans le panier
      const productIndex = cart.findIndex(item => item.id === this.product.id)

      if (productIndex !== -1) {
        // Si le produit est déjà dans le panier, augmenter la quantité
        cart[productIndex].quantity++
      } else {
        // Sinon, ajouter le produit au panier avec une quantité de 1
        cart.push({
          id: this.product.id,
          image: this.product.image,
          title: this.product.title,
          price: this.product.price,
          quantity: 1,
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
    },
  },
}
</script>
