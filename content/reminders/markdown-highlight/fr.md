---
title: "Faire du Markdown comme sur GitHub"
slug: markdown-comme-sur-github
date: 2014-04-13
description: "Pense-bête pour faire du Markdown."
---

Voici le code source des deux projets nécessaires :

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

Pour commencer, il faut ajouter les deux scripts à la fin du body :

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

Et le style, parmi le grand choix de styles proposés [ici][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

Par exemple, après que la page est chargée, avec une div contenant du code au format Markdown :

```js
// Utilisation de marked combiné à highlight
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
