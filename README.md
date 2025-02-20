# Projet Plinc

## Description

Ce projet est construit avec Next.js, un framework React moderne et performant pour le développement d'applications web côté serveur et statiques. Il est configuré pour une collaboration fluide entre développeurs avec ESLint, Prettier et d'autres outils de productivité.

## Prérequis

- Node.js (version recommandée : >= 18.x)
- pnpm

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/plinc-service/plinc-frontend.git
cd plinc
```

### 2. Installer les dépendances

Avec pnpm :

```bash
pnpm install
```

## Lancer le projet

Environnement de développement :

```bash
pnpm run dev
```

Accédez à http://localhost:3000 pour voir le projet en développement.

## Scripts disponibles

- `pnpm run dev` : Démarre le serveur de développement
- `pnpm run build` : Compile l'application pour la production
- `pnpm run start` : Démarre le serveur en mode production après compilation
- `pnpm run lint` : Analyse le code avec ESLint

## Configuration des outils

### ESLint

- Le fichier `.eslintrc.json` contient les règles de linting utilisées dans ce projet
- Pour exécuter une vérification manuelle :

```bash
pnpm run lint
```

### Prettier

- Le fichier `.prettierrc` contient les règles de formatage du code
- Activez l'option **Format on Save** dans votre éditeur pour un formatage automatique

### Extensions VS Code

- Les extensions recommandées sont spécifiées dans le fichier `.vscode/extensions.json`. Vous pouvez les installer rapidement en ouvrant la commande **Install Recommended Extensions** dans VS Code

## Contribution

### Workflow Git

1. Créez une branche pour votre fonctionnalité ou correctif :

```bash
git checkout -b feature/nom-de-la-feature
```

2. Après vos modifications, faites un commit :

```bash
git commit -m "Description de votre modification"
```

3. Poussez votre branche :

```bash
git push origin feature/nom-de-la-feature
```

4. Créez une Pull Request sur le dépôt principal

## Ressources utiles

- Documentation Next.js : https://nextjs.org/docs
- Documentation React : https://reactjs.org/docs/getting-started.html
- Guide ESLint : https://eslint.org/docs/user-guide/getting-started
- Guide Prettier : https://prettier.io/docs/en/index.html
