---
title: "Installation de Node.js"
slug: installation-de-node-js
date: 2013-12-01
description: "Pense-bête pour installer Node.JS."
---

## Windows

Suivre la procédure sur le site officiel [nodejs.org][1].

## Ubuntu

Dans un terminal, exécuter les lignes suivantes :

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **NOTE :** en cas d'erreur sur la récupération de paquets, deux lignes utiles à exécuter :
>
> Configurer le registre :
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> Et si vous êtes derrière un proxy :
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## Pour installer les dépendances, dans le dossier du projet

```bash
sudo npm install
```

## Pour lancer l'application node 'app'

```bash
node app.js
```

Ou si, dans package.json, on définit la commande "start"

```json
"scripts" : {
  "start" : "node app.js"
}
```

Il suffit de faire

```bash
npm start
```

> **Installation sans SUDO :** il est conseillé d'installer Node.JS de façon à ne pas avoir à faire de **sudo** à chaque commande.
>
> Changer les droits de l'installation locale :
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> et si le répertoire existe :
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
