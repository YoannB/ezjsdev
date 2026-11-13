---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Recordatorio para empezar con Angular FullStack."
---

- Instalar [Node.JS][1]

- Instalar [Grunt/Yo/Bower][2]

- Instalar el generador angular-fullstack

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Nota:** para otros generadores, ver el recordatorio sobre los [generadores][3] de moda

Estructura del proyecto generado:

![Estructura](/reminders/angular-js/angular_struc.png)

Una vez instalado el proyecto, hay que descargar las dependencias ejecutando el comando

```bash
bower install
```

> **Nota:** en caso de instalación global, puede aparecer un mensaje bloqueante; con 'bower install --allow-root' el comando funciona

Los distintos comandos definidos por **grunt** son:

- arrancar la aplicación en modo desarrollo

    ```bash
    grunt serve
    ```

- build y arranque en modo producción

    ```bash
    grunt serve:dist
    ```

- generar la distribución del proyecto

    ```bash
    grunt build
    ```

Para arrancar la distribución, ve al directorio 'dist' y ejecuta el comando

```bash
NODE_ENV=production node server.js
```

Tests con karma:

**Nota:** hace falta un archivo karma.conf.js; si no se ha generado, habrá que añadir uno ([ejemplo][4])

- Ejecución de los tests del lado servidor

    ```bash
    grunt test:server
    ```

- Ejecución de los tests del lado cliente

    ```bash
    grunt test:client
    ```

[1]: /es/recordatorios/instalacion-de-node-js
[2]: /es/recordatorios/grunt-yo-bower-yeoman
[3]: /es/recordatorios/generadores-yeoman
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
