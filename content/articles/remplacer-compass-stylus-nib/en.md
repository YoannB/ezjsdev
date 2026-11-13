---
title: "Replacing Compass by Stylus / Nib"
slug: replacing-compass-by-stylus-nib
date: 2014-03-23
description: "Using Stylus instead of Compass."
---

The original article is on [GitHub][1].

Stylus is an Expressive, robust, feature-rich CSS preprocessor http://learnboost.github.io/stylus/.

And Nib provides vendor support and others awesome functions http://visionmedia.github.io/nib/.

Tasks performed:

- [package.json][2] Remove unused dependencies and add Stylus dependencies needed.

    ```json
    --"grunt-contrib-compass": "~0.6.0",--
    "grunt-contrib-stylus": "~0.12.0",
    "stylus": "~0.42.2",
    "nib": "~1.0.2",
    "fluidity": "~0.2.0"
    ```

- [Gruntfile.js][3] Remove Compass tasks and replace by Stylus tasks.

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
                  require('fluidity'), // use stylus plugin at compile time
                  require('nib')
              ],
              import: [ // imported in each stylus file
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

- [main.styl][4] Rename of main.scss in main.styl and refactor code.

    ```stylus
    /* define color variable */
    $border-color=#e5e5e5
    /* and use it like this */
    .header
      border-bottom 1px solid $border-color
    ```

- [bower.json][5] Add bootstrap-css-only component instead of compass import bootstrap.

    ```json
    --"sass-bootstrap": "~3.0.2",--
    "bootstrap-css-only": "~3.0.0",
    ```

- [index.html][6] Replace import css of sass-bootstrap by bootstrap-css-only.

    ```html
    <!--link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css" /-->
    <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.css" />
    ```

**Note:** To use fonts from bootstrap, copy all files in bootstrap-css-only/fonts/ to a folder fonts and add this line to the general copy task:

```javascript
'fonts/**/*',
```

[1]: https://github.com/YoannB/fullstack-demo#replacing-compass-by-stylus--nib
[2]: https://github.com/YoannB/fullstack-demo/blob/master/package.json
[3]: https://github.com/YoannB/fullstack-demo/blob/master/Gruntfile.js
[4]: https://github.com/YoannB/fullstack-demo/blob/master/app/styles/main.styl
[5]: https://github.com/YoannB/fullstack-demo/blob/master/bower.json
[6]: https://github.com/YoannB/fullstack-demo/blob/master/app/views/index.html
