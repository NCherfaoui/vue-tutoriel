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
  padding: var(--spacing-lg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

header h1 {
  color: var(--color-primary);
  margin-bottom: 0;
}

nav {
  display: flex;
  gap: var(--spacing-md);
}

nav a {
  color: var(--color-secondary);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

nav a:hover {
  color: var(--color-primary);
  background-color: var(--color-background-light);
}

nav a.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}

main {
  flex: 1;
}

footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  justify-content: center;
}
</style>
