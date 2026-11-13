---
title: "Generadores de Yeoman"
slug: generadores-yeoman
date: 2014-02-16
description: "Lista de generadores de Yeoman."
---

Artículo oficial en GitHub: https://github.com/yeoman/yeoman/wiki/Generators

**Requisitos previos:** Node.JS, Grunt, Yo y Bower deben estar instalados.

## Instalación

En un terminal

```bash
npm install -g yo generator-generator
```

## Creación de un generador

Próximamente...

## Los generadores básicos

Esta es una lista no exhaustiva de generadores:

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

Para encontrar un generador, es [aquí][4].

Para empezar con un generador, hay que instalarlo:

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Al terminar, los módulos de node ya están instalados. Y para arrancar el proyecto:

```bash
grunt serve
```

La aplicación se despliega en la dirección http://localhost:9000

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
