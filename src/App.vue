<template>
  <notifications classes="vue-notification" position="bottom right" />
  <div>
    <Navbar />
    
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
