---
title: "Uniformare i browser"
slug: uniformare-i-browser
date: 2014-09-05
description: "Promemoria per uniformare i browser."
---

Per iniziare bene lo sviluppo di un sito web, bisogna partire dai browser di destinazione, e la cosa più semplice è rendere uniforme la visualizzazione in ogni browser.

## I polyfill JavaScript

I polyfill sono un insieme di funzioni che permettono di simulare su un browser datato funzionalità non disponibili nativamente.

Tra i più utili:

- [json3][1]: per decodificare e fare il parsing di JSON.
- [es5][2]: implementazione delle funzioni di EcmaScript 5.
- [Respond][3]: simulazione delle media query tramite window.onresize.

Nel caso di un progetto Node.JS, ecco la configurazione con [Bower][bower] (in bower.json):

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Nota: bisogna anche aggiungere a mano la dipendenza **es5-sham** sotto la riga di **es5-shim**:
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## Reset CSS

Il reset CSS è necessario per riportare a 0 il valore di alcuni elementi HTML, così da avere una resa più simile nei diversi browser.

A seconda del progetto, ci sono diversi modi per includere il reset CSS:

- con un framework CSS (inclusione automatica): [Bootstrap][4], [Pure][5], [Knacss][6], ...
- con un file .css di reset (da aggiungere): [Normalize.css][7], [Reset CSS di Eric Meyer][8], [YUI CSS reset][9], ...
- con Node.JS e Stylus: [Nib][10], scegliendo tra i reset disponibili:
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Aggiungere alla fine dell'**head** della pagina le righe seguenti:

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> Queste righe permettono di aggiungere i nuovi tag al documento HTML.

[bower]: /it/promemoria/grunt-yo-bower-yeoman
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
