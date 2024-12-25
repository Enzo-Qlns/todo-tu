## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine. Ensuite, suivez ces étapes :

1. Clonez le dépôt :

   ```sh
   git clone https://github.com/Enzo-Qlns/todo-tu.git
   cd api
   ```

2. Installez les dépendances :

   ```sh
   pnpm i -g json-server@0.17.4
   ```

3. Créez un fichier `db.json` à la racine du projet et ajoutez-y cette structure de base. Exemple :
   ```json
   {
     "notes": []
   }
   ```

## Scripts

- `dev` : Démarre le serveur de développement.

  ```sh
  pnpm start
  ```

## Structure des dossiers

- `db.json` : Contient les données de l'API.
- `routes.json` : Contient les routes de l'API.
