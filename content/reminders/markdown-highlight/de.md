---
title: "Markdown wie auf GitHub"
slug: markdown-wie-auf-github
date: 2014-04-13
description: "Merkzettel zum Rendern von Markdown."
---

Hier der Quellcode der beiden benötigten Projekte:

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

Zuerst die beiden Skripte am Ende des body einfügen:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

Und den Stil, aus der großen Auswahl an Stilen [hier][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

Zum Beispiel, nachdem die Seite geladen ist, mit einem div, das Code im Markdown-Format enthält:

```js
// marked kombiniert mit highlight verwenden
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
