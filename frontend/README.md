
## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine. Ensuite, suivez ces étapes :

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/Enzo-Qlns/todo-tu.git
    cd frontend
    ```

2. Installez les dépendances :
    ```sh
    pnpm install
    ```

## Scripts

- `dev` : Démarre le serveur de développement.
    ```sh
    pnpm dev
    ```

- `build` : Compile le projet pour la production.
    ```sh
    pnpm build
    ```

- `lint` : Lint le code source.
    ```sh
    pnpm lint
    ```

- `test` : Exécute les tests unitaires
    ```sh
    pnpm test
    ```

- `preview` : Prévisualise le build de production.
    ```sh
    pnpm preview
    ```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez-y vos variables d'environnement. Exemple :
```
VITE_API_URL=http://localhost:3000
```


### ESLint

Le projet utilise ESLint pour le linting. La configuration se trouve dans le fichier `eslint.config.js`.

### Tailwind CSS

Le projet utilise Tailwind CSS pour le style. La configuration se trouve dans le fichier `tailwind.config.js`.

## Structure des dossiers

- `src/` : Contient le code source de l'application.
  - `api/` : Contient les services API.
  - `components/` : Contient les composants React.
  - `types/` : Contient les types TypeScript.
  - `index.css` : Fichier CSS principal.
  - `main.tsx` : Point d'entrée principal de l'application.
  - `App.tsx` : Composant principal de l'application.