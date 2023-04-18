<template>
  <div class="container">
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
            <td>
              <div class="input-group">
                <button class="btn btn-outline-secondary" type="button" @click="decrementQuantity(index)">-</button>
                <input type="number" class="form-control quantity-input" :value="item.quantity" @input="changeQuantity($event.target.value, index)" style="-webkit-appearance: none; -moz-appearance: textfield; appearance: textfield;">
                <button class="btn btn-outline-secondary" type="button" @click="incrementQuantity(index)">+</button>
              </div>
            </td>
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
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'

const notification = useNotification()

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
      notification.notify({
          type: "error",
          title: `Le produit ${cart.value[index].title} a été supprimer du panier`,
        })
      cart.value.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart.value))
    }

    function incrementQuantity(index) {
      cart.value[index].quantity++
      localStorage.setItem('cart', JSON.stringify(cart.value))
      notification.notify({
          type: "warn",
          title: `Vous venez d\'augmenter la quantité du produit ${cart.value[index].title} à ${cart.value[index].quantity} `,
        })
    }

    function decrementQuantity(index) {
      if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--
        localStorage.setItem('cart', JSON.stringify(cart.value))
        notification.notify({
          type: "warn",
          title: `Vous venez de diminuer la quantité du produit ${cart.value[index].title} à ${cart.value[index].quantity} `,
        })
      }
    }

    function changeQuantity(value, index) {
      if (value < 1) {
        value = 1
      }
      cart.value[index].quantity = Number(value)
      localStorage.setItem('cart', JSON.stringify(cart.value))
    }

    return {
      cartItems: cart,
      totalPrice,
      formatPrice,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      changeQuantity
    }
  }
}
</script>
