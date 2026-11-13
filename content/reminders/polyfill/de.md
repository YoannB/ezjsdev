---
title: "Browser vereinheitlichen"
slug: browser-vereinheitlichen
date: 2014-09-05
description: "Merkzettel zum Vereinheitlichen der Browser."
---

Für einen guten Start in die Entwicklung einer Website beginnt man mit den Zielbrowsern, und am einfachsten ist es, die Darstellung in allen Browsern zu vereinheitlichen.

## JavaScript-Polyfills

Polyfills sind eine Sammlung von Funktionen, die in einem alten Browser Funktionen nachbilden, die dort nicht nativ verfügbar sind.

Zu den nützlichsten gehören:

- [json3][1]: zum Dekodieren und Parsen von JSON.
- [es5][2]: Implementierung der EcmaScript-5-Funktionen.
- [Respond][3]: Nachbildung von Media Queries mithilfe von window.onresize.

Für ein Node.JS-Projekt hier die Konfiguration mit [Bower][bower] (in bower.json):

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Hinweis: Die Abhängigkeit **es5-sham** muss zusätzlich von Hand unterhalb der Zeile für **es5-shim** eingefügt werden:
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## CSS-Reset

Ein CSS-Reset ist nötig, um den Wert bestimmter HTML-Elemente auf 0 zurückzusetzen und so in den verschiedenen Browsern eine ähnlichere Darstellung zu erhalten.

Je nach Projekt gibt es mehrere Möglichkeiten, den CSS-Reset einzubinden:

- mit einem CSS-Framework (automatisch eingebunden): [Bootstrap][4], [Pure][5], [Knacss][6], ...
- mit einer Reset-.css-Datei (hinzuzufügen): [Normalize.css][7], [Reset CSS von Eric Meyer][8], [YUI CSS reset][9], ...
- mit Node.JS und Stylus: [Nib][10], mit Auswahl unter den verfügbaren Resets:
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Am Ende des **head** der Seite folgende Zeilen einfügen:

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> Damit werden die neuen Tags dem HTML-Dokument hinzugefügt.

[bower]: /de/merkzettel/grunt-yo-bower-yeoman
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
