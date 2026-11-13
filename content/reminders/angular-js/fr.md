---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Pense-bête pour débuter avec Angular FullStack."
---

- Installer [Node.JS][1]

- Installer [Grunt/Yo/Bower][2]

- Installer le générateur angular-fullstack

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Note :** pour d'autres générateurs, voir le pense-bête sur les [générateurs][3] en vogue

Structure du projet généré :

![Structure](/reminders/angular-js/angular_struc.png)

Une fois le projet installé, il est nécessaire de télécharger les dépendances en exécutant la commande

```bash
bower install
```

> **Note :** en cas d'installation globale, un message bloquant peut apparaître ; avec 'bower install --allow-root' la commande passe

Les différentes commandes définies par **grunt** sont :

- lancement en mode développement de l'application

    ```bash
    grunt serve
    ```

- build et lancement en mode production

    ```bash
    grunt serve:dist
    ```

- générer la distribution du projet

    ```bash
    grunt build
    ```

Pour lancer la distribution, allez dans le répertoire 'dist' et lancez la commande

```bash
NODE_ENV=production node server.js
```

Tests avec karma :

**Note :** besoin d'un fichier karma.conf.js, donc s'il n'a pas été généré, il faudra en rajouter un ([exemple][4])

- Lancement des tests côté serveur

    ```bash
    grunt test:server
    ```

- Lancement des tests côté client

    ```bash
    grunt test:client
    ```

[1]: /pense-betes/installation-de-node-js
[2]: /pense-betes/grunt-yo-bower-yeoman
[3]: /pense-betes/generateurs-yeoman
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
