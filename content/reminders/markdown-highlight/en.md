---
title: "Markdown like on GitHub"
slug: markdown-like-on-github
date: 2014-04-13
description: "Reminder for rendering Markdown."
---

Here is the source code of the two projects you need:

```
https://github.com/chjj/marked
https://github.com/isagalaev/highlight.js
```

To start, add the two scripts at the end of the body:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js"></script>
```

And the style, from the wide choice of styles available [here][1].

```html
<link rel="stylesheet" href="https://rawgit.com/isagalaev/highlight.js/master/src/styles/default.css" />
```

For example, once the page is loaded, with a div containing Markdown code:

```js
// Using marked combined with highlight
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
