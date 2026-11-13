---
title: "Markdown como en GitHub"
slug: markdown-como-en-github
date: 2014-04-13
description: "Recordatorio para renderizar Markdown."
---

Este es el código fuente de los dos proyectos necesarios:

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

Para empezar, hay que añadir los dos scripts al final del body:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

Y el estilo, entre la amplia selección de estilos disponibles [aquí][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

Por ejemplo, una vez cargada la página, con un div que contiene código en formato Markdown:

```js
// Uso de marked combinado con highlight
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
