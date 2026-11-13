---
title: "Empezar con ES6 usando Babel"
slug: empezar-con-es6-usando-babel
date: 2017-01-05
description: "Página HTML de ejemplo para escribir ES6."
---

Escribir código ES6 o ES2015 con Babel en un momento :).

Para empezar, hay que añadir los dos scripts al final del body:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser-polyfill.js"></script>
```

Y luego hace falta una etiqueta script indicando bien el tipo _text/babel_:

```html
<script type="text/babel">

  // ES6 code here

</script>
```
