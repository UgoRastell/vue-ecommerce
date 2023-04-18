
<template>
  <div class="container">
    <h1>Bienvenue sur notre site !</h1>
    <p>Nous sommes heureux de vous accueillir sur notre plateforme de vente en ligne.</p>
    <p>Explorez notre catalogue de produits pour trouver tout ce dont vous avez besoin.</p>
    <router-link to="/store" class="btn btn-primary">Visiter le magasin</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style>
h1 {
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>

