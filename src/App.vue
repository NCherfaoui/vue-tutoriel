<script setup>
// Aucune logique nécessaire ici car la gestion des routes est maintenant dans le routeur
</script>

<template>
  <div class="app">
    <header>
      <h1>Ma Boutique Vue.js</h1>
      <nav>
        <router-link to="/">Accueil</router-link> |
        <router-link to="/cart">Panier</router-link> |
        <router-link to="/about">À propos</router-link>
      </nav>
    </header>
    
    <main>
      <!-- Le composant correspondant à la route actuelle sera rendu ici -->
      <router-view />
    </main>
    
    <footer>
      <p>© 2023 Ma Boutique Vue.js - Tutoriel Vue Router</p>
    </footer>
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
