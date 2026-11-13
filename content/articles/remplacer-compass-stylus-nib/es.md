---
title: "Reemplazar Compass por Stylus / Nib"
slug: reemplazar-compass-por-stylus-nib
date: 2014-03-23
description: "Usar Stylus en lugar de Compass."
---

El artículo original está en [GitHub][1].

Stylus es un preprocesador CSS expresivo, robusto y lleno de funcionalidades http://learnboost.github.io/stylus/.

Y Nib aporta la gestión de prefijos de navegador y otras funciones geniales http://visionmedia.github.io/nib/.

Tareas realizadas:

- [package.json][2] Eliminación de las dependencias no utilizadas y adición de las dependencias de Stylus necesarias.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Eliminación de las tareas de Compass, sustituidas por tareas de Stylus.

    ```javascript
    ... [Watch task]
    stylus: {
      files: ['<%= yeoman.app %>/styles/**/*.styl'],
      tasks: ['stylus','copy:styles:server']
    },
    ...
    ```

    ```javascript
    ... [Stylus task]
    stylus: {
      compile: {
          options: {
              paths: ['<%= yeoman.app %>/styles/**/*.styl'],
              use: [
                  require('fluidity'), // usar el plugin de stylus al compilar
                  require('nib')
              ],
              import: [ // importado en cada archivo stylus
                  'nib',
                  '../function'
              ]
          },
          files: {
              '.tmp/styles/main.css':['<%= yeoman.app %>/styles/main.styl']
          }
      }
    },
    ...
    ```

    ```javascript
    ... [Copy task]
    styles: {
      expand: true,
      cwd: '.tmp/styles/',
      dest: '<%= yeoman.app %>/styles',
      src: '{,*/}*.css'
    }
    ...
    ```

- [main.styl][4] Cambio de nombre de main.scss a main.styl y refactorización del código.

    ```stylus
    /* definir una variable de color */
    $border-color=#e5e5e5
    /* y usarla así */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Adición del componente bootstrap-css-only en lugar del import de bootstrap de compass.

    ```json
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] Sustitución del import css de sass-bootstrap por bootstrap-css-only.

    ```html
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Nota:** para usar las fuentes de bootstrap, copiar todos los archivos de bootstrap-css-only/fonts/ en una carpeta fonts y añadir esta línea a la tarea de copia general:

```javascript
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
