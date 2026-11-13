---
title: "Substituir o Compass por Stylus / Nib"
slug: substituir-compass-por-stylus-nib
date: 2014-03-23
description: "Utilizar o Stylus em vez do Compass."
---

O artigo original está no [GitHub][1].

Stylus é um pré-processador CSS expressivo, robusto e rico em funcionalidades http://learnboost.github.io/stylus/.

E o Nib traz suporte para prefixos de navegador e outras funções incríveis http://visionmedia.github.io/nib/.

Tarefas realizadas:

- [package.json][2] Remoção das dependências não utilizadas e adição das dependências do Stylus necessárias.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Remoção das tarefas do Compass, substituídas por tarefas do Stylus.

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
                  require('fluidity'), // utilizar o plugin stylus na compilação
                  require('nib')
              ],
              import: [ // importado em cada ficheiro stylus
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

- [main.styl][4] Renomeação de main.scss para main.styl e refatoração do código.

    ```stylus
    /* definir uma variável de cor */
    $border-color=#e5e5e5
    /* e utilizá-la assim */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Adição do componente bootstrap-css-only em vez do import do bootstrap pelo compass.

    ```json
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] Substituição do import css do sass-bootstrap pelo bootstrap-css-only.

    ```html
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Nota:** para utilizar as fontes do bootstrap, copiar todos os ficheiros de bootstrap-css-only/fonts/ para uma pasta fonts e adicionar esta linha à tarefa de cópia geral:

```javascript
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
