---
title: "Clever-cloud & application Node.JS"
slug: clever-cloud-et-application-node-js
date: 2014-10-05
description: "Tutorial pour déployer sa première application Node.JS sur Clever-cloud."
---

## Inscription

Rendez-vous sur le site de [clever-cloud][1] pour s'inscrire.

> Pour les utilisateurs de github, il suffit de se connecter avec son compte github pour en plus avoir sa clé ssh recopiée automatiquement.

> Après l'inscription manuelle, une fois sur la page de [console][2] dans la section profil/Clés SSH (dans le menu en bas à gauche, puis en haut de la nouvelle page) il faut renseigner sa clé publique ssh sur le site :

```bash
# recopie de sa clé dans le presse-papier
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Paiement

Pour commencer, choisir la solution de base et sélectionner Node.Js comme langage.

> de base, l'estimation du coût du site est de 14,40€/mois avec 1 CPU et 1 GB de ram.

## Déployer son application

Avec Node.Js, tout se fait automatiquement à condition que l'on paramètre son projet de la façon suivante :

- utiliser le port 8080
- dans le fichier package.json, renseigner :
    1. le "name"
    2. la "version"
    3. la balise "scripts" avec la commande "start" démarrant le serveur
    4. toutes les dépendances nécessaires au projet

Exemple de package.json valide avec serveur Express 4.9.5 :

```json
{
  "name": "mon-projet",
  "version": "0.0.1",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.9.0",
    "compression": "^1.1.0",
    "cookie-parser": "^1.3.3",
    "cookie-session": "^1.0.2",
    "ejs": "^0.8.5",
    "ejs-locals": "^1",
    "errorhandler": "^1.2.0",
    "express": "^4.9.5",
    "method-override": "^2.2.0",
    "morgan": "^1.3.2",
    "serve-favicon": "^2.1.5",
    "serve-static": "^1.6.3"
  },
  "engines": {
    "node": ">=0.10.32",
    "npm": "1.2.x"
  }
}
```

> Pour démarrer l'environnement en mode **production** :

```json
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Mettre son application sur Clever-cloud

Pour ce faire, rien de plus simple, Clever-cloud utilise **git**. Lors du choix de son langage, avant de configurer sa clé ssh, on vous donne un lien **git remote** :

```bash
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[id_de_votre_app].git
```

Dans le répertoire de son application, lancer la commande précédente (git remote ...).

Si le projet n'est pas encore un projet **git**, faire `git init`.

Ensuite si le fichier **.gitignore** de votre projet est à jour et que vous avez tout bien préparé, exécuter les commandes :

```bash
git add .
git commit -m "initial commit"
git push clever master
```

> L'application se déploiera automatiquement, pour voir la log du serveur, il faut se rendre sur sa console clever-cloud de son application (lien **Logs**). Si tout se passe bien, vous verrez les lignes :

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> En cas de problème avec la clé ssh, la commande suivante permet de charger sa clé dans la session de son terminal :

```bash
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
