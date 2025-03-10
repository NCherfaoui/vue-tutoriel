# Tutoriel Vue.js - Création d'un projet pas à pas

Ce tutoriel vous guidera à travers les étapes de création d'un projet Vue.js moderne en utilisant Vite comme outil de build.

## Prérequis

- Node.js (version 16 ou supérieure recommandée)
- npm (généralement installé avec Node.js)
- Un éditeur de code (VS Code recommandé)

## Étape 1: Initialisation du projet

### Création du projet avec Vite

Vite est un outil de build moderne qui offre un démarrage rapide et des performances optimales pour les projets Vue.js.

```bash
npx create-vite nom-du-projet --template vue
cd nom-du-projet
npm install
```

### Structure du projet

Après l'initialisation, votre projet aura la structure suivante:

```
nom-du-projet/
├── .vscode/             # Configuration VS Code
├── public/              # Fichiers statiques
├── src/                 # Code source
│   ├── assets/          # Images, polices, etc.
│   ├── components/      # Composants Vue
│   ├── App.vue          # Composant racine
│   ├── main.js          # Point d'entrée
│   └── style.css        # Styles globaux
├── .gitignore           # Fichiers ignorés par Git
├── index.html           # Page HTML principale
├── package.json         # Dépendances et scripts
└── vite.config.js       # Configuration Vite
```

## Étape 2: Comprendre les fichiers clés

### main.js

C'est le point d'entrée de votre application. Il crée l'instance Vue et la monte sur l'élément DOM avec l'id 'app'.

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### App.vue

C'est le composant racine de votre application. Il contient trois sections:
- `<script>`: Logique JavaScript
- `<template>`: Structure HTML
- `<style>`: Styles CSS

### Composants

Les composants sont des éléments réutilisables qui encapsulent la logique, le template et les styles. Ils sont stockés dans le dossier `components/`.

## Étape 3: Lancer le serveur de développement

```bash
npm run dev
```

Cela démarre un serveur de développement avec hot-reload à l'adresse http://localhost:5173/

## Étape 4: Ajouter des fonctionnalités (à venir)

- Routage avec Vue Router
- Gestion d'état avec Pinia
- Formulaires et validation
- Appels API
- Tests unitaires

## Étape 5: Construire pour la production

```bash
npm run build
```

Cela génère une version optimisée de votre application dans le dossier `dist/`.

## Ressources utiles

- [Documentation officielle de Vue.js](https://vuejs.org/)
- [Documentation de Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia (gestion d'état)](https://pinia.vuejs.org/)

## Prochaines étapes

Dans les prochaines sections de ce tutoriel, nous allons:
1. Créer des composants personnalisés
2. Mettre en place le routage
3. Implémenter la gestion d'état
4. Styliser l'application
5. Déployer l'application

Restez à l'écoute pour la suite du tutoriel!
