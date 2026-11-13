---
title: "Geradores do Yeoman"
slug: geradores-yeoman
date: 2014-02-16
description: "Lista de geradores do Yeoman."
---

Artigo oficial no GitHub: https://github.com/yeoman/yeoman/wiki/Generators

**Pré-requisitos:** Node.JS, Grunt, Yo e Bower devem estar instalados.

## Instalação

Num terminal

```bash
npm install -g yo generator-generator
```

## Criação de um gerador

Em breve...

## Os geradores básicos

Eis uma lista não exaustiva de geradores:

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

Para encontrar um gerador, é [aqui][4].

Para começar com um gerador, é preciso instalá-lo:

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Depois de concluído, os módulos do node estão instalados. E para iniciar o projeto:

```bash
grunt serve
```

A aplicação fica disponível no endereço http://localhost:9000

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
