---
title: "Generatori Yeoman"
slug: generatori-yeoman
date: 2014-02-16
description: "Elenco di generatori Yeoman."
---

Articolo ufficiale su GitHub: https://github.com/yeoman/yeoman/wiki/Generators

**Prerequisiti:** Node.JS, Grunt, Yo e Bower devono essere installati.

## Installazione

In un terminale

```bash
npm install -g yo generator-generator
```

## Creazione di un generatore

Prossimamente...

## I generatori di base

Ecco un elenco non esaustivo di generatori:

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

Per trovare un generatore, è [qui][4].

Per iniziare con un generatore, bisogna installarlo:

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Al termine, i moduli di node sono stati installati. E per avviare il progetto:

```bash
grunt serve
```

L'applicazione è disponibile all'indirizzo http://localhost:9000

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
