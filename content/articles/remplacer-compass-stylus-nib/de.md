---
title: "Compass durch Stylus / Nib ersetzen"
slug: compass-durch-stylus-nib-ersetzen
date: 2014-03-23
description: "Stylus statt Compass verwenden."
---

Der Originalartikel ist auf [GitHub][1].

Stylus ist ein ausdrucksstarker, robuster und funktionsreicher CSS-Präprozessor http://learnboost.github.io/stylus/.

Und Nib bringt Unterstützung für Browser-Präfixe und weitere großartige Funktionen http://visionmedia.github.io/nib/.

Durchgeführte Aufgaben:

- [package.json][2] Ungenutzte Abhängigkeiten entfernen und die benötigten Stylus-Abhängigkeiten hinzufügen.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Compass-Tasks entfernen und durch Stylus-Tasks ersetzen.

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
                  require('fluidity'), // Stylus-Plugin beim Kompilieren verwenden
                  require('nib')
              ],
              import: [ // in jede Stylus-Datei importiert
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

- [main.styl][4] main.scss in main.styl umbenennen und den Code überarbeiten.

    ```stylus
    /* Farbvariable definieren */
    $border-color=#e5e5e5
    /* und so verwenden */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Komponente bootstrap-css-only statt des Bootstrap-Imports von Compass hinzufügen.

    ```json
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] CSS-Import von sass-bootstrap durch bootstrap-css-only ersetzen.

    ```html
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Hinweis:** Um die Schriften von Bootstrap zu verwenden, alle Dateien aus bootstrap-css-only/fonts/ in einen Ordner fonts kopieren und diese Zeile zum allgemeinen Copy-Task hinzufügen:

```javascript
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
