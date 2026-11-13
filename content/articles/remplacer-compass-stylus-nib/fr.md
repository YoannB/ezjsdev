---
title: "Remplacer Compass par Stylus / Nib"
slug: remplacer-compass-par-stylus-nib
date: 2014-03-23
description: "Utiliser Stylus à la place de Compass."
---

L'article original est sur [GitHub][1].

Stylus est un préprocesseur CSS expressif, robuste et riche en fonctionnalités http://learnboost.github.io/stylus/.

Et Nib apporte la gestion des préfixes navigateurs et d'autres fonctions géniales http://visionmedia.github.io/nib/.

Tâches réalisées :

- [package.json][2] Suppression des dépendances inutilisées et ajout des dépendances Stylus nécessaires.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Suppression des tâches Compass, remplacées par des tâches Stylus.

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
                  require('fluidity'), // utiliser le plugin stylus à la compilation
                  require('nib')
              ],
              import: [ // importé dans chaque fichier stylus
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

- [main.styl][4] Renommage de main.scss en main.styl et refactorisation du code.

    ```stylus
    /* définir une variable de couleur */
    $border-color=#e5e5e5
    /* et l'utiliser comme ceci */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Ajout du composant bootstrap-css-only à la place de l'import bootstrap de compass.

    ```json
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] Remplacement de l'import css de sass-bootstrap par bootstrap-css-only.

    ```html
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Note :** pour utiliser les polices de bootstrap, copier tous les fichiers de bootstrap-css-only/fonts/ dans un dossier fonts et ajouter cette ligne à la tâche de copie générale :

```javascript
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
