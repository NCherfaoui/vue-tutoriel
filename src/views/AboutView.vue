<template>
  <div class="about">
    <h1>À propos de notre boutique</h1>
    <p>
      Cette boutique est un exemple créé dans le cadre du tutoriel Vue.js pour illustrer
      l'utilisation de Vue Router dans une application de commerce électronique.
    </p>
    <p>
      Dans une application réelle, cette page pourrait contenir des informations sur l'entreprise,
      sa mission, son histoire, et ses valeurs.
    </p>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  animation: fadeIn var(--transition-normal);
}

h1 {
  color: var(--color-primary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

p {
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-md);
  color: var(--color-text);
}
</style>