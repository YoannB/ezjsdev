---
title: "Markdown come su GitHub"
slug: markdown-come-su-github
date: 2014-04-13
description: "Promemoria per fare il rendering del Markdown."
---

Ecco il codice sorgente dei due progetti necessari:

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

Per cominciare, bisogna aggiungere i due script alla fine del body:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

E lo stile, scegliendo tra i tanti stili proposti [qui][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

Per esempio, dopo il caricamento della pagina, con un div che contiene codice in formato Markdown:

```js
// Uso di marked combinato con highlight
var divToMarkdown = document.getElementById("idDivToMarkdown");

marked(divToMarkdown.innerHTML, {
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
}, function (err, content) {
  if (err) throw err;
    divToMarkdown.innerHTML = content;
});
```

[1]: https://github.com/isagalaev/highlight.js/tree/master/src/styles
