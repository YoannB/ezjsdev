---
title: "Homogeneizar los navegadores"
slug: homogeneizar-los-navegadores
date: 2014-09-05
description: "Recordatorio para homogeneizar los navegadores."
---

Para empezar bien el desarrollo de un sitio web, hay que partir de los navegadores objetivo, y lo más sencillo es que la visualización sea homogénea en cada navegador.

## Los polyfills de JavaScript

Los polyfills son un conjunto de funciones que permiten simular en un navegador antiguo funcionalidades que no están disponibles de forma nativa.

Entre los más útiles:

- [json3][1]: para decodificar y parsear JSON.
- [es5][2]: implementación de las funciones de EcmaScript 5.
- [Respond][3]: simulación de las media queries mediante window.onresize.

En el caso de un proyecto Node.JS, esta es la configuración con [Bower][bower] (en bower.json):

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Nota: también hay que añadir a mano la dependencia **es5-sham** debajo de la línea de **es5-shim**:
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## Reset CSS

El reset CSS es necesario para reiniciar a 0 el valor de ciertos elementos HTML y obtener una visualización más parecida en los distintos navegadores.

Según el proyecto, hay varias maneras de incluir el reset CSS:

- con un framework CSS (inclusión automática): [Bootstrap][4], [Pure][5], [Knacss][6], ...
- con un archivo .css de reset (que hay que añadir): [Normalize.css][7], [Reset CSS de Eric Meyer][8], [YUI CSS reset][9], ...
- con Node.JS y Stylus: [Nib][10], eligiendo entre los resets disponibles:
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Añadir al final del **head** de la página las siguientes líneas:

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> Estas líneas permiten añadir las nuevas etiquetas al documento HTML.

[bower]: /es/recordatorios/grunt-yo-bower-yeoman
[1]: http://bestiejs.github.io/json3/
[2]: https://github.com/es-shims/es5-shim
[3]: https://github.com/scottjehl/Respond
[4]: http://getbootstrap.com/css/
[5]: http://purecss.io/
[6]: http://www.knacss.com/
[7]: https://github.com/necolas/normalize.css
[8]: http://meyerweb.com/eric/tools/css/reset/
[9]: http://yuilibrary.com/yui/docs/cssreset/
[10]: http://visionmedia.github.io/nib/
