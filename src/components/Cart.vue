<template>
    <div>
      <h1>Panier</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Produit</th>
            <th scope="col">Quantité</th>
            <th scope="col">Prix unitaire</th>
            <th scope="col">Prix total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="item.id">
            <td><img :src="item.image" alt="" style="max-width: 100px; height: 60px;"></td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ formatPrice(item.price * item.quantity) }}</td>
            <td>
              <button @click="removeFromCart(index)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>Prix total : {{ formatPrice(totalPrice) }}</p>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'Cart',
    setup() {
      const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
  
      const totalPrice = computed(() => {
        return cart.value.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)
      })
  
      function formatPrice(price) {
        return `${price.toFixed(2)} €`
      }
  
      function removeFromCart(index) {
        cart.value.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(cart.value))
      }
  
      return {
        cartItems: cart,
        totalPrice,
        formatPrice,
        removeFromCart
      }
    }
  }
  </script>
  