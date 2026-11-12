---
title: "Sostituire Compass con Stylus / Nib"
slug: sostituire-compass-con-stylus-nib
date: 2014-03-23
description: "Usare Stylus al posto di Compass."
---

L'articolo originale è su [GitHub][1].

Stylus è un preprocessore CSS espressivo, robusto e ricco di funzionalità http://learnboost.github.io/stylus/.

E Nib fornisce il supporto dei prefissi dei browser e altre funzioni fantastiche http://visionmedia.github.io/nib/.

Attività svolte:

- [package.json][2] Rimozione delle dipendenze inutilizzate e aggiunta delle dipendenze Stylus necessarie.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Rimozione dei task Compass, sostituiti da task Stylus.

    ```
    ... [Watch task]
    stylus: {
      files: ['<%= yeoman.app %>/styles/**/*.styl'],
      tasks: ['stylus','copy:styles:server']
    },
    ...
    ```

    ```
    ... [Stylus task]
    stylus: {
      compile: {
          options: {
              paths: ['<%= yeoman.app %>/styles/**/*.styl'],
              use: [
                  require('fluidity'), // usare il plugin stylus in fase di compilazione
                  require('nib')
              ],
              import: [ // importato in ogni file stylus
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

    ```
    ... [Copy task]
    styles: {
      expand: true,
      cwd: '.tmp/styles/',
      dest: '<%= yeoman.app %>/styles',
      src: '{,*/}*.css'
    }
    ...
    ```

- [main.styl][4] Ridenominazione di main.scss in main.styl e refactoring del codice.

    ```
    /* definire una variabile di colore */
    $border-color=#e5e5e5
    /* e usarla così */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Aggiunta del componente bootstrap-css-only al posto dell'import bootstrap di compass.

    ```
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] Sostituzione dell'import css di sass-bootstrap con bootstrap-css-only.

    ```
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Nota:** per usare i font di bootstrap, copiare tutti i file di bootstrap-css-only/fonts/ in una cartella fonts e aggiungere questa riga al task di copia generale:

```
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
