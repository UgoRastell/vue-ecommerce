<template>
    <div>
      <h1>Page de connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username">
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        console.log(`Nom d'utilisateur: ${this.username}`);
        console.log(`Mot de passe: ${this.password}`);
      },
    },
  };
</script>