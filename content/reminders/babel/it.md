---
title: "Iniziare con ES6 usando Babel"
slug: iniziare-con-es6-usando-babel
date: 2017-01-05
description: "Pagina HTML di esempio per scrivere ES6."
---

Scrivere codice ES6 o ES2015 con Babel in un attimo :).

Per cominciare, bisogna aggiungere i due script alla fine del body:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser-polyfill.js"></script>
```

Poi serve un tag script specificando bene il tipo _text/babel_:

```html
<script type="text/babel">

  // ES6 code here

</script>
```
