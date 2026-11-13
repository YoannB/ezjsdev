---
title: "Mit ES6 und Babel loslegen"
slug: mit-es6-und-babel-loslegen
date: 2017-01-05
description: "Beispiel-HTML-Seite, um ES6 zu schreiben."
---

ES6- oder ES2015-Code mit Babel im Handumdrehen schreiben :).

Zuerst die beiden Skripte am Ende des body einfügen:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser-polyfill.js"></script>
```

Danach braucht es ein script-Tag, bei dem unbedingt der Typ _text/babel_ angegeben wird:

```html
<script type="text/babel">

  // ES6 code here

</script>
```
