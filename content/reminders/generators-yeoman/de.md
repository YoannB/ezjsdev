---
title: "Yeoman-Generatoren"
slug: yeoman-generatoren
date: 2014-02-16
description: "Liste von Yeoman-Generatoren."
---

Offizieller Artikel auf GitHub: https://github.com/yeoman/yeoman/wiki/Generators

**Voraussetzungen:** Node.JS, Grunt, Yo und Bower müssen installiert sein.

## Installation

In einem Terminal

```bash
npm install -g yo generator-generator
```

## Einen Generator erstellen

Demnächst...

## Die grundlegenden Generatoren

Hier eine nicht vollständige Liste von Generatoren:

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

Generatoren findet man [hier][4].

Um mit einem Generator zu beginnen, muss man ihn installieren:

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Danach sind die Node-Module installiert. Und um das Projekt zu starten:

```bash
grunt serve
```

Die Anwendung ist unter http://localhost:9000 erreichbar

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
