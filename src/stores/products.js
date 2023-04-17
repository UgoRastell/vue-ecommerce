import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product',{
  state: () => ({
    productList: [],
    productById: {},
  }),
  getters:{
    getProducts(state){
      return state.productList
    }
  },
  actions: {
    async viewProduct(id) {
      if (this.productById[id]) {
        return this.productById[id]
      }

      const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
      const product = response.data

      this.productById = product
      return product
    },
    async fetchProducts() {
      const response = await axios.get('https://fakestoreapi.com/products')
      this.productList = response.data
    },
  },
})
