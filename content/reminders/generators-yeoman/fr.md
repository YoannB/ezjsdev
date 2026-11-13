---
title: "Yeoman Generators"
slug: generateurs-yeoman
date: 2014-02-16
description: "Liste de générateurs Yeoman."
---

Article officiel sur GitHub : https://github.com/yeoman/yeoman/wiki/Generators

**Pré-requis :** Node.JS, Grunt, Yo, Bower doivent être installés.

## Installation

Dans un terminal

```bash
npm install -g yo generator-generator
```

## Création d'un générateur

Bientôt...

## Les générateurs de base

Voici une liste non exhaustive de générateurs :

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

Pour trouver un générateur, c'est [ici][4].

Pour débuter avec un générateur, il faut l'installer :

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Une fois fini, l'installation des modules de node a été faite. Et pour lancer le projet :

```bash
grunt serve
```

L'application est déployée à l'adresse http://localhost:9000

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
