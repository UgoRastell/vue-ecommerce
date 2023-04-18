<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img :src="product.image" alt="Product Image" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h1 class="mb-4">{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <p>Prix : {{ product.price }} €</p>
        <button class="btn btn-primary" @click="addToCart()">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/products'
import { ref } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'

const notification = useNotification()

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
        notification.notify({
          type: "success",
          title: 'Produit ajouté au panier',
          text: `Vous avez pris ${cart[productIndex].quantity} ${this.product.title} `,
        });
      } else {
        // Sinon, ajouter le produit au panier avec une quantité de 1
        cart.push({
          id: this.product.id,
          image: this.product.image,
          title: this.product.title,
          price: this.product.price,
          quantity: 1,
        })

        notification.notify({
          type: "success",
          title: 'Produit ajouté au panier',
          text: `${this.product.title} a été ajouté au panier.`,
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
    },
  },
}
</script>
