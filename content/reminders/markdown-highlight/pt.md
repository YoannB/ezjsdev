---
title: "Markdown como no GitHub"
slug: markdown-como-no-github
date: 2014-04-13
description: "Lembrete para renderizar Markdown."
---

Eis o código-fonte dos dois projetos necessários:

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

Para começar, é preciso adicionar os dois scripts no final do body:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

E o estilo, entre a grande variedade de estilos propostos [aqui][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

Por exemplo, depois de a página ser carregada, com uma div que contém código no formato Markdown:

```js
// Uso do marked combinado com o highlight
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
